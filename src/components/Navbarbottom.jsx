import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbarbottom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  // เลื่อนไปยัง section ต่าง ๆ ในหน้า Sell
  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== "/Project/Sell") {
      navigate(`/Project/Sell#${sectionId}`);
      //  เลื่อนขึ้นสุดเมื่อย้ายไปหน้า Sell
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ฟังก์ชันพิเศษสำหรับปุ่ม "เสนอขายบ้าน"
  const handleGoToRegister = () => {
    if (location.pathname === "/Project/Sell") {
      const section = document.getElementById("register-form");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/Project/Sell#register-form");
      //  เพิ่ม scrollToTop เมื่อเปลี่ยนหน้า
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  //   "ผู้ขาย"  ถ้าอยู่นอกหน้า /Sell ให้ไปหน้า /Sell แล้วเลื่อนขึ้นสุด
  const handleGoToTop = () => {
    if (location.pathname === "/Project/Sell") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/Project/Sell");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <nav className="bg-amber-950 backdrop-blur-sm text-white py-3 md:py-4 shadow-inner ">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-6 text-sm md:text-base font-medium">
        
        <button
          onClick={handleGoToTop}
          className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer bg-transparent border-none"
        >
          {t("Navbarbottom.T1")}
        </button>

        <button
          onClick={() => handleScrollToSection("steps")}
          className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer bg-transparent border-none"
        >
           {t("Navbarbottom.T2")}
        </button>

        <button
          onClick={() => handleScrollToSection("why-homerun")}
          className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer bg-transparent border-none"
        >
           {t("Navbarbottom.T3")}
        </button>
         
        <button
          onClick={() => handleScrollToSection("faq")}
          className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer bg-transparent border-none"
        >
           {t("Navbarbottom.T4")}
        </button>

       <Link to="/Project/Profile">
  <button
    onClick={() => handleScrollToSection("faq")}
    className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full shadow transition-colors duration-200 cursor-pointer"
  >
    {t("Navbarbottom.T5")}
  </button>
</Link>
      </div>
    </nav>
  );
};

export default Navbarbottom;
