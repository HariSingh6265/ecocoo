"use client";

import React, { useState } from "react";
import { Clock } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { TIMELINE_CALL_HOURS } from "../../data/storyData";

export const LongCallsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <section
      id="long-calls"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      <div className="text-center space-y-4 mb-14">
        <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
          When Midnight Slipped Away
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#2C2926] leading-tight">
          "Wait... itni der se baat kar rahe hain?!" 😂
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#6B635B] max-w-lg mx-auto">
          2–3 hours ki calls somehow humare liye completely normal ho gayi thi.
        </p>
      </div>

      {/* Interactive Time Dial / Progression */}
      <div className="bg-white/95 rounded-lg border border-[#EADBCE] p-6 sm:p-9 shadow-sm relative space-y-8">
        <div className="absolute -top-3 left-10">
          <WashiTape width="w-24" tilt={-1.5} variant="terracotta" />
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {TIMELINE_CALL_HOURS.map((hour, idx) => {
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#FBECE7] border-[#8C4A2F] shadow-sm scale-105"
                    : "bg-[#FAF7F2] border-[#EADBCE] hover:bg-[#F5EFEB]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#8C4A2F]">
                      {hour.time}
                    </span>
                    <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-[#8C4A2F]" : "text-stone-400"}`} />
                  </div>
                  <h4 className="font-serif text-sm font-bold text-[#2C2926] mb-1">
                    {hour.label}
                  </h4>
                </div>
                <p className="text-[11px] text-[#6B635B] font-sans leading-snug mt-2">
                  {hour.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quote takeaway */}
        <div className="bg-[#FAF4EC] p-4 sm:p-5 rounded border-l-2 border-[#8C4A2F] flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#8C4A2F] uppercase font-bold tracking-wider">
              Time Dilation Effect
            </span>
            <p className="font-serif italic text-sm sm:text-base text-[#443F3A]">
              "Jab tak phone 2% battery pe nahi aata tha, realize hi nahi hota tha ki 3 ghante nikal gaye."
            </p>
          </div>
          <span className="font-handwriting text-base text-[#8C4A2F]">
            ~2 to 3 hours vanished
          </span>
        </div>
      </div>
    </section>
  );
};
