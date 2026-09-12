"use client";

import React from "react";
import { ArrowLeftRight } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const UnbrokenFriendshipSection: React.FC = () => {
  return (
    <section
      id="unbroken-thread"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 12
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="15.09 ↔ 29.07" label="ANCHORS" color="navy" />
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Friendship That Remembered
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            Some friendships don't need constant talking. September still remembered us.
          </h2>
        </div>

        {/* Date Composition Box */}
        <div className="bg-white/95 p-6 sm:p-9 rounded-lg border border-[#EADBCE] shadow-sm relative space-y-6">
          <div className="absolute -top-3 left-10">
            <WashiTape width="w-24" tilt={-1.5} variant="parchment" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 py-4">
            {/* Monaco Birthday */}
            <div className="flex flex-col items-center p-4 rounded-lg bg-[#FAF7F2] border border-[#EADBCE] w-48 shadow-xs">
              <span className="text-[10px] font-mono text-[#8C4A2F] uppercase font-bold tracking-widest">
                Monaco's Birthday
              </span>
              <span className="font-serif text-2xl font-bold text-[#2C2926] my-1">
                15 September
              </span>
              <span className="font-handwriting text-sm text-[#8C4A2F]">
                Wishes & Edits Sent
              </span>
            </div>

            <div className="p-2 rounded-full bg-[#FAF4EC] text-[#8C4A2F] border border-[#EADBCE]">
              <ArrowLeftRight className="w-5 h-5" />
            </div>

            {/* Hari Birthday */}
            <div className="flex flex-col items-center p-4 rounded-lg bg-[#FAF7F2] border border-[#EADBCE] w-48 shadow-xs">
              <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold tracking-widest">
                Hari's Birthday
              </span>
              <span className="font-serif text-2xl font-bold text-[#2C2926] my-1">
                29 July
              </span>
              <span className="font-handwriting text-sm text-[#5B7A68]">
                Midnight Wishes & Verses
              </span>
            </div>
          </div>

          <div className="space-y-3 font-sans text-sm sm:text-base text-[#57483B] leading-relaxed text-left">
            <p>
              Aise bhi saal aaye jab hum mahino tak baat nahi karte the. Life busy ho gayi, schedules badal gaye, aur chats quiet ho gayi.
            </p>
            <p className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              "Lekin jab bhi humare birthdays aaye, humne hamesha wish kiya aur edits bheje. You once described this as: <em>'Yeh hoti hai real friendship.'</em>"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
