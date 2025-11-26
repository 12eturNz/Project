import React from "react";
import { NavLink } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 pt-10 pb-6 mt-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* เส้นบางด้านบน */}
        <div className="border-t border-[#d8d5d0] w-4/5 mx-auto mb-6"></div>

        {/* เมนูหลัก */}
        <div className="flex flex-wrap justify-center gap-6 mb-4 font-semibold text-[15px] text-[#7b6651]">
          <NavLink to="/about" className="hover:text-[#bfa074]">เกี่ยวกับ</NavLink>
          <NavLink to="" className="hover:text-[#bfa074]">คำถามที่พบบ่อย</NavLink>
          
          <NavLink to="/about" className="hover:text-[#bfa074]">ติดต่อเรา</NavLink>
        
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8 font-semibold text-[15px] text-[#7b6651]">
           <NavLink to="/agent" className="hover:text-[#bfa074]"> เอเจนท์</NavLink>
            <NavLink to="/partner" className="hover:text-[#bfa074]">พาร์ทเนอร์</NavLink>
        </div>

        {/* ข้อมูลบริษัท */}
        <p className="text-sm text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
          <span className="font-semibold">ที่อยู่บริษัท</span> 100/50 อาคารศรีปทุม  ชั้น 8 
          ซ.บางบัว 16 (สามเเสน) ถ.บางเขน แขวงคลองหลวง
          เขตคลองหลวง กรุงเทพมหานคร 10111
        </p>

                {/*  เบอร์ / Sales / Email / ปุ่ม Contact us */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-700 mb-8 max-w-5xl mx-auto px-4">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">เบอร์โทรศัพท์:</span>
                  <span>09-1123456 ต่อ 888</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-semibold">เบอร์โทรศัพท์ (Sales):</span>
                  <span>000-1111111</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-semibold">อีเมล:</span>
                  <span>Premium@gmail.com</span>
                </div>

                <NavLink
                to="/contact" //ยังไม่link
                className="bg-[#6e5b54] text-white px-6 py-2 rounded-full hover:bg-[#5c4a45] transition text-sm"
              >
                Contact us
              </NavLink>

          </div>


        {/* Social icons */}
        <div className="flex justify-center gap-4 mb-4">
          <a
            href="#"
            className="bg-[#bfa074] text-white w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80 transition"
          >
            <i className="fab fa-facebook-f text-sm"></i>
          </a>
          <a
            href="#"
            className="bg-[#bfa074] text-white w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80 transition"
          >
            <i className="fab fa-line text-sm"></i>
          </a>
          <a
            href="#"
            className="bg-[#bfa074] text-white w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80 transition"
          >
            <i className="fab fa-instagram text-sm"></i>
          </a>
          <a
            href="#"
            className="bg-[#bfa074] text-white w-8 h-8 flex items-center justify-center rounded-full hover:opacity-80 transition"
          >
            <i className="fab fa-tiktok text-sm"></i>
          </a>
        </div>

        {/* ลิขสิทธิ์ */}
        <div className="mt-8 space-y-2">
          <p className="text-xs text-gray-500">
            © ลิขสิทธิ์ พ.ศ. 2800-2900 บริษัท Premimum Asset จำกัด
          </p>
          <div className="flex justify-center gap-6 text-xs text-gray-500">
            <a href="/terms" className="hover:text-[#bfa074]">เงื่อนไขการบริการ</a>
            <a href="/privacy" className="hover:text-[#bfa074]">นโยบายความเป็นส่วนตัว</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
