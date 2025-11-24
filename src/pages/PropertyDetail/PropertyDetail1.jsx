import React from 'react';
import { MapPin, Share2, Bed, Bath, Home, Ruler, Layers, Tag, ArrowLeft } from 'lucide-react';

const PropertyDetailPage = () => {
  // Mock Data (จำลองข้อมูลให้ตรงกับรูปภาพ)
  const property = {
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿25,900,000",
    originalPrice: "฿29,900,000",
    discount: "-13%",
    tags: ["Renovated", "Single Detached House"],
    images: [
      "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg", // รูปหลัก
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_1_04_Aug_2025_1754297179386.jpeg",
      "https://img.homerunproptech.com/marketplace/marketplace_gallery_4_04_Aug_2025_1754297179389.jpeg",
      "	https://img.homerunproptech.com/marketplace/marketplace_gallery_15_04_Aug_2025_1754297179392.jpeg",
      "	https://img.homerunproptech.com/marketplace/marketplace_gallery_35_04_Aug_2025_1754297179398.jpeg",
    ],
    description: "บ้านเดี่ยวรีโนเวทใหม่ 3 ชั้น ใกล้ MRT พหลโยธิน และ BTS หมอชิต เดินทางง่าย ใกล้ห้าง-โรงเรียน-มหาวิทยาลัย พื้นที่ใช้สอย 375 ตร.ม. | 5 ห้องนอน 6 ห้องน้ำ | ที่จอดรถ 3 คัน \n\nปรับปรุงจากโครงสร้างเดิมด้วยวัสดุเกรดพรีเมียม สไตล์ Modern Contemporary พร้อมพื้นไม้ SPC ลายก้างปลาเอกลักษณ์ของ Homerun",
    features: [
      "ทาสีใหม่ทั้งหลัง (ใช้สีระบุรุ่นโปรเจคอบอุ่น)",
      "ปรับปรุงห้องน้ำใหม่ทุกห้อง พร้อมสุขภัณฑ์ใหม่",
      "เปลี่ยนประตูใหม่ทุกบาน",
      "ซ่อมหน้าต่าง พร้อมติดมุ้งลวดใหม่ทุกจุด",
      "ปูพื้นใหม่ด้วยไม้ SPC ทนทาน ดูแลยาก",
      "ตรวจสอบระบบไฟฟ้า ประปา ใหม่ทั้งระบบ"
    ],
    specs: {
      landSize: "51 ตารางวา",
      area: "375 ตารางเมตร",
      floors: "3",
      pricePerSqm: "507,843 ฿",
    },
    rooms: {
      bedroom: 5,
      bathroom: 6,
      living: 2,
      maid: 1,
      parking: 3,
      kitchen: 1,
      multipurpose: 1
    },
    code: "A00055"
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
          {/* Grid รูปเล็ก (ซ่อนในมือถือ แสดงบน PC) */}
          <div className="hidden md:grid grid-cols-2 gap-2 md:col-span-2 h-full">
            {property.images.slice(1).map((img, index) => (
              <div key={index} className="relative bg-gray-200 h-full">
                 <img src={img} alt={`Detail ${index}`} className="w-full h-full object-cover" />
                 {/* Overlay รูปสุดท้าย */}
                 {index === 3 && (
                   <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium cursor-pointer hover:bg-black/60 transition">
                     <span className="flex items-center gap-2"><Home size={16}/> 35+</span>
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
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                  {property.tags[0]}
                </span>
             </div>
             <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>
             <div className="flex items-center text-gray-500 text-sm mb-3">
               <MapPin size={16} className="mr-1" />
               {property.location}
             </div>
             <div className="flex gap-2 flex-wrap">
                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-md font-medium">
                  {property.tags[1]}
                </span>
                <span className="border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-md flex items-center gap-1">
                   5 Reviews
                </span>
                <span className="border border-gray-200 text-gray-500 text-xs px-3 py-1 rounded-md flex items-center gap-1">
                   6 Q&A
                </span>
             </div>
          </div>

          <div className="mt-6 md:mt-0 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{property.price}</div>
             <div className="flex items-center md:justify-end gap-2 text-sm mt-1">
                <span className="text-gray-400 line-through">{property.originalPrice}</span>
                <span className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded text-xs">{property.discount}</span>
             </div>
          </div>
        </div>

        <hr className="border-gray-100 my-6" />

        {/* --- 3. Description & Details --- */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-900">รายละเอียดทรัพย์</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">
            {property.description}
          </p>
          
          <h3 className="text-sm font-bold mb-3 text-gray-800">รายละเอียดการรีโนเวท:</h3>
          <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-2 mb-8">
            {property.features.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <StatBox icon={<Ruler size={20} />} label="พื้นที่ดิน" value={property.specs.landSize} />
            <StatBox icon={<Layers size={20} />} label="พื้นที่ใช้สอย" value={property.specs.area} />
            <StatBox icon={<Home size={20} />} label="จำนวนชั้น" value={property.specs.floors} />
            <StatBox icon={<Tag size={20} />} label="ราคา/ตร.วา" value={property.specs.pricePerSqm} />
          </div>

          {/* Room Breakdown */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">รหัสทรัพย์: {property.code}</div>
            <h3 className="text-sm font-semibold mb-4 text-gray-500">ข้อมูลห้อง</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">
               <RoomItem icon={<Bed />} count={property.rooms.bedroom} label="ห้องนอน" />
               <RoomItem icon={<Bath />} count={property.rooms.bathroom} label="ห้องน้ำ" />
               <RoomItem icon={<Home />} count={property.rooms.living} label="ห้องนั่งเล่น" />
               <RoomItem icon={<Tag />} count={property.rooms.multipurpose} label="ห้องอเนกประสงค์" />
               <RoomItem icon={<Home />} count={property.rooms.maid} label="ห้องแม่บ้าน" />
               <RoomItem icon={<Home />} count={property.rooms.parking} label="ที่จอดรถ" />
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Project Info Card (Bottom) --- */}
       <div className="max-w-4xl mx-auto px-4 mb-8">
         <h3 className="font-bold mb-3 text-gray-900">ข้อมูลโครงการ</h3>
         <div className="border border-gray-200 rounded-xl p-4 flex gap-4 items-center shadow-sm">
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
               <img src={property.images[1]} alt="Project Thumb" className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-500 mb-1">ชื่อโครงการ</div>
                <div className="font-semibold text-gray-900 truncate">The Amber at Chatuchak</div>
                <a href="#" className="text-xs text-blue-600 font-medium mt-1 inline-block">ดูรายละเอียดโครงการ &gt;</a>
            </div>
         </div>
       </div>

    </div>
  );
};

// Helper Component สำหรับกล่องสถิติ (สีเทา)
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