import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import BlogCarousel from "../components/BlogCarousel";
import BlogTabs from "../components/BlogTabs";
import BlogCard from "../components/ฺBlogCard"; 
import Navbar from "../components/Navbartop";
import { useTranslation } from "react-i18next";

const Blog = memo(() => {
  const { t } = useTranslation(); 

  
  const allPosts = [
    { id: 1, title: t("Blog.T1"), category: t("Blog.category"), date: "October 01, 2025", image: "https://img.pptvhd36.com/thumbor/2023/08/07/news-c4e472d.jpg" ,content: t("Blog.TextP") },
    { id: 2, title:t("Blog.T2"), category: t("Blog.category"), date: "October 03, 2025", image: "https://www.prachachat.net/wp-content/uploads/2025/10/6-21-728x485.jpg" ,content: t("Blog.TextP")},
    { id: 3, title: t("Blog.T3"), category: t("Blog.category1"), date: "October 10, 2025", image: "https://img.pptvhd36.com/thumbor/2025/03/04/news-98c826e.jpg",content: t("Blog.TextP")  },
    { id: 4, title: t("Blog.T4"), category: t("Blog.category1"), date: "October 15, 2025", image: "https://www.prachachat.net/wp-content/uploads/2025/07/10-2-Digital-twin-technology-728x485.jpg",content: t("Blog.TextP") },
    { id: 5, title: t("Blog.T5"), category: t("Blog.category1"), date: "October 20, 2025", image: "https://www.apthai.com/images/production/kOeBanrnQCXtHL4fD3J9bnfO111oz1Lx9waiccxc.jpg" ,content: t("Blog.TextP") },
    { id: 6, title:t("Blog.T6"), category: t("Blog.category"), date: "October 22, 2025", image: "https://www.scbam.com/medias/upload/knowladge/world-wide-wealth_20160914_img-01.jpg" ,content: t("Blog.TextP")},
    { id: 7, title: t("Blog.T7"), category: t("Blog.category4"), date: "October 24, 2025", image: "https://www.infoquest.co.th/dxt-content/uploads/2025/03/20250320_IQMY_Stock-Graph-1024x576.png",content: t("Blog.TextP") },
    { id: 8, title:t("Blog.title2") , category: t("Blog.category4"), date: "November 10, 2025", image: "https://www.infoquest.co.th/dxt-content/uploads/2025/06/20250618_IQMY_UK-1024x576.png",content: t("Blog.TextP") },
    { id: 9, title: t("Blog.title"), category: t("Blog.category4"), date: "November 16, 2025", image: "https://news.thaipbs.or.th/media/Dms94pzOffeDNs7S1pUs9KVQW5qkVZr9Nn.jpg",content: t("Blog.TextP") },
  ];

  const [showFixedNavbar, setShowFixedNavbar] = useState(false);
  const [activeCategory, setActiveCategory] = useState( t("Blog.category3"));

  useEffect(() => {
    const handleScroll = () => {
      setShowFixedNavbar(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeCategory]);

  const filteredPosts =
    activeCategory ===  t("Blog.category3")
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showFixedNavbar ? -100 : 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 w-full z-40"
      >
        <Navbar />
      </motion.div>

      <h1 className="text-center text-4xl font-extrabold mt-16 mb-10 text-[#3b2f2f] tracking-wide cursor-default">
        Premium New
      </h1>

      <div className="mb-10">
        <BlogCarousel posts={allPosts.slice(0, 3)} />
      </div>

      <div className="flex justify-center mb-8">
        <BlogTabs
          active={activeCategory}
          setActive={setActiveCategory}
          categories={[
           t("Blog.category3"),
            t("Blog.category"),   
            t("Blog.category1"),
            t("Blog.category4"),
            
          ]}
        />
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>
    </div>
  );
});

export default Blog;
