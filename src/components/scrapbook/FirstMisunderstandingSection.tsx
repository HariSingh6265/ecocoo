"use client";

import React from "react";
import { Compass } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const FirstMisunderstandingSection: React.FC = () => {
  return (
    <section
      id="perspective"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 03
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="PERSPECTIVE" label="LESSON 01" color="sage" />
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Early Perspective Shift
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            Jab do strangers ne ek doosre ko samajhna shuru kiya.
          </h2>
        </div>

        <div className="bg-white/95 p-6 sm:p-8 rounded border border-[#EADBCE] shadow-sm relative space-y-4">
          <div className="absolute -top-3 left-8">
            <WashiTape width="w-24" tilt={-1} variant="sage" />
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#F1F6F3] rounded text-[#455E50] mt-1 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-3 text-sm sm:text-base text-[#57483B] leading-relaxed font-sans">
              <p>
                Start mein, maine ek perception aur misunderstanding ki wajah se Monaco ko ladkiyon se related thoda angrily text kar diya tha.
              </p>
              <p>
                Lekin Monaco ne gussa hone ya argue karne ke bajaye, bohot maturely aur calmly situation explain ki. She made me realize ki main situation ko galat angle se dekh raha tha.
              </p>
              <p className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#5B7A68] italic text-[#443F3A]">
                That was the moment I realized how patient, fair-minded, and understanding you actually are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
