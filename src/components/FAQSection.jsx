import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function FAQSection() {
  const { t } = useTranslation();

 // useMemo เพื่อคำนวณ Categories  Re-render ที่ไม่จำเป็น
  const categories = useMemo(() => {
  
    const list = [
      t("FAQ.H"),
      t("FAQ.H1"),
      t("FAQ.H2"),
      t("FAQ.H3")
    ].filter(item => item && item.length > 0);
    return list;
  }, [t]); // คำนวณใหม่เฟังก์ชัน t เปลี่ยน 

  // FAQ Data
  const faqData = {
    [t("FAQ.H")]: [
      { q: t("FAQ.Q1"), a: t("FAQ.A1") },
      { q: t("FAQ.Q2"), a: t("FAQ.A2") },
      { q: t("FAQ.Q3"), a: t("FAQ.A3") },
      { q: t("FAQ.Q4"), a: t("FAQ.A4") },
    ],
    [t("FAQ.H1")]: [
      { q: t("FAQ.Q5"), a: t("FAQ.A5") },
      { q: t("FAQ.Q6"), a: t("FAQ.A6") },
      { q: t("FAQ.Q7"), a: t("FAQ.A7") },
      { q: t("FAQ.Q8"), a: t("FAQ.A8") },
      { q: t("FAQ.Q9"), a: t("FAQ.A9") },
    ],
    [t("FAQ.H2")]: [
      { q: t("FAQ.Q10"), a: t("FAQ.A10") },
      { q: t("FAQ.Q11"), a: t("FAQ.A11") },
      { q: t("FAQ.Q12"), a: t("FAQ.A12") },
      { q: t("FAQ.Q13"), a: t("FAQ.A13") },
      { q: t("FAQ.Q14"), a: t("FAQ.A14") },
    ],
    [t("FAQ.H3")]: [
      { q: t("FAQ.Q15"), a: t("FAQ.A15") },
      {
        q: t("FAQ.Q16"),
        a: t("FAQ.A16"),
      },
      { q: t("FAQ.Q17"), a: t("FAQ.A17") },
      { q: t("FAQ.Q18"), a: t("FAQ.A18") },
    ],
  };

 
  const initialActiveTab = categories.length > 0 ? categories[0] : "General"; 
  const [activeTab, setActiveTab] = useState(initialActiveTab);
  const [openIndex, setOpenIndex] = useState(null);

 // เตรียมข้อมูลรายการ FAQ ปัจจุบัน
  const currentFaqList = faqData[activeTab] || [];
  
  // ป้องกันการ Render ถ้าไม่มีหมวดหมู่
  if (categories.length === 0) {
    
      return <div>{t('FAQ.loading') || 'Loading FAQs...'}</div>; 
  }


  return (
    <section className="py-20 bg-white flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">{t("FAQ.H4")}</h2>

      {/* Tabs */}
      <div className="flex space-x-8 mb-10 text-gray-400 text-xl font-medium">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(null);
            }}
            className={`cursor-pointer transition-all duration-200 ${
              activeTab === tab
                ? "text-black font-semibold border-b-4 border-[#bfa074]"
                : "hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-3xl space-y-5">
       
        {currentFaqList.map((item, index) => ( 
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl px-6 py-5 border border-gray-100"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center text-left cursor-pointer"
            >
              <span className="text-gray-800 font-medium flex items-center">
                <span className="text-blue-500 mr-3">Q</span> {item.q}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ChevronDown className="text-gray-500" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {currentFaqList.length === 0 && (
            <p className="text-center text-gray-500">No FAQs found for this category.</p>
        )}
      </div>
    </section>
  );
}