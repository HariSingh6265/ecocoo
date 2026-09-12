"use client";

import React from "react";
import { Send, MessageSquare, BookMarked, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { PolaroidFrame } from "./PolaroidFrame";

export const TelegramOriginSection: React.FC = () => {
  return (
    <section
      id="origins"
      className="py-20 sm:py-28 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 01
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="CLASS 10" label="TELEGRAM ARCHIVE" color="navy" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Story Text */}
        <div className="md:col-span-7 space-y-5">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            Where it all began...
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            Two strangers in a Class 10 study group.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#57483B] leading-relaxed font-sans">
            <p>
              We met around the Class 10 board-exam prep period through a Telegram group.
            </p>
            <p className="bg-[#FAF4EC] p-3.5 rounded border-l-2 border-[#8C4A2F] italic text-[#443F3A]">
              At first, I wasn’t even completely sure whether it was a BYJU’S or Vedantu group — until you yourself confirmed that it was, in fact, a <strong>Vedantu</strong> group.
            </p>
            <p>
              We were both there discussing board exams, syllabus updates, and sample papers. Neither of us had any clue that a random Telegram group would lead to a friendship that would last for years.
            </p>
          </div>
        </div>

        {/* Abstract Scrapbook Artifact (No Fake Screenshots) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-xs">
            <div className="absolute -top-3 left-6 z-10">
              <WashiTape width="w-24" tilt={-3} variant="parchment" />
            </div>

            {/* Telegram Abstract Artifact Card */}
            <div className="bg-white rounded p-5 border border-[#EADBCE] shadow-md relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE] mb-4">
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

              <div className="space-y-3 font-sans text-xs text-[#57483B]">
                <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#EADBCE]/60">
                  <div className="text-[10px] font-mono text-[#8C4A2F] uppercase font-semibold mb-1">
                    Group Topic
                  </div>
                  <p className="font-serif italic text-stone-800">
                    "Class 10 Board Exam Discussions & Notes"
                  </p>
                </div>

                <div className="p-2.5 rounded bg-[#FAF7F2] border border-[#EADBCE]/60">
                  <div className="text-[10px] font-mono text-[#5B7A68] uppercase font-semibold mb-1">
                    Status
                  </div>
                  <p className="text-stone-700">
                    Two students discussing exams. A friendship quietly starts.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E8DE] text-center">
                <p className="font-handwriting text-sm text-[#8C4A2F]">
                  [INSERT TELEGRAM SCREENSHOT HERE]
                </p>
                <p className="text-[10px] text-stone-400 font-sans mt-0.5">
                  (Ready for real archive screenshot)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
