import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/store/i18n";
import {
  notFoundTitle,
  notFoundDescriptionLine1,
  notFoundDescriptionLine2,
  notFoundBackHome,
  notFoundBackPrev,
} from "@/content";
import { scrollToSection } from "@/lib/scroll";

/**
 * 404 页面 — 极简黑蓝主题
 * 布局独立：不引入 Layout，不渲染 Navbar
 */
export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useI18n();

  /* 进入页面时滚动到顶部（修复 SPA 路由切换后停留滚动位置的问题） */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* 智能回退：检测 hash 路由是否实际是首页 anchor。
   * 例如用户访问 /#/download 会被当作 404，
   * 但 #download 实际是 Home 内的 anchor（下载区）。
   * 自动导航到首页并滚动到对应 section。 */
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#") && !hash.startsWith("#/")) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        navigate("/", { replace: true });
        return;
      }
    }
    /* hash 路由形式 #/xxx：尝试以同 id 滚到首页（兼容被误用的 anchor） */
    if (hash.startsWith("#/") && hash.length > 2) {
      const id = hash.slice(2);
      navigate("/", { replace: true });
      window.setTimeout(() => scrollToSection(id), 50);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-6 overflow-hidden relative">
      {/* 背景光晕（极淡，不喧宾夺主） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(20, 176, 255, 0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 text-center max-w-lg">
        {/* 大号 404 */}
        <h1
          className="text-gradient text-[120px] sm:text-[160px] font-black leading-none select-none"
          style={{ letterSpacing: "-0.04em" }}
        >
          404
        </h1>

        {/* 分隔线 */}
        <div className="section-divider mx-auto my-8" style={{ maxWidth: 240 }} />

        {/* 文案 */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
          {t(notFoundTitle)}
        </h2>
        <p className="text-sm text-dark-400 mb-10 leading-relaxed">
          {t(notFoundDescriptionLine1)}
          <br />
          {t(notFoundDescriptionLine2)}
        </p>

        {/* 按钮组 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-press inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-brand-500 hover:bg-brand-400 text-dark-950 text-sm font-semibold transition-all duration-300 shadow-lg shadow-brand-500/20 w-full sm:w-auto"
          >
            {t(notFoundBackHome)}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-press inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full glass text-dark-200 hover:text-white text-sm transition-all duration-300 hover:border-brand-500/30 hover:bg-white/5 w-full sm:w-auto border-0 cursor-pointer"
          >
            {t(notFoundBackPrev)}
          </button>
        </div>
      </div>
    </div>
  );
}
