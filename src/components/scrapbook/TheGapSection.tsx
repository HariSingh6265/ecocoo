"use client";

import React from "react";
import { Pause, Play, HeartHandshake, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const TheGapSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <PostageStamp date="PAUSE / RESUME" label="REAL FRIENDSHIP" color="sage" />

        <div className="space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Silence That Felt Safe
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            We pressed pause instead of goodbye.
          </h2>
        </div>

        {/* Highlight Card */}
        <div className="bg-white/90 p-8 sm:p-10 rounded border border-[#EADBCE] shadow-sm relative text-left space-y-5">
          <div className="absolute -top-3 right-10">
            <WashiTape width="w-24" tilt={2} variant="sage" />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-stone-500 pb-3 border-b border-[#F0E8DE]">
            <span className="flex items-center gap-1">
              <Pause className="w-3.5 h-3.5 text-[#8C4A2F]" /> Silence
            </span>
            <span>→</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <Play className="w-3.5 h-3.5" /> Seamless Resume
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p>
              There was a period when we didn't talk for days and weeks.
            </p>
            <p>
              And then when we started talking again, there was zero awkwardness. No stiff <em>"so... what have you been up to?"</em> or feeling like strangers.
            </p>
            <p className="font-serif text-base sm:text-lg text-[#2C2926] italic bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F]">
              "It just continued. Like we had pressed pause instead of goodbye."
            </p>
            <p className="text-xs text-[#7A6C58]">
              That was one of the moments that made me realize this friendship wasn't fragile. It was genuine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
