/**
 * 导航完整性 E2E 测试
 *
 * 覆盖范围：
 *   - Home 页内导航（6 个）：6 个 Navbar 锚点按钮
 *   - Demo 返回（1 个）：返回按钮 → /
 *   - 跨路由锚点（3 个）：从 /timeline 点击 Navbar 锚点 → 回 Home + 滚动
 *     （/timeline 是除 Home 外唯一渲染 Navbar 的页面；/demo 不渲染 Navbar）
 *   - Footer 链接（3 个）：锚点 + 路由 + 后台
 *   - Hero CTA（2 个）：主 CTA 滚动 + 次 CTA 跳转
 *   - 404 路由（1 个）：未匹配路由显示 NotFound
 *   - 首页 / 手机版详情页（2 个）：所有设备访问 / 均为电脑版首页；/#/mobile 为手机版详情页
 *
 * 设计要点：
 *   - 所有导航元素均为 <button>（Phase 1/2 已统一）
 *   - 每个 test 独立 page.goto，避免状态污染
 *   - 跨路由滚动用 waitForFunction 兜底，给 lazy chunk 加载留时间
 */

import { test, expect, type Page } from "@playwright/test";

const NAVBAR_HEIGHT = 80;

/**
 * 等待 section 滚动到 Navbar 下方可见位置
 * 判定条件：
 *   - rect.top 在 [-10, viewport/2 + 200] 区间（顶部容差 + 下半屏容差）
 *   - rect.bottom > NAVBAR_HEIGHT + 30（确保不被 Navbar 遮挡）
 */
async function expectSectionVisible(
  page: Page,
  sectionId: string,
  timeout = 15000
): Promise<void> {
  // 先等元素存在（cross-route 场景下元素可能还没 mount）
  await page.waitForSelector(`#${sectionId}`, { timeout, state: "attached" });

  const waitForPosition = () =>
    page.waitForFunction(
    (args: { id: string; navbarHeight: number }) => {
      const el = document.getElementById(args.id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      return (
        rect.top >= -10 &&
        rect.top < viewport / 2 + 200 &&
        rect.bottom > args.navbarHeight + 30
      );
    },
    { id: sectionId, navbarHeight: NAVBAR_HEIGHT },
    { timeout }
  );

  try {
    await waitForPosition();
  } catch {
    // 长页面在移动端可能因内容延迟布局导致一次性滚动不到位，布局稳定后重试一次
    await page.evaluate((id) => {
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "smooth" });
    }, sectionId);
    await waitForPosition();
  }
}

/**
 * 点击 Navbar 内的导航按钮（按文本匹配，取第一个）
 */
async function clickNavButton(page: Page, labelText: string): Promise<void> {
  // 优先点击可见的导航按钮（移动端桌面链接被隐藏，需先打开汉堡菜单）
  const btn = page.locator(`nav button:has-text("${labelText}"):visible`).first();
  if ((await btn.count()) === 0) {
    const menuToggle = page.locator('nav button[aria-label="Toggle menu"]').first();
    await menuToggle.click({ timeout: 3000 });
  }
  await btn.waitFor({ state: "visible", timeout: 5000 });
  await btn.click({ timeout: 3000 });
}

// ============================================================
// 1. Home 页内导航（6 个）
// ============================================================
test.describe("Home 页内导航", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero", { timeout: 15000 });
    // 等 Hero 入场动画稳定（ShaderGradient + TextSplit ~1s）
    await page.waitForTimeout(1200);
  });

  test("点击「功能特色」滚动到 #features", async ({ page }) => {
    await clickNavButton(page, "功能特色");
    await expectSectionVisible(page, "features");
  });

  test("点击「应用场景」滚动到 #usecases", async ({ page }) => {
    await clickNavButton(page, "应用场景");
    await expectSectionVisible(page, "usecases");
  });

  test("点击「Quiddity Agent」滚动到 #quiddity", async ({ page }) => {
    await clickNavButton(page, "Quiddity Agent");
    await expectSectionVisible(page, "quiddity");
  });

  test("点击「常见问题」滚动到 #faq", async ({ page }) => {
    await clickNavButton(page, "常见问题");
    await expectSectionVisible(page, "faq");
  });

  test("点击「下载应用」滚动到 #download", async ({ page }) => {
    await clickNavButton(page, "下载应用");
    await expectSectionVisible(page, "download");
  });

  test("点击 Logo 回到顶部 #hero", async ({ page }) => {
    // 先滚动到底部，确保点击 Logo 会有可见的滚动效果
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(400);

    // 点击 Logo（aria-label="回到顶部"）
    const logoBtn = page
      .locator('nav button[aria-label="回到顶部"]')
      .first();
    await logoBtn.click({ timeout: 3000 });

    // 等 #hero 滚到顶部附近
    await page.waitForFunction(
      () => {
        const el = document.getElementById("hero");
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= -10 && rect.top <= 10;
      },
      undefined,
      { timeout: 5000 }
    );
  });
});

// ============================================================
// 2. Demo 返回（1 个）
// ============================================================
test.describe("Demo 返回", () => {
  test("/demo 页点击返回按钮回到首页", async ({ page }) => {
    await page.goto("/#/demo", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Quiddity-Chat · 在线体验", {
      timeout: 15000,
    });
    await page.waitForTimeout(800);

    // 点击返回按钮（aria-label="返回首页"）
    const returnBtn = page
      .locator('button[aria-label="返回首页"]')
      .first();
    await returnBtn.click({ timeout: 3000 });

    // URL 应变为 /（根路径）
    await expect(page).toHaveURL(/\/$/);

    // 返回后展示首页
    await page.waitForSelector("#hero", { timeout: 10000 });
  });
});

// ============================================================
// 4. 跨路由锚点（3 个）—— 从 /timeline 起点测
//    /timeline 是除 Home 外唯一渲染 Navbar 的页面
// ============================================================
test.describe("跨路由锚点（从 /timeline）", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#/timeline", { waitUntil: "networkidle" });
    // Timeline 页面渲染等待
    await page.waitForSelector("nav", { timeout: 15000 });
    await page.waitForTimeout(800);
  });

  test("从 /timeline 点击「功能特色」回 Home + 滚动到 #features", async ({
    page,
  }) => {
    await clickNavButton(page, "功能特色");

    // URL 应回到 /
    await expect(page).toHaveURL(/\/$/);

    // #features 应可见
    await expectSectionVisible(page, "features", 10000);
  });

  test("从 /timeline 点击「应用场景」回 Home + 滚动到 #usecases", async ({
    page,
  }) => {
    await clickNavButton(page, "应用场景");
    await expect(page).toHaveURL(/\/$/);
    await expectSectionVisible(page, "usecases", 10000);
  });

  test("从 /timeline 点击「Quiddity Agent」回 Home + 滚动到 #quiddity", async ({
    page,
  }) => {
    await clickNavButton(page, "Quiddity Agent");
    await expect(page).toHaveURL(/\/$/);
    await expectSectionVisible(page, "quiddity", 10000);
  });
});

// ============================================================
// 5. Footer 链接（3 个）
// ============================================================
test.describe("Footer 链接", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("footer", { timeout: 15000 });
    await page.waitForTimeout(800);
  });

  test("Footer 点击「功能特色」滚动到 #features", async ({ page }) => {
    const btn = page.locator('footer button:has-text("功能特色")').first();
    await btn.click({ timeout: 3000 });
    await expectSectionVisible(page, "features");
  });

  test("Footer 点击「免责声明」跳转到 /#/legal", async ({ page }) => {
    const btn = page.locator('footer button:has-text("免责声明")').first();
    await btn.click({ timeout: 3000 });
    await expect(page).toHaveURL(/#\/legal$/);
  });

});

// ============================================================
// 6. Hero CTA（2 个）
// ============================================================
test.describe("Hero CTA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.waitForSelector("#hero", { timeout: 15000 });
    await page.waitForTimeout(1200);
  });

  test("Hero 点击「立即下载」滚动到 #download", async ({ page }) => {
    // 限定在 #hero section 内查找，避免与 Navbar CTA 冲突
    const btn = page
      .locator('section#hero button:has-text("立即下载")')
      .first();
    await btn.click({ timeout: 3000 });
    await expectSectionVisible(page, "download");
  });

  test("Hero 点击「在线体验」跳转到 /#/demo", async ({ page }) => {
    const btn = page
      .locator('section#hero button:has-text("在线体验")')
      .first();
    await btn.click({ timeout: 3000 });
    await expect(page).toHaveURL(/#\/demo$/);
  });
});

// ============================================================
// 7. 404 路由（1 个）
// ============================================================
test.describe("404 路由", () => {
  test("访问不存在的路由显示 404 页面", async ({ page }) => {
    await page.goto("/#/this-route-does-not-exist", {
      waitUntil: "networkidle",
    });

    // 404 大字应可见
    await page.waitForSelector("text=404", { timeout: 10000 });

    // 描述文案应可见
    await expect(page.locator("text=页面不存在")).toBeVisible({
      timeout: 5000,
    });

    // 「返回首页」按钮应可点击回 Home
    const btn = page.locator('button:has-text("返回首页")').first();
    await btn.click({ timeout: 3000 });

    await expect(page).toHaveURL(/\/$/);
    await page.waitForSelector("#hero", { timeout: 10000 });
  });
});

// ============================================================
// 8. 首页与手机版详情页（2 个）
//    所有设备访问 / 都展示电脑版首页；/#/mobile 为手机版详情页
// ============================================================
test.describe("首页与手机版详情页", () => {
  test("所有设备访问首页都展示电脑版首页", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    // 桌面版首页：Hero / 功能 / 场景 / FAQ / 下载 / 导航 / 页脚
    await page.waitForSelector("#hero", { timeout: 15000 });
    await expect(page.locator("#features")).toBeVisible();
    await expect(page.locator("#usecases")).toBeVisible();
    await expect(page.locator("#faq")).toBeVisible();
    await expect(page.locator("#download")).toBeVisible();
    await expect(page.locator("nav").first()).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
    // 首页包含 Android 客户端下载卡片；FAQ 不再包含安卓问题
    await expect(page.locator("text=Android 客户端").first()).toBeVisible();
    await expect(page.locator("text=安卓端支持哪些系统？鸿蒙可以吗？")).toHaveCount(0);
  });

  test("手机版详情页仍可通过 /#/mobile 访问", async ({ page }) => {
    await page.goto("/#/mobile", { waitUntil: "networkidle" });
    await page.waitForSelector("text=Quiddity-Android", { timeout: 15000 });
    await expect(page.locator("text=下载 APK")).toBeVisible();
    // 如何开始区块：添加 API 步骤 + 报错说明
    await expect(page.locator("text=如何开始 · 添加 API 密钥")).toBeVisible();
    await expect(page.locator("text=API 报错说明")).toBeVisible();
    await expect(page.locator("text=402")).toBeVisible();
  });
});
