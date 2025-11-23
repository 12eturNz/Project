import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, Menu, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Asset1 from "../assets/Asset1.png";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //  จำลองสถานะ login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Leo");

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // ต่อ backend ภายหลัง  
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/Project/"
          className="flex items-center space-x-2 cursor-pointer h-8 overflow-hidden"
        >
          <img src={Asset1} alt="Logo" className="h-10 sm:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-10 text-gray-800 font-medium">
          <NavLink to="/Project/Sell">{t("navbar.sell")}</NavLink>
          <NavLink to="/Project/Buy">{t("navbar.buy")}</NavLink>
          <NavLink to="/agent">{t("navbar.agent")}</NavLink>
          <NavLink to="/partner">{t("navbar.partner")}</NavLink>
          <NavLink to="/about">{t("navbar.about")}</NavLink>
        </div>

        {/* Language + Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-gray-400 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              {i18n.language === "th" ? "TH" : "EN"} ▾
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white border rounded-full shadow-md px-3 py-1 flex items-center gap-3"
                >
                  <LangButton
                    lang="th"
                    current={i18n.language}
                    onClick={() => changeLang("th")}
                  />
                  <span className="text-gray-300">|</span>
                  <LangButton
                    lang="en"
                    current={i18n.language}
                    onClick={() => changeLang("en")}
                  />
                  <button
                    onClick={() => setLangOpen(false)}
                    className="text-gray-500 hover:text-gray-700 ml-1 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/*  ปุ่ม Login/Logout  */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User size={18} />
                <span className="font-semibold">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-4 bg-[#bfa074] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#a38a5c] transition font-semibold"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu button */}
        <div className="flex md:hidden items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-gray-400 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              {i18n.language === "th" ? "TH" : "EN"} ▾
            </button>
          </div>

          <button
            className="text-gray-800 cursor-pointer"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg flex flex-col p-6 space-y-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">เมนู</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <NavLink to="/Project/Sell" onClick={() => setMenuOpen(false)}>
                {t("navbar.sell")}
              </NavLink>
              <NavLink to="/Project/buy" onClick={() => setMenuOpen(false)}>
                {t("navbar.buy")}
              </NavLink>
              <NavLink to="/agent" onClick={() => setMenuOpen(false)}>
                {t("navbar.agent")}
              </NavLink>
              <NavLink to="/partner" onClick={() => setMenuOpen(false)}>
                {t("navbar.partner")}
              </NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                {t("navbar.about")}
              </NavLink>

              {/*  ปุ่ม Login /Logout มือถือ */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-gray-200 text-gray-800 py-2 rounded-full font-semibold hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#bfa074] text-white text-center py-2 rounded-full font-semibold hover:bg-[#a38a5c] transition"
                >
                  Login
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

// เส้น hover
const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group transition text-gray-800 text-base cursor-pointer"
  >
    {children}
    <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

// ปุ่มภาษา
const LangButton = ({ lang, current, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`text-sm font-medium rounded-full px-3 py-1 transition-all duration-200 cursor-pointer ${
      current === lang
        ? "bg-[#D4AF37] text-yellow-700"
        : "text-gray-700 hover:text-yellow-600 hover:bg-gray-100"
    }`}
  >
    {lang.toUpperCase()}
  </motion.button>
);

export default Navbar;
