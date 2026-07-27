/**
 * Privacy — 隐私声明页面
 *
 * 核心承诺：
 *   - 本网站不收集任何用户个人信息
 *   - 仅使用 localStorage 存储语言偏好
 *   - 第三方链接（GitHub / Cloudflare）由用户主动访问
 *
 * 视觉风格：
 *   - 沿用 Legal 页面的暗色 + 蓝紫主题
 *   - EnergyRing + GradientText 页眉
 *   - 章节卡片用 glass + glow-border
 *   - 与 Legal 一致的返回首页按钮
 */

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  Cookie,
  Link as LinkIcon,
  Server,
  AppWindow,
  History,
  MessageCircle,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollReveal, EnergyRing, GradientText } from "@/components/animation";
import { useI18n } from "@/store/i18n";
import { staggerContainer, staggerItem } from "@/lib/animation";
import {
  privacyPageTitle,
  privacyPageSubtitle,
  privacyBadge,
  privacyBackHome,
  privacyLastUpdated,
  privacyEffectiveDate,
  privacyPromiseTitle,
  privacyPromiseBody,
  privacySectionCollectTitle,
  privacySectionCollectBody,
  privacyCollectItems,
  privacySectionCookieTitle,
  privacySectionCookieBody,
  privacyCookieItems,
  privacySectionLinksTitle,
  privacySectionLinksBody,
  privacySectionCdnTitle,
  privacySectionCdnBody,
  cloudflarePrivacyUrl,
  privacySectionAppTitle,
  privacySectionAppBody,
  privacySectionChangesTitle,
  privacySectionChangesBody,
  privacySectionContactTitle,
  privacySectionContactBody,
} from "@/content/privacy";
import { brand } from "@/content";

/* ---------- 章节数据类型 ---------- */

type Section = {
  key: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  list?: string[];
  extra?: React.ReactNode;
};

/* ---------- 章节渲染组件 ---------- */

function SectionCard({
  icon,
  title,
  body,
  list,
  extra,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  list?: string[];
  extra?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative rounded-2xl glass glow-border p-5 sm:p-6 md:p-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
        </div>
        <p className="text-sm sm:text-base text-dark-300 leading-relaxed mb-4">
          {body}
        </p>
        {list && list.length > 0 && (
          <ul className="space-y-2.5 mb-2">
            {list.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm sm:text-[15px] text-dark-200 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {extra}
      </div>
    </motion.div>
  );
}

/* ---------- 主组件 ---------- */

export default function Privacy() {
  const { t } = useI18n();
  const navigate = useNavigate();

  /* 章节数据（顺序即渲染顺序） */
  const sections: Section[] = [
    {
      key: "collect",
      icon: <ShieldCheck size={20} className="text-brand-400" />,
      title: t(privacySectionCollectTitle),
      body: t(privacySectionCollectBody),
      list: privacyCollectItems.map((i) => t(i)),
    },
    {
      key: "cookie",
      icon: <Cookie size={20} className="text-brand-400" />,
      title: t(privacySectionCookieTitle),
      body: t(privacySectionCookieBody),
      list: privacyCookieItems.map((i) => t(i)),
    },
    {
      key: "links",
      icon: <LinkIcon size={20} className="text-brand-400" />,
      title: t(privacySectionLinksTitle),
      body: t(privacySectionLinksBody),
    },
    {
      key: "cdn",
      icon: <Server size={20} className="text-brand-400" />,
      title: t(privacySectionCdnTitle),
      body: t(privacySectionCdnBody),
      extra: (
        <a
          href={cloudflarePrivacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-brand-400 hover:text-brand-300 transition-colors mt-1"
        >
          {cloudflarePrivacyUrl}
          <LinkIcon size={12} />
        </a>
      ),
    },
    {
      key: "app",
      icon: <AppWindow size={20} className="text-brand-400" />,
      title: t(privacySectionAppTitle),
      body: t(privacySectionAppBody),
    },
    {
      key: "changes",
      icon: <History size={20} className="text-brand-400" />,
      title: t(privacySectionChangesTitle),
      body: t(privacySectionChangesBody),
    },
    {
      key: "contact",
      icon: <MessageCircle size={20} className="text-brand-400" />,
      title: t(privacySectionContactTitle),
      body: t(privacySectionContactBody),
      extra: (
        <a
          href={`mailto:${brand.email}`}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04] hover:border-brand-500/20 transition-all group mt-1"
        >
          <Mail size={14} className="text-dark-400 group-hover:text-brand-400 transition-colors" />
          <span className="text-sm text-dark-200 group-hover:text-white transition-colors">
            {brand.email}
          </span>
        </a>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden">
      {/* 背景层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-950 to-black" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-500/[0.03] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[160px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl">
        {/* 返回按钮 */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-brand-400 transition-colors mb-8 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          {t(privacyBackHome)}
        </button>

        {/* Header */}
        <ScrollReveal className="text-center mb-10 sm:mb-14">
          <div className="flex justify-center mb-4 sm:mb-6">
            <EnergyRing size={72} strokeWidth={2} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
            <Lock size={12} className="text-brand-400" />
            <span className="text-[10px] font-semibold text-brand-400 tracking-wider">
              {t(privacyBadge)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            <GradientText animated={true}>{t(privacyPageTitle)}</GradientText>
          </h1>
          <p className="text-dark-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t(privacyPageSubtitle)}
          </p>
          <p className="text-[11px] text-dark-500 mt-3">
            {t(privacyLastUpdated)}: {t(privacyEffectiveDate)}
          </p>
        </ScrollReveal>

        {/* 核心承诺（突出显示） */}
        <ScrollReveal threshold={0.1} className="mb-8 sm:mb-10">
          <div className="relative rounded-2xl glass glow-border p-5 sm:p-6 md:p-8 overflow-hidden border-brand-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.08] via-purple-500/[0.04] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-brand-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {t(privacyPromiseTitle)}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-dark-200 leading-relaxed">
                {t(privacyPromiseBody)}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 章节列表 */}
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-6 sm:space-y-8"
        >
          {sections.map((section) => (
            <SectionCard
              key={section.key}
              icon={section.icon}
              title={section.title}
              body={section.body}
              list={section.list}
              extra={section.extra}
            />
          ))}
        </motion.div>

        {/* 底部声明 */}
        <ScrollReveal threshold={0.1} className="mt-10 sm:mt-14">
          <div className="text-center text-[11px] text-dark-500 leading-relaxed">
            <p>
              © {new Date().getFullYear()} Quiddity. {t(privacyLastUpdated)}:{" "}
              {t(privacyEffectiveDate)}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
