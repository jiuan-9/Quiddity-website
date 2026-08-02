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
  zh: "Quiddity-Android 已正式上线，可直接下载。Android、Chat、Agent 为三个独立产品，数据互不互通。",
  en: "Quiddity-Android is live and ready to download. Android, Chat, and Agent are three independent products with no data sync.",
};

/** Quiddity-Chat 桌面端 */
export const desktopTitle: I18nText = {
  zh: "Quiddity-Chat",
  en: "Quiddity-Chat",
};

export const desktopVersion: I18nText = {
  zh: "v1.0.0 · 桌面端 · 维护中",
  en: "v1.0.0 · Desktop · Maintenance",
};

export const desktopBadge: I18nText = {
  zh: "Chat",
  en: "Chat",
};

/** Chat 端维护中文案（下载按钮临时停用时显示） */
export const desktopMaintenanceBadge: I18nText = {
  zh: "维护中",
  en: "Maintenance",
};

export const desktopMaintenanceVersion: I18nText = {
  zh: "下载暂不可用 · 修复中",
  en: "Download unavailable · Under repair",
};

export const desktopMaintenanceNote: I18nText = {
  zh: "Quiddity-Chat 下载通道暂时关闭，正在紧急修复中。",
  en: "The Quiddity-Chat download channel is temporarily closed and is under urgent repair.",
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
  zh: "v1.2.0 · Android 8.0+",
  en: "v1.2.0 · Android 8.0+",
};

/** Android 安装提示 */
export const androidNote: I18nText = {
  zh: "注意：Quiddity-Android、Quiddity-Chat、Quiddity-Agent 为三个独立产品，会话、API Key 等数据互不互通。首次安装需在系统设置中允许「安装来自此来源的应用」，APK 已被官方签名，可放心安装。",
  en: "Note: Quiddity-Android, Quiddity-Chat, and Quiddity-Agent are three independent products — sessions and API keys do not sync. On first install, allow \"Install from this source\" in system settings. The APK is officially signed and safe to install.",
};

/** Android 备用下载（GitHub Releases 兜底） */
export const androidMirrorLabel: I18nText = {
  zh: "下载慢？点这里用 GitHub 备用",
  en: "Slow? Use GitHub mirror",
};

/** 桌面 / Android 关系说明（tooltip 备用） */
export const androidIndependentNote: I18nText = {
  zh: "Android 与 Chat、Agent 桌面端不互通数据",
  en: "Android does not sync data with Chat or Agent desktop",
};

/** 底部 meta tags */
export const downloadMetaTags: { icon: string; label: I18nText }[] = [
  { icon: "Sparkles", label: { zh: "版本 1.2.0", en: "Version 1.2.0" } },
  { icon: "Dot", label: { zh: "Windows 10+", en: "Windows 10+" } },
  { icon: "Dot", label: { zh: "完全免费", en: "Completely Free" } },
  { icon: "Dot", label: { zh: "无需注册", en: "No Sign-up" } },
  { icon: "Dot", label: { zh: "代码高亮", en: "Code Highlighting" } },
];
