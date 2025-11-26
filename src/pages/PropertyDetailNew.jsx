import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, AlertTriangle, Phone, Mail, Tag, Ruler, Layers } from "lucide-react"; // 💡 เพิ่ม Tag, Ruler, Layers
import { motion } from "framer-motion";

// Helper Component สำหรับกล่องสถิติ (สีเทา)
// นำมาจาก PropertyDetail1.jsx เพื่อความสม่ำเสมอ
const StatBox = ({ icon: Icon, label, value }) => (
    <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3 border border-gray-200">
        <div className="text-[#bfa074] mt-0.5">{Icon}</div> {/* 💡 เปลี่ยนสี Icon เป็น #bfa074 */}
        <div>
            <div className="text-xs text-gray-500 mb-0.5">{label}</div>
            <div className="font-bold text-gray-900 text-sm">{value || '-'}</div> {/* 💡 ป้องกันค่าว่าง */}
        </div>
    </div>
);


const PropertyDetailNew = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 🔑 ฟังก์ชันหลัก: โหลดและตรวจสอบสถานะทรัพย์สิน ---
    const loadPropertyDetails = () => {
        // ... (โค้ดดึงข้อมูลจาก localStorage เดิม) ...
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            
            // โหลดรายการแรกสุดที่ผู้ใช้เพิ่งโพสต์
            const currentProperty = userListings[0]; 

            if (!currentProperty) {
                setError("ไม่พบรายการทรัพย์สินนี้ (อาจถูกลบไปแล้ว)");
                setProperty(null);
                
                setTimeout(() => {
                    navigate('/PropertyGrid'); 
                }, 3000); 
                
            } else {
                setProperty(currentProperty);
                setError(null);
            }
        } catch (e) {
            console.error("Error loading property from localStorage:", e);
            setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        }
        setLoading(false);
    };


    useEffect(() => {
        // ... (โค้ด useEffect เดิมสำหรับการโหลดและ Listener) ...
        loadPropertyDetails();

        const handleListingUpdate = () => {
            console.log("Listings updated event received. Re-checking property status...");
            loadPropertyDetails(); 
        };
        
        window.addEventListener('listings-updated', handleListingUpdate);

        return () => {
            window.removeEventListener('listings-updated', handleListingUpdate);
        };
    }, []); 

    // --- ส่วนแสดงผล ---
    if (loading) {
        return <div className="text-center py-20 text-gray-500">กำลังโหลดรายละเอียด...</div>;
    }

    if (error || !property) {
        // ... (โค้ด Error เดิม) ...
        return (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 bg-red-50 rounded-xl m-8 shadow-inner"
            >
                <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-700">รายการไม่พบ</h2>
                <p className="text-red-600 mt-2">{error}</p>
                <p className="text-sm text-red-500 mt-4">กำลังนำคุณกลับสู่หน้าประกาศหลัก...</p>
            </motion.div>
        );
    }

    // --- แสดงรายละเอียดทรัพย์สิน ---
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // 💡 ปรับ Style หลักให้ดูเข้ากับ PropertyDetail1
            className="max-w-6xl mx-auto p-4 md:p-8 my-10 bg-white rounded-xl shadow-lg border border-gray-100" 
        >
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 border-b pb-2"> {/* 💡 เปลี่ยนสีเป็น text-gray-900 */}
                {property.title} <span className="text-lg font-medium text-gray-500">({property.tag})</span>
            </h1>
            
            <p className="text-xl font-bold text-red-600 my-4 flex items-center gap-2">
                <Tag size={20} className="text-red-600"/> {property.price}
            </p>

            {/* ส่วนสถิติหลัก (ใช้ StatBox component) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatBox icon={<Home size={20} />} label="ประเภท" value={property.type} />
                <StatBox icon={<Bed size={20} />} label="ห้องนอน" value={property.beds} />
                <StatBox icon={<Bath size={20} />} label="ห้องน้ำ" value={property.baths} />
                <StatBox icon={<MapPin size={20} />} label="ที่ตั้ง" value={property.location} />
                <StatBox icon={<Ruler size={20} />} label="พื้นที่ใช้สอย (ตร.ม.)" value={property.area} />
                <StatBox icon={<Layers size={20} />} label="ขนาดที่ดิน (วา)" value={property.land} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                
                <div className="md:col-span-2">
                    <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-auto object-cover rounded-xl shadow-lg" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = "https://via.placeholder.com/1200x800?text=Image+Not+Available";
                        }}
                    />
                    
                    {/* ข้อมูลสิ่งอำนวยความสะดวก */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-[#bfa074]" /> สิ่งอำนวยความสะดวก
                        </h3>
                        <p className="text-gray-700">{property.facilities || 'ไม่ระบุสิ่งอำนวยความสะดวก'}</p>
                    </div>
                </div>
                
                {/* ข้อมูลติดต่อ (คอลัมน์ขวา) */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                            <User size={20} className="text-[#bfa074]" /> ติดต่อผู้โพสต์
                        </h3>
                        
                        <p className="text-lg font-semibold text-gray-900 mb-4">{property.owner || 'ไม่ระบุ'}</p>
                        
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                <Phone size={20} className="text-green-600 flex-shrink-0"/>
                                <div>
                                    <div className="text-xs text-gray-500">โทรศัพท์</div>
                                    <div className="font-medium text-gray-800">{property.ownerPhone || '-'}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                                <Mail size={20} className="text-blue-600 flex-shrink-0"/>
                                <div>
                                    <div className="text-xs text-gray-500">อีเมล</div>
                                    <div className="font-medium text-gray-800">{property.ownerEmail || '-'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyDetailNew;