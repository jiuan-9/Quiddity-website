import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  Bot,
  Wrench,
  Activity,
  BarChart3,
  Sliders,
  Link as LinkIcon,
  Workflow,
  ListChecks,
  Lock,
  Layers,
  Bell,
  Image,
  Search,
  Users,
  MessageSquare,
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
  Smartphone, Monitor, Bot,
  Bell, Lock, ListChecks, Workflow, Wrench, Activity, BarChart3, Sliders, LinkIcon, Layers, Image, Search, Users, MessageSquare,
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

function ProductHeader({ icon }: { icon: keyof typeof productIconMap }) {
  const Icon = productIconMap[icon];
  return Icon ? <Icon size={16} className="text-brand-400" /> : null;
}

function HighlightIcon({ icon }: { icon: TimelineHighlight["icon"] }) {
  const Icon = iconMap[icon];
  if (!Icon) return null;
  return <Icon size={10} className="text-dark-400" />;
}

function VersionCard({ v, color }: { v: TimelineVersion; color: VersionColor }) {
  const c = colorMap[color];
  return (
    <div className="rounded-xl p-3 border border-white/[0.08] bg-white/[0.03] w-[240px]">
      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
        <span className="text-sm font-bold text-white">{v.version}</span>
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-semibold border ${c.badge}`}>
          {v.label.zh}
        </span>
        <span className="text-[9px] text-dark-500 ml-auto">{v.date}</span>
      </div>
      <p className="text-[11px] text-dark-300 leading-relaxed mb-2">{v.description.zh}</p>
      {v.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {v.highlights.map((h) => (
            <span
              key={h.text.zh}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-[10px] text-dark-400"
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
  /* 当前聚焦的产品-版本 key（点击节点后展开详情卡） */
  const [activeKey, setActiveKey] = useState<string | null>(null);

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

          <div className="rounded-2xl glass p-5 md:p-7 border border-white/[0.06]">
            <div className="flex flex-col gap-12">
              {timelineProductGroups.map((g) => (
                <ProductRail
                  key={g.product.id}
                  group={g}
                  activeKey={activeKey}
                  setActiveKey={setActiveKey}
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
  activeKey,
  setActiveKey,
}: {
  group: TimelineProductGroup;
  activeKey: string | null;
  setActiveKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { t } = useI18n();
  const StatusIcon = statusMap[group.product.status].icon;
  const n = group.versions.length;
  const firstColor: VersionColor = group.versions[0]?.color ?? "blue";
  const c = colorMap[firstColor];

  function nodeLeftPct(i: number): number {
    if (n <= 1) return 50;
    return 5 + (90 * i) / (n - 1);
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
          <ProductHeader icon={group.product.icon} />
        </div>
        <h2 className="text-sm font-semibold text-white">{t(group.product.name)}</h2>
        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold border ${statusMap[group.product.status].cls}`}>
          <StatusIcon size={9} className="shrink-0" />
          {t(statusLabel[group.product.status])}
        </span>
      </div>

      {/* 横向节点（hover 聚焦） */}
      <div className="relative h-6">
        <div className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px ${c.rail}`} />
        <div className="relative h-full">
          {group.versions.map((v, i) => {
            const pct = nodeLeftPct(i);
            const key = `${group.product.id}-${v.version}`;
            const isActive = activeKey === key;
            return (
              <button
                type="button"
                key={key}
                onMouseEnter={() => setActiveKey(key)}
                onMouseLeave={() => setActiveKey((cur) => (cur === key ? null : cur))}
                onFocus={() => setActiveKey(key)}
                onBlur={() => setActiveKey((cur) => (cur === key ? null : cur))}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group focus:outline-none"
                style={{ left: `${pct}%` }}
                aria-label={`${group.product.id} ${v.version}`}
                aria-expanded={isActive}
              >
                <span
                  className={`block w-3 h-3 rounded-full ${c.dot} ring-4 ring-dark-950 transition-all ${
                    isActive ? `scale-150 ring-4 ${c.ring}` : "group-hover:scale-125"
                  }`}
                />
                <span
                  className={`mt-2 text-[10px] font-semibold tracking-wide whitespace-nowrap transition-colors ${
                    isActive ? "text-white" : "text-dark-500 group-hover:text-dark-300"
                  }`}
                >
                  {v.version}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 详情卡：保留行内空间，不覆盖下一行节点；用 inline 流式布局让出文档空间 */}
      <div className="mt-4 relative min-h-[20px]">
        {group.versions.map((v) => {
          const key = `${group.product.id}-${v.version}`;
          const isActive = activeKey === key;
          if (!isActive) return null;
          const idx = group.versions.findIndex((x) => x.version === v.version);
          const pct = nodeLeftPct(idx);
          return (
            <div
              key={key}
              className="relative pt-3"
              role="tooltip"
            >
              <div
                className="absolute top-0 z-20"
                style={{
                  left: `${pct}%`,
                  transform:
                    pct < 25
                      ? "translateX(0)"
                      : pct > 75
                        ? "translateX(-100%)"
                        : "translateX(-50%)",
                }}
              >
                <div className="relative">
                  <div
                    className="absolute -top-1.5 w-3 h-3 rotate-45 bg-white/[0.03] border-l border-t border-white/[0.08]"
                    style={{
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                  <VersionCard v={v} color={v.color} />
                </div>
              </div>
              {/* 撑开高度的占位符：让父级占真实空间，下一行节点不会被覆盖 */}
              <div className="invisible pointer-events-none" style={{ height: 140 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
