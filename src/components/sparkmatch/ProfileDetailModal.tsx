"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  XCircle,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Music,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Wine,
  Activity,
  Compass
} from "lucide-react";
import { Profile } from "@/types/sparkmatch";

interface ProfileDetailModalProps {
  profile: Profile | null;
  onClose: () => void;
  onLike: (profile: Profile) => void;
  onPass: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
}

export default function ProfileDetailModal({
  profile,
  onClose,
  onLike,
  onPass,
  onSuperLike
}: ProfileDetailModalProps) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  if (!profile) return null;

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % profile.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg h-full sm:h-[90vh] bg-slate-900 text-white rounded-none sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/10"
        >
          {/* Top Bar with Close Button */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Profile Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
            {/* Primary Hero Photo with Carousel Controls */}
            <div className="relative h-[420px] w-full bg-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photos[activePhotoIdx]}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

              {/* Photo indicator bars */}
              <div className="absolute top-4 left-4 right-16 flex gap-1.5 z-20">
                {profile.photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      activePhotoIdx === i ? "bg-white" : "bg-white/30"
                    }`}
                  />
                ))}
              </div>

              {/* Carousel arrows */}
              {profile.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Basic Details Overlaid on Hero Bottom */}
              <div className="absolute bottom-4 left-5 right-5 z-20">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    {profile.name}, {profile.age}
                  </h2>
                  {profile.verified && (
                    <CheckCircle2 className="w-6 h-6 text-rose-400 fill-rose-500/20" />
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-rose-200/90 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    {profile.distanceMiles} miles away • {profile.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Body & Details */}
            <div className="p-6 space-y-6">
              {/* Compatibility & Quick Badges */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-violet-500/20 border border-rose-500/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-spark">
                    <Flame className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-rose-300 uppercase tracking-wide">
                      Spark AI Compatibility
                    </div>
                    <div className="text-xl font-extrabold text-white">
                      {profile.compatibilityScore}% Match
                    </div>
                  </div>
                </div>
                {profile.activeNow && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active Now
                  </span>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  About Me
                </h4>
                <p className="text-base text-slate-200 leading-relaxed font-normal">
                  {profile.bio}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {profile.occupation && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <Briefcase className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="truncate">{profile.occupation}</span>
                  </div>
                )}
                {profile.companyOrSchool && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <GraduationCap className="w-4 h-4 text-pink-400 shrink-0" />
                    <span className="truncate">{profile.companyOrSchool}</span>
                  </div>
                )}
                {profile.zodiac && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{profile.zodiac}</span>
                  </div>
                )}
                {profile.height && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{profile.height}</span>
                  </div>
                )}
                {profile.drinking && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <Wine className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{profile.drinking}</span>
                  </div>
                )}
                {profile.workout && (
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-300">
                    <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{profile.workout}</span>
                  </div>
                )}
              </div>

              {/* Interests Tags */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Passions & Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-medium text-rose-100 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prompts Cards (Hinge Style) */}
              {profile.prompts && profile.prompts.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Prompts & Story
                  </h4>
                  {profile.prompts.map((prompt, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 space-y-2"
                    >
                      <div className="text-xs font-semibold text-rose-400">
                        {prompt.question}
                      </div>
                      <div className="text-sm font-medium text-white italic leading-snug">
                        &ldquo;{prompt.answer}&rdquo;
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Spotify Anthem */}
              {profile.anthem && (
                <div className="p-4 rounded-3xl bg-slate-950/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <Music className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        My Anthem on Spotify
                      </div>
                      <div className="text-sm font-bold text-white">
                        {profile.anthem.song}
                      </div>
                      <div className="text-xs text-slate-400">
                        {profile.anthem.artist}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Extra Photos Gallery */}
              {profile.photos.length > 1 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    More Photos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {profile.photos.slice(1).map((photo, i) => (
                      <div
                        key={i}
                        className="h-48 rounded-2xl overflow-hidden border border-white/10 bg-slate-950"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={`${profile.name} gallery ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 flex items-center justify-center gap-6 z-30">
            {/* Pass */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onPass(profile);
                onClose();
              }}
              className="w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 border-2 border-rose-500/30 text-rose-400 shadow-xl flex items-center justify-center transition-transform"
              title="Pass"
            >
              <XCircle className="w-7 h-7" />
            </motion.button>

            {/* Super Like */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onSuperLike(profile);
                onClose();
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-xl flex items-center justify-center transition-transform"
              title="Super Like"
            >
              <Star className="w-6 h-6 fill-white" />
            </motion.button>

            {/* Like */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                onLike(profile);
                onClose();
              }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-spark-glow flex items-center justify-center transition-transform"
              title="Like"
            >
              <Heart className="w-7 h-7 fill-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
