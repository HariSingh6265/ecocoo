"use client";

import React, { useState } from "react";
import { MapPin, CalendarX, Laugh, CheckCircle2, Navigation } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { PUNE_INCIDENT_DATA } from "../../data/storyData";

export const PuneIncidentSection: React.FC = () => {
  const [showRescueNote, setShowRescueNote] = useState(false);

  return (
    <section
      id="pune-incident"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 10
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="PUNE 2024" label="THE BLUNDER" color="terracotta" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Story copy */}
        <div className="md:col-span-7 space-y-5">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            The Self-Own of 2024
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            The Infamous "September 16" Incident.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p>
              On 29 July, you remembered my birthday and wished me right at 12:00 AM midnight like a champ.
            </p>
            <p>
              And then there was me in 2024: stuck in Pune deeply occupied with Rotaract work, completely losing track of what day it was, and somehow managing to miss September 15.
            </p>
            <p className="bg-[#FAF4EC] p-3.5 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              "Yes. I know. I remembered on September 16 and wished you immediately — and I still haven’t heard the end of it! 😂"
            </p>
            <p className="text-xs text-[#7A6C58]">
              (Consider this entire website my permanent apology and tribute!)
            </p>
          </div>
        </div>

        {/* Incident Board Card */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <div className="absolute -top-3 right-8 z-10">
              <WashiTape width="w-24" tilt={2} variant="terracotta" />
            </div>

            <div className="bg-white rounded-lg p-5 border border-[#EADBCE] shadow-md relative space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C2926]">
                  <MapPin className="w-4 h-4 text-[#8C4A2F]" />
                  <span>Pune, 2024 Dispatch</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                  Rotaract Trip
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans text-stone-700">
                <div className="flex items-center justify-between p-2 rounded bg-[#FAF7F2] border border-[#EADBCE]">
                  <span>29 July (Hari's B'day):</span>
                  <span className="font-mono font-bold text-emerald-700">12:00 AM Sharp ✅</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#FBECE7] border border-[#F3D5CA]">
                  <span>15 Sept (Monica's B'day):</span>
                  <span className="font-mono font-bold text-[#8C3D21]">Forgot in Pune 🙈</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#FAF7F2] border border-[#EADBCE]">
                  <span>16 Sept (Rescue Wish):</span>
                  <span className="font-mono font-bold text-amber-700">Wished next day 😅</span>
                </div>
              </div>

              <button
                onClick={() => setShowRescueNote(!showRescueNote)}
                className="w-full py-2 px-3 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-stone-700 text-xs font-mono rounded border border-[#EADBCE] transition-colors flex items-center justify-center gap-1.5"
              >
                <Laugh className="w-3.5 h-3.5 text-[#8C4A2F]" />
                <span>{showRescueNote ? "Hide Verdict" : "Monica's Verdict"}</span>
              </button>

              {showRescueNote && (
                <div className="p-3 bg-[#FFFDF8] rounded border border-[#EADBCE] text-xs font-handwriting text-[#8C4A2F] text-center animate-fade-in">
                  "You will literally never live this down, Harshu! 😂"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
