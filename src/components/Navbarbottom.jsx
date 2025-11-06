import React from "react";
import { Link } from "react-router-dom";

const Navbarbottom = () => {
  return (
    <nav className="bg-[#5A4A45]/95 backdrop-blur-sm text-white py-3 md:py-4 shadow-inner">

      <div className="container mx-auto flex flex-wrap justify-center items-center gap-6 text-sm md:text-base font-medium">
        <Link
          to="/seller"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          ผู้ขาย
        </Link>
        <Link
          to="/steps"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          ขั้นตอนการขายบ้าน
        </Link>
        <Link
          to="/why-homerun"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          ทำไมต้อง HOMERUN
        </Link>
        <Link
          to="/faq"
          className="hover:text-yellow-400 transition-colors duration-200"
        >
          คำถามที่พบบ่อย
        </Link>
        <Link
          to="/offer"
          className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-full shadow transition-colors duration-200"
        >
          เสนอขายบ้าน
        </Link>
      </div>
    </nav>
  );
};

export default Navbarbottom;
