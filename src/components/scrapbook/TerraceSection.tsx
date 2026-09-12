"use client";

import React, { useState } from "react";
import { Moon, Star, Phone, Radio } from "lucide-react";

export const TerraceSection: React.FC = () => {
  const [starsCount, setStarsCount] = useState(0);

  return (
    <section
      id="terrace-nights"
      className="py-28 sm:py-36 px-4 sm:px-6 relative bg-gradient-to-b from-[#0B1120] via-[#111A2E] to-[#0B1120] text-stone-100 overflow-hidden my-16 rounded-2xl shadow-2xl border border-slate-800 max-w-5xl mx-auto"
    >
      {/* Night Sky Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-[15%] w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-24 left-[42%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-twinkle [animation-delay:1s]" />
        <div className="absolute top-16 right-[28%] w-1 h-1 bg-sky-200 rounded-full animate-twinkle [animation-delay:2s]" />
        <div className="absolute top-36 right-[12%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle [animation-delay:1.5s]" />
        <div className="absolute top-8 right-[50%] w-1 h-1 bg-amber-200 rounded-full animate-twinkle [animation-delay:0.5s]" />
        <div className="absolute bottom-20 left-[25%] w-1 h-1 bg-white rounded-full animate-twinkle [animation-delay:2.5s]" />

        {/* Crescent Moon */}
        <div className="absolute top-10 right-10 flex items-center gap-2 opacity-90">
          <Moon className="w-9 h-9 text-amber-200 drop-shadow-[0_0_15px_rgba(254,243,199,0.5)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Chapter Header in Night Mode */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
            CHAPTER 07
          </span>
          <div className="h-px bg-slate-700/80 flex-1" />
          <span className="text-xs font-mono text-slate-400">
            TERRACE NIGHTS
          </span>
        </div>

        <div className="space-y-4">
          <p className="font-handwriting text-2xl sm:text-3xl text-amber-300">
            The Terrace Sanctuary
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Ek time pe terrace ka matlab hi tha — call karna.
          </h2>
        </div>

        {/* Atmospheric Narrative Box */}
        <div className="bg-slate-900/85 backdrop-blur-md p-6 sm:p-9 rounded-xl border border-slate-700/80 shadow-2xl relative space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>TERRACE CALL LOG • MIDNIGHT</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>Call Active</span>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            <p>
              Whenever we had long conversations lined up, main seedha terrace pe chala jata tha taaki bina kisi disturbance ke ghanto baat kar sakein.
            </p>
            <p>
              Thandi raat ki hawa, terrace ka andhera, phone screen ki roshni... aur ghanto tak chalti hui baatein jahan kisi ko time ka pata hi nahi chalta tha.
            </p>
            <p className="font-serif italic text-amber-200/95 text-lg sm:text-xl bg-slate-800/70 p-4 rounded border-l-2 border-amber-400">
              "2–3 hours later... 'Wait, kitne time se baat kar rahe hain hum log?!' 😂"
            </p>
          </div>

          {/* Star Gazer micro-interaction */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setStarsCount(starsCount + 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-200 border border-slate-700 transition-colors font-mono text-[11px]"
            >
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>Count terrace stars ({starsCount})</span>
            </button>
            <span className="font-handwriting text-sm text-slate-400">
              Quiet skies & timeless conversations.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
