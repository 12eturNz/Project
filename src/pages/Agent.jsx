import React, { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import RegisterFormAgent from "../components/RegisterFormAgent";
import ReviewCarousel from "../components/ReviewCarousel"; 
import img1 from "../assets/house1.jpg";
import {
  UserPlus,
  ClipboardCheck,
  Home,
  CheckCircle,
  BarChart2,
  Package,
  Users,
  BadgePercent,
  Sparkles,
  Zap,
  ChevronDown,
} from "lucide-react";

const agentSteps = [
  { icon: UserPlus, title: "1. สมัครเป็นเอเจนท์", desc: "กรอกข้อมูลในฟอร์มด้านล่าง และรอการติดต่อกลับ", color: "bg-blue-100 text-blue-600" },
  { icon: ClipboardCheck, title: "2. รับสิทธิ์เข้าถึง", desc: "รับสิทธิ์ในการเข้าถึงทรัพย์คุณภาพพร้อมขาย", color: "bg-blue-100 text-blue-600" },
  { icon: Home, title: "3. พาลูกค้าเข้าชม", desc: "นำเสนอและพาลูกค้าชมทรัพย์ (Co-Broke)", color: "bg-blue-100 text-blue-600" },
  { icon: CheckCircle, title: "4. ปิดการขาย", desc: "รับค่าคอมมิชชั่นตามเงื่อนไขทันที", color: "bg-blue-100 text-blue-600" },
];

const agentSupport = [
  { icon: Sparkles, title: "ทรัพย์รีโนเวทพร้อมขาย", desc: "ทรัพย์ของเราผ่านการรีโนเวท สวยงาม พร้อมปิดการขายได้ง่าย", color: "bg-green-100 text-green-600" },
  { icon: Package, title: "สื่อการตลาดพร้อมใช้", desc: "มีรูปถ่าย วิดีโอ และข้อมูลทรัพย์ครบถ้วน พร้อมให้คุณโปรโมต", color: "bg-green-100 text-green-600" },
  { icon: Zap, title: "ระบบ Co-Broke ที่รวดเร็ว", desc: "ขั้นตอนการทำงานชัดเจน แบ่งผลประโยชน์อย่างยุติธรรม", color: "bg-green-100 text-green-600" },
  { icon: Users, title: "ทีมงานคอยสนับสนุน", desc: "มีทีม Admin และ Support คอยช่วยเหลือเรื่องเอกสารและนัดหมาย", color: "bg-green-100 text-green-600" },
];

const agentFAQ = [
  { q: "Premium เชี่ยวชาญทรัพย์เขตใดบ้าง ?", a: "เรามีทรัพย์ในทุกโซนของกรุงเทพฯ" },
  { q: "การสมัครเป็นตัวแทนเอเจนท์ และนำทรัพย์มาเสนอขายกับโฮมรัน มีข้อดีอย่างไร?", a: "โฮมรันช่วยให้การขายเร็วขึ้น เข้าถึงฐานลูกค้าโดยตรง และมีคอมมิชชั่นพิเศษ" },
  { q: "สมัครเป็นตัวแทนเอเจนท์กับโฮมรัน มีข้อจำกัดอะไรไหม?", a: "ไม่มีข้อจำกัด สมัครได้ฟรี" },
  { q: "หากช่วยขายบ้านตกแต่งใหม่จากโฮมรัน จะได้ค่าคอมมิชชั่นเท่าไหร่?", a: "รับสูงสุดถึง 3% ต่อการขายหนึ่งครั้ง" },
];

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const BenefitCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 
                  transform hover:scale-105 transition-transform duration-300">
    <Icon
      className="text-[#bfa074] mb-3"
      size={40}
      strokeWidth={1.5}
    />
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      {title}
    </h3>
    <p className="text-gray-700">
      {desc}
    </p>
  </div>
);


const Agent = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const formRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);

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
          src={img1}
          alt="ร่วมงานกับเรา (เอเจนท์)"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight"
        >
          ร่วมงานกับเรา (เอเจนท์)
        </motion.h1>
      </section>

      {/* Content Section */}
      <section className="w-full py-20 md:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ทำไมต้องร่วมงานกับ Premium Asset
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
              เราเปิดรับเอเจนท์อสังหาฯ ที่มีความมุ่งมั่น
              เพื่อร่วมเป็นส่วนหนึ่งในการเปลี่ยนแปลงตลาดบ้านมือสอง
              ด้วยระบบการทำงานที่รวดเร็วและฐานลูกค้าที่แข็งแกร่ง
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
          >
             <BenefitCard icon={BadgePercent} title="ค่าคอมมิชชั่นสูง" desc="รับค่าคอมมิชชั่นสูงสุดถึง 3% เมื่อช่วยขายบ้านตกแต่งใหม่จากโฮมรัน" />
             <BenefitCard icon={Zap} title="ปิดการขายได้เร็ว" desc="เข้าถึงฐานลูกค้าโดยตรง พร้อมทรัพย์คุณภาพที่รีโนเวทแล้ว ทำให้การขายเร็วขึ้น" />
             <BenefitCard icon={CheckCircle} title="สมัครฟรี ไม่มีข้อจำกัด" desc="ไม่มีค่าใช้จ่ายในการสมัคร และไม่มีข้อจำกัดในการเป็นตัวแทนเอเจนท์" />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16"
          >
            4 ขั้นตอนง่ายๆ ในการร่วมงาน
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {agentSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${step.color} shadow-md`}>
                  <step.icon size={32} strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section เครื่องมือและการสนับสนุน  */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center"
          >
            เครื่องมือและการสนับสนุน
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agentSupport.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start p-6 bg-white rounded-lg shadow-lg"
              >
                <div className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full mr-5 ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section รีวิว --- */}
      <section className="w-full py-20 bg-white">
        <ReviewCarousel />
      </section>

      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center"
          >
            คำถามที่พบบ่อย
          </motion.h2>
          <div className="space-y-4">
            {agentFAQ.map((item, index) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden bg-white shadow-sm" // (แก้)
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex justify-between items-center p-5 hover:bg-gray-50 text-left"
                >
                  <span className="font-medium text-gray-800">{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-gray-500" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="p-5 pt-0 text-gray-700 bg-white">{item.a}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ปุ่ม Scroll ไปที่ฟอร์ม */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center py-20 bg-white"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          สนใจร่วมงานกับเรา?
        </h3>
        <p className="text-lg text-gray-700 mb-8">
          กรอกข้อมูลด้านล่างเพื่อสมัครเป็นตัวแทนเอเจนท์กับเราได้ทันที
        </p>
        <button
          onClick={scrollToForm}
          className="inline-block bg-[#bfa074] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a38a5c] cursor-pointer transition text-lg shadow-lg hover:shadow-xl"
        >
          สมัครเป็นเอเจนท์
        </button>
      </motion.div>

      {/* ส่วนฟอร์มรับสมัคร */}
      <section ref={formRef} className="py-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <RegisterFormAgent />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
});

export default Agent;