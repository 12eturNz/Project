import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "ลูกค้าทาวน์โฮมเจริญกรุง",
    text: "ลูกค้าทำเลใกล้โรงเรียนของลูก ต้องการบ้านที่มีหลายห้องและไม่ต้องรีโนเวทเอง พอมาเจอหลังนี้ของ Homerun ลูกค้าตัดสินใจจองทันทีค่ะ",
    image: "/images/review1.jpg",
  },
  {
    name: "ลูกค้าคอนโดสาทร",
    text: "กำลังมองหาคอนโดในย่านสาทรอยู่ค่ะ ห้องนี้ตกแต่งครบพร้อมเข้าอยู่ทันทีเลยตัดสินใจจองค่ะ",
    image: "/images/review2.jpg",
  },
  {
    name: "ลูกค้าคอนโดโซโกะ",
    text: "สนใจดูโครงการของ Homerun เพราะสวย ตกแต่งครบ พร้อมปล่อยเช่าได้เลยค่ะ",
    image: "/images/review3.jpg",
  },
  {
    name: "ลูกค้าคอนโดโซโกะ",
    text: "สนใจดูโครงการของ Homerun เพราะสวย ตกแต่งครบ พร้อมปล่อยเช่าได้เลยค่ะ",
    image: "/images/review3.jpg",
  },
  {
    name: "ลูกค้าคอนโดโซโกะ",
    text: "สนใจดูโครงการของ Homerun เพราะสวย ตกแต่งครบ พร้อมปล่อยเช่าได้เลยค่ะ",
    image: "/images/review3.jpg",
  },
  {
    name: "ลูกค้าคอนโดโซโกะ",
    text: "สนใจดูโครงการของ Homerun เพราะสวย ตกแต่งครบ พร้อมปล่อยเช่าได้เลยค่ะ",
    image: "/images/review3.jpg",
  },
];

const ReviewCarousel = () => {
  return (
    <div className="bg-[#f8f4ef] py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        รีวิวจริงจากลูกค้า & เอเจนท์
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={40}
        slidesPerView={3}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="max-w-[1300px] mx-auto"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white shadow-md rounded-xl p-6 w-[350px] h-[280px] mx-auto flex flex-col justify-between">
              <div>
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-16 h-16 mx-auto rounded-full object-cover border-4 border-[#f8f4ef]"
                />
                <h3 className="font-semibold mt-3 text-gray-700">{r.name}</h3>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  “{r.text}”
                </p>
              </div>
              <p className="text-2xl text-gray-400 font-serif mt-4">”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCarousel;
