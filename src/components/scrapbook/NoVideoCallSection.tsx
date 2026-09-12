"use client";

import React, { useState } from "react";
import { VideoOff, Sparkles, RefreshCw } from "lucide-react";
import { PostageStamp } from "./PostageStamp";

export const NoVideoCallSection: React.FC = () => {
  const [callAttempted, setCallAttempted] = useState(false);

  return (
    <section
      id="no-video-call"
      className="py-28 sm:py-36 px-4 sm:px-6 relative max-w-4xl mx-auto text-center"
    >
      {/* Chapter Marker */}
      <div className="flex items-center justify-center gap-3 mb-12">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 04
        </span>
        <PostageStamp date="0 CALLS" label="VIDEO LOG" color="navy" />
      </div>

      {/* BIG TYPOGRAPHIC MOMENT */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#8C4A2F] font-bold">
          Yeh abhi tak nahi hua.
        </p>

        <div className="space-y-2 text-stone-600 font-serif text-lg sm:text-2xl">
          <p>Years of chats.</p>
          <p>Hundreds of hours of calls.</p>
          <p>2–3 hour late-night conversations.</p>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F] pt-2">
            But...
          </p>
        </div>

        {/* Massive Typography Punch */}
        <div className="py-6">
          <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl font-extrabold text-[#2C2926] tracking-tighter leading-none select-none">
            ZERO<br />
            <span className="text-[#8C4A2F]">VIDEO</span><br />
            CALLS.
          </h2>
        </div>

        <p className="font-sans text-base sm:text-lg text-[#57483B] max-w-lg mx-auto leading-relaxed">
          Seriously yaar. 😂 We have talked for hours, but apparently seeing each other's faces live was way too advanced for us!
        </p>

        {/* Interactive playful test button */}
        <div className="pt-4 max-w-xs mx-auto">
          <button
            onClick={() => setCallAttempted(!callAttempted)}
            className="w-full py-3 px-4 bg-[#2C2926] hover:bg-stone-800 text-stone-100 text-xs font-mono rounded-full border border-stone-700 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
          >
            <VideoOff className="w-3.5 h-3.5 text-rose-400" />
            <span>{callAttempted ? "Reset Video Check" : "Attempt Video Call Protocol"}</span>
          </button>

          {callAttempted && (
            <p className="mt-3 text-xs font-mono text-[#8C3D21] bg-[#FBECE7] p-2.5 rounded border border-[#F3D5CA] animate-fade-in">
              ❌ ERROR 404: Face live camera is not supported in our friendship protocol! 😂
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
