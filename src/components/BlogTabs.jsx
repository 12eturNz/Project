import React from "react";

export default function BlogTabs({ active, setActive, categories }) {
  return (
    <div className="flex justify-center space-x-8 border-b pb-2 mb-4 text-gray-600">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`font-medium cursor-pointer transition-all duration-200 ${
            active === cat
              ? "text-[#3b2f2f] border-b-2 border-[#3b2f2f] pb-1"
              : "hover:text-[#6e5b54] hover:border-b hover:border-[#cbb9b1] pb-1"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
