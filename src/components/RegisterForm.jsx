// src/components/RegisterForm.jsx (Final 3-Step Robust Version with Base64 Image Persistence)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin, Home, User, Bed, Bath, Upload, X, CheckCircle,
  Tag, Layers, Ruler, Mail, Phone, ChevronDown, ShieldCheck,
  Dumbbell, Waves, Trees, Car, Armchair
} from "lucide-react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet icon fix
let DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- UTILITY FUNCTIONS FOR NUMBER FORMATTING ---
const formatNumberWithCommas = (num) => {
  if (num === '' || num === null || num === undefined) return '';
  const str = String(num);
  const numericValue = str.replace(/[^\d.]/g, '');
  if (!numericValue) return '';

  const parts = numericValue.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedIntegerPart + decimalPart;
};

const stripCommas = (str) => String(str).replace(/,/g, '');
const cleanNumber = (numStr) => String(numStr).replace(/[^\d.]/g, ''); 

// NEW: Utility function to convert File object to Base64 data URL
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};
// --- END UTILITY FUNCTIONS ---

// Map Click Handler Component
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

// Form Input Component
const FormInput = ({ label, id, type = "text", value, onChange, placeholder, required = false, icon: Icon, error }) => (
  <div className="relative mb-5">
    {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#bfa074] focus:border-[#bfa074] transition duration-150 bg-white ${Icon ? "pl-10" : ""} ${error ? "border-red-500" : "border-gray-300"}`}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

// Form Select Component
const FormSelect = ({ label, id, value, onChange, options, placeholder, required = false, icon: Icon, error }) => (
  <div className="relative mb-5">
    {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />}
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#bfa074] focus:border-[#bfa074] appearance-none transition duration-150 bg-white ${Icon ? "pl-10" : ""} ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">{placeholder}</option>
        {options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

// --- Static Data ---
const propertyTypeOptions = [
  { value: 'Single House', label: 'บ้านเดี่ยว' },
  { value: 'Townhouse', label: 'ทาวน์เฮาส์/ทาวน์โฮม' },
  { value: 'Condo', label: 'คอนโดมิเนียม' },
  { value: 'Land', label: 'ที่ดิน' },
  { value: 'Commercial', label: 'อาคารพาณิชย์' },
  { value: 'Apartment', label: 'อพาร์ทเม้นท์' },
  { value: 'Office', label: 'อาคารสำนักงาน' },
];

const bangkokDistricts = [
  { value: 'Chatuchak', label: 'จตุจักร' },
  { value: 'Thonglor', label: 'ทองหล่อ' },
  { value: 'Ekkamai', label: 'เอกมัย' },
  { value: 'Siam', label: 'สยาม' },
  { value: 'Silom', label: 'สีลม' },
];

const facilityOptions = [
  { value: 'สระว่ายน้ำ', label: 'สระว่ายน้ำ', icon: <Waves size={16}/> },
  { value: 'ฟิตเนส', label: 'ฟิตเนส', icon: <Dumbbell size={16}/> },
  { value: 'สวนสาธารณะ', label: 'สวนสาธารณะ', icon: <Trees size={16}/> },
  { value: 'ระบบรักษาความปลอดภัย', label: 'ระบบรักษาความปลอดภัย', icon: <ShieldCheck size={16}/> },
  { value: 'ที่จอดรถ', label: 'ที่จอดรถ', icon: <Car size={16}/> },
  { value: 'เฟอร์นิเจอร์ครบ', label: 'เฟอร์นิเจอร์ครบ', icon: <Armchair size={16}/> },
];

const mapPropertyTypeToDisplayName = (type) => {
  switch(type) {
    case "Single House": return "บ้านเดี่ยว";
    case "Townhouse": return "ทาวน์เฮาส์/ทาวน์โฮม";
    case "Condo": return "คอนโดมิเนียม";
    case "Land": return "ที่ดิน";
    case "Commercial": return "อาคารพาณิชย์";
    case "Apartment": return "อพาร์ทเม้นท์";
    case "Office": return "อาคารสำนักงาน";
    default: return type || "ทรัพย์สิน";
  }
};
// --- End Static Data ---

const initialForm = {
  ownerType: '',
  propertyType: '',
  sellingPrice: '',
  landSize: '',
  usageArea: '',
  bedrooms: '',
  bathrooms: '',
  province: 'กรุงเทพมหานคร',
  district: '',
  address: '',
  mapLocation: null,
  ownerName: '',
  ownerPhone: '',
  ownerEmail: '',
  facilities: [],
  images: [], // { file: File, preview: string (URL) }
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup for object URLs
  useEffect(() => {
    return () => {
      form.images.forEach(img => {
        // Revoke only Blob URLs (which start with 'blob:')
        if (img.preview && img.preview.startsWith("blob:")) {
          try { URL.revokeObjectURL(img.preview); } catch(e) { console.error("Error revoking URL", e); }
        }
      });
    };
  }, [form.images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const toggleFacility = (val) => {
    setForm(prev => ({
      ...prev,
      facilities: prev.facilities.includes(val) ? prev.facilities.filter(i => i !== val) : [...prev.facilities, val]
    }));
  };

  const handleOwnerTypeSelect = (type) => {
    setForm(prev => ({ ...prev, ownerType: type }));
    if (errors.ownerType) setErrors(prev => ({ ...prev, ownerType: null }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10 - form.images.length);
    // Use URL.createObjectURL for immediate preview (will be revoked on unmount/form reset)
    const newImgs = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...newImgs] }));
    e.target.value = null; 
  };

  const removeImage = (i) => {
    const imgToRemove = form.images[i];
    // Revoke blob URL immediately if it was created
    if (imgToRemove && imgToRemove.preview && imgToRemove.preview.startsWith("blob:")) {
      try { URL.revokeObjectURL(imgToRemove.preview); } catch(e) {}
    }
    setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));
  };

  const handleLocationSelect = (latlng) => setForm(prev => ({ ...prev, mapLocation: latlng }));

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const rawValue = stripCommas(value);
    const numericValue = rawValue.replace(/(\..*)\./g, '$1'); 
    setForm(prev => ({ ...prev, sellingPrice: numericValue }));
    if (errors.sellingPrice) setErrors(prev => ({ ...prev, sellingPrice: null }));
  };

  const validateStep = (s) => {
    let e = {};
    let ok = true;
    if (s === 1) {
      if (!form.ownerType) { e.ownerType = "กรุณาเลือกประเภทเจ้าของ"; ok = false; }
      if (!form.propertyType) { e.propertyType = "กรุณาเลือกประเภททรัพย์"; ok = false; }
      if (!form.sellingPrice || isNaN(parseFloat(cleanNumber(form.sellingPrice)))) { e.sellingPrice = "กรุณากรอกราคาขายเป็นตัวเลขที่ถูกต้อง"; ok = false; }
      if (!form.district) { e.district = "กรุณาเลือกเขต/พื้นที่"; ok = false; }
    } else if (s === 2) {
      if (!form.ownerName) { e.ownerName = "กรุณากรอกชื่อ"; ok = false; }
      if (!form.ownerPhone || !/^\d{10}$/.test(form.ownerPhone)) { e.ownerPhone = "กรุณากรอกเบอร์ให้ถูกต้อง (10 หลัก)"; ok = false; }
      if (!form.ownerEmail || !/\S+@\S+\.\S+/.test(form.ownerEmail)) { e.ownerEmail = "กรุณากรอกอีเมลให้ถูกต้อง"; ok = false; }
    }
    setErrors(e);
    return ok;
  };

  const prev = () => { 
    setStep(prev => Math.max(1, prev - 1)); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // Set handleSubmit to async to wait for Base64 conversion
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. การป้องกันการ Submit ก่อนเวลาอันควร (Step 1 หรือ 2) 
    if (step < 3) {
        if (validateStep(step)) {
            setStep(prev => prev + 1); // เลื่อนไป Step ถัดไป
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return; // หยุดการทำงานของ handleSubmit
    }
    
    // 2. Logic นี้จะทำงานก็ต่อเมื่อ step === 3 เท่านั้น
    
    // ตรวจสอบความถูกต้องของ Step 1 และ 2 ซ้ำอีกครั้งก่อนบันทึก
    if (!validateStep(1) || !validateStep(2)) { 
        if (!validateStep(1)) setStep(1); 
        else setStep(2); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return; 
    }

    setIsSubmitting(true);

    const typeLabel = mapPropertyTypeToDisplayName(form.propertyType);
    const defaultImage = "https://placehold.co/1200x800?text=No+Image+Uploaded"; 
    
    // *** NEW: Base64 Conversion Logic ***
    const base64Images = [];
    try {
        // แปลง File object ใน form.images ให้เป็น Base64 string
        for (const img of form.images) {
            if (img.file) { 
                const base64String = await fileToBase64(img.file); // รอการแปลง
                base64Images.push(base64String);
            }
        }
    } catch (err) {
        console.error("Error converting file to Base64:", err);
    }
    
    // ใช้ Base64 strings สำหรับการจัดเก็บ
    const imageUrls = base64Images.length > 0 ? base64Images : [defaultImage]; 
    const rawPrice = cleanNumber(form.sellingPrice || '0'); 

    const newListing = {
      image: imageUrls[0] || defaultImage, 
      images: imageUrls, // เก็บ Base64 String ที่อยู่ได้ถาวร
      title: `${typeLabel} ใน${form.district || form.province}`,
      location: form.district || form.province,
      price: rawPrice,
      tag: "New Listing",
      type: typeLabel,
      beds: form.bedrooms || "-",
      baths: form.bathrooms || "-",
      land: form.landSize || "-",
      area: form.usageArea || "-",
      owner: form.ownerName,
      facilities: form.facilities.join(', '),
      ownerPhone: form.ownerPhone,
      ownerEmail: form.ownerEmail,
      mapLocation: form.mapLocation,
      link: "/PropertyDetailNew"
    };

    try {
      const existing = JSON.parse(localStorage.getItem('userListings')) || [];
      const updated = [newListing, ...existing];
      
      localStorage.setItem('userListings', JSON.stringify(updated)); 
      
      window.dispatchEvent(new Event('listings-updated'));

      // 3. การนำทางจะเกิดขึ้นที่นี่เท่านั้น
      navigate(newListing.link, { state: { listing: newListing } }); 
    } catch (err) {
      console.error("Save error:", err);
      setIsSubmitting(false); 
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล (ข้อมูลมีขนาดใหญ่เกินไป หรือ localStorage เต็ม)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg my-10 border border-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#f7f5ee] flex items-center justify-center text-[#bfa074]">
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="text-sm text-gray-500">ลงประกาศทรัพย์</div>
              <div className="text-lg font-bold text-gray-900">กรอกรายละเอียดทรัพย์ของคุณ</div>
            </div>
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">1. รายละเอียดทรัพย์</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">คุณเป็นเจ้าของหรือนายหน้า? <span className="text-red-500">*</span></label>
              <div className="flex gap-3">
                {['Owner','Agent'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleOwnerTypeSelect(t)}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition ${form.ownerType === t ? 'bg-[#bfa074] text-white' : 'bg-white text-gray-700 border border-gray-200 hover:border-[#bfa074]'}`}
                  >
                    {t === 'Owner' ? 'เจ้าของโดยตรง' : 'นายหน้า/ตัวแทน'}
                  </button>
                ))}
              </div>
              {errors.ownerType && <p className="mt-2 text-sm text-red-600">{errors.ownerType}</p>}
            </div>

            <FormSelect label="ประเภททรัพย์สิน" id="propertyType" value={form.propertyType} onChange={handleChange} options={propertyTypeOptions} placeholder="เลือกประเภททรัพย์สิน" required icon={Home} error={errors.propertyType} />
            
            <FormInput 
                label="ราคาขาย (บาท)" 
                id="sellingPrice" 
                type="text" 
                value={formatNumberWithCommas(form.sellingPrice)} 
                onChange={handlePriceChange} 
                placeholder="เช่น 5,000,000" 
                required 
                icon={Tag} 
                error={errors.sellingPrice} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="จำนวนห้องนอน" id="bedrooms" type="number" value={form.bedrooms} onChange={handleChange} icon={Bed} />
              <FormInput label="จำนวนห้องน้ำ" id="bathrooms" type="number" value={form.bathrooms} onChange={handleChange} icon={Bath} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="ขนาดที่ดิน (วา)" id="landSize" type="number" value={form.landSize} onChange={handleChange} icon={Layers} />
              <FormInput label="พื้นที่ใช้สอย (ตร.ม.)" id="usageArea" type="number" value={form.usageArea} onChange={handleChange} icon={Ruler} />
            </div>

            <FormSelect label="เขต/พื้นที่ (กรุงเทพมหานคร)" id="district" value={form.district} onChange={handleChange} options={bangkokDistricts} placeholder="เลือกเขต/พื้นที่" required icon={MapPin} error={errors.district} />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">รายละเอียดที่อยู่ (ไม่แสดงต่อสาธารณะ)</label>
              <textarea name="address" id="address" rows={3} value={form.address} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#bfa074]" placeholder="เลขที่ ซอย ถนน"></textarea>
            </div>
          </motion.div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">2. ข้อมูลติดต่อ</h3>
            <FormInput label="ชื่อ-นามสกุล" id="ownerName" value={form.ownerName} onChange={handleChange} required icon={User} error={errors.ownerName} />
            <FormInput label="เบอร์โทรศัพท์ (10 หลัก)" id="ownerPhone" type="tel" maxLength={10} value={form.ownerPhone} onChange={handleChange} required icon={Phone} error={errors.ownerPhone} />
            <FormInput label="อีเมล" id="ownerEmail" type="email" value={form.ownerEmail} onChange={handleChange} required icon={Mail} error={errors.ownerEmail} />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">สิ่งอำนวยความสะดวก</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {facilityOptions.map(opt => (
                  <button type="button" key={opt.value} onClick={() => toggleFacility(opt.value)} className={`flex items-center gap-2 py-2 px-3 rounded-xl text-sm ${form.facilities.includes(opt.value) ? 'bg-[#eae7d3] text-[#bfa074] border border-[#bfa074]' : 'bg-white border border-gray-200'}`}>
                    {opt.icon} <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">3. รูปภาพ & ตำแหน่ง</h3>

            <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-white text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload size={28} className="text-[#bfa074] mx-auto" />
                <div className="text-sm font-semibold text-[#bfa074] mt-2">คลิกเพื่ออัปโหลดรูปภาพ</div>
                <div className="text-xs text-gray-500 mt-1">แนะนำสูงสุด 10 รูป (อัปโหลดแล้ว {form.images.length} รูป)</div>
                <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={form.images.length >= 10} />
              </label>
            </div>

            {form.images.length > 0 && (
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {form.images.map((img, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-video">
                    {/* ใช้ img.preview ซึ่งเป็น Blob URL สำหรับ Preview ทันที */}
                    <img src={img.preview} alt={`preview ${i}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">ระบุตำแหน่งบนแผนที่ (คลิกบนแผนที่เพื่อปักหมุด)</label>
              <div className="h-72 w-full rounded-xl overflow-hidden border border-gray-200">
                <MapContainer 
                  center={form.mapLocation || [13.7563, 100.5018]} 
                  zoom={form.mapLocation ? 16 : 12} 
                  style={{ height: "100%", width: "100%" }}
                  scrollWheelZoom={true} 
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler onLocationSelect={handleLocationSelect} />
                  {form.mapLocation && <Marker position={form.mapLocation} />}
                </MapContainer>
              </div>
              {form.mapLocation ? (
                <p className="text-sm text-gray-700 mt-2">ตำแหน่งที่เลือก: Lat <span className="font-mono text-[#bfa074]">{form.mapLocation.lat.toFixed(6)}</span>, Lng <span className="font-mono text-[#bfa074]">{form.mapLocation.lng.toFixed(6)}</span></p>
              ) : (
                <p className="text-sm text-gray-500 mt-2">ยังไม่ได้ระบุตำแหน่ง กรุณาคลิกบนแผนที่</p>
              )}
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
          <button type="button" onClick={prev} disabled={step === 1} className={`px-5 py-3 rounded-xl font-semibold transition duration-150 ${step === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'}`}>← ย้อนกลับ</button>
          
          {/* การควบคุมปุ่ม: ใช้ type="submit" เสมอ แต่การทำงานจะถูกควบคุมใน handleSubmit */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className={`px-5 py-3 rounded-xl font-semibold shadow-md transition duration-150 ${isSubmitting ? 'bg-gray-400 text-white cursor-wait' : 'bg-[#bfa074] text-white hover:bg-[#a58e6c]'}`}
          >
            {step < 3 ? 'ต่อไป →' : isSubmitting ? 'กำลังบันทึก...' : 'ยืนยันการลงทะเบียน'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;