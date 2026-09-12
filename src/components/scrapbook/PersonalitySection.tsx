"use client";

import React, { useState } from "react";
import { Sparkles, HeartHandshake } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { PERSONALITY_WORDS } from "../../data/storyData";

export const PersonalitySection: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<number>(0);

  return (
    <section
      id="personality"
      className="py-24 sm:py-36 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 15
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="GENUINE" label="OBSERVATIONS" color="sage" />
      </div>

      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            Things You Probably Take For Granted
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#2C2926] leading-tight">
            Things you don't realize about yourself.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B635B]">
            Tap any trait below to see what I genuinely notice about you:
          </p>
        </div>

        {/* Dynamic Typography Tag Cloud */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          {PERSONALITY_WORDS.map((item, idx) => {
            const isSelected = selectedWord === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedWord(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-mono tracking-wider font-bold transition-all ${
                  isSelected
                    ? "bg-[#2C2926] text-white shadow-md scale-105"
                    : "bg-white text-[#443F3A] border border-[#EADBCE] hover:border-stone-400 hover:bg-[#FAF7F2]"
                }`}
              >
                {item.word}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#EADBCE] shadow-sm max-w-xl mx-auto text-center space-y-3 transition-all">
          <span className="font-mono text-xs text-[#8C4A2F] font-bold uppercase tracking-widest">
            {PERSONALITY_WORDS[selectedWord].hindi}
          </span>
          <p className="font-serif text-lg sm:text-xl text-[#2C2926] italic">
            "{PERSONALITY_WORDS[selectedWord].note}"
          </p>
        </div>

        {/* Emotional Climax Banner */}
        <div className="bg-[#FAF4EC] p-8 sm:p-12 rounded-xl border border-[#EADBCE] shadow-md text-center max-w-2xl mx-auto relative space-y-4">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
            <WashiTape width="w-28" tilt={0} variant="terracotta" />
          </div>

          <p className="font-serif text-xl sm:text-3xl font-bold text-[#2C2926] leading-snug">
            "I don’t think you realize how genuinely good you are to the people around you.
            <br />
            <span className="text-[#8C4A2F]">But mujhe notice hota hai."</span>
          </p>
          <p className="font-handwriting text-base text-[#7A6C58]">
            One of the rarest qualities someone can have.
          </p>
        </div>
      </div>
    </section>
  );
};
