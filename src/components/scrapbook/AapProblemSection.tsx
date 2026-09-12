"use client";

import React, { useState } from "react";
import { Ban, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const AapProblemSection: React.FC = () => {
  const [rejectCount, setRejectCount] = useState(0);
  const [reactionText, setReactionText] = useState("");

  const handleTumAttempt = () => {
    const nextCount = rejectCount + 1;
    setRejectCount(nextCount);
    if (nextCount === 1) {
      setReactionText("Denied! 'Aap' is permanent.");
    } else if (nextCount === 2) {
      setReactionText("Monaco, kitni baar bolna hai? 'Aap' hi rahenge.");
    } else if (nextCount === 3) {
      setReactionText("3 attempts done. Still locked to 'Aap' 😂");
    } else {
      setReactionText(`Attempt #${nextCount}: System permanently hardcoded to 'Aap'! 🤝`);
    }
  };

  return (
    <section
      id="aap-problem"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 05
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="GRAMMAR" label="THE DEBATE" color="terracotta" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Large Typography Battle */}
        <div className="md:col-span-6 flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-[#EADBCE] shadow-sm relative text-center">
          <div className="absolute -top-3 left-8 z-10">
            <WashiTape width="w-24" tilt={-2} variant="parchment" />
          </div>

          <div className="space-y-4 my-2">
            {/* TUM crossed out */}
            <div className="relative inline-block">
              <span className="font-serif text-5xl sm:text-6xl font-bold text-stone-300 line-through decoration-[#C25E3B] decoration-4 select-none">
                TUM
              </span>
              <span className="block text-[11px] font-mono text-stone-400 mt-1">
                (Monaco's proposal)
              </span>
            </div>

            <div className="font-handwriting text-2xl text-[#8C4A2F]">vs</div>

            {/* AAP highlighted */}
            <div className="inline-block bg-[#FBECE7] px-6 py-2 rounded border-2 border-[#8C4A2F] shadow-xs">
              <span className="font-serif text-5xl sm:text-6xl font-extrabold text-[#8C4A2F] tracking-wide select-none">
                AAP
              </span>
              <span className="block text-[11px] font-mono text-[#8C4A2F] font-bold mt-1">
                (Permanent default)
              </span>
            </div>
          </div>

          {/* Interactive button */}
          <div className="w-full pt-6 mt-2 border-t border-[#F0E8DE] space-y-2">
            <button
              onClick={handleTumAttempt}
              className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-stone-800 text-xs font-mono font-semibold rounded border border-[#EADBCE] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Ban className="w-3.5 h-3.5 text-[#8C4A2F]" />
              <span>Tap to switch to "tum" ({rejectCount})</span>
            </button>

            {reactionText && (
              <p className="text-xs font-mono text-[#8C3D21] bg-[#FBECE7] p-2 rounded text-center border border-[#F3D5CA] animate-fade-in">
                {reactionText}
              </p>
            )}
          </div>
        </div>

        {/* Story copy */}
        <div className="md:col-span-6 space-y-5">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Unresolved Debate
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            The "Aap" Problem.
          </h2>

          <div className="space-y-3 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p className="font-serif italic text-base sm:text-lg text-[#2C2926]">
              "She has tried. I have refused. Not intentionally... bas aadat hai. 😂"
            </p>
            <p>
              Monaco has repeatedly suggested ki hume 'tum' pe shift ho jana chahiye.
            </p>
            <p>
              Lekin itne saalon baad bhi mere mooh se naturally 'Aap' hi nikalta hai. And honestly, ab toh yeh humari friendship ka signature dialogue ban chuka hai:
            </p>
            <p className="font-serif font-bold text-lg text-[#8C4A2F]">
              "Aap hi rahenge."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
