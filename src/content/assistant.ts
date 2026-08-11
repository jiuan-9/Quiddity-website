import type { I18nText } from "./types";

export type AssistantInfoItem = {
  title: I18nText;
  desc: I18nText;
};

/** 页面徽标 */
export const assistantPageBadge: I18nText = {
  zh: "Windows 电脑工具",
  en: "Windows PC Tool",
};

/** 页面标题 */
export const assistantPageTitle: I18nText = {
  zh: "Quiddity 授权助手",
  en: "Quiddity Authorization Assistant",
};

/** 页面副标题 */
export const assistantPageSubtitle: I18nText = {
  zh: "电脑端一键激活 Shizuku · 支持 Windows 7 SP1+ · 适用 Android 8–10 · USB 连接",
  en: "One-click Shizuku activation on PC · Windows 7 SP1+ · Android 8–10 · USB",
};

/** 下载按钮 */
export const assistantDownloadButton: I18nText = {
  zh: "下载 EXE",
  en: "Download EXE",
};

/** 文件大小 */
export const assistantSize: I18nText = {
  zh: "14,298,085 字节（≈ 13.6 MB）",
  en: "14,298,085 bytes (≈ 13.6 MB)",
};

/** SHA256 标题 */
export const assistantShaTitle: I18nText = {
  zh: "SHA256 校验值",
  en: "SHA256 checksum",
};

/** SHA256 值 */
export const assistantShaValue: I18nText = {
  zh: "65542E7C3741ED4DD38B3E5426896F6AEFEEE803C65EF65527EC733F2E176FFC",
  en: "65542E7C3741ED4DD38B3E5426896F6AEFEEE803C65EF65527EC733F2E176FFC",
};

/** 信息 chips */
export const assistantMetaTags: I18nText[] = [
  { zh: "Windows 7 SP1+ / 10 / 11", en: "Windows 7 SP1+ / 10 / 11" },
  { zh: "免安装便携版", en: "Portable, no install" },
  { zh: "无需管理员权限", en: "No admin required" },
  { zh: "无联网依赖", en: "Offline, no network" },
];

/** 适用范围标题 */
export const assistantScopeTitle: I18nText = {
  zh: "适用范围",
  en: "Scope",
};

export const assistantScope: AssistantInfoItem[] = [
  {
    title: { zh: "运行环境", en: "Runtime" },
    desc: { zh: "Windows 7 SP1（x64）/ 10 / 11 电脑，便携式 exe，免安装。", en: "Windows 7 SP1 (x64) / 10 / 11 PC; portable exe, no installation." },
  },
  {
    title: { zh: "目标手机", en: "Target phones" },
    desc: { zh: "Android 8.0–10（API 26–29），通过 USB 连接激活 Shizuku。", en: "Android 8.0–10 (API 26–29), Shizuku activation over USB." },
  },
  {
    title: { zh: "Android 11+ 不在范围", en: "Android 11+ out of scope" },
    desc: { zh: "Android 11 及以上请使用设备端无线调试配对，本工具不覆盖。", en: "Android 11+ uses on-device wireless debugging pairing; this tool does not cover it." },
  },
  {
    title: { zh: "基于 Android 11+ 的新系统不适用", en: "Android-11-based systems not covered" },
    desc: { zh: "如 HyperOS 3、OriginOS 1.0+、HarmonyOS 3/4、One UI 3+、ColorOS 11+、MagicOS 等（底层均为 Android 11+）。", en: "e.g. HyperOS 3, OriginOS 1.0+, HarmonyOS 3/4, One UI 3+, ColorOS 11+, MagicOS (all based on Android 11+)." },
  },
  {
    title: { zh: "纯血鸿蒙不支持", en: "HarmonyOS NEXT not supported" },
    desc: { zh: "HarmonyOS NEXT 不兼容 Android 应用与 adb 方式，请勿尝试。", en: "HarmonyOS NEXT is not compatible with Android apps or this adb method; do not attempt." },
  },
];

/** 功能标题 */
export const assistantFeaturesTitle: I18nText = {
  zh: "功能说明",
  en: "Features",
};

export const assistantFeatures: AssistantInfoItem[] = [
  {
    title: { zh: "一键授权流程", en: "One-click flow" },
    desc: { zh: "检测设备 → 安装 / 校验 Shizuku → 打开一次 → 启动 → 验证运行，全程自动。", en: "Detect device → install/verify Shizuku → launch once → start → verify running, all automatic." },
  },
  {
    title: { zh: "内置官方组件", en: "Bundled official components" },
    desc: { zh: "内置官方 platform-tools r34.0.4 的 adb（exe + 2 个 DLL，Win7 兼容版）和官方 Shizuku APK v13.6.0，无运行时联网依赖。", en: "Bundles official platform-tools r34.0.4 adb (exe + 2 DLLs, Win7-compatible) and official Shizuku APK v13.6.0; no runtime network dependency." },
  },
  {
    title: { zh: "Win7 兼容构建", en: "Win7-compatible build" },
    desc: { zh: "使用 Python 3.8 + PyInstaller 5.13.2 兼容工具链打包，确保 Windows 7 SP1+ 可运行。", en: "Built with the Python 3.8 + PyInstaller 5.13.2 Win7-compatible toolchain so it runs on Windows 7 SP1+." },
  },
  {
    title: { zh: "离线品牌教程", en: "Offline per-brand tutorials" },
    desc: { zh: "内置 MIUI / HyperOS / HarmonyOS 2 / ColorOS / Funtouch OS / Magic UI / One UI 等品牌教程，断网可用。", en: "Offline tutorials for MIUI / HyperOS / HarmonyOS 2 / ColorOS / Funtouch OS / Magic UI / One UI, etc." },
  },
  {
    title: { zh: "无数据收集", en: "No data collection" },
    desc: { zh: "不收集任何数据，运行日志仅保存在本机 logs 目录，可手动发给支持人员。", en: "Collects no data; session logs stay local in the logs folder and can be shared manually for support." },
  },
];

/** 使用说明标题 */
export const assistantHowTitle: I18nText = {
  zh: "使用说明",
  en: "How to use",
};

export const assistantSteps: I18nText[] = [
  {
    zh: "手机开启「USB 调试」并用数据线连接电脑（USB 模式选文件传输）。",
    en: "Enable “USB debugging” on the phone and connect with a data cable (USB mode: File Transfer).",
  },
  {
    zh: "运行 Quiddity授权助手.exe，点击「一键授权」，按提示完成安装与启动。",
    en: "Run Quiddity授权助手.exe, click “One-click authorize”, and follow the prompts.",
  },
  {
    zh: "完成后打开手机上的 Quiddity → Agent → 设置 → 权限，解锁进阶能力。",
    en: "Then open Quiddity → Agent → Settings → Permissions on the phone to unlock advanced capabilities.",
  },
];

/** 注意事项标题 */
export const assistantNotesTitle: I18nText = {
  zh: "注意事项",
  en: "Notes",
};

export const assistantNotes: AssistantInfoItem[] = [
  {
    title: { zh: "重启后需重新授权", en: "Re-authorize after reboot" },
    desc: { zh: "手机重启后 Shizuku 需要重新授权，重新运行本工具即可。", en: "After a phone reboot, re-run the tool to authorize Shizuku again." },
  },
  {
    title: { zh: "未检测到设备", en: "Device not detected" },
    desc: { zh: "检查是否为数据线（非充电线）、USB 模式是否为文件传输、驱动是否正常。", en: "Check for a data (not charge-only) cable, USB mode set to File Transfer, and driver status." },
  },
  {
    title: { zh: "授权弹窗", en: "Authorization prompt" },
    desc: { zh: "手机上出现「允许 USB 调试」时需解锁并点允许。", en: "Unlock the phone and tap “Allow USB debugging” when prompted." },
  },
  {
    title: { zh: "安装失败（签名冲突）", en: "Install failed (signature conflict)" },
    desc: { zh: "如提示 INSTALL_FAILED_UPDATE_INCOMPATIBLE，需先卸载旧版 Shizuku 再重新安装。", en: "If INSTALL_FAILED_UPDATE_INCOMPATIBLE appears, uninstall the old Shizuku first, then reinstall." },
  },
  {
    title: { zh: "Shizuku 已运行但 Quiddity 仍锁定", en: "Shizuku running but Quiddity still locked" },
    desc: { zh: "在 Quiddity Agent 设置里点击「去开启」，并在手机上允许绑定授权弹窗。", en: "Tap “Enable” in Quiddity Agent settings and allow the binder authorization dialog on the phone." },
  },
];

/** 内置 Shizuku 信息 */
export const assistantBundledShizuku: I18nText = {
  zh: "内置 Shizuku 为官方版 v13.6.0，SHA256：6E273AB0E991C4E79BC8B1BBB9B9DD739CCAC1A8712A541A214078886B7B790F",
  en: "Bundled Shizuku is official v13.6.0, SHA256: 6E273AB0E991C4E79BC8B1BBB9B9DD739CCAC1A8712A541A214078886B7B790F",
};

/** 返回首页 */
export const assistantBackHome: I18nText = {
  zh: "返回首页",
  en: "Back to Home",
};
