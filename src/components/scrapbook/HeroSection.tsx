"use client";

import React from "react";
import { ChevronDown, Sparkles, BookOpen } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const HeroSection: React.FC = () => {
  const handleScrollDown = () => {
    const originElem = document.getElementById("origins");
    if (originElem) {
      originElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="prologue"
      className="min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 relative paper-texture pt-20 pb-16 overflow-hidden"
    >
      {/* Decorative Washi Tape & Stamps at the top edges */}
      <div className="absolute top-16 left-6 hidden sm:block">
        <WashiTape width="w-28" tilt={-4} variant="terracotta" />
      </div>
      <div className="absolute top-16 right-8 hidden sm:block">
        <PostageStamp date="15.09" label="EDITION NO. 01" color="terracotta" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col items-center space-y-8">
        {/* Subtle Journal Marker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EADBCE] shadow-sm animate-float-gentle">
          <Sparkles className="w-3.5 h-3.5 text-[#8C4A2F]" />
          <span className="font-mono text-xs text-[#8C4A2F] tracking-wide uppercase font-semibold">
            A Friendship Journal • Hari × Monica
          </span>
        </div>

        {/* The Mysterious Opening Hook */}
        <div className="space-y-4">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F] font-normal tracking-wide">
            Before I say Happy Birthday...
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#2C2926] tracking-tight leading-[1.15]">
            There’s a story I want you to scroll through.
          </h1>
        </div>

        {/* Narrative Card */}
        <div className="relative bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-sm border border-[#EADBCE] shadow-lg max-w-lg mx-auto text-left relative">
          <div className="absolute -top-3 right-6">
            <WashiTape width="w-20" tilt={2} variant="sage" />
          </div>

          <p className="font-serif text-base sm:text-lg text-[#443F3A] leading-relaxed italic mb-4">
            "This isn't just a birthday wish.
            <br />
            It's a collection of things I remember about us."
          </p>

          <div className="pt-3 border-t border-[#F0E8DE] flex items-center justify-between text-xs text-[#7A6C58] font-sans">
            <span>Class 10 Board Prep → Present</span>
            <span className="font-mono font-medium text-[#8C4A2F]">Scroll to begin ↓</span>
          </div>
        </div>

        {/* Scroll CTA Button */}
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 pt-4 text-xs font-mono uppercase tracking-widest text-[#7A6C58] hover:text-[#8C4A2F] transition-colors focus:outline-none"
        >
          <span>Open Chapter 01</span>
          <div className="w-8 h-8 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center shadow-sm group-hover:translate-y-1 transition-transform">
            <ChevronDown className="w-4 h-4 text-[#8C4A2F] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Bottom faint divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#EADBCE] to-transparent" />
    </section>
  );
};
