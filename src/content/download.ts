import type { I18nText } from "./types";

/** 下载区 eyebrow */
export const downloadBadge: I18nText = {
  zh: "Download",
  en: "Download",
};

/** 下载区标题 */
export const downloadSectionTitle: I18nText = {
  zh: "获取 Quiddity",
  en: "Get Quiddity",
};

/** 下载区副标题 */
export const downloadSectionSubtitle: I18nText = {
  zh: "桌面端完全免费，无需注册即可使用。Android 端与桌面端为两个独立产品（不互通数据），共享同一套多模型内核。",
  en: "The desktop app is completely free with no sign-up required. The Android client and desktop app are two independent products (no data sync) sharing the same multi-model engine.",
};

/** Windows 桌面端 */
export const desktopTitle: I18nText = {
  zh: "Windows 桌面端",
  en: "Windows Desktop",
};

export const desktopVersion: I18nText = {
  zh: "v1.0.0 · 便携版",
  en: "v1.0.0 · Portable",
};

export const desktopBadge: I18nText = {
  zh: "NEW",
  en: "NEW",
};

/** 在线体验 */
export const demoTitle: I18nText = {
  zh: "在线体验",
  en: "Try Online",
};

export const demoDesc: I18nText = {
  zh: "无需下载，浏览器直接聊",
  en: "No download, chat right in your browser",
};

/** Android 客户端 */
export const mobileTitle: I18nText = {
  zh: "Android 客户端",
  en: "Android Client",
};

export const mobileDesc: I18nText = {
  zh: "全新 AI 工具 · 即将推出",
  en: "New AI tool · Coming soon",
};

export const mobileBadge: I18nText = {
  zh: "NEW",
  en: "NEW",
};

export const mobileVersion: I18nText = {
  zh: "v1.0.0 · Android 8.0+",
  en: "v1.0.0 · Android 8.0+",
};

/** Android 安装提示 */
export const androidNote: I18nText = {
  zh: "注意：Android 客户端与桌面端为两个独立产品，会话、API Key 等数据互不互通。首次安装需在系统设置中允许「安装来自此来源的应用」，APK 已被官方签名，可放心安装。",
  en: "Note: The Android client and desktop app are independent products — sessions and API keys do not sync. On first install, allow \"Install from this source\" in system settings. The APK is officially signed and safe to install.",
};

/** 桌面 / Android 关系说明（tooltip 备用） */
export const androidIndependentNote: I18nText = {
  zh: "Android 与桌面端不互通数据",
  en: "Android and desktop do not sync data",
};

/** 底部 meta tags */
export const downloadMetaTags: { icon: string; label: I18nText }[] = [
  { icon: "Sparkles", label: { zh: "版本 1.0.0", en: "Version 1.0.0" } },
  { icon: "Dot", label: { zh: "Windows 10+", en: "Windows 10+" } },
  { icon: "Dot", label: { zh: "完全免费", en: "Completely Free" } },
  { icon: "Dot", label: { zh: "无需注册", en: "No Sign-up" } },
  { icon: "Dot", label: { zh: "代码高亮", en: "Code Highlighting" } },
];
