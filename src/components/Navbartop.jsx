import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // เพิ่ม useLocation
import { X, Menu, User, Shield, Home } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Asset1 from "../assets/Asset1.png";

// รับ onSellClick เป็น props
const Navbar = ({ onSellClick }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation(); // ใช้เช็คว่าอยู่หน้าไหน
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("User");

  // ฟังก์ชันจัดการเมื่อกดปุ่ม "เสนอขายบ้าน"
  const handleSellClick = () => {
    // ถ้ามีฟังก์ชัน onSellClick (แปลว่าอยู่หน้า Sell.jsx) ให้เรียกใช้เลย
    if (onSellClick) {
      onSellClick();
    } else {
      // ถ้าอยู่หน้าอื่น ให้ไปหน้า Sell และอาจจะแนบ hash ไปเพื่อให้ Sell.jsx เลื่อนหา
      navigate("/Project/Sell#register-section");
    }
    setMenuOpen(false); // ปิดเมนูมือถือถ้าเปิดอยู่
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const currentKey = localStorage.getItem("currentUser");
      if (currentKey) {
        setIsLoggedIn(true);
        const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
        const userData = allUsers[currentKey];
        if (userData) {
          setUserName(userData.firstName || userData.username || "User");
          setUserRole(userData.role || "User");
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("auth-change", checkLoginStatus);
    return () => {
      window.removeEventListener("auth-change", checkLoginStatus);
    };
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/Project/");
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-sm font-sans">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/Project/" className="flex items-center space-x-2 cursor-pointer h-8 overflow-hidden">
          <img src={Asset1} alt="Logo" className="h-10 sm:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-8 lg:space-x-10 text-gray-800 font-medium">
          <NavLink to="/Project/Sell">{t("navbar.sell")}</NavLink>
          <NavLink to="/Project/Buy">{t("navbar.buy")}</NavLink>
          <NavLink to="/agent">{t("navbar.agent")}</NavLink>
          <NavLink to="/partner">{t("navbar.partner")}</NavLink>
          <NavLink to="/about">{t("navbar.about")}</NavLink>
        </div>

        {/* Right Section (Lang / Button / Auth) */}
        <div className="hidden md:flex items-center space-x-4">
            
          

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="border border-gray-400 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition cursor-pointer flex items-center"
            >
              {i18n.language === "th" ? "TH" : "EN"} <span className="ml-1 text-xs">▾</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white border rounded-lg shadow-xl px-4 py-2 flex items-center gap-3 min-w-[120px] justify-center"
                >
                  <LangButton lang="th" current={i18n.language} onClick={() => changeLang("th")} />
                  <span className="text-gray-300">|</span>
                  <LangButton lang="en" current={i18n.language} onClick={() => changeLang("en")} />
                  {/* <button onClick={() => setLangOpen(false)} className="absolute top-1 right-2 text-gray-400 hover:text-gray-600">
                    <X size={12} />
                  </button> */}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Auth Section */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/Project/Profile"
                className={`flex items-center gap-2 px-3 py-1 rounded-full transition ${
                    userRole === 'Admin' 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                    : 'text-gray-700 hover:text-[#bfa074]'
                }`}
              >
                {userRole === 'Admin' ? <Shield size={18} /> : <User size={20} />}
                <span className="font-semibold max-w-[100px] lg:max-w-[150px] truncate text-sm">
                    {userName}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-600 text-xs px-3 py-2 rounded-full hover:bg-gray-200 transition font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/LoginRegister/"
              className="bg-[#bfa074] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#a38a5c] transition font-semibold text-sm"
            >
              {t("login") || "Login"}
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button className="text-gray-800 cursor-pointer hover:text-[#bfa074] transition" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col p-6 space-y-6 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
                <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-[#bfa074]">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-4">
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

                <hr className="border-gray-100" />
                
              
              </div>

              <div className="mt-auto space-y-4">
                {isLoggedIn ? (
                    <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                    <Link
                        to="/Project/Profile"
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 font-semibold ${
                            userRole === 'Admin' ? 'text-red-600' : 'text-gray-800'
                        }`}
                    >
                        {userRole === 'Admin' ? <Shield size={20} /> : <User size={20} />}
                        <span className="truncate">{userName}</span>
                    </Link>
                    <button
                        onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                        }}
                        className="w-full bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                    >
                        Logout
                    </button>
                    </div>
                ) : (
                    <Link
                    to="/LoginRegister/"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full bg-[#bfa074] text-white text-center py-3 rounded-xl font-bold hover:bg-[#a38a5c] transition shadow-md"
                    >
                    Login
                    </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="relative group transition text-gray-600 hover:text-gray-900 text-base cursor-pointer py-1 font-medium"
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#bfa074] transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const LangButton = ({ lang, current, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`text-sm font-bold px-2 py-1 transition-colors cursor-pointer uppercase ${current === lang
        ? "text-[#bfa074]"
        : "text-gray-400 hover:text-gray-600"
      }`}
  >
    {lang}
  </motion.button>
);

export default Navbar;