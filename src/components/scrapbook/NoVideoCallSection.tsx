"use client";

import React, { useState } from "react";
import { VideoOff, Video, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const NoVideoCallSection: React.FC = () => {
  const [callAttempted, setCallAttempted] = useState(false);

  return (
    <section
      id="banter-gap"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 04
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="0 CALLS" label="VIDEO ARCHIVE" color="navy" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Story copy */}
        <div className="md:col-span-7 space-y-5">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            The Funniest Friendship Fact
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            After all these years... there is still ONE thing we somehow haven't done.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p className="text-xl font-serif font-bold text-[#8C3D21]">
              A video call.
            </p>
            <p>
              Yes. We have talked through thousands of texts and 2–3 hour phone calls across years.
            </p>
            <p className="bg-[#FAF4EC] p-3.5 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              "Apparently, seeing each other's faces live on screen was just too technologically advanced for us." 😂
            </p>
          </div>
        </div>

        {/* Interactive "Zero Video Calls" Mock Camera Interface */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <div className="absolute -top-3 left-10 z-10">
              <WashiTape width="w-20" tilt={-2} variant="terracotta" />
            </div>

            <div className="bg-[#1E293B] text-white rounded-lg p-5 border border-slate-700 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                  <VideoOff className="w-4 h-4 text-rose-400" />
                  <span>Face Live Status</span>
                </div>
                <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                  0 Calls Recorded
                </span>
              </div>

              {/* Camera Preview Box */}
              <div className="aspect-[4/3] bg-slate-900 rounded border border-slate-800 flex flex-col items-center justify-center p-4 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px]" />
                
                <div className="relative z-10 space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-400">
                    <VideoOff className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-200">
                    {callAttempted ? "ERROR: PROTOCOL NOT FOUND" : "VIDEO FEED: DISABLED"}
                  </div>
                  <p className="text-[10px] text-slate-400 max-w-[180px] leading-tight">
                    {callAttempted
                      ? "Video calling is too advanced for this friendship. Audio & text only!"
                      : "Total video call duration over all years: 00:00:00"}
                  </p>
                </div>
              </div>

              {/* Action button */}
              <div className="mt-4 pt-2">
                <button
                  onClick={() => setCallAttempted(!callAttempted)}
                  className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 rounded border border-slate-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{callAttempted ? "Reset Status" : "Test Video Call Button"}</span>
                </button>
              </div>

              <div className="mt-3 text-center">
                <span className="font-handwriting text-xs text-amber-300/90">
                  Voice calls: 100+ hrs • Video calls: 0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
