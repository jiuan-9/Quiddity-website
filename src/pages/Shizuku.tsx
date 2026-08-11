import { useEffect } from "react";
import { ArrowLeft, Download, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/store/i18n";
import {
  shizukuPageTitle,
  shizukuPageSubtitle,
  shizukuVersion,
  shizukuFileName,
  shizukuDownloadButton,
  shizukuSize,
  shizukuInstallTip,
  shizukuBackHome,
} from "@/content";

const APK_URL = `${import.meta.env.BASE_URL}downloads/shizuku.apk`;

export default function Shizuku() {
  const { t } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-dark-950 relative flex items-center justify-center overflow-hidden px-4">
      {/* 背景光晕 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,176,255,0.06),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full bg-brand-500/[0.04] blur-[180px]" />

      <div className="relative z-10 w-full max-w-md py-12">
        <div className="rounded-2xl glass glow-border p-8 sm:p-10 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/20 flex items-center justify-center mb-5">
            <Smartphone size={30} className="text-brand-400" />
          </div>

          <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-brand-400 mb-2">
            {t(shizukuVersion)} · {t(shizukuFileName)}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            {t(shizukuPageTitle)}
          </h1>
          <p className="text-sm text-dark-400 mb-8">{t(shizukuPageSubtitle)}</p>

          <a
            href={APK_URL}
            download="shizuku.apk"
            className="group relative inline-flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white font-semibold text-base shadow-lg shadow-brand-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-500/35 active:scale-[0.98]"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            <span>{t(shizukuDownloadButton)}</span>
            <span className="text-xs text-white/70 font-normal">· {t(shizukuSize)}</span>
          </a>

          <p className="text-xs text-dark-500 mt-5 leading-relaxed">
            {t(shizukuInstallTip)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-6 mx-auto flex items-center gap-1.5 text-xs text-dark-400 hover:text-brand-400 transition-colors bg-transparent border-0 cursor-pointer"
        >
          <ArrowLeft size={14} />
          {t(shizukuBackHome)}
        </button>
      </div>
    </main>
  );
}
