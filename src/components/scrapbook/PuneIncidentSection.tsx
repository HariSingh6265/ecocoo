"use client";

import React, { useState } from "react";
import { MapPin, Laugh } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const PuneIncidentSection: React.FC = () => {
  const [showRescueNote, setShowRescueNote] = useState(false);

  return (
    <section
      id="pune-incident"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 13
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="PUNE 2024" label="THE BLUNDER" color="terracotta" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Story copy */}
        <div className="md:col-span-7 space-y-5">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Self-Own of 2024
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            The Infamous "16th September" Incident.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] font-sans leading-relaxed">
            <p>
              29 July ko Monaco ne mujhe raat ke 12:00 AM sharp wish kiya, bina ek second late hue.
            </p>
            <p>
              And me? 2024 mein main Pune mein tha Rotaract work mein, full busy, lost track of date... aur somehow main 15 September ko wish karna bhool gaya! 😭
            </p>
            <p className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              "Yes. I know. Agle din 16 September ko yaad aaya aur wish kiya — aur aaj tak Monaco mujhe iss baat ke taane maarti hai! 😂"
            </p>
            <p className="text-xs text-[#7A6C58]">
              (Iss website ko mera permanent apology aur redemption gift samjho!)
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
                  <span>Pune, 2024 Log</span>
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
                  <span>15 Sept (Monaco's B'day):</span>
                  <span className="font-mono font-bold text-[#8C3D21]">Forgot in Pune 🙈</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-[#FAF7F2] border border-[#EADBCE]">
                  <span>16 Sept (Late Rescue):</span>
                  <span className="font-mono font-bold text-amber-700">Wished next day 😅</span>
                </div>
              </div>

              <button
                onClick={() => setShowRescueNote(!showRescueNote)}
                className="w-full py-2 px-3 bg-[#FAF7F2] hover:bg-[#F5EFEB] text-stone-700 text-xs font-mono rounded border border-[#EADBCE] transition-colors flex items-center justify-center gap-1.5"
              >
                <Laugh className="w-3.5 h-3.5 text-[#8C4A2F]" />
                <span>{showRescueNote ? "Hide Verdict" : "Monaco's Verdict"}</span>
              </button>

              {showRescueNote && (
                <div className="p-3 bg-[#FFFDF8] rounded border border-[#EADBCE] text-xs font-handwriting text-[#8C4A2F] text-center animate-fade-in">
                  "Harshu, tum iss baat se kabhi nahi bach sakte! 😂"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
