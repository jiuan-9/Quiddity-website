import { useEffect } from "react";
import {
  ArrowLeft,
  Globe,
  Zap,
  Shield,
  Code,
  Palette,
  Layers,
  Smartphone,
  Monitor,
  Bot,
  Bell,
  Clock,
  Lock,
  ListChecks,
  Workflow,
  Languages,
  Wrench,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/store/i18n";
import { timelineTitle, timelineSubtitle, timelineBackHomeLabel, timelineProductGroups, timelineStats, statusLabel } from "@/content";
import type { TimelineHighlight } from "@/content/timeline";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Globe, Zap, Shield, Code, Palette, Layers, Smartphone, Monitor, Bot,
  Bell, Clock, Lock, ListChecks, Workflow, Languages, Wrench, Sparkles,
};

const colorMap = {
  blue:    { dot: "bg-blue-500",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",     ring: "ring-blue-500/30" },
  purple:  { dot: "bg-purple-500",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", ring: "ring-purple-500/30" },
  emerald: { dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", ring: "ring-emerald-500/30" },
  amber:   { dot: "bg-amber-500",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",   ring: "ring-amber-500/30" },
} as const;

const statusMap = {
  live: {
    icon: CheckCircle2,
    cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  maintenance: {
    icon: AlertTriangle,
    cls: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  upcoming: {
    icon: Hourglass,
    cls: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
} as const;

const productIconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Smartphone, Globe, Monitor, Bot,
};

function HighlightIcon({ icon }: { icon: TimelineHighlight["icon"] }) {
  const Icon = iconMap[icon];
  if (!Icon) return null;
  return <Icon size={11} className="text-dark-500" />;
}

function ProductHeader({ icon }: { icon: keyof typeof productIconMap }) {
  const Icon = productIconMap[icon];
  return Icon ? <Icon size={18} className="text-brand-400" /> : null;
}

export default function Timeline() {
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/50 to-dark-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-500/[0.02] blur-[180px]" />

        <div className="container relative z-10 mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-dark-400 hover:text-brand-400 hover:bg-white/[0.05] transition-colors"
              aria-label={t(timelineBackHomeLabel)}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{t(timelineTitle)}</h1>
              <p className="text-xs text-dark-500">{t(timelineSubtitle)}</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {timelineStats.map((stat) => (
              <div key={stat.label.zh} className="text-center py-5 px-3 rounded-2xl glass">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[11px] text-dark-400">{t(stat.label)}</div>
              </div>
            ))}
          </div>

          {/* Product Groups */}
          <div className="flex flex-col gap-12">
            {timelineProductGroups.map((group) => {
              const StatusIcon = statusMap[group.product.status].icon;
              return (
                <ScrollReveal key={group.product.id} threshold={0.05}>
                  <div className="space-y-5">
                    {/* Product Header */}
                    <div className="flex items-start gap-3 p-4 rounded-2xl glass border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                        <ProductHeader icon={group.product.icon} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="text-base md:text-lg font-semibold text-white">
                            {t(group.product.name)}
                          </h2>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusMap[group.product.status].cls}`}
                          >
                            <StatusIcon size={10} className="shrink-0" />
                            {t(statusLabel[group.product.status])}
                          </span>
                        </div>
                        <p className="text-xs text-dark-400 mt-1 leading-relaxed">
                          {t(group.product.description)}
                        </p>
                      </div>
                    </div>

                    {/* Version Timeline (per product) */}
                    <div className="relative pl-1">
                      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-brand-500/20 via-brand-500/10 to-transparent" />
                      <div className="flex flex-col gap-6">
                        {group.versions.map((v) => {
                          const c = colorMap[v.color];
                          return (
                            <div key={`${group.product.id}-${v.version}`} className="relative pl-12">
                              <div className={`absolute left-[11px] top-2 w-[9px] h-[9px] rounded-full ${c.dot} ring-4 ring-dark-950`} />

                              <div className="text-[11px] text-dark-500 mb-2 tracking-wide">{v.date}</div>

                              <div className="glass rounded-2xl p-5 border border-white/[0.05]">
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="text-lg font-bold text-white tracking-wide">{v.version}</span>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${c.badge}`}>
                                    {t(v.label)}
                                  </span>
                                </div>

                                <p className="text-xs text-dark-400 leading-relaxed mb-4">{t(v.description)}</p>

                                <div className="flex flex-wrap gap-2">
                                  {v.highlights.map((h) => (
                                    <span
                                      key={h.text.zh}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[11px] text-dark-300"
                                    >
                                      <HighlightIcon icon={h.icon} />
                                      {t(h.text)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
