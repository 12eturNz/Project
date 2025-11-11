import React, { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbartop";
import WhyHomerun from "../components/WhyHomerun";
import Footer from "../components/Footer";
import PropertyTypeSection from "../components/PropertyTypeSection";
import StepsWithHomerun from "../components/StepsWithHomerun";
import FAQSection from "../components/FAQSection";
import RegisterForm from "../components/RegisterForm";
import img1 from "../assets/house1.jpg";
import Navbarbottom from "../components/Navbarbottom";

const Sell = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const registerRef = useRef(null);
  const location = useLocation();

  // เลื่อนไปยัง RegisterForm
  const scrollToRegister = () => {
    const yOffset = -80;
    const element = registerRef.current;
    if (element) {
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // แสดง Navbar Bottom เมื่อ scroll ลงมา
  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //  เมื่อเปิดหน้า /sell พร้อม hash  ให้เลื่อนไปยัง section นั้น Auto
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");
      const target = document.getElementById(sectionId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300); // หน่วงเล็กน้อยให้ DOM โหลดครบ
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
      {/* Navbar */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <Navbar />
      </motion.div>

      {/* Navbar Bottom */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showFixedNavbar ? 0 : -100,
          opacity: showFixedNavbar ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-30 shadow-md"
      >
        <Navbarbottom />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src={img1}
          alt="ขายบ้านกับทางPremium Asset"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight drop-shadow-lg"
        >
          ขายบ้านกับ <br />
          <span className="text-[#bfa074]">Premium Asset</span>
        </motion.h1>
      </section>

      {/* Sections */}
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

      {/* Register Form */}
      <section id="register-form" ref={registerRef} className="mt-20 mb-16 px-3 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <RegisterForm />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
});

export default Sell;
