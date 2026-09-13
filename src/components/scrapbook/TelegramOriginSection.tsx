"use client";

import React, { useState } from "react";
import { Send, ZoomIn, X, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const TelegramOriginSection: React.FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const telegramImageSrc = "/photos/Telegram Group.jpeg";

  return (
    <>
      <section
        id="origins"
        className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
      >
        {/* Chapter Marker */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
            CHAPTER 01
          </span>
          <div className="h-px bg-[#EADBCE] flex-1" />
          <PostageStamp date="CLASS 10" label="TELEGRAM ARCHIVE" color="navy" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Story Text */}
          <div className="md:col-span-7 space-y-5">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
              Toh... yahin se shuru hui thi humari story.
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
              Do random log, ek Vedantu group... aur phir somehow baat hoti rahi.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#57483B] leading-relaxed font-sans">
              <p>
                Hum Class 10 board-exam period ke time ek Telegram study group ke through mile the.
              </p>
              <p className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
                Initially mujhe yeh bhi confirm nahi pata tha ki woh Vedantu ka group tha ya BYJU’S ka — baad mein Monaco ne khud confirm kiya ki woh <strong>Vedantu</strong> group hi tha!
              </p>
              <p>
                Hum dono wahan boards ke questions aur sample papers discuss kar rahe the. Honestly, mujhe tab bilkul idea nahi tha ki uss random Telegram group se ek itni genuine aur lambi friendship ban jayegi.
              </p>
            </div>
          </div>

          {/* Archival Memory Fragment */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-xs">
              <div className="absolute -top-3 left-6 z-10">
                <WashiTape width="w-24" tilt={-3} variant="parchment" />
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-5 border border-[#EADBCE] shadow-md relative">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE] mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2AABEE]/10 flex items-center justify-center text-[#2AABEE]">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2C2926]">Telegram Archive</div>
                      <div className="text-[10px] text-stone-500 font-mono">Vedantu Class 10 Boards</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                    Origin
                  </span>
                </div>

                {/* Real Image or Screenshot */}
                <div
                  onClick={() => setIsZoomed(true)}
                  className="w-full aspect-[4/3] bg-[#FAF7F2] rounded border border-[#E5DACD] relative overflow-hidden group cursor-pointer flex items-center justify-center mb-3"
                >
                  <img
                    src={telegramImageSrc}
                    alt="Telegram Study Group Archive"
                    className="w-full h-full object-cover rounded"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-stone-800 flex items-center gap-1 shadow-sm">
                      <ZoomIn className="w-3.5 h-3.5" /> View Photo
                    </span>
                  </div>
                </div>

                <div className="space-y-2 font-sans text-xs text-[#57483B]">
                  <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#EADBCE]/60">
                    <div className="text-[10px] font-mono text-[#8C4A2F] uppercase font-bold mb-0.5">
                      Group Context
                    </div>
                    <p className="font-serif italic text-stone-800 text-[11px]">
                      "Class 10 Board Exam Discussions & Sample Papers"
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F0E8DE] text-center">
                  <p className="font-handwriting text-xs text-[#8C4A2F]">
                    Where it all started • Class 10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="bg-[#FAF7F2] border border-[#EADBCE] rounded-xl max-w-lg w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Class 10 Archive Photo
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2C2926] mb-3">
              Telegram Study Group Era
            </h3>

            <div className="rounded border border-[#EADBCE] overflow-hidden bg-black flex items-center justify-center my-3">
              <img
                src={telegramImageSrc}
                alt="Telegram Group Screenshot"
                className="w-full max-h-[420px] object-contain bg-[#FAF7F2]"
              />
            </div>

            <p className="font-serif italic text-xs text-stone-600 text-center mt-2">
              "Do random log. Ek study group. Aur phir... somehow baat shuru ho gayi."
            </p>
          </div>
        </div>
      )}
    </>
  );
};
