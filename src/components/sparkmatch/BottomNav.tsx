"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Heart, MessageCircle, User } from "lucide-react";
import { TabType } from "@/types/sparkmatch";

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadMessagesCount: number;
  newMatchesCount: number;
}

export default function BottomNav({
  currentTab,
  onTabChange,
  unreadMessagesCount,
  newMatchesCount
}: BottomNavProps) {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: "discover",
      label: "Discover",
      icon: <Flame className="w-6 h-6" />
    },
    {
      id: "matches",
      label: "Matches",
      icon: <Heart className="w-6 h-6" />,
      badge: newMatchesCount > 0 ? newMatchesCount : undefined
    },
    {
      id: "chat",
      label: "Chats",
      icon: <MessageCircle className="w-6 h-6" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-6 h-6" />
    }
  ];

  return (
    <div className="absolute bottom-3 left-4 right-4 z-40">
      <div className="max-w-md mx-auto py-2 px-3 rounded-3xl bg-slate-900/85 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.88 }}
              onClick={() => onTabChange(tab.id)}
              className="relative p-2.5 flex flex-col items-center gap-0.5 transition-colors focus:outline-none"
            >
              {/* Active Indicator Glow Pill */}
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500/25 via-pink-500/20 to-purple-600/25 border border-rose-500/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div
                className={`relative z-10 transition-colors ${
                  isActive ? "text-rose-400 fill-rose-500/20" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab.icon}

                {/* Notification Badge */}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center ring-2 ring-slate-900 shadow-spark">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`relative z-10 text-[10px] font-bold transition-colors ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
