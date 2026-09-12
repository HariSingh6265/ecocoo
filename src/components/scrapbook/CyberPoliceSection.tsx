"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Siren, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const CyberPoliceSection: React.FC = () => {
  const [badgeFlipped, setBadgeFlipped] = useState(false);

  return (
    <section
      id="cyber-police"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 02
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="OFFICER #01" label="CYBER POLICE" color="terracotta" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Story Text */}
        <div className="md:col-span-7 space-y-5 order-2 md:order-1">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Unofficial Internet Safety Officer
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            Somehow, before we even became friends... maine decide kiya ki ab cyber-police banna padega. 😂
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] leading-relaxed font-sans">
            <p>
              Uss group mein ek guy Monaco ko online bother aur threaten kar raha tha.
            </p>
            <p>
              Toh maine kya kiya? Maine literally imaginary investigator badge pehna, full cyber-police mode mein jaake uss bande ko bhaga diya.
            </p>
            <p className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] text-[#443F3A] italic">
              Aur uske baad maine Monaco ko baith ke proper 20-minute ka lecture diya ki: <em>"Social media thoda dhyan se use kiya karo!"</em> Jaise main cyber security head hoon. 😂
            </p>
            <p className="text-xs text-[#7A6C58]">
              Aaj bhi yeh memory yaad aati hai toh hasi aati hai — what an unforgettable way to start a friendship!
            </p>
          </div>
        </div>

        {/* Case File Investigation Dossier Visual */}
        <div className="md:col-span-5 flex flex-col items-center order-1 md:order-2">
          <div className="relative w-full max-w-xs">
            <div className="absolute -top-3 right-6 z-10">
              <WashiTape width="w-20" tilt={2} variant="terracotta" />
            </div>

            <div
              onClick={() => setBadgeFlipped(!badgeFlipped)}
              className="bg-white rounded-lg p-5 border border-[#EADBCE] shadow-md cursor-pointer group transition-all hover:shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C25E3B]/10 flex items-center justify-center text-[#C25E3B]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2C2926]">CASE FILE: #001</div>
                    <div className="text-[10px] text-stone-500 font-mono">Telegram Safety Unit</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  SOLVED ✓
                </span>
              </div>

              {!badgeFlipped ? (
                <div className="space-y-3 font-sans text-xs">
                  <div className="p-3 bg-[#FAF7F2] rounded border border-[#EADBCE]">
                    <div className="font-mono text-[10px] text-[#8C4A2F] uppercase font-bold flex items-center gap-1 mb-1">
                      <Siren className="w-3 h-3" /> Incident Details
                    </div>
                    <p className="text-stone-800">
                      Online nuisance bothering Monaco in Class 10 study group.
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] rounded border border-[#EADBCE]">
                    <div className="font-mono text-[10px] text-emerald-700 uppercase font-bold flex items-center gap-1 mb-1">
                      <CheckCircle2 className="w-3 h-3" /> The Hari Action
                    </div>
                    <p className="text-stone-800">
                      Chased the guy away + free internet safety masterclass.
                    </p>
                  </div>

                  <p className="text-[10px] text-center text-stone-400 pt-1 font-mono">
                    (Tap to see officer verdict)
                  </p>
                </div>
              ) : (
                <div className="space-y-3 font-sans text-xs bg-[#FFFDF8] p-4 rounded border border-[#EADBCE]">
                  <div className="font-mono text-[10px] text-[#8C4A2F] uppercase font-bold">
                    Official Conclusion:
                  </div>
                  <p className="font-serif italic text-stone-800 text-sm">
                    "Threat neutralized. Monaco is safe to study for boards." 👮‍♂️
                  </p>
                  <p className="font-handwriting text-xs text-[#8C4A2F] pt-2 border-t border-[#F0E8DE]">
                    Friendship status: Unofficial protector activated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
