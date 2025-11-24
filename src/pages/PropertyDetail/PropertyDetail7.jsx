import React from 'react';
import { 
  MapPin, Share2, Bed, Bath, Home, Ruler, Layers, Tag, ArrowLeft, 
  Utensils, Armchair, Waves, Dumbbell, Car, Wrench, PaintBucket
} from 'lucide-react';

const PropertyDetailPage = () => {
  // Mock Data (อัปเดตข้อมูล The Dresden III at Asok)
  const property = {
    title: "The Dresden III at Asok (Prestige Towers)",
    location: "ใจกลางอโศก",
    price: "฿13,500,000", // คำนวณจาก 77,368 * 174.49 = 13,499,942
    originalPrice: "฿14,900,000", 
    discount: "-9%",
    tags: ["Condo", "Renovated", "Value Deal"],
    images: [
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_01_Aug_2025_1754036950870.jpg", // รูปหลัก
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_21_Mar_2025_1742528760594.jpg",
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_1_21_Mar_2025_1742529790064.jpg",
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_3_21_Mar_2025_1742529790066.jpg",
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_13_21_Mar_2025_1742529790069.jpg",
    ],
    description: `คอนโดห้องใหญ่ ใจกลางอโศก รีโนเวทใหม่ทั้งยูนิต ราคาสุดคุ้ม ตร.ม.ละไม่ถึงแสน!
    Building: Prestige Towers | Project Name: The Dresden III at Asok
    
    จุดเด่น:
    - ห้องใหญ่ 174.49 ตร.ม. ปรับฟังก์ชันใหม่เป็น 3 ห้องนอน 4 ห้องน้ำ
    - รีโนเวทครบ พร้อมเข้าอยู่ ตรวจสอบระบบน้ำ-ไฟ เปลี่ยนใหม่ทุกจุด
    - ปูพื้น SPC ใหม่ทั้งห้อง + ปูกระเบื้องครัวใหม่
    - Built-in ครัวใหม่ ท็อปหินแท้ พร้อมเตา Hood Sink ใหม่
    - ทำเลใจกลางเมือง แต่ราคาจับต้องได้`,
    features: [ // Highlight งานรีโนเวท
      "ปรับปรุงใหม่เป็น 3 ห้องนอน 4 ห้องน้ำ",
      "ที่จอดรถ 2 คัน (ล็อกตำแหน่ง)",
      "ปูพื้น SPC ใหม่ทั้งห้อง",
      "ห้องน้ำทำกันซึมใหม่ เปลี่ยนอุปกรณ์ยกชุด",
      "อัปเกรดระบบไฟ เปลี่ยนท่อน้ำดีใหม่",
      "ติด Wallpaper + ทำสีฝ้าใหม่ทั้งห้อง"
    ],
    specs: {
      landSize: "-", // คอนโด
      area: "174.49 ตารางเมตร",
      floors: "10",
      pricePerSqm: "77,368 ฿",
    },
    rooms: {
      bedroom: 3,
      bathroom: 4, // ยึดตาม text ที่บอกว่าปรับเป็น 4 ห้องน้ำ
      kitchen: 1,
      living: 1,
      parking: 2
    },
    facilities: {
      pool: 1,
      fitness: 1,
    },
    code: "AO0050"
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-800">
      
      {/* --- Mobile Header / Nav --- */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center md:hidden">
         <button className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={20} />
         </button>
         <span className="font-semibold text-sm">Project</span>
         <button className="p-2 hover:bg-gray-100 rounded-full">
            <Share2 size={20} />
         </button>
      </div>

      {/* --- 1. Image Gallery Section --- */}
      <div className="max-w-6xl mx-auto p-0 md:p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:rounded-xl overflow-hidden h-64 md:h-96">
          {/* รูปใหญ่ */}
          <div className="md:col-span-2 relative bg-gray-200 h-full">
            <img src={property.images[0]} alt="Main Property" className="w-full h-full object-cover" />
          </div>
          {/* Grid รูปเล็ก */}
          <div className="hidden md:grid grid-cols-2 gap-2 md:col-span-2 h-full">
            {property.images.slice(1).map((img, index) => (
              <div key={index} className="relative bg-gray-200 h-full">
                 <img src={img} alt={`Detail ${index}`} className="w-full h-full object-cover" />
                 {index === 3 && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-black/60 transition">
                     <span className="flex items-center gap-2"><Home size={16}/> View All</span>
                   </div>
                 )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2. Header Info --- */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
             <div className="flex gap-2 mb-2">
                <span className="bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                  {property.tags[0]}
                </span>
             </div>
             <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
             <div className="flex items-center text-gray-500 text-sm mb-3">
               <MapPin size={16} className="mr-1" />
               {property.location}
             </div>
             <div className="flex gap-2 flex-wrap">
                <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-md font-medium">
                  {property.tags[1]}
                </span>
                 <span className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-md font-medium">
                  {property.tags[2]}
                </span>
             </div>
          </div>

          <div className="mt-6 md:mt-0 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{property.price}</div>
             {(property.originalPrice || property.discount) && (
               <div className="flex items-center md:justify-end gap-2 text-sm mt-1">
                  {property.originalPrice && <span className="text-gray-400 line-through">{property.originalPrice}</span>}
                  {property.discount && <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded text-xs">{property.discount}</span>}
               </div>
             )}
          </div>
        </div>

        <hr className="border-gray-100 my-6" />

        {/* --- 3. Description & Details --- */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-900">รายละเอียดทรัพย์</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
            {property.description}
          </p>
          
          <h3 className="text-sm font-bold mb-3 text-gray-800">รายการ Renovate & Highlight:</h3>
          <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 mb-8">
            {property.features.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatBox icon={<Ruler size={20} />} label="พื้นที่ดิน" value={property.specs.landSize} />
            <StatBox icon={<Layers size={20} />} label="พื้นที่ใช้สอย" value={property.specs.area} />
            <StatBox icon={<Home size={20} />} label="ชั้น" value={property.specs.floors} />
            <StatBox icon={<Tag size={20} />} label="ราคา/ตร.ม." value={property.specs.pricePerSqm} />
          </div>

          {/* Room & Facilities Breakdown */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">รหัสทรัพย์: {property.code}</div>
            <h3 className="text-sm font-semibold mb-4 text-gray-500">ข้อมูลห้อง & สิ่งอำนวยความสะดวก</h3>
            
            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
               {/* ห้อง */}
               <RoomItem icon={<Bed />} count={property.rooms.bedroom} label="ห้องนอน" />
               <RoomItem icon={<Bath />} count={property.rooms.bathroom} label="ห้องน้ำ" />
               <RoomItem icon={<Utensils />} count={property.rooms.kitchen} label="ห้องครัว" />
               <RoomItem icon={<Armchair />} count={property.rooms.living} label="ห้องนั่งเล่น" />
               <RoomItem icon={<Car />} count={property.rooms.parking} label="ที่จอดรถ" />
               
               {/* สิ่งอำนวยความสะดวก */}
               <RoomItem icon={<Waves />} count={property.facilities.pool} label="สระว่ายน้ำ" />
               <RoomItem icon={<Dumbbell />} count={property.facilities.fitness} label="ฟิตเนส" />
            </div>

             {/* Note เพิ่มเติม */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
              * ที่จอดรถ 2 คัน (Fix ล็อกตำแหน่ง)
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Project Info Card (Bottom) --- */}
       <div className="max-w-4xl mx-auto px-4 mb-8">
         <h3 className="font-bold mb-3 text-gray-900">ข้อมูลโครงการ</h3>
         <div className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center shadow-sm">
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
               <img src={property.images[0]} alt="Project Thumb" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">ชื่อโครงการ</div>
                <div className="font-semibold text-gray-900 truncate">The Dresden III (Prestige Towers)</div>
                <a href="#" className="text-xs text-blue-600 font-medium mt-1 inline-block">ดูรายละเอียดโครงการ &gt;</a>
            </div>
         </div>
       </div>

    </div>
  );
};

// Helper Component สำหรับกล่องสถิติ
const StatBox = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">
    <div className="text-gray-400 mt-0.5">{icon}</div>
    <div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="font-bold text-gray-900 text-sm">{value}</div>
    </div>
  </div>
);

// Helper Component สำหรับรายการห้อง
const RoomItem = ({ icon, count, label }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <span className="text-gray-400 w-5 h-5 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
    <span className="font-medium text-gray-900">{count}</span>
    <span className="text-gray-500 font-light">{label}</span>
  </div>
);

export default PropertyDetailPage;