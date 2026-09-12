"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Star,
  RotateCcw,
  Zap,
  MapPin,
  CheckCircle2,
  SlidersHorizontal,
  Info,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles
} from "lucide-react";
import { Profile } from "@/types/sparkmatch";

interface DiscoverScreenProps {
  profiles: Profile[];
  onSwipeLike: (profile: Profile) => void;
  onSwipePass: (profile: Profile) => void;
  onSuperLike: (profile: Profile) => void;
  onOpenProfileDetail: (profile: Profile) => void;
  onOpenFilter: () => void;
  onRewind: () => void;
  canRewind: boolean;
  boostActive: boolean;
  onTriggerBoost: () => void;
}

export default function DiscoverScreen({
  profiles,
  onSwipeLike,
  onSwipePass,
  onSuperLike,
  onOpenProfileDetail,
  onOpenFilter,
  onRewind,
  canRewind,
  boostActive,
  onTriggerBoost
}: DiscoverScreenProps) {
  const [photoIndexMap, setPhotoIndexMap] = useState<Record<string, number>>({});
  const [swipeFeedback, setSwipeFeedback] = useState<"like" | "pass" | "superlike" | null>(null);

  const currentProfile = profiles[0];
  const nextProfile = profiles[1];

  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-20, -120], [0, 1]);
  const superLikeOpacity = useTransform(y, [-20, -120], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    const yOffset = info.offset.y;

    if (yOffset < -120) {
      // Super like
      if (currentProfile) onSuperLike(currentProfile);
    } else if (offset > threshold || velocity > 500) {
      // Like
      if (currentProfile) onSwipeLike(currentProfile);
    } else if (offset < -threshold || velocity < -500) {
      // Pass
      if (currentProfile) onSwipePass(currentProfile);
    }
  };

  const handleButtonAction = (type: "like" | "pass" | "superlike") => {
    if (!currentProfile) return;
    setSwipeFeedback(type);
    setTimeout(() => {
      setSwipeFeedback(null);
      if (type === "like") onSwipeLike(currentProfile);
      if (type === "pass") onSwipePass(currentProfile);
      if (type === "superlike") onSuperLike(currentProfile);
    }, 200);
  };

  const cyclePhoto = (e: React.MouseEvent, profileId: string, totalPhotos: number, direction: 1 | -1) => {
    e.stopPropagation();
    const cur = photoIndexMap[profileId] || 0;
    const nextIdx = (cur + direction + totalPhotos) % totalPhotos;
    setPhotoIndexMap((prev) => ({ ...prev, [profileId]: nextIdx }));
  };

  return (
    <div className="relative h-full flex flex-col justify-between p-3 sm:p-4 select-none overflow-hidden bg-slate-950 text-white">
      {/* Top Header Bar */}
      <div className="relative z-20 flex items-center justify-between px-2 py-1.5 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-spark">
            <Flame className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent">
                SparkMatch
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PRO
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {boostActive && (
            <div className="animate-pulse px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Boost 2x</span>
            </div>
          )}

          <button
            onClick={onOpenFilter}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 backdrop-blur-md transition-colors"
            title="Discovery Filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Card Deck Area */}
      <div className="relative flex-1 w-full max-w-md mx-auto my-1 flex items-center justify-center min-h-[460px]">
        {profiles.length === 0 ? (
          /* Empty State */
          <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-xs mx-auto space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">You&apos;ve Seen Everyone!</h3>
            <p className="text-xs text-slate-300">
              Check back soon for new singles in your area, or adjust your discovery filters.
            </p>
            <button
              onClick={onOpenFilter}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-spark"
            >
              Adjust Filters
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full max-h-[560px]">
            {/* Next Card in Stack (Peek Behind) */}
            {nextProfile && (
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl pointer-events-none transform scale-95 translate-y-3 opacity-60 transition-transform duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={nextProfile.photos[0]}
                  alt={nextProfile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/20" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-2xl font-bold">{nextProfile.name}, {nextProfile.age}</h3>
                  <p className="text-xs text-slate-300">{nextProfile.occupation}</p>
                </div>
              </div>
            )}

            {/* Active Card */}
            {currentProfile && (
              <motion.div
                style={{ x, y, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                onDragEnd={handleDragEnd}
                animate={
                  swipeFeedback === "like"
                    ? { x: 400, opacity: 0, rotate: 20 }
                    : swipeFeedback === "pass"
                    ? { x: -400, opacity: 0, rotate: -20 }
                    : swipeFeedback === "superlike"
                    ? { y: -500, opacity: 0 }
                    : { x: 0, y: 0, opacity: 1, rotate: 0 }
                }
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="absolute inset-0 rounded-3xl overflow-hidden bg-slate-900 border border-white/15 shadow-2xl cursor-grab active:cursor-grabbing select-none"
              >
                {/* Photos */}
                {(() => {
                  const currentPhotoIdx = photoIndexMap[currentProfile.id] || 0;
                  const currentPhoto = currentProfile.photos[currentPhotoIdx] || currentProfile.photos[0];

                  return (
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={currentPhoto}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Dark gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-black/25 pointer-events-none" />

                      {/* Photo indicator top dashes */}
                      <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
                        {currentProfile.photos.map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                              currentPhotoIdx === i ? "bg-white" : "bg-white/35"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Tap left/right to change photos */}
                      <div
                        onClick={(e) => cyclePhoto(e, currentProfile.id, currentProfile.photos.length, -1)}
                        className="absolute left-0 top-0 bottom-24 w-1/3 z-10"
                      />
                      <div
                        onClick={(e) => cyclePhoto(e, currentProfile.id, currentProfile.photos.length, 1)}
                        className="absolute right-0 top-0 bottom-24 w-1/3 z-10"
                      />

                      {/* Top Badges (Compatibility + Verified) */}
                      <div className="absolute top-7 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/15 text-rose-300 text-xs font-bold">
                          <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                          <span>{currentProfile.compatibilityScore}% Match</span>
                        </div>

                        {currentProfile.verified && (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>

                      {/* Swipe Visual Feedback Stamps */}
                      <motion.div
                        style={{ opacity: likeOpacity }}
                        className="absolute top-16 left-6 z-30 pointer-events-none transform -rotate-12 border-4 border-emerald-400 text-emerald-400 px-4 py-1.5 rounded-2xl font-black text-2xl tracking-wider shadow-2xl bg-emerald-950/40 backdrop-blur-sm"
                      >
                        LIKE
                      </motion.div>

                      <motion.div
                        style={{ opacity: passOpacity }}
                        className="absolute top-16 right-6 z-30 pointer-events-none transform rotate-12 border-4 border-rose-500 text-rose-500 px-4 py-1.5 rounded-2xl font-black text-2xl tracking-wider shadow-2xl bg-rose-950/40 backdrop-blur-sm"
                      >
                        NOPE
                      </motion.div>

                      <motion.div
                        style={{ opacity: superLikeOpacity }}
                        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none border-4 border-cyan-400 text-cyan-300 px-5 py-2 rounded-2xl font-black text-2xl tracking-wider shadow-2xl bg-cyan-950/40 backdrop-blur-sm"
                      >
                        SUPER LIKE
                      </motion.div>

                      {/* Profile Information (Bottom of Card) */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-auto">
                        <div className="flex items-end justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                                {currentProfile.name}, {currentProfile.age}
                              </h2>
                            </div>

                            <p className="text-xs font-medium text-rose-200/90 flex items-center gap-1.5">
                              <span>{currentProfile.occupation}</span>
                            </p>

                            <p className="text-[11px] text-slate-300 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-rose-400" />
                              {currentProfile.distanceMiles} miles away • {currentProfile.location}
                            </p>
                          </div>

                          {/* Info Button to Open Full Profile */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenProfileDetail(currentProfile);
                            }}
                            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 shadow-lg transition-transform hover:scale-105 active:scale-95"
                            title="View Full Profile"
                          >
                            <Info className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Short Bio */}
                        <p className="text-xs text-slate-200 mt-2.5 line-clamp-2 leading-relaxed">
                          {currentProfile.bio}
                        </p>

                        {/* Interest Badges */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {currentProfile.interests.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-medium text-white border border-white/10"
                            >
                              #{tag}
                            </span>
                          ))}
                          {currentProfile.interests.length > 3 && (
                            <span className="px-2 py-1 rounded-full bg-white/10 text-[10px] text-slate-300 font-medium">
                              +{currentProfile.interests.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Floating Action Buttons Toolbar */}
      <div className="relative z-20 flex items-center justify-center gap-3 sm:gap-4 py-2 px-2">
        {/* Rewind */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={!canRewind}
          onClick={onRewind}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            canRewind
              ? "bg-slate-900 border-amber-500/40 text-amber-400 shadow-lg hover:bg-slate-800"
              : "bg-slate-900/50 border-white/5 text-slate-600 cursor-not-allowed"
          }`}
          title="Rewind / Undo Last Swipe"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>

        {/* Pass (Nope) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={profiles.length === 0}
          onClick={() => handleButtonAction("pass")}
          className="w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 border-2 border-rose-500/40 text-rose-500 shadow-xl flex items-center justify-center transition-transform"
          title="Pass"
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </motion.button>

        {/* Super Like */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={profiles.length === 0}
          onClick={() => handleButtonAction("superlike")}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-xl flex items-center justify-center transition-transform hover:shadow-cyan-500/40"
          title="Super Like"
        >
          <Star className="w-6 h-6 fill-white" />
        </motion.button>

        {/* Like */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={profiles.length === 0}
          onClick={() => handleButtonAction("like")}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white shadow-spark-glow flex items-center justify-center transition-transform hover:scale-105"
          title="Like"
        >
          <Heart className="w-7 h-7 fill-white" />
        </motion.button>

        {/* Spark Boost */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onTriggerBoost}
          className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
            boostActive
              ? "bg-amber-500 border-amber-400 text-slate-950 shadow-amber-500/50 shadow-lg animate-pulse"
              : "bg-slate-900 border-purple-500/40 text-purple-400 hover:bg-slate-800 shadow-lg"
          }`}
          title="Spark Boost Profile"
        >
          <Zap className="w-5 h-5 fill-current" />
        </motion.button>
      </div>
    </div>
  );
}
