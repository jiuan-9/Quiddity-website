#!/usr/bin/env node
/**
 * prebuild — 构建前同步脚本（容错版 / v2）
 *
 * ⚠️ 重要变更：从 2026-07-31 起，prebuild 不再自动执行 sync 脚本。
 * 原因：sync-downloads 在 CI 中频繁受 GitHub API 限流/网络抖动影响，
 *      会用旧/不完整数据覆盖 public/downloads.json，导致 Windows v1.0.0
 *      等历史资产丢失。改用：仓库内 public/downloads.json 作为唯一真实源，
 *      上线前由本地人工 `npm run sync:downloads` 写入并 commit。
 *
 * 保留 sync:version 步骤，因为它影响 version.json 的 downloadUrl。
 *
 * 为什么不直接在 package.json 里写？
 *   多层转义（JSON → shell → node）在跨平台时容易出问题，
 *   尤其是 Windows PowerShell 和 Linux bash 的引号行为不同。
 */

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = resolve(__dirname, "..", "public");

const isCI =
  process.env.CI ||
  process.env.CF_PAGES ||
  process.env.GITHUB_ACTIONS ||
  process.env.NETLIFY ||
  process.env.VERCEL;

console.log("");
console.log("[prebuild] 开始构建前同步...");
if (isCI) {
  console.log("[prebuild] 检测到 CI/云构建环境");
}
console.log("");

function runStep(name, cmd) {
  console.log(`[prebuild] → ${name}`);
  try {
    execSync(cmd, { stdio: "inherit", timeout: 120000 });
    console.log(`[prebuild] ✓ ${name} 完成`);
    return true;
  } catch (err) {
    console.warn(`[prebuild] ⚠ ${name} 失败（可接受）：${err.message}`);
    console.warn("[prebuild]   将使用 public/ 下已有数据继续构建");
    return false;
  }
}

let allOk = true;

// 检查关键文件存在性（兜底防御）
const downloadsJson = resolve(PUBLIC_DIR, "downloads.json");
const versionJson = resolve(PUBLIC_DIR, "version.json");
if (!existsSync(downloadsJson)) {
  console.error("[prebuild] ✗ public/downloads.json 缺失！");
  process.exit(1);
}
if (!existsSync(versionJson)) {
  console.error("[prebuild] ✗ public/version.json 缺失！");
  process.exit(1);
}
console.log("[prebuild] ✓ public/downloads.json 存在");
console.log("[prebuild] ✓ public/version.json 存在");
console.log("");

// ⚠️ 不再自动执行 sync:downloads（避免被限流破坏数据）
//   若确实需要在 CI 刷新数据，请手动删除 public/downloads.json 后再 build，
//   或者显式设置环境变量 FORCE_SYNC=1
if (process.env.FORCE_SYNC === "1") {
  allOk = runStep("同步下载链接（强制）", "npm run sync:downloads") && allOk;
  console.log("");
} else {
  console.log("[prebuild] ⏭ 跳过 sync:downloads（使用仓库内已 commit 的数据）");
  console.log("[prebuild]   如需刷新数据，请设置 FORCE_SYNC=1 或本地手动执行");
  console.log("");
}

allOk = runStep("同步版本信息", "npm run sync:version") && allOk;

console.log("");
if (allOk) {
  console.log("[prebuild] ✓ 全部同步成功");
} else {
  console.log("[prebuild] ⚠ 部分同步失败，使用默认数据继续构建");
}
console.log("");
