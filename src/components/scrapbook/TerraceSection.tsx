"use client";

import React, { useState } from "react";
import { Moon, Star, Phone, Sparkles, Radio } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const TerraceSection: React.FC = () => {
  const [starsClicked, setStarsClicked] = useState(0);

  return (
    <section
      id="terrace-nights"
      className="py-24 sm:py-32 px-4 sm:px-6 relative bg-gradient-to-b from-[#0B1120] via-[#111A2E] to-[#0B1120] text-stone-100 overflow-hidden my-12 rounded-2xl shadow-2xl border border-slate-800 max-w-5xl mx-auto"
    >
      {/* Starry Night Sky Canvas Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle twinkling stars */}
        <div className="absolute top-12 left-[15%] w-1 h-1 bg-white rounded-full animate-twinkle" />
        <div className="absolute top-24 left-[40%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-twinkle [animation-delay:1s]" />
        <div className="absolute top-16 right-[25%] w-1 h-1 bg-sky-200 rounded-full animate-twinkle [animation-delay:2s]" />
        <div className="absolute top-36 right-[15%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle [animation-delay:1.5s]" />
        <div className="absolute top-8 right-[45%] w-1 h-1 bg-amber-200 rounded-full animate-twinkle [animation-delay:0.5s]" />
        <div className="absolute bottom-24 left-[20%] w-1 h-1 bg-white rounded-full animate-twinkle [animation-delay:2.5s]" />

        {/* Crescent Moon in top corner */}
        <div className="absolute top-10 right-10 flex items-center gap-2 opacity-85">
          <Moon className="w-8 h-8 text-amber-200 drop-shadow-[0_0_12px_rgba(254,243,199,0.5)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Chapter Header in Night Mode */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
            CHAPTER 05
          </span>
          <div className="h-px bg-slate-700/80 flex-1" />
          <span className="text-xs font-mono text-slate-400">
            MIDNIGHT FREQUENCY
          </span>
        </div>

        <div className="space-y-4">
          <p className="font-handwriting text-2xl sm:text-3xl text-amber-300">
            The Terrace Sanctuary
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Going to the terrace specifically to talk to you.
          </h2>
        </div>

        {/* Atmospheric Narrative Card */}
        <div className="bg-slate-900/80 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-slate-700/80 shadow-2xl relative space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>TERRACE CALL LOG • NIGHT SKY</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Phone className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
              <span>Call Active</span>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            <p>
              Whenever we had long conversations lined up, I often went up to my terrace specifically so we could talk without disturbance.
            </p>
            <p>
              The cold night breeze, the quiet terrace silhouette, the soft glow of the phone screen in the dark, and hours of talking about everything under the sun (and the moon).
            </p>
            <p className="font-serif italic text-amber-200/90 text-base sm:text-lg bg-slate-800/60 p-4 rounded border-l-2 border-amber-400">
              "The terrace became quietly tied to those conversations."
            </p>
          </div>

          {/* Interactive Star Gazer widget */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setStarsClicked(starsClicked + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-200 border border-slate-700 transition-colors font-mono text-[11px]"
            >
              <Star className="w-3.5 h-3.5 text-amber-300" />
              <span>Tap to count constellations ({starsClicked})</span>
            </button>
            <span className="font-handwriting text-sm text-slate-400">
              Night sky, phone glow & quiet conversations.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
