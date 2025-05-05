"use client";

import { useState } from "react";
import Step1 from "../steps/Step1";

const steps = [
  { label: "Personal Info" },
  { label: "Income Details" },
  { label: "Deductions" },
  { label: "Review & Submit" },
];

export default function TaxStepper() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Stepper UI */}
      <div className="relative flex justify-between items-center mb-12">
        {steps.map((item, index) => {
          const current = index + 1;
          const isActive = current === step;
          const isCompleted = current < step;
          const isLast = current === steps.length;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center flex-1 relative"
            >
              {/* Line to next step */}
              {!isLast && (
                <div className="absolute top-5 left-1/2 w-full h-0.5 z-0">
                  <div
                    className={`h-full ${
                      isCompleted ? "bg-[#ed8936]" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}

              {/* Step Circle */}
              <div
                className={`relative z-10 w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 border ${
                  isCompleted || isActive
                    ? "bg-[#ed8936] border-[#ed8936] text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {current}
              </div>

              {/* Step Label */}
              <p
                className={`mt-2 text-sm font-medium text-center ${
                  isCompleted || isActive ? "text-[#ed8936]" : "text-gray-400"
                }`}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Step Form */}
      {step === 1 && <Step1 onNext={handleNext} />}
    </div>
  );
}
