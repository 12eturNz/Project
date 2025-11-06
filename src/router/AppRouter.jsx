import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Buy from "../pages/Buy";
import Sell from "../pages/Sell";

const AppRouter = () => {
  return (
    <Routes>
  <Route path="/Project/" element={<Home />} />
  <Route path="/Project/Buy" element={<Buy />} />
  <Route path="/Project/Sell" element={<Sell />} />
  
  </Routes>

  );
};

export default AppRouter;
