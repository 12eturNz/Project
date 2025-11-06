import React from "react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      date: "October 01, 2025",
      title: "ห้องใหญ่พิเศษ รีโนเวทให้ฟรี",
      category: "การลงทุน",
      image: "https://img.homerunproptech.com/home/picture/home_picture_img_0_18_Apr_2024_1713426627147.webp",
      link: "/blog/reno-free",
    },
    {
      id: 2,
      date: "June 04, 2025",
      title: "#ลดล้มทุน 7 โครงการ ลดรวม 8 ล้าน",
      category: "การลงทุน",
      image: "https://img.homerunproptech.com/home/picture/home_picture_img_0_22_Jan_2024_1705897753535.webp",
      link: "/blog/sale-8m",
    },
    {
      id: 3,
      date: "January 01, 2025",
      title: "Homerun  ชวนเพื่อน ๆ ร่วมแคมเปญ “Homerun Gets Friends”",
      category: "โปรโมชั่น",
      image: "https://img.homerunproptech.com/home/picture/home_picture_img_0_18_Apr_2024_1713426627147.webp",
      link: "/blog/homerun-friends",
    },
  ];

  return (
    <section className="w-full bg-white py-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
        HOMERUN BLOG
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl px-4">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            to={blog.link}
            className="group flex flex-col cursor-pointer transition-transform"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-56 object-cover rounded-xl transform transition duration-500 group-hover:scale-110 group-hover:shadow-xl"
              />
            </div>

            <p className="text-sm text-gray-400 mt-3">{blog.date}</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-1 group-hover:text-[#bfa074] transition">
              {blog.title}
            </h3>
            <p className="italic text-gray-500 mt-1">{blog.category}</p>
          </Link>
        ))}
      </div>

      <Link
        to="/blog"
        className="mt-10 border border-gray-400 text-gray-700 px-8 py-2 rounded-full hover:bg-gray-800 hover:text-white transition duration-300"
      >
        ดูทั้งหมด
      </Link>
    </section>
  );
};

export default BlogSection;
