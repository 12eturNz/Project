import React, { useState } from "react";
import ProvinceDistrictSelector from "../components/ProvinceDistrictSelector";
import bgImage from "../assets/locations/silom.jpg";

export default function SellRegisterForm() {
  const [formData, setFormData] = useState({
    province: "",
    district: "",
    propertyType: "",
    propertySize: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lineId: "",
    consent: false,
  });

  const handleLocationChange = ({ province, district }) => {
    setFormData((prev) => ({ ...prev, province, district }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("ส่งข้อมูลเรียบร้อย ");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-[Prompt]">
      <div
        className="w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-auto bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <h1 className="relative text-white text-xl sm:text-2xl md:text-3xl font-bold text-center px-4 sm:px-8 leading-snug drop-shadow-lg">
          เสนอขายบ้าน
          <br />
          กับ Premium Asset
        </h1>
      </div>

      {/* ขวา ฟอร์ม */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-12 bg-white shadow-inner">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg text-gray-700 space-y-8 bg-white p-5 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
        >
          {/* ข้อมูลทรัพย์ */}
          <div>
            <h2 className="font-semibold mb-3 text-lg text-[#6e5b54]">
              ข้อมูลทรัพย์
            </h2>
            <div className="p-3 border border-[#cbb59a]/30 rounded-lg hover:border-[#cbb59a]/80 transition duration-300 mb-6">
              <ProvinceDistrictSelector onChange={handleLocationChange} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="ประเภททรัพย์ (เช่น บ้านเดี่ยว, คอนโด)"
              />
              <input
                name="propertySize"
                value={formData.propertySize}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="ขนาด (เช่น 50 ตร.ว. หรือ 35 ตร.ม.)"
              />
            </div>
          </div>

          {/* ข้อมูลผู้ติดต่อ */}
          <div>
            <h2 className="font-semibold mb-3 text-lg text-[#6e5b54]">
              ข้อมูลผู้ติดต่อ (ผู้ขาย)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="ชื่อ"
                required
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="นามสกุล"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="อีเมล"
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="เบอร์โทรศัพท์"
                required
              />
            </div>

            <div className="mt-6">
              <input
                name="lineId"
                value={formData.lineId}
                onChange={handleChange}
                className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
                placeholder="Line ID"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start mt-3 text-xs text-gray-600 leading-relaxed">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              className="mr-2 mt-1 accent-[#6e5b54]"
              required
            />
            <label>
              ข้าพเจ้ายินยอมให้บริษัท โฮมรัน พร็อพเทค จำกัด และบริษัทในเครือ
              ใช้และเปิดเผยข้อมูลส่วนบุคคลตามนโยบายความเป็นส่วนตัวได้ที่{" "}
              <a
                href="#"
                className="text-[#6e5b54] underline hover:text-[#5c4a45]"
              >
                ที่นี่
              </a>
            </label>
          </div>

          {/* ปุ่ม */}
          <button
            type="submit"
            className="w-full bg-[#6e5b54] text-white py-3 rounded-full hover:bg-[#5c4a45] transition duration-300 text-sm font-medium shadow-md hover:shadow-lg cursor-pointer"
          >
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}