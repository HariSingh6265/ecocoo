"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, Flame, Sparkles, CheckCircle2, MessageCircle, Star } from "lucide-react";
import { MatchItem, Profile } from "@/types/sparkmatch";

interface MatchesScreenProps {
  matches: MatchItem[];
  onSelectMatch: (match: MatchItem) => void;
  onOpenProfileDetail: (profile: Profile) => void;
}

export default function MatchesScreen({
  matches,
  onSelectMatch,
  onOpenProfileDetail
}: MatchesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMatches = matches.filter((m) => {
    const nameMatch = m.profile.name.toLowerCase().includes(searchQuery.toLowerCase());
    const interestMatch = m.profile.interests.some((i) =>
      i.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const jobMatch = m.profile.occupation.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || interestMatch || jobMatch;
  });

  const newSparks = matches.filter((m) => m.messages.length <= 1);

  return (
    <div className="h-full flex flex-col p-4 bg-slate-950 text-white overflow-y-auto hide-scrollbar pb-24 select-none">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-3">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent">
            Your Sparks
          </h2>
          <p className="text-xs text-rose-300/80 font-medium">
            {matches.length} active connections
          </p>
        </div>

        <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <Heart className="w-5 h-5 fill-rose-500/20" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, passion, or bio..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500/50 transition-colors"
        />
      </div>

      {/* Top Section: New Sparks Story Circles */}
      {newSparks.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>New Sparks ({newSparks.length})</span>
            </h3>
          </div>

          <div className="flex gap-3.5 overflow-x-auto hide-scrollbar py-1 px-1">
            {newSparks.map((match) => (
              <motion.div
                key={match.id}
                whileTap={{ scale: 0.94 }}
                onClick={() => onSelectMatch(match)}
                className="flex flex-col items-center gap-1.5 cursor-pointer shrink-0 group"
              >
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-600 shadow-spark group-hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={match.profile.photos[0]}
                      alt={match.profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {match.isSuperMatch && (
                    <div className="absolute -top-1 -right-1 p-1 rounded-full bg-cyan-500 text-white shadow-md">
                      <Star className="w-3 h-3 fill-white" />
                    </div>
                  )}
                  {match.profile.activeNow && (
                    <span className="absolute bottom-0 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-200 truncate max-w-[68px] text-center">
                  {match.profile.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-rose-300/80 -mt-1 font-medium">
                  {match.profile.compatibilityScore}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Main List: Conversations */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1 flex items-center gap-1.5">
          <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Messages & Sparks</span>
        </h3>

        {filteredMatches.length === 0 ? (
          <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/5 my-4">
            <p className="text-xs text-slate-400">No matches found for &ldquo;{searchQuery}&rdquo;</p>
          </div>
        ) : (
          filteredMatches.map((match) => (
            <motion.div
              key={match.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMatch(match)}
              className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
            >
              {/* Avatar */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenProfileDetail(match.profile);
                }}
                className="relative shrink-0"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-rose-500/40 group-hover:ring-rose-500 transition-all">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={match.profile.photos[0]}
                    alt={match.profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {match.profile.activeNow && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-white truncate">
                      {match.profile.name}
                    </h4>
                    {match.profile.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium shrink-0">
                    {match.lastMessageTime}
                  </span>
                </div>

                <p className="text-xs text-slate-300 truncate font-normal">
                  {match.lastMessage || `Matched with ${match.profile.name}! Say hi 👋`}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-rose-300">
                    <Flame className="w-3 h-3 fill-rose-400 text-rose-400" />
                    {match.profile.compatibilityScore}% Chemistry
                  </span>
                  <span className="text-[10px] text-slate-400">• {match.profile.location}</span>
                </div>
              </div>

              {/* Unread Indicator */}
              {match.unreadCount > 0 && (
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-spark">
                  {match.unreadCount}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
