import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import PropertyCard from "./PropertyCard";

const allProperties = [
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Aug_2025_1754360537363.jpeg", //1
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_06_Oct_2024_1728222954696.jpeg",//2
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_23_Aug_2025_1755924629539.jpg",//3
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_3_18_Aug_2025_1755481364237.jpg",//4
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_26_Jun_2025_1750933189373.jpeg",//5
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Oct_2025_1759541347423.jpg",//6
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_01_Aug_2025_1754036950870.jpg",//7
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Jul_2024_1720155351377.jpeg",//8
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_13_Aug_2025_1755050147823.jpg",//9
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_29_Sep_2024_1727580031344.jpeg",//10
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_06_Oct_2025_1759726413312.jpeg",//11
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Nov_2023_1699066279800.jpg",//12
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_29_Jan_2025_1738126603832.jpeg",//13
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_2_13_May_2024_1715568479418.jpeg",//14
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_16_Sep_2025_1758001679152.jpeg",//15
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Oct_2025_1759540659542.jpg",//16
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_1_17_Dec_2024_1734405658581.jpeg",//17
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_26_Oct_2024_1729953850240.jpeg",//18
    title: "The Amber at Chatuchak",
    location: "Chatuchak",
    price: "฿26,900,000",
    oldPrice: "฿29,900,000",
    discount: "10",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "5",
    baths: "4",
    land: "51",
    area: "375",
    pricePerSq: "527,451",
    link: "/property/the-amber-at-chatuchak",
  },
 
];

const PropertyGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;
  const totalPages = Math.ceil(allProperties.length / propertiesPerPage);

  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = allProperties.slice(startIndex, startIndex + propertiesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  //  ฟังก์ชันเลขหน้า
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, "...", totalPages);
      else if (currentPage >= totalPages - 2)
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages.map((page, index) =>
      page === "..." ? (
        <span key={index} className="text-gray-400 px-1 select-none cursor-default">
          ...
        </span>
      ) : (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer 
            ${
              currentPage === page
                ? "bg-[#bfa074] text-white font-semibold shadow-md"
                : "text-gray-700 hover:bg-[#bfa074]/20 hover:text-[#bfa074]"
            }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/*  ส่วนกริด */}
      <div className="relative w-full min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentProperties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/*  Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10 text-sm select-none">
        {/* ไปหน้าแรก */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 hover:text-[#bfa074] cursor-pointer transition-all duration-200 disabled:opacity-30"
        >
          <ChevronsLeft size={18} />
        </button>

        {/* ย้อนกลับ */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-gray-400 hover:text-[#bfa074] cursor-pointer transition-all duration-200 disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        {renderPageNumbers()}

        {/* ไปต่อ */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 hover:text-[#bfa074] cursor-pointer transition-all duration-200 disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>

        {/* ไปหน้าสุดท้าย */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 text-gray-400 hover:text-[#bfa074] cursor-pointer transition-all duration-200 disabled:opacity-30"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PropertyGridWithPagination;
