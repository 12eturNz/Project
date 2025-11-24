import React from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AppRouter from "./router/AppRouter";
import ScrollToTop from "./components/ScrollToTop";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={i18n.language + location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      > <ScrollToTop />
        <AppRouter />
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => {
  return <AnimatedRoutes />;
};

export default App;

