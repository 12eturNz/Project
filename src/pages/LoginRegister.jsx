import React, { useState, useEffect } from "react";
import "./LoginRegister.css"; 
import Asset from "../assets/Asset.png";

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);

  //  บังคับให้ปุ่ม Back ย้อนกลับไปหน้า Home ในส่วน location
  useEffect(() => {
    // ล็อค history ไว้ 1 ชั้น
    window.history.pushState(null, "", window.location.href);

    // กด Back  ไปหน้า Home
    const handlePopState = () => {
      window.location.href = "/Project/";
    };

    window.addEventListener("popstate", handlePopState);

    // cleanup เมื่อออกจากLoginRegister
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div className="login-page-wrapper">
      <div className={`container ${isActive ? "active" : ""}`} id="container">

        {/* Sign Up */}
        <div className="form-container sign-up">
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>สร้างบัญชีใหม่</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>หรือใช้อีเมลเพื่อสมัคร</span>
            <input type="text" placeholder="ชื่อผู้ใช้" required />
            <input type="email" placeholder="อีเมล" required />
            <input type="password" placeholder="รหัสผ่าน" required />
            <button>สมัครสมาชิก</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in">
          <i
            className="fa-solid fa-arrow-left back-btn"
            onClick={() => window.location.href = "/"} // Arrow
          />
          <form onSubmit={(e) => e.preventDefault()}>
            <h1>เข้าสู่ระบบ</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            </div>
            <span>หรือใช้รหัสผ่านของคุณ</span>
            <input type="email" placeholder="อีเมล" required />
            <input type="password" placeholder="รหัสผ่าน" required />
            <a href="#">ลืมรหัสผ่าน?</a>
            <button>เข้าสู่ระบบ</button>
          </form>
        </div>

        {/* Toggle */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>ยินดีต้อนรับกลับ!</h1>
              <p>กรอกข้อมูลส่วนตัวของคุณเพื่อใช้งานเว็บไซต์</p>
              <button className="btn-transparent" onClick={() => setIsActive(false)}>
                เข้าสู่ระบบ
              </button>
            </div>

            <div className="toggle-panel toggle-right">
              <a
                href="/Project/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <img
                  src={Asset}
                  alt="Premium Asset Logo"
                  className="logo-image"
                  style={{
                    width: "150px",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              </a>

              <h1>ลงทะเบียนเลย!</h1>
              <p>ลงทะเบียนข้อมูลส่วนตัวของคุณเพื่อเริ่มใช้งาน</p>
              <button className="btn-transparent" onClick={() => setIsActive(true)}>
                สมัครสมาชิก
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
