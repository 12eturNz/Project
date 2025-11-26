import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm"; 
import {
    User, Mail, Phone, MapPin, Edit3, Camera, Save, CheckCircle, Shield,
    Clock, LogOut, Briefcase, Handshake, Lock, Settings, Crown, Sparkles, ArrowRight, XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// **New:** Import AdminDashboard component (ต้องมีไฟล์ AdminDashboard.jsx ใน Path ที่ถูกต้อง)
import AdminDashboard from "./AdminDashboard"; 

// Helper component for form group
const FormGroup = ({ label, children, isEditing }) => (
    <div className="flex flex-col gap-1.5">
        <label className={`text-sm font-medium ${isEditing ? "text-gray-700" : "text-gray-400"}`}>{label}</label>
        {children}
    </div>
);

// Helper component for displaying the applicant's details 
const ApplicantDetailsCard = ({ applicant, onBack }) => {
    // Determine the color based on role for the details card
    const roleColor = applicant.role === 'Agent' ? 'text-[#bfa074]' : 'text-[#2c3e50]';

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
        >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <User className={roleColor} size={24} />
                    ข้อมูลผู้สมัคร ({applicant.role})
                </h2>
                {/* ปุ่มย้อนกลับธรรมดา */}
                <button
                    onClick={() => onBack()} // เรียก onBack แบบไม่มีพารามิเตอร์ เพื่อปิดการแสดงผล
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <ArrowRight size={16} className="rotate-180" /> ย้อนกลับ
                </button>
            </div>

            {/* ... (Rest of ApplicantDetailsCard content) ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <FormGroup label="ชื่อผู้ใช้งาน">
                    <input disabled value={applicant.username} className="w-full p-3 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                </FormGroup>

                <FormGroup label={`วันที่สมัครเป็น ${applicant.role}`}>
                    <input disabled value={applicant.applicationDate || 'ไม่ระบุ'} className="w-full p-3 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                </FormGroup>

                <FormGroup label="ชื่อจริง">
                    <input disabled value={applicant.firstName || '-'} className="w-full p-3 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                </FormGroup>

                <FormGroup label="นามสกุล">
                    <input disabled value={applicant.lastName || '-'} className="w-full p-3 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                </FormGroup>

                <FormGroup label="อีเมล">
                    <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input disabled value={applicant.email || '-'} className="w-full p-3 pl-10 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                    </div>
                </FormGroup>

                <FormGroup label="เบอร์โทรศัพท์">
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input disabled value={applicant.phone || '-'} className="w-full p-3 pl-10 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default" />
                    </div>
                </FormGroup>

                <div className="md:col-span-2">
                    <FormGroup label="ที่อยู่">
                        <div className="relative">
                            <MapPin size={18} className="absolute left-3 top-4 text-gray-400" />
                            <textarea disabled rows="3" value={applicant.address || '-'} className="w-full p-3 pl-10 rounded-lg border-transparent bg-gray-50 text-gray-700 cursor-default resize-none" />
                        </div>
                    </FormGroup>
                </div>
            </div>

            {/* Admin Action Buttons at the bottom of the detail card (อนุมัติ/ไม่อนุมัติที่นี่) */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
                 <button 
                    onClick={() => onBack(applicant.key, false)} // ส่ง false เพื่อ 'ไม่อนุมัติ'
                    className="px-6 py-2.5 rounded-lg text-red-600 hover:bg-red-100 font-medium transition cursor-pointer flex items-center gap-2"
                >
                    <XCircle size={18} /> ไม่อนุมัติ
                </button>
                <button 
                    onClick={() => onBack(applicant.key, true)} // ส่ง true เพื่อ 'อนุมัติ'
                    className="px-8 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg font-medium transition duration-200 flex items-center gap-2 cursor-pointer"
                >
                    <CheckCircle size={18} /> อนุมัติ
                </button>
            </div>
        </motion.div>
    );
};


const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const registerRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const [currentUserKey, setCurrentUserKey] = useState(null);
    const [user, setUser] = useState(null);
    const [tempUser, setTempUser] = useState(null);
    
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [pendingApplications, setPendingApplications] = useState([]);

    // New State for Admin: to display a specific applicant's details
    const [selectedApplicant, setSelectedApplicant] = useState(null); 

    // **New State:** เพื่อควบคุมว่าจะแสดง AdminDashboard หรือไม่
    const [showAdminDashboard, setShowAdminDashboard] = useState(false); 


    // Helper function to fetch and filter pending applications
    const fetchPendingApplications = (allUsers) => {
        const pending = Object.entries(allUsers)
            // **แก้ไข:** กรองเฉพาะ Agent/Partner ที่ isApproved เป็น undefined/null (Pending จริงๆ)
            .filter(([key, u]) => (u.role === 'Agent' || u.role === 'Partner') && (u.isApproved === undefined || u.isApproved === null))
            .map(([key, u]) => ({ 
                key, 
                ...u, 
                applicationDate: u.applicationDate || 'ไม่ระบุ' 
            })); 
        setPendingApplications(pending);
    };


    useEffect(() => {
        const currentKey = localStorage.getItem("currentUser");
        if (!currentKey) {
            navigate("/login");
            return;
        }
        setCurrentUserKey(currentKey);
        const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
        const userData = allUsers[currentKey];

        if (userData) {
            setUser(userData);
            setTempUser(userData);
            
            // ตรวจสอบว่าผู้ใช้งานเป็น Agent หรือ Partner และได้รับการอนุมัติแล้วหรือไม่
            const isAuthorizedPoster = (userData.role === 'Agent' || userData.role === 'Partner') && userData.isApproved === true;
            setShowRegisterForm(isAuthorizedPoster);

            // จำลองการดึงรายการคำขอที่รอดำเนินการสำหรับ Admin
            if (userData.role === 'Admin') {
                fetchPendingApplications(allUsers);
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleEdit = () => {
        // Clear selected applicant
        setSelectedApplicant(null);
        // **New:** Clear Admin Dashboard view
        setShowAdminDashboard(false); 
        setTempUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTempUser(user);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUser(tempUser);
        const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
        allUsers[currentUserKey] = tempUser;
        localStorage.setItem("users", JSON.stringify(allUsers));
        window.dispatchEvent(new Event("auth-change"));
        setIsEditing(false);
        alert("บันทึกข้อมูลเรียบร้อยแล้ว ✨");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempUser({ ...tempUser, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const updatedUser = { ...user, avatar: base64String };
                setUser(updatedUser);
                setTempUser(updatedUser);
                const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
                allUsers[currentUserKey] = updatedUser;
                localStorage.setItem("users", JSON.stringify(allUsers));
                window.dispatchEvent(new Event("auth-change"));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNavigateToAgentRegister = () => {
        navigate("/RegisterSteps");
    };

    const handleNavigateToPartnerRegister = () => {
        navigate("/RegisterPartner");
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        window.dispatchEvent(new Event("auth-change"));
        navigate("/LoginRegister");
    };

    // Handler สำหรับ Admin Dashboard (เปลี่ยนเป็นการสลับ State)
    const handleNavigateToAdminDashboard = () => {
        setIsEditing(false); // ปิดโหมดแก้ไข
        setSelectedApplicant(null); // ปิดหน้าดูรายละเอียดผู้สมัคร
        setShowAdminDashboard(true); // เปิดการแสดงผล Admin Dashboard
    };


    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // New handler for Admin: selecting an applicant to view
    const handleViewApplicant = (applicant) => {
        setIsEditing(false); // Make sure editing mode is off
        setShowAdminDashboard(false); // ปิด Admin Dashboard ก่อนเปิด Applicant Detail
        setSelectedApplicant(applicant);
    };
    
    // Updated handler for admin approval (handles both true/false)
    const handleApprove = (userKey, approvalStatus) => {
        const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
        if (allUsers[userKey]) {
            const statusText = approvalStatus ? "อนุมัติ" : "ไม่อนุมัติ";
            const roleText = allUsers[userKey].role;
            
            // ตั้งค่าสถานะ isApproved: true สำหรับอนุมัติ, false สำหรับไม่อนุมัติ
            allUsers[userKey].isApproved = approvalStatus; 
            
            localStorage.setItem("users", JSON.stringify(allUsers));
            
            // **สำคัญ**: Re-fetch pending applications เพื่ออัปเดต UI ให้รายการที่ถูกจัดการแล้วหายไปทันที
            fetchPendingApplications(allUsers);
            
            // Clear selected applicant detail view
            setSelectedApplicant(null);

            alert(`${statusText} ผู้ใช้งาน ${allUsers[userKey].username} เป็น ${roleText} เรียบร้อยแล้ว`);
            // Optionally, refresh the current user's data if they are the one approved
            if (userKey === currentUserKey) {
                setUser(allUsers[currentUserKey]);
            }
        }
    };

    // New Handler to close the applicant detail view
    const handleBackFromApplicantDetails = (userKey, approvalStatus) => {
        if (userKey) {
            // If the back button is used with approval action (from ApplicantDetailsCard)
            handleApprove(userKey, approvalStatus);
        } else {
            // If the simple back button is pressed (no userKey means just close the view)
            setSelectedApplicant(null);
        }
    }


    if (!user) return null;

    // Determine the status of the user's Agent/Partner application
    let applicationStatus = 'None'; // Not applied
    if (user.role === 'Agent' || user.role === 'Partner') {
        if (user.isApproved === true) {
            applicationStatus = 'Approved'; // Approved and can post
        } else if (user.isApproved === false) {
            applicationStatus = 'Rejected'; // Rejected
        } else {
            applicationStatus = 'Pending'; // Applied but waiting for approval
        }
    }


    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-[Prompt] text-gray-700">
            <Navbar />

            <main className="flex-grow pt-24 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 ml-2"
                    >
                        <h1 className="text-3xl font-bold text-gray-800">บัญชีของฉัน</h1>
                        <p className="text-gray-500 text-sm mt-1">ยินดีต้อนรับคุณ {user.username}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Sidebar ซ้าย */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Profile Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative"
                            >
                                {/* Header Color: ถ้าเป็น Admin เป็นสีแดง ถ้า User เป็นสีฟ้า */}
                                <div className={`h-32 bg-gradient-to-r ${user.role === 'Admin' ? 'from-red-900 to-gray-800' : 'from-[#2c3e50] to-[#4ca1af]'}`}></div>
                                
                                <div className="px-6 pb-6 text-center -mt-12 relative">
                                    {/* ... โค้ดส่วน Avatar ... */}
                                    <div className="relative inline-block">
                                        <div className="w-28 h-28 rounded-full p-1 bg-white shadow-lg mx-auto">
                                            <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden relative flex items-center justify-center">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User size={48} className="text-gray-300" />
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={triggerFileInput}
                                            className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition text-gray-600 border border-gray-100 cursor-pointer"
                                        >
                                            <Camera size={16} />
                                        </button>
                                        <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </div>

                                    <h2 className="mt-4 text-xl font-bold text-gray-800">
                                        {user.firstName || user.username} {user.lastName}
                                    </h2>
                                    <p className="text-gray-500 text-sm">{user.email || "-"}</p>

                                    <div className="mt-4 flex justify-center gap-2 flex-wrap">
                                        {/* ... โค้ดส่วน Role Badge ... */}
                                        {user.role === 'Admin' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                                                <Lock size={12} className="mr-1.5" /> Administrator
                                            </span>
                                        ) : user.role === 'Agent' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#bf953f] to-[#a38a5c] text-white shadow-sm">
                                                <Briefcase size={12} className="mr-1.5" /> Partner Agent
                                            </span>
                                        ) : user.role === 'Partner' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] text-white shadow-sm">
                                                <Handshake size={12} className="mr-1.5" /> Business Partner
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                สมาชิกทั่วไป
                                            </span>
                                        )}
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                                            <Clock size={12} className="mr-1" /> สมาชิกเมื่อ {user.joinDate}
                                        </span>
                                    </div>
                                    
                                    {/* Application Status Badge for Agent/Partner */}
                                    {applicationStatus !== 'None' && (
                                        <div className="mt-4">
                                            {applicationStatus === 'Approved' && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                                                    <CheckCircle size={12} className="mr-1.5" /> อนุมัติแล้ว
                                                </span>
                                            )}
                                            {applicationStatus === 'Pending' && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-500 text-white">
                                                    <Clock size={12} className="mr-1.5" /> รอการอนุมัติ
                                                </span>
                                            )}
                                            {/* **แก้ไข:** เปลี่ยนข้อความให้เป็นภาษาไทยตามรูปภาพ */}
                                            {applicationStatus === 'Rejected' && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                                                    <Lock size={12} className="mr-1.5" /> ถูกปฏิเสธ
                                                </span>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </motion.div>

                            {/* --- Admin Menu (เฉพาะ Admin) --- */}
                            {user.role === 'Admin' && (
                                <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6">
                                    <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Settings size={16}/> เมนูผู้ดูแลระบบ
                                    </h3>
                                    <ul className="space-y-2">
                                        {/* แก้ไข: เพิ่ม onClick เพื่อนำทางไป Admin Dashboard (ใช้ State toggle) */}
                                        <li 
                                            onClick={handleNavigateToAdminDashboard} 
                                            className={`p-3 rounded-lg text-sm font-medium transition cursor-pointer ${showAdminDashboard ? 'bg-red-100 text-red-700' : 'bg-white text-gray-700 hover:bg-red-100'}`}
                                        >
                                            จัดการผู้ใช้งาน
                                        </li>
                                        {/* Updated Admin Menu for Approvals: ส่วนนี้คือการอนุมัติ */}
                                        <li className="p-3 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-red-100 transition">
                                            <details open={pendingApplications.length > 0 && !showAdminDashboard}>
                                                <summary className="cursor-pointer">
                                                    อนุมัติผู้สมัคร (Pending: {pendingApplications.length})
                                                </summary>
                                                <div className="mt-3 space-y-2 border-t pt-3">
                                                    {pendingApplications.length > 0 ? (
                                                        pendingApplications.map((app) => (
                                                            <div key={app.key} className="flex flex-col sm:flex-row justify-between items-center sm:items-stretch text-xs bg-gray-50 p-3 rounded space-y-2 sm:space-y-0">
                                                                <div className="text-left">
                                                                    <span className="font-semibold">{app.username}</span> 
                                                                    <span className={`text-gray-500 block`}>
                                                                        ({app.role}) - 
                                                                        {/* **แก้ไข**: แสดงสถานะเป็น "รอดำเนินการ" เท่านั้น เนื่องจากตอนนี้เรากรองมาแต่ Pending จริงๆ แล้ว */}
                                                                        <span className="text-yellow-600"> รอดำเนินการ</span>
                                                                    </span>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button 
                                                                        onClick={() => handleViewApplicant(app)}
                                                                        className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                                                    >
                                                                        ดูข้อมูล
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-xs text-gray-500">ไม่มีรายการรออนุมัติ</p>
                                                    )}
                                                </div>
                                            </details>
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* 1. **เพิ่ม: Status Card (สถานะการอนุมัติ) - เหมือนในรูป** */}
                            {applicationStatus === 'Approved' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 flex items-start justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                            <Shield size={20} className="text-green-500" />
                                            สถานะการอนุญาต
                                        </h3>
                                        <p className="text-sm mt-2 text-gray-600">
                                            <CheckCircle size={16} className="inline mr-1.5 text-green-500" />
                                            **ยืนยันตัวตนสำเร็จแล้ว**
                                            <span className="block text-xs text-gray-500 mt-0.5">อนุญาตให้ลงประกาศอสังหาฯ ได้อย่างปลอดภัย</span>
                                        </p>
                                    </div>
                                    <CheckCircle size={36} className="text-green-500 flex-shrink-0 mt-1" />
                                </motion.div>
                            )}

                            {/* **เพิ่ม: ปุ่ม Agent (Upgrade Options) - เหมือนในรูป** */}
                            {/* เงื่อนไข: ผู้ใช้ต้องไม่เป็น Admin และไม่เป็น Agent ที่ถูกอนุมัติ/รออนุมัติแล้ว */}
                            {user.role !== 'Admin' && user.role !== 'Agent' && applicationStatus !== 'Pending' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-1.5 bg-gradient-to-r from-[#bf953f] to-[#a38a5c] rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition duration-200"
                                    onClick={handleNavigateToAgentRegister}
                                >
                                    <div className="bg-white p-5 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-yellow-100 rounded-full">
                                                <Crown size={24} className="text-[#bf953f]" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                                    AGENT ✨
                                                </h3>
                                                <p className="text-xs text-gray-500">สมัครเป็น Partner Agent</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={20} className="text-gray-500" />
                                    </div>
                                </motion.div>
                            )}

                            {/* **เพิ่ม: ปุ่ม Partner (Upgrade Options) - เหมือนในรูป** */}
                            {/* เงื่อนไข: ผู้ใช้ต้องไม่เป็น Admin และไม่เป็น Partner ที่ถูกอนุมัติ/รออนุมัติแล้ว */}
                            {user.role !== 'Admin' && user.role !== 'Partner' && applicationStatus !== 'Pending' && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-1.5 bg-gradient-to-r from-[#2c3e50] to-[#4ca1af] rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition duration-200"
                                    onClick={handleNavigateToPartnerRegister}
                                >
                                    <div className="bg-white p-5 rounded-xl flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-blue-100 rounded-full">
                                                <Handshake size={24} className="text-[#2c3e50]" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                                                    PARTNER
                                                </h3>
                                                <p className="text-xs text-gray-500">สมัครเป็น Business Partner</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={20} className="text-gray-500" />
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* **เพิ่ม: ปุ่ม Logout - เหมือนในรูป** */}
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={handleLogout}
                                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2 mt-6 shadow-sm border border-red-100"
                            >
                                <LogOut size={18} /> ออกจากระบบ
                            </motion.button>
                        </div>

                        {/* ส่วนฟอร์มข้อมูล (ขวา) */}
                        <div className="lg:col-span-8 space-y-8"> 
                            
                            {/* Conditional Message Box */}
                            {(user.role === 'Agent' || user.role === 'Partner') && user.isApproved !== true && !selectedApplicant && !showAdminDashboard && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-8"
                                >
                                    <div className={`border p-6 rounded-2xl flex items-start gap-4 ${applicationStatus === 'Rejected' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'}`}>
                                        {applicationStatus === 'Rejected' ? (
                                            <Lock size={28} className="text-red-600 flex-shrink-0 mt-0.5"/>
                                        ) : (
                                            <Clock size={28} className="text-yellow-600 flex-shrink-0 mt-0.5"/>
                                        )}
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">
                                                {applicationStatus === 'Rejected' ? 'คุณถูกปฏิเสธการสมัคร' : 'รอการอนุมัติ'}
                                            </h3>
                                            <p className={`text-sm mt-1 ${applicationStatus === 'Rejected' ? 'text-red-700' : 'text-yellow-700'}`}>
                                                บัญชี {user.role === 'Agent' ? 'Partner Agent' : 'Business Partner'} ของคุณ{applicationStatus === 'Rejected' ? 'ไม่ได้รับการอนุมัติ' : 'กำลังรอการตรวจสอบและอนุมัติจากผู้ดูแลระบบ'}
                                            </p>
                                            <p className={`text-xs mt-2 ${applicationStatus === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                คุณจะสามารถโพสอสังหาฯ ได้ทันทีเมื่อได้รับการอนุมัติ
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* **ส่วนข้อมูลส่วนตัว / Admin Dashboard / Applicant Details** */}
                            <AnimatePresence mode="wait">
                                {selectedApplicant ? (
                                    // 1. แสดงข้อมูลผู้สมัครที่เลือก
                                    <ApplicantDetailsCard 
                                        key="applicant-details" 
                                        applicant={selectedApplicant} 
                                        onBack={handleBackFromApplicantDetails} 
                                    />
                                ) : showAdminDashboard ? ( // <<<< เงื่อนไขใหม่: แสดง Admin Dashboard
                                    // 2. แสดง AdminDashboard (ส่ง onBack prop ไปด้วย)
                                    <motion.div key="admin-dashboard-view"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: 0.1, duration: 0.2 }}
                                    >
                                        <AdminDashboard onBack={() => setShowAdminDashboard(false)}/> 
                                    </motion.div>
                                ) : (
                                    // 3. แสดงข้อมูลส่วนตัวของผู้ใช้ปัจจุบัน (เป็น Default)
                                    <motion.div
                                        key="user-profile"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ delay: 0.1, duration: 0.2 }}
                                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
                                    >
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                                <User className="text-[#bfa074]" size={24} />
                                                ข้อมูลส่วนตัว
                                            </h2>

                                            {!isEditing && (
                                                <button
                                                    onClick={handleEdit}
                                                    className="flex items-center gap-2 text-[#bfa074] hover:text-[#a38a5c] font-medium text-sm transition px-4 py-2 rounded-full hover:bg-[#fbf8f3] cursor-pointer"
                                                >
                                                    <Edit3 size={16} /> แก้ไขข้อมูล
                                                </button>
                                            )}
                                        </div>

                                        <form onSubmit={handleSave}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                <FormGroup label="ชื่อจริง" isEditing={isEditing}>
                                                    <input
                                                        name="firstName"
                                                        value={isEditing ? tempUser.firstName : user.firstName || '-'}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full p-3 rounded-lg border transition duration-200 outline-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                                    />
                                                </FormGroup>

                                                <FormGroup label="นามสกุล" isEditing={isEditing}>
                                                    <input
                                                        name="lastName"
                                                        value={isEditing ? tempUser.lastName : user.lastName || '-'}
                                                        onChange={handleChange}
                                                        disabled={!isEditing}
                                                        className={`w-full p-3 rounded-lg border transition duration-200 outline-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                                    />
                                                </FormGroup>

                                                <FormGroup label="อีเมล" isEditing={isEditing}>
                                                    <div className="relative">
                                                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            name="email"
                                                            value={isEditing ? tempUser.email : user.email || '-'}
                                                            onChange={handleChange}
                                                            disabled={!isEditing}
                                                            className={`w-full p-3 pl-10 rounded-lg border transition duration-200 outline-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                                        />
                                                    </div>
                                                </FormGroup>

                                                <FormGroup label="เบอร์โทรศัพท์" isEditing={isEditing}>
                                                    <div className="relative">
                                                        <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            name="phone"
                                                            value={isEditing ? tempUser.phone : user.phone || '-'}
                                                            onChange={handleChange}
                                                            disabled={!isEditing}
                                                            className={`w-full p-3 pl-10 rounded-lg border transition duration-200 outline-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                                        />
                                                    </div>
                                                </FormGroup>

                                                <div className="md:col-span-2">
                                                    <FormGroup label="ที่อยู่" isEditing={isEditing}>
                                                        <div className="relative">
                                                            <MapPin size={18} className="absolute left-3 top-4 text-gray-400" />
                                                            <textarea
                                                                name="address"
                                                                rows="3"
                                                                value={isEditing ? tempUser.address : user.address || '-'}
                                                                onChange={handleChange}
                                                                disabled={!isEditing}
                                                                className={`w-full p-3 pl-10 rounded-lg border transition duration-200 outline-none resize-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                                            />
                                                        </div>
                                                    </FormGroup>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {isEditing && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4 overflow-hidden"
                                                    >
                                                        <button type="button" onClick={handleCancel} className="px-6 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition cursor-pointer">ยกเลิก</button>
                                                        <button type="submit" className="px-8 py-2.5 rounded-lg bg-[#bfa074] hover:bg-[#a38a5c] text-white shadow-md hover:shadow-lg font-medium transition duration-200 flex items-center gap-2 cursor-pointer"><Save size={18} /> บันทึกข้อมูล</button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* Conditional rendering of RegisterForm (Posting Section) */}
                    {/* แสดงฟอร์มโพสเมื่อเป็น Agent/Partner และถูกอนุมัติแล้วเท่านั้น */}
                    {(user.role === 'Agent' || user.role === 'Partner') && user.isApproved === true && (
                        <section id="register-section" ref={registerRef} className="py-20 bg-gray-50">
                            <RegisterForm />
                        </section>
                    )}
                    
                </div>
            </main>
            <Footer />
        </div>
    );
};


export default Profile;