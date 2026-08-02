import type { I18nText } from "./types";

/** 页面标题 */
export const timelineTitle: I18nText = {
  zh: "版本历程",
  en: "Changelog",
};

/** 返回首页 aria-label */
export const timelineBackHomeLabel: I18nText = {
  zh: "返回首页",
  en: "Back to Home",
};

/** 产品分组头部 */
export interface TimelineProduct {
  id: string;
  name: I18nText;
  description: I18nText;
  icon: "Smartphone" | "Monitor" | "Bot";
  status: "live" | "maintenance" | "upcoming";
}

/** 单个版本亮点 */
export interface TimelineHighlight {
  icon: string;
  text: I18nText;
}

/** 单个版本（按小版本归集） */
export interface TimelineVersion {
  version: string;
  date: string;
  label: I18nText;
  description: I18nText;
  highlights: TimelineHighlight[];
  /** 主题色：blue=移动端、emerald=桌面端 */
  color: "blue" | "emerald";
}

/** 产品 → 版本列表 */
export interface TimelineProductGroup {
  product: TimelineProduct;
  versions: TimelineVersion[];
}

/** 产品分组与版本数据（仅展示每个产品的"小版本"：1.0.0 / 1.1.0 / 1.2.0 …） */
export const timelineProductGroups: TimelineProductGroup[] = [
  {
    product: {
      id: "android",
      name: { zh: "Quiddity-Android", en: "Quiddity-Android" },
      description: {
        zh: "Android 客户端，多模型 AI 对话、主动消息、联网搜索。",
        en: "Android client — multi-model AI chat, proactive messages, web search.",
      },
      icon: "Smartphone",
      status: "live",
    },
    versions: [
      {
        version: "v1.2.0",
        date: "2026.08.02",
        label: { zh: "主动消息", en: "Proactive Messages" },
        description: {
          zh: "新增「主动消息（时间库）」功能：AI 在每天指定时间主动向你发消息。总设置开启后，会话级开启即生成今日时间库并由系统闹钟触发；决策由 AI 基于未压缩聊天记录自主判断是否发送。本版本仅在官网与源码仓库发布，尚未在 GitHub Releases 发布。",
          en: "New Proactive Messages (Time Library): the AI sends you messages on a daily schedule. After enabling the global toggle, turn it on per conversation to generate today's time library and register system alarms; the AI decides whether to send based on uncompressed chat history. This build is published on the website and source repo only; not yet on GitHub Releases.",
        },
        highlights: [
          { icon: "Bell", text: { zh: "主动消息（时间库）", en: "Proactive Messages (Time Library)" } },
          { icon: "Clock", text: { zh: "延迟补偿 ≤5 分钟", en: "Late-Window Compensation ≤5 min" } },
          { icon: "Shield", text: { zh: "网络异常自动重试 1 次", en: "Network Auto-Retry x1" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.1",
        date: "2026.08.01",
        label: { zh: "应用内更新修复", en: "In-App Update Fixes" },
        description: {
          zh: "修复部分手机「检查更新」直接失败：UpdateChecker 检测源改为多源 fallback——Cloudflare Pages（https://quiddity-3by.pages.dev/version.json，国内可达首选）→ GitHub Pages → raw.githubusercontent.com，任一源成功即返回；每次请求附加 Cache-Control: no-cache + ?t=<timestamp> 绕过 CDN 缓存。修复「启动下载失败」：installApk() 统一改用 FileProvider.getUriForFile() 包装本地 APK，移除无效的自我 grantUriPermission，新增 findApkInTargetDirs() 兜底（getExternalFilesDir / cacheDir / 公共 Downloads 三处扫描最新 quiddity-*.apk）；downloadApk 改用 setDestinationInExternalFilesDir(context, null, fileName) 落地到 Android/data/<package>/files/；version.json 的 downloadUrl 改为绝对 HTTPS；APK_FALLBACK_URLS 列表增强多源直链兜底；fallback 顺序改为 APK_FALLBACK_URLS → GitHub API。",
          en: "Fixed 'update check failure' on some devices: UpdateChecker now uses multi-source fallback (Cloudflare Pages → GitHub Pages → raw.githubusercontent.com), with Cache-Control: no-cache + ?t=<timestamp> to bypass CDN cache. Fixed 'start download failure': installApk() now uses FileProvider.getUriForFile() with FLAG_GRANT_READ_URI_PERMISSION; removed redundant self-grantUriPermission; added findApkInTargetDirs() to scan getExternalFilesDir / cacheDir / public Downloads. downloadApk uses setDestinationInExternalFilesDir(context, null, fileName) to land at Android/data/<package>/files/. version.json downloadUrl switched to absolute HTTPS; APK_FALLBACK_URLS enhanced; fallback order changed to APK_FALLBACK_URLS → GitHub API.",
        },
        highlights: [
          { icon: "Wrench", text: { zh: "UpdateChecker 多源 fallback", en: "UpdateChecker Multi-Source Fallback" } },
          { icon: "Shield", text: { zh: "installApk 改用 FileProvider", en: "installApk uses FileProvider" } },
          { icon: "Link", text: { zh: "downloadApk 路径 + 绝对 URL", en: "downloadApk Path + Absolute URL" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.0",
        date: "2026.08.01",
        label: { zh: "重构与体验优化", en: "Refactor & UX Polish" },
        description: {
          zh: "MessageStreamCoordinator 重构：流式输出逻辑简化，稳定性与可维护性显著提升（文件改 453 行）。SettingsBottomSheet 大幅扩展（+194 行）：新增大量可配置项。HamburgerMenu / PersonaPanel / PromptBuilder 优化交互与布局。ConversationStore 与 ChatRepository 逻辑优化（cleaner local session storage and repository logic）。单元测试大幅扩展：MessageStreamCoordinatorTest 新增 426 行用例，覆盖「句末标点 + 括号切分」「连续标点合并」「省略号不切分」「splitEnabled 关闭」「流式信号契约（New/Update/Complete）」「跨 runId 唯一性」「硬上限保护」等关键正确性边界。",
          en: "MessageStreamCoordinator refactored: simplified streaming logic, improved stability and maintainability (453 lines changed). SettingsBottomSheet significantly expanded (+194 lines): many new configurable options. HamburgerMenu / PersonaPanel / PromptBuilder interaction and layout improvements. ConversationStore and ChatRepository logic optimized (cleaner local session storage and repository logic). Unit test coverage greatly expanded: MessageStreamCoordinatorTest +426 lines covering sentence-end punctuation + bracket split, consecutive punctuation merge, ellipsis non-split, splitEnabled off, streaming signal contracts (New/Update/Complete), cross-runId uniqueness, and hard limit protection.",
        },
        highlights: [
          { icon: "Workflow", text: { zh: "MessageStreamCoordinator 重构", en: "MessageStreamCoordinator Refactor" } },
          { icon: "Sliders", text: { zh: "SettingsBottomSheet 大幅扩展", en: "SettingsBottomSheet Expanded" } },
          { icon: "ListChecks", text: { zh: "单元测试 +426 行", en: "Unit Tests +426 Lines" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.3",
        date: "2026.07.31",
        label: { zh: "应用内更新", en: "In-App Update" },
        description: {
          zh: "重写 UpdateChecker：使用系统 DownloadManager + FileProvider，APK 下载完成后可直接在应用内唤起安装，无需跳浏览器。修复 Android 7.0+ FileUriExposedException（必须用 content:// URI via FileProvider，file:// 在 N+ 会崩溃）、Android 13+ RECEIVER_NOT_EXPORTED（DownloadManager.ACTION_DOWNLOAD_COMPLETE 广播必须新签名注册，否则 Tiramisu+ 抛 SecurityException）。下载体验优化：实时进度条 + 状态回调（pending / running / paused / successful / failed / canceled），下载失败可一键重试。版本解析：raw.githubusercontent 兜底 → GitHub Releases API 自动取最新 APK 直链；URL 兜底：官网首页 / 空 URL 自动回退到 GitHub Releases latest。「不再提醒此版本」持久化（SharedPreferences）。v1.0.1 / v1.0.2 仅为 versionCode 递增重签。",
          en: "Rewrote UpdateChecker with system DownloadManager + FileProvider for in-app APK install (no browser hop). Fixed Android 7.0+ FileUriExposedException (must use content:// URI via FileProvider; file:// was crashing on N+) and Android 13+ RECEIVER_NOT_EXPORTED for DownloadManager.ACTION_DOWNLOAD_COMPLETE broadcast (Tiramisu+ was throwing SecurityException). Optimized download experience with real-time progress bar and state callbacks (pending / running / paused / successful / failed / canceled), one-tap retry. Version parsing: raw.githubusercontent fallback to GitHub Releases API auto-resolves latest APK direct link; URL fallback: empty / website homepage URL auto-redirects to GitHub Releases latest. 'Don't remind for this version' persistence via SharedPreferences. v1.0.1 / v1.0.2 are versionCode bumps with re-signed releases.",
        },
        highlights: [
          { icon: "Wrench", text: { zh: "DownloadManager + FileProvider", en: "DownloadManager + FileProvider" } },
          { icon: "Activity", text: { zh: "应用内安装（无需跳浏览器）", en: "In-App Install (No Browser)" } },
          { icon: "BarChart3", text: { zh: "下载进度条 + 状态回调", en: "Progress Bar + State Callbacks" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.0",
        date: "2026.07.31",
        label: { zh: "正式上线", en: "Official Launch" },
        description: {
          zh: "Quiddity-Android 首发。核心能力：11 家 AI 服务商、60+ 模型可选（基础级 / 进阶级 / 完整级 / 视觉级），模型分配方案按场景自动匹配；多轮对话 + 上下文记忆（1-200 轮可配）；会话压缩（记忆库）基础级 12 轮 / 进阶级 40 轮 / 完整级 80 轮自动触发；角色卡 / System Prompt；Markdown + 代码高亮；图像识别（Vision 模型）；暗黑 / 浅色主题；离线草稿 / 消息搜索 / 会话导出；API Key 与对话记录使用 EncryptedFile（AES256-GCM）加密保存。",
          en: "First official release: 11 AI providers, 60+ models (BASIC / ADVANCED / FULL / VISION), scenario-based auto-routing, multi-turn chat with configurable context (1-200 rounds), memory-bank compression (BASIC 12 / ADVANCED 40 / FULL 80 rounds), persona cards, Markdown + code highlighting, Vision, light/dark themes, offline drafts, message search, export, EncryptedFile (AES256-GCM) for API keys.",
        },
        highlights: [
          { icon: "Layers", text: { zh: "11 家服务商 / 60+ 模型", en: "11 Providers / 60+ Models" } },
          { icon: "ListChecks", text: { zh: "会话压缩（记忆库）", en: "Memory-Bank Compression" } },
          { icon: "Lock", text: { zh: "API Key 本地加密", en: "API Key Encrypted" } },
        ],
        color: "blue",
      },
    ],
  },
  {
    product: {
      id: "chat",
      name: { zh: "Quiddity-Chat", en: "Quiddity-Chat" },
      description: {
        zh: "桌面端轻量聊天客户端，定位日常 AI 对话。",
        en: "Lightweight desktop chat client for everyday AI conversations.",
      },
      icon: "Monitor",
      status: "live",
    },
    versions: [
      {
        version: "v1.0.0",
        date: "2026.07.15",
        label: { zh: "首发便携版", en: "Initial Portable Release" },
        description: {
          zh: "Quiddity-Chat v1.0.0 便携版（Jiuyu-1.0.0.exe）首发，面向日常 AI 对话场景。",
          en: "Quiddity-Chat v1.0.0 portable release (Jiuyu-1.0.0.exe) — daily AI chat scenarios.",
        },
        highlights: [
          { icon: "Monitor", text: { zh: "Windows 便携版首发", en: "Windows Portable Launch" } },
        ],
        color: "emerald",
      },
    ],
  },
  {
    product: {
      id: "agent",
      name: { zh: "Quiddity-Agent", en: "Quiddity-Agent" },
      description: {
        zh: "桌面端本地进阶 Agent，定位复杂任务自动化。",
        en: "Local advanced desktop Agent for complex task automation.",
      },
      icon: "Bot",
      status: "upcoming",
    },
    versions: [
      {
        version: "v1.0.0",
        date: "2026.07.20",
        label: { zh: "正式立项", en: "Project Kickoff" },
        description: {
          zh: "Quiddity-Agent 桌面端 v1.0.0 正式立项，定位本地进阶 Agent。",
          en: "Quiddity-Agent desktop v1.0.0 officially launched as a local advanced Agent project.",
        },
        highlights: [
          { icon: "Bot", text: { zh: "本地进阶 Agent 定位", en: "Local Advanced Agent" } },
        ],
        color: "emerald",
      },
    ],
  },
];

/** 状态徽章文案 */
export const statusLabel: Record<TimelineProduct["status"], I18nText> = {
  live: { zh: "已上线", en: "Live" },
  maintenance: { zh: "维护中", en: "Maintenance" },
  upcoming: { zh: "筹备中", en: "In Preparation" },
};
