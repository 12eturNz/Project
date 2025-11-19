import React from "react";

import { useParams, Link, useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbartop";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

export default function BlogDetail() {
   
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const allPosts = [
        
        {
            id: 1,
            title: t("Blog.T1"),
            category: t("Blog.category"),
            date: "October 01, 2025",
            image: "https://img.pptvhd36.com/thumbor/2023/08/07/news-c4e472d.jpg",
            content: (
                <>
             <p>{t("Blog.TextP")}</p>
          <ul>
            <li>{t("Blog.li")}</li>
            </ul>
             <p>{t("Blog.TextP1")}</p>
            <ul>
            <li>{t("Blog.li1")}</li>
            <li>{t("Blog.li2")}</li>
            </ul>
            <img src="https://www.prachachat.net/wp-content/uploads/2025/07/property-1-728x485.jpg" alt="News" />
            <p>{t("Blog.TextP2")}</p>
            </>
           ) ,
        },

        {
            id: 2,
            title: t("Blog.P2"),
            category: t("Blog.category"),
            date: "October 03, 2025",
            image: "https://mpics.mgronline.com/pics/Images/567000011978001.JPEG",
            content: (
                <>
             <p>{t("Blog.T2")}</p>
            <ul>
             <li>{t("Blog.li3")}</li>
             </ul>
             <p>{t("Blog.P3")}</p>
            <ul>
            <li>{t("Blog.li4")}</li><br />
            <li>{t("Blog.li5")}</li>
            </ul>
            <img src="https://www.prachachat.net/wp-content/uploads/2025/10/porche-728x485.jpg" alt="News" />
             <p>{t("Blog.P4")}</p>
            </>
            ),
             },
        {
            id: 3,
            title: t("Blog.T8"),
            category: t("Blog.category1"),
            date: "October 10, 2025",
            image: "https://img.pptvhd36.com/thumbor/2025/03/04/news-98c826e.jpg",
            content: (
                <>
                    <p>{t("Blog.P5")}</p> 
                    <img src="https://img.pptvhd36.com/thumbor/2025/03/04/news-bd39f5e.avif" alt="News" />
                    
                    <p>{t("Blog.P6")}</p>
                    <ul>
                        <li>{t("Blog.li6")} </li>
                        <li>{t("Blog.li7")} </li>
                        <li>{t("Blog.li8")}  </li>
                        <li>{t("Blog.li9")}  </li>
                        <li>{t("Blog.li10")}  </li>
                        <li>{t("Blog.li11")} </li> <br />
                        <img src="https://img.pptvhd36.com/thumbor/2025/03/04/news-5bfba12.avif" alt="News" /> <br />
                        <li>{t("Blog.li12")} </li>
                        <li>{t("Blog.li13")} </li>
                    </ul>
                </>
            ),
        },
        {
                id: 4,
                title: "Digital twin technology",
                category: t("Blog.category1"),
                date: "October 15, 2025",
                image: "https://www.prachachat.net/wp-content/uploads/2025/07/10-2-Digital-twin-technology-728x485.jpg",
                content: (
                    <>
                        <p>Digital twin technology</p>
                        <img src="https://www.bitsathy.ac.in/wp-content/uploads/digital-twin-1-1.jpg" alt="News" />
                        
                        <p>{t("Blog.P7")}</p>
                        <ul>
                            <li>
                                {t("Blog.li14")}
                            </li>
                            <li>
                                {t("Blog.li15")}
                            </li>
                            <li> 
                                {t("Blog.li16")}
                            </li>
                            <li>
                               {t("Blog.li117")}
                            </li> <br />
                            
                            <img src="https://bdi.or.th/wp-content/uploads/2022/02/Picture1-2.jpg" alt="News" /> <br />
                            
                            <li>
                                {t("Blog.li18")}
                            </li>
                        </ul>
                    </>
                ),
            },
        {
                id: 5,
                title: t("Blog.T5"),
                category: t("Blog.category1"),
                date: "October 20, 2025",
                image: "https://www.apthai.com/images/production/kOeBanrnQCXtHL4fD3J9bnfO111oz1Lx9waiccxc.jpg",
                content: (
                    <>
                        <p> {t("Blog.P8")}</p>
                        
                        <ul>
                            <li>
                                {t("Blog.li19")}
                            </li> <br />
                            <li>
                                 {t("Blog.li20")}
                            </li> <br />
                            <li> 
                                 {t("Blog.li21")}
                            </li>
                        </ul><br />
                        
                        <img src="https://www.reic.or.th/Upload/792_799_1756693491_52199.jpg" alt="News" /> 
                        <br />
                        
                        <ul>
                            <li>
                                 {t("Blog.li22")}
                            </li>
                        </ul>
                    </>
                ),
            },
       {
            id: 6,
            title: t("Blog.T9"),
            category: t("Blog.category"),
            date: "October 22, 2025",
            image: "https://www.scbam.com/medias/upload/knowladge/world-wide-wealth_20160914_img-01.jpg",
            content: (
                <>
                <p>
                    {t("Blog.P9")}
                </p>

                <ul className="space-y-4 mt-4">
                    <li>
                    {t("Blog.li23")}
                    </li>

                    <li>
                   {t("Blog.li24")}
                    </li>

                    <li>
                   {t("Blog.li25")}
                    </li>

                    <img
                    src="https://www.infoquest.co.th/dxt-content/uploads/2025/10/3E420CE94F4D3292831080DF680130FD.jpg"
                    alt="News"
                    className="my-4"
                    />

                    <li>
                    {t("Blog.li26")}
                    </li>
                </ul>
                </>
            ),
            },

       {
            id: 7,
            title:t("Blog.title1"),
            category: t("Blog.category4"),
            date: "October 24, 2025",
            image: "https://www.tpplandandhouse.com/images/--61-3.jpg",
            content: (
                <>
                <p>
                   {t("Blog.title1")}
                </p>

                <ul className="space-y-4 mt-4">
                    <li>
                  {t("Blog.li27")}
                    </li>

                    <li>
                    {t("Blog.li28")}
                    </li>

                    <li>
                   {t("Blog.li29")}
                    </li>

                    <li>
                    <img
                        src="https://www.infoquest.co.th/dxt-content/uploads/2025/03/20250320_IQMY_Stock-Graph-1024x576.png"
                        alt="News"
                        className="my-4"
                    />
                    </li>
                    {t("Blog.li30")}
                    <li>
                    
                    </li>
                </ul>
                </>
            ),
            },

        {
            id: 8,
            title: t("Blog.title2"),
            category: t("Blog.category4"),
            date: "November 10, 2025",
            image: "https://i.pinimg.com/736x/2c/2a/e3/2c2ae3a8daa31a1c93f0479f33e7abf7.jpg",
            content: (
                <>
                <br />
                <p>
                   {t("Blog.P11")}
                </p>

                <ul>
                    <li>
                   {t("Blog.li31")}
                    </li>
                    <br />

                    <li>
                    {t("Blog.li32")}
                    </li>
                    <br />

                    <li>
                   {t("Blog.li33")}
                    </li>
                    <br />

                    <img
                    src="https://www.infoquest.co.th/dxt-content/uploads/2025/06/20250618_IQMY_UK-1024x576.png"
                    alt="News"
                    />
                    <br />

                    <li>
                    {t("Blog.li34")}
                    </li>
                    <br />
                </ul>
                </>
            ),
            },

        {
                id: 9,
                title:  t("Blog.T10"),
                category: t("Blog.category4"),
                date: "November 16, 2025",
                image:
                    "https://www.infoquest.co.th/dxt-content/uploads/2025/03/20250321_IQMY_SCB-EIC-1024x576.png",
                content: (
                    <>
                    <br />
                    <p>
                        {t("Blog.P12")}
                    </p>

                    <ul>
                        <li>
                        {t("Blog.li35")}
                        </li>
                        <br />

                        <li>
                        {t("Blog.li36")}
                        </li>
                        <br />

                        <li>
                        {t("Blog.li37")}
                        </li>
                        <br />

                        <img
                        src="https://i.pinimg.com/736x/3d/41/a1/3d41a1a11dbd9ca2271e63b3fa971568.jpg"
                        alt="News"
                        />
                        <br />

                        <li>
                        {t("Blog.li38")}
                        </li>
                        <br />
                    </ul>
                    </>
                ),
                },

    ];

    const post = allPosts.find((p) => p.id === parseInt(id));

    if (!post)
        return <p className="text-center mt-20 text-gray-600">ไม่พบข้อมูลข่าวนี้</p>;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto px-5 py-16 flex flex-col items-center text-center"
            >
                <div className="w-full text-center relative mb-8">
                    {/* Premium News */}
                    <Link
                        to="/Project/Blog"
                        onClick={() => {
                            // เมื่อย้อนกลับ ให้สกอลล์ลงauto
                            setTimeout(() => {
                                window.scrollTo({ top: 900, behavior: "smooth" });
                            }, 200);
                        }}
                        className="absolute left-0 top-0 text-[#6e5b54] hover:underline text-sm mt-9"
                    >
                        ← Premium News
                    </Link>


                    {/* หัวข้อข่าว */}
                    <h1 className="text-3xl font-bold text-[#2b1d1d] mb-2 mt-6">
                        {post.title}
                    </h1>

                    {/* วันที่ */}
                    <p className="text-gray-500 text-2xl mb-2 mt-6">{post.date}</p>

                    {/* หมวดหมู่ */}
                    <p className="text-2xl font-medium text-gray-600 mb-6 mt-6">
                        {post.category}
                    </p>
                </div>

                {/* รูปภาพ */}
                <div className="-mx-30">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full rounded-md mb-8 shadow object-cover"
                    />
                </div>


                {/* เนื้อหา */}
             <div
                className="
                            text-gray-800 leading-relaxed space-y-4 text-left text-xl
                            [&>p]:text-[#2b1d1d] [&>p]:font-bold
                            [&>img]:mx-auto [&>img]:rounded-2xl [&>img]:shadow-md [&>img]:my-6 [&>img]:w-full [&>img]:max-w-3xl
                        "
                        >
                        {post.content}        
            </div>
            </motion.div>

            <Footer />
        </div>
        
    );
}