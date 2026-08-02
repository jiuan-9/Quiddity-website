import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Bot,
  Bell,
  Clock,
  Lock,
  ListChecks,
  Workflow,
  Globe,
  Layers,
  Palette,
  CheckCircle2,
  AlertTriangle,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/store/i18n";
import { timelineTitle, timelineBackHomeLabel, timelineProductGroups, statusLabel } from "@/content";
import type { TimelineHighlight, TimelineProductGroup, TimelineVersion } from "@/content/timeline";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Globe, Palette, Layers, Smartphone, Monitor, Bot,
  Bell, Clock, Lock, ListChecks, Workflow,
};

const productIconMap = { Smartphone, Monitor, Bot } as const;

const colorMap = {
  blue:    { badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",    rail: "bg-blue-500",     dot: "bg-blue-400" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", rail: "bg-emerald-500", dot: "bg-emerald-400" },
} as const;

const statusMap = {
  live:        { icon: CheckCircle2,  cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  maintenance: { icon: AlertTriangle, cls: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  upcoming:    { icon: Hourglass,     cls: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
} as const;

function HighlightIcon({ icon }: { icon: TimelineHighlight["icon"] }) {
  const Icon = iconMap[icon];
  if (!Icon) return null;
  return <Icon size={10} className="text-dark-500" />;
}

function ProductHeader({ icon }: { icon: keyof typeof productIconMap }) {
  const Icon = productIconMap[icon];
  return Icon ? <Icon size={16} className="text-brand-400" /> : null;
}

function VersionCard({ v, color }: { v: TimelineVersion; color: keyof typeof colorMap }) {
  const c = colorMap[color];
  return (
    <div className="glass rounded-xl p-3.5 border border-white/[0.06] w-[260px]">
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className="text-sm font-bold text-white tracking-wide">{v.version}</span>
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold border ${c.badge}`}>
          {v.label.zh}
        </span>
        <span className="text-[9px] text-dark-500 ml-auto">{v.date}</span>
      </div>
      <p className="text-[11px] text-dark-400 leading-relaxed mb-2">{v.description.zh}</p>
      {v.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {v.highlights.map((h) => (
            <span
              key={h.text.zh}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] text-dark-300"
            >
              <HighlightIcon icon={h.icon} />
              {h.text.zh}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Timeline() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [tooltipKey, setTooltipKey] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  /* 节点等距分布：每个产品线内的小版本按 1/n 比例等距分布
   * 加上左右各 5% padding，节点永远不会贴边 */
  function nodeLeftPct(indexInProduct: number, totalInProduct: number): number {
    if (totalInProduct <= 1) return 50;
    const usable = 90; // 5% padding on each side
    const base = 5;
    return base + (usable * indexInProduct) / (totalInProduct - 1);
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/50 to-dark-950" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-brand-500/[0.02] blur-[180px]" />

        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-3 mb-8">
            <button
              type="button"
              onClick={handleBack}
              className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-dark-400 hover:text-brand-400 hover:bg-white/[0.05] transition-colors"
              aria-label={t(timelineBackHomeLabel)}
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{t(timelineTitle)}</h1>
          </div>

          <div className="rounded-2xl glass p-5 md:p-6 border border-white/[0.06]">
            <div className="flex flex-col gap-8">
              {timelineProductGroups.map((g) => (
                <ProductRail
                  key={g.product.id}
                  group={g}
                  tooltipKey={tooltipKey}
                  setTooltipKey={setTooltipKey}
                  nodeLeftPct={nodeLeftPct}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductRail({
  group,
  tooltipKey,
  setTooltipKey,
  nodeLeftPct,
}: {
  group: TimelineProductGroup;
  tooltipKey: string | null;
  setTooltipKey: React.Dispatch<React.SetStateAction<string | null>>;
  nodeLeftPct: (i: number, n: number) => number;
}) {
  const { t } = useI18n();
  const c = colorMap[group.versions[0]?.color ?? "blue"];
  const StatusIcon = statusMap[group.product.status].icon;
  const n = group.versions.length;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
          <ProductHeader icon={group.product.icon} />
        </div>
        <h2 className="text-sm font-semibold text-white">{t(group.product.name)}</h2>
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${statusMap[group.product.status].cls}`}>
          <StatusIcon size={9} className="shrink-0" />
          {t(statusLabel[group.product.status])}
        </span>
      </div>

      <div className="relative pl-1">
        <div className={`absolute left-0 right-0 top-[8px] h-px ${c.rail} opacity-25`} />

        <div className="relative h-6">
          {group.versions.map((v, i) => {
            const pct = nodeLeftPct(i, n);
            const key = `${group.product.id}-${v.version}`;
            const isActive = tooltipKey === key;
            return (
              <button
                type="button"
                key={key}
                onMouseEnter={() => setTooltipKey(key)}
                onMouseLeave={() => setTooltipKey((cur) => (cur === key ? null : cur))}
                onClick={() => setTooltipKey((cur) => (cur === key ? null : key))}
                className="absolute top-[2px] -translate-x-1/2 group focus:outline-none"
                style={{ left: `${pct}%` }}
                aria-label={`${group.product.id} ${v.version}`}
              >
                <span
                  className={`block w-3 h-3 rounded-full ${c.dot} ring-4 ring-dark-950 transition-all ${
                    isActive ? "scale-150 shadow-lg shadow-white/30" : ""
                  }`}
                />
                <span
                  className={`absolute top-5 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-dark-500"
                  }`}
                >
                  {v.version}
                </span>
              </button>
            );
          })}
        </div>

        {group.versions.map((v, i) => {
          const pct = nodeLeftPct(i, n);
          const key = `${group.product.id}-${v.version}`;
          const isActive = tooltipKey === key;
          const anchorRight = pct > 50;
          return (
            <div
              key={`${key}-detail`}
              className={`relative mt-7 transition-opacity ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              <div
                className="absolute -top-1.5 w-3 h-3 rotate-45 bg-white/[0.04] border-l border-t border-white/[0.06]"
                style={anchorRight ? { right: `calc(${100 - pct}% - 6px)` } : { left: `calc(${pct}% - 6px)` }}
              />
              <div
                className="absolute w-[260px]"
                style={anchorRight ? { right: `calc(${100 - pct}% - 130px)` } : { left: `calc(${pct}% - 130px)` }}
              >
                <VersionCard v={v} color={v.color} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
