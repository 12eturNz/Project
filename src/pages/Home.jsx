import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbartop";
import Navbarbottom from "../components/Navbarbottom";
import SearchBar from "../components/SearchBar";
import PropertyCard from "../components/PropertyCard";
import ReviewCarousel from "../components/ReviewCarousel";
import WhyHomerun from "../components/WhyHomerun";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

// Images
import img1 from "../assets/house1.jpg";
import img2 from "../assets/house2.jpg";
import img3 from "../assets/house3.jpg";
import img4 from "../assets/house4.jpg";

import sukhumvit from "../assets/locations/sukhumvit.jpg";
import silom from "../assets/locations/silom.jpg";
import ratchada from "../assets/locations/ratchada.jpg";

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [fadeOutBottom, setFadeOutBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.5;
      const showPoint = window.innerHeight - 120;
      setFadeOutBottom(window.scrollY > triggerPoint);
      setShowFixedNavbar(window.scrollY > showPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/*  Navbar */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <Navbar />
      </motion.div>

      {/*  Navbar Bottom */}
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

      {/*  Hero Section */}
      <section className="relative w-full min-h-[80vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-black">
        <div className="absolute inset-0">
          {[img1, img2, img3, img4].map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`background-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                times: [0, 0.2, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0,
                delay: index * 5,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center flex-grow text-white px-6 md:px-24 pt-32 md:pt-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              รับซื้ออสังหาฯ ทันที <br className="hidden md:block" />
              ไม่ต้องประกาศขาย
            </h2>
            <p className="text-base md:text-lg mb-6 text-gray-200">
              แจ้งผลอนุมัติภายใน 14 วัน* ด้วยเทคโนโลยี{" "}
              <span className="font-semibold text-white">Homerun Ai</span> ที่ช่วยวิเคราะห์ราคาตลาด
            </p>
          </motion.div>
        </div>

        {/* Navbarbottom Floating */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{
            opacity: fadeOutBottom ? 0 : 1,
            y: fadeOutBottom ? 50 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full z-20"
        >
          <Navbarbottom />
        </motion.div>
      </section>

      {/*  Section ซื้อบ้านรีโนเวทใหม่กับ */}
      <section className="w-full bg-white py-16 md:py-24 px-4">
        <motion.h1
          className="text-center text-3xl md:text-5xl font-bold mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ซื้อบ้านรีโนเวทใหม่กับ
        </motion.h1>

       {/* Search Bar */}
        <motion.div
          className="flex justify-center mb-12 md:mb-16 relative z-[1] overflow-visible"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <div className="relative z-[1] bg-white shadow-xl rounded-3xl p-4 md:p-6 w-full max-w-[850px] backdrop-blur-md hover:shadow-2xl transition-all duration-500 overflow-visible">
            <SearchBar />
          </div>
        </motion.div>

        {/* Locations */}
        <div className="relative z-0 flex justify-center flex-wrap gap-4 md:gap-6 mb-12 md:mb-20 overflow-visible">
          {[
            { name: "อโศก-ทองหล่อ-สุขุมวิท", img: sukhumvit },
            { name: "สีลม-สาทร-เจริญกรุง-พระราม3", img: silom },
            { name: "รัชดา-ห้วยขวาง-ลาดพร้าว-พระราม9", img: ratchada },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="relative w-[90%] sm:w-[280px] h-[160px] rounded-xl overflow-hidden cursor-pointer group shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"></div>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-semibold text-center text-sm md:text-base">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>


        {/*  Property Collection */}
        <div className="w-full flex flex-col items-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Collection
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10 px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/*  ตัวการ์ด */}
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            <PropertyCard
              image="https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg"
              title="The Amber at Chatuchak"
              location="Chatuchak"
              price="฿26,900,000"
              oldPrice="฿29,900,000"
              discount="10"
              tag="Renovated"
            />
            
          </motion.div>

          <div className="flex justify-center mt-10">
            <Link
              to="/collection"
              className="border border-[#bfa074] text-[#bfa074] rounded-full px-10 py-2 text-sm md:text-base font-medium hover:bg-[#bfa074] hover:text-white transition"
            >
              ดูรายการทั้งหมด
            </Link>
          </div>
        </div>
      </section>
    
          <section className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              
              {/*  Left Image */}
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden md:order-none order-2">
                <img
                  src="https://img.homerunproptech.com/seller/dropform/seller_dropform_img_0_08_Dec_2022_1670470720630.jpg"
                  alt="Modern House"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 w-[30%] h-[150px] bg-white rounded-tr-[80px]" />
              </div>

              {/*  Right Text */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 md:order-none order-1"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  รู้จักกับ <span className="text-[#1a1a1a]">HOMERUN</span>
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  “HOMERUN” คือบริษัทสตาร์ทอัพในเครือฯ เอพี (ไทยแลนด์) จำกัด มหาชน 
                  ที่เข้ามาบุกตลาดอสังหาริมทรัพย์มือสอง เพื่อเพิ่มสภาพคล่อง 
                  และปลุกตลาดที่อยู่อาศัย
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  เราเล็งเห็นโอกาสทั้งในมุมของเจ้าของบ้านมือสองที่ไม่รู้ว่าบ้านเก่ามีมูลค่าอย่างไร 
                  และในมุมของผู้ซื้อที่กำลังหาบ้านในกรุงเทพฯ ด้วยงบประมาณจำกัด 
                  เมื่อเปรียบเทียบกับการซื้อบ้านมือหนึ่งแล้ว 
                  ได้มากกว่าในเรื่องของทำเลและพื้นที่ใช้สอย
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  HOMERUN จึงเกิดขึ้นมาเพื่อช่วยแก้ปัญหาให้กับผู้ขายและผู้ซื้อบ้านมือสองในเมือง 
                  โดยมีการใช้เทคโนโลยีใหม่อย่าง AI เข้ามาช่วยบริหารจัดการ 
                  และวิเคราะห์ข้อมูลเพื่อเสนอราคาที่ตรงใจได้รวดเร็วยิ่งขึ้น
                </p>

                <a
                  href="/about"
                  className="inline-block border border-[#bfa074] text-[#bfa074] px-6 py-2 rounded-full text-sm font-medium hover:bg-[#bfa074] hover:text-white transition-all duration-300"
                >
                  รู้จักเราให้มากขึ้น
                </a>

                {/* โลโก้ AP */}
                <div className="absolute top-0 right-0 hidden md:block">
                  <img
                    src="https://www.homerunproptech.com/assets/images/ap_logo.png"
                    alt="AP Logo"
                    className="w-16 h-auto opacity-90"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
      </section>



      {/*  Review Section */}
      <section className="bg-[#f9f7f4] py-20">
        <ReviewCarousel />
      </section>

      {/*  Alert Section */}
      <section className="relative flex flex-col md:flex-row items-center w-full min-h-[400px] md:h-[450px] overflow-hidden z-10">

        <img
          src="https://www.homerunproptech.com/assets/images/agent-faq-2.webp"
          alt="register background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>

        <div className="relative z-10 w-full px-6 md:px-24 flex justify-center md:justify-end text-center md:text-right">
          <div className="max-w-lg text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-snug">
              ลงทะเบียน ให้เราช่วยหาบ้าน<br />
              ราคาต่ำกว่าตลาดให้คุณ ฟรี!
            </h2>
            <p className="text-gray-200 mb-6">
              ระบบแจ้งเตือนอัตโนมัติเมื่อมีบ้านราคาต่ำกว่าตลาด
            </p>
            <Link
              to="/alert"
              className="inline-block bg-[#4a90e2] hover:bg-[#357ab8] text-white font-medium px-6 py-2 rounded-full transition"
            >
              กดรับการแจ้งเตือน
            </Link>
          </div>
        </div>
      </section>
      <WhyHomerun />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Home;
