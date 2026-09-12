"use client";

import React, { useState } from "react";
import { Lock, FileQuestion } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const ClassifiedMemorySection: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section
      id="classified"
      className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-3xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 14
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="CONFIDENTIAL" label="SEALED" color="terracotta" />
      </div>

      {/* Sealed Classified Envelope / Card */}
      <div className="bg-[#FAF4EC] rounded-lg border-2 border-dashed border-[#DFCDB7] p-6 sm:p-9 relative shadow-sm text-center">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <WashiTape width="w-24" tilt={0} variant="terracotta" />
        </div>

        <div className="max-w-md mx-auto space-y-4 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-amber-200 text-[11px] font-mono uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Eyes Only For Monaco</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2926]">
            One Memory is Classified.
          </h3>

          <p className="font-sans text-xs sm:text-sm text-[#6B635B] leading-relaxed">
            Ek puraani prank / mistake ki memory strictly sealed hai.
            No details, no files, aur yahan kuch bhi publicly explain nahi kiya jayega.
          </p>

          <div className="pt-2">
            {!isUnlocked ? (
              <button
                onClick={() => setIsUnlocked(true)}
                className="px-5 py-2.5 bg-[#2C2926] hover:bg-stone-800 text-stone-100 text-xs font-mono font-medium rounded-full shadow-sm transition-all inline-flex items-center gap-2 active:scale-95"
              >
                <FileQuestion className="w-3.5 h-3.5 text-amber-400" />
                <span>[ ACCESS SEALED ARCHIVE 🔒 ]</span>
              </button>
            ) : (
              <div className="bg-white p-5 sm:p-6 rounded-lg border border-[#EADBCE] shadow-sm text-left space-y-3 animate-fade-in">
                <div className="flex items-center justify-between text-xs font-mono text-[#8C4A2F] pb-2 border-b border-[#F0E8DE]">
                  <span>RECORD #CLASSIFIED</span>
                  <span className="text-emerald-700 font-bold">ACKNOWLEDGED</span>
                </div>
                <p className="font-serif italic text-sm sm:text-base text-[#443F3A] leading-relaxed">
                  "You know exactly what I mean. I'm not putting any of it here. But... I'm genuinely sorry for that one. You've been extraordinarily gracious about it, and it won't ever happen again."
                </p>
                <p className="font-handwriting text-sm text-[#8C4A2F] text-right">
                  — Harshu
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
