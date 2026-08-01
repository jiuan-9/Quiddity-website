/**
 * scrollToSection — 平滑滚动到指定 section
 *
 * 修复（阶段 E，移动端锚点跳转修复）：
 *   v3.0 之前的 bug：当用户在移动端打开汉堡菜单后点击"下载应用"，
 *   - setMobileOpen(false) 触发菜单退出动画，但菜单 DOM 仍存在
 *   - scrollToSection 同步执行，nav.getBoundingClientRect().height 包含了
 *     正在退出/未退出的移动菜单高度（~500-600px）
 *   - 实际顶栏高度只有 64px，导致目标位置被多减 500+px
 *   - 视觉表现：滚到了 download 之前的内容（agent 板块）
 *
 *   修复：使用专用的 #navbar-bar 元素 ID，仅读取顶栏容器高度，
 *   永远不受移动菜单 DOM 状态影响。
 */

import type { NavigateFunction } from "react-router-dom";

const MOBILE_BREAKPOINT = 768;
const FLASH_CLASS = "scroll-flash-highlight";
const FLASH_DURATION_MS = 1500;

/**
 * 读取顶栏精确高度。
 *
 * 关键设计：
 *   1. 优先通过 #navbar-bar 读取（专属 ID，不受移动菜单 DOM 状态影响）
 *   2. 兜底：document.querySelector("nav")，但这种情况只发生在 #navbar-bar
 *      不存在时（如测试环境或 SSR），此时选择 nav 第一个子元素
 *   3. 最后兜底：基于移动端断点返回固定值
 */
function getNavbarHeight(): number {
  if (typeof document === "undefined") return 80;

  // 主路径：通过专属 ID 读取顶栏高度（不受移动菜单影响）
  const bar = document.getElementById("navbar-bar");
  if (bar) {
    const h = bar.getBoundingClientRect().height;
    if (h > 0) return h;
  }

  // 兜底路径：取 nav 元素的第一个子元素（顶栏容器）高度
  const nav = document.querySelector("nav");
  if (nav) {
    const firstChild = nav.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const h = firstChild.getBoundingClientRect().height;
      if (h > 0) return h;
    }
    // 最后兜底：直接读 nav 高度（会包含菜单，应避免走到这里）
  }

  return window.innerWidth < MOBILE_BREAKPOINT ? 64 : 72;
}

function flashElement(el: HTMLElement): void {
  el.classList.add(FLASH_CLASS);
  window.setTimeout(() => {
    el.classList.remove(FLASH_CLASS);
  }, FLASH_DURATION_MS);
}

export function scrollToSection(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) {
    if (import.meta.env?.DEV) {
      console.warn(`[scrollToSection] element not found: #${id}`);
    }
    return;
  }

  const navHeight = getNavbarHeight();
  const rect = el.getBoundingClientRect();
  const targetTop = window.scrollY + rect.top - navHeight - 8;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    window.scrollTo(0, targetTop);
  } else {
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  try {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  } catch (_) {
    // 忽略
  }

  flashElement(el);
}

/**
 * 跨路由锚点跳转的重试延迟序列（覆盖 lazy chunk 加载耗时）
 * 50ms / 100ms / 200ms / 400ms / 800ms，5 次重试足够覆盖 99% 的网络情况
 */
const RETRY_DELAYS = [50, 100, 200, 400, 800];

/**
 * navigateToSection — 统一导航函数：处理同页锚点 + 跨路由锚点
 *
 * 设计目标：把 Navbar 内联的重试逻辑抽出来，让 Footer / Hero / 其他页面都能复用
 *
 * 行为分支：
 *   - href 以 "#/" 开头：路由跳转（如 "#/demo" → navigate("/demo")）
 *   - href 以 "#" 开头（但不是 "#/"）：同页锚点
 *     - 当前在 Home：直接 scrollToSection
 *     - 当前在子路由：navigate("/") 后多次重试 scrollToSection
 *       （因为 Home 是 lazy import，需要等 chunk 加载和组件 mount 完成）
 *
 * @param href 形如 "#features" 或 "#/demo"
 * @param navigate react-router useNavigate 返回的函数
 * @param currentPathname 当前路径（useLocation().pathname）
 */
export function navigateToSection(
  href: string,
  navigate: NavigateFunction,
  currentPathname: string
): void {
  if (href.startsWith("#/")) {
    navigate(href.slice(1));
    return;
  }

  const sectionId = href.slice(1);

  if (currentPathname === "/") {
    scrollToSection(sectionId);
    return;
  }

  navigate("/");
  RETRY_DELAYS.forEach((delay) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        scrollToSection(sectionId);
      }
    }, delay);
  });
}
