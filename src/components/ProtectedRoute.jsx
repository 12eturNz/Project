import React from "react";

const PropertyCard = ({ image, title, location, price, tag }) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md 
      hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 
      cursor-pointer"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />
        {tag && (
          <span
            className={`absolute top-3 left-3 text-sm font-medium px-3 py-1 rounded-full ${
              tag === "Renovated"
                ? "bg-green-600 text-white"
                : "bg-orange-500 text-white"
            }`}
          >
            {tag}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{location}</p>
        <p className="text-xl font-bold text-blue-600">{price}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
