import React from 'react';

import { 

  MapPin, Share2, Bed, Bath, Home, Ruler, Layers, Tag, ArrowLeft, 

  Utensils, Armchair, Waves, Dumbbell, Shirt, Car 

} from 'lucide-react';



const PropertyDetailPage = () => {

  // Mock Data (อัปเดตราคาและส่วนลด)

  const property = {

    title: "Onyx Home at Ladprao 71",

    location: "นาคนิวาส 48",

    price: "฿6,790,000", // ราคาขาย

    originalPrice: "฿8,900,000", // ราคาก่อนลด

    discount: "-24%", // ส่วนลด

    tags: ["Townhome", "Renovated", "Modern Loft"],

    images: [

      "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_06_Oct_2024_1728222954696.jpeg", // รูป Placeholder

      "https://img.homerunproptech.com/marketplace/marketplace_gallery_1_06_Oct_2024_1728222954698.jpeg",

      "https://img.homerunproptech.com/marketplace/marketplace_gallery_6_06_Oct_2024_1728222954705.jpeg ",

      "https://img.homerunproptech.com/marketplace/marketplace_gallery_18_06_Oct_2024_1728222954718.jpeg",

      "https://img.homerunproptech.com/marketplace/marketplace_gallery_11_06_Oct_2024_1728222954711.jpeg",

    ],

    description: `"Onyx Home at Ladprao-Nakniwat" ทาวน์โฮมรีโนเวทใหม่สไตล์ Modern Loft ที่ผสมผสานกันได้อย่างลงตัว Hidden Gem ในย่านลาดพร้าว-นาคนิวาส

    

    Homerun Flagship Series: รีโนเวทแบบจัดเต็ม เปลี่ยนระบบน้ำ-ไฟใหม่ทั้งหลัง ตกแต่งพร้อมอยู่ เชื่อมต่อทางด่วนรามอินทรา-อาจณรงค์ และใกล้ห้าง Central Eastville`,

    

    features: [ 

      "ทาวน์โฮม 3 ชั้น หน้ากว้าง ถนนหน้าโครงการ 8 เมตร",

      "4 ห้องนอน สไตล์ Penthouse Loft มีชั้นลอยในห้อง",

      "5 ห้องน้ำ แบ่งเป็นสัดส่วน ไม่ต้องแย่งกันใช้",

      "รีโนเวทใหม่ทั้งหลัง ระบบน้ำ-ไฟพร้อมเข้าอยู่",

      "ใกล้ MRT โชคชัย 4 และ ทางด่วนรามอินทรา",

      "รายล้อมด้วยห้างสรรพสินค้าและของกินมากมาย"

    ],

    specs: {

      landSize: "24.9 ตร.วา", 

      area: "206 ตารางเมตร",

      floors: "3",

      pricePerUnit: "272,691 ฿", 

      priceUnitLabel: "ราคา/ตร.วา" 

    },

    rooms: {

      bedroom: 4,

      bathroom: 5,

      kitchen: 1,

      living: 1,

      laundry: 1 

    },

    facilities: {

      pool: 0,

      fitness: 0,

      park: 0, 

      sauna: 0

    },

    code: "AO0003"

  };



  return (

    <div className="bg-white min-h-screen pb-20 font-sans text-gray-800">

      

      {/* --- Mobile Header --- */}

      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center md:hidden">

         <button className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft size={20} /></button>

         <span className="font-semibold text-sm">Project</span>

         <button className="p-2 hover:bg-gray-100 rounded-full"><Share2 size={20} /></button>

      </div>



      {/* --- 1. Image Gallery --- */}

      <div className="max-w-6xl mx-auto p-0 md:p-4">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:rounded-xl overflow-hidden h-64 md:h-96">

          <div className="md:col-span-2 relative bg-gray-200 h-full">

            <img src={property.images[0]} alt="Main Property" className="w-full h-full object-cover" />

          </div>

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

                <span className="bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">

                  {property.tags[0]}

                </span>

                <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">

                  {property.tags[2]}

                </span>

             </div>

             <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{property.title}</h1>

             <div className="flex items-center text-gray-500 text-sm mb-3">

               <MapPin size={16} className="mr-1" />

               {property.location}

             </div>

          </div>



          <div className="mt-6 md:mt-0 text-left md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">

            <div className="text-2xl md:text-3xl font-bold text-gray-900">{property.price}</div>

             

             {/* ส่วนแสดงราคาเดิมและส่วนลด (จะแสดงเพราะมีข้อมูลแล้ว) */}

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

          

          <h3 className="text-sm font-bold mb-3 text-gray-800">Highlight:</h3>

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

            <StatBox icon={<Tag size={20} />} label={property.specs.priceUnitLabel} value={property.specs.pricePerUnit} />

          </div>



          {/* Room & Facilities Breakdown */}

          <div className="mb-8">

            <div className="text-xs text-gray-400 mb-2">รหัสทรัพย์: {property.code}</div>

            <h3 className="text-sm font-semibold mb-4 text-gray-500">ข้อมูลห้อง & สิ่งอำนวยความสะดวก</h3>

            

            <div className="grid grid-cols-2 gap-y-4 text-sm text-gray-700">

               <RoomItem icon={<Bed />} count={property.rooms.bedroom} label="ห้องนอน" />

               <RoomItem icon={<Bath />} count={property.rooms.bathroom} label="ห้องน้ำ" />

               <RoomItem icon={<Utensils />} count={property.rooms.kitchen} label="ห้องครัว" />

               <RoomItem icon={<Armchair />} count={property.rooms.living} label="ห้องนั่งเล่น" />

               

               {property.rooms.laundry > 0 && (

                 <RoomItem icon={<Shirt />} count={property.rooms.laundry} label="ห้องซักรีด" />

               )}

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

                <div className="font-semibold text-gray-900 truncate">Onyx Home at Ladprao-Nakniwat</div>

                <div className="text-xs text-gray-500 mt-1">Townhome Renovation Project</div>

            </div>

         </div>

       </div>



    </div>

  );

};



const StatBox = ({ icon, label, value }) => (

  <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3">

    <div className="text-gray-400 mt-0.5">{icon}</div>

    <div>

      <div className="text-xs text-gray-500 mb-0.5">{label}</div>

      <div className="font-bold text-gray-900 text-sm">{value}</div>

    </div>

  </div>

);



const RoomItem = ({ icon, count, label }) => (

  <div className="flex items-center gap-2 text-gray-600">

    <span className="text-gray-400 w-5 h-5 [&>svg]:w-4 [&>svg]:h-4">{icon}</span>

    <span className="font-medium text-gray-900">{count}</span>

    <span className="text-gray-500 font-light">{label}</span>

  </div>

);



export default PropertyDetailPage;