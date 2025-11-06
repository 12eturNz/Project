import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../assets/La.jpg";

const WhyHomerun = ({ onSellClick }) => {
  const [tab, setTab] = useState("seller");
  const navigate = useNavigate();
  const location = useLocation(); // ✅ ตรวจหน้าปัจจุบัน

  const icons = {
    check: "✔️",
    cross: "❌",
    question: "❓",
    dash: "➖",
  };

  const rows = {
    seller: [
      { title: "ขายตามสภาพ", desc: "ไม่ต้องเสียเงินเสียเวลา ปรับปรุงบ้านเพื่อให้ขายได้", col1: "question", col2: "question" },
      { title: "มีข้อเสนอหลายรูปแบบ", desc: "ยืดหยุ่นตามความต้องการของผู้ขาย", col1: "cross", col2: "cross" },
      { title: "ประหยัดเวลา", desc: "ไม่ต้องติดประกาศขาย หรือคอยอัปเดตโพสต์ขายเองบนเว็บไซต์", col1: "cross", col2: "question" },
      { title: "ปลอดภัย ไม่ทิ้งงาน", desc: "รับรองโดยบริษัทแม่ที่มั่นคง (บริษัท เอพี ไทยแลนด์ จำกัด มหาชน)", col1: "question", col2: "question" },
      { title: "แจ้งผล และเสนอราคาเร็ว", desc: "ดำเนินการฉับไว", col1: "cross", col2: "cross" },
    ],
    buyer: [
      { title: "ได้บ้านทำเลดี", desc: "พื้นที่ใช้สอยเยอะ ในงบประมาณที่คุ้มค่า", col1: "check", col2: "question" },
      { title: "ตรวจเช็คสภาพและประวัติบ้านทุกหลัง", desc: "พร้อมต่อเติมซ่อมแซมให้เรียบร้อยแล้ว", col1: "cross", col2: "dash" },
      { title: "มีการรับประกันหลังการขาย*", desc: "บ้านและคอนโดในโครงการ Homerun Collection รับประกันทุกหลัง", col1: "cross", col2: "question" },
      { title: "พร้อมเข้าอยู่", desc: "ไม่ต้องคุมผู้รับเหมาหรือเสี่ยงงบเกินงบ", col1: "question", col2: "check" },
      { title: "ช่วยลูกค้าเรื่องวงเงินกู้", desc: "และดอกเบี้ยอัตราพิเศษสำหรับบ้านมือสองตกแต่งใหม่", col1: "cross", col2: "dash" },
      { title: "หากต้องการซื้อเพื่อการลงทุน", desc: "เรามีเอเจนท์ในเครือช่วยนำไปปล่อยเช่าให้ได้", col1: "question", col2: "question" },
    ],
  };

  const handleSellClick = () => {
    if (location.pathname === "/Project/Sell") {
      // อยู่หน้า Sell ให้เลื่อนลง
      onSellClick?.();
    } else {
      //  อยู่หน้าอื่นไปหน้า /sell
      navigate("/Project/Sell");
    }
  };

  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "50vh",
      }}
    >
      <div className="absolute inset-0 bg-white/85"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          ทำไมต้อง HOMERUN
        </h2>

        {/*  ปุ่มแท็บ */}
        <div className="flex justify-center gap-8 mb-10">
          {["seller", "buyer"].map((key) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`text-lg font-semibold pb-2 border-b-2 transition cursor-pointer ${
                tab === key
                  ? "text-[#bfa074] border-[#bfa074]"
                  : "text-gray-400 border-transparent hover:text-[#bfa074]"
              }`}
            >
              {key === "seller" ? "ผู้ขาย" : "ผู้ซื้อ"}
            </button>
          ))}
        </div>

        {/*  ตาราง */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-3 text-center bg-[#f6ede3] font-semibold text-[#6b5b57] py-3">
              <div>vs</div>
              {tab === "seller" ? (
                <>
                  <div>ขายเอง</div>
                  <div>ผ่านนายหน้า</div>
                </>
              ) : (
                <>
                  <div>บ้านมือสองทั่วไป</div>
                  <div>บ้านมือหนึ่ง</div>
                </>
              )}
            </div>

            <div className="divide-y divide-gray-200">
              {rows[tab].map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 text-center py-6 px-4 bg-[#fffdfb] hover:bg-[#faf5f0] transition"
                >
                  <div className="text-gray-800 font-medium">
                    {item.title}
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <div className="text-2xl">{icons[item.col1]}</div>
                  <div className="text-2xl">{icons[item.col2]}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/*  ปุ่มล่าง */}
        <div className="text-center mt-10">
          <button
            onClick={handleSellClick}
            className="inline-block bg-[#bfa074] text-white px-8 py-3 rounded-full font-medium hover:bg-[#a38a5c] cursor-pointer transition"
          >
            {tab === "seller" ? "ขายกับ HOMERUN" : "ค้นหาบ้านจาก HOMERUN"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyHomerun;
