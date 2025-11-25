import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info } from "lucide-react";

const fadeVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};


// รับ filters, setFilters, handleSearch, handleClearAll เป็น Props 

const SearchBar = ({ filters, setFilters, handleSearch, handleClearAll }) => {
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleDropdown = (id) => {
    setActiveFilter(activeFilter === id ? null : id);
  };

  const handleSelectButton = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (filterKey, inputKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: {
        ...prev[filterKey],
        [inputKey]: value,
      },
    }));
  };

  const handleCheckboxChange = (filterKey, option) => {
    setFilters((prev) => {
      const currentArray = prev[filterKey];
      const newArray = currentArray.includes(option)
        ? currentArray.filter((item) => item !== option)
        : [...currentArray, option];
      return {
        ...prev,
        [filterKey]: newArray,
      };
    });
  };

  const isFilterActive = (key) => {
    switch (key) {
      case "price":
        return filters.price.min || filters.price.max;
      case "bedroom":
        return !!filters.bedroom;
      case "bathroom":
        return !!filters.bathroom;
      case "type":
        return filters.type.length > 0;
      case "area":
        return (
          filters.area.minLand ||
          filters.area.maxLand ||
          filters.area.minArea ||
          filters.area.maxArea
        );
      case "series":
        return filters.series.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 relative overflow-visible z-10">
      {/* 🔍 Search bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="ค้นหา ชื่อ / ที่ตั้ง / ทำเล / โครงการ"
          value={filters.searchTerm}
          onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))}
          className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={() => {
            handleSearch();
            setActiveFilter(null); // ปิด dropdown
          }}
          className="bg-amber-950 hover:bg-[#b18d5c] text-white flex items-center justify-center gap-2 px-6 py-3 font-medium cursor-pointer transition-all duration-200"
        >
          <Search size={18} />
          ค้นหา
        </button>
      </div>

      {/* เส้นทอง */}
      <div className="h-[2px] bg-[#c6a16b] w-full mt-[-1px]" />

      {/* Filter buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4 text-sm relative overflow-visible">
        {/* ราคา */}
        <DropdownButton
          label="ราคา"
          active={activeFilter === "price"}
          hasValue={isFilterActive("price")}
          onClick={() => toggleDropdown("price")}
        >
          <p className="font-semibold text-gray-800 mb-3">ช่วงราคา</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="number"
              placeholder="เริ่มต้น"
              value={filters.price.min}
              onChange={(e) => handleInputChange("price", "min", e.target.value)}
              className="w-[40%] border-b border-[#c6a16b] outline-none text-gray-700 pb-1 text-center"
            />
            <span className="text-gray-600">ถึง</span>
            <input
              type="number"
              placeholder="สูงสุด"
              value={filters.price.max}
              onChange={(e) => handleInputChange("price", "max", e.target.value)}
              className="w-[40%] border-b border-[#c6a16b] outline-none text-gray-700 pb-1 text-center"
            />
          </div>
          <FooterButtons 
            handleClearAll={handleClearAll} 
            handleSearch={handleSearch} 
            closeDropdown={() => setActiveFilter(null)} 
          />
        </DropdownButton>

        {/* ห้องนอน ห้องน้ำ */}
        <DropdownButton
          label="ห้องนอน&ห้องน้ำ"
          active={activeFilter === "bedroom"}
          hasValue={isFilterActive("bedroom") || isFilterActive("bathroom")}
          onClick={() => toggleDropdown("bedroom")}
        >
          <p className="font-semibold mb-2 text-gray-800">ห้องนอน</p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {["ไม่ระบุ", 1, 2, 3, 4, "5+"].map((n) => (
              <button
                key={`bed-${n}`}
                onClick={() => handleSelectButton("bedroom", n === "ไม่ระบุ" ? "" : String(n))}
                className={`px-3 py-1 border rounded-full cursor-pointer transition-all ${
                  filters.bedroom === String(n) || (n === "ไม่ระบุ" && filters.bedroom === "")
                    ? "bg-[#c6a16b] text-white"
                    : "hover:bg-[#c6a16b] hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="font-semibold mb-2 text-gray-800">ห้องน้ำ</p>
          <div className="flex gap-2 flex-wrap">
            {["ไม่ระบุ", 1, 2, 3, 4, "5+"].map((n) => (
              <button
                key={`bath-${n}`}
                onClick={() => handleSelectButton("bathroom", n === "ไม่ระบุ" ? "" : String(n))}
                className={`px-3 py-1 border rounded-full cursor-pointer transition-all ${
                  filters.bathroom === String(n) || (n === "ไม่ระบุ" && filters.bathroom === "")
                    ? "bg-[#c6a16b] text-white"
                    : "hover:bg-[#c6a16b] hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <FooterButtons 
            handleClearAll={handleClearAll} 
            handleSearch={handleSearch} 
            closeDropdown={() => setActiveFilter(null)} 
          />
        </DropdownButton>

        {/* ประเภทบ้าน */}
        <DropdownButton
          label="ประเภทบ้าน"
          active={activeFilter === "type"}
          hasValue={isFilterActive("type")}
          onClick={() => toggleDropdown("type")}
        >
          <p className="font-semibold text-gray-800 mb-2">ประเภทบ้าน</p>
          {["Condo", "Townhouse","Single Detached House"].map((option, i) => (
            <label key={i} className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={filters.type.includes(option)}
                onChange={() => handleCheckboxChange("type", option)}
                className="accent-[#c6a16b]"
              />
              <span>{option}</span>
            </label>
          ))}
          <FooterButtons 
            handleClearAll={handleClearAll} 
            handleSearch={handleSearch} 
            closeDropdown={() => setActiveFilter(null)} 
          />
        </DropdownButton>

        {/* พื้นที่ */}
        <DropdownButton
          label="พื้นที่"
          active={activeFilter === "area"}
          hasValue={isFilterActive("area")}
          onClick={() => toggleDropdown("area")}
        >
          <p className="font-semibold text-gray-800 mb-2">รายละเอียดทรัพย์</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <label>พื้นที่ดิน (ตร.วา)</label>
              <input
                type="number"
                value={filters.area.minLand}
                onChange={(e) => handleInputChange("area", "minLand", e.target.value)}
                placeholder="เริ่มต้น"
                className="w-full border-b border-[#c6a16b] outline-none"
              />
            </div>
            <div>
              <label>ถึง</label>
              <input
                type="number"
                value={filters.area.maxLand}
                onChange={(e) => handleInputChange("area", "maxLand", e.target.value)}
                placeholder="สูงสุด"
                className="w-full border-b border-[#c6a16b] outline-none"
              />
            </div>
            <div>
              <label>พื้นที่ใช้สอย (ตร.เมตร)</label>
              <input
                type="number"
                value={filters.area.minArea}
                onChange={(e) => handleInputChange("area", "minArea", e.target.value)}
                placeholder="เริ่มต้น"
                className="w-full border-b border-[#c6a16b] outline-none"
              />
            </div>
            <div>
              <label>ถึง</label>
              <input
                type="number"
                value={filters.area.maxArea}
                onChange={(e) => handleInputChange("area", "maxArea", e.target.value)}
                placeholder="สูงสุด"
                className="w-full border-b border-[#c6a16b] outline-none"
              />
            </div>
          </div>
          <FooterButtons 
            handleClearAll={handleClearAll} 
            handleSearch={handleSearch} 
            closeDropdown={() => setActiveFilter(null)} 
          />
        </DropdownButton>

        {/* ซีรี่ส์ + ปุ่มล้างค่า */}
        <div className="flex items-center gap-3">
          <DropdownButton
            label="ซีรี่ส์Premium"
            active={activeFilter === "series"}
            hasValue={isFilterActive("series")}
            onClick={() => toggleDropdown("series")}
          >
            <p className="font-semibold text-gray-800 mb-2">Premium Series</p>
            {["Renovated", "Select"].map((option, i) => (
              <label key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={filters.series.includes(option)}
                  onChange={() => handleCheckboxChange("series", option)}
                  className="accent-[#c6a16b]"
                />
                <span>{option}</span>
                <Info size={14} className="text-gray-400" />
              </label>
            ))}
            <FooterButtons 
              handleClearAll={handleClearAll} 
              handleSearch={handleSearch} 
              closeDropdown={() => setActiveFilter(null)} 
            />
          </DropdownButton>

          {/* ปุ่มล้างค่าทั้งหมด */}
          <button
            onClick={() => handleClearAll()}
            className="px-5 py-2 border border-gray-300 text-gray-400 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200"
          >
            ล้างค่า
          </button>
        </div>
      </div>
    </div>
  );
};

/* ส่วนประกอบเสริม (Defined outside SearchBar) */

// Component: FooterButtons
const FooterButtons = ({ handleClearAll, handleSearch, closeDropdown }) => (
  <div className="flex justify-between items-center border-t mt-5 pt-3">
    <button
      onClick={() => {
        handleClearAll();
        if (closeDropdown) closeDropdown();
      }}
      className="text-gray-400 hover:text-gray-500 text-sm cursor-pointer"
    >
      ล้างค่า
    </button>
    <button
      onClick={() => {
        handleSearch();
        if (closeDropdown) closeDropdown();
      }}
      className="bg-[#7b6650] hover:bg-[#5f4e3e] text-white px-5 py-1 rounded-lg cursor-pointer transition-all"
    >
      ค้นหา
    </button>
  </div>
);

// Component: DropdownButton
const DropdownButton = ({ label, active, hasValue, onClick, children }) => (
  <div className="relative overflow-visible">
    <button
      onClick={onClick}
      className={`px-5 py-2 border border-gray-300 rounded-full cursor-pointer transition-all duration-200 ${
        active
          ? "bg-[#c6a16b] text-white"
          : hasValue
          ? "bg-[#f8f5f0] text-[#c6a16b] border-[#c6a16b]"
          : "hover:bg-[#f8f5f0]"
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

export default SearchBar;
