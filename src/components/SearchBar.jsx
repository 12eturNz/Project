import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info } from "lucide-react";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const SearchBar = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [filters, setFilters] = useState({
    price: { min: "", max: "" },
    bedroom: "",
    bathroom: "",
    type: [],
    area: {},
    series: [],
  });

  const toggleDropdown = (id) => {
    setActiveFilter(activeFilter === id ? null : id);
  };

  const handleClearAll = () => {
    setFilters({
      price: { min: "", max: "" },
      bedroom: "",
      bathroom: "",
      type: [],
      area: {},
      series: [],
    });
    setActiveFilter(null);
  };

  return (
    
    <div className="w-full max-w-5xl mx-auto mt-10 relative overflow-visible z-0">
      {/* 🔍 Search bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="ค้นหา ชื่อ / ที่ตั้ง / ทำเล / โครงการ"
          className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button className="bg-amber-950 hover:bg-[#b18d5c] text-white flex items-center justify-center gap-2 px-6 py-3 font-medium cursor-pointer transition-all duration-200">
          <Search size={18} />
          ค้นหา
        </button>
      </div>

      {/* เส้นทอง */}
      <div className="h-[2px] bg-[#c6a16b] w-full mt-[-1px]" />

      {/*  Filter buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm relative overflow-visible">
        {/*  ราคา */}
        <DropdownButton
          label="ราคา"
          active={activeFilter === "price"}
          onClick={() => toggleDropdown("price")}
        >
          <p className="font-semibold text-gray-800 mb-3">ช่วงราคา</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="text"
              placeholder="เริ่มต้น"
              className="w-[40%] border-b border-[#c6a16b] outline-none text-gray-700 pb-1 text-center"
            />
            <span className="text-gray-600">ถึง</span>
            <input
              type="text"
              placeholder="สูงสุด"
              className="w-[40%] border-b border-[#c6a16b] outline-none text-gray-700 pb-1 text-center"
            />
          </div>
          <FooterButtons handleClearAll={handleClearAll} />
        </DropdownButton>

        {/*  ห้องนอน ห้องน้ำ */}
        <DropdownButton
          label="ห้องนอน&ห้องน้ำ"
          active={activeFilter === "bedroom"}
          onClick={() => toggleDropdown("bedroom")}
        >
          <p className="font-semibold mb-2 text-gray-800">ห้องนอน</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {["ไม่ระบุ", 1, 2, 3, 4, "5+"].map((n) => (
              <button
                key={n}
                className="px-3 py-1 border rounded-full hover:bg-[#c6a16b] hover:text-white cursor-pointer transition-all"
              >
                {n}
              </button>
            ))}
          </div>
          <p className="font-semibold mb-2 text-gray-800">ห้องน้ำ</p>
          <div className="flex gap-2 flex-wrap">
            {["ไม่ระบุ", 1, 2, 3, 4, "5+"].map((n) => (
              <button
                key={n}
                className="px-3 py-1 border rounded-full hover:bg-[#c6a16b] hover:text-white cursor-pointer transition-all"
              >
                {n}
              </button>
            ))}
          </div>
          <FooterButtons handleClearAll={handleClearAll} />
        </DropdownButton>

        {/*  ประเภทบ้าน */}
        <DropdownButton
          label="ประเภทบ้าน"
          active={activeFilter === "type"}
          onClick={() => toggleDropdown("type")}
        >
          <p className="font-semibold text-gray-800 mb-2">ประเภทบ้าน</p>
          {["บ้านเดี่ยว", "ทาวน์เฮาส์", "บ้านแฝด", "คอนโด", "ห้องแถว"].map(
            (option, i) => (
              <label key={i} className="flex items-center gap-2 mb-1">
                <input type="checkbox" className="accent-[#c6a16b]" />
                <span>{option}</span>
              </label>
            )
          )}
          <FooterButtons handleClearAll={handleClearAll} />
        </DropdownButton>

        {/*  พื้นที่ */}
        <DropdownButton
          label="พื้นที่"
          active={activeFilter === "area"}
          onClick={() => toggleDropdown("area")}
        >
          <p className="font-semibold text-gray-800 mb-2">รายละเอียดทรัพย์</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label>พื้นที่ดิน (ตร.วา)</label>
              <input className="w-full border-b border-[#c6a16b] outline-none" />
            </div>
            <div>
              <label>ถึง</label>
              <input className="w-full border-b border-[#c6a16b] outline-none" />
            </div>
            <div>
              <label>พื้นที่ใช้สอย (ตร.เมตร)</label>
              <input className="w-full border-b border-[#c6a16b] outline-none" />
            </div>
            <div>
              <label>ถึง</label>
              <input className="w-full border-b border-[#c6a16b] outline-none" />
            </div>
          </div>
          <FooterButtons handleClearAll={handleClearAll} />
        </DropdownButton>

        {/*  ซีรี่ส์โฮมรัน + ปุ่มล้างค่า */}
        <div className="flex items-center gap-3">
          <DropdownButton
            label="ซีรี่ส์โฮมรัน"
            active={activeFilter === "series"}
            onClick={() => toggleDropdown("series")}
          >
            <p className="font-semibold text-gray-800 mb-2">Homerun Series</p>
            {["Renovated", "Select"].map((option, i) => (
              <label key={i} className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="accent-[#c6a16b]" />
                <span>{option}</span>
                <Info size={14} className="text-gray-400" />
              </label>
            ))}
            <FooterButtons handleClearAll={handleClearAll} />
          </DropdownButton>

          {/*  ปุ่มล้างค่า */}
          <button
            onClick={handleClearAll}
            className="px-5 py-2 border border-gray-300 text-gray-400 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200"
          >
            ล้างค่า
          </button>
        </div>
      </div>
    </div>
  );
};

/* ส่วนประกอบเสริม */
const DropdownButton = ({ label, active, onClick, children }) => (
  
  <div className="relative overflow-visible">
    <button
      onClick={onClick}
      className={`px-5 py-2 border border-gray-300 rounded-full cursor-pointer transition-all duration-200 ${
        active ? "bg-[#c6a16b] text-white" : "hover:bg-[#f8f5f0]"
      }`}
    >
      {label}
    </button>

    <AnimatePresence>
      {active && (
        <motion.div
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.25 }}
          className="absolute top-[60px] left-0 bg-white shadow-xl rounded-2xl w-96 p-5 border border-gray-200 z-20"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FooterButtons = ({ handleClearAll }) => (
  <div className="flex justify-between items-center border-t mt-5 pt-3">
    <button
      onClick={handleClearAll}
      className="text-gray-400 hover:text-gray-500 text-sm cursor-pointer"
    >
      ล้างค่า
    </button>
    <button className="bg-[#7b6650] hover:bg-[#5f4e3e] text-white px-5 py-1 rounded-lg cursor-pointer transition-all">
      ค้นหา
    </button>
  </div>
);

export default SearchBar;
