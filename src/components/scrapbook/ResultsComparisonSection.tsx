"use client";

import React, { useState } from "react";
import { Smile, Frown, Sparkles, Scale, RefreshCw } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";
import { VERSION_MEMORIES } from "../../data/storyData";

export const ResultsComparisonSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"both" | "hari" | "monica">("both");
  const mem = VERSION_MEMORIES[0]; // class 10 results memory

  return (
    <section
      id="board-results"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 07
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="~89% vs 82.6%" label="BOARD EXAMS" color="terracotta" />
      </div>

      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The Great Board Results Paradox
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            The "89%" Incident: Your Version vs My Version
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6B635B]">
            Two friends looking at board exam scores with completely opposite emotional reactions.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeTab === "both"
                ? "bg-[#2C2926] text-white shadow-sm"
                : "bg-white text-stone-700 border border-[#EADBCE] hover:bg-[#FAF7F2]"
            }`}
          >
            Side-by-Side View
          </button>
          <button
            onClick={() => setActiveTab("hari")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeTab === "hari"
                ? "bg-[#8C4A2F] text-white shadow-sm"
                : "bg-white text-stone-700 border border-[#EADBCE] hover:bg-[#FAF7F2]"
            }`}
          >
            Hari's Version (82.6%)
          </button>
          <button
            onClick={() => setActiveTab("monica")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeTab === "monica"
                ? "bg-[#8C4A2F] text-white shadow-sm"
                : "bg-white text-stone-700 border border-[#EADBCE] hover:bg-[#FAF7F2]"
            }`}
          >
            Monica's Version (~89%)
          </button>
        </div>

        {/* Comparison Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative pt-4">
          {/* Hari's Card */}
          {(activeTab === "both" || activeTab === "hari") && (
            <div
              className={`bg-white rounded-lg p-6 sm:p-7 border border-[#EADBCE] shadow-sm relative flex flex-col justify-between transition-all ${
                activeTab === "hari" ? "md:col-span-2 max-w-xl mx-auto" : ""
              }`}
            >
              <div className="absolute -top-3 left-6">
                <WashiTape width="w-20" tilt={-2} variant="parchment" />
              </div>

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE] mb-4">
                  <div className="flex items-center gap-2">
                    <Smile className="w-4 h-4 text-emerald-600" />
                    <span className="font-serif font-bold text-sm text-[#2C2926]">
                      {mem.hariVersion.headline}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    82.6% • Completely Chilling
                  </span>
                </div>

                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#57483B] leading-relaxed">
                  <p>{mem.hariVersion.body}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0E8DE]">
                <p className="font-handwriting text-sm text-[#8C4A2F] italic">
                  "{mem.hariVersion.quote}"
                </p>
              </div>
            </div>
          )}

          {/* Monica's Card */}
          {(activeTab === "both" || activeTab === "monica") && (
            <div
              className={`bg-white rounded-lg p-6 sm:p-7 border border-[#EADBCE] shadow-sm relative flex flex-col justify-between transition-all ${
                activeTab === "monica" ? "md:col-span-2 max-w-xl mx-auto" : ""
              }`}
            >
              <div className="absolute -top-3 right-6">
                <WashiTape width="w-20" tilt={2} variant="terracotta" />
              </div>

              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DE] mb-4">
                  <div className="flex items-center gap-2">
                    <Frown className="w-4 h-4 text-[#C25E3B]" />
                    <span className="font-serif font-bold text-sm text-[#2C2926]">
                      {mem.monicaVersion.headline}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-rose-50 text-rose-800 px-2 py-0.5 rounded border border-rose-200">
                    ~89% • Heartbroken at the time 😭
                  </span>
                </div>

                <div className="space-y-3 font-sans text-xs sm:text-sm text-[#57483B] leading-relaxed">
                  <p>{mem.monicaVersion.body}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#F0E8DE]">
                <p className="font-handwriting text-sm text-[#8C4A2F] italic">
                  "{mem.monicaVersion.quote}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Takeaway footer */}
        <div className="bg-[#FAF4EC] p-4 sm:p-5 rounded-lg border-l-2 border-[#8C4A2F] text-center max-w-2xl mx-auto">
          <p className="font-serif italic text-xs sm:text-sm text-[#443F3A]">
            "{mem.takeaway}"
          </p>
        </div>
      </div>
    </section>
  );
};
