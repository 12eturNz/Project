import React, { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import RegisterFormPartner from "../components/RegisterFormPartner";
import ReviewCarousel from "../components/ReviewCarousel";
import img2 from "../assets/house2.jpg";
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

const partnerValue = [
  { icon: DollarSign, type: "นักลงทุน (Investors)", value: "เข้าถึงดีลอสังหาฯ ที่ผ่านการคัดเลือก (Off-Market Deals) พร้อมทีมงานรีโนเวทและขายออกครบวงจร", color: "text-[#bfa074]" },
  { icon: HardHat, type: "ผู้รับเหมา / บริษัทก่อสร้าง", value: "รับงานรีโนเวทอย่างต่อเนื่อง (Consistent Project Pipeline) จากเรา ลดภาระการหางานเอง", color: "text-[#bfa074]" },
  { icon: Paintbrush, type: "บริษัทออกแบบ / ตกแต่งภายใน", value: "ร่วมสร้างสรรค์ผลงาน (Showcase) กับโครงการของเรา ได้โปรโมตผลงานผ่านช่องทางการขาย", color: "text-[#bfa074]" },
  { icon: Package, type: "ซัพพลายเออร์วัสดุก่อสร้าง", value: "เป็น Preferred Supplier ให้กับโครงการรีโนเวททั้งหมดของเรา สร้างยอดขายที่มั่นคง", color: "text-[#bfa074]" },
  { icon: Banknote, type: "สถาบันการเงิน", value: "ร่วมมือปล่อยสินเชื่อให้ลูกค้าของเรา (Qualified Leads) ที่ผ่านการตรวจสอบเบื้องต้นแล้ว", color: "text-[#bfa074]" },
  { icon: Coffee, type: "พันธมิตรอื่นๆ", value: "เรามองหาพันธมิตรที่มีวิสัยทัศน์เดียวกัน เพื่อสร้างนวัตกรรมและยกระดับตลาด", color: "text-[#bfa074]" },
];

const partnershipModels = [
  { icon: Award, title: "คู่ค้า (Vendor List)", desc: "สำหรับผู้รับเหมา, ดีไซเนอร์, ซัพพลายเออร์ ที่ผ่านการคัดเลือก เพื่อรับงานในโปรเจกต์ของเรา", color: "bg-gray-100 text-[#bfa074]" },
  { icon: TrendingUp, title: "ร่วมทุน (Joint Venture)", desc: "สำหรับนักลงทุนที่สนใจร่วมลงทุนในโปรเจกต์รีโนเวทอสังหาฯ เพื่อสร้างผลตอบแทน", color: "bg-gray-100 text-[#bfa074]" },
  { icon: Check, title: "พันธมิตร (Strategic Alliance)", desc: "ความร่วมมือเชิงกลยุทธ์กับสถาบันการเงิน หรือบริษัทเทคโนโลยี เพื่อสร้าง Ecosystem", color: "bg-gray-100 text-[#bfa074]" },
];


const Partner = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const formRef = useRef(null);

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
        <img
          src={img2}
          alt="พาร์ทเนอร์ทางธุรกิจ"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight"
        >
          พาร์ทเนอร์ทางธุรกิจ
        </motion.h1>
      </section>

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
              สร้างโอกาสเติบโตไปด้วยกัน (Win-Win Partnership)
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Premium Asset ไม่ได้เป็นเพียงบริษัทอสังหาฯ
              แต่เรากำลังสร้าง Ecosystem
              ที่แข็งแกร่งเพื่อยกระดับตลาดอสังหาฯ มือสอง
              เราเชื่อมั่นในการเติบโตไปพร้อมกับพาร์ทเนอร์ของเรา
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
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 
                           transform hover:scale-105 transition-transform duration-300" // (แก้)
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <item.icon
                    className={item.color}
                    size={32}
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.type}
                </h3>
                <p className="text-gray-700">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            รูปแบบการร่วมมือ
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {partnershipModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg 
                           transform hover:scale-105 transition-transform duration-300" // (แก้)
              >
                <div className={`flex items-center justify-center p-4 rounded-full ${model.color} mb-4`}>
                  <model.icon size={32} />
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">
                  {model.title}
                </h3>
                <p className="text-gray-600">{model.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section รีวิว --- */}
      <section className="w-full py-20 bg-white">
        <ReviewCarousel />
      </section>

      {/* Content Section */}
      <section className="w-full py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-xl border border-gray-100"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              เรากำลังมองหา
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                นักลงทุน
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                ผู้รับเหมาและบริษัทก่อสร้าง
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                บริษัทออกแบบและตกแต่งภายใน
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                ซัพพลายเออร์วัสดุก่อสร้าง
              </span>
              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">
                สถาบันการเงิน
              </span>
            </div>

            <p className="text-gray-700 mt-8 mb-8 max-w-xl mx-auto">
              หากคุณคือหนึ่งในธุรกิจเหล่านี้
              และมองเห็นโอกาสในการเติบโตร่วมกัน
              เรายินดีพูดคุยและหาแนวทางความร่วมมือ
            </p>

            <button
              onClick={scrollToForm}
              className="inline-block bg-[#bfa074] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a38a5c] cursor-pointer transition text-lg shadow-lg hover:shadow-xl"
            >
              ร่วมเป็นพาร์ทเนอร์
            </button>
          </motion.div>
        </div>
      </section>

      {/* ฟอร์มรับสมัคร Partner */}
      <section ref={formRef} className="py-10 bg-white"> {/* (แก้) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <RegisterFormPartner />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
});

export default Partner;