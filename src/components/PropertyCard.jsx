import React from "react";
import { NavLink } from "react-router-dom";



const PropertyCard = ({
  image,
  title,
  location,
  price,
  oldPrice,
  discount,
  tag,
  type,
  beds,
  baths,
  land,
  area,
  pricePerSq,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden 
                 w-[360px] cursor-pointer hover:-translate-y-1 block"
    >
      {/* รูปภาพ */}
      <div className="relative w-full aspect-[16/10] overflow-hidden group">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {tag && (
          <span
            className={`absolute top-3 left-3 text-white text-sm font-semibold px-3 py-1 rounded-full ${
              tag === "Renovated"
                ? "bg-green-600"
                : tag === "Select"
                ? "bg-orange-500"
                : "bg-blue-500"
            }`}
          >
            {tag}
          </span>
        )}
      </div>

      {/* เนื้อหา */}
      <div className="p-4">
        {/*  ส่วนใหม่: ข้อมูลสรุป */}
        <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-700">
          {type && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {type}
            </span>
          )}
          {beds && <span className="border px-2 py-1 rounded-full">🛏 {beds} ห้องนอน</span>}
          {baths && <span className="border px-2 py-1 rounded-full">🛁 {baths} ห้องน้ำ</span>}
          {land && <span className="border px-2 py-1 rounded-full">{land} ตร.ว.</span>}
          {area && <span className="border px-2 py-1 rounded-full">{area} ตร.ม.</span>}
          {pricePerSq && (
            <span className="border px-2 py-1 rounded-full">{pricePerSq} ฿/ตร.ว.</span>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{location}</p>

        {/*  ส่วนราคา */}
        <div className="flex items-end gap-2">
          <p className="text-lg font-bold text-blue-600">{price}</p>
          {discount && (
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {oldPrice && (
          <p className="text-sm text-gray-400 line-through mt-1">{oldPrice}</p>
        )}
      </div>
    </NavLink>
  );
};

export default PropertyCard;