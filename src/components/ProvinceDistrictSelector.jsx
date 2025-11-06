import React, { useState, useEffect } from "react";
import thailandData from "../Data/thailand_provinces_districts.json";

export default function ProvinceDistrictSelector({ onChange }) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);

  useEffect(() => {
    if (province) {
      const selected = thailandData.find((p) => p.name_th === province);
      setDistricts(selected ? selected.amphure : []);
      setDistrict("");
    }
  }, [province]);

  const handleProvinceSelect = (value) => {
    setProvince(value);
    setOpenProvince(false);
    onChange && onChange({ province: value, district: "" });
  };

  const handleDistrictSelect = (value) => {
    setDistrict(value);
    setOpenDistrict(false);
    onChange && onChange({ province, district: value });
  };

  return (
    <div className="flex gap-6">
      {/* จังหวัด */}
      <div className="w-1/2 relative">
        <div
          onClick={() => setOpenProvince(!openProvince)}
          className="border-b border-[#cbb59a] bg-transparent py-2 text-sm text-[#3f3f3f]
          cursor-pointer flex justify-between items-center
          focus:border-[#6e5b54] transition duration-300 font-light"
        >
          <span>{province || "จังหวัด"}</span>
          <span className="text-[#cbb59a] text-xs">▼</span>
        </div>

        {openProvince && (
          <ul
            className="absolute z-10 bg-white border border-gray-200 shadow-md mt-1 w-full max-h-60 overflow-y-auto rounded-lg"
          >
            {thailandData.map((p) => (
              <li
                key={p.id}
                onClick={() => handleProvinceSelect(p.name_th)}
                className="px-3 py-2 hover:bg-[#f6f0ea] cursor-pointer text-sm"
              >
                {p.name_th}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* อำเภอ / เขต */}
      <div className="w-1/2 relative">
        <div
          onClick={() => province && setOpenDistrict(!openDistrict)}
          className={`border-b border-[#cbb59a] bg-transparent py-2 text-sm text-[#3f3f3f]
          flex justify-between items-center transition duration-300 font-light ${
            province ? "cursor-pointer" : "cursor-not-allowed text-gray-400"
          }`}
        >
          <span>{district || "อำเภอ / เขต"}</span>
          <span className="text-[#cbb59a] text-xs">▼</span>
        </div>

        {openDistrict && (
          <ul
            className="absolute z-10 bg-white border border-gray-200 shadow-md mt-1 w-full max-h-60 overflow-y-auto rounded-lg"
          >
            {districts.map((d, index) => (
              <li
                key={index}
                onClick={() => handleDistrictSelect(d.name_th)}
                className="px-3 py-2 hover:bg-[#f6f0ea] cursor-pointer text-sm"
              >
                {d.name_th}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
