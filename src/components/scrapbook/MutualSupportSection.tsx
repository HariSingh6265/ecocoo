"use client";

import React from "react";
import { Trophy, PenTool, TrendingUp, Sparkles, HeartHandshake } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const MutualSupportSection: React.FC = () => {
  const supports = [
    {
      icon: Trophy,
      title: "Cricket & Sports",
      desc: "Knowing how much cricket means to me and constantly encouraging me to play and enjoy the game.",
    },
    {
      icon: PenTool,
      title: "Poetry & Writing",
      desc: "Reading the poems I wrote, calling them the 'best', and asking to see more creative verses.",
    },
    {
      icon: TrendingUp,
      title: "Personal Growth",
      desc: "Reminding me to stay ambitious, keep building skills, and never stop growing.",
    },
  ];

  return (
    <section
      id="mutual-support"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 13
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="MUTUAL" label="TWO-WAY" color="navy" />
      </div>

      <div className="space-y-8">
        <div className="space-y-3 text-left">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            Not Just A One-Way Street
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            You've supported me too.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#57483B] leading-relaxed max-w-2xl">
            You've always had a natural way of reminding me to stay connected to the things I care about most.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supports.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-[#EADBCE] shadow-sm relative space-y-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF4EC] flex items-center justify-center text-[#8C4A2F]">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-[#2C2926]">
                  {item.title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#6B635B] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#FAF4EC] p-4 sm:p-5 rounded border-l-2 border-[#5B7A68] text-xs sm:text-sm text-[#443F3A] font-sans">
          <strong>Thank you:</strong> Having a friend who doesn't just talk, but actively roots for your hobbies and growth, is something I truly appreciate.
        </div>
      </div>
    </section>
  );
};
