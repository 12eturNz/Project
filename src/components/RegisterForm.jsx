// src/components/RegisterForm.jsx
import React, { useState, useRef, useEffect } from "react";
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

const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });
  return null;
};

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

const propertyTypeOptions = [
  { value: 'Single House', label: 'บ้านเดี่ยว' },
  { value: 'Townhouse', label: 'ทาวน์เฮาส์/ทาวน์โฮม' },
  { value: 'Condo', label: 'คอนโดมิเนียม' },
  { value: 'Land', label: 'ที่ดิน' },
  { value: 'Commercial', label: 'อาคารพาณิชย์' },
  { value: 'Apartment', label: 'อพาร์ทเม้นท์' },
  { value: 'Office', label: 'อาคารสำนักงาน' },
];

const facilityOptions = [
  { value: 'สระว่ายน้ำ', label: 'สระว่ายน้ำ', icon: <Waves size={16}/> },
  { value: 'ฟิตเนส', label: 'ฟิตเนส', icon: <Dumbbell size={16}/> },
  { value: 'สวนสาธารณะ', label: 'สวนสาธารณะ', icon: <Trees size={16}/> },
  { value: 'ระบบรักษาความปลอดภัย', label: 'ระบบรักษาความปลอดภัย', icon: <ShieldCheck size={16}/> },
  { value: 'ที่จอดรถ', label: 'ที่จอดรถ', icon: <Car size={16}/> },
  { value: 'เฟอร์นิเจอร์ครบ', label: 'เฟอร์นิเจอร์ครบ', icon: <Armchair size={16}/> },
];

const bangkokDistricts = [
  { value: 'Chatuchak', label: 'จตุจักร' },
  { value: 'Thonglor', label: 'ทองหล่อ' },
  { value: 'Ekkamai', label: 'เอกมัย' },
  { value: 'Siam', label: 'สยาม' },
  { value: 'Silom', label: 'สีลม' },
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
  images: [],
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // cleanup created object URLs on unmount
    return () => {
      form.images.forEach(img => {
        if (img.preview && img.preview.startsWith("blob:")) {
          try { URL.revokeObjectURL(img.preview); } catch(e) {}
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

  const handleOwnerTypeSelect = (type) => setForm(prev => ({ ...prev, ownerType: type }));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10 - form.images.length);
    const newImgs = files.map(f => ({ file: f, preview: URL.createObjectURL(f) }));
    setForm(prev => ({ ...prev, images: [...prev.images, ...newImgs] }));
  };

  const removeImage = (i) => setForm(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }));

  const handleLocationSelect = (latlng) => setForm(prev => ({ ...prev, mapLocation: latlng }));

  const validateStep = (s) => {
    let e = {};
    let ok = true;
    if (s === 1) {
      if (!form.ownerType) { e.ownerType = "กรุณาเลือกประเภทเจ้าของ"; ok = false; }
      if (!form.propertyType) { e.propertyType = "กรุณาเลือกประเภททรัพย์"; ok = false; }
      if (!form.sellingPrice) { e.sellingPrice = "กรุณากรอกราคาขาย"; ok = false; }
      if (!form.district) { e.district = "กรุณาเลือกเขต/พื้นที่"; ok = false; }
    } else if (s === 2) {
      if (!form.ownerName) { e.ownerName = "กรุณากรอกชื่อ"; ok = false; }
      if (!form.ownerPhone || !/^\d{10}$/.test(form.ownerPhone)) { e.ownerPhone = "กรุณากรอกเบอร์ให้ถูกต้อง (10 หลัก)"; ok = false; }
      if (!form.ownerEmail || !/\S+@\S+\.\S+/.test(form.ownerEmail)) { e.ownerEmail = "กรุณากรอกอีเมลให้ถูกต้อง"; ok = false; }
    }
    setErrors(e);
    return ok;
  };

  const next = () => { if (validateStep(step)) setStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const prev = () => { setStep(prev => Math.max(1, prev - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    // final validation (basic)
    if (!validateStep(1) || !validateStep(2)) { setStep(1); return; }

    setIsSubmitting(true);

    const typeLabel = mapPropertyTypeToDisplayName(form.propertyType);
    const newListing = {
      image: form.images[0] ? form.images[0].preview : "https://via.placeholder.com/1200x800?text=No+Image",
      title: `${typeLabel} ใน${form.district || form.province}`,
      location: form.district || form.province,
      price: "฿" + new Intl.NumberFormat('th-TH').format(Number(form.sellingPrice || 0)),
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
      // link to where PropertyDetailNew will live — adjust route as you need
      link: "/PropertyDetailNew"
    };

    try {
      const existing = JSON.parse(localStorage.getItem('userListings')) || [];
      const updated = [newListing, ...existing];
      localStorage.setItem('userListings', JSON.stringify(updated));
      window.dispatchEvent(new Event('listings-updated'));

      // navigate to the new property detail page (you can adjust route)
      navigate(newListing.link);
    } catch (err) {
      console.error("Save error:", err);
      setIsSubmitting(false);
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

        {/* Step panels */}
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
            <FormInput label="ราคาขาย (บาท)" id="sellingPrice" type="number" value={form.sellingPrice} onChange={handleChange} placeholder="เช่น 5000000" required icon={Tag} error={errors.sellingPrice} />

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

        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">2. ข้อมูลติดต่อ</h3>
            <FormInput label="ชื่อ-นามสกุล" id="ownerName" value={form.ownerName} onChange={handleChange} required icon={User} error={errors.ownerName} />
            <FormInput label="เบอร์โทรศัพท์ (10 หลัก)" id="ownerPhone" value={form.ownerPhone} onChange={handleChange} required icon={Phone} error={errors.ownerPhone} />
            <FormInput label="อีเมล" id="ownerEmail" value={form.ownerEmail} onChange={handleChange} required icon={Mail} error={errors.ownerEmail} />

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

        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">3. รูปภาพ & ตำแหน่ง</h3>

            <div className="mb-6 p-6 border-2 border-dashed border-gray-300 rounded-xl bg-white text-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload size={28} className="text-[#bfa074] mx-auto" />
                <div className="text-sm font-semibold text-[#bfa074] mt-2">คลิกเพื่ออัปโหลดรูปภาพ</div>
                <div className="text-xs text-gray-500 mt-1">แนะนำสูงสุด 10 รูป</div>
                <input id="image-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>

            {form.images.length > 0 && (
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {form.images.map((img, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden aspect-video">
                    <img src={img.preview} alt={`preview ${i}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">ระบุตำแหน่งบนแผนที่</label>
              <div className="h-72 w-full rounded-xl overflow-hidden border border-gray-200">
                <MapContainer center={form.mapLocation || [13.7563, 100.5018]} zoom={form.mapLocation ? 16 : 12} style={{ height: "100%", width: "100%" }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler onLocationSelect={handleLocationSelect} />
                  {form.mapLocation && <Marker position={form.mapLocation} />}
                </MapContainer>
              </div>
              {form.mapLocation && <p className="text-sm text-gray-500 mt-2">Lat {form.mapLocation.lat.toFixed(6)}, Lng {form.mapLocation.lng.toFixed(6)}</p>}
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-6">
          <button type="button" onClick={prev} disabled={step === 1} className={`px-5 py-3 rounded-xl ${step === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white border border-gray-200 text-gray-700'}`}>← ย้อนกลับ</button>
          {step < 3 ? (
            <button type="button" onClick={next} className="px-5 py-3 rounded-xl bg-[#bfa074] text-white">ต่อไป →</button>
          ) : (
            <button type="submit" disabled={isSubmitting} className={`px-5 py-3 rounded-xl ${isSubmitting ? 'bg-gray-400 text-white' : 'bg-[#bfa074] text-white'}`}>{isSubmitting ? 'กำลังบันทึก...' : 'ยืนยันการลงทะเบียน'}</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
