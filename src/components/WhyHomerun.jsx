import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import bgImage from "../assets/La.jpg";
import { useTranslation } from "react-i18next";

const WhyHomerun = ({ onSellClick }) => {
  const [tab, setTab] = useState("seller");
  const navigate = useNavigate();
  const location = useLocation(); //  ตรวจหน้าปัจจุบัน
  const { t } = useTranslation();

  const icons = {
    check: "✔️",
    cross: "❌",
    question: "❓",
    dash: "➖",
  };

  const rows = {
    seller: [
      { title:  t("WhyHomerun.title1"), desc: t("WhyHomerun.title6"), col1: "question", col2: "question" },
      { title: t("WhyHomerun.title2"), desc: t("WhyHomerun.title7"), col1: "cross", col2: "cross" },
      { title: t("WhyHomerun.title3"), desc:t("WhyHomerun.title8"), col1: "cross", col2: "question" },
      { title: t("WhyHomerun.title4"), desc: t("WhyHomerun.title9"), col1: "question", col2: "question" },
      { title: t("WhyHomerun.title5"), desc: t("WhyHomerun.title10"), col1: "cross", col2: "cross" },
    ],
    buyer: [
      { title: t("WhyHomerun.titleb1"), desc:t("WhyHomerun.titleb7"), col1: "check", col2: "question" },
      { title: t("WhyHomerun.titleb2"), desc:t("WhyHomerun.titleb8"), col1: "cross", col2: "dash" },
      { title: t("WhyHomerun.titleb3"), desc: t("WhyHomerun.titleb9"), col1: "cross", col2: "question" },
      { title: t("WhyHomerun.titleb4"), desc: t("WhyHomerun.titleb10"), col1: "question", col2: "check" },
      { title:t("WhyHomerun.titleb5"), desc: t("WhyHomerun.titleb11"), col1: "cross", col2: "dash" },
      { title: t("WhyHomerun.titleb6"), desc: t("WhyHomerun.titleb12"), col1: "question", col2: "question" },
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
         {t("WhyHomerun.Header")}
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
                  {key === "seller"
                    ? t("WhyHomerun.Header1")
                    : t("WhyHomerun.Header2")}
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
                  <div> {t("WhyHomerun.Header3")}</div>
                  <div> {t("WhyHomerun.Header4")}</div>
                </>
              ) : (
                <>
                  <div> {t("WhyHomerun.Header5")}</div>
                  <div> {t("WhyHomerun.Header6")}</div>
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
            {tab === "seller" ? t("WhyHomerun.Search"): t("WhyHomerun.Search1")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyHomerun;
