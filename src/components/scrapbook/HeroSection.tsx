"use client";

import React from "react";
import { ChevronDown, Sparkles } from "lucide-react";
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
      className="min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 relative paper-texture pt-24 pb-16 overflow-hidden"
    >
      {/* Decorative Washi Tape & Stamp */}
      <div className="absolute top-16 left-8 hidden sm:block">
        <WashiTape width="w-28" tilt={-3} variant="terracotta" />
      </div>
      <div className="absolute top-16 right-10 hidden sm:block">
        <PostageStamp date="15.09" label="FOR MONACO" color="terracotta" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center space-y-8">
        {/* Subtle Journal Marker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#EADBCE] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8C4A2F]" />
          <span className="font-mono text-xs text-[#8C4A2F] tracking-wider uppercase font-semibold">
            A Friendship Journal • Harshu × Monaco
          </span>
        </div>

        {/* Minimal, Cinematic Large Typography Hook */}
        <div className="space-y-4 max-w-2xl">
          <p className="font-handwriting text-3xl sm:text-4xl text-[#8C4A2F] font-normal tracking-wide">
            Before I say Happy Birthday...
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#2C2926] tracking-tight leading-[1.1]">
            Thoda sa scroll karna padega.
          </h1>
        </div>

        {/* Asymmetric Negative Space Note */}
        <div className="relative bg-white/95 p-6 sm:p-8 rounded-sm border border-[#EADBCE] shadow-md max-w-lg mx-auto text-left">
          <div className="absolute -top-3 right-8">
            <WashiTape width="w-20" tilt={2} variant="sage" />
          </div>

          <p className="font-serif text-base sm:text-lg text-[#443F3A] leading-relaxed italic mb-3">
            "Because this isn't just a birthday wish.
            <br />
            It's a story — ek collection of things I remember about us."
          </p>

          <div className="pt-3 border-t border-[#F0E8DE] flex items-center justify-between text-xs text-[#7A6C58] font-sans">
            <span>Class 10 Vedantu Group → Aaj tak</span>
            <span className="font-mono font-semibold text-[#8C4A2F]">Scroll shuru karo ↓</span>
          </div>
        </div>

        {/* Scroll CTA Button */}
        <button
          onClick={handleScrollDown}
          className="group flex flex-col items-center gap-2 pt-6 text-xs font-mono uppercase tracking-widest text-[#7A6C58] hover:text-[#8C4A2F] transition-colors focus:outline-none"
        >
          <span>Chapter 01: Where it started</span>
          <div className="w-9 h-9 rounded-full bg-white border border-[#EADBCE] flex items-center justify-center shadow-sm group-hover:translate-y-1 transition-transform">
            <ChevronDown className="w-4 h-4 text-[#8C4A2F] animate-bounce" />
          </div>
        </button>
      </div>

      {/* Faint divider */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#EADBCE] to-transparent" />
    </section>
  );
};
