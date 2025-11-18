import React from "react";
import { motion } from "framer-motion";

const propertyTypes = [
  {
    title: "บ้านเดี่ยว",
    image:
      "	https://www.homerunproptech.com/assets/images/seller/singlehouse.jpg",
  },
  {
    title: "บ้านแฝด",
    image:
      "	https://www.homerunproptech.com/assets/images/seller/twin.jpg",
  },
  {
    title: "คอนโดมิเนียม",
    image:
      "	https://www.homerunproptech.com/assets/images/seller/condo.jpg",
  },
  {
    title: "ทาวน์โฮม",
    image:
      "https://www.homerunproptech.com/assets/images/seller/townhome.jpg",
  },
];

const PropertyTypeSection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*  Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-14"
        >
          ประเภททรัพย์ที่{" "}
          <span className="text-[#bfa074] font-bold">Homerun</span>{" "}
          นำมารีโนเวท
        </motion.h2>

        {/*  Property Type Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center"
        >
          {propertyTypes.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[240px] rounded-[20px] overflow-hidden cursor-pointer shadow-md"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-56 object-cover"
                loading="lazy"
              />
              {/* overlay ด้านบน */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
              <p className="absolute top-3 left-4 text-white text-sm sm:text-base font-semibold drop-shadow-md">
                {item.title}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyTypeSection;
