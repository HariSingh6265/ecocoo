"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, Check, ShieldCheck, Flame, RotateCcw } from "lucide-react";
import { FilterState } from "@/types/sparkmatch";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  onReset: () => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onReset
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-slate-900 text-white rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl p-6 space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-rose-400" />
              <h3 className="text-lg font-bold text-white">Discovery Filters</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gender / Interest Mode */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Interested in
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["all", "female", "male"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setLocalFilters({ ...localFilters, gender: g })}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-semibold capitalize transition-all ${
                    localFilters.gender === g
                      ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-spark"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {g === "all" ? "Everyone" : g === "female" ? "Women" : "Men"}
                </button>
              ))}
            </div>
          </div>

          {/* Maximum Distance Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider">Maximum Distance</span>
              <span className="text-rose-400 font-extrabold">{localFilters.maxDistance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={localFilters.maxDistance}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, maxDistance: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Age Range */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider">Age Range</span>
              <span className="text-rose-400 font-extrabold">
                {localFilters.ageRange[0]} - {localFilters.ageRange[1]} yrs
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="18"
                max="35"
                value={localFilters.ageRange[0]}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    ageRange: [Math.min(Number(e.target.value), localFilters.ageRange[1] - 1), localFilters.ageRange[1]]
                  })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <input
                type="range"
                min="25"
                max="45"
                value={localFilters.ageRange[1]}
                onChange={(e) =>
                  setLocalFilters({
                    ...localFilters,
                    ageRange: [localFilters.ageRange[0], Math.max(Number(e.target.value), localFilters.ageRange[0] + 1)]
                  })
                }
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>

          {/* Minimum Compatibility */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                Min Compatibility Score
              </span>
              <span className="text-rose-400 font-extrabold">{localFilters.minCompatibility}%</span>
            </div>
            <input
              type="range"
              min="75"
              max="95"
              step="1"
              value={localFilters.minCompatibility}
              onChange={(e) =>
                setLocalFilters({ ...localFilters, minCompatibility: Number(e.target.value) })
              }
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Verified Only Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white">Verified Profiles Only</div>
                <div className="text-[11px] text-slate-400">Show only photo-verified sparks</div>
              </div>
            </div>
            <button
              onClick={() =>
                setLocalFilters({ ...localFilters, verifiedOnly: !localFilters.verifiedOnly })
              }
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                localFilters.verifiedOnly ? "bg-rose-500" : "bg-slate-700"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  localFilters.verifiedOnly ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                onReset();
                onClose();
              }}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleApply}
              className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-spark flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Apply Filters</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
