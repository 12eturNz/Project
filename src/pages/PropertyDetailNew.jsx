import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    AlertTriangle, Tag, Bed, Bath, MapPin, User, Phone, Mail, 
    Ruler, Layers, ShieldCheck, List, HardHat, Home,
    Maximize2, Edit3, X, Save 
} from "lucide-react"; 
import { motion } from "framer-motion";

// --- 💡 Helper Functions for Numeric Formatting ---

// Helper to clean input for storage (removes commas and non-digit/dot characters)
const cleanNumber = (numStr) => {
    if (numStr === null || numStr === undefined) return '';
    return String(numStr).replace(/[^\d.]/g, '');
};

// Helper to format number for display (adds commas)
const formatNumber = (numStr) => {
    const cleaned = cleanNumber(numStr);
    if (!cleaned) return '';
    
    // Check if it's a valid number before formatting
    if (isNaN(Number(cleaned))) return cleaned;

    const parts = cleaned.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    return formattedInteger + decimalPart;
};

// --- End Helper Functions ---


// Helper Component สำหรับกล่องข้อมูลสำคัญขนาดใหญ่ (InfoBlock)
const InfoBlock = ({ title, value, unit, isPrice = false }) => (
// ... (InfoBlock component code remains the same)
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
    // Note: ใช้ cleanNumber เพื่อให้แน่ใจว่าราคาที่ส่งมาคำนวณเป็นตัวเลขเท่านั้น
    const initialPrice = Number(cleanNumber(price)); 
    
    // ... (LoanCalculator component code remains the same)
    const [loanAmount, setLoanAmount] = useState(initialPrice * 0.8); 
    const [rate, setRate] = useState(7.0); 
    const [years, setYears] = useState(30); 

    // อัปเดตเมื่อราคาขายเปลี่ยนไป
    useEffect(() => {
        setLoanAmount(initialPrice * 0.8);
    }, [price]);

    // ฟังก์ชันคำนวณผ่อนต่อเดือน
    const calculateMonthlyPayment = () => {
        // ... (calculation logic remains the same)
        if (loanAmount <= 0 || rate <= 0 || years <= 0) return 0;

        const monthlyRate = (rate / 100) / 12; // อัตราดอกเบี้ยต่อเดือน
        const numPayments = years * 12; // จำนวนงวดทั้งหมด

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
                    <span className="font-semibold text-gray-800">฿{formatNumber(initialPrice)}</span>
                </div>

                {/* วงเงินกู้ */}
                <div>
                    <label className="block text-gray-700 mb-1">วงเงินกู้ (บาท)</label>
                    {/* Note: Input for loan amount/rate/years can remain type="number" or type="text" 
                       depending on desired UX. Keeping as type="number" for ease of use in this context. */}
                    <input 
                        type="number" 
                        value={Math.round(loanAmount)} 
                        onChange={(e) => setLoanAmount(Number(e.target.value))} 
                        className="w-full px-3 py-2 border rounded-lg text-gray-900 focus:ring-[#bfa074] focus:border-[#bfa074]"
                        min="0" max={initialPrice}
                    />
                    <div className="text-xs text-gray-500 mt-1">เงินดาวน์: {new Intl.NumberFormat('th-TH').format(initialPrice - loanAmount)} ฿</div>
                </div>
                {/* ... (Rate and Years inputs remain the same) */}
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
    
    const [isEditing, setIsEditing] = useState(false);
    const [editableProperty, setEditableProperty] = useState(null);
    const [userRole, setUserRole] = useState('Agent'); 

    const initialDummyData = {
        project: "The Amber at Chatuchak",
        description: "บ้านเดี่ยวสร้างใหม่ ย่านจตุจักร ใกล้ MRT พหลโยธิน และ BTS หมอชิต เดินทางสะดวก โอบล้อม มหาวิทยาลัย, ห้างสรรพสินค้า พื้นที่ใช้สอย 375 ตร.ม. | 5 ห้องนอน | 6 ห้องน้ำ | ที่ดิน 31 ตร.ว.",
        features: [
            "การดีไซน์ทันสมัย (ใช้การดีไซน์แบบ Modern Contemporary พลังงานแสงอาทิตย์)",
            "ทำเลดีเยี่ยมใกล้ใจกลางเมือง พร้อมแหล่งช้อปปิ้งใหม่",
            "เดินทางได้สะดวกสบาย (ใกล้ทางด่วน)",
            "ระบบรักษาความปลอดภัย 24 ชั่วโมง",
            "วัสดุก่อสร้างคุณภาพดีเยี่ยม"
        ].join('\n') 
    };

    const loadPropertyDetails = () => {
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            const currentProperty = userListings[0]; 

            if (!currentProperty) {
                // ... error handling
                setError("ไม่พบรายการทรัพย์สินนี้ (อาจถูกลบไปแล้ว)");
                setProperty(null);
                setTimeout(() => {
                    navigate('/PropertyGrid'); 
                }, 3000); 
            } else {
                 if (!currentProperty.price) {
                     currentProperty.price = "฿0";
                }
                
                // 💡 ทำความสะอาดข้อมูลตัวเลขตั้งแต่โหลด เพื่อเตรียมพร้อมสำหรับการแก้ไข
                const finalProperty = {
                    ...currentProperty,
                    project: currentProperty.project || initialDummyData.project,
                    description: currentProperty.description || initialDummyData.description,
                    features: currentProperty.features || initialDummyData.features,
                    owner: currentProperty.owner || 'Agent Name',
                    ownerPhone: currentProperty.ownerPhone || '090-XXX-XXXX',
                    ownerEmail: currentProperty.ownerEmail || 'agent@example.com',
                    // Clean numerical fields to ensure only digits are stored
                    price: cleanNumber(currentProperty.price || '0'), // Store only number part of price
                    land: cleanNumber(currentProperty.land || '0'),
                    area: cleanNumber(currentProperty.area || '0'),
                    beds: cleanNumber(currentProperty.beds || '0'),
                    baths: cleanNumber(currentProperty.baths || '0'),
                };

                setProperty(finalProperty);
                setEditableProperty({ ...finalProperty }); 
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
        
        const storedRole = localStorage.getItem('userRole'); 
        if (storedRole) {
            setUserRole(storedRole);
        }

        return () => {
            window.removeEventListener('listings-updated', handleListingUpdate);
        };
    }, []); 

    // --- 💡 Handlers สำหรับการแก้ไขใหม่ ---
    
    // Handler สำหรับช่องข้อความทั่วไป
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setEditableProperty(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    // Handler สำหรับตัวเลขที่ต้องการ Comma Separator (Price, Land, Area)
    const handleNumericChange = (e) => {
        const { name, value } = e.target;
        // 1. Clean the input value (remove commas) to get the true number for state storage
        const cleanedValue = cleanNumber(value);

        // 2. Update state with the clean value
        setEditableProperty(prev => ({
            ...prev,
            [name]: cleanedValue,
        }));
    };
    
    // Handler สำหรับตัวเลขที่เป็นจำนวนเต็มขนาดเล็ก (Beds, Baths)
    const handleIntegerChange = (e) => {
        const { name, value } = e.target;
        // Ensure it's a valid integer or empty
        const integerValue = String(value).replace(/[^\d]/g, ''); 
        
        setEditableProperty(prev => ({
            ...prev,
            [name]: integerValue,
        }));
    };

    // --- 💡 Handler Logic (Edit, Save, Cancel) Remains the Same ---
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableProperty(property); 
    };
    
    const handleSave = () => {
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            const index = userListings.findIndex((_, i) => i === 0); 
            
            if (index > -1) {
                // Ensure numerical fields are saved as clean strings
                const propertyToSave = {
                    ...editableProperty,
                    // Note: Price, Land, Area are already cleaned in handleNumericChange, but double check.
                    price: cleanNumber(editableProperty.price || '0'), 
                    land: cleanNumber(editableProperty.land || '0'),
                    area: cleanNumber(editableProperty.area || '0'),
                    beds: cleanNumber(editableProperty.beds || '0'),
                    baths: cleanNumber(editableProperty.baths || '0'),
                };

                userListings[index] = propertyToSave;
                localStorage.setItem('userListings', JSON.stringify(userListings));
                
                setProperty(propertyToSave);
                setIsEditing(false);

                alert('บันทึกข้อมูลทรัพย์สินเรียบร้อยแล้ว!');
            } else {
                alert('ไม่พบรายการทรัพย์สินที่จะบันทึก!');
            }
        } catch (e) {
            console.error("Error saving property:", e);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };
    // --- End Handler Logic ---


    if (loading) {
        return <div className="min-h-screen bg-gray-100 text-center py-20 text-gray-500">กำลังโหลดรายละเอียด...</div>;
    }

    if (error || !property) {
        // ... (Error handling remains the same)
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

    const defaultImage = "https://via.placeholder.com/600x400?text=Image+Not+Available";
    const tags = ['Single Detached House', '5 reviews', '4 Q&A'];
    
    const pricePerSqm = '507,842'; 
    const pricePerSqmUnit = '฿/ตร.ม.';
    const featuresList = (property.features || initialDummyData.features).split('\n');


    return (
        <div className="min-h-screen bg-gray-100 pb-10"> 
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto p-4 md:p-8 my-10 bg-white rounded-xl shadow-lg border border-gray-100" 
            >
                {/* 1. ส่วนรูปภาพหลัก (Remains the same) */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[500px]">
                    {/* ... (Image grid code remains the same) */}
                    <div className="col-span-2 row-span-2 rounded-xl overflow-hidden shadow-md">
                        <img 
                            src={property.image} 
                            alt={property.project} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
                        />
                    </div>
                    {/* ... (Smaller images code remains the same) */}
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
                        <div className="border-b pb-4 mb-4 flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900">
                                    {/* Project Name (Editable) */}
                                    {isEditing ? (
                                        <input 
                                            type="text" 
                                            name="project"
                                            value={editableProperty?.project || ''} 
                                            onChange={handleTextChange}
                                            className="border-b border-gray-300 focus:border-[#bfa074] text-3xl font-extrabold text-gray-900 w-full"
                                            placeholder="ชื่อโครงการ"
                                        />
                                    ) : (
                                        property.project
                                    )}
                                </h2>
                                
                                <p className="text-3xl font-bold text-gray-900 mt-3 flex items-baseline gap-3">
                                    {/* Price (Editable) 💡 ใช้ handleNumericChange และ formatNumber */}
                                    {isEditing ? (
                                        <div className="flex items-center">
                                            <span className="mr-1">฿</span>
                                            <input 
                                                type="text" // Must be text to allow comma display
                                                name="price"
                                                // Display formatted number
                                                value={formatNumber(editableProperty?.price || '')} 
                                                onChange={handleNumericChange}
                                                className="border-b border-gray-300 focus:border-[#bfa074] text-3xl font-bold text-gray-900 w-48"
                                                placeholder="XX,XXX,XXX"
                                            />
                                        </div>
                                    ) : (
                                        `฿${formatNumber(property.price)}` // Display formatted
                                    )}
                                    <span className="text-base font-normal text-red-600 ml-2">-11%</span> 
                                </p>
                                
                                {/* Tags/Labels */}
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-700 text-white">
                                        {/* Type (Editable) */}
                                        {isEditing ? (
                                            <input 
                                                type="text" 
                                                name="type"
                                                value={editableProperty?.type || ''} 
                                                onChange={handleTextChange}
                                                className="bg-transparent text-white w-20 text-center"
                                            />
                                        ) : property.type}
                                    </span>
                                    {tags.map((tag, index) => (
                                        <span key={index} className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-200 text-gray-700">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* 💡 ปุ่มแก้ไข/บันทึก/ยกเลิก (Remains the same) */}
                            {userRole === 'Agent' && (
                                <div className="flex gap-2 flex-shrink-0">
                                    {!isEditing ? (
                                        <button 
                                            onClick={handleEdit} 
                                            className="flex items-center gap-1 px-4 py-2 bg-[#bfa074] text-white text-sm font-medium rounded-lg hover:bg-[#a38c64] transition duration-200"
                                        >
                                            <Edit3 size={16} />
                                            แก้ไข
                                        </button>
                                    ) : (
                                        <>
                                            <button 
                                                onClick={handleSave} 
                                                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition duration-200"
                                            >
                                                <Save size={16} />
                                                บันทึก
                                            </button>
                                            <button 
                                                onClick={handleCancel} 
                                                className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition duration-200"
                                            >
                                                <X size={16} />
                                                ยกเลิก
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* รายละเอียดทรัพย์ */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2 border-b pb-2">
                                <List size={20} className="text-[#bfa074]" /> รายละเอียดทรัพย์
                            </h3>
                            {/* Description (Editable) */}
                            {isEditing ? (
                                <textarea
                                    name="description"
                                    value={editableProperty?.description || ''}
                                    onChange={handleTextChange}
                                    className="w-full p-3 border rounded-lg text-gray-700 text-sm leading-relaxed focus:border-[#bfa074]"
                                    rows="4"
                                    placeholder="ใส่รายละเอียดทรัพย์สิน"
                                />
                            ) : (
                                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                                    {property.description}
                                </p>
                            )}
                            
                            <h4 className="font-semibold text-gray-800 mt-4 mb-2">จุดเด่นโครงการ/ทรัพย์สิน</h4>
                            {/* Features (Editable as a multiline text) */}
                            {isEditing ? (
                                <textarea
                                    name="features"
                                    value={editableProperty?.features || ''}
                                    onChange={handleTextChange}
                                    className="w-full p-3 border rounded-lg text-gray-700 text-sm focus:border-[#bfa074]"
                                    rows="5"
                                    placeholder="ใส่จุดเด่นแต่ละข้อคั่นด้วย Enter"
                                />
                            ) : (
                                <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 ml-4">
                                    {featuresList.filter(f => f.trim() !== '').map((feature, index) => <li key={index}>{feature}</li>)}
                                </ul>
                            )}
                        </div>

                        {/* กล่องข้อมูลสำคัญ (Key Stats) - เหมือนในภาพเป๊ะ */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Ruler size={20} className="text-gray-500" /> พื้นที่
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {/* พื้นที่ดิน (Editable) 💡 ใช้ handleNumericChange และ formatNumber */}
                            <InfoBlock 
                                title="พื้นที่ดิน" 
                                value={isEditing ? (
                                    <input 
                                        type="text" // Must be text to allow comma display
                                        name="land"
                                        value={formatNumber(editableProperty?.land || '')} 
                                        onChange={handleNumericChange}
                                        className="border-b text-xl font-bold text-gray-900 w-full bg-transparent focus:border-[#bfa074]"
                                    />
                                ) : formatNumber(property.land)} 
                                unit="ตร.ว." 
                            />
                            {/* พื้นที่ใช้สอย (Editable) 💡 ใช้ handleNumericChange และ formatNumber */}
                            <InfoBlock 
                                title="พื้นที่ใช้สอย" 
                                value={isEditing ? (
                                    <input 
                                        type="text" // Must be text to allow comma display
                                        name="area"
                                        value={formatNumber(editableProperty?.area || '')} 
                                        onChange={handleNumericChange}
                                        className="border-b text-xl font-bold text-gray-900 w-full bg-transparent focus:border-[#bfa074]"
                                    />
                                ) : formatNumber(property.area)} 
                                unit="ตารางเมตร" 
                            />
                            {/* ราคาต่อตารางเมตร (Derived Value) */}
                            <InfoBlock title="ราคาต่อตารางเมตร" value={pricePerSqm} unit={pricePerSqmUnit} isPrice={true} />
                        </div>
                        
                        {/* ข้อมูลเบื้องต้น (Basic Info) */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <Bed size={20} className="text-gray-500" /> ข้อมูลเบื้องต้น
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700 mb-8">
                            {/* ห้องนอน (Editable) 💡 ใช้ handleIntegerChange */}
                            <div className="flex items-center gap-2">
                                <Bed size={16} className="text-gray-500" /> ห้องนอน: 
                                <span className="font-semibold text-gray-900">
                                    {isEditing ? (
                                        <input 
                                            type="text" // Change to text for better mobile UX, and use handleIntegerChange
                                            name="beds"
                                            value={editableProperty?.beds || ''} 
                                            onChange={handleIntegerChange}
                                            className="border-b text-sm font-semibold text-gray-900 w-10 bg-transparent focus:border-[#bfa074]"
                                        />
                                    ) : property.beds || '-'}
                                </span>
                            </div>
                            {/* ห้องน้ำ (Editable) 💡 ใช้ handleIntegerChange */}
                            <div className="flex items-center gap-2">
                                <Bath size={16} className="text-gray-500" /> ห้องน้ำ: 
                                <span className="font-semibold text-gray-900">
                                    {isEditing ? (
                                        <input 
                                            type="text" // Change to text and use handleIntegerChange
                                            name="baths"
                                            value={editableProperty?.baths || ''} 
                                            onChange={handleIntegerChange}
                                            className="border-b text-sm font-semibold text-gray-900 w-10 bg-transparent focus:border-[#bfa074]"
                                        />
                                    ) : property.baths || '-'}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Ruler size={16} className="text-gray-500" /> พื้นที่ใช้สอย: <span className="font-semibold text-gray-900">{formatNumber(property.area) || '-'} ตร.ม.</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Layers size={16} className="text-gray-500" /> ขนาดที่ดิน: <span className="font-semibold text-gray-900">{formatNumber(property.land) || '-'} วา</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag size={16} className="text-gray-500" /> รหัสทรัพย์: <span className="font-semibold text-gray-900">A00355</span>
                            </div>
                        </div>

                        {/* ข้อมูลโครงการ (Remains the same) */}
                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <HardHat size={20} className="text-[#bfa074]" /> ข้อมูลโครงการ
                            </h3>
                            <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-200">
                                <img src={"https://via.placeholder.com/100x100?text=Project+Logo"} alt="Project Thumb" className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <div className="text-sm text-gray-500">โครงการ</div>
                                    <div className="font-semibold text-gray-800">{property.project}</div>
                            </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* คอลัมน์ขวา (ติดต่อ & สินเชื่อ) - 1/3 ส่วน */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* กล่องติดต่อผู้โพสต์ (Editable) 💡 ใช้ handleTextChange */}
                        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
                                <User size={20} className="text-[#bfa074]" /> ติดต่อผู้โพสต์
                            </h3>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    name="owner"
                                    value={editableProperty?.owner || ''} 
                                    onChange={handleTextChange}
                                    className="border-b border-gray-300 focus:border-[#bfa074] text-lg font-semibold text-gray-900 mb-4 w-full"
                                    placeholder="ชื่อผู้โพสต์"
                                />
                            ) : (
                                <p className="text-lg font-semibold text-gray-900 mb-4">{property.owner || 'ไม่ระบุ'}</p>
                            )}
                            
                            <div className="space-y-3">
                                {/* โทรศัพท์ (Editable) */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                    <Phone size={20} className="text-green-600 flex-shrink-0"/>
                                    <div>
                                        <div className="text-xs text-gray-500">โทรศัพท์</div>
                                        <div className="font-medium text-gray-800">
                                            {isEditing ? (
                                                <input 
                                                    type="text" 
                                                    name="ownerPhone"
                                                    value={editableProperty?.ownerPhone || ''} 
                                                    onChange={handleTextChange}
                                                    className="bg-transparent font-medium text-gray-800 w-full border-b border-gray-300 focus:border-[#bfa074]"
                                                    placeholder="เบอร์โทรศัพท์"
                                                />
                                            ) : property.ownerPhone || '-'}
                                        </div>
                                    </div>
                                </div>
                                {/* อีเมล (Editable) */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                                    <Mail size={20} className="text-blue-600 flex-shrink-0"/>
                                    <div>
                                        <div className="text-xs text-gray-500">อีเมล</div>
                                        <div className="font-medium text-gray-800">
                                            {isEditing ? (
                                                <input 
                                                    type="email" 
                                                    name="ownerEmail"
                                                    value={editableProperty?.ownerEmail || ''} 
                                                    onChange={handleTextChange}
                                                    className="bg-transparent font-medium text-gray-800 w-full border-b border-gray-300 focus:border-[#bfa074]"
                                                    placeholder="อีเมล"
                                                />
                                            ) : property.ownerEmail || '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* === ระบบคำนวณสินเชื่อ Realtime === */}
                        {/* Note: ส่งค่า price ที่เป็นตัวเลข clean แล้วไปคำนวณ */}
                        {editableProperty?.price && <LoanCalculator price={editableProperty.price} />} 
                        {/* ============================================== */}
                    </div>
                </div>
                
                {/* ข้อมูลสิ่งอำนวยความสะดวก */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-[#bfa074]" /> สิ่งอำนวยความสะดวก
                    </h3>
                    {/* Facilities (Editable) 💡 ใช้ handleTextChange */}
                    {isEditing ? (
                        <textarea
                            name="facilities"
                            value={editableProperty?.facilities || ''}
                            onChange={handleTextChange}
                            className="w-full p-3 border rounded-lg text-gray-700 focus:border-[#bfa074]"
                            rows="3"
                            placeholder="ใส่สิ่งอำนวยความสะดวก"
                        />
                    ) : (
                        <p className="text-gray-700">{property.facilities || 'ไม่ระบุสิ่งอำนวยความสะดวก'}</p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyDetailNew;