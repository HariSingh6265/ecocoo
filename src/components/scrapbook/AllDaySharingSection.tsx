"use client";

import React from "react";
import { CheckCheck } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const AllDaySharingSection: React.FC = () => {
  const topics = [
    { title: "Personal Situations", desc: "Confusions, family baatein, and day-to-day happenings." },
    { title: "Career & Exam Stress", desc: "Doubts, future plans, aur agla step kya lena hai." },
    { title: "Random Midnight Thoughts", desc: "Woh weird thoughts jo sirf raat ko 1 AM hi samajh aate hain." },
    { title: "'What should I do?'", desc: "Actually dhyan se sunna aur honest advice dena." },
  ];

  return (
    <section
      id="talking-all-day"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 09
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="DAILY CHATS" label="SHARED DIARY" color="terracotta" />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
            The All-Day Conversations
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] leading-tight">
            Ek time pe hum literally poora din baat karte the.
          </h2>
        </div>

        {/* Lined Notebook Paper Layout */}
        <div className="lined-paper p-6 sm:p-9 rounded border border-[#EADBCE] shadow-sm relative space-y-6">
          <div className="absolute -top-3 right-8">
            <WashiTape width="w-24" tilt={1.5} variant="parchment" />
          </div>

          <p className="font-sans text-sm sm:text-base text-[#443F3A] leading-relaxed">
            Ek aisa phase tha jahan hum lagbhag har cheez share karte the: random thoughts, personal situations, advice, questions, aur daily life updates.
          </p>

          {/* Grid of Shared Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {topics.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/95 p-4 rounded border border-[#EADBCE] shadow-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#FAF4EC] flex items-center justify-center text-[#8C4A2F] shrink-0 mt-0.5">
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2C2926]">
                    {t.title}
                  </h4>
                  <p className="text-xs text-[#6B635B] font-sans mt-0.5">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] text-xs sm:text-sm text-[#443F3A] font-sans">
            <strong>The Core Dynamic:</strong> Jab bhi hum mein se kisi ne pucha <em>"What should I do?"</em>, the other person actually listened with full attention and helped find a solution.
          </div>
        </div>
      </div>
    </section>
  );
};
