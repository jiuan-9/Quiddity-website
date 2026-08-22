import type { I18nText } from "./types";

export type MobileInfoItem = {
  title: I18nText;
  desc: I18nText;
};

/** 页面徽标 */
export const mobilePageBadge: I18nText = {
  zh: "Android 手机版",
  en: "Android App",
};

/** 页面标题 */
export const mobilePageTitle: I18nText = {
  zh: "Quiddity-Android",
  en: "Quiddity-Android",
};

/** 页面副标题（以最新版为准） */
export const mobilePageSubtitle: I18nText = {
  zh: "手机专用版本 · 最新版 v1.6.1（2026-08-22 发布）",
  en: "Mobile version · Latest v1.6.1 (released 2026-08-22)",
};

/** 下载按钮 */
export const mobileDownloadButton: I18nText = {
  zh: "下载 APK",
  en: "Download APK",
};

/** 文件大小 */
export const mobileSize: I18nText = {
  zh: "4,332,741 字节（≈ 4.13 MB）",
  en: "4,332,741 bytes (≈ 4.13 MB)",
};

/** GitHub 备用下载 */
export const mobileMirrorLabel: I18nText = {
  zh: "下载慢？用 GitHub 备用下载",
  en: "Slow? Use GitHub mirror",
};

/** SHA256 标题 */
export const mobileShaTitle: I18nText = {
  zh: "SHA256 校验值",
  en: "SHA256 checksum",
};

/** SHA256 值 */
export const mobileShaValue: I18nText = {
  zh: "2EF19A1518982F4A434A9471BEA4434B2C6A5E2257CBDDB0D4DF9B9D10BF38A2",
  en: "2EF19A1518982F4A434A9471BEA4434B2C6A5E2257CBDDB0D4DF9B9D10BF38A2",
};

/** 版本信息 chips */
export const mobileMetaTags: I18nText[] = [
  { zh: "最新版 v1.6.1", en: "Latest v1.6.1" },
  { zh: "versionCode 17", en: "versionCode 17" },
  { zh: "Android 8.0+", en: "Android 8.0+" },
  { zh: "完全免费", en: "Completely Free" },
];

/** 系统要求标题 */
export const mobileRequirementsTitle: I18nText = {
  zh: "系统要求",
  en: "System Requirements",
};

export const mobileRequirements: MobileInfoItem[] = [
  {
    title: { zh: "Android 8.0（API 26）及以上", en: "Android 8.0 (API 26) or above" },
    desc: { zh: "支持 Android 8.0 及以上版本的手机 / 平板。", en: "Supports phones / tablets on Android 8.0 and above." },
  },
  {
    title: { zh: "鸿蒙（兼容 Android 应用）", en: "HarmonyOS (Android-compatible)" },
    desc: { zh: "兼容 Android 应用的鸿蒙系统（如鸿蒙 2 / 3 / 4）可以正常安装使用。", en: "HarmonyOS versions compatible with Android apps (e.g. HarmonyOS 2/3/4) work normally." },
  },
  {
    title: { zh: "纯血鸿蒙（HarmonyOS NEXT）不兼容", en: "HarmonyOS NEXT is NOT supported" },
    desc: { zh: "纯血鸿蒙不兼容 Android 应用，无法安装 Quiddity-Android，请勿下载。", en: "HarmonyOS NEXT cannot install Android apps, so Quiddity-Android cannot be installed. Do not download." },
  },
  {
    title: { zh: "覆盖安装保留数据", en: "Upgrade keeps your data" },
    desc: { zh: "覆盖安装保留全部本地数据：会话、消息、API Key、设置等。", en: "Upgrading keeps all local data: conversations, messages, API keys, and settings." },
  },
];

/** 与电脑版的关系标题 */
export const mobileDesktopTitle: I18nText = {
  zh: "和电脑版的关系",
  en: "Relationship with Desktop",
};

export const mobileDesktopPoints: MobileInfoItem[] = [
  {
    title: { zh: "手机版（本页）", en: "Mobile (this page)" },
    desc: { zh: "Quiddity-Android 是 Android 手机专用版本，从本页下载安装。", en: "Quiddity-Android is the Android mobile version; install it from this page." },
  },
  {
    title: { zh: "电脑版（Windows）", en: "Desktop (Windows)" },
    desc: { zh: "Quiddity-Chat 与 Quiddity-Agent 是 Windows 桌面端，目前处于维护中，下载暂不可用。", en: "Quiddity-Chat and Quiddity-Agent are Windows desktop apps, currently under maintenance with downloads unavailable." },
  },
  {
    title: { zh: "三个独立产品", en: "Three independent products" },
    desc: { zh: "Android、Chat、Agent 是三个独立产品，数据互不互通。", en: "Android, Chat, and Agent are three independent products with no data sync." },
  },
];

/** 最新版更新内容标题 */
export const mobileLatestTitle: I18nText = {
  zh: "最新版 v1.6.1 更新内容",
  en: "What's new in v1.6.1",
};

export const mobileLatestChanges: MobileInfoItem[] = [
  {
    title: { zh: "修复 Shizuku 授权误报", en: "Fix Shizuku permission false alarm" },
    desc: { zh: "修复「Shizuku 已授权仍无法开启工具分类」：剪贴板读写、打开应用、定时消息、睡眠、OCR 等无需系统权限的工具不再被误判为需要 Shizuku 授权，分类主开关恢复正常。", en: "Fixed 'Shizuku granted but tool categories still locked': tools that need no system permission (clipboard, open app, scheduled messages, sleep, OCR) are no longer misreported as requiring Shizuku, and category master switches work again." },
  },
  {
    title: { zh: "新增 DeepSeek 多模态模型", en: "New DeepSeek multimodal model" },
    desc: { zh: "接入 DeepSeek 官方最新多模态模型 deepseek-v4-flash-vision-exp（实验版视觉理解）：选中该模型对话时发送图片直接识图，无需再配置视觉 OCR 兜底。", en: "Added DeepSeek's newest multimodal model deepseek-v4-flash-vision-exp (experimental vision): send images straight in chat for recognition — no separate vision OCR fallback needed." },
  },
];

/** v1.5.0 群聊标题 */
export const mobileChatTitle: I18nText = {
  zh: "v1.5.0 群聊功能（完整落地）",
  en: "v1.5.0 Group Chat (fully shipped)",
};

export const mobileChatFeatures: MobileInfoItem[] = [
  {
    title: { zh: "私聊 / 群聊双 Tab", en: "Chat / Group tabs" },
    desc: { zh: "首页双 Tab，独立列表与新建入口，切换时列表淡入淡出。", en: "Two tabs on the home screen with separate lists and create entries, cross-fading on switch." },
  },
  {
    title: { zh: "建群与成员管理", en: "Create groups & manage members" },
    desc: { zh: "新建即进入空群聊（自动编号「新群聊 N」），在会话设置中添加 1～3 个成员，逐个校验用户名 / AI 名 / API 测试。", en: "Create an empty group (auto-named “New Group N”), add 1–3 members in session settings with per-member validation." },
  },
  {
    title: { zh: "头像点击回复", en: "Tap avatar to reply" },
    desc: { zh: "点成员头像指定该成员接话；最多 1 个在回复 + 2 个排队，上下文在点击那一刻定格。", en: "Tap a member's avatar to have them respond; up to 1 replying + 2 queued, with context frozen at tap time." },
  },
  {
    title: { zh: "停止与自动重试", en: "Stop & auto-retry" },
    desc: { zh: "回复期间可停止（只停当前或清空队列）；失败自动重试 5 次并逐次通知，任一成员 5 次失败后整个队列取消。", en: "Stop during replies (current only or clear queue); failures auto-retry 5 times with notices, and the whole queue cancels after 5 failures." },
  },
  {
    title: { zh: "群聊设置", en: "Group settings" },
    desc: { zh: "群名称、上下文条数（默认 50，范围 1～200）、成员管理（最多 3 个最少 1 个）、停止模式。", en: "Group name, context size (default 50, range 1–200), member management (max 3, min 1), and stop mode." },
  },
  {
    title: { zh: "导入导出 v2", en: "Import/export v2" },
    desc: { zh: "导入完整恢复群聊（会话 / 消息 / 成员引用），悬空引用计入跳过清单；导出前引用校验保持不变。", en: "Import fully restores groups (sessions/messages/member refs); dangling refs go to a skip list; export validation unchanged." },
  },
  {
    title: { zh: "小应用", en: "Mini apps" },
    desc: { zh: "v1.5.0 起新增群聊 / 小应用能力。", en: "Group chat / mini apps added since v1.5.0." },
  },
];

/** 历史功能标题 */
export const mobileHistoryTitle: I18nText = {
  zh: "历史功能一览",
  en: "Feature History",
};

export const mobileHistoryFeatures: MobileInfoItem[] = [
  {
    title: { zh: "11 家 AI 服务商 · 60+ 模型", en: "11 AI providers · 60+ models" },
    desc: { zh: "接入 DeepSeek、Kimi、豆包、通义千问等 11 家服务商，60+ 模型可选。", en: "11 providers including DeepSeek, Kimi, Doubao, Qwen with 60+ models." },
  },
  {
    title: { zh: "对话核心能力", en: "Core chat features" },
    desc: { zh: "多轮对话 / 上下文记忆 / 角色卡 / Markdown / Vision。", en: "Multi-turn chat, context memory, persona cards, Markdown, and Vision." },
  },
  {
    title: { zh: "主题与数据", en: "Themes & data" },
    desc: { zh: "暗黑 / 浅色主题、离线草稿、消息搜索。", en: "Dark/light themes, offline drafts, and message search." },
  },
  {
    title: { zh: "联网搜索 RAG（v1.1.0+）", en: "Web search RAG (v1.1.0+)" },
    desc: { zh: "支持联网搜索增强回答。", en: "Web-search augmented answers." },
  },
  {
    title: { zh: "主动消息（v1.2.0+）", en: "Proactive messages (v1.2.0+)" },
    desc: { zh: "支持应用主动推送消息。", en: "App-initiated messages supported." },
  },
  {
    title: { zh: "角色库 / 数据导出 v2（v1.3.0+）", en: "Persona library / export v2 (v1.3.0+)" },
    desc: { zh: "角色库管理，数据导出升级到 v2。", en: "Persona library and upgraded data export v2." },
  },
  {
    title: { zh: "对话导出长图 / 聊天记录搜索（v1.4.0+）", en: "Long-image export / history search (v1.4.0+)" },
    desc: { zh: "对话可导出长图，聊天记录支持搜索。", en: "Export chats as long images and search history." },
  },
  {
    title: { zh: "群聊 / 小应用（v1.5.0+）", en: "Group chat / mini apps (v1.5.0+)" },
    desc: { zh: "群聊功能完整落地，小应用能力上线。", en: "Group chat fully shipped with mini apps." },
  },
];

/** 已知限制标题 */
export const mobileLimitsTitle: I18nText = {
  zh: "已知限制",
  en: "Known Limitations",
};

export const mobileKnownLimits: MobileInfoItem[] = [
  {
    title: { zh: "群聊接话为点名模式", en: "Turn-taking is tap-to-reply" },
    desc: { zh: "群聊采用「用户点名回复」模式，由用户决定下一位发言人；自动接话判断（decideGroupResponder）未启用。", en: "Group chat uses tap-to-reply turn-taking; automatic turn detection (decideGroupResponder) is not enabled." },
  },
  {
    title: { zh: "旧模型配置的温度上限", en: "Legacy temperature caps" },
    desc: { zh: "v1.5.1：已保存的旧模型配置若带温度上限，仍会保留原值用于请求钳制；后续新建 / 编辑不再写入新的温度设置。", en: "v1.5.1: saved legacy model configs with temperature caps keep their values for request clamping; new/edited configs no longer write temperature settings." },
  },
];

/** 覆盖安装提示 */
export const mobileUpgradeTip: I18nText = {
  zh: "v1.0.0 ~ v1.5.0 用户可直接覆盖安装，本地数据、会话、API Key、设置等完全保留。",
  en: "Users on v1.0.0 – v1.5.0 can install over directly; local data, conversations, API keys, and settings are fully preserved.",
};

/** 返回首页 */
export const mobileBackHome: I18nText = {
  zh: "返回首页",
  en: "Back to Home",
};
