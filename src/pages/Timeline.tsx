import { useEffect } from "react";
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
  Wrench,
  Activity,
  BarChart3,
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
  Bell, Clock, Lock, ListChecks, Workflow, Wrench, Activity, BarChart3,
};

const productIconMap = { Smartphone, Monitor, Bot } as const;

type VersionColor = "blue" | "emerald";

const colorMap: Record<VersionColor, { badge: string; rail: string; dot: string; ring: string }> = {
  blue:    { badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",    rail: "bg-blue-500/30",     dot: "bg-blue-400",     ring: "ring-blue-500/40" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", rail: "bg-emerald-500/30", dot: "bg-emerald-400", ring: "ring-emerald-500/40" },
};

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

function VersionCard({ v, color }: { v: TimelineVersion; color: VersionColor }) {
  const c = colorMap[color];
  return (
    <div className="glass rounded-xl p-4 border border-white/[0.06] h-full">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-base font-bold text-white tracking-wide">{v.version}</span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${c.badge}`}>
          {v.label.zh}
        </span>
        <span className="text-[10px] text-dark-500 ml-auto">{v.date}</span>
      </div>
      <p className="text-xs text-dark-300 leading-relaxed mb-3">{v.description.zh}</p>
      {v.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {v.highlights.map((h) => (
            <span
              key={h.text.zh}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] text-dark-300"
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
            <div className="flex flex-col gap-10">
              {timelineProductGroups.map((g) => (
                <ProductRail key={g.product.id} group={g} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ProductRail({ group }: { group: TimelineProductGroup }) {
  const { t } = useI18n();
  const StatusIcon = statusMap[group.product.status].icon;
  const n = group.versions.length;
  const firstColor: VersionColor = group.versions[0]?.color ?? "blue";
  const c = colorMap[firstColor];

  /* 节点等距分布：5% ~ 95% */
  function nodeLeftPct(i: number): number {
    if (n <= 1) return 50;
    return 5 + (90 * i) / (n - 1);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
          <ProductHeader icon={group.product.icon} />
        </div>
        <h2 className="text-sm font-semibold text-white">{t(group.product.name)}</h2>
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${statusMap[group.product.status].cls}`}>
          <StatusIcon size={9} className="shrink-0" />
          {t(statusLabel[group.product.status])}
        </span>
      </div>

      {/* 时间线：横向节点 */}
      <div className="relative h-7 mb-6">
        <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px ${c.rail}`} />
        <div className="relative h-full">
          {group.versions.map((v, i) => {
            const pct = nodeLeftPct(i);
            return (
              <div
                key={v.version}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${pct}%` }}
              >
                <span className={`block w-3 h-3 rounded-full ${c.dot} ring-4 ring-dark-950`} />
                <span className="mt-2 text-[10px] font-semibold tracking-wide text-white whitespace-nowrap">
                  {v.version}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 版本卡：网格并排（1/2/3 列自适应） */}
      <div className={`grid gap-3 ${n === 1 ? "grid-cols-1" : n === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
        {group.versions.map((v) => (
          <VersionCard key={v.version} v={v} color={v.color} />
        ))}
      </div>
    </div>
  );
}
