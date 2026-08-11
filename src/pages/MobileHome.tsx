import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Download,
  ExternalLink,
  Globe,
  HelpCircle,
  Layers,
  Lock,
  Menu,
  MessageSquare,
  Puzzle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/store/i18n";
import { scrollToSection } from "@/lib/scroll";
import {
  brand,
  footerCopyright,
  footerMadeWith,
  footerSlogan,
  mobilePageBadge,
  mobilePageSubtitle,
  mobileDownloadButton,
  mobileSize,
  mobileMirrorLabel,
  mobileShaTitle,
  mobileShaValue,
  mobileMetaTags,
  mobileRequirements,
  mobileUpgradeTip,
} from "@/content";

const APK_URL = `${import.meta.env.BASE_URL}downloads/quiddity-1.5.1.apk`;
const APK_MIRROR_URL =
  "https://github.com/jiuan-9/Quiddity-website/releases/download/v1.5.1/quiddity-1.5.1.apk";

const NAV_LINKS = [
  { id: "features", label: { zh: "功能特色", en: "Features" } },
  { id: "usecases", label: { zh: "应用场景", en: "Use Cases" } },
  { id: "faq", label: { zh: "常见问题", en: "FAQ" } },
  { id: "download", label: { zh: "下载应用", en: "Download" } },
] as const;

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-2">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">{title}</h2>
      {subtitle && (
        <p className="text-dark-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Navbar() {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/[0.06] backdrop-blur-xl">
      <div
        id="navbar-bar"
        className="container mx-auto flex items-center justify-between h-16 px-4"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0"
          aria-label={t({ zh: "回到顶部", en: "Back to top" })}
        >
          <span className="text-2xl font-bold text-white tracking-wide">Quiddity</span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="text-sm font-medium text-dark-300 hover:text-white transition-colors bg-transparent border-0 cursor-pointer"
            >
              {t(link.label)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={lang === "zh" ? "Switch to English" : "切换到中文"}
            className="text-xs font-medium text-dark-400 hover:text-white transition-colors bg-transparent border border-white/[0.06] cursor-pointer px-2.5 py-1.5 rounded-md tracking-wider"
          >
            {lang === "zh" ? "EN" : "中"}
          </button>
          <button
            type="button"
            onClick={() => go("download")}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium transition-all btn-press cursor-pointer border-0"
          >
            <Download size={14} />
            <span>{t(mobileDownloadButton)}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={t({ zh: "菜单", en: "Menu" })}
            aria-expanded={open}
            className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/[0.05] bg-transparent border-0 cursor-pointer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass-strong border-t border-white/[0.06]">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => go(link.id)}
                className="text-left text-sm py-3 px-3 rounded-lg text-dark-300 hover:text-white hover:bg-white/[0.03] bg-transparent border-0 cursor-pointer"
              >
                {t(link.label)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("download")}
              className="mt-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium cursor-pointer border-0"
            >
              <Download size={14} />
              {t(mobileDownloadButton)}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { t } = useI18n();

  return (
    <header
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-dark-999 via-dark-950 to-dark-950 pt-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,176,255,0.08),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center flex-1 flex flex-col items-center justify-center">
        <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-5">
          {t(mobilePageBadge)}
        </span>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tight mb-4">
          Quiddity
        </h1>
        <h2 className="text-lg sm:text-2xl font-medium text-dark-200 tracking-[0.2em] mb-6">
          {t(footerSlogan)}
        </h2>

        <p className="text-dark-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
          {t(mobilePageSubtitle)}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-dark-400 mb-10">
          {mobileMetaTags.map((tag, idx) => (
            <span key={tag.zh} className="flex items-center gap-1">
              {idx > 0 && <span className="w-1 h-1 rounded-full bg-dark-700 inline-block mr-3" />}
              {t(tag)}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection("download")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] cursor-pointer border-0"
          >
            <Download size={20} />
            {t(mobileDownloadButton)}
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("features")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-dark-200 hover:text-white hover:border-brand-500/30 transition-all cursor-pointer border border-white/[0.08]"
          >
            {t({ zh: "了解功能", en: "Explore Features" })}
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-10 inline-flex items-center gap-1.5 text-[10px] text-dark-500 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
          <ShieldCheck size={12} className="text-emerald-400/70 shrink-0" />
          <span>
            {t(mobileShaTitle)}：<span className="font-mono text-dark-300">{t(mobileShaValue)}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

const FEATURES = [
  {
    icon: Layers,
    title: { zh: "11 家 AI 服务商 · 60+ 模型", en: "11 AI providers · 60+ models" },
    desc: {
      zh: "接入 DeepSeek、Kimi、豆包、通义千问等主流大模型，随时切换。",
      en: "DeepSeek, Kimi, Doubao, Qwen and more, switch anytime.",
    },
  },
  {
    icon: MessageSquare,
    title: { zh: "对话核心能力", en: "Core chat features" },
    desc: {
      zh: "多轮对话、上下文记忆、角色卡、Markdown 与 Vision。",
      en: "Multi-turn chat, context memory, persona cards, Markdown and Vision.",
    },
  },
  {
    icon: Users,
    title: { zh: "私聊 / 群聊双 Tab", en: "Chat / Group tabs" },
    desc: {
      zh: "独立列表与新建入口，切换时列表淡入淡出。",
      en: "Separate lists and create entries, cross-fading on switch.",
    },
  },
  {
    icon: Puzzle,
    title: { zh: "群聊小应用", en: "Group chat mini apps" },
    desc: {
      zh: "建群、成员管理、点头像指定回复，最多 1 个在回复 + 2 个排队。",
      en: "Create groups, manage members, tap avatars to reply — 1 replying + 2 queued.",
    },
  },
  {
    icon: Globe,
    title: { zh: "联网搜索 RAG", en: "Web search RAG" },
    desc: {
      zh: "联网搜索增强回答，信息更新更及时。",
      en: "Web-search augmented answers for fresher information.",
    },
  },
  {
    icon: ShieldCheck,
    title: { zh: "本地优先 · 数据保留", en: "Local-first · data kept" },
    desc: {
      zh: "会话、消息、API Key 全部保存在本地，覆盖安装不丢失。",
      en: "Conversations, messages and API keys stay local; upgrades keep everything.",
    },
  },
] as const;

function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Features"
          title={t({ zh: "功能特色", en: "Features" })}
          subtitle={t({
            zh: "一个 App 聚合主流大模型，专为手机打造的 AI 对话体验",
            en: "One app, all mainstream LLMs — AI chat built for your phone",
          })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title.zh}
                className="group relative p-5 rounded-2xl glass glow-border flex flex-col overflow-hidden hover:border-brand-500/30 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.03] to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative w-11 h-11 mb-3 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{t(f.title)}</h3>
                <p className="text-[11px] text-dark-400 leading-relaxed">{t(f.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const USE_CASES = [
  {
    icon: Sparkles,
    title: { zh: "日常问答与写作", en: "Daily Q&A and writing" },
    desc: { zh: "查资料、写文案、翻译润色，随时开口问。", en: "Research, drafting, translation — just ask." },
  },
  {
    icon: Users,
    title: { zh: "群聊协同讨论", en: "Group discussions" },
    desc: { zh: "拉上多个模型一起讨论，各抒己见。", en: "Bring multiple models into one conversation." },
  },
  {
    icon: Code2,
    title: { zh: "编程与学习", en: "Coding and learning" },
    desc: { zh: "代码解答、概念讲解、Markdown 代码高亮。", en: "Code answers, explanations, highlighted Markdown." },
  },
  {
    icon: Lock,
    title: { zh: "隐私敏感场景", en: "Privacy-sensitive use" },
    desc: { zh: "数据不出设备，本地存储，无需注册。", en: "Everything stays on-device; no sign-up required." },
  },
] as const;

function UseCases() {
  const { t } = useI18n();

  return (
    <section id="usecases" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/80 to-dark-950" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Use Cases"
          title={t({ zh: "应用场景", en: "Use Cases" })}
          subtitle={t({ zh: "无论工作、学习还是生活，Quiddity-Android 都能帮上忙", en: "Work, study or daily life — Quiddity-Android has you covered" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          {USE_CASES.map((u) => {
            const Icon = u.icon;
            return (
              <div key={u.title.zh} className="p-5 rounded-2xl glass glow-border text-center">
                <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{t(u.title)}</h3>
                <p className="text-[11px] text-dark-400 leading-relaxed">{t(u.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: { zh: "下载安装", en: "Download & install" },
    desc: { zh: "Android 8.0 及以上，直接安装 APK。", en: "Android 8.0+, install the APK directly." },
  },
  {
    title: { zh: "配置 API", en: "Configure API" },
    desc: { zh: "填入服务商 API Key，系统级加密本地保存。", en: "Add your provider API key; encrypted and stored locally." },
  },
  {
    title: { zh: "开始对话", en: "Start chatting" },
    desc: { zh: "单聊、群聊、小应用，随你怎么用。", en: "Chat, group chat, mini apps — your choice." },
  },
] as const;

function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="Getting Started"
          title={t({ zh: "三步开始使用", en: "Start in 3 Steps" })}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.title.zh} className="relative p-5 rounded-2xl glass glow-border">
              <div className="w-9 h-9 mb-3 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400">
                {i + 1}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{t(s.title)}</h3>
              <p className="text-[11px] text-dark-400 leading-relaxed">{t(s.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: { zh: "支持哪些系统？", en: "Which systems are supported?" },
    a: { zh: "支持 Android 8.0（API 26）及以上版本的手机 / 平板；兼容 Android 应用的鸿蒙系统（如鸿蒙 2 / 3 / 4）也可以正常安装使用。", en: "Android 8.0 (API 26) and above on phones/tablets. HarmonyOS versions compatible with Android apps (e.g. HarmonyOS 2/3/4) work normally." },
  },
  {
    q: { zh: "纯血鸿蒙（HarmonyOS NEXT）可以吗？", en: "What about HarmonyOS NEXT?" },
    a: { zh: "纯血鸿蒙不兼容 Android 应用，无法安装 Quiddity-Android，请勿下载。", en: "HarmonyOS NEXT cannot install Android apps, so Quiddity-Android cannot be installed. Do not download." },
  },
  {
    q: { zh: "覆盖安装会丢失数据吗？", en: "Will upgrading lose my data?" },
    a: { zh: "不会。覆盖安装保留全部本地数据：会话、消息、API Key、设置等。", en: "No. Upgrading keeps all local data: conversations, messages, API keys, and settings." },
  },
  {
    q: { zh: "真的完全免费吗？", en: "Is it really free?" },
    a: { zh: "完全免费，无需注册、没有付费功能。调用大模型 API 的费用由对应服务商收取，与 Quiddity 无关。", en: "Completely free with no sign-up or paid features. LLM API usage fees are charged by the providers, unrelated to Quiddity." },
  },
  {
    q: { zh: "v1.5.1 更新了什么？", en: "What's new in v1.5.1?" },
    a: { zh: "温度设置改为在总设置和会话内统一调整；服务商 / 模型选择框重做，选项更清晰；更新弹窗按「新增 / 优化 / 修复」分区展示。", en: "Temperature is now unified in global settings and per-session; provider/model selectors were redesigned; the update dialog groups changes into New/Improved/Fixed." },
  },
] as const;

function FAQ() {
  const { t } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-transparent" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <SectionTitle
          eyebrow="FAQ"
          title={t({ zh: "常见问题", en: "FAQ" })}
          subtitle={t({ zh: "还有疑问？这里或许有答案", en: "Have questions? Find answers here" })}
        />
        <div className="max-w-2xl mx-auto glass rounded-2xl glow-border p-4 sm:p-6 md:p-8">
          {FAQS.map((faq, i) => {
            const open = openIdx === i;
            return (
              <div key={faq.q.zh} className="border-b border-white/[0.04] last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between py-5 text-left active:bg-white/[0.02] transition-colors -mx-2 px-2 rounded-lg bg-transparent border-0 cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${open ? "bg-brand-500/20" : "bg-dark-800"}`}>
                      <HelpCircle size={16} className={open ? "text-brand-400" : "text-dark-500"} />
                    </span>
                    <span className={`text-sm sm:text-base font-medium pr-4 ${open ? "text-brand-300" : "text-dark-200"}`}>
                      {t(faq.q)}
                    </span>
                  </span>
                  <ChevronDown size={16} className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-brand-400" : "text-dark-500"}`} />
                </button>
                {open && (
                  <div className="pb-5 pl-11">
                    <p className="text-xs sm:text-sm text-dark-400 leading-relaxed">{t(faq.a)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DownloadSection() {
  const { t } = useI18n();

  return (
    <section id="download" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/80 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,176,255,0.04),transparent_70%)]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        <SectionTitle
          eyebrow="Download"
          title={t({ zh: "获取 Quiddity-Android", en: "Get Quiddity-Android" })}
          subtitle={t({
            zh: "最新版 v1.5.1 · Android 8.0+ · 完全免费",
            en: "Latest v1.5.1 · Android 8.0+ · Completely free",
          })}
        />
        <div className="max-w-lg mx-auto rounded-2xl glass glow-border p-6 sm:p-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Smartphone size={26} className="text-emerald-400" />
          </div>
          <a
            href={APK_URL}
            download="quiddity-1.5.1.apk"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98]"
          >
            <Download size={20} />
            <span>{t(mobileDownloadButton)}</span>
            <span className="text-xs text-white/70 font-normal">· {t(mobileSize)}</span>
          </a>
          <div className="mt-3">
            <a
              href={APK_MIRROR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-dark-400 hover:text-brand-400 transition-colors"
            >
              <ExternalLink size={11} />
              {t(mobileMirrorLabel)}
            </a>
          </div>
          <div className="mt-4 text-left space-y-2">
            {mobileRequirements.slice(0, 2).map((req) => (
              <div key={req.title.zh} className="flex gap-2 text-xs text-dark-400">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <span className="text-dark-200 font-medium">{t(req.title)}</span> · {t(req.desc)}
                </span>
              </div>
            ))}
            <div className="flex gap-2 text-xs text-dark-400">
              <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>{t(mobileUpgradeTip)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="py-12 sm:py-16 border-t border-white/[0.04] relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        <div className="text-xl sm:text-2xl font-bold text-white mb-2">{brand.name}</div>
        <p className="text-xs text-dark-500 tracking-[0.2em] mb-6">{t(footerSlogan)}</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-xs">
          <button
            type="button"
            onClick={() => navigate("/legal")}
            className="text-dark-500 hover:text-dark-300 transition-colors bg-transparent border-0 cursor-pointer"
          >
            {t({ zh: "法律信息", en: "Legal" })}
          </button>
          <button
            type="button"
            onClick={() => navigate("/privacy")}
            className="text-dark-500 hover:text-dark-300 transition-colors bg-transparent border-0 cursor-pointer"
          >
            {t({ zh: "隐私声明", en: "Privacy" })}
          </button>
        </div>
        <p className="text-[11px] text-dark-500 mb-1">
          {typeof footerCopyright.zh === "function" ? footerCopyright.zh(year) : footerCopyright.zh}
        </p>
        <p className="text-[10px] text-dark-600">{t(footerMadeWith)}</p>
      </div>
    </footer>
  );
}

export default function MobileHome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 relative">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <HowItWorks />
      <FAQ />
      <DownloadSection />
      <Footer />
    </div>
  );
}
