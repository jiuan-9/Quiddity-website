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
  zh: "Android 客户端已上线，可直接下载。Windows 桌面端下载通道临时关闭（维护中），恢复时间另行通知。Android 与桌面端为两个独立产品，不互通数据。",
  en: "The Android client is live and ready to download. The Windows desktop download channel is temporarily closed (under maintenance); restoration will be announced separately. Android and desktop are independent products with no data sync.",
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

/** 桌面端维护中文案（下载按钮临时停用时显示） */
export const desktopMaintenanceBadge: I18nText = {
  zh: "维护中",
  en: "Maintenance",
};

export const desktopMaintenanceVersion: I18nText = {
  zh: "下载暂不可用 · 修复中",
  en: "Download unavailable · Under repair",
};

export const desktopMaintenanceNote: I18nText = {
  zh: "桌面端下载通道暂时关闭，正在紧急修复中。恢复时间另行通知，敬请关注公告。",
  en: "The desktop download channel is temporarily closed and is under urgent repair. Restoration time will be announced separately — please check the announcements.",
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
