"use client";

import React from "react";
import { Pause, Play } from "lucide-react";
import { PostageStamp } from "./PostageStamp";

export const TheGapSection: React.FC = () => {
  return (
    <section
      id="the-gap"
      className="py-32 sm:py-44 px-4 sm:px-6 relative max-w-3xl mx-auto text-center"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-3 mb-16">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 06
        </span>
        <PostageStamp date="PAUSE / PLAY" label="VISUAL SILENCE" color="sage" />
      </div>

      {/* Visual Silence & Large Spacing (No Boxy Cards) */}
      <div className="space-y-12">
        <div className="space-y-4">
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2C2926] leading-tight font-normal">
            Phir ek phase aaya...
            <br />
            <span className="text-[#8C4A2F] font-bold">jab baat nahi hui.</span>
          </p>
          <p className="font-handwriting text-2xl text-stone-500">
            Kaafi time tak nahi hui.
          </p>
        </div>

        {/* Minimal Paused Timeline Indicator */}
        <div className="flex items-center justify-center gap-4 py-8">
          <div className="w-16 sm:w-24 h-px bg-stone-300" />
          <div className="w-10 h-10 rounded-full border border-dashed border-[#8C4A2F] flex items-center justify-center text-[#8C4A2F] bg-[#FAF7F2]">
            <Pause className="w-4 h-4" />
          </div>
          <div className="w-16 sm:w-24 h-px bg-stone-300" />
        </div>

        <div className="space-y-6 max-w-xl mx-auto">
          <p className="font-serif text-2xl sm:text-4xl text-[#2C2926] font-medium leading-relaxed">
            But when we started talking again...
          </p>
          <div className="space-y-3 font-sans text-base sm:text-lg text-[#57483B] leading-relaxed">
            <p>No awkward restart. No <em>"aur batao itne din kahan the"</em>.</p>
            <p className="font-serif italic text-xl sm:text-2xl text-[#8C4A2F] pt-2">
              "Bas wahi conversation dobara shuru ho gayi... jaise kuch hua hi nahi."
            </p>
            <p className="text-xs sm:text-sm text-stone-500 pt-2 font-mono">
              Like we had pressed pause instead of goodbye.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
