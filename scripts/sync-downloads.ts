/**
 * sync-downloads.ts
 * 从 GitHub Releases API 同步下载链接到 public/downloads.json
 * 同时更新 public/version.json 的 downloadUrl 与 releaseNotes
 *
 * 关键逻辑：聚合所有 Release 的 assets（而非只看 latest），
 * 这样桌面端旧 Release 里的 .exe 不会因 Android 新版本发布而消失。
 *
 * 根因修复：旧 version.json 的 downloadUrl 指向历史仓库，已统一为 Quiddity-website。
 * 现在直接从 GitHub Releases API 获取资产直链，永远不会失效。
 *
 * 用法：npm run sync:downloads
 *      CI 中：GITHUB_TOKEN=xxx npm run sync:downloads
 */

import { existsSync } from "node:fs";
import {
  DOWNLOADS_JSON_PATH,
  GITHUB_REPO,
  VERSION_JSON_PATH,
  fetchAllReleases,
  inferPlatform,
  log,
  normalizeVersion,
  nowIso,
  readJson,
  writeJson,
  type DownloadsInfo,
  type VersionInfo,
} from "./lib";

async function main() {
  log.step(`查询 GitHub Releases API: ${GITHUB_REPO}`);
  const releases = await fetchAllReleases(GITHUB_REPO);

  if (releases.length === 0) {
    log.warn("仓库还没有任何 Release。");
  }

  // 按发布时间倒序：最新的在前面
  releases.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const latest = releases[0];
  const version = normalizeVersion(latest.tagName);
  log.ok(`最新 Release：${latest.tagName}（v${version}）`);
  log.ok(`总 Release 数：${releases.length}`);

  // 聚合所有 release 的所有 assets（按 URL 去重，保留最新版本的）
  const seen = new Map<string, ReturnType<typeof toAsset>>();
  for (const r of releases) {
    for (const a of r.assets) {
      const asset = toAsset(a, r.tagName);
      if (!asset) continue;
      if (!seen.has(asset.url)) {
        seen.set(asset.url, asset);
      }
    }
  }
  // 过滤 null（toAsset 可能在 platform 无法识别时返回 null）— 修复 TS2322
  const assets = Array.from(seen.values()).filter(
    (a): a is NonNullable<ReturnType<typeof toAsset>> => a !== null
  );

  if (assets.length === 0) {
    log.warn("未识别到任何可下载资产。请确认 Release 已上传 .exe/.apk 等安装包。");
  }

  const downloads: DownloadsInfo = {
    version,
    releaseDate: latest.publishedAt.slice(0, 10),
    releaseNotes: latest.body?.trim() || "暂无发布说明",
    assets,
    fallbackUrl: `https://github.com/${GITHUB_REPO}/releases/latest`,
    lastSyncedAt: nowIso(),
  };

  await writeJson(DOWNLOADS_JSON_PATH, downloads);
  log.ok(`已写入 downloads.json（${assets.length} 项资产，聚合自 ${releases.length} 个 Release）`);

  // 同步更新 version.json 的 downloadUrl 与 releaseNotes
  log.step(`同步更新 version.json`);
  let versionInfo: VersionInfo;
  if (existsSync(VERSION_JSON_PATH)) {
    versionInfo = await readJson<VersionInfo>(VERSION_JSON_PATH);
  } else {
    versionInfo = {
      version,
      releaseDate: downloads.releaseDate,
      downloadUrl: "",
      releaseNotes: downloads.releaseNotes,
    };
  }
  versionInfo.version = version;
  versionInfo.releaseDate = downloads.releaseDate;
  versionInfo.releaseNotes = downloads.releaseNotes;
  // downloadUrl 指向最新 Release 的页面（稳定 URL，不会失效）
  versionInfo.downloadUrl = downloads.fallbackUrl;
  await writeJson(VERSION_JSON_PATH, versionInfo);
  log.ok(`已更新 version.json（downloadUrl 指向 releases/latest）`);

  // 打印资产列表
  console.log("");
  log.info("资产清单：");
  for (const a of assets) {
    const sizeMb = (a.size / 1024 / 1024).toFixed(1);
    console.log(`  • [${a.platform}/${a.arch}] ${a.label} (${sizeMb} MB)`);
  }
}

/** 把 GitHub release asset 转成 downloads.json 里的资产项 */
function toAsset(
  a: { name: string; browserDownloadUrl: string; size: number; contentType: string },
  tag: string
) {
  const plat = inferPlatform(a.name);
  if (!plat) {
    log.warn(`跳过无法识别平台的资产：${a.name}（${tag}）`);
    return null;
  }
  return {
    platform: plat.platform,
    arch: plat.arch,
    label: a.name,
    url: a.browserDownloadUrl,
    size: a.size,
    contentType: a.contentType,
  };
}

main().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err);
  log.err(msg);
  log.warn(
    "提示：如果遇到 403 Rate Limit，请在 CI 中设置 GITHUB_TOKEN 环境变量后重试。"
  );
  log.warn(
    "网络同步失败 — 保留 public/downloads.json 已有数据继续后续步骤（退出码 0）。"
  );
  // 网络失败时降级：不中止构建/推送流程
  // public/downloads.json 已经有上次同步的真实数据，可用
  process.exit(0);
});
