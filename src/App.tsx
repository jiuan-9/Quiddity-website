import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";

const Home = lazy(() => import("@/pages/Home"));
const Demo = lazy(() => import("@/pages/Demo"));
const Timeline = lazy(() => import("@/pages/Timeline"));
const Assistant = lazy(() => import("@/pages/Assistant"));
const Mobile = lazy(() => import("@/pages/Mobile"));
const MobileHome = lazy(() => import("@/pages/MobileHome"));
const Shizuku = lazy(() => import("@/pages/Shizuku"));
const Legal = lazy(() => import("@/pages/legal/Legal"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  const location = useLocation();
  const isTouch = useIsTouchDevice();

  // 设备分流：手机 / 平板访问首页时展示手机版首页，电脑端展示桌面版首页
  const homeElement = isTouch && location.pathname === "/" ? <MobileHome /> : <Home />;

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={homeElement} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/mobile" element={<Mobile />} />
        <Route path="/shizuku" element={<Shizuku />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
