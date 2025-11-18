import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import BlogCarousel from "../components/BlogCarousel";
import BlogTabs from "../components/BlogTabs";
import BlogCard from "../components/ฺBlogCard";
import Navbar from "../components/Navbartop";

const allPosts = [
  { id: 1, title: "อสังหาริมทรัพย์ ไม่สดใส", category: "การลงทุน", date: "October 01, 2025", image: "https://img.pptvhd36.com/thumbor/2023/08/07/news-c4e472d.jpg" },
  { id: 2, title: "10 ปีคอนโดฯตารางเมตรละ 1 ล้าน", category: "การลงทุน", date: "October 03, 2025", image: "https://www.prachachat.net/wp-content/uploads/2025/10/6-21-728x485.jpg" },
  { id: 3, title: "เปิดงบอสังหาริมทรัพย์", category: "ข่าวใหม่", date: "October 10, 2025", image: "https://img.pptvhd36.com/thumbor/2025/03/04/news-98c826e.jpg" },
  { id: 4, title: "Digital twin technology", category: "ข่าวใหม่", date: "October 15, 2025", image: "https://www.prachachat.net/wp-content/uploads/2025/07/10-2-Digital-twin-technology-728x485.jpg" },
  { id: 5, title: "สงครามราคาบ้าน CIMB", category: "ข่าวใหม่", date: "October 20, 2025", image: "https://www.apthai.com/images/production/kOeBanrnQCXtHL4fD3J9bnfO111oz1Lx9waiccxc.jpg" },
  { id: 6, title: "ภาคอสังหาฯ รวมพลังดันเศรษฐกิจปลายปี", category: "การลงทุน", date: "October 22, 2025", image: "https://www.scbam.com/medias/upload/knowladge/world-wide-wealth_20160914_img-01.jpg" },
  { id: 7, title: "คาดยอด presales 9 บ.อสังหาฯ เพิ่มขึ้น 25.1%", category: "ความรู้รอบตัว", date: "October 24, 2025", image: "https://www.infoquest.co.th/dxt-content/uploads/2025/03/20250320_IQMY_Stock-Graph-1024x576.png" },
  { id: 8, title: "อสังหาฯ ใน UK ทรุด", category: "ความรู้รอบตัว", date: "November 10, 2025", image: "https://www.infoquest.co.th/dxt-content/uploads/2025/06/20250618_IQMY_UK-1024x576.png" },
  { id: 9, title: "ตลาดอสังหาฯ แนวโน้มซึมยาว", category: "ความรู้รอบตัว", date: "November 16, 2025", image: "https://news.thaipbs.or.th/media/Dms94pzOffeDNs7S1pUs9KVQW5qkVZr9Nn.jpg" },
];

const Blog = memo(() => {
  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // เลื่อนขึ้น smooth เมื่อเปลี่ยนหมวดหมู่
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  const filteredPosts =
    activeCategory === "ทั้งหมด"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Navbar */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <Navbar />
      </motion.div>

      {/* หัวข้อใหญ่ */}
      <h1 className="text-center text-4xl font-extrabold mt-16 mb-10 text-[#3b2f2f] tracking-wide cursor-default">
        Premium New
      </h1>

      {/* Carousel */}
      <div className="mb-10">
        <BlogCarousel posts={allPosts.slice(0, 3)} />
      </div>

      {/* แถบหมวดหมู่ */}
      <div className="flex justify-center mb-8">
        <BlogTabs
          active={activeCategory}
          setActive={setActiveCategory}
          categories={["ทั้งหมด", "ข่าวใหม่", "การลงทุน", "ความรู้รอบตัว"]}
        />
      </div>

      {/* การ์ดบทความ */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>

      
    </div>
  );
});

export default Blog;
