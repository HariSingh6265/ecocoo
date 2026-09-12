"use client";

import React from "react";
import { Compass, Lightbulb, BookOpen } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const FirstMisunderstandingSection: React.FC = () => {
  return (
    <section
      id="perspective"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 03
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="PERSPECTIVE" label="LESSON 01" color="sage" />
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-3">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            The Early Perspective Shift
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            How two strangers slowly began to understand each other.
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
                In the very beginning, I had texted you angrily about something related to girls because of a misunderstanding and perception I had at the time.
              </p>
              <p>
                Instead of getting hostile or dismissing me, you actually took the time to explain things calmly. You corrected my perception and helped me see that I was looking at the situation completely wrong.
              </p>
              <p className="bg-[#FAF4EC] p-3.5 rounded border-l-2 border-[#5B7A68] italic text-[#443F3A]">
                It was a small moment, but it mattered. It showed me how patient, clear-headed, and fair-minded you were right from the start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
