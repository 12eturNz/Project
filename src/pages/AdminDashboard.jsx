import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbartop";
import Footer from "../components/Footer";
import { CheckCircle, XCircle, Briefcase, Handshake, Trash2, Users, UserX, Settings, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// เพิ่ม onBack prop เข้ามา เพื่อให้สามารถเรียกกลับไปที่ Profile ได้
export default function AdminDashboard({ onBack }) { 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users"); // Default tab: users
  const [agentRequests, setAgentRequests] = useState([]);
  const [partnerRequests, setPartnerRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]); 

  // 1. โหลดข้อมูล
  useEffect(() => {
    checkAdminAccess();
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [navigate]);

  const checkAdminAccess = () => {
    const currentUserEmail = localStorage.getItem("currentUser");
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    const currentUser = users[currentUserEmail];

    const roles = currentUser?.roles || (currentUser?.role ? [currentUser.role] : []);
    if (!currentUser || (!roles.includes("Admin") && currentUser.role !== "Admin")) {
      // ไม่มีการนำทางออกจากหน้านี้เพราะถูกเรียกใช้ใน Profile.jsx แล้ว
      // navigate("/Project/");
    }
  };

  const loadData = () => {
    const aReq = JSON.parse(localStorage.getItem("agent_requests") || "[]");
    const pReq = JSON.parse(localStorage.getItem("partner_requests") || "[]");
    const usersObj = JSON.parse(localStorage.getItem("users") || "{}");
    
    const usersArray = Object.values(usersObj).map(u => {
        // จัดการ roles ให้อยู่ในรูปแบบ Array เสมอ
        if (u.role && !u.roles) {
            u.roles = [u.role];
            delete u.role;
        } else if (!u.roles) {
            u.roles = ["User"];
        }
        return u;
    });

    setAgentRequests(aReq);
    setPartnerRequests(pReq);
    setAllUsers(usersArray);
  };

  // --- ฟังก์ชันอนุมัติ (Approve) ---
  const handleApprove = (reqId, userEmail, type) => {
    if (!confirm(`ยืนยันการอนุมัติ ${userEmail} เป็น ${type}?`)) return;

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[userEmail]) {
      let user = users[userEmail];
      let currentRoles = user.roles || (user.role ? [user.role] : ["User"]);

      if (!currentRoles.includes(type)) {
        currentRoles.push(type);
      }
      user.roles = currentRoles;
      if (user.role) delete user.role;
      
      localStorage.setItem("users", JSON.stringify(users));
    }

    const storageKey = type === "Agent" ? "agent_requests" : "partner_requests";
    const requests = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedRequests = requests.map((req) => 
      req.id === reqId ? { ...req, status: "Approved" } : req
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedRequests));

    loadData();
    alert(`อนุมัติสำเร็จ! เพิ่มสถานะ ${type} ให้กับ ${userEmail} แล้ว`);
    window.dispatchEvent(new Event("auth-change"));
  };

  // --- ฟังก์ชันปฏิเสธ (Reject) ---
  const handleReject = (reqId, type) => {
    if (!confirm("ยืนยันการปฏิเสธคำขอนี้?")) return;
    const storageKey = type === "Agent" ? "agent_requests" : "partner_requests";
    const requests = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const updatedRequests = requests.map((req) => 
      req.id === reqId ? { ...req, status: "Rejected" } : req
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedRequests));
    loadData();
  };

  // --- ฟังก์ชันยึดสิทธิ์คืน (Revoke Rights) ---
  const handleRevoke = (userEmail, roleToRemove) => {
    if (!confirm(`ต้องการยึดสิทธิ์ "${roleToRemove}" คืนจาก ${userEmail} ใช่หรือไม่?`)) return;

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[userEmail]) {
        const user = users[userEmail];
        const newRoles = (user.roles || []).filter(r => r !== roleToRemove);
        if (newRoles.length === 0) newRoles.push("User"); // ถ้าไม่มีสิทธิ์อื่นเลย ให้เป็น User

        user.roles = newRoles;
        localStorage.setItem("users", JSON.stringify(users));
        
        loadData();
        alert(`ยึดสิทธิ์ ${roleToRemove} เรียบร้อยแล้ว`);
        window.dispatchEvent(new Event("auth-change"));
    }
  };

  // ---  ฟังก์ชันลบ User ทิ้งถาวร (Delete User) ---
  const handleDeleteUser = (userEmail) => {
    if (!confirm(`⚠️ คำเตือน: คุณแน่ใจหรือไม่ที่จะลบผู้ใช้งาน ${userEmail} ถาวร?\nข้อมูลทั้งหมดจะหายไปและกู้คืนไม่ได้!`)) return;

    const currentUser = localStorage.getItem("currentUser");
    if (userEmail === currentUser) {
        alert("ไม่สามารถลบบัญชีตัวเองขณะเข้าสู่ระบบได้");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[userEmail]) {
        // 1. ลบออกจาก Users
        delete users[userEmail];
        localStorage.setItem("users", JSON.stringify(users));

        // 2. ลบประวัติคำขอต่างๆ ของ User นี้ออกด้วย (Cleanup)
        const aReq = JSON.parse(localStorage.getItem("agent_requests") || "[]");
        const newAReq = aReq.filter(r => r.email !== userEmail);
        localStorage.setItem("agent_requests", JSON.stringify(newAReq));

        const pReq = JSON.parse(localStorage.getItem("partner_requests") || "[]");
        const newPReq = pReq.filter(r => r.email !== userEmail);
        localStorage.setItem("partner_requests", JSON.stringify(newPReq));

        loadData();
        alert(`ลบผู้ใช้งาน ${userEmail} เรียบร้อยแล้ว`);
    }
  };
  
  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]"
    >
        <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500 rounded-lg text-white shadow-md">
                        <Settings size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Admin Panel: จัดการผู้ใช้งาน</h1>
                </div>
                {/* ปุ่มย้อนกลับสำหรับกรณีที่ใช้ AdminDashboard เป็น Component ย่อย */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium text-sm transition px-4 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <ArrowRight size={16} className="rotate-180" /> กลับไปยังข้อมูลส่วนตัว
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-4 mb-6 border-b border-gray-200">
              <TabButton 
                label="จัดการผู้ใช้งานทั้งหมด" 
                icon={<Users size={16} />}
                isActive={activeTab === "users"} 
                onClick={() => setActiveTab("users")} 
              />
              <TabButton 
                label="คำขอเป็น Agent" 
                count={agentRequests.filter(r => r.status === "Pending").length} 
                isActive={activeTab === "agent"} 
                onClick={() => setActiveTab("agent")} 
              />
              <TabButton 
                label="คำขอเป็น Partner" 
                count={partnerRequests.filter(r => r.status === "Pending").length} 
                isActive={activeTab === "partner"} 
                onClick={() => setActiveTab("partner")} 
              />
            </div>

            {/* Table Content */}
            <div className="bg-white rounded-xl overflow-hidden">
              {activeTab === "users" ? (
                <AllUsersTable users={allUsers} onRevoke={handleRevoke} onDeleteUser={handleDeleteUser} />
              ) : (
                <RequestTable 
                    data={activeTab === "agent" ? agentRequests : partnerRequests} 
                    type={activeTab === "agent" ? "Agent" : "Partner"}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
              )}
            </div>
        </div>
    </motion.div>
  );
}

// --- Component: ปุ่ม Tab ---
const TabButton = ({ label, count, isActive, onClick, icon }) => (
    <button
      onClick={onClick}
      className={`pb-3 px-4 font-medium transition cursor-pointer flex items-center gap-2 relative ${
        isActive ? "text-red-600" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {icon}
      {label}
      {count > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-1">
          {count}
        </span>
      )}
      {isActive && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-full" />}
    </button>
);

// --- Component: ตารางคำขอ (Request) ---
const RequestTable = ({ data, type, onApprove, onReject }) => {
  const pendingData = data.filter(r => r.status === "Pending");
  const processedData = data.filter(r => r.status !== "Pending");
  const sortedData = [...pendingData, ...processedData]; // Pending first

  if (data.length === 0) return <div className="p-10 text-center text-gray-500">ไม่มีรายการคำขอ</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600 uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">วันที่</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">ชื่อ / ข้อมูล</th>
            <th className="px-6 py-4">สถานะ</th>
            <th className="px-6 py-4 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sortedData.map((req) => (
            <tr key={req.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-gray-500">{req.requestDate || '-'}</td>
              <td className="px-6 py-4 font-medium">{req.email}</td>
              <td className="px-6 py-4">
                {type === "Agent" ? `${req.firstName || '-'} ${req.lastName || '-'}` : req.companyName || '-'}
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {req.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {req.status === "Pending" && (
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onApprove(req.id, req.email, type)} className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 cursor-pointer"><CheckCircle size={18} /></button>
                    <button onClick={() => onReject(req.id, type)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 cursor-pointer"><XCircle size={18} /></button>
                  </div>
                )}
                {req.status !== "Pending" && <span className="text-gray-400">-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Component: ตารางจัดการ User ทั้งหมด (มีปุ่มลบ User) ---
const AllUsersTable = ({ users, onRevoke, onDeleteUser }) => {
    if (users.length === 0) return <div className="p-10 text-center text-gray-500">ไม่พบข้อมูลผู้ใช้งาน</div>;

    // กรองและเรียงลำดับ: Admin, Agent/Partner, User ธรรมดา
    const sortedUsers = [...users].sort((a, b) => {
        const roleA = a.roles || [];
        const roleB = b.roles || [];

        if (roleA.includes("Admin") && !roleB.includes("Admin")) return -1;
        if (!roleA.includes("Admin") && roleB.includes("Admin")) return 1;
        
        if ((roleA.includes("Agent") || roleA.includes("Partner")) && !(roleB.includes("Agent") || roleB.includes("Partner"))) return -1;
        if (!(roleA.includes("Agent") || roleB.includes("Partner")) && (roleB.includes("Agent") || roleB.includes("Partner"))) return 1;

        return 0;
    });

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">ชื่อผู้ใช้</th>
              <th className="px-6 py-4">สถานะปัจจุบัน</th>
              <th className="px-6 py-4 text-center">ยึดสิทธิ์คืน (Revoke)</th>
              <th className="px-6 py-4 text-center text-red-600">ลบบัญชี</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedUsers.map((u, index) => {
                const roles = u.roles || (u.role ? [u.role] : ["User"]);
                const isOnlyUser = roles.length === 1 && roles.includes("User");
                const isAdminUser = roles.includes("Admin");
                
                return (
                    <tr key={u.email || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-700">{u.email}</td>
                        <td className="px-6 py-4">{u.username}</td>
                        <td className="px-6 py-4">
                            <div className="flex gap-1 flex-wrap">
                                {roles.map(r => (
                                    <span key={r} className={`px-2 py-1 rounded text-xs border ${
                                        r === 'Admin' ? 'bg-red-100 text-red-700 border-red-200' :
                                        r === 'Agent' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                        r === 'Partner' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                                        'bg-gray-100 text-gray-600 border-gray-200'
                                    }`}>
                                        {r}
                                    </span>
                                ))}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            <div className="flex justify-center gap-2">
                                {roles.includes("Agent") && (
                                    <button 
                                        onClick={() => onRevoke(u.email, "Agent")}
                                        className="flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 rounded border border-orange-200 hover:bg-orange-100 transition cursor-pointer text-xs"
                                    >
                                        <Trash2 size={12} /> ถอน Agent
                                    </button>
                                )}
                                {roles.includes("Partner") && (
                                    <button 
                                        onClick={() => onRevoke(u.email, "Partner")}
                                        className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded border border-blue-200 hover:bg-blue-100 transition cursor-pointer text-xs"
                                    >
                                        <Trash2 size={12} /> ถอน Partner
                                    </button>
                                )}
                                {isOnlyUser && !isAdminUser && <span className="text-gray-300 text-xs">-</span>}
                            </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                            {!isAdminUser && ( // ห้ามลบ Admin
                                <button 
                                    onClick={() => onDeleteUser(u.email)}
                                    className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition cursor-pointer"
                                    title="ลบผู้ใช้งานถาวร"
                                >
                                    <UserX size={18} />
                                </button>
                            )}
                            {isAdminUser && <span className="text-gray-400">Admin</span>}
                        </td>
                    </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    );
};