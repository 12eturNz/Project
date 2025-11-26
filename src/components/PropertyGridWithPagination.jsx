import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import PropertyCard from "./PropertyCard";




// --- 1. ข้อมูลทรัพย์สินเริ่มต้น (staticProperties) ---
const staticProperties = [
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
    link: "/PropertyDetail1",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_06_Oct_2024_1728222954696.jpeg",//2
    title: "Rhythm Sukhumvit 36 - 38 (15th)",
    location: "Sukhumvit 36-38",
    price: "฿12,500,000",
    oldPrice: "฿14,900,000",
    discount: "16",
    tag: "Select",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "78.04",
    pricePerSq: "160,174",
    link: "/PropertyDetail2",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_23_Aug_2025_1755924629539.jpg",//3
    title: "Siamese Surawong",
    location: "Samyan-Surawong",
    price: "฿13,900,000",
    oldPrice: "฿14,900,000",
    discount: "7",
    tag: "Select",
    type: "Condo",
    beds: "3",
    baths: "2",
    land: "",
    area: "108.6",
    pricePerSq: "127,993",
    link: "/PropertyDetail3",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_3_18_Aug_2025_1755481364237.jpg",//4
    title: "THE QUARTZ at Sukhumvit 6 (Saranjai Mansion)",
    location: "Sukhumvit 6",
    price: "฿9,500,000",
    oldPrice: "฿10,900,000",
    discount: "13",
    tag: "Renovated",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "117",
    pricePerSq: "81,197",
    link: "/PropertyDetail4",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_26_Jun_2025_1750933189373.jpeg",//5
    title: "Rhythm Sathorn",
    location: " Sathorn",
    price: "฿12,500,000",
    oldPrice: "฿13,900,000",
    discount: "10",
    tag: "Select",
    type: "Condo",
    beds: "3",
    baths: "2",
    land: "",
    area: "85.29",
    pricePerSq: "146,559",
    link: "/PropertyDetail5",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Oct_2025_1759541347423.jpg",//6
    title: "Ruamjai Heights",
    location: "Asoke",
    price: "฿14,700,000",
    oldPrice: "",
    discount: "",
    tag: "Select",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "147",
    pricePerSq: "100,000",
    link: "/PropertyDetail6",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_01_Aug_2025_1754036950870.jpg",//7
    title: "THE DRESDEN III at Prestige Towers",
    location: "Prestige Towers Asoke",
    price: "฿13,500,000",
    oldPrice: "฿14,900,000",
    discount: "9",
    tag: "Renovated",
    type: "Condo",
    beds: "3",
    baths: "3",
    land: "",
    area: "174.49",
    pricePerSq: "77,368",
    link: "/PropertyDetail7",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_05_Jul_2024_1720155351377.jpeg",//8
    title: "The Seed Musee",
    location: "Sukhumvit 26 ",
    price: "฿7,500,000",
    oldPrice: "฿8,690,000",
    discount: "14",
    tag: "Renovated",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "78.47",
    pricePerSq: "95,578",
    link: "/PropertyDetail8",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_13_Aug_2025_1755050147823.jpg",//9
    title: "The Waterford Park",
    location: "ทองหล่อ",
    price: "฿23,900,000",
    oldPrice: "฿25,000,000",
    discount: "4",
    tag: "Renovated",
    type: "Condo",
    beds: "3",
    baths: "3",
    land: "",
    area: "212.5",
    pricePerSq: "112,471",
    link: "/PropertyDetail9",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_29_Sep_2024_1727580031344.jpeg",//10
    title: "Rhythm Sukhumvit 36-38 (12th floor)",
    location: "Sukhumvit 36-38",
    price: "฿7,900,000",
    oldPrice: "฿9,290,000",
    discount: "15",
    tag: "Select",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "54.86",
    pricePerSq: "144,003 ",
    link: "/PropertyDetail10",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_13_Mar_2025_1741849568444.jpeg",//11
    title: "The Moonstone Thonglor",
    location: "Thonglor",
    price: "฿22,000,000",
    oldPrice: "",
    discount: "",
    tag: "Renovated",
    type: "Condo",
    beds: "3",
    baths: "3",
    land: "",
    area: "202.17",
    pricePerSq: "108,819",
    link: "/PropertyDetail11",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Nov_2023_1699066279800.jpg",//12
    title: "Onyx Home at Ladprao 71",
    location: "นาคนิวาส 48",
    price: "฿6,790,000",
    oldPrice: "฿8,900,000",
    discount: "24",
    tag: "ขายพร้อมผู้เช่า",
    type: "Townhouse",
    beds: "4",
    baths: "5",
    land: "24.9",
    area: "206",
    pricePerSq: "272,691",
    link: "/PropertyDetail12",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_29_Jan_2025_1738126603832.jpeg",//13
    title: "The Crest Sukhumvit 34",
    location: "Sukhumvit 34",
    price: "฿16,500,000",
    oldPrice: "฿18,500,000",
    discount: "11",
    tag: "Select",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "98.05",
    pricePerSq: "168,281",
    link: "/PropertyDetail13",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_2_13_May_2024_1715568479418.jpeg",//14
    title: "Menam Residences",
    location: "Charoen Krung Road",
    price: "฿11,900,000",
    oldPrice: "฿15,590,000",
    discount: "24",
    tag: "Select",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "88.89",
    pricePerSq: "133,873",
    link: "/PropertyDetail14",
  },
  {
    image: "https://img.homerunproptech.com/marketplace/marketplace_gallery_0_16_Sep_2025_1758001679152.jpeg",//15
    title: "The Sunstone Home",
    location: "Ram Inthra",
    price: "฿10,900,000",
    oldPrice: "",
    discount: "",
    tag: "Renovated",
    type: "Single Detached House",
    beds: "4",
    baths: "2",
    land: "78",
    area: "189",
    pricePerSq: "139,744",
    link: "/PropertyDetail15",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_04_Oct_2025_1759540659542.jpg",//16
    title: "ICON III Thonglor",
    location: "Thonglor",
    price: "฿18,900,000",
    oldPrice: "",
    discount: "",
    tag: "Renovated",
    type: "Condo",
    beds: "3",
    baths: "4",
    land: "",
    area: "184.4",
    pricePerSq: "102,495",
    link: "/PropertyDetail16",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_1_17_Dec_2024_1734405658581.jpeg",//17
    title: "The Diamond 11",
    location: "Sukhumvit 11",
    price: "฿9,900,000",
    oldPrice: "฿10,900,000",
    discount: "9",
    tag: "Renovated",
    type: "Condo",
    beds: "2",
    baths: "2",
    land: "",
    area: "89.73",
    pricePerSq: "110,331",
    link: "/PropertyDetail17",
  },
  {
    image: "	https://img.homerunproptech.com/marketplace/marketplace_gallery_0_26_Oct_2024_1729953850240.jpeg",//18
    title: "The Jasper Ekkamai",
    location: "Jasper Eakkamai",
    price: "฿13,900,000",
    oldPrice: "",
    discount: "",
    tag: "Renovated",
    type: "Condo",
    beds: "3",
    baths: "3",
    land: "",
    area: "116.53",
    pricePerSq: "119,283",
    link: "/PropertyDetail18",
  },
];


// PropertyGridWithPagination.jsx (ส่วนที่แก้ไข)

// --- 2. ฟังก์ชันสำหรับรวมข้อมูลจาก Local Storage และจัดการรายการซ้ำ (ไม่เปลี่ยนแปลง) ---
const getCombinedProperties = (originalList) => {
    let combinedProperties = [...originalList]; 
    
    try {
        const userListings = JSON.parse(localStorage.getItem('userListings')) || []; 
        
        const staticImageUrls = new Set(originalList.map(p => p.image));
        
        const uniqueUserListings = userListings.filter(listing => !staticImageUrls.has(listing.image));
        
        let tempList = [...uniqueUserListings, ...originalList]; 
        
        const seenImages = new Set();
        const finalUniqueList = tempList.filter(p => {
            if (p.image.includes("New+Listing+Pending+Review")) {
                return true; 
            }
            
            if (seenImages.has(p.image)) {
                return false;
            }
            seenImages.add(p.image);
            return true;
        });

        combinedProperties = finalUniqueList; 
        
    } catch (error) {
        console.error("Error loading user listings from Local Storage:", error);
    }
    
    return combinedProperties;
};


// 💡 ลบ const allProperties = getCombinedProperties(staticProperties); ออก


// CRITICAL FIX รับ currentFilters เป็น Prop 
const PropertyGridWithPagination = ({ currentFilters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 9;

    // 💡 NEW STATE: เก็บรายการทรัพย์สินทั้งหมด
    const [allProperties, setAllProperties] = useState([]);
    
    // 💡 NEW useEffect: จัดการการโหลดข้อมูลและ Event Listener
    useEffect(() => {
        // ฟังก์ชันโหลดข้อมูลและอัปเดต State
        const updateProperties = () => {
            setAllProperties(getCombinedProperties(staticProperties));
            // เมื่อข้อมูลเปลี่ยน ให้กลับไปหน้าแรกเพื่อป้องกันหน้าว่าง
            setCurrentPage(1); 
        };

        // 1. โหลดข้อมูลเมื่อ Component Mount ครั้งแรก
        updateProperties(); 
        
        // 2. Add listener: รับฟังการเปลี่ยนแปลงจาก Profile.jsx
        window.addEventListener('listings-updated', updateProperties);

        // 3. Cleanup: ล้าง Listener เมื่อ Component ถูกถอดออก
        return () => {
            window.removeEventListener('listings-updated', updateProperties);
        };
    }, []); // 💡 Empty dependency array: run once on mount

  // ฟังก์ชันช่วยแปลงราคาจาก "฿12,500,000" ให้เป็นตัวเลข
  const parsePrice = (priceStr) => {
    if (!priceStr) return NaN; 
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
  };

  // ฟังก์ชันหลักสำหรับกรองทรัพย์ ใช้ allProperties จาก State
  const filteredProperties = allProperties.filter((property) => {
    const filters = currentFilters;

    //  Search Term (ชื่อ / ที่ตั้ง / ทำเล / โครงการ)
    if (filters && filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      const fieldsToSearch = [property.title, property.location].join(" ").toLowerCase();
      if (!fieldsToSearch.includes(searchTermLower)) return false;
    }

    //  Price Range
    if (filters && (filters.price.min || filters.price.max)) {
      const price = parsePrice(property.price);
      if (isNaN(price)) return false; 
      
      const min = filters.price.min ? parseInt(filters.price.min, 10) : null;
      const max = filters.price.max ? parseInt(filters.price.max, 10) : null;

      if (min !== null && price < min) return false;
      if (max !== null && price > max) return false;
    }

    //  Bedroom
    if (filters && filters.bedroom) {
      const beds = String(property.beds);
      const filterBeds = filters.bedroom;
      if (filterBeds === "5+") {
        if (parseInt(beds, 10) < 5) return false;
      } else if (beds !== filterBeds) {
        return false;
      }
    }

    //  Bathroom
    if (filters && filters.bathroom) {
      const baths = String(property.baths);
      const filterBaths = filters.bathroom;
      if (filterBaths === "5+") {
        if (parseInt(baths, 10) < 5) return false;
      } else if (baths !== filterBaths) {
        return false;
      }
    }

    //  Property Type
    if (filters && filters.type.length > 0) {
      if (!filters.type.includes(property.type)) return false;
    }

    //  Area พื้นที่ดิน/ใช้สอย
    if (filters && filters.area) {
        const areaFilters = filters.area;
        const land = property.land ? parseFloat(property.land) : 0;
        const area = property.area ? parseFloat(property.area) : 0;

        // พื้นที่ดิน ตร.วา
        if (areaFilters.minLand) {
          if (land < parseFloat(areaFilters.minLand)) return false;
        }
        if (areaFilters.maxLand) {
          if (land > parseFloat(areaFilters.maxLand)) return false;
        }

        // พื้นที่ใช้สอย ตร.เมตร
        if (areaFilters.minArea) {
          if (area < parseFloat(areaFilters.minArea)) return false;
        }
        if (areaFilters.maxArea) {
          if (area > parseFloat(areaFilters.maxArea)) return false;
        }
    }


    //  Series Tag
    if (filters && filters.series.length > 0) {
      if (property.tag && !filters.series.includes(property.tag)) return false;
    }

    return true; // ถ้าผ่านทุกเงื่อนไข
  });


  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // เมื่อ Filters เปลี่ยน ให้กลับไปหน้าแรก
  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilters]);

  const startIndex = (currentPage - 1) * propertiesPerPage;
  // ใช้ filteredProperties ในการแบ่งหน้า
  const currentProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  //  ฟังก์ชันเลขหน้า
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
        {filteredProperties.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-xl text-gray-500">ไม่พบทรัพย์ที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
            </div>
        ) : (
            <>
            {/* ส่วนกริด */}
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

            {/* Pagination */}
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
            </>
        )}
    </div>
  );
};

export default PropertyGridWithPagination;