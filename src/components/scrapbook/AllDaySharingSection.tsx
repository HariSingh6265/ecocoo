"use client";

import React from "react";
import { MessageSquareText, HelpCircle, HeartHandshake, Sparkles, CheckCheck } from "lucide-react";
import { WashiTape } from "./WashiTape";
import { PostageStamp } from "./PostageStamp";

export const AllDaySharingSection: React.FC = () => {
  const topics = [
    { title: "Personal Situations", desc: "Confusions, family stuff, and day-to-day happenings." },
    { title: "Exam & Career Stress", desc: "Doubts, plans, and what path to choose next." },
    { title: "Random Midnight Thoughts", desc: "The weirdest questions that only make sense at 1 AM." },
    { title: "'What should I do?'", desc: "Actually listening and giving honest, grounded advice." },
  ];

  return (
    <section
      id="talking-all-day"
      className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 06
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="DAILY CHATS" label="SHARED ARCHIVE" color="terracotta" />
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="font-handwriting text-xl sm:text-2xl text-[#8C4A2F]">
            The All-Day Conversations
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#2C2926] leading-tight">
            Some friendships are built on big moments. Ours was built on hundreds of small conversations.
          </h2>
        </div>

        {/* Lined Notebook Paper Layout */}
        <div className="lined-paper p-6 sm:p-8 rounded border border-[#EADBCE] shadow-sm relative space-y-6">
          <div className="absolute -top-3 right-8">
            <WashiTape width="w-24" tilt={1.5} variant="parchment" />
          </div>

          <p className="font-sans text-sm sm:text-base text-[#443F3A] leading-relaxed">
            There was a phase where we talked throughout the day. We shared almost everything: random thoughts, personal situations, advice, questions, and life updates.
          </p>

          {/* Grid of Shared Things */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {topics.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/95 p-3.5 rounded border border-[#EADBCE] shadow-xs flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#FAF4EC] flex items-center justify-center text-[#8C4A2F] shrink-0 mt-0.5">
                  <CheckCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#2C2926]">
                    {t.title}
                  </h4>
                  <p className="text-xs text-[#6B635B] font-sans">
                    {t.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF4EC] p-4 rounded border-l-2 border-[#8C4A2F] text-xs sm:text-sm text-[#443F3A] font-sans">
            <strong>The core dynamic:</strong> Whenever one of us asked <em>"What should I do?"</em>, the other person never brushed it off. We actually listened and helped figure things out.
          </div>
        </div>
      </div>
    </section>
  );
};
