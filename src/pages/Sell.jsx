import React, { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Components
import Navbar from "../components/Navbartop";
import WhyHomerun from "../components/WhyHomerun";
import Footer from "../components/Footer";
import PropertyTypeSection from "../components/PropertyTypeSection";
import StepsWithHomerun from "../components/StepsWithHomerun";
import FAQSection from "../components/FAQSection";
import Navbarbottom from "../components/Navbarbottom";



import img1 from "../assets/house1.jpg";

const Sell = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  
  // 1. สร้าง Ref ไปหาฟอร์ม
  const registerRef = useRef(null);
  
  const location = useLocation();
  const { t } = useTranslation();

  // 2. ฟังก์ชันสั่งเลื่อนหน้าจอ (Scroll)
  const scrollToRegister = () => {
    const yOffset = -100; // ปรับความสูงเผื่อ Header บัง
    const element = registerRef.current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const target = document.getElementById(sectionId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  const slideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Navbar Top: ส่ง props onSellClick ไปให้ Navbar เรียกใช้ */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar onSellClick={scrollToRegister} />
      </motion.div>

      {/* Navbar Bottom: ส่ง props ไปด้วยเช่นกัน (ถ้ามีปุ่มในนี้) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showFixedNavbar ? 0 : -100,
          opacity: showFixedNavbar ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-30 shadow-md"
      >
        <Navbarbottom onSellClick={scrollToRegister} />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-black">
        <img
          src={img1}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.div
           variants={slideUp}
           initial="hidden"
           animate="visible"
           className="relative z-10 flex flex-col items-center text-center px-4"
        >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg mb-8">
            {t("Sell.H")}<br />
            <span className="text-[#bfa074]"> {t("Sell.H1")}</span>
            </h1>

           
        </motion.div>
      </section>

      <section id="property-type">
        <PropertyTypeSection />
      </section>

      <section id="steps">
        <StepsWithHomerun />
      </section>

      <section id="why-homerun">
        <WhyHomerun onSellClick={scrollToRegister} />
      </section>

     

      <section id="faq">
        <FAQSection />
      </section>

      <Footer />
    </div>
  );
});

export default Sell;