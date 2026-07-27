/**
 * Privacy — 隐私声明页面文案（中英双语）
 *
 * 核心承诺：
 *   - 本网站不收集任何用户个人信息
 *   - 不使用 Cookie（除语言偏好本地存储）
 *   - 不嵌入任何第三方追踪脚本
 *   - 网站本身只托管静态资源，所有"用户行为"都发生在用户本地浏览器
 *
 * 与 Quiddity 桌面应用的关系：
 *   - 本声明仅覆盖 https://quiddity-3by.pages.dev/ 官网
 *   - 桌面应用 Quiddity 自身的隐私行为不在此声明范围
 *   - 桌面应用联网时才会与第三方 AI 服务通信，详情见桌面应用内设置
 */

import type { I18nText, I18nList } from "./types";

/* ---------- 页面元信息 ---------- */

/** 页面标题 */
export const privacyPageTitle: I18nText = {
  zh: "隐私声明",
  en: "Privacy Policy",
};

/** 页面副标题 */
export const privacyPageSubtitle: I18nText = {
  zh: "我们承诺：本网站不收集任何用户个人信息",
  en: "Our commitment: this website does not collect any personal information.",
};

/** 页眉徽章 */
export const privacyBadge: I18nText = {
  zh: "PRIVACY",
  en: "PRIVACY",
};

/** 返回首页按钮 */
export const privacyBackHome: I18nText = {
  zh: "返回首页",
  en: "Back to Home",
};

/** 最后更新日期 */
export const privacyLastUpdated: I18nText = {
  zh: "最后更新",
  en: "Last updated",
};

/** 当前生效日期（发布日） */
export const privacyEffectiveDate: I18nText = {
  zh: "2026-07-27",
  en: "2026-07-27",
};

/* ---------- 核心承诺区 ---------- */

/** 核心承诺标题 */
export const privacyPromiseTitle: I18nText = {
  zh: "我们的核心承诺",
  en: "Our Core Promise",
};

/** 核心承诺正文 */
export const privacyPromiseBody: I18nText = {
  zh: "Quiddity 官方网站（quiddity-3by.pages.dev）是一个纯静态展示页面。我们不收集、不存储、不传输、不出售任何用户个人信息。本网站没有注册登录系统、没有表单提交、没有评论系统、没有分析后端。所有页面内容均以静态资源形式托管在 CDN 上，您的访问不会在服务器留下可关联到您身份的记录。",
  en: "The Quiddity official website (quiddity-3by.pages.dev) is a purely static showcase page. We do not collect, store, transmit, or sell any personal information. This website has no registration system, no form submission, no comment system, and no analytics backend. All page content is hosted as static assets on a CDN, and your visit leaves no server-side record that can be linked back to your identity.",
};

/* ---------- 信息收集章节 ---------- */

/** "信息收集"段落标题 */
export const privacySectionCollectTitle: I18nText = {
  zh: "1. 我们收集什么",
  en: "1. What We Collect",
};

/** "信息收集"段落正文 */
export const privacySectionCollectBody: I18nText = {
  zh: "答案是：什么都不收集。具体而言：",
  en: "The short answer: nothing. Specifically:",
};

/** 收集项清单（每项是双语的简短陈述） */
export const privacyCollectItems: I18nList = [
  {
    zh: "不收集姓名、邮箱、手机号等任何可识别个人身份的信息",
    en: "No name, email, phone number, or any personally identifiable information is collected",
  },
  {
    zh: "不收集 IP 地址、浏览器指纹、设备信息",
    en: "No IP address, browser fingerprint, or device information is collected",
  },
  {
    zh: "不记录访问日志、停留时长、点击行为、滚动深度",
    en: "No access logs, dwell time, click behavior, or scroll depth are recorded",
  },
  {
    zh: "不使用任何网站分析服务（无 Google Analytics、无百度统计、无任何第三方追踪）",
    en: "No website analytics services are used (no Google Analytics, no Baidu Tongji, no third-party tracking of any kind)",
  },
  {
    zh: "不嵌入任何第三方广告 SDK 或社交媒体像素",
    en: "No third-party ad SDKs or social media pixels are embedded",
  },
];

/* ---------- Cookie 章节 ---------- */

/** "Cookie 与本地存储"段落标题 */
export const privacySectionCookieTitle: I18nText = {
  zh: "2. Cookie 与本地存储",
  en: "2. Cookies and Local Storage",
};

/** "Cookie 与本地存储"段落正文 */
export const privacySectionCookieBody: I18nText = {
  zh: "本网站不使用任何追踪性 Cookie。唯一可能写入您浏览器本地的数据是您的语言偏好（中文 / 英文），通过 localStorage 的 quiddity-lang 键保存，仅用于下次访问时记住您的选择。该数据：",
  en: "This website does not use any tracking cookies. The only data that may be written to your browser's local storage is your language preference (Chinese / English), saved via the localStorage key quiddity-lang, used solely to remember your choice on your next visit. This data:",
};

/** Cookie 列表 */
export const privacyCookieItems: I18nList = [
  {
    zh: "仅存储在您自己的浏览器中，不会上传到任何服务器",
    en: "Is stored only in your own browser and is never uploaded to any server",
  },
  {
    zh: "不包含任何个人信息，仅是一个语言代码（zh / en）",
    en: "Contains no personal information — only a language code (zh / en)",
  },
  {
    zh: "您可以随时通过浏览器设置清除 localStorage 来删除它",
    en: "Can be deleted at any time by clearing localStorage in your browser settings",
  },
];

/* ---------- 第三方链接章节 ---------- */

/** "第三方链接"段落标题 */
export const privacySectionLinksTitle: I18nText = {
  zh: "3. 第三方链接",
  en: "3. Third-Party Links",
};

/** "第三方链接"段落正文 */
export const privacySectionLinksBody: I18nText = {
  zh: "本网站包含指向外部网站的链接，例如：GitHub 仓库、桌面应用下载地址、相关法律法规参考。这些链接仅以普通外链形式（target=\"_blank\"）打开，您点击后将被带到第三方网站。本声明不适用于第三方网站，我们建议您在离开本网站后查阅对应网站的隐私政策。",
  en: "This website contains links to external sites, such as: the GitHub repository, the desktop app download address, and references to relevant laws and regulations. These links open in a normal external form (target=\"_blank\"), and you will be taken to a third-party site after clicking. This policy does not apply to third-party sites, and we recommend that you read the privacy policy of the corresponding site after leaving this website.",
};

/* ---------- CDN 与托管章节 ---------- */

/** "CDN 与托管"段落标题 */
export const privacySectionCdnTitle: I18nText = {
  zh: "4. CDN 与托管",
  en: "4. CDN and Hosting",
};

/** "CDN 与托管"段落正文 */
export const privacySectionCdnBody: I18nText = {
  zh: "本网站托管在 Cloudflare Pages 上，使用 Cloudflare 的全球 CDN 加速。当您访问本站时，Cloudflare 作为内容分发网络会处理您的请求。请注意，Cloudflare 作为基础设施提供方，可能会按照其自身的隐私政策处理基础的请求元数据（IP 地址等）以提供 CDN 服务、防御攻击和路由流量。我们无法控制 Cloudflare 的数据处理行为，详情请参阅 Cloudflare 的隐私政策。",
  en: "This website is hosted on Cloudflare Pages, using Cloudflare's global CDN for acceleration. When you visit this site, Cloudflare processes your request as a content delivery network. Please note that Cloudflare, as an infrastructure provider, may process basic request metadata (such as IP addresses) under its own privacy policy to provide CDN services, defend against attacks, and route traffic. We do not control Cloudflare's data processing; please refer to Cloudflare's privacy policy for details.",
};

/** Cloudflare 隐私政策链接 */
export const cloudflarePrivacyUrl = "https://www.cloudflare.com/privacypolicy/";

/* ---------- 桌面应用免责声明 ---------- */

/** "桌面应用"段落标题 */
export const privacySectionAppTitle: I18nText = {
  zh: "5. 关于 Quiddity 桌面应用",
  en: "5. About the Quiddity Desktop App",
};

/** "桌面应用"段落正文 */
export const privacySectionAppBody: I18nText = {
  zh: "本声明仅适用于 Quiddity 官方网站。当您下载并使用 Quiddity 桌面应用时，应用本身的数据处理行为（向第三方 AI 服务发送的请求内容、本地保存的对话记录等）不在本声明范围之内。请在使用桌面应用前查阅应用内的隐私与数据说明。",
  en: "This policy applies only to the Quiddity official website. When you download and use the Quiddity desktop app, the app's own data processing behavior (request content sent to third-party AI services, locally saved conversation history, etc.) is not covered by this policy. Please review the privacy and data notes within the desktop app before using it.",
};

/* ---------- 变更与联系章节 ---------- */

/** "政策变更"段落标题 */
export const privacySectionChangesTitle: I18nText = {
  zh: "6. 政策变更",
  en: "6. Changes to This Policy",
};

/** "政策变更"段落正文 */
export const privacySectionChangesBody: I18nText = {
  zh: "如果本声明发生重大变更，我们会在网站首页和本页顶部标注生效日期。变更后的声明自在本页发布之时起生效。继续使用本网站即视为您接受变更后的声明。",
  en: "If this policy is materially changed, we will mark the effective date at the top of the homepage and this page. The revised policy takes effect upon posting on this page. Continued use of this website constitutes your acceptance of the revised policy.",
};

/** "联系我们"段落标题 */
export const privacySectionContactTitle: I18nText = {
  zh: "7. 联系我们",
  en: "7. Contact Us",
};

/** "联系我们"段落正文 */
export const privacySectionContactBody: I18nText = {
  zh: "如果您对本隐私声明有任何疑问、意见或建议，欢迎通过以下邮箱与我们联系：",
  en: "If you have any questions, comments, or suggestions regarding this privacy policy, please contact us at:",
};
