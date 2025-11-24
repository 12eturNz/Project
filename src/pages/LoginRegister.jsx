import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css";
import Asset from "../assets/Asset.png";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // --- 1. สมัครสมาชิก (User ทั่วไป) ---
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
    if (allUsers[email]) {
      alert("อีเมลนี้ถูกใช้งานแล้ว");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      role: "User", // สมัครใหม่เป็น User เสมอ
      joinDate: new Date().toLocaleDateString("th-TH"),
      avatar: ""
    };

    allUsers[email] = newUser;
    localStorage.setItem("users", JSON.stringify(allUsers));

    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    setIsActive(false);
  };

  // --- 2. เข้าสู่ระบบ (Fix Admin Role) ---
  const handleLogin = (e) => {
    e.preventDefault();

    const allUsers = JSON.parse(localStorage.getItem("users") || "{}");
    let user = allUsers[email];

    // *** เช็คว่าเป็น Admin หรือไม่ ***
    if (email === "admin@test.com" && password === "1234") {
      
      // ✅ บังคับอัปเดตข้อมูล Admin ใหม่เสมอ (แก้ปัญหาข้อมูลเก่าค้างเป็น Agent)
      const adminUser = {
        username: "Super Admin",
        email: "admin@test.com",
        password: "1234",
        role: "Admin", // <--- FORCE เป็น Admin เท่านั้น
        firstName: "System",
        lastName: "Administrator",
        joinDate: new Date().toLocaleDateString("th-TH"),
        avatar: "https://cdn-icons-png.flaticon.com/512/9703/9703596.png"
      };

      // บันทึกทับลงไปใน LocalStorage ทันที
      allUsers[email] = adminUser;
      localStorage.setItem("users", JSON.stringify(allUsers));

      // Login
      localStorage.setItem("currentUser", email);
      window.dispatchEvent(new Event("auth-change"));
      
      alert("เข้าสู่ระบบ Admin สำเร็จ (รีเซ็ตสิทธิ์เป็น Admin เรียบร้อย)");
      navigate("/Project/Profile");
      return;
    }

    // *** เช็ค User ทั่วไป ***
    if (user && user.password === password) {
      localStorage.setItem("currentUser", email);
      window.dispatchEvent(new Event("auth-change"));
      alert("เข้าสู่ระบบสำเร็จ!");
      navigate("/Project/Profile");
    } else {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      window.location.href = "/Project/";
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="login-page-wrapper">
      <div className={`login-container ${isActive ? "active" : ""}`} id="container">
        
        {/* Sign Up */}
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>สร้างบัญชีใหม่</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>หรือใช้อีเมลเพื่อสมัคร</span>
            <input type="text" placeholder="ชื่อผู้ใช้" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">สมัครสมาชิก</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in">
          <i className="fa-solid fa-arrow-left back-btn" onClick={() => window.location.href = "/Project/"} />
          <form onSubmit={handleLogin}>
            <h1>เข้าสู่ระบบ</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>หรือใช้รหัสผ่านของคุณ</span>
            <input type="email" placeholder="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="รหัสผ่าน" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#">ลืมรหัสผ่าน?</a>
            <button type="submit">เข้าสู่ระบบ</button>
          </form>
        </div>

        {/* Toggle */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>ยินดีต้อนรับกลับ!</h1>
              <p>กรอกข้อมูลส่วนตัวของคุณเพื่อใช้งานเว็บไซต์</p>
              <button className="btn-transparent" onClick={() => setIsActive(false)}>เข้าสู่ระบบ</button>
            </div>
            <div className="toggle-panel toggle-right">
              <a href="/Project/" style={{ marginBottom: "15px", display: "flex", justifyContent: "center" }}>
                <img src={Asset} alt="Logo" className="logo-image" style={{ width: "150px", height: "auto", objectFit: "contain" }} />
              </a>
              <h1>ลงทะเบียนเลย!</h1>
              <p>ลงทะเบียนข้อมูลส่วนตัวของคุณเพื่อเริ่มใช้งาน</p>
              <button className="btn-transparent" onClick={() => setIsActive(true)}>สมัครสมาชิก</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;