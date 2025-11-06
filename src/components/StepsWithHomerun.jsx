import React from "react";
import { ClipboardList, Video, Handshake, Search, FileText } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: ClipboardList,
    title: "กรอกข้อมูลเบื้องต้น เกี่ยวกับทรัพย์ที่ต้องการขาย",
  },
  {
    id: "02",
    icon: Video,
    title: "นัดตรวจสภาพบ้านเบื้องต้น ผ่านวิดีโอคอล หรือ ตัวแทน*",
  },
  {
    id: "03",
    icon: Handshake,
    title: "รับข้อเสนอราคาเบื้องต้น",
  },
  {
    id: "04",
    icon: Search,
    title: "ทีมงานเข้าไปตรวจสอบสภาพจริง",
  },
  {
    id: "05",
    icon: FileText,
    title: "HOMERUN ยื่นข้อเสนอ และ ราคาสุดท้าย",
  },
];

const StepsWithHomerun = () => {
  return (
    <section className="bg-[#f4f4f4] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          5 ขั้นตอน{" "}
          <span className="text-[#bfa074] font-bold">เสนอทรัพย์</span>{" "}
          กับ HOMERUN
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-12 justify-items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex flex-col items-center mb-3">
                <p className="text-[#bfa074] text-sm font-bold mb-1">
                  {step.id}
                </p>
                <div className="bg-transparent text-[#6ba5c2]">
                  <step.icon size={44} strokeWidth={1.8} />
                </div>
              </div>
              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 max-w-[180px] leading-relaxed">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsWithHomerun;
