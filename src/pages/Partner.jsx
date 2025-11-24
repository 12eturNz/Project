import React, { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import RegisterFormPartner from "../components/RegisterFormPartner";
import ReviewCarousel from "../components/ReviewCarousel";
import img2 from "../assets/house2.jpg";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  HardHat,
  Paintbrush,
  Package,
  Banknote,
  Coffee,
  Check,
  TrendingUp,
  Award,
} from "lucide-react";

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Partner = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const formRef = useRef(null);
  const { t } = useTranslation();

  // ---------- ต้องประกาศที่นี่ ----------
  const partnerValue = [
    { icon: DollarSign, type: t("Partner.P1"), value: t("Partner.D1"), color: "text-[#bfa074]" },
    { icon: HardHat, type: t("Partner.P2"), value: t("Partner.D2"), color: "text-[#bfa074]" },
    { icon: Paintbrush, type: t("Partner.P3"), value: t("Partner.D3"), color: "text-[#bfa074]" },
    { icon: Package, type: t("Partner.P4"), value: t("Partner.D4"), color: "text-[#bfa074]" },
    { icon: Banknote, type: t("Partner.P5"), value: t("Partner.D5"), color: "text-[#bfa074]" },
    { icon: Coffee, type: t("Partner.P6"), value: t("Partner.D6"), color: "text-[#bfa074]" },
  ];

  const partnershipModels = [
    { icon: Award, title: t("Partner.P7"), desc: t("Partner.D7"), color: "bg-gray-100 text-[#bfa074]" },
    { icon: TrendingUp, title: t("Partner.P8"), desc: t("Partner.D8"), color: "bg-gray-100 text-[#bfa074]" },
    { icon: Check, title: t("Partner.P9"), desc: t("Partner.D9"), color: "bg-gray-100 text-[#bfa074]" },
  ];
  // ----------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <Navbar />
      </motion.div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <img src={img2} alt="พาร์ทเนอร์ทางธุรกิจ" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight"
        >
          {t("Partner.H1")}
        </motion.h1>
      </section>

      {/* Section 1 */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t("Partner.H2")}
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {t("Partner.H3")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnerValue.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <item.icon className={item.color} size={32} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.type}</h3>
                <p className="text-gray-700">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            {t("Partner.H3")}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {partnershipModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className={`flex items-center justify-center p-4 rounded-full ${model.color} mb-4`}>
                  <model.icon size={32} />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">{model.title}</h3>
                <p className="text-gray-600">{model.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review */}
      <section className="w-full py-20 bg-white">
        <ReviewCarousel />
      </section>

      {/* Target Audience */}
      <section className="w-full py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6"> {t("Partner.H4")}</h3>

            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">{t("Partner.P1")}</span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                {t("Partner.H5")}
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                {t("Partner.H6")}
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                 {t("Partner.H7")}
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">{t("Partner.P5")}</span>
            </div>

            <p className="text-gray-700 mt-8 mb-8 max-w-xl mx-auto">
              {t("Partner.H8")}
            </p>

            <button
              onClick={scrollToForm}
              className="inline-block bg-[#bfa074] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a38a5c] cursor-pointer transition text-lg shadow-lg hover:shadow-xl"
            >
              {t("Partner.H9")}
            </button>
          </motion.div>
        </div>
      </section>

     

      <Footer />
    </div>
  );
});

export default Partner;
