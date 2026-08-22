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
        version: "v1.6.0",
        date: "2026.08.22",
        label: { zh: "Agent 模式 + 快速设定大升级", en: "Agent Mode & Quick Setup Upgrade" },
        description: {
          zh: "主页改成「私聊 / 群聊 / Agent」三 Tab。Agent 模式内置 16 个工具（读屏、通知、用量、文件、Shizuku 授权写入等）、权限中心与本地思考。快速设定大幅强化：描述再模糊也能剖析成结构化角色卡，只给一个名字时就按最有名的那位补全；新建会话自动滚到列表顶部；还修复了 AI 回复偶发「动作旁白 + 台词」重复的问题。",
          en: "Home now has three tabs: 私聊 / 群聊 / Agent. Agent mode packs 16 tools (screen reading, notifications, usage, files, Shizuku-approved writes), a permission center, and local reasoning. Quick Setup got a big upgrade: it turns even vague descriptions into a structured character card — a bare name is filled in from the most popular reference. New conversations auto-scroll to the top, and AI replies no longer repeat an action narration before the line.",
        },
        highlights: [
          { icon: "Bot", text: { zh: "Agent 模式（三 Tab + 16 工具）", en: "Agent Mode (three tabs & 16 tools)" } },
          { icon: "Layers", text: { zh: "快速设定模糊输入也能成卡", en: "Quick Setup cards from vague input" } },
          { icon: "Sliders", text: { zh: "新建会话自动滚顶", en: "New chat auto-scrolls to top" } },
        ],
        color: "blue",
      },
      {
        version: "v1.5.0",
        date: "2026.08.10",
        label: { zh: "群聊 + 小应用", en: "Group Chat & Mini Apps" },
        description: {
          zh: "群聊上线：私聊 / 群聊双 Tab，添加成员后点头像就能让 TA 接话。主页下拉有小应用中心，内置棋盘等小应用，可和好友或 AI 对弈；回复温度也能自己调。",
          en: "Group chat is here with Private / Group tabs — add members and tap an avatar to have them reply. Pull down from home to open the mini app center with board games you can play with friends or AI; reply temperature is now adjustable too.",
        },
        highlights: [
          { icon: "Users", text: { zh: "私聊 / 群聊双 Tab", en: "Private & Group Tabs" } },
          { icon: "Puzzle", text: { zh: "小应用中心（棋盘等）", en: "Mini App Center" } },
          { icon: "Thermometer", text: { zh: "回复温度可调", en: "Adjustable Temperature" } },
        ],
        color: "blue",
      },
      {
        version: "v1.4.0",
        date: "2026.08.04",
        label: { zh: "导出长图 + 记录搜索", en: "Long-image Export & History Search" },
        description: {
          zh: "聊天记录可以一键导出成长图，直接分享到微信 / QQ 或存进相册；搜索也升级了，既能全局搜所有会话的消息，也能在当前会话里搜，点一下结果直接跳到对应消息。更新下载和 API 密钥存储也做了加固。",
          en: "Export chats as a shareable long image for WeChat/QQ or your gallery. Search now covers all conversations globally or within the current chat, jumping straight to the matched message. Also hardened in-app updates and API key storage.",
        },
        highlights: [
          { icon: "Image", text: { zh: "对话一键导出长图", en: "One-tap Long-image Export" } },
          { icon: "Search", text: { zh: "全局 / 会话内记录搜索", en: "Global & In-chat Search" } },
        ],
        color: "blue",
      },
      {
        version: "v1.3.0",
        date: "2026.08.03",
        label: { zh: "角色库与数据升级", en: "Character Library & Data v2" },
        description: {
          zh: "为 2.0.0 的群聊、角色库和记忆调用式预留好数据契约与接口，先把底子打好。新增角色库，备份导出升级为 v2 格式，旧的 v1 备份也能导入并自动迁移。",
          en: "Laid down the data contracts and interfaces for 2.0.0's group chats, character library, and memory tools. Added a character library, upgraded backup export to the v2 format, and old v1 backups still import and migrate automatically.",
        },
        highlights: [
          { icon: "ListChecks", text: { zh: "角色库 + 数据契约 v2", en: "Character Library + Data Contract v2" } },
          { icon: "Workflow", text: { zh: "为群聊 / 记忆调用预留接口", en: "Interfaces Reserved for Groups & Memory Tools" } },
        ],
        color: "blue",
      },
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
