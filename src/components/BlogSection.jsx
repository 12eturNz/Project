import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogSection = () => {
  const { t } = useTranslation();
  const blogs = [
    
    {
      id: 1,
      date: "November 16, 2025",
      title:  t("Blog.title"),
      category: t("Blog.category"),
      image: "https://news.thaipbs.or.th/media/Dms94pzOffeDNs7S1pUs9KVQW5qkVZr9Nn.jpg",
      link: "/blog/9",
    },
    {
      id: 2,
      date: "October 24, 2025",
      title: t("Blog.title1"),
      category: t("Blog.category"),
      image: "https://www.infoquest.co.th/dxt-content/uploads/2025/03/20250320_IQMY_Stock-Graph-1024x576.png",
      link: "/blog/7",
    },
    {
      id: 3,
      date: "November 10, 2025",
      title:  t("Blog.title2"),
      category:  t("Blog.category1"),
      image: "https://www.infoquest.co.th/dxt-content/uploads/2025/06/20250618_IQMY_UK-1024x576.png",
      link: "/blog/8",
    },
  ];

  return (
    <section className="w-full bg-white py-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
        Premium New
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

      <div className="flex justify-center mt-10">
        <Link
          to="/Project/Blog"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="border border-gray-400 text-gray-700 px-8 py-2 rounded-full hover:bg-gray-800 hover:text-white transition duration-300"
        >
         {t("Blog.Search")}
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
