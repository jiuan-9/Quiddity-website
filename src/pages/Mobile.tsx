import { useEffect } from "react";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  History,
  MessageSquare,
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

const APK_URL = `${import.meta.env.BASE_URL}downloads/quiddity-1.6.0.apk`;
const APK_MIRROR_URL =
  "https://github.com/jiuan-9/Quiddity-website/releases/download/v1.6.0/quiddity-1.6.0.apk";

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

/** 如何开始（添加 API）区块 */
function HowToStart() {
  const { t } = useI18n();
  const base = import.meta.env.BASE_URL;

  const steps: Array<{
    img: string;
    title: { zh: string; en: string };
    desc: { zh: string; en: string };
  }> = [
    {
      img: `${base}images/howto/01-home.png`,
      title: { zh: "打开设置", en: "Open Settings" },
      desc: {
        zh: "打开 App，点左上角的「设置」齿轮图标。",
        en: "Open the app and tap the gear icon (Settings) in the top-left.",
      },
    },
    {
      img: `${base}images/howto/02-settings.png`,
      title: { zh: "找到「模型配置」", en: "Find Model Config" },
      desc: {
        zh: "在设置里往下翻，找到「模型配置」，点进去。",
        en: "Scroll down in Settings and tap \"Model Config\".",
      },
    },
    {
      img: `${base}images/howto/03-model-list.png`,
      title: { zh: "点「新建」", en: "Tap New" },
      desc: {
        zh: "在模型配置列表点右上角「新建」，选择服务商（DeepSeek、Kimi、豆包、通义千问等）。",
        en: "Tap \"New\" in the top-right, then pick a provider (DeepSeek, Kimi, Doubao, Qwen, etc.).",
      },
    },
    {
      img: `${base}images/howto/04-new-form.png`,
      title: { zh: "确认配置", en: "Check the Config" },
      desc: {
        zh: "选好服务商后接口地址和模型会自动填好，名称随便起一个。",
        en: "The API URL and model are filled in automatically; just give it a name.",
      },
    },
    {
      img: `${base}images/howto/05-key-input.png`,
      title: { zh: "填入 API Key", en: "Enter Your API Key" },
      desc: {
        zh: "在「接口密钥」粘贴你的 API Key（去服务商官网申请，如 platform.deepseek.com），点「保存」。",
        en: "Paste your API key in the \"API Key\" field (get one from your provider, e.g. platform.deepseek.com), then tap Save.",
      },
    },
    {
      img: `${base}images/howto/06-error.png`,
      title: { zh: "发条消息试试", en: "Try a Message" },
      desc: {
        zh: "回到聊天页发一条消息测试。如果报错，看下面的「报错说明」。",
        en: "Go back to chat and send a message. If it errors, check the error guide below.",
      },
    },
  ];

  const errors: Array<{
    code: string;
    name: { zh: string; en: string };
    why: { zh: string; en: string };
    fix: { zh: string; en: string };
  }> = [
    {
      code: "401",
      name: { zh: "密钥不对", en: "Bad key" },
      why: { zh: "API Key 填错、复制不完整或已过期。", en: "The API key is wrong, incomplete, or expired." },
      fix: { zh: "重新复制完整的 Key，确认没多空格、没填错位置。", en: "Re-copy the full key and make sure there are no extra spaces." },
    },
    {
      code: "402",
      name: { zh: "余额不足", en: "No balance" },
      why: { zh: "服务商账户里没钱了（充值余额用尽）。", en: "Your provider account balance has run out." },
      fix: { zh: "去服务商平台充值后再试。", en: "Top up at the provider's platform and retry." },
    },
    {
      code: "429",
      name: { zh: "请求太频繁", en: "Too many requests" },
      why: { zh: "短时间内发的请求太多，被限流了。", en: "Too many requests in a short time; rate-limited." },
      fix: { zh: "等一两分钟再发。", en: "Wait a minute or two and try again." },
    },
    {
      code: "5xx",
      name: { zh: "服务商故障", en: "Provider error" },
      why: { zh: "服务商服务器出问题了（500/502/503）。", en: "The provider's server is having issues (500/502/503)." },
      fix: { zh: "不是你的问题，稍后再试。", en: "It's not on your side — retry later." },
    },
    {
      code: "网络",
      name: { zh: "网络错误", en: "Network error" },
      why: { zh: "连不上网络，或接口地址填错了。", en: "Can't reach the network, or the API URL is wrong." },
      fix: { zh: "检查网络，确认接口地址以 /chat/completions 结尾。", en: "Check your network and make sure the URL ends with /chat/completions." },
    },
  ];

  return (
    <Section
      icon={<Smartphone size={17} className="text-brand-400" />}
      title={t({ zh: "如何开始 · 添加 API 密钥", en: "How to Start · Add an API Key" })}
    >
      <ol className="space-y-6">
        {steps.map((step, i) => (
          <li key={step.img} className="flex gap-3">
            <div className="shrink-0">
              <div className="w-7 h-7 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400">
                {i + 1}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white mb-1">{t(step.title)}</div>
              <p className="text-xs text-dark-400 leading-relaxed mb-3">{t(step.desc)}</p>
              <img
                src={step.img}
                alt={t(step.title)}
                loading="lazy"
                className="w-full max-w-[240px] rounded-xl border border-white/[0.08] shadow-lg shadow-black/40"
              />
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <h3 className="text-sm font-bold text-white mb-3">
          {t({ zh: "API 报错说明", en: "API Error Guide" })}
        </h3>
        <ul className="space-y-2.5">
          {errors.map((e) => (
            <li key={e.code} className="flex gap-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] p-3">
              <span className="shrink-0 text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-md px-1.5 py-0.5 h-fit">
                {e.code}
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white">{t(e.name)}</div>
                <div className="text-[11px] text-dark-400 leading-relaxed mt-0.5">
                  {t(e.why)} {t(e.fix)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
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
            download="quiddity-1.6.0.apk"
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
          {/* 系统要求 */}
          <Section icon={<Smartphone size={17} className="text-brand-400" />} title={t(mobileRequirementsTitle)}>
            <InfoList items={mobileRequirements} />
          </Section>

          {/* 如何开始 · 添加 API 密钥 */}
          <HowToStart />

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
