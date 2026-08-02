import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Globe,
  Monitor,
  Bot,
  Bell,
  Clock,
  Lock,
  ListChecks,
  Workflow,
  Languages,
  Wrench,
  Code,
  Palette,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useI18n } from "@/store/i18n";
import { timelineTitle, timelineBackHomeLabel, timelineProductGroups, timelineStats, statusLabel } from "@/content";
import type { TimelineHighlight, TimelineProductGroup, TimelineVersion } from "@/content/timeline";

const iconMap: Record<string, React.ComponentType<{ size?: number | string; className?: string }>> = {
  Globe, Wrench, Code, Palette, Layers, Smartphone, Monitor, Bot,
  Bell, Clock, Lock, ListChecks, Workflow, Languages, Sparkles,
};

const productIconMap = { Smartphone, Globe, Monitor, Bot } as const;

const colorMap = {
  blue:    { badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",    rail: "bg-blue-500",     dot: "bg-blue-400",     glow: "shadow-blue-500/40",     bar: "from-blue-500/0 via-blue-500/30 to-blue-500/0" },
  purple:  { badge: "bg-purple-500/10 text-purple-300 border-purple-500/20", rail: "bg-purple-500",   dot: "bg-purple-400",   glow: "shadow-purple-500/40",   bar: "from-purple-500/0 via-purple-500/30 to-purple-500/0" },
  emerald: { badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", rail: "bg-emerald-500", dot: "bg-emerald-400", glow: "shadow-emerald-500/40", bar: "from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" },
  amber:   { badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",   rail: "bg-amber-500",    dot: "bg-amber-400",    glow: "shadow-amber-500/40",    bar: "from-amber-500/0 via-amber-500/30 to-amber-500/0" },
} as const;

const statusMap = {
  live:        { icon: CheckCircle2,   cls: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20" },
  maintenance: { icon: AlertTriangle,  cls: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
  upcoming:    { icon: Hourglass,      cls: "bg-blue-500/10 text-blue-300 border-blue-500/20" },
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

/* 日期 → 时间轴 0~100 的位置百分比 */
function dateToPct(date: string, minMs: number, maxMs: number): number {
  const d = new Date(date.replace(/\./g, "-"));
  if (Number.isNaN(d.getTime())) return 0;
  const ms = d.getTime();
  if (maxMs === minMs) return 0;
  return Math.max(0, Math.min(100, ((ms - minMs) / (maxMs - minMs)) * 100));
}

function VersionCard({ v, color }: { v: TimelineVersion; color: keyof typeof colorMap }) {
  const c = colorMap[color];
  return (
    <div className="glass rounded-xl p-3 border border-white/[0.05]">
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className="text-sm font-bold text-white tracking-wide">{v.version}</span>
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold border ${c.badge}`}>
          {v.label.zh.length > 16 ? v.label.zh.slice(0, 16) + "…" : v.label.zh}
        </span>
      </div>
      <p className="text-[11px] text-dark-400 leading-relaxed mb-2 line-clamp-3">{v.description.zh}</p>
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
    </div>
  );
}

export default function Timeline() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [tooltipKey, setTooltipKey] = useState<string | null>(null);
  const [now] = useState(() => new Date("2026-08-02").getTime());
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* 时间轴起止 = 4 个产品线中所有版本的最早 / 最晚日期 */
  const { minMs, maxMs, tickDates } = useMemo(() => {
    const allDates = timelineProductGroups.flatMap((g) =>
      g.versions.map((v) => new Date(v.date.replace(/\./g, "-")).getTime()).filter((x) => !Number.isNaN(x))
    );
    const min = Math.min(...allDates);
    const max = Math.max(...allDates, now);
    /* 5 个等距刻度：min → max */
    const ticks: { date: string; pct: number }[] = [];
    for (let i = 0; i <= 4; i++) {
      const pct = (i / 4) * 100;
      const ms = min + ((max - min) * i) / 4;
      const d = new Date(ms);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      ticks.push({ date: `${y}.${m}.${day}`, pct });
    }
    return { minMs: min, maxMs: max, tickDates: ticks };
  }, [now]);

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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {timelineStats.map((stat) => (
              <div key={stat.label.zh} className="text-center py-4 px-3 rounded-2xl glass">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[11px] text-dark-400">{t(stat.label)}</div>
              </div>
            ))}
          </div>

          {/* 多线式时间线（横向：时间从左到右 / 多产品独立轨道） */}
          <div className="rounded-2xl glass p-4 md:p-6 border border-white/[0.06]">
            {/* Date ticks（顶部时间刻度） */}
            <div ref={trackRef} className="relative h-6 mb-2">
              {tickDates.map((t) => (
                <div
                  key={t.date}
                  className="absolute top-0 -translate-x-1/2 text-[10px] text-dark-500 whitespace-nowrap"
                  style={{ left: `${t.pct}%` }}
                >
                  {t.date}
                </div>
              ))}
              <div className="absolute left-0 right-0 top-3 h-px bg-white/[0.06]" />
            </div>

            {/* 4 条产品轨道 */}
            <div className="flex flex-col gap-5">
              {timelineProductGroups.map((g) => {
                const StatusIcon = statusMap[g.product.status].icon;
                return (
                  <ProductRail
                    key={g.product.id}
                    group={g}
                    minMs={minMs}
                    maxMs={maxMs}
                    now={now}
                    tooltipKey={tooltipKey}
                    setTooltipKey={setTooltipKey}
                    StatusIcon={StatusIcon}
                  />
                );
              })}
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
  minMs,
  maxMs,
  now,
  tooltipKey,
  setTooltipKey,
  StatusIcon,
}: {
  group: TimelineProductGroup;
  minMs: number;
  maxMs: number;
  now: number;
  tooltipKey: string | null;
  setTooltipKey: React.Dispatch<React.SetStateAction<string | null>>;
  StatusIcon: React.ComponentType<{ size?: number | string; className?: string }>;
}) {
  const { t } = useI18n();
  const c = colorMap[group.versions[0]?.color ?? "blue"];
  const statusLabelText = t(statusLabel[group.product.status]);

  return (
    <div className="relative">
      {/* 左侧产品标签 */}
      <div className="flex items-stretch gap-3">
        <div className="w-28 md:w-36 shrink-0 py-3">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
              <ProductHeader icon={group.product.icon} />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">{t(group.product.name)}</div>
              <div className="text-[9px] text-dark-500 truncate">v{group.versions.length} version</div>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${statusMap[group.product.status].cls}`}>
            <StatusIcon size={9} className="shrink-0" />
            {statusLabelText}
          </span>
        </div>

        {/* 轨道 + 节点 */}
        <div className="flex-1 relative pt-3">
          {/* 横线 */}
          <div className={`absolute left-0 right-0 top-[18px] h-px ${c.rail} opacity-30`} />
          <div className={`absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r ${c.bar}`} />

          {/* 节点 */}
          <div className="relative h-9">
            {group.versions.map((v) => {
              const pct = dateToPct(v.date, minMs, maxMs);
              const key = `${group.product.id}-${v.version}`;
              const isActive = tooltipKey === key;
              return (
                <button
                  type="button"
                  key={key}
                  onMouseEnter={() => setTooltipKey(key)}
                  onMouseLeave={() => setTooltipKey((cur) => (cur === key ? null : cur))}
                  onClick={() => setTooltipKey((cur) => (cur === key ? null : key))}
                  className="absolute top-[12px] -translate-x-1/2 group focus:outline-none"
                  style={{ left: `${pct}%` }}
                  aria-label={`${group.product.id} ${v.version}`}
                >
                  <span
                    className={`block w-3 h-3 rounded-full ${c.dot} ring-4 ring-dark-950 transition-all ${
                      isActive ? `scale-150 shadow-lg ${c.glow}` : ""
                    }`}
                  />
                </button>
              );
            })}

            {/* 当前时间标记（NOW 线） */}
            {now >= minMs && now <= maxMs && (() => {
              const nowPct = dateToPct(new Date(now).toISOString().slice(0, 10), minMs, maxMs);
              return (
                <div
                  className="absolute top-[4px] bottom-0 -translate-x-1/2 pointer-events-none"
                  style={{ left: `${nowPct}%` }}
                >
                  <div className="w-px h-full bg-white/30" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded text-[8px] font-bold text-dark-950 bg-white whitespace-nowrap">
                    NOW
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 节点下方的版本详情（hover / click 展开） */}
          {group.versions.map((v) => {
            const pct = dateToPct(v.date, minMs, maxMs);
            const key = `${group.product.id}-${v.version}`;
            const isActive = tooltipKey === key;
            return (
              <div
                key={`${key}-detail`}
                className={`relative mt-2 transition-opacity ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div
                  className="absolute -top-1 w-2 h-2 rotate-45 bg-white/[0.04] border-l border-t border-white/[0.05]"
                  style={{ left: `calc(${pct}% - 4px)` }}
                />
                <div
                  className="ml-2"
                  style={pct > 70 ? { marginRight: 0 } : undefined}
                >
                  <VersionCard v={v} color={v.color} />
                  <div className="text-[9px] text-dark-500 mt-1">{v.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
