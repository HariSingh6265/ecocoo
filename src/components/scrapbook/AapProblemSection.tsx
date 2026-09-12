"use client";

import React, { useState } from "react";
import { MessageSquare, Ban, Sparkles, RefreshCw, Check } from "lucide-react";
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
      setReactionText("Still no. 'Aap' hi rahenge.");
    } else if (nextCount === 3) {
      setReactionText("Monica, you've tried 3 times. Still Aap 😂");
    } else {
      setReactionText(`Attempt #${nextCount}: System locked to 'Aap' forever! 🤝`);
    }
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Playful Interactive Dialogue Card */}
        <div className="md:col-span-6 order-2 md:order-1">
          <div className="relative w-full max-w-sm mx-auto">
            <div className="absolute -top-3 left-8 z-10">
              <WashiTape width="w-24" tilt={-2} variant="parchment" />
            </div>

            <div className="bg-white rounded-lg p-6 border border-[#EADBCE] shadow-lg relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="font-mono text-xs font-bold text-[#2C2926]">
                    THE "AAP" PROTOCOL
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-[#FAF4EC] text-[#8C4A2F] px-2 py-0.5 rounded border border-[#EADBCE]">
                  Unchangeable
                </span>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-3 font-sans text-xs">
                {/* Monica */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-stone-400 font-mono mb-0.5">Monica</span>
                  <div className="bg-[#FAF7F2] border border-[#EADBCE] p-3 rounded-2xl rounded-tl-none max-w-[85%] text-stone-800">
                    "Can we please finally move to <strong>'tum'</strong>?"
                  </div>
                </div>

                {/* Hari */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-stone-400 font-mono mb-0.5">Hari</span>
                  <div className="bg-[#8C4A2F] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm">
                    "Aap."
                  </div>
                </div>

                {/* Monica */}
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-stone-400 font-mono mb-0.5">Monica</span>
                  <div className="bg-[#FAF7F2] border border-[#EADBCE] p-2.5 rounded-2xl rounded-tl-none text-stone-600 italic">
                    "..."
                  </div>
                </div>

                {/* Hari */}
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-stone-400 font-mono mb-0.5">Hari</span>
                  <div className="bg-[#8C4A2F] text-white p-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm font-semibold">
                    "Aap hi rahenge. 😂"
                  </div>
                </div>
              </div>

              {/* Interactive Button */}
              <div className="pt-3 border-t border-[#F0E8DE] space-y-2">
                <button
                  onClick={handleTumAttempt}
                  className="w-full py-2.5 px-3 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-stone-800 text-xs font-mono font-medium rounded border border-[#EADBCE] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Ban className="w-3.5 h-3.5 text-[#8C4A2F]" />
                  <span>Click to attempt switching to "tum"</span>
                </button>

                {reactionText && (
                  <p className="text-[11px] font-mono text-[#8C3D21] bg-[#FBECE7] p-2 rounded text-center border border-[#F3D5CA] animate-fade-in">
                    {reactionText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="md:col-span-6 space-y-5 order-1 md:order-2">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            The Unresolved Debate
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            The "Aap" Problem.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p>
              We always address each other as <strong>"Aap."</strong> Never "tum." Never "tu."
            </p>
            <p>
              Over the years, you have repeatedly suggested that we should drop the formality and switch to "tum."
            </p>
            <p className="bg-[#FAF4EC] p-3.5 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              And yet, no matter how many years pass, my tongue naturally defaults back to "Aap." It has become our signature recurring banter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
