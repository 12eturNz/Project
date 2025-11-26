import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    AlertTriangle, Tag, Bed, Bath, MapPin, User, Phone, Mail, 
    Ruler, Layers, ShieldCheck, List, HardHat, Home,
    Maximize2 // ใช้สำหรับพื้นที่
} from "lucide-react"; 
import { motion } from "framer-motion";

// Helper Component สำหรับกล่องข้อมูลสำคัญขนาดใหญ่ (InfoBlock)
const InfoBlock = ({ title, value, unit, isPrice = false }) => (
    <div className={`p-4 rounded-lg border border-gray-200 shadow-sm ${isPrice ? 'bg-orange-50' : 'bg-gray-50'}`}>
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className={`text-xl font-bold ${isPrice ? 'text-red-700' : 'text-gray-900'}`}>
            {value || '-'} 
            <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>
        </div>
    </div>
);

// === Component: LoanCalculator (ระบบคำนวณสินเชื่อ) ===
const LoanCalculator = ({ price }) => {
    // ดึงตัวเลขราคาขายจาก string (เช่น "฿25,900,000" -> 25900000)
    const initialPrice = Number(price.replace(/[^0-9.]/g, ''));
    
    // สถานะเริ่มต้น: วงเงินกู้ 80%, อัตราดอกเบี้ย 7% ต่อปี, ระยะเวลา 30 ปี
    const [loanAmount, setLoanAmount] = useState(initialPrice * 0.8); 
    const [rate, setRate] = useState(7.0); 
    const [years, setYears] = useState(30); 

    // อัปเดตเมื่อราคาขายเปลี่ยนไป
    useEffect(() => {
        setLoanAmount(initialPrice * 0.8);
    }, [price]);

    // ฟังก์ชันคำนวณผ่อนต่อเดือน
    const calculateMonthlyPayment = () => {
        if (loanAmount <= 0 || rate <= 0 || years <= 0) return 0;

        const monthlyRate = (rate / 100) / 12; // อัตราดอกเบี้ยต่อเดือน
        const numPayments = years * 12; // จำนวนงวดทั้งหมด

        // สูตรคำนวณผ่อนต่อเดือน (M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ])
        const monthlyPayment = loanAmount * monthlyRate * Math.pow((1 + monthlyRate), numPayments) / (Math.pow((1 + monthlyRate), numPayments) - 1);
        
        return monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();

    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#bfa074]"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 8v4l3 3"/></svg>
                คำนวณสินเชื่อ
            </h3>

            <div className="space-y-4 text-sm">
                
                {/* ราคาขาย */}
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">ราคาขาย</span>
                    <span className="font-semibold text-gray-800">{price}</span>
                </div>

                {/* วงเงินกู้ */}
                <div>
                    <label className="block text-gray-700 mb-1">วงเงินกู้ (บาท)</label>
                    <input 
                        type="number" 
                        value={Math.round(loanAmount)} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-[#bfa074] focus:border-[#bfa074]"
                        min="0" max={initialPrice}
                    />
                    <div className="text-xs text-gray-500 mt-1">เงินดาวน์: {new Intl.NumberFormat('th-TH').format(initialPrice - loanAmount)} ฿</div>
                </div>

                {/* อัตราดอกเบี้ย */}
                <div>
                    <label className="block text-gray-700 mb-1">อัตราดอกเบี้ย (% ต่อปี)</label>
                    <input 
                        type="number" 
                        step="0.1" 
                        value={rate} 
                        onChange={(e) => setRate(Number(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-[#bfa074] focus:border-[#bfa074]"
                        min="0.1"
                    />
                </div>

                {/* ระยะเวลาผ่อน */}
                <div>
                    <label className="block text-gray-700 mb-1">ระยะเวลาผ่อน (ปี)</label>
                    <input 
                        type="number" 
                        value={years} 
                        onChange={(e) => setYears(Number(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-[#bfa074] focus:border-[#bfa074]"
                        min="1" max="30"
                    />
                </div>
            </div>

            {/* ผลการคำนวณ */}
            <div className="mt-6 p-4 bg-[#f7f5ee] rounded-xl text-center border-2 border-[#bfa074]">
                <div className="text-sm font-medium text-gray-700">ประมาณผ่อนต่อเดือน</div>
                <div className="text-3xl font-extrabold text-[#bfa074] mt-1">
                    {new Intl.NumberFormat('th-TH', { 
                        style: 'currency', 
                        currency: 'THB', 
                        minimumFractionDigits: 0 
                    }).format(monthlyPayment)}
                </div>
            </div>
        </div>
    );
};
// =================================================================


const PropertyDetailNew = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // จำลองข้อมูลเพิ่มเติมที่ไม่มาจาก RegisterForm.jsx
    const dummyData = {
        project: "The Amber at Chatuchak",
        projectLogo: "https://via.placeholder.com/100x100?text=Project+Logo",
        description: "บ้านเดี่ยวสร้างใหม่ ย่านจตุจักร ใกล้ MRT พหลโยธิน และ BTS หมอชิต เดินทางสะดวก โอบล้อม มหาวิทยาลัย, ห้างสรรพสินค้า พื้นที่ใช้สอย 375 ตร.ม. | 5 ห้องนอน | 6 ห้องน้ำ | ที่ดิน 31 ตร.ว.",
        features: [
            "การดีไซน์ทันสมัย (ใช้การดีไซน์แบบ Modern Contemporary พลังงานแสงอาทิตย์)",
            "ทำเลดีเยี่ยมใกล้ใจกลางเมือง พร้อมแหล่งช้อปปิ้งใหม่",
            "เดินทางได้สะดวกสบาย (ใกล้ทางด่วน)",
            "ระบบรักษาความปลอดภัย 24 ชั่วโมง",
            "วัสดุก่อสร้างคุณภาพดีเยี่ยม"
        ]
    };

    const loadPropertyDetails = () => {
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            const currentProperty = userListings[0]; 

            if (!currentProperty) {
                setError("ไม่พบรายการทรัพย์สินนี้ (อาจถูกลบไปแล้ว)");
                setProperty(null);
                setTimeout(() => {
                    navigate('/PropertyGrid'); 
                }, 3000); 
            } else {
                 if (!currentProperty.price) {
                     currentProperty.price = "฿0";
                }
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
        loadPropertyDetails();
        const handleListingUpdate = () => {
            loadPropertyDetails(); 
        };
        window.addEventListener('listings-updated', handleListingUpdate);
        return () => {
            window.removeEventListener('listings-updated', handleListingUpdate);
        };
    }, []); 

    if (loading) {
        return <div className="min-h-screen bg-gray-100 text-center py-20 text-gray-500">กำลังโหลดรายละเอียด...</div>;
    }

    if (error || !property) {
        return (
            <div className="min-h-screen bg-gray-100"> 
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-20 bg-red-50 rounded-xl m-8 shadow-inner max-w-4xl mx-auto"
                >
                    <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-red-700">รายการไม่พบ</h2>
                    <p className="text-red-600 mt-2">{error}</p>
                    <p className="text-sm text-red-500 mt-4">กำลังนำคุณกลับสู่หน้าประกาศหลัก...</p>
                </motion.div>
            </div>
        );
    }

    // --- แสดงรายละเอียดทรัพย์สิน ---
    const defaultImage = "https://via.placeholder.com/600x400?text=Image+Not+Available";
    const tags = ['Single Detached House', '5 reviews', '4 Q&A'];

    // คำนวณราคาต่อ ตร.ม. สำหรับกล่องที่สาม (สมมติว่าราคาต่อ ตร.ม. คือ 507,842 ฿ ตามภาพ)
    const pricePerSqm = '507,842'; 
    const pricePerSqmUnit = '฿/ตร.ม.';


    return (
        <div className="min-h-screen bg-gray-100 pb-10"> 
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto p-4 md:p-8 my-10 bg-white rounded-xl shadow-lg border border-gray-100" 
            >
                {/* 1. ส่วนรูปภาพหลัก (ทำ Layout ให้เหมือนภาพเป๊ะๆ) */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[500px]">
                    {/* รูปภาพใหญ่ (รูปแรก) - คลุมพื้นที่ 2x2 ฝั่งซ้าย */}
                    <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-md">
                        <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                        />
                    </div>
                    {/* รูปภาพย่อย 4 รูป (จัดเรียง 2x2 ฝั่งขวา) */}
                    <div className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/300x250?text=Interior+1" alt="Interior 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/300x250?text=Interior+2" alt="Interior 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/300x250?text=Interior+3" alt="Interior 3" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-1 row-span-1 rounded-xl overflow-hidden shadow-md">
                        <img src="https://via.placeholder.com/300x250?text=Interior+4" alt="Interior 4" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* 2. ส่วนรายละเอียดหลัก & คอลัมน์ด้านข้าง */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                    
                    {/* คอลัมน์ซ้าย (รายละเอียด) - 2/3 ส่วน */}
                    <div className="lg:col-span-2">
                        {/* Title & Price & Tags */}
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-3xl font-extrabold text-gray-900">
                                {dummyData.project}
                            </h2>
                            
                            <p className="text-3xl font-bold text-gray-900 mt-3 flex items-baseline gap-3">
                                {property.price}
                                {/* จำลอง % ลดราคา ตามภาพต้นฉบับ */}
                                <span className="text-base font-normal text-red-600 ml-2">-11%</span> 
                            </p>
                            
                            {/* Tags/Labels */}
                            <div className="flex gap-2 mt-2">
                                {/* Tag แรกเป็นสีเข้ม */}
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-700 text-white">{property.type}</span>
                                {/* Tags อื่นๆ เป็นสีเทา */}
                                {tags.map((tag, index) => (
                                    <span key={index} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-700">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* รายละเอียดทรัพย์ */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                                <List size={20} className="text-[#bfa074]" /> รายละเอียดทรัพย์
                            </h3>
                            <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                {dummyData.description}
                            </p>
                            
                            <h4 className="font-semibold text-gray-800 mt-4 mb-2">จุดเด่นโครงการ/ทรัพย์สิน</h4>
                            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 ml-4">
                                {dummyData.features.map((feature, index) => <li key={index}>{feature}</li>)}
                            </ul>
                        </div>

                        {/* กล่องข้อมูลสำคัญ (Key Stats) - เหมือนในภาพเป๊ะ */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Ruler size={20} className="text-gray-500" /> พื้นที่
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <InfoBlock title="พื้นที่ดิน" value={property.land} unit="ตร.ว." />
                            <InfoBlock title="พื้นที่ใช้สอย" value={property.area} unit="ตารางเมตร" />
                            <InfoBlock title="ราคาต่อตารางเมตร" value={pricePerSqm} unit={pricePerSqmUnit} isPrice={true} />
                        </div>
                        
                        {/* ข้อมูลเบื้องต้น (Basic Info) */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Bed size={20} className="text-gray-500" /> ข้อมูลเบื้องต้น
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-8">
                            <div className="flex items-center gap-2">
                                <Bed size={16} className="text-gray-500" /> ห้องนอน: <span className="font-semibold text-gray-900">{property.beds || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bath size={16} className="text-gray-500" /> ห้องน้ำ: <span className="font-semibold text-gray-900">{property.baths || '-'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Ruler size={16} className="text-gray-500" /> พื้นที่ใช้สอย: <span className="font-semibold text-gray-900">{property.area || '-'} ตร.ม.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers size={16} className="text-gray-500" /> ขนาดที่ดิน: <span className="font-semibold text-gray-900">{property.land || '-'} วา</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag size={16} className="text-gray-500" /> รหัสทรัพย์: <span className="font-semibold text-gray-900">A00355</span>
                            </div>
                        </div>

                        {/* ข้อมูลโครงการ (ถูกจัดให้อยู่คอลัมน์ซ้ายตามภาพ) */}
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <HardHat size={20} className="text-[#bfa074]" /> ข้อมูลโครงการ
                            </h3>
                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                                <img src={dummyData.projectLogo} alt="Project Thumb" className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <div className="text-sm text-gray-500">โครงการ</div>
                                    <div className="font-semibold text-gray-800">{dummyData.project}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* คอลัมน์ขวา (ติดต่อ & สินเชื่อ) - 1/3 ส่วน */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* กล่องติดต่อผู้โพสต์ (ลบ sticky top-8 ออกไป เพื่อแก้ปัญหาการบังเนื้อหา) */}
                        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <User size={20} className="text-[#bfa074]" /> ติดต่อผู้โพสต์
                            </h3>
                            <p className="text-lg font-semibold text-gray-900 mb-4">{property.owner || 'ไม่ระบุ'}</p>
                            
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                    <Phone size={20} className="text-green-600 flex-shrink-0"/>
                                    <div>
                                        <div className="text-xs text-gray-500">โทรศัพท์</div>
                                        <div className="font-medium text-gray-800">{property.ownerPhone || '-'}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                    <Mail size={20} className="text-blue-600 flex-shrink-0"/>
                                    <div>
                                        <div className="text-xs text-gray-500">อีเมล</div>
                                        <div className="font-medium text-gray-800">{property.ownerEmail || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* === ระบบคำนวณสินเชื่อ Realtime === */}
                        {property.price && <LoanCalculator price={property.price} />} 
                        {/* ============================================== */}
                    </div>
                </div>
                
                {/* ข้อมูลสิ่งอำนวยความสะดวก (ย้ายมาไว้ข้างล่างสุดของคอลัมน์ซ้าย) */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-[#bfa074]" /> สิ่งอำนวยความสะดวก
                    </h3>
                    <p className="text-gray-700">{property.facilities || 'ไม่ระบุสิ่งอำนวยความสะดวก'}</p>
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyDetailNew;