import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
    AlertTriangle, Tag, Bed, Bath, MapPin, User, Phone, Mail, 
    Ruler, Layers, ShieldCheck, List, HardHat, Home,
    Maximize2, Edit3, X, Save, Calculator, Building, Link as IconLink // ✅ เพิ่ม Calculator และ icon ที่จำเป็น
} from "lucide-react"; 
import { motion } from "framer-motion";

// --- HELPER FUNCTIONS ---
const cleanNumber = (numStr) => {
    if (numStr === null || numStr === undefined) return '';
    return String(numStr).replace(/[^\d.]/g, '');
};

const formatNumber = (numStr) => {
    const cleaned = cleanNumber(numStr);
    if (!cleaned) return '';
    if (isNaN(Number(cleaned))) return cleaned;
    const parts = cleaned.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return formattedInteger + decimalPart;
};

// === Component: LoanCalculator (ด้านขวา) ===
const LoanCalculator = ({ price }) => {
    const initialPrice = Number(cleanNumber(price)) || 0; 
    const [loanAmount, setLoanAmount] = useState(initialPrice * 0.9); 
    const [rate, setRate] = useState(6.5); 
    const [years, setYears] = useState(30); 

    useEffect(() => {
        setLoanAmount(initialPrice * 0.9);
    }, [price]);

    const calculateMonthlyPayment = () => {
        if (loanAmount <= 0 || rate <= 0 || years <= 0) return 0;
        const monthlyRate = (rate / 100) / 12; 
        const numPayments = years * 12; 
        const monthlyPayment = loanAmount * monthlyRate * Math.pow((1 + monthlyRate), numPayments) / (Math.pow((1 + monthlyRate), numPayments) - 1);
        return monthlyPayment;
    };

    const monthlyPayment = calculateMonthlyPayment();

    return (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-3">
                <Calculator size={20} className="text-[#bfa074]"/> คำนวณสินเชื่อ
            </h3>
            <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <span className="text-gray-500">ราคาขาย</span>
                    <span className="font-semibold text-gray-800">฿{formatNumber(initialPrice)}</span>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">วงเงินกู้ (บาท)</label>
                    <input type="number" value={Math.round(loanAmount)} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-[#bfa074] focus:border-[#bfa074] outline-none" min="0"/>
                    <div className="text-xs text-gray-400 mt-1">เงินดาวน์: {formatNumber(initialPrice - loanAmount)} ฿</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-gray-700 mb-1">อัตราดอกเบี้ย (% ต่อปี)</label>
                        <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">ระยะเวลาผ่อน (ปี)</label>
                        <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 bg-[#fff9ee] rounded-xl border border-[#f5e0c3] text-center">
                <div className="text-sm font-medium text-gray-700">ประมาณผ่อนต่อเดือน</div>
                <div className="text-3xl font-extrabold text-[#d9a45b] mt-1">
                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 2 }).format(monthlyPayment)}
                </div>
            </div>
        </div>
    );
};

const PropertyDetailNew = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [isEditing, setIsEditing] = useState(false);
    const [editableProperty, setEditableProperty] = useState(null);

    const defaultImage = "https://placehold.co/600x400?text=Image+Not+Available"; 
    
    const loadPropertyDetails = () => {
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            const listingIndex = parseInt(id, 10);
            const currentProperty = userListings[listingIndex]; 

            if (!currentProperty) {
                setError("ไม่พบรายการทรัพย์สินนี้");
                setProperty(null);
                setTimeout(() => navigate('/Project/Profile'), 3000);
            } else {
                 if (!currentProperty.price) {
                     currentProperty.price = "0";
                }
                
                const imagesArray = currentProperty.images || (currentProperty.image ? [currentProperty.image] : []);

                const finalProperty = {
                    ...currentProperty,
                    images: imagesArray, 
                    project: currentProperty.projectName || currentProperty.project || currentProperty.title || "ชื่อโครงการไม่ระบุ",
                    description: currentProperty.description || "ไม่มีรายละเอียดเพิ่มเติม",
                    features: currentProperty.features || "-",
                    owner: currentProperty.owner || 'ไม่ระบุ',
                    ownerPhone: currentProperty.ownerPhone || '-',
                    ownerEmail: currentProperty.ownerEmail || '-',
                    price: cleanNumber(currentProperty.price || '0'), 
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
        const handleListingUpdate = () => { loadPropertyDetails(); };
        window.addEventListener('listings-updated', handleListingUpdate);
        return () => { window.removeEventListener('listings-updated', handleListingUpdate); };
    }, [id]); 

    // --- Handlers ---
    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setEditableProperty(prev => ({ ...prev, [name]: value }));
    };
    const handleNumericChange = (e) => {
        const { name, value } = e.target;
        setEditableProperty(prev => ({ ...prev, [name]: cleanNumber(value) }));
    };
    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => { setIsEditing(false); setEditableProperty(property); };
    
    const handleSave = () => {
        try {
            const userListings = JSON.parse(localStorage.getItem('userListings')) || [];
            const index = parseInt(id, 10);
            if (index >= 0 && index < userListings.length) {
                const propertyToSave = {
                    ...editableProperty,
                    title: editableProperty.project,
                    projectName: editableProperty.project,
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
                window.dispatchEvent(new Event('listings-updated'));
                alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
            }
        } catch (e) {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-100 text-center py-20 text-gray-500">กำลังโหลดรายละเอียด...</div>;
    if (error || !property) return <div className="text-center py-20">{error}</div>;

    // Calculation Logic
    const currentData = isEditing ? editableProperty : property;
    const priceNum = parseFloat(currentData.price) || 0;
    const landNum = parseFloat(currentData.land) || 0;
    const areaNum = parseFloat(currentData.area) || 0;
    
    // คำนวณราคาเฉลี่ย
    let pricePerSqVal = 0;
    let unitLabel = "ตร.วา";
    const isCondo = (currentData.type || '').toLowerCase().includes('condo');
    if(isCondo && areaNum > 0) {
        pricePerSqVal = priceNum / areaNum;
        unitLabel = "ตร.ม.";
    } else if(landNum > 0) {
        pricePerSqVal = priceNum / landNum;
    }

    const imagesToDisplay = property.images || [defaultImage];
    const mainImage = imagesToDisplay[0] || defaultImage;
    const thumbnailImages = imagesToDisplay.slice(1, 5);
    while (thumbnailImages.length < 4) thumbnailImages.push({ src: "https://placehold.co/300x200?text=No+Image" });

    const ImageContainer = ({ src, alt, className }) => (
        <div className={className}>
            <img src={src} alt={alt} className="w-full h-full object-cover transition hover:scale-105 duration-500" onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}/>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f9f9f9] pb-10 pt-20 font-sans text-[#333]"> 
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-6"> 
                
                {/* Gallery */}
                <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-sm bg-white">
                    <ImageContainer src={mainImage} alt="Main" className="col-span-2 row-span-2 overflow-hidden cursor-pointer" />
                    {thumbnailImages.map((img, index) => (
                        <ImageContainer key={index} src={typeof img === 'string' ? img : img.src || img} alt={`Thumb ${index}`} className="col-span-1 row-span-1 overflow-hidden cursor-pointer bg-gray-100"/>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* ================= Left Content (Main Info) ================= */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Header & Title */}
                        <div className="bg-white p-0 rounded-2xl">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1">
                                        {isEditing ? (
                                            <input type="text" name="project" value={editableProperty?.project || ''} onChange={handleTextChange} className="w-full border-b border-gray-300 outline-none" />
                                        ) : property.project}
                                    </h1>
                                    
                                    <div className="text-3xl font-bold text-[#1a1a1a] my-2">
                                        {isEditing ? (
                                            <input type="text" name="price" value={editableProperty?.price} onChange={handleNumericChange} className="border-b border-gray-300 w-40" />
                                        ) : `฿${formatNumber(property.price)}`}
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        <span className="px-3 py-1 text-xs font-bold text-white bg-green-700 rounded-full uppercase">{property.type}</span>
                                        <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">New Listing</span>
                                        <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">Verified</span>
                                    </div>
                                </div>
                                
                                {/* Edit Button */}
                                <div className="flex gap-2">
                                    {!isEditing ? (
                                        <button onClick={handleEdit} className="flex items-center gap-1 px-4 py-1.5 text-sm font-medium text-[#bfa074] bg-[#f9f5ee] rounded-lg hover:bg-[#efe6d6] transition">
                                            <Edit3 size={16} /> แก้ไข
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-lg"><Save size={18}/></button>
                                            <button onClick={handleCancel} className="p-2 bg-gray-200 text-gray-600 rounded-lg"><X size={18}/></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr className="border-gray-200 my-6" />
                        </div>

                        {/* 2. Description */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <List size={20} className="text-[#bfa074]" /> รายละเอียดทรัพย์
                            </h3>
                            {isEditing ? (
                                <textarea name="description" value={editableProperty?.description || ''} onChange={handleTextChange} className="w-full p-3 border rounded-lg h-32 text-sm bg-gray-50" />
                            ) : (
                                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{property.description}</p>
                            )}
                        </div>

                        {/* 3. Highlights */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">จุดเด่นโครงการ/ทรัพย์สิน</h3>
                            {isEditing ? (
                                <textarea name="features" value={editableProperty?.features || ''} onChange={handleTextChange} className="w-full p-3 border rounded-lg h-24 text-sm bg-gray-50" />
                            ) : (
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                                    {property.features.split(',').map((item, idx) => (
                                        <li key={idx}>{item.trim()}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* 4. Stats Area (Cards Grid) - Moved from Right to Left */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <IconLink size={20} className="text-[#bfa074] -rotate-45" /> พื้นที่
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border border-gray-200 rounded-xl p-4 bg-white">
                                    <div className="text-xs text-gray-500 mb-1">พื้นที่</div>
                                    <div className="font-bold text-lg text-gray-900">
                                        {isEditing ? <input name="land" value={editableProperty.land} onChange={handleNumericChange} className="w-full border-b"/> : property.land} 
                                        <span className="text-xs font-normal ml-1">ตร.ว.</span>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-xl p-4 bg-white">
                                    <div className="text-xs text-gray-500 mb-1">พื้นที่ใช้สอย</div>
                                    <div className="font-bold text-lg text-gray-900">
                                        {isEditing ? <input name="area" value={editableProperty.area} onChange={handleNumericChange} className="w-full border-b"/> : property.area} 
                                        <span className="text-xs font-normal ml-1">ตารางเมตร</span>
                                    </div>
                                </div>
                                <div className="border border-[#ffeeba] bg-[#fff9ee] rounded-xl p-4">
                                    <div className="text-xs text-gray-500 mb-1">ราคา/{unitLabel}</div>
                                    <div className="font-bold text-lg text-red-600">
                                        {formatNumber(Math.round(pricePerSqVal))} 
                                        <span className="text-xs font-normal ml-1">บาท</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. Basic Info (Icons List) - Moved from Right to Left */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Layers size={20} className="text-gray-600" /> ข้อมูลเบื้องต้น
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Bed size={18} className="text-gray-400"/> 
                                    <span className="text-gray-500">ห้องนอน:</span>
                                    <span className="font-semibold">{isEditing ? <input name="beds" value={editableProperty.beds} onChange={handleNumericChange} className="w-10 border-b"/> : property.beds}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath size={18} className="text-gray-400"/> 
                                    <span className="text-gray-500">ห้องน้ำ:</span>
                                    <span className="font-semibold">{isEditing ? <input name="baths" value={editableProperty.baths} onChange={handleNumericChange} className="w-10 border-b"/> : property.baths}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Maximize2 size={18} className="text-gray-400"/> 
                                    <span className="text-gray-500">พื้นที่ใช้สอย:</span>
                                    <span className="font-semibold">{property.area} ตร.ม.</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers size={18} className="text-gray-400"/> 
                                    <span className="text-gray-500">ขนาดที่ดิน:</span>
                                    <span className="font-semibold">{property.land} ตร.วา</span>
                                </div>
                               
                            </div>
                        </div>

                        {/* 6. Project Info Card (New Section matching screenshot) */}
                        <div className="border border-gray-200 rounded-xl p-5 bg-white">
                            <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <HardHat size={18} className="text-[#bfa074]" /> ข้อมูลโครงการ
                            </h3>
                            <div className="flex items-center gap-4 bg-[#f9f9f9] p-3 rounded-lg border border-gray-100">
                                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                                    <Building size={24} />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">โครงการ</div>
                                    <div className="font-bold text-gray-900">{property.project}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    {/* ================= Right Sidebar (Contact & Calc) ================= */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Contact Owner */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
                                <User size={18} className="text-gray-600"/> ติดต่อผู้โพสต์
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="font-bold text-lg text-gray-900">{property.owner}</div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3 text-gray-700">
                                    <Phone size={18} className="text-green-600" />
                                    <div>
                                        <div className="text-[10px] text-gray-400">โทรศัพท์</div>
                                        <div className="font-medium">{property.ownerPhone}</div>
                                    </div>
                                </div>
                                <div className="p-3 border border-gray-200 rounded-lg flex items-center gap-3 text-gray-700">
                                    <Mail size={18} className="text-blue-600" />
                                    <div className="overflow-hidden">
                                        <div className="text-[10px] text-gray-400">อีเมล</div>
                                        <div className="font-medium truncate">{property.ownerEmail}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Calculator */}
                        <LoanCalculator price={isEditing ? editableProperty.price : property.price} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PropertyDetailNew;