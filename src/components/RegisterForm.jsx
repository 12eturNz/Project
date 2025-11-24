import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { 
  MapPin, Home, User, Building, Car, Bed, Bath, 
  Upload, Image as ImageIcon, X, Check, CheckCircle,
  Dumbbell, Waves, Trees, Wind, ShieldCheck, Zap, Smile, Armchair,
  ChevronDown
} from "lucide-react";

// --- 🗺️ IMPORT LEAFLET (สำหรับแผนที่) ---
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// แก้บั๊ก Icon ของ Leaflet ไม่โชว์ใน React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Component ย่อย: ตัวจัดการคลิกบนแผนที่ ---
const MapClickHandler = ({ onLocationSelect }) => {
  const map = useMapEvents({
    click(e) {
      onLocationSelect(e.latlng); // ส่งค่า lat/lng กลับไป
      map.flyTo(e.latlng, map.getZoom()); // เลื่อนกล้องไปที่จุดที่คลิก
    },
  });
  return null;
};

// --- Component ย่อย: Input & Select ---
const CustomSelect = ({ name, value, onChange, options, placeholder, disabled }) => (
  <div className="relative group">
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-4 pr-10 bg-white border border-gray-200 rounded-xl 
                  text-gray-700 font-medium appearance-none cursor-pointer outline-none transition-all duration-200
                  ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "hover:border-[#bfa074] focus:border-[#bfa074] focus:ring-1 focus:ring-[#bfa074] shadow-sm"}
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options}
    </select>
    <div className={`absolute inset-y-0 right-4 flex items-center pointer-events-none transition-transform duration-200 ${disabled ? "opacity-30" : "text-gray-500 group-hover:text-[#bfa074]"}`}>
      <ChevronDown size={20} strokeWidth={2.5} />
    </div>
  </div>
);

const CustomInput = ({ type = "text", name, value, onChange, placeholder, required, icon: Icon }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full p-4 ${Icon ? 'pl-12' : 'pl-4'} bg-white border border-gray-200 rounded-xl 
                  text-gray-700 font-medium outline-none transition-all duration-200
                  hover:border-[#bfa074] focus:border-[#bfa074] focus:ring-1 focus:ring-[#bfa074] shadow-sm placeholder-gray-400
      `}
    />
    {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
  </div>
);

// ------------------------------------------------------------------

const RegisterForm = () => {
  const { t } = useTranslation();
  const formTopRef = useRef(null);
  const [step, setStep] = useState(1);

  const bangkokDistricts = [
    "คลองเตย", "คลองสาน", "คลองสามวา", "คันนายาว", "จตุจักร", "จอมทอง", 
    "ดอนเมือง", "ดินแดง", "ดุสิต", "ตลิ่งชัน", "ทวีวัฒนา", "ทุ่งครุ", 
    "ธนบุรี", "บางกอกน้อย", "บางกอกใหญ่", "บางกะปิ", "บางขุนเทียน", 
    "บางเขน", "บางคอแหลม", "บางแค", "บางซื่อ", "บางนา", "บางบอน", 
    "บางพลัด", "บางรัก", "บึงกุ่ม", "ปทุมวัน", "ประเวศ", "ป้อมปราบศัตรูพ่าย", 
    "พญาไท", "พระโขนง", "พระนคร", "ภาษีเจริญ", "มีนบุรี", "ยานนาวา", 
    "ราชเทวี", "ราษฎร์บูรณะ", "ลาดกระบัง", "ลาดพร้าว", "วังทองหลาง", 
    "วัฒนา", "สวนหลวง", "สะพานสูง", "สัมพันธวงศ์", "สาทร", "สายไหม", 
    "หนองแขม", "หนองจอก", "หลักสี่", "ห้วยขวาง"
  ];

  const initialFormData = {
    // Step 1
    province: "กรุงเทพมหานคร",
    district: "",
    propertyType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lineId: "",
    isAgent: "no",
    acceptTerms: false,

    // Step 2
    address: "",
    soi: "",
    road: "",
    zipcode: "",
    lat: 13.7563, // Default Lat (Bangkok)
    lng: 100.5018, // Default Lng (Bangkok)
    
    unitType: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    isInProject: "yes",
    ownerType: "person",
    propertyAge: "",
    landSize: "",
    usageArea: "",
    sellingPrice: "",
    urgency: "",
    sellElsewhere: "no",
    allowAgent: "yes",
    facilities: [],
    
    // Step 3
    images: [] 
  };

  const [formData, setFormData] = useState(initialFormData);

  const facilityOptions = [
    { id: "fitness", label: "ฟิตเนส", icon: <Dumbbell size={20} /> },
    { id: "pool", label: "สระว่ายน้ำ", icon: <Waves size={20} /> },
    { id: "park", label: "สวนสาธารณะ", icon: <Trees size={20} /> },
    { id: "sauna", label: "ซาวน่า", icon: <Wind size={20} /> },
    { id: "security", label: "รปภ. / CCTV", icon: <ShieldCheck size={20} /> },
    { id: "ev", label: "EV Charger", icon: <Zap size={20} /> },
    { id: "playground", label: "สนามเด็กเล่น", icon: <Smile size={20} /> },
    { id: "clubhouse", label: "คลับเฮ้าส์", icon: <Armchair size={20} /> },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOwnerTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, ownerType: type }));
  };

  // ฟังก์ชันอัปเดตพิกัดเมื่อคลิกแผนที่
  const handleLocationSelect = (latlng) => {
    setFormData((prev) => ({
      ...prev,
      lat: latlng.lat,
      lng: latlng.lng
    }));
  };

  const toggleFacility = (facilityId) => {
    setFormData((prev) => {
      const currentFacilities = prev.facilities;
      if (currentFacilities.includes(facilityId)) {
        return { ...prev, facilities: currentFacilities.filter(id => id !== facilityId) };
      } else {
        return { ...prev, facilities: [...currentFacilities, facilityId] };
      }
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const scrollToTop = () => {
    setTimeout(() => {
        if (formTopRef.current) {
            const y = formTopRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, 100);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
       if (!formData.firstName || !formData.phone || !formData.acceptTerms) {
          alert("กรุณากรอกข้อมูลที่จำเป็นและยอมรับเงื่อนไข");
          return;
       }
       setStep(2);
    } else if (step === 2) {
       setStep(3);
    }
    scrollToTop();
  };

  const handlePrevStep = () => {
      setStep(prev => prev - 1);
      scrollToTop();
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    setStep(4);
    scrollToTop();
  };

  const handleReset = () => {
      setFormData(initialFormData);
      setStep(1);
      scrollToTop();
  };

  const propertyOptions = (
    <>
      <option value="">เลือกประเภททรัพย์</option>
      <option value="Single House">บ้านเดี่ยว</option>
      <option value="Semi-Detached">บ้านแฝด</option>
      <option value="Townhouse">ทาวน์เฮาส์</option>
      <option value="Townhome">ทาวน์โฮม</option>
      <option value="Condo">คอนโดมิเนียม</option>
      <option value="Commercial">อาคารพาณิชย์</option>
      <option value="Land">ที่ดิน</option>
      <option value="Apartment">อพาร์ทเมนท์</option>
      <option value="Office">อาคารสำนักงาน</option>
      <option value="Factory">โรงงาน / โกดัง</option>
      <option value="Hotel">โรงแรม / รีสอร์ท</option>
    </>
  );

  return (
    <div ref={formTopRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans pb-12">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[700px]">
        
        {/* === ส่วนซ้าย: ดีไซน์ Dark Luxury === */}
        <div className="lg:w-5/12 relative flex flex-col items-center justify-center p-12 text-center overflow-hidden bg-[#1a1a1a] hidden lg:flex">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1f1f1f] to-[#2a2a2a] z-0" />
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#bfa074]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#bfa074]/5 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-1.5 bg-[#bfa074] mb-8 rounded-full shadow-lg shadow-[#bfa074]/20" />
                <h2 className="text-3xl md:text-4xl font-bold leading-relaxed text-white tracking-wide drop-shadow-lg">
                    {step === 1 && (<>ประเมินราคาทรัพย์ <br /><span className="text-gray-300 text-2xl font-medium mt-2 block">และหาข้อตกลงที่เหมาะสม</span><span className="text-[#bfa074] mt-2 block">ร่วมกับเรา</span></>)}
                    {step === 2 && (<>กรอกรายละเอียดทรัพย์ <br /><span className="text-gray-300 text-2xl font-medium mt-2 block">เพื่อให้เราประเมิน</span><span className="text-[#bfa074] mt-2 block">ได้แม่นยำยิ่งขึ้น</span></>)}
                    {step === 3 && (<>เพิ่มรูปภาพ <br /><span className="text-gray-300 text-2xl font-medium mt-2 block">เพื่อความน่าสนใจ</span><span className="text-[#bfa074] mt-2 block">ของทรัพย์สิน</span></>)}
                    {step === 4 && (<>ขอบคุณ <br /><span className="text-gray-300 text-2xl font-medium mt-2 block">ที่ไว้วางใจให้เราดูแล</span><span className="text-[#bfa074] mt-2 block">ทรัพย์สินของคุณ</span></>)}
                </h2>
                <div className="mt-12 flex space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${step === i ? "bg-[#bfa074] w-6" : "bg-gray-600"}`} />
                    ))}
                </div>
            </div>
        </div>

        {/* === ส่วนขวา: ฟอร์ม === */}
        <div className="lg:w-7/12 p-6 lg:p-10 bg-[#f9f9f9] overflow-y-auto max-h-[800px] w-full relative">
          
          {/* STEP INDICATOR */}
          {step < 4 && (
            <div className="flex items-center justify-center mb-8 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                <div className={`flex items-center ${step >= 1 ? "text-[#bfa074]" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${step >= 1 ? "bg-[#bfa074] text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{step > 1 ? <Check size={16} /> : "1"}</div>
                    <span className="text-sm font-semibold hidden sm:inline">ข้อมูลผู้ติดต่อ</span>
                </div>
                <div className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 rounded-full ${step >= 2 ? "bg-[#bfa074]" : "bg-gray-200"}`} />
                <div className={`flex items-center ${step >= 2 ? "text-[#bfa074]" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${step >= 2 ? "bg-[#bfa074] text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>{step > 2 ? <Check size={16} /> : "2"}</div>
                    <span className="text-sm font-semibold hidden sm:inline">ข้อมูลทรัพย์</span>
                </div>
                <div className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 rounded-full ${step >= 3 ? "bg-[#bfa074]" : "bg-gray-200"}`} />
                <div className={`flex items-center ${step >= 3 ? "text-[#bfa074]" : "text-gray-400"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${step >= 3 ? "bg-[#bfa074] text-white shadow-md" : "bg-gray-100 text-gray-500"}`}>3</div>
                    <span className="text-sm font-semibold hidden sm:inline">รูปภาพ</span>
                </div>
            </div>
          )}

          {/* ################# STEP 1 ################# */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2 pb-4 border-b border-gray-100">
                <div className="bg-[#bfa074]/10 p-2 rounded-lg text-[#bfa074]"><User size={24} /></div>
                <h3 className="text-xl font-bold text-gray-800">ข้อมูลผู้ติดต่อ</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CustomSelect 
                    name="province" value={formData.province} onChange={handleChange}
                    options={<option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>}
                  />
                  <CustomSelect 
                    name="district" value={formData.district} onChange={handleChange} placeholder="เลือกเขต / อำเภอ"
                    options={bangkokDistricts.map((d, i) => <option key={i} value={d}>{d}</option>)}
                  />
              </div>

              <CustomSelect name="propertyType" value={formData.propertyType} onChange={handleChange} placeholder="ประเภททรัพย์ที่ต้องการขาย" options={propertyOptions} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <CustomInput name="firstName" value={formData.firstName} onChange={handleChange} placeholder="ชื่อ" required />
                <CustomInput name="lastName" value={formData.lastName} onChange={handleChange} placeholder="นามสกุล" />
                <CustomInput type="email" name="email" value={formData.email} onChange={handleChange} placeholder="อีเมล" />
                <CustomInput type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="เบอร์โทรศัพท์" required />
              </div>
              <CustomInput name="lineId" value={formData.lineId} onChange={handleChange} placeholder="Line ID (ถ้ามี)" />
              
              <div className="flex items-center space-x-6 p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium">คุณเป็นเอเจนท์ใช่หรือไม่?</span>
                <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="radio" name="isAgent" value="yes" checked={formData.isAgent === "yes"} onChange={handleChange} className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#bfa074] peer-checked:bg-[#bfa074] transition-all"></div>
                        <span className="ml-2 text-gray-600 peer-checked:text-[#bfa074] font-medium">ใช่</span>
                    </div>
                </label>
                <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                        <input type="radio" name="isAgent" value="no" checked={formData.isAgent === "no"} onChange={handleChange} className="peer sr-only" />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-[#bfa074] peer-checked:bg-[#bfa074] transition-all"></div>
                        <span className="ml-2 text-gray-600 peer-checked:text-[#bfa074] font-medium">ไม่ใช่</span>
                    </div>
                </label>
              </div>

              <div className="flex items-start p-2">
                <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="mt-1 mr-3 w-5 h-5 text-[#bfa074] rounded border-gray-300 focus:ring-[#bfa074] cursor-pointer" required />
                <span className="text-sm text-gray-500 leading-relaxed">ข้าพเจ้ายินยอมให้บริษัทใช้ข้อมูลเพื่อติดต่อกลับ และยอมรับ <a href="#" className="text-[#bfa074] font-semibold hover:underline">นโยบายความเป็นส่วนตัว</a></span>
              </div>
              <button type="submit" className="w-full bg-[#6d6458] hover:bg-[#5a5248] text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-0.5">ยืนยันเพื่อไปต่อ</button>
            </form>
          )}

          {/* ################# STEP 2 ################# */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* Card 1: MAP (ใช้งานได้จริง) */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
                    <div className="bg-[#bfa074]/10 p-2 rounded-lg text-[#bfa074]"><MapPin size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-800">ทำเลที่ตั้ง</h3>
                </div>
                
                {/* 🗺️ MAP CONTAINER */}
                <div className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-5 relative border border-gray-200 z-0">
                   <MapContainer 
                      center={[formData.lat, formData.lng]} 
                      zoom={13} 
                      scrollWheelZoom={false}
                      style={{ height: "100%", width: "100%" }}
                   >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[formData.lat, formData.lng]} />
                      <MapClickHandler onLocationSelect={handleLocationSelect} />
                   </MapContainer>
                   <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-lg shadow-md text-xs text-gray-600 z-[1000]">
                      คลิกบนแผนที่เพื่อปักหมุด
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <CustomInput name="address" value={formData.address} onChange={handleChange} placeholder="แขวง/ตำบล" />
                    <CustomInput name="road" value={formData.road} onChange={handleChange} placeholder="ถนน (ถ้ามี)" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <CustomSelect disabled placeholder="กรุงเทพมหานคร" />
                   <CustomSelect 
                        name="district" value={formData.district} onChange={handleChange} 
                        placeholder="เขต / อำเภอ" options={bangkokDistricts.map((d,i)=><option key={i} value={d}>{d}</option>)}
                   />
                </div>
              </div>

              {/* Card 2: Property Info */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3">
                    <div className="bg-[#bfa074]/10 p-2 rounded-lg text-[#bfa074]"><Home size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-800">ข้อมูลทรัพย์</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <CustomSelect name="propertyType" value={formData.propertyType} onChange={handleChange} options={propertyOptions} />
                    <CustomSelect name="unitType" value={formData.unitType} onChange={handleChange} placeholder="ประเภทห้องชุด (ถ้ามี)" options={<><option value="Studio">Studio</option><option value="1 Bedroom">1 Bedroom</option><option value="2 Bedrooms">2 Bedrooms</option></>} />
                </div>
                
                <div className="grid grid-cols-3 gap-5 mb-6">
                    <CustomInput type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="ห้องนอน" icon={Bed} />
                    <CustomInput type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="ห้องน้ำ" icon={Bath} />
                    <CustomInput type="number" name="parking" value={formData.parking} onChange={handleChange} placeholder="ที่จอดรถ" icon={Car} />
                </div>

                {/* Facilities */}
                <div className="mb-8">
                     <p className="text-sm font-bold mb-3 text-gray-700 uppercase tracking-wide">สิ่งอำนวยความสะดวก</p>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {facilityOptions.map((facility) => (
                            <button
                                key={facility.id}
                                type="button"
                                onClick={() => toggleFacility(facility.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                                    formData.facilities.includes(facility.id) 
                                    ? "bg-[#bfa074] text-white border-[#bfa074] shadow-md transform scale-105" 
                                    : "bg-white text-gray-500 border-gray-200 hover:border-[#bfa074] hover:bg-[#bfa074]/5"
                                }`}
                            >
                                <div className="mb-1">{facility.icon}</div>
                                <span className="text-xs font-medium">{facility.label}</span>
                            </button>
                        ))}
                     </div>
                </div>

                {/* Radio Options */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-bold mb-3 text-gray-700">ทรัพย์สินอยู่ในโครงการ?</p>
                    <div className="flex space-x-6">
                        <label className="flex items-center cursor-pointer group">
                             <input type="radio" name="isInProject" value="yes" checked={formData.isInProject === "yes"} onChange={handleChange} className="peer sr-only" />
                             <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-[#bfa074] peer-checked:border-[#bfa074]"></div>
                             <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">อยู่ในโครงการ</span>
                        </label>
                        <label className="flex items-center cursor-pointer group">
                             <input type="radio" name="isInProject" value="no" checked={formData.isInProject === "no"} onChange={handleChange} className="peer sr-only" />
                             <div className="w-4 h-4 rounded-full border border-gray-400 peer-checked:bg-[#bfa074] peer-checked:border-[#bfa074]"></div>
                             <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">นอกโครงการ</span>
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm font-bold mb-3 text-gray-700">ประเภทผู้ถือครอง</p>
                    <div className="flex space-x-4">
                        <button type="button" onClick={() => handleOwnerTypeSelect('juristic')} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.ownerType === 'juristic' ? 'border-[#bfa074] bg-[#bfa074]/10 text-[#bfa074]' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}><Building size={28} className="mb-2" /><span className="text-sm font-bold">นิติบุคคล</span></button>
                        <button type="button" onClick={() => handleOwnerTypeSelect('person')} className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${formData.ownerType === 'person' ? 'border-[#bfa074] bg-[#bfa074]/10 text-[#bfa074]' : 'border-gray-200 text-gray-400 hover:border-gray-300'}`}><User size={28} className="mb-2" /><span className="text-sm font-bold">บุคคลธรรมดา</span></button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <CustomInput name="landSize" value={formData.landSize} onChange={handleChange} placeholder="เนื้อที่ดิน (ตร.ว.)" />
                    <CustomInput name="usageArea" value={formData.usageArea} onChange={handleChange} placeholder="พื้นที่ใช้สอย (ตร.ม.)" />
                </div>
              </div>

              {/* Card 3: Price */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-5 border-b border-gray-100 pb-3"><div className="bg-[#bfa074]/10 p-2 rounded-lg text-[#bfa074]"><CheckCircle size={24} /></div><h3 className="text-lg font-bold text-gray-800">ข้อมูลราคา</h3></div>
                  <div className="mb-5"><label className="text-xs text-gray-400 font-bold ml-1 mb-1 block uppercase">ราคาที่ต้องการขาย (บาท)</label><CustomInput name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} placeholder="0.00" className="text-lg font-bold" /></div>
                  <div><CustomSelect name="urgency" value={formData.urgency} onChange={handleChange} placeholder="เลือกความเร่งด่วนในการขาย" options={<><option value="Urgent">ด่วนที่สุด</option><option value="Normal">ปกติ</option></>} /></div>
              </div>
              
              <div className="flex items-center justify-between gap-4 pt-4"><button type="button" onClick={handlePrevStep} className="flex-1 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition">ย้อนกลับ</button><button type="submit" className="flex-1 py-4 rounded-xl bg-[#6d6458] text-white font-bold hover:bg-[#5a5248] shadow-lg transition transform hover:-translate-y-0.5">ไปต่อ</button></div>
            </form>
          )}

          {/* ################# STEP 3 ################# */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-6">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
                 <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                    <div className="bg-[#bfa074]/10 p-2 rounded-lg text-[#bfa074]"><ImageIcon size={24} /></div>
                    <h3 className="text-lg font-bold text-gray-800">อัปโหลดรูปภาพ</h3>
                 </div>
                 <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-[#bfa074] transition-all cursor-pointer relative group">
                    <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <div className="bg-gray-100 p-5 rounded-full mb-4 text-gray-400 group-hover:text-[#bfa074] group-hover:bg-[#bfa074]/10 transition-colors"><Upload size={40} /></div>
                    <p className="text-lg font-bold text-gray-700 group-hover:text-[#bfa074]">คลิกเพื่ออัปโหลด หรือลากไฟล์มาวางที่นี่</p>
                    <p className="text-sm text-gray-400 mt-2">รองรับไฟล์ JPG, PNG (ขนาดไม่เกิน 5MB)</p>
                 </div>
                 {formData.images.length > 0 && (
                   <div className="mt-8">
                      <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> รูปภาพที่เลือก ({formData.images.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {formData.images.map((img, index) => (
                              <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-square shadow-sm hover:shadow-md transition-shadow">
                                  <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                  <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white transform hover:scale-110"><X size={16} /></button>
                              </div>
                          ))}
                      </div>
                   </div>
                 )}
               </div>
               <div className="flex items-center justify-between gap-4 pt-4">
                <button type="button" onClick={handlePrevStep} className="flex-1 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition">ย้อนกลับ</button>
                <button type="submit" className="flex-1 py-4 rounded-xl bg-[#6d6458] text-white font-bold hover:bg-[#5a5248] shadow-lg transition transform hover:-translate-y-0.5">ส่งข้อมูลทรัพย์</button>
              </div>
            </form>
          )}

          {/* ################# STEP 4 ################# */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 animate-in fade-in duration-700">
                <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <CheckCircle size={64} className="text-green-500 drop-shadow-sm" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">ได้รับข้อมูลเรียบร้อย!</h2>
                <p className="text-xl text-gray-600 font-medium mb-2">ขอบคุณที่ไว้วางใจ Premium Asset</p>
                <p className="text-gray-500 mb-12 max-w-md leading-relaxed">
                    ทางทีมงานได้รับข้อมูลทรัพย์ของคุณแล้ว <br/>
                    เราจะทำการตรวจสอบและติดต่อกลับโดยเร็วที่สุด
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <button onClick={() => window.location.href = '/Project/'} className="flex-1 px-8 py-4 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition">กลับหน้าหลัก</button>
                    <button onClick={handleReset} className="flex-1 px-8 py-4 rounded-xl bg-[#bfa074] text-white font-bold hover:bg-[#a38a5c] shadow-lg transition transform hover:-translate-y-0.5">เสนอทรัพย์เพิ่ม</button>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RegisterForm;