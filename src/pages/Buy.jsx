import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbartop";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import PropertyGridWithPagination from "../components/PropertyGridWithPagination";
import { useTranslation } from "react-i18next";
import img1 from "../assets/house1.jpg";


const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const defaultFilters = {
  searchTerm: "",
  price: { min: "", max: "" },
  bedroom: "",
  bathroom: "",
  type: [],
  area: { minLand: "", maxLand: "", minArea: "", maxArea: "" },
  series: [],
};


const Home = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const { t } = useTranslation();

 
  //  ย้าย State การกรองขึ้นมาที่นี่เพื่อส่งไปให้ PropertyGrid 
 
  const [currentFilters, setCurrentFilters] = useState(defaultFilters);
  const [filters, setFilters] = useState(defaultFilters); // State สำหรับ SearchBar ภายใน

  // Handler สำหรับปุ่ม "ค้นหา" หลัก
  const handleSearch = () => {
    setCurrentFilters(filters);
  };
  
  // Handler สำหรับปุ่ม "ล้างค่า" ทั้งหมด
  const handleClearAll = () => {
    // ตั้งค่า state filters (สำหรับแสดงผลใน Dropdown) และ currentFilters (สำหรับกรอง)
    setFilters(defaultFilters);
    setCurrentFilters(defaultFilters);
  };


  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <section className="relative w-full h-[60vh] xs:h-[65vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src={img1}
          alt="บ้านรีโนเวทกับทาง Premium Asset"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight"
        >
          {t("Buy.H")} <br />
          <span className="text-[#bfa074]">{t("Buy.H1")}</span>
        </motion.h1>
      </section>

      {/* SearchBar Section */}
      <section className="w-full bg-white py-10 -mt-12 sm:-mt-16 relative z-30 px-3 sm:px-4">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/95 sm:bg-white/80 shadow-xl rounded-3xl p-4 sm:p-6 w-full max-w-[850px] backdrop-blur-md hover:shadow-2xl transition-all duration-500">
            {/* ส่ง State และ Handlers ลงไปให้ SearchBar */}
            <SearchBar 
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
                handleClearAll={handleClearAll}
            />
          </div>
        </motion.div>
      </section>

      {/* Property Grid Section */}
      <section className="w-full px-3 xs:px-4 sm:px-8 md:px-12 py-16 bg-[#fafafa]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="text-center mb-10"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {t("Buy.H3")}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3 px-2">
           {t("Buy.P")}
          </p>
        </motion.div>

        <div className="w-full flex justify-center">
          {/* ส่ง currentFilters ไปให้ PropertyGridWithPagination */}
          <PropertyGridWithPagination currentFilters={currentFilters} />
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default Home;