import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Buy = lazy(() => import("../pages/Buy"));
const Sell = lazy(() => import("../pages/Sell"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));


export default function AppRouter() {
  return (
    <Suspense fallback={<div className="text-center mt-10">กำลังโหลด...</div>}>
      <Routes>
        <Route path="/Project/" element={<Home />} />
        <Route path="/Project/Buy" element={<Buy />} />
        <Route path="/Project/Sell" element={<Sell />} />
        <Route path="/Project/Blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Suspense>
  );
}
