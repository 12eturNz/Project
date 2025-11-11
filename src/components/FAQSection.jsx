import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const categories = ["ทั่วไป", "ผู้ขาย", "ผู้ซื้อ", "เอเจนท์"];

const faqData = {
  ทั่วไป: [
    { q: "Premium เชี่ยวชาญทรัพย์เขตใดบ้าง ?", a: "โฮมรันมีบริการทั่วกรุงเทพฯ และปริมณฑล" },
    { q: "Premium เชี่ยวชาญทรัพย์ประเภทใดบ้าง ?", a: "เรามีบริการทั้งบ้าน คอนโด และทาวน์โฮม" },
    { q: "Premium ยื่นข้อเสนอแบบใดบ้าง ?", a: "ยื่นข้อเสนอผ่านระบบออนไลน์ หรือให้ทีมงานช่วยเสนอได้" },
    { q: "Premium ช่วยเพิ่มสภาพคล่องให้ตลาดอสังหาฯ อย่างไร?", a: "ด้วยการเชื่อมผู้ซื้อและผู้ขายโดยตรงผ่านระบบดิจิทัล" },
  ],
  ผู้ขาย: [
    { q: "Premium เชี่ยวชาญทรัพย์เขตใดบ้าง ?", a: "เรามีทีมขายดูแลทุกเขตในกรุงเทพฯ" },
    { q: "Premium เชี่ยวชาญทรัพย์ประเภทใดบ้าง ?", a: "รับขายทุกประเภท บ้าน คอนโด และทาวน์โฮม" },
    { q: "ข้อตกลงในการประเมินทรัพย์เบื้องต้น ?", a: "ไม่มีค่าใช้จ่ายในการประเมินทรัพย์เบื้องต้น" },
    { q: "Premium ยื่นข้อเสนอแบบใดบ้าง ?", a: "ผู้ขายสามารถกำหนดราคาที่ต้องการได้เอง" },
    { q: "เป็นเอเจนท์ขายบ้านกับ Homerun ได้หรือไม่?", a: "ได้ เพียงสมัครผ่านเว็บไซต์ของเรา" },
  ],
  ผู้ซื้อ: [
    { q: "โฮมรัน ขายบ้าน ประเภท ไหนบ้าง?", a: "ขายบ้านพร้อมอยู่และบ้านรีโนเวท" },
    { q: "สามารถเข้าไปดูบ้านก่อนซื้อได้หรือไม่?", a: "สามารถนัดชมบ้านได้ล่วงหน้า" },
    { q: "การจ่ายเงินทำอย่างไร? ผ่อนจ่ายได้หรือไม่?", a: "รองรับทั้งการโอนและสินเชื่อธนาคาร" },
    { q: "บ้านมีการรับประกัน หมายถึงอะไร?", a: "บ้านที่ได้รับการรีโนเวทมีประกันโครงสร้าง" },
    { q: "ถ้าต้องการซื้อเพื่อการลงทุน homerun ช่วยหาผู้เช่าให้ได้หรือไม่?", a: "เรามีบริการจัดหาผู้เช่าครบวงจร" },
  ],
  เอเจนท์: [
    { q: "Premium เชี่ยวชาญทรัพย์เขตใดบ้าง ?", a: "เรามีทรัพย์ในทุกโซนของกรุงเทพฯ" },
    {
      q: "การสมัครเป็นตัวแทนเอเจนท์ และนำทรัพย์มาเสนอขายกับโฮมรัน มีข้อดีอย่างไร?",
      a: "โฮมรันช่วยให้การขายเร็วขึ้น เข้าถึงฐานลูกค้าโดยตรง และมีคอมมิชชั่นพิเศษ",
    },
    { q: "สมัครเป็นตัวแทนเอเจนท์กับโฮมรัน มีข้อจำกัดอะไรไหม?", a: "ไม่มีข้อจำกัด สมัครได้ฟรี" },
    { q: "หากช่วยขายบ้านตกแต่งใหม่จากโฮมรัน จะได้ค่าคอมมิชชั่นเท่าไหร่?", a: "รับสูงสุดถึง 3% ต่อการขายหนึ่งครั้ง" },
  ],
};

export default function FAQSection() {
  const [activeTab, setActiveTab] = useState("ทั่วไป");
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-white flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">คำถามที่พบบ่อย</h2>

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
        {faqData[activeTab].map((item, index) => (
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
      </div>
    </section>
  );
}
