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
        zh: "Android 客户端，多模型 AI 对话、主动消息。",
        en: "Android client — multi-model AI chat, proactive messages.",
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
          zh: "让 AI 在每天固定时间主动给你发消息。开启后 AI 会根据聊天内容自己决定要不要发，不用再等你先开口。",
          en: "Let the AI send you messages at fixed times each day. Once enabled, the AI decides on its own whether to send based on your chat history — no need to message first.",
        },
        highlights: [
          { icon: "Bell", text: { zh: "定时主动发消息", en: "Scheduled Proactive Messages" } },
          { icon: "Clock", text: { zh: "迟到了也能补发", en: "Late Catch-up" } },
        ],
        color: "blue",
      },
      {
        version: "v1.1.0",
        date: "2026.08.01",
        label: { zh: "改版优化", en: "Polished" },
        description: {
          zh: "把流式输出（AI 边想边打字的过程）改得更稳定了，设置项也加了很多，整体更顺手。",
          en: "Made the streaming output (AI's typing animation) more stable, added many new settings options, and made the overall experience smoother.",
        },
        highlights: [
          { icon: "Wrench", text: { zh: "打字动画更稳", en: "Smoother Typing" } },
          { icon: "Sliders", text: { zh: "设置项更多", en: "More Settings" } },
        ],
        color: "blue",
      },
      {
        version: "v1.0.0",
        date: "2026.07.31",
        label: { zh: "正式上线", en: "Official Launch" },
        description: {
          zh: "第一个正式版本。可以同时用十几家 AI 厂商的几十款大模型，能写代码、能看图、会自动压缩聊天记录、API Key 在本地加密保存。",
          en: "First official release. Use dozens of large language models from a dozen AI providers, write code, recognize images, automatically compress chat history, and securely encrypt API keys on your device.",
        },
        highlights: [
          { icon: "Layers", text: { zh: "多 AI 厂商多模型", en: "Multiple AI Providers & Models" } },
          { icon: "Lock", text: { zh: "数据本地加密", en: "Local Data Encryption" } },
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
          zh: "桌面端首发，下载即用，不用安装。",
          en: "First desktop release. Download and run, no installation needed.",
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
          zh: "项目正式立项启动。",
          en: "Project officially kicked off.",
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
