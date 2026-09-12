"use client";

import React from "react";
import { MessageCircle, PhoneCall, HeartHandshake, Sparkles } from "lucide-react";
import { WashiTape } from "./WashiTape";

export const KeptTalkingSection: React.FC = () => {
  const progression = [
    {
      step: "01",
      icon: MessageCircle,
      title: "One chat became another",
      desc: "Random board exam doubts turned into everyday thoughts and check-ins.",
    },
    {
      step: "02",
      icon: PhoneCall,
      title: "Then phone calls",
      desc: "Quick questions turned into long conversations that lasted hours.",
    },
    {
      step: "03",
      icon: HeartHandshake,
      title: "Sharing life & supporting each other",
      desc: "Asking 'What should I do?' and genuinely listening to each other's advice.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
          The Quiet Transition
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2C2926] max-w-2xl mx-auto leading-tight">
          Nothing cinematic happened after that. We just... kept talking.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#6B635B] max-w-xl mx-auto">
          Some friendships start with fireworks. Ours was built quietly, conversation by conversation.
        </p>
      </div>

      {/* Progression Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {progression.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/90 p-6 rounded border border-[#EADBCE] shadow-sm relative group hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="absolute -top-2.5 right-6">
                <WashiTape
                  width="w-16"
                  tilt={idx % 2 === 0 ? -2 : 2}
                  variant={idx === 1 ? "terracotta" : "parchment"}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2 py-0.5 rounded">
                    PHASE {item.step}
                  </span>
                  <Icon className="w-5 h-5 text-[#8C4A2F]/80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2C2926] mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#6B635B] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0E8DE] font-handwriting text-xs text-[#8C4A2F]">
                {idx === 2 ? "And that became a friendship." : "And we kept talking..."}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
