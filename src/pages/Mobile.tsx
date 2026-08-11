import { useEffect } from "react";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  History,
  MessageSquare,
  Monitor,
  ShieldCheck,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/store/i18n";
import {
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
  mobileDesktopTitle,
  mobileDesktopPoints,
  mobileLatestTitle,
  mobileLatestChanges,
  mobileChatTitle,
  mobileChatFeatures,
  mobileHistoryTitle,
  mobileHistoryFeatures,
  mobileLimitsTitle,
  mobileKnownLimits,
  mobileUpgradeTip,
  mobileBackHome,
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
    <section className="rounded-2xl glass glow-border p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-base sm:text-lg font-bold text-white mb-5">
        <span className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function Mobile() {
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,176,255,0.07),transparent_60%)]" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-brand-500/[0.04] blur-[180px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-14 sm:py-20 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-3">
            {t(mobilePageBadge)}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="text-gradient">{t(mobilePageTitle)}</span>
          </h1>
          <p className="text-sm sm:text-base text-dark-400 max-w-xl mx-auto mb-8">
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
        </div>

        <div className="space-y-6">
          {/* 系统要求 + 与电脑版关系 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section icon={<Smartphone size={17} className="text-brand-400" />} title={t(mobileRequirementsTitle)}>
              <InfoList items={mobileRequirements} />
            </Section>
            <Section icon={<Monitor size={17} className="text-brand-400" />} title={t(mobileDesktopTitle)}>
              <InfoList items={mobileDesktopPoints} />
            </Section>
          </div>

          {/* v1.5.1 更新 */}
          <Section icon={<MessageSquare size={17} className="text-brand-400" />} title={t(mobileLatestTitle)}>
            <InfoList items={mobileLatestChanges} />
          </Section>

          {/* v1.5.0 群聊 */}
          <Section icon={<MessageSquare size={17} className="text-brand-400" />} title={t(mobileChatTitle)}>
            <InfoList items={mobileChatFeatures} />
          </Section>

          {/* 历史功能 */}
          <Section icon={<History size={17} className="text-brand-400" />} title={t(mobileHistoryTitle)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              <InfoList items={mobileHistoryFeatures} />
            </div>
          </Section>

          {/* 已知限制 */}
          <Section icon={<AlertTriangle size={17} className="text-amber-400" />} title={t(mobileLimitsTitle)}>
            <InfoList items={mobileKnownLimits} />
            <div className="mt-5 flex gap-2.5 p-3.5 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/15 text-left">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-dark-300 leading-relaxed">{t(mobileUpgradeTip)}</p>
            </div>
          </Section>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs text-dark-400 hover:text-brand-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={14} />
            {t(mobileBackHome)}
          </button>
        </div>
      </div>
    </main>
  );
}
