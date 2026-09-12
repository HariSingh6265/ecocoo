"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Send, PartyPopper, RefreshCw } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { FINAL_LETTER_CONTENT } from "../../data/storyData";

export const FinalMessageSection: React.FC = () => {
  const [hasCelebrated, setHasCelebrated] = useState(false);

  const fireGentleConfetti = () => {
    if (typeof window === "undefined") return;

    // Elegant warm confetti palette
    const colors = ["#C25E3B", "#8C4A2F", "#5B7A68", "#EADBCE", "#D4AF37"];

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors,
      disableForReducedMotion: true,
    });
  };

  const handleCelebrate = () => {
    setHasCelebrated(true);
    fireGentleConfetti();
  };

  return (
    <section
      id="epilogue"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-3xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 15 • EPILOGUE
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="15.09.202X" label="CELEBRATION" color="terracotta" />
      </div>

      {/* Main Journal Letter Document */}
      <div className="bg-white rounded-lg p-7 sm:p-12 border border-[#EADBCE] shadow-xl relative space-y-8">
        {/* Top Washi Tapes */}
        <div className="absolute -top-3.5 left-12">
          <WashiTape width="w-28" tilt={-2} variant="terracotta" />
        </div>
        <div className="absolute -top-3.5 right-12 hidden sm:block">
          <WashiTape width="w-24" tilt={2} variant="sage" />
        </div>

        {/* Letter Heading */}
        <div className="border-b border-[#F0E8DE] pb-6 space-y-2">
          <span className="font-mono text-xs text-[#8C4A2F] tracking-widest uppercase font-semibold">
            September Dispatch • A Personal Note
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2926]">
            {FINAL_LETTER_CONTENT.opening}
          </h2>
        </div>

        {/* Body Paragraphs */}
        <div className="space-y-5 text-sm sm:text-base text-[#443F3A] font-sans leading-relaxed">
          {FINAL_LETTER_CONTENT.paragraphs.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* The Birthday Reveal */}
        <div className="pt-8 border-t border-[#F0E8DE] text-center space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] tracking-tight">
              Happy Birthday, Monica. ❤️
            </h3>
            <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
              15 September
            </p>
          </div>

          {/* Harshu & Aap Signature */}
          <div className="bg-[#FAF7F2] p-6 rounded-lg border border-[#EADBCE] max-w-md mx-auto space-y-2 text-center">
            <p className="font-sans text-xs text-stone-500 uppercase tracking-widest font-mono">
              {FINAL_LETTER_CONTENT.signature1}
            </p>
            <p className="font-serif text-xl font-bold text-[#2C2926]">
              {FINAL_LETTER_CONTENT.signature2}
            </p>
            <p className="font-handwriting text-xl text-[#8C4A2F] pt-2 border-t border-[#F0E8DE]">
              {FINAL_LETTER_CONTENT.finalPunchline}
            </p>
          </div>

          {/* Celebration trigger */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={handleCelebrate}
              className="px-6 py-2.5 bg-[#8C4A2F] hover:bg-[#723922] text-white text-xs font-mono font-medium rounded-full shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
            >
              <PartyPopper className="w-4 h-4 text-amber-200" />
              <span>{hasCelebrated ? "Pop More Confetti 🎉" : "Celebrate 15 September 🎉"}</span>
            </button>
            <span className="text-[11px] text-stone-400 font-sans">
              Built with care • From Hari to Monica
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
