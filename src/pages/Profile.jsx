import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import {
    User, Mail, Phone, MapPin, Edit3, Camera, Save, CheckCircle, Shield,
    Clock, LogOut, Briefcase, Handshake, Lock, Settings, Crown, Sparkles, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const [currentUserKey, setCurrentUserKey] = useState(null);
    const [user, setUser] = useState(null);
    const [tempUser, setTempUser] = useState(null);

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
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleEdit = () => {
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

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (!user) return null;

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
                                        {user.role === 'Admin' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                                                <Lock size={12} className="mr-1.5" /> Administrator
                                            </span>
                                        ) : user.role === 'Agent' ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#bfa074] to-[#a38a5c] text-white shadow-sm">
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
                                </div>
                            </motion.div>

                            {/* --- Admin Menu (เฉพาะ Admin) --- */}
                            {user.role === 'Admin' && (
                                <div className="bg-red-50 rounded-2xl shadow-sm border border-red-100 p-6">
                                    <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Settings size={16}/> เมนูผู้ดูแลระบบ
                                    </h3>
                                    <ul className="space-y-2">
                                        <li className="p-3 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-red-100 cursor-pointer transition">
                                            จัดการผู้ใช้งาน
                                        </li>
                                        <li className="p-3 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-red-100 cursor-pointer transition">
                                            อนุมัติอสังหาฯ (Pending)
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {/* Status Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">สถานะบัญชี</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white p-2 rounded-full text-green-600 shadow-sm">
                                                <Shield size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-green-800">ยืนยันตัวตนแล้ว</p>
                                                <p className="text-xs text-green-600">บัญชีของคุณปลอดภัย</p>
                                            </div>
                                        </div>
                                        <CheckCircle size={20} className="text-green-500" />
                                    </li>
                                </ul>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 p-3 rounded-lg transition duration-200 text-sm font-medium cursor-pointer"
                                    >
                                        <LogOut size={18} /> ออกจากระบบ
                                    </button>
                                </div>
                            </div>

                            {/* --- Upgrade Options (แสดงเมื่อไม่ใช่ Agent/Partner/Admin) --- */}
                            <div className="space-y-4">
                                {/* ปุ่มสมัคร Agent (ถ้ายังไม่เป็น) */}
                                {user.role !== "Agent" && user.role !== "Admin" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group border border-[#e6cfaa]"
                                        onClick={handleNavigateToAgentRegister}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#bf953f] via-[#fcf6ba] to-[#b38728] opacity-90"></div>
                                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>
                                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />

                                        <div className="relative p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/90 p-3.5 rounded-full shadow-md text-[#8a651b] backdrop-blur-sm">
                                                    <Crown size={26} strokeWidth={2.5} />
                                                </div>
                                                <div className="text-[#5c4013]">
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="text-lg font-extrabold tracking-tight leading-none">
                                                            AGENT
                                                        </h4>
                                                        <Sparkles size={14} className="text-[#5c4013] animate-pulse" />
                                                    </div>
                                                    <p className="text-xs font-semibold mt-1 opacity-90">
                                                        สมัครเป็น Partner Agent
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-white/30 p-2 rounded-full text-[#5c4013] group-hover:bg-white/50 transition-all">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ปุ่มสมัคร Partner (ถ้ายังไม่เป็น) */}
                                {user.role !== "Partner" && user.role !== "Admin" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group border border-blue-200"
                                        onClick={handleNavigateToPartnerRegister}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#2c3e50] to-[#4ca1af] opacity-90"></div>
                                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300"></div>

                                        <div className="relative p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-white/90 p-3.5 rounded-full shadow-md text-[#2c3e50] backdrop-blur-sm">
                                                    <Handshake size={26} strokeWidth={2.5} />
                                                </div>
                                                <div className="text-white">
                                                    <div className="flex items-center gap-1.5">
                                                        <h4 className="text-lg font-extrabold tracking-tight leading-none">
                                                            PARTNER
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs font-medium mt-1 opacity-90 text-blue-50">
                                                        สมัครเป็น Business Partner
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-white/20 p-2 rounded-full text-white group-hover:bg-white/30 transition-all">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                        </div>

                        {/* ส่วนฟอร์มข้อมูล (ขวา) */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
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
                                                value={isEditing ? tempUser.firstName : user.firstName}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`w-full p-3 rounded-lg border transition duration-200 outline-none ${isEditing ? "border-gray-300 focus:border-[#bfa074] focus:ring-2 focus:ring-[#bfa074]/20 bg-white" : "border-transparent bg-gray-50 text-gray-500 cursor-default"}`}
                                            />
                                        </FormGroup>

                                        <FormGroup label="นามสกุล" isEditing={isEditing}>
                                            <input
                                                name="lastName"
                                                value={isEditing ? tempUser.lastName : user.lastName}
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
                                                    value={isEditing ? tempUser.email : user.email}
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
                                                    value={isEditing ? tempUser.phone : user.phone}
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
                                                        value={isEditing ? tempUser.address : user.address}
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
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const FormGroup = ({ label, children, isEditing }) => (
    <div className="flex flex-col gap-1.5">
        <label className={`text-sm font-medium ${isEditing ? "text-gray-700" : "text-gray-400"}`}>{label}</label>
        {children}
    </div>
);

export default Profile;