import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Demo = lazy(() => import("@/pages/Demo"));
const Timeline = lazy(() => import("@/pages/Timeline"));
const Assistant = lazy(() => import("@/pages/Assistant"));
const Mobile = lazy(() => import("@/pages/Mobile"));
const Shizuku = lazy(() => import("@/pages/Shizuku"));
const Legal = lazy(() => import("@/pages/legal/Legal"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
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
