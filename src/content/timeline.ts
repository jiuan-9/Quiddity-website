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
          zh: "AI 在每天指定时间主动向你发消息；时间库由系统闹钟触发，AI 基于未压缩聊天记录自主判断是否发送。",
          en: "AI sends messages on a daily schedule; time library triggered by system alarms; AI decides whether to send based on uncompressed chat history.",
        },
        highlights: [
          { icon: "Bell", text: { zh: "时间库 + 闹钟", en: "Time Library + Alarms" } },
          { icon: "Sliders", text: { zh: "延迟补偿 ≤5 分钟", en: "Late Compensation ≤5 min" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.1",
        date: "2026.08.01",
        label: { zh: "应用内更新修复", en: "In-App Update Fixes" },
        description: {
          zh: "修复部分手机「检查更新」失败（多源 fallback）与「启动下载失败」（FileProvider）。",
          en: "Fixed 'update check failure' (multi-source fallback) and 'start download failure' (FileProvider) on some devices.",
        },
        highlights: [
          { icon: "Wrench", text: { zh: "多源 fallback", en: "Multi-Source Fallback" } },
          { icon: "LinkIcon", text: { zh: "FileProvider", en: "FileProvider" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.0",
        date: "2026.08.01",
        label: { zh: "重构与体验优化", en: "Refactor & UX Polish" },
        description: {
          zh: "MessageStreamCoordinator 重构 + SettingsBottomSheet 扩展 + 单元测试大幅扩展。",
          en: "MessageStreamCoordinator refactor + SettingsBottomSheet expansion + greatly expanded unit tests.",
        },
        highlights: [
          { icon: "Workflow", text: { zh: "流式协调器重构", en: "Stream Coordinator Refactor" } },
          { icon: "ListChecks", text: { zh: "单元测试扩展", en: "Unit Tests Expanded" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.3",
        date: "2026.07.31",
        label: { zh: "应用内更新", en: "In-App Update" },
        description: {
          zh: "重写 UpdateChecker：DownloadManager + FileProvider，应用内直接安装无需跳浏览器。",
          en: "Rewrote UpdateChecker with DownloadManager + FileProvider for in-app install (no browser hop).",
        },
        highlights: [
          { icon: "Activity", text: { zh: "应用内安装", en: "In-App Install" } },
          { icon: "BarChart3", text: { zh: "下载进度条", en: "Progress Bar" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.0",
        date: "2026.07.31",
        label: { zh: "正式上线", en: "Official Launch" },
        description: {
          zh: "Quiddity-Android 首发：11 家 AI 服务商、60+ 模型、会话压缩、API Key 加密。",
          en: "First release: 11 AI providers, 60+ models, memory-bank compression, encrypted API keys.",
        },
        highlights: [
          { icon: "Layers", text: { zh: "11 服务商 / 60+ 模型", en: "11 Providers / 60+ Models" } },
          { icon: "Lock", text: { zh: "API Key 加密", en: "API Key Encrypted" } },
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
          zh: "Windows 便携版（Jiuyu-1.0.0.exe）首发。",
          en: "Windows portable release (Jiuyu-1.0.0.exe) launched.",
        },
        highlights: [],
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
          zh: "Quiddity-Agent v1.0.0 正式立项。",
          en: "Quiddity-Agent v1.0.0 project officially launched.",
        },
        highlights: [],
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
