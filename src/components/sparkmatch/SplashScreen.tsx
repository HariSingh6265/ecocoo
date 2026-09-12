"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Sparkles, Heart, ShieldCheck, Zap, ArrowRight, MessageCircle } from "lucide-react";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [slide, setSlide] = useState(0);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      title: "Chemistry-First Matching",
      desc: "Smart AI compatibility algorithm tailored to your lifestyle, music taste, and humor."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
      title: "100% Verified Profiles",
      desc: "Zero catfish. Real photo-verified singles ready for genuine human connection."
    },
    {
      icon: <Zap className="w-8 h-8 text-rose-400" />,
      title: "Instant Sparks & Video Vibes",
      desc: "Audio anthems, rich prompt answers, and effortless icebreakers for real conversations."
    }
  ];

  return (
    <div className="relative min-h-[720px] h-full w-full flex flex-col justify-between p-6 overflow-hidden bg-slate-950 text-white select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-rose-600/30 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-pink-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-14 right-8 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hidden sm:flex items-center gap-2"
      >
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        <span className="text-xs font-semibold text-rose-200">98% Match</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-44 left-6 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl hidden sm:flex items-center gap-2"
      >
        <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
        <span className="text-xs font-semibold text-amber-200">50+ New Sparks</span>
      </motion.div>

      {/* Header / Brand */}
      <div className="relative z-10 pt-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-500 to-violet-600 shadow-spark-glow mb-4"
        >
          <Flame className="w-11 h-11 text-white fill-white animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent">Spark</span>
          <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-violet-400 bg-clip-text text-transparent">Match</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-rose-200/80 text-sm mt-1 font-medium tracking-wide"
        >
          Find Your Spark. Ignite Your Story.
        </motion.p>
      </div>

      {/* Middle Carousel / Highlights */}
      <div className="relative z-10 my-auto py-6">
        <div className="min-h-[170px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35 }}
              className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center max-w-sm mx-auto"
            >
              <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-3">
                {features[slide].icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">{features[slide].title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{features[slide].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                slide === i ? "w-7 bg-rose-500" : "w-2 bg-white/20"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="relative z-10 space-y-3 pb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 text-white font-bold text-base shadow-spark flex items-center justify-center gap-2 transition-all group"
        >
          <span>Get Started (Demo Mode)</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-sm flex items-center justify-center gap-3 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
            />
          </svg>
          <span>Continue with Google</span>
        </motion.button>

        <p className="text-[11px] text-center text-slate-400 pt-2">
          By continuing, you agree to SparkMatch Terms & Privacy. No credit card required.
        </p>
      </div>
    </div>
  );
}
