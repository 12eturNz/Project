import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Buy = lazy(() => import("../pages/Buy"));
const Sell = lazy(() => import("../pages/Sell"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));

const Agent = lazy(() => import("../pages/Agent"));
const Partner = lazy(() => import("../pages/Partner"));
const About = lazy(() => import("../pages/About"));
const PropertyDetail1 = lazy(() => import("../pages/PropertyDetail/PropertyDetail1"));
const PropertyDetail2 = lazy(() => import("../pages/PropertyDetail/PropertyDetail2"));
const PropertyDetail3 = lazy(() => import("../pages/PropertyDetail/PropertyDetail3"));
const PropertyDetail4 = lazy(() => import("../pages/PropertyDetail/PropertyDetail4"));
const PropertyDetail5 = lazy(() => import("../pages/PropertyDetail/PropertyDetail5"));
const PropertyDetail6 = lazy(() => import("../pages/PropertyDetail/PropertyDetail6"));
const PropertyDetail7 = lazy(() => import("../pages/PropertyDetail/PropertyDetail7"));
const PropertyDetail8 = lazy(() => import("../pages/PropertyDetail/PropertyDetail8"));
const PropertyDetail9 = lazy(() => import("../pages/PropertyDetail/PropertyDetail9"));

export default function AppRouter() {
  return (
    <Suspense fallback={<div className="text-center mt-10">กำลังโหลด...</div>}>
      <Routes>
        <Route path="/Project/" element={<Home />} />
        <Route path="/Project/Buy" element={<Buy />} />
        <Route path="/Project/Sell" element={<Sell />} />
        <Route path="/Project/Blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/agent" element={<Agent />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/about" element={<About />} />
        <Route path="/PropertyDetail1" element={<PropertyDetail1/>} />
        <Route path="/PropertyDetail2" element={<PropertyDetail2/>} />
        <Route path="/PropertyDetail3" element={<PropertyDetail3/>} />
        <Route path="/PropertyDetail4" element={<PropertyDetail4/>} />
        <Route path="/PropertyDetail5" element={<PropertyDetail5/>} />
        <Route path="/PropertyDetail6" element={<PropertyDetail6/>} />
        <Route path="/PropertyDetail7" element={<PropertyDetail7/>} />
        <Route path="/PropertyDetail8" element={<PropertyDetail8/>} />
        <Route path="/PropertyDetail9" element={<PropertyDetail9/>} />
      </Routes>
    </Suspense>
  );
}