"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Send, Sparkles, X, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { Profile } from "@/types/sparkmatch";

interface MatchPopupProps {
  matchedProfile: Profile | null;
  userPhoto?: string;
  onSendMessage: (profile: Profile) => void;
  onKeepSwiping: () => void;
}

export default function MatchPopup({
  matchedProfile,
  userPhoto = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  onSendMessage,
  onKeepSwiping
}: MatchPopupProps) {
  useEffect(() => {
    if (matchedProfile) {
      try {
        // Fire confetti celebration
        const count = 200;
        const defaults = { origin: { y: 0.6 } };

        const fire = (particleRatio: number, opts: confetti.Options) => {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        };

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
          colors: ["#ec4899", "#f43f5e", "#8b5cf6"]
        });
        fire(0.2, {
          spread: 60,
          colors: ["#fb7185", "#f43f5e", "#e11d48"]
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
          colors: ["#a855f7", "#ec4899", "#fbbf24"]
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45
        });
      } catch (e) {
        console.log("Confetti effect triggered");
      }
    }
  }, [matchedProfile]);

  if (!matchedProfile) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fade-in">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="relative w-full max-w-sm p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-white/15 shadow-2xl text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onKeepSwiping}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Glow Halo */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-rose-500/40 via-pink-500/30 to-purple-600/40 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-6 pt-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Chemistry</span>
            </div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 font-serif italic tracking-wide">
              It&apos;s a Match!
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              You and <span className="font-semibold text-white">{matchedProfile.name}</span> liked each other
            </p>
          </motion.div>

          {/* Dual Intersecting Avatars */}
          <div className="relative flex items-center justify-center h-36 my-4">
            {/* User Photo */}
            <motion.div
              initial={{ x: -60, rotate: -12, opacity: 0 }}
              animate={{ x: -20, rotate: -6, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="relative z-10 w-28 h-28 rounded-full ring-4 ring-rose-500/80 shadow-2xl overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userPhoto}
                alt="You"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Central Heart Spark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute z-30 p-3 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-spark-glow ring-4 ring-slate-900"
            >
              <Heart className="w-6 h-6 fill-white" />
            </motion.div>

            {/* Matched Profile Photo */}
            <motion.div
              initial={{ x: 60, rotate: 12, opacity: 0 }}
              animate={{ x: 20, rotate: 6, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
              className="relative z-20 w-28 h-28 rounded-full ring-4 ring-pink-500/80 shadow-2xl overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={matchedProfile.photos[0]}
                alt={matchedProfile.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Compatibility badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-rose-200 mb-6"
          >
            <Flame className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>{matchedProfile.compatibilityScore}% Compatibility Score</span>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSendMessage(matchedProfile)}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-spark flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
            >
              <Send className="w-4 h-4" />
              <span>Send a Message</span>
            </motion.button>

            <button
              onClick={onKeepSwiping}
              className="w-full py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-sm transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
