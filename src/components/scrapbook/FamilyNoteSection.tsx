"use client";

import React from "react";
import { Cake } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const FamilyNoteSection: React.FC = () => {
  return (
    <section
      id="family-roots"
      className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 17
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="15.09 DUAL" label="FAMILY TIE" color="terracotta" />
      </div>

      <div className="bg-white/95 p-6 sm:p-9 rounded-lg border border-[#EADBCE] shadow-sm relative space-y-4 max-w-2xl mx-auto">
        <div className="absolute -top-3 right-8">
          <WashiTape width="w-20" tilt={1.5} variant="parchment" />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase font-bold tracking-wider">
          <Cake className="w-4 h-4 text-[#8C4A2F]" />
          <span>A Shared September Celebration</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2926]">
          15 September isn’t just Monaco’s birthday.
        </h3>

        <p className="font-serif italic text-xl text-[#8C4A2F]">
          It’s Roops’ (Rupali’s) birthday too! 🎂
        </p>

        <div className="space-y-3 font-sans text-xs sm:text-sm text-[#57483B] leading-relaxed pt-2">
          <p>
            Apni younger sister ke saath exact same date pe birthday share karna is such a rare and sweet coincidence in your family.
          </p>
          <p className="text-stone-500 text-xs">
            A quiet, respectful nod to your family bond and your heritage roots.
          </p>
        </div>
      </div>
    </section>
  );
};
