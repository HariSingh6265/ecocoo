"use client";

import React, { useState } from "react";
import { HeartHandshake, Ear, Sparkles, ShieldCheck, Flame, ChevronDown } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { PERSONALITY_TRAITS } from "../../data/storyData";

export const PersonalitySection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("soft-nature");

  const getIcon = (name: string) => {
    switch (name) {
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-[#8C4A2F]" />;
      case "Ear":
        return <Ear className="w-5 h-5 text-[#5B7A68]" />;
      case "Sparkles":
        return <Flame className="w-5 h-5 text-[#C25E3B]" />;
      case "ShieldCheck":
      default:
        return <ShieldCheck className="w-5 h-5 text-[#2C3E50]" />;
    }
  };

  return (
    <section
      id="personality"
      className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 12
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="GENUINE" label="CHARACTER" color="sage" />
      </div>

      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Things You Probably Take For Granted
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            Things you don't realize about yourself.
          </h2>
          <p className="font-sans text-sm text-[#6B635B]">
            Tap each card to read what I've noticed over the years.
          </p>
        </div>

        {/* Trait Cards Accordion / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {PERSONALITY_TRAITS.map((trait) => {
            const isExpanded = expandedId === trait.id;
            return (
              <div
                key={trait.id}
                onClick={() => setExpandedId(isExpanded ? null : trait.id)}
                className={`bg-white rounded-lg p-5 sm:p-6 border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isExpanded
                    ? "border-[#8C4A2F] shadow-md bg-[#FFFDFB]"
                    : "border-[#EADBCE] shadow-xs hover:border-stone-400"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-full bg-[#FAF4EC]">
                        {getIcon(trait.iconName)}
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#2C2926]">
                        {trait.title}
                      </h4>
                    </div>
                    {trait.isPlayful && (
                      <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                        Playful Fact
                      </span>
                    )}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#57483B] leading-relaxed">
                    {trait.description}
                  </p>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-[#F0E8DE] bg-[#FAF7F2] p-3 rounded text-xs sm:text-sm text-[#443F3A] italic font-serif leading-relaxed animate-fade-in">
                    "{trait.reflection}"
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Emotional Peak Statement Card */}
        <div className="bg-[#FAF4EC] p-8 sm:p-10 rounded-xl border border-[#EADBCE] shadow-md text-center max-w-2xl mx-auto relative space-y-4 my-6">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <WashiTape width="w-28" tilt={0} variant="terracotta" />
          </div>

          <p className="font-serif text-lg sm:text-2xl font-bold text-[#2C2926] leading-relaxed">
            "I don’t think you realize how genuinely good you are to the people around you.
            <br />
            <span className="text-[#8C4A2F]">But I notice it."</span>
          </p>
          <p className="font-handwriting text-sm text-[#7A6C58]">
            One of the rarest qualities someone can have.
          </p>
        </div>
      </div>
    </section>
  );
};
