import { useEffect } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  ListChecks,
  Monitor,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/store/i18n";
import {
  assistantPageBadge,
  assistantPageTitle,
  assistantPageSubtitle,
  assistantDownloadButton,
  assistantSize,
  assistantShaTitle,
  assistantShaValue,
  assistantMetaTags,
  assistantScopeTitle,
  assistantScope,
  assistantFeaturesTitle,
  assistantFeatures,
  assistantHowTitle,
  assistantSteps,
  assistantNotesTitle,
  assistantNotes,
  assistantBundledShizuku,
  assistantBackHome,
  type AssistantInfoItem,
} from "@/content";

const EXE_URL = `${import.meta.env.BASE_URL}downloads/Quiddity授权助手.exe`;

function InfoList({ items }: { items: AssistantInfoItem[] }) {
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

export default function Assistant() {
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-dark-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(20,176,255,0.07),transparent_60%)]" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[420px] rounded-full bg-brand-500/[0.04] blur-[180px]" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-14 sm:py-20 max-w-4xl">
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-3">
            {t(assistantPageBadge)}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            <span className="text-gradient">{t(assistantPageTitle)}</span>
          </h1>
          <p className="text-sm sm:text-base text-dark-400 max-w-xl mx-auto mb-8">
            {t(assistantPageSubtitle)}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-dark-400 mb-8">
            {assistantMetaTags.map((tag, idx) => (
              <span key={tag.zh} className="flex items-center gap-1">
                {idx > 0 && <span className="w-1 h-1 rounded-full bg-dark-700 inline-block mr-3" />}
                {t(tag)}
              </span>
            ))}
          </div>

          <a
            href={EXE_URL}
            download="Quiddity授权助手.exe"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35 active:scale-[0.98]"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            <span>{t(assistantDownloadButton)}</span>
            <span className="text-xs text-white/70 font-normal">· {t(assistantSize)}</span>
          </a>

          <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] text-dark-500 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <ShieldCheck size={12} className="text-emerald-400/70 shrink-0" />
            <span>
              {t(assistantShaTitle)}：<span className="font-mono text-dark-300">{t(assistantShaValue)}</span>
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <Section icon={<Smartphone size={17} className="text-brand-400" />} title={t(assistantScopeTitle)}>
            <InfoList items={assistantScope} />
          </Section>

          <Section icon={<ListChecks size={17} className="text-brand-400" />} title={t(assistantFeaturesTitle)}>
            <InfoList items={assistantFeatures} />
            <div className="mt-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-left">
              <p className="text-[11px] text-dark-400 leading-relaxed">{t(assistantBundledShizuku)}</p>
            </div>
          </Section>

          <Section icon={<Monitor size={17} className="text-brand-400" />} title={t(assistantHowTitle)}>
            <ol className="space-y-3 text-left">
              {assistantSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="w-6 h-6 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-dark-200 leading-relaxed">{t(step)}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section icon={<Wrench size={17} className="text-amber-400" />} title={t(assistantNotesTitle)}>
            <InfoList items={assistantNotes} />
          </Section>
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-xs text-dark-400 hover:text-brand-400 transition-colors bg-transparent border-0 cursor-pointer"
          >
            <ArrowLeft size={14} />
            {t(assistantBackHome)}
          </button>
        </div>
      </div>
    </main>
  );
}
