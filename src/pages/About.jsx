import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import Asset from "../assets/Asset.png"; 

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const About = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <Navbar />
      </motion.div>

      <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="https://img.homerunproptech.com/seller/dropform/seller_dropform_img_0_08_Dec_2022_1670470720630.jpg" //
          alt="เกี่ยวกับเรา"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-white text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4 leading-tight"
        >
          เกี่ยวกับ <span className="text-[#bfa074]">Premium Asset</span>
        </motion.h1>
      </section>

      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
            <img
              src="https://img.homerunproptech.com/seller/dropform/seller_dropform_img_0_08_Dec_2022_1670470720630.jpg" //
              alt="Modern House"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              รู้จักกับ <span className="text-[#1a1a1a]">Premium Asset</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              “Premium Asset” คือบริษัทสตาร์ทอัพในเครือฯ เอพี (ไทยแลนด์) 
              ที่เข้ามาบุกตลาดอสังหาริมทรัพย์มือสอง เพื่อเพิ่มสภาพคล่อง 
              และปลุกตลาดที่อยู่อาศัย
            </p>
            <img
              src={Asset}
              alt="Logo"
              className="w-28 h-auto opacity-90 my-4"
            />
            <p className="text-gray-700 leading-relaxed mb-6">
              เราเล็งเห็นโอกาสทั้งในมุมของเจ้าของบ้านมือสองที่ไม่รู้ว่าบ้านเก่ามีมูลค่าอย่างไร 
              และในมุมของผู้ซื้อที่กำลังหาบ้านในกรุงเทพฯ ด้วยงบประมาณจำกัด 
              เมื่อเปรียบเทียบกับการซื้อบ้านมือหนึ่งแล้ว 
              ได้มากกว่าในเรื่องของทำเลและพื้นที่ใช้สอย
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Premium Asset จึงเกิดขึ้นมาเพื่อช่วยแก้ปัญหาให้กับผู้ขายและผู้ซื้อบ้านมือสองในเมือง 
              โดยมีการใช้เทคโนโลยีใหม่อย่าง AI เข้ามาช่วยบริหารจัดการ 
              และวิเคราะห์ข้อมูลเพื่อเสนอราคาที่ตรงใจได้รวดเร็วขึ้น
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">ข้อมูลบริษัท</h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <p className="text-lg font-semibold text-gray-800 mb-4">
              บริษัท โฮมรัน พร็อพเทค จำกัด
            </p>
            <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              <span className="font-semibold">ที่อยู่:</span> 170/57 อาคารไอเชียนทาวเวอร์ 1 ชั้น 7 
              ซ.สุขุมวิท 16 (สามมิตร) ถ.รัชดาภิเษกตัดใหม่ แขวงคลองเตย 
              เขตคลองเตย กรุงเทพมหานคร 10110
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span>02-2612518 ต่อ 789</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Sales:</span>
                  <span>065-1196746</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">อีเมล:</span>
                  <span>help@homerunproptech.com</span>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

export default About;