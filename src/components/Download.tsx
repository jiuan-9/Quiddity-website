import { useState, useEffect } from "react";
import { Download, Monitor, Globe, Wrench, Lock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useI18n } from "@/store/i18n";
import {
  downloadBadge,
  downloadSectionTitle,
  downloadSectionSubtitle,
  desktopTitle,
  desktopVersion,
  desktopBadge,
  desktopMaintenanceBadge,
  desktopMaintenanceVersion,
  demoTitle,
  demoDesc,
} from "@/content";

/**
 * 从 downloads.json 动态读取下载链接
 * 这样改 Release / 换仓库时无需改代码，sync:downloads 脚本同步即可
 */
type DownloadsInfo = {
  version: string;
  fallbackUrl: string;
  assets: Array<{
    platform: "windows" | "macos" | "linux" | "android";
    arch: "x64" | "arm64";
    label: string;
    url: string;
    /** 备用下载地址（GitHub Releases），主地址（Cloudflare CDN）不稳定时使用 */
    mirrorUrl?: string;
    size: number;
    contentType: string;
  }>;
};

const FALLBACK_DOWNLOAD_URL =
  "https://github.com/jiuan-9/Quiddity-website/releases/latest";

/**
 * 桌面端下载通道开关
 * 设为 false → 桌面按钮变为"维护中"状态，不可点击
 * 恢复后改回 true 即可
 */
const DESKTOP_AVAILABLE = false;

function useDownloadsInfo() {
  const [info, setInfo] = useState<DownloadsInfo | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}downloads.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: DownloadsInfo | null) => setInfo(data))
      .catch(() => setInfo(null));
  }, []);

  return info;
}

export default function DownloadSection() {
  const { t } = useI18n();
  const dlInfo = useDownloadsInfo();
  const windowsAsset = dlInfo?.assets.find((a) => a.platform === "windows");
  const downloadUrl = windowsAsset?.url || FALLBACK_DOWNLOAD_URL;

  return (
    <section id="download" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,176,255,0.04),transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-brand-500/[0.03] blur-[200px]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <span className="inline-block text-[11px] sm:text-xs tracking-[0.2em] uppercase text-brand-400 mb-3 sm:mb-4">
            {t(downloadBadge)}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {t(downloadSectionTitle).split("Quiddity").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-gradient">Quiddity</span>}
              </span>
            ))}
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto text-sm sm:text-base mb-10 sm:mb-14 leading-relaxed px-2">
            {t(downloadSectionSubtitle)}
          </p>
        </ScrollReveal>

        <ScrollReveal threshold={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-3xl mx-auto">
            {/* Desktop */}
            {DESKTOP_AVAILABLE ? (
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl glass glow-border-strong w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/15 hover:border-brand-500/30 active:scale-[0.98] active:bg-white/[0.04] overflow-hidden min-h-[64px]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/[0.02] via-transparent to-brand-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center group-hover:bg-gradient-to-br from-brand-500/20 to-brand-600/15 transition-all duration-300 shrink-0">
                  <Monitor size={22} className="text-brand-400" />
                </div>
                <div className="text-left min-w-0 flex-1 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-white">{t(desktopTitle)}</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-gradient-to-r from-brand-500/20 to-brand-600/15 text-[9px] font-bold text-brand-400">
                      {t(desktopBadge)}
                    </span>
                  </div>
                  <div className="text-xs text-dark-400 mt-0.5">{t(desktopVersion)}</div>
                </div>
                <Download size={16} className="text-dark-500 group-hover:text-brand-400 transition-colors ml-auto shrink-0 relative z-10" />
              </a>
            ) : (
              <div
                role="status"
                aria-disabled="true"
                className="group relative flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl glass border border-amber-500/20 w-full overflow-hidden min-h-[64px] cursor-not-allowed select-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.02] via-transparent to-amber-500/[0.02] opacity-60" />
                <div className="relative w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Monitor size={22} className="text-dark-500" />
                </div>
                <div className="text-left min-w-0 flex-1 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-dark-300">{t(desktopTitle)}</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500/25 to-orange-500/15 text-[9px] font-bold text-amber-300">
                      <Wrench size={9} className="shrink-0" />
                      {t(desktopMaintenanceBadge)}
                    </span>
                  </div>
                  <div className="text-xs text-dark-500 mt-0.5">{t(desktopMaintenanceVersion)}</div>
                </div>
                <Lock size={14} className="text-dark-600 ml-auto shrink-0 relative z-10" />
              </div>
            )}

            {/* Demo */}
            <a
              href="#/demo"
              className="group relative flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl glass glow-border w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-500/25 active:scale-[0.98] active:bg-white/[0.04] overflow-hidden min-h-[64px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.02] via-transparent to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-10 h-10 rounded-lg bg-white/[0.02] flex items-center justify-center group-hover:bg-gradient-to-br from-purple-500/20 to-blue-500/15 transition-all duration-300 shrink-0">
                <Globe size={22} className="text-brand-400" />
              </div>
              <div className="text-left min-w-0 flex-1 relative z-10">
                <div className="text-sm font-semibold text-white">{t(demoTitle)}</div>
                <div className="text-xs text-dark-400 mt-0.5">{t(demoDesc)}</div>
              </div>
            </a>
          </div>

        </ScrollReveal>
      </div>
    </section>
  );
}
