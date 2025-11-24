import React from "react";
import { ClipboardList, Video, Handshake, Search, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

const StepsWithHomerun = () => {
  const { t } = useTranslation();

  const steps = [
    { id: "01", icon: ClipboardList, title: t("Sell.T5") },
    { id: "02", icon: Video, title: t("Sell.T6") },
    { id: "03", icon: Handshake, title: t("Sell.T7") },
    { id: "04", icon: Search, title: t("Sell.T8") },
    { id: "05", icon: FileText, title: t("Sell.T9") },
  ];

  return (
    <section className="bg-[#f4f4f4] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {t("Sell.H3")} <span className="text-[#bfa074] font-bold">{t("Sell.H4")}</span> {t("Sell.H5")}
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mt-12 justify-items-center">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center">
              {/* Icon */}
              <div className="flex flex-col items-center mb-3">
                <p className="text-[#bfa074] text-sm font-bold mb-1">{step.id}</p>
                <div className="bg-transparent text-[#6ba5c2]">
                  <step.icon size={44} strokeWidth={1.8} />
                </div>
              </div>
              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 max-w-[180px] leading-relaxed">
                {step.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsWithHomerun;
