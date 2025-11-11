import React from "react";
import { Link } from "react-router-dom"; // ✅ เพิ่ม import

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.id}`} // ลิงก์ไปหน้ารายละเอียด
      className="block group cursor-pointer bg-white border border-gray-100 rounded-2xl shadow-sm 
      hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div className="p-5">
        <p className="text-xs uppercase text-gray-500 tracking-widest mb-1">
          {post.category}
        </p>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-[#6e5b54] transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-sm text-gray-400">{post.date}</p>
      </div>
    </Link>
  );
}
