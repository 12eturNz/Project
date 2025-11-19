import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BlogCarousel({ posts }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <p className="text-sm opacity-80">{post.date}</p>
                <h2 className="text-2xl font-bold">{post.title}</h2>
                <p className="mt-1 text-sm">{post.category}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
