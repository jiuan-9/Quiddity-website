import type { I18nText } from "./types";

/** 页面标题 */
export const timelineTitle: I18nText = {
  zh: "版本历程",
  en: "Changelog",
};

/** 页面副标题 */
export const timelineSubtitle: I18nText = {
  zh: " ",
  en: " ",
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
  /** lucide 图标名 */
  icon: "Smartphone" | "Monitor" | "Bot";
  /** 状态徽章 */
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
          zh: "全新主动消息（时间库）功能：AI 在每天指定时间主动向你发消息。总设置开启后，会话级开启即生成今日时间库并由系统闹钟触发；决策由 AI 基于未压缩聊天记录自主判断是否发送。",
          en: "New Proactive Messages (Time Library) feature: the AI sends you messages on a daily schedule. After enabling the global toggle, turn it on per conversation to generate today's time library and register system alarms; the AI decides whether to send based on uncompressed chat history.",
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
        label: { zh: "联网搜索 RAG", en: "Web Search RAG" },
        description: {
          zh: "全新联网搜索（RAG）功能：AI 可实时检索网络信息并在回答中显示来源链接；支持手动 / 自动模式、全网 / 时间范围过滤，结果缓存去重。MessageStreamCoordinator 重构使流式输出更稳定。",
          en: "New Web Search (RAG) capability: real-time retrieval with source links; manual/auto mode, scope filters, result dedup; MessageStreamCoordinator refactored for stable streaming.",
        },
        highlights: [
          { icon: "Globe", text: { zh: "联网搜索 RAG", en: "Web Search RAG" } },
          { icon: "ListChecks", text: { zh: "来源面板 & 缓存", en: "Source Panel & Cache" } },
          { icon: "Workflow", text: { zh: "MessageStreamCoordinator 重构", en: "MessageStreamCoordinator Refactor" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.0",
        date: "2026.07.31",
        label: { zh: "正式上线", en: "Official Launch" },
        description: {
          zh: "Quiddity-Android 正式版首发：11 家 AI 服务商、60+ 模型可选，模型分配方案自动匹配最优模型；多轮对话、上下文记忆、会话压缩（记忆库）、角色卡 / System Prompt、Markdown + 代码高亮、Vision 多模态、暗黑 / 浅色主题、本地加密存储等。",
          en: "Quiddity-Android first official release: 11 AI providers, 60+ models with auto-routing, multi-turn chat, context memory, compression (memory bank), persona cards, Markdown + code highlighting, Vision, light/dark themes, encrypted local storage.",
        },
        highlights: [
          { icon: "Layers", text: { zh: "11 家服务商 / 60+ 模型", en: "11 Providers / 60+ Models" } },
          { icon: "Palette", text: { zh: "AI 人设精调引擎", en: "AI Persona Tuning Engine" } },
          { icon: "Lock", text: { zh: "本地加密存储", en: "Encrypted Local Storage" } },
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

/** 顶部统计条（按当前 milestone 总数动态计算） */
export const timelineStats = (() => {
  const total = timelineProductGroups.reduce((sum, g) => sum + g.versions.length, 0);
  const products = timelineProductGroups.length;
  return [
    { value: String(total), label: { zh: "小版本发布", en: "Minor Releases" } },
    { value: String(products), label: { zh: "产品线", en: "Product Lines" } },
    { value: "11", label: { zh: "AI 服务商", en: "AI Providers" } },
    { value: "60+", label: { zh: "大语言模型", en: "LLMs" } },
  ];
})();

/** 状态徽章文案 */
export const statusLabel: Record<TimelineProduct["status"], I18nText> = {
  live: { zh: "已上线", en: "Live" },
  maintenance: { zh: "维护中", en: "Maintenance" },
  upcoming: { zh: "筹备中", en: "In Preparation" },
};
