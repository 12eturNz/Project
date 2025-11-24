import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { motion, AnimatePresence } from "framer-motion";

import Asset from "../../assets/Asset.png";

export default function RegisterMulti() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    citizenId: "",
    phone: "",
    province: "",
    district: "",
    addressDetail: "",
    file: null,
  });

  const updateForm = (fields) => setFormData({ ...formData, ...fields });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const submit = () => console.log("Submit →", formData);

  const progress = [
    { id: 1, label: "User" },
    { id: 2, label: "Address" },
    { id: 3, label: "Upload" },
  ];

  const animation = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.35 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6] p-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT IMAGE PANEL  */}
        <div
          className="hidden md:flex bg-cover bg-center relative items-center justify-center text-white text-2xl font-bold"
          style={{
            backgroundImage: `url('https://www.reic.or.th/Upload/landmarks-modern-city_83_1738293311_16605.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <div className="bg-black/40 px-4 py-4 rounded-lg text-5xl">
           <h1>สมัครเป็น Agent</h1>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-15 flex flex-col justify-between h-full">

          <div className="flex justify-end">
            <img
              src={Asset}
              alt="Logo"
              className="w-28 h-auto opacity-90"
              loading="lazy"
            />
          </div>

          <h2 className="text-xl font-semibold text-center mb-6">
            หน้า {step} / 3
          </h2>

          {/* PROGRESS BAR */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {progress.map((p, index) => (
              <div key={p.id} className="flex items-center">

                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-white 
                  ${step === p.id ? "bg-orange-500" : step > p.id ? "bg-green-500" : "bg-gray-300"}`}
                >
                  {p.id}
                </div>

                {index !== progress.length - 1 && (
                  <div
                    className={`h-[2px] w-10 mx-2 
                    ${step > p.id ? "bg-green-500" : "bg-gray-300"}`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* STEP CONTENT WRAPPER */}
          <div className="min-h-[380px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" {...animation}>
                  <Step1 next={next} updateForm={updateForm} data={formData} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" {...animation}>
                  <Step2 next={next} back={back} updateForm={updateForm} data={formData} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" {...animation}>
                  <Step3 back={back} submit={submit} updateForm={updateForm} data={formData} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
