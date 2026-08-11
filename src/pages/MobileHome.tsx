import { useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  History,
  MessageSquare,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { useI18n } from "@/store/i18n";
import { scrollToSection } from "@/lib/scroll";
import {
  brand,
  footerCopyright,
  footerMadeWith,
  footerSlogan,
  mobilePageBadge,
  mobilePageTitle,
  mobilePageSubtitle,
  mobileDownloadButton,
  mobileSize,
  mobileMirrorLabel,
  mobileShaTitle,
  mobileShaValue,
  mobileMetaTags,
  mobileRequirementsTitle,
  mobileRequirements,
  mobileLatestTitle,
  mobileLatestChanges,
  mobileChatTitle,
  mobileChatFeatures,
  mobileHistoryTitle,
  mobileHistoryFeatures,
  mobileLimitsTitle,
  mobileKnownLimits,
  mobileUpgradeTip,
  type MobileInfoItem,
} from "@/content";

const APK_URL = `${import.meta.env.BASE_URL}downloads/quiddity-1.5.1.apk`;
const APK_MIRROR_URL =
  "https://github.com/jiuan-9/Quiddity-website/releases/download/v1.5.1/quiddity-1.5.1.apk";

function InfoList({ items }: { items: MobileInfoItem[] }) {
  const { t } = useI18n();
  return (
    <ul className="space-y-3 text-left">
      {items.map((item) => (
        <li key={item.title.zh} className="flex gap-2.5">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-white">{t(item.title)}</div>
            <div className="text-xs text-dark-400 mt-0.5 leading-relaxed">{t(item.desc)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl glass glow-border p-6">
      <h2 className="flex items-center gap-2 text-base font-bold text-white mb-5">
        <span className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function MobileHome() {
  const { t, lang, toggle } = useI18n();
  const year = new Date().getFullYear();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,176,255,0.07),transparent_60%)]" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-brand-500/[0.04] blur-[180px]" />

      {/* 顶部导航 */}
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
              onClick={() => scrollToSection("download")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium transition-all btn-press cursor-pointer border-0"
            >
              <Download size={14} />
              <span>{t(mobileDownloadButton)}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-14 max-w-4xl">
        {/* 首屏 Hero */}
        <header id="hero" className="text-center mb-12">
          <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-3">
            {t(mobilePageBadge)}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="text-gradient">{t(mobilePageTitle)}</span>
          </h1>
          <p className="text-sm sm:text-base text-dark-400 max-w-xl mx-auto mb-6">
            {t(mobilePageSubtitle)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-dark-400 mb-8">
            {mobileMetaTags.map((tag, idx) => (
              <span key={tag.zh} className="flex items-center gap-1">
                {idx > 0 && <span className="w-1 h-1 rounded-full bg-dark-700 inline-block mr-3" />}
                {t(tag)}
              </span>
            ))}
          </div>

          <a
            href={APK_URL}
            download="quiddity-1.5.1.apk"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35 active:scale-[0.98]"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
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

          <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] text-dark-500 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <ShieldCheck size={12} className="text-emerald-400/70 shrink-0" />
            <span>
              {t(mobileShaTitle)}：<span className="font-mono text-dark-300">{t(mobileShaValue)}</span>
            </span>
          </div>

          {/* 核心亮点 */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mt-10">
            {[
              { zh: "11 家 AI 服务商 · 60+ 模型", en: "11 AI providers · 60+ models" },
              { zh: "私聊 / 群聊双 Tab", en: "Chat / Group tabs" },
              { zh: "本地数据完全保留", en: "Local data preserved" },
              { zh: "完全免费 · 无需注册", en: "Completely free · No sign-up" },
            ].map((item) => (
              <div key={item.zh} className="glass rounded-xl p-4 text-center">
                <div className="text-sm font-semibold text-white mb-1">{t(item)}</div>
              </div>
            ))}
          </div>
        </header>

        {/* 内容区 */}
        <div id="features" className="space-y-6">
          <Section icon={<Smartphone size={17} className="text-brand-400" />} title={t(mobileRequirementsTitle)}>
            <InfoList items={mobileRequirements} />
          </Section>

          <Section icon={<MessageSquare size={17} className="text-brand-400" />} title={t(mobileLatestTitle)}>
            <InfoList items={mobileLatestChanges} />
          </Section>

          <Section icon={<MessageSquare size={17} className="text-brand-400" />} title={t(mobileChatTitle)}>
            <InfoList items={mobileChatFeatures} />
          </Section>

          <Section icon={<History size={17} className="text-brand-400" />} title={t(mobileHistoryTitle)}>
            <InfoList items={mobileHistoryFeatures} />
          </Section>

          <Section icon={<AlertTriangle size={17} className="text-amber-400" />} title={t(mobileLimitsTitle)}>
            <InfoList items={mobileKnownLimits} />
            <div className="mt-5 flex gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/15 text-left">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-dark-300 leading-relaxed">{t(mobileUpgradeTip)}</p>
            </div>
          </Section>
        </div>

        {/* 下载区 */}
        <section id="download" className="mt-10 rounded-2xl glass glow-border p-6 text-center">
          <h2 className="text-lg font-bold text-white mb-2">
            {t({ zh: "下载 Quiddity-Android", en: "Download Quiddity-Android" })}
          </h2>
          <p className="text-xs text-dark-400 mb-6 leading-relaxed">
            {t({
              zh: "Android 8.0 及以上，兼容 Android 应用的鸿蒙系统可用；覆盖安装保留全部本地数据。",
              en: "Android 8.0+ and Android-compatible HarmonyOS; installing over keeps all local data.",
            })}
          </p>
          <a
            href={APK_URL}
            download="quiddity-1.5.1.apk"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
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
        </section>
      </div>

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-white/[0.04] py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-lg font-bold text-white mb-1">{brand.name}</div>
          <p className="text-xs text-dark-500 tracking-[0.2em] mb-4">{t(footerSlogan)}</p>
          <p className="text-[11px] text-dark-500 mb-1">
            {typeof footerCopyright.zh === "function" ? footerCopyright.zh(year) : footerCopyright.zh}
          </p>
          <p className="text-[10px] text-dark-600">{t(footerMadeWith)}</p>
        </div>
      </footer>
    </div>
  );
}
