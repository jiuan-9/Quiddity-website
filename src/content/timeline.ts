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
          zh: "新增「主动消息（时间库）」功能：AI 在每天指定时间主动向你发消息。总设置开启后，会话级开启即生成今日时间库并由系统闹钟触发；决策由 AI 基于未压缩聊天记录自主判断是否发送。",
          en: "New Proactive Messages (Time Library): the AI sends you messages on a daily schedule. After enabling the global toggle, turn it on per conversation to generate today's time library and register system alarms; the AI decides whether to send based on uncompressed chat history.",
        },
        highlights: [
          { icon: "Bell", text: { zh: "主动消息（时间库）", en: "Proactive Messages (Time Library)" } },
          { icon: "Clock", text: { zh: "延迟补偿 ≤5 分钟", en: "Late-Window Compensation ≤5 min" } },
          { icon: "Shield", text: { zh: "网络异常自动重试 1 次", en: "Network Auto-Retry x1" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.0",
        date: "2026.08.01",
        label: { zh: "联网搜索", en: "Web Search RAG" },
        description: {
          zh: "新增「联网搜索 RAG」能力：对话时 AI 可实时联网检索最新信息，并给出可点击的来源链接（基于搜索引擎 + LLM 总结）。支持手动 / 自动模式（每条消息默认联网，或仅在需要时点工具栏「🌐」按钮触发）、搜索范围控制（可选「全网」「近一天」「近一周」「近一月」「近一年」）、同一会话内相似 query 缓存去重。体验优化：联网开关状态在会话内保持、跨会话恢复上次选择；网络异常时回退到普通模式 + 友好提示，不打断对话流；来源链接支持长按复制 / 点击跳转浏览器。修复：联网回复偶发的 Markdown 渲染错位（来源列表与正文分离）、搜索请求超时（默认 10s，可配置 5/15/30s）。",
          en: "Web Search RAG: real-time retrieval with clickable source links (search engine + LLM summarization); manual/auto mode (per-message default vs. 🌐 toolbar trigger), scope filters (all / 1d / 1w / 1m / 1y), per-session dedup. UX: per-conversation toggle persistence, graceful fallback on network errors, source links support long-press copy / tap-to-open in browser. Fixes: occasional Markdown rendering misalignment of source list, configurable search timeout (default 10s, options 5/15/30s).",
        },
        highlights: [
          { icon: "Globe", text: { zh: "联网搜索 RAG", en: "Web Search RAG" } },
          { icon: "ListChecks", text: { zh: "来源面板 & 缓存去重", en: "Source Panel & Cache" } },
          { icon: "Sliders", text: { zh: "5 种范围 + 手动/自动", en: "5 Scopes + Manual/Auto" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.3",
        date: "2026.07.31",
        label: { zh: "应用内更新", en: "In-App Update" },
        description: {
          zh: "重写 UpdateChecker：使用系统 DownloadManager + FileProvider，APK 下载完成后可直接在应用内唤起安装，无需跳浏览器。修复 Android 7.0+ FileUriExposedException（必须用 content:// URI）、Android 13+ RECEIVER_NOT_EXPORTED（DownloadManager.ACTION_DOWNLOAD_COMPLETE 广播必须新签名注册）。下载体验优化：实时进度条 + 状态回调（pending / running / paused / successful / failed / canceled），下载失败可一键重试。",
          en: "Rewrote UpdateChecker with system DownloadManager + FileProvider for in-app APK install (no browser hop). Fixed Android 7.0+ FileUriExposedException (must use content:// URI) and Android 13+ RECEIVER_NOT_EXPORTED for DownloadManager.ACTION_DOWNLOAD_COMPLETE broadcast. Optimized download experience with real-time progress bar and state callbacks (pending / running / paused / successful / failed / canceled).",
        },
        highlights: [
          { icon: "Wrench", text: { zh: "DownloadManager + FileProvider", en: "DownloadManager + FileProvider" } },
          { icon: "Activity", text: { zh: "应用内安装（无需跳浏览器）", en: "In-App Install (No Browser)" } },
          { icon: "BarChart", text: { zh: "下载进度条 + 状态回调", en: "Progress Bar + State Callbacks" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.0",
        date: "2026.07.31",
        label: { zh: "正式上线", en: "Official Launch" },
        description: {
          zh: "Quiddity-Android 首发。核心能力：11 家 AI 服务商、60+ 模型可选（基础级 / 进阶级 / 完整级 / 视觉级），模型分配方案按场景自动匹配；多轮对话 + 上下文记忆（1-200 轮可配）；会话压缩（记忆库）基础级 12 轮 / 进阶级 40 轮 / 完整级 80 轮自动触发；角色卡 / System Prompt；Markdown + 代码高亮；图像识别（Vision 模型）；暗黑 / 浅色主题；离线草稿 / 消息搜索 / 会话导出；API Key 与对话记录使用 EncryptedFile（AES256-GCM）加密保存。v1.0.1 / v1.0.2 为 versionCode 递增重新签名发布。",
          en: "First official release: 11 AI providers, 60+ models (BASIC / ADVANCED / FULL / VISION), scenario-based auto-routing, multi-turn chat with configurable context (1-200 rounds), memory-bank compression (BASIC 12 / ADVANCED 40 / FULL 80 rounds), persona cards, Markdown + code highlighting, Vision, light/dark themes, offline drafts, message search, export, EncryptedFile (AES256-GCM) for API keys. v1.0.1 / v1.0.2 are versionCode bumps with re-signed releases.",
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
