import React, { useState } from "react";
import ProvinceDistrictSelector from "../components/ProvinceDistrictSelector";
import bgImage from "../assets/locations/silom.jpg";
import { User, Building, Briefcase, Check } from "lucide-react";

// Header
const StepHeader = ({ step }) => {
  const steps = [
    { id: 1, name: "ข้อมูลผู้ติดต่อ", icon: User },
    { id: 2, name: "ข้อมูลบริษัท", icon: Building },
    { id: 3, name: "ตัวอย่างผลงาน", icon: Briefcase },
  ];

  return (
    <nav className="flex items-center justify-between mb-8" aria-label="Steps">
      {steps.map((item, index) => (
        <React.Fragment key={item.name}>
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step > item.id
                  ? "bg-green-600 text-white"
                  : step === item.id
                  ? "bg-[#6e5b54] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step > item.id ? <Check size={20} /> : <item.icon size={20} />}
            </div>
            <p
              className={`mt-2 text-xs font-medium ${
                step >= item.id ? "text-[#6e5b54]" : "text-gray-400"
              }`}
            >
              {item.name}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 ${
                step > item.id ? "bg-green-600" : "bg-gray-200"
              } mx-4`}
            />
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// --- Main Component ---
export default function PartnerRegisterForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lineId: "",
    // Step 2
    companyName: "",
    businessType: "",
    website: "",
    province: "",
    district: "",
    subDistrict: "", 
    street: "", 
    // Step 3
    portfolioFile: null,
    message: "", // รายละเอียดผลงาน
    consent: false,
  });

  const handleLocationChange = ({ province, district }) => {
    setFormData((prev) => ({ ...prev, province, district }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.consent) {
        alert("โปรดกดยินยอมนโยบายความเป็นส่วนตัว");
        return;
    }
    console.log("Submitting final data:", formData);
    alert("ส่งข้อมูลเรียบร้อย ");
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // --- Render Steps ---

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-[#6e5b54]">1. ข้อมูลผู้ติดต่อ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="ชื่อ (ผู้ติดต่อ)"
          required
        />
        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="นามสกุล (ผู้ติดต่อ)"
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="อีเมล"
          required
        />
        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="เบอร์โทรศัพท์"
          required
        />
      </div>
      <input
        name="lineId"
        value={formData.lineId}
        onChange={handleChange}
        className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
        placeholder="Line ID"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-[#6e5b54]">2. ข้อมูลบริษัท</h2>
      <input
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
        placeholder="ชื่อบริษัท"
      />
      <select
        name="businessType"
        value={formData.businessType}
        onChange={handleChange}
        className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition bg-white"
      >
        <option value="" disabled>
          ประเภทธุรกิจของคุณ
        </option>
        <option value="นักลงทุน">นักลงทุน</option>
        <option value="ผู้รับเหมา">ผู้รับเหมาและบริษัทก่อสร้าง</option>
        <option value="บริษัทออกแบบ">บริษัทออกแบบและตกแต่งภายใน</option>
        <option value="ซัพพลายเออร์">ซัพพลายเออร์วัสดุก่อสร้าง</option>
        <option value="สถาบันการเงิน">สถาบันการเงิน</option>
        <option value="อื่นๆ">อื่นๆ</option>
      </select>
      <input
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
        placeholder="เว็บไซต์บริษัท (ถ้ามี)"
      />
      
      <h3 className="text-sm font-medium text-gray-700 pt-2">ที่อยู่</h3>
      <div className="p-3 border border-[#cbb59a]/30 rounded-lg">
        <ProvinceDistrictSelector onChange={handleLocationChange} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          name="subDistrict"
          value={formData.subDistrict}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="แขวง/ตำบล"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="w-full border-b border-[#cbb59a] py-2 text-sm focus:outline-none focus:border-[#6e5b54] transition"
          placeholder="ถนน (ถ้ามี)"
        />
      </div>
      
      <div>
        <label className="text-sm text-gray-600">ปักหมุดที่ตั้งของบริษัท</label>
        <div className="w-full h-48 bg-gray-200 rounded-lg mt-2 flex items-center justify-center text-gray-500">
          (พื้นที่จำลองสำหรับแผนที่)
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="font-semibold text-lg text-[#6e5b54]">3. ตัวอย่างผลงาน</h2>
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          แนบไฟล์ผลงาน (Portfolio)
        </label>
        <input
          type="file"
          name="portfolioFile"
          onChange={handleChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#f0e9e1] file:text-[#6e5b54] hover:file:bg-[#e6dcd1] cursor-pointer"
        />
      </div>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="w-full border border-[#cbb59a] rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-[#6e5b54] transition h-32"
        placeholder="รายละเอียดเกี่ยวกับผลงาน หรือข้อเสนอเพิ่มเติม"
      />
      
      {/* Checkbox */}
      <div className="flex items-start pt-4 text-xs text-gray-600 leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mr-2 mt-1 accent-[#6e5b54]"
          id="consent-checkbox"
        />
        <label htmlFor="consent-checkbox">
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
    </div>
  );

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
          สมัครเป็นพาร์ทเนอร์
          <br />
          กับ Premium Asset
        </h1>
      </div>

      {/* ขวา ฟอร์ม */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 md:px-16 py-8 sm:py-12 bg-white shadow-inner">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md sm:max-w-lg text-gray-700 bg-white p-5 sm:p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
        >
          {/* Header Steps */}
          <StepHeader step={step} />

          {/* Form Content */}
          <div className="mt-8 space-y-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-10">
            <button
              type="button"
              onClick={prevStep}
              className={`text-sm font-medium text-gray-500 hover:text-gray-800 transition ${
                step === 1 ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              ย้อนกลับ
            </button>
            
            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                className="bg-[#6e5b54] text-white py-2 px-8 rounded-full hover:bg-[#5c4a45] transition duration-300 text-sm font-medium shadow-md"
              >
                ต่อไป
              </button>
            )}
            
            {step === 3 && (
              <button
                type="submit"
                className="w-full bg-[#6e5b54] text-white py-3 rounded-full hover:bg-[#5c4a45] transition duration-300 text-sm font-medium shadow-md hover:shadow-lg cursor-pointer"
              >
                ยืนยัน
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}