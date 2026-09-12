"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Edit3,
  Crown,
  Sparkles,
  Zap,
  Star,
  ShieldCheck,
  Heart,
  Camera,
  MapPin,
  Check,
  X,
  Sliders,
  LogOut,
  Moon,
  Bell,
  EyeOff
} from "lucide-react";
import { UserProfileState } from "@/types/sparkmatch";

interface ProfileScreenProps {
  userProfile: UserProfileState;
  onUpdateProfile: (updated: UserProfileState) => void;
  onResetApp: () => void;
}

export default function ProfileScreen({
  userProfile,
  onUpdateProfile,
  onResetApp
}: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [editData, setEditData] = useState<UserProfileState>(userProfile);

  const handleSaveProfile = () => {
    onUpdateProfile(editData);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col p-4 bg-slate-950 text-white overflow-y-auto hide-scrollbar pb-24 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between py-2 mb-2">
        <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-rose-100 to-pink-200 bg-clip-text text-transparent">
          My Profile
        </h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-300 transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* User Avatar Card */}
      <div className="relative flex flex-col items-center p-6 rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 shadow-2xl mb-5 text-center">
        {/* VIP Ring Avatar */}
        <div className="relative mb-3">
          <div className="p-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-spark-glow">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-slate-950">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userProfile.photos[0]}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="absolute bottom-0 right-0 p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg ring-2 ring-slate-950 transition-transform hover:scale-105"
            title="Edit Profile"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Name and Job */}
        <div className="flex items-center gap-1.5">
          <h3 className="text-xl font-black text-white">{userProfile.name}, {userProfile.age}</h3>
          <ShieldCheck className="w-5 h-5 text-rose-400 fill-rose-500/20" />
        </div>

        <p className="text-xs font-semibold text-rose-300 mt-0.5">{userProfile.occupation}</p>
        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-rose-400" />
          {userProfile.location}
        </p>

        {/* Bio */}
        <p className="text-xs text-slate-300 mt-3 max-w-xs leading-relaxed italic">
          &ldquo;{userProfile.bio}&rdquo;
        </p>

        {/* Interests */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {userProfile.interests.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-medium text-rose-200 border border-white/10"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Spark Economy / Stats Banner */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span className="text-base font-extrabold">{userProfile.sparksCount}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Sparks
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
            <Star className="w-4 h-4 fill-cyan-400" />
            <span className="text-base font-extrabold">{userProfile.superLikesLeft}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Super Likes
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
          <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
            <Zap className="w-4 h-4 fill-purple-400" />
            <span className="text-base font-extrabold">{userProfile.boostsLeft}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Boosts Left
          </span>
        </div>
      </div>

      {/* VIP Gold Upsell Card */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsVipModalOpen(true)}
        className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-purple-600/20 border border-amber-400/30 shadow-xl cursor-pointer mb-5 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 shadow-md">
              <Crown className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                Spark VIP Gold
              </div>
              <div className="text-sm font-bold text-white">See who liked you + Unlimited Likes</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
            UPGRADE
          </span>
        </div>
      </motion.div>

      {/* Quick Action Rows */}
      <div className="space-y-2">
        <button
          onClick={() => setIsEditing(true)}
          className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <Edit3 className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-white">Edit Profile & Photos</span>
          </div>
          <span className="text-xs text-slate-400">→</span>
        </button>

        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white">App Settings & Preferences</span>
          </div>
          <span className="text-xs text-slate-400">→</span>
        </button>

        <button
          onClick={onResetApp}
          className="w-full p-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-300">Restart Demo / Reset State</span>
          </div>
          <span className="text-xs text-rose-400">↻</span>
        </button>
      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-900 text-white rounded-3xl border border-white/10 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto hide-scrollbar"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">Edit Your Profile</h3>
                <button onClick={() => setIsEditing(false)} className="p-1 rounded-full text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Display Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Age</label>
                    <input
                      type="number"
                      value={editData.age}
                      onChange={(e) => setEditData({ ...editData, age: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Location</label>
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Occupation / Headline</label>
                  <input
                    type="text"
                    value={editData.occupation}
                    onChange={(e) => setEditData({ ...editData, occupation: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Bio</label>
                  <textarea
                    rows={3}
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-semibold block mb-1">Interests (comma separated)</label>
                  <input
                    type="text"
                    value={editData.interests.join(", ")}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        interests: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                      })
                    }
                    className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-rose-500/50"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-slate-300 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-spark"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SETTINGS MODAL */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-slate-900 text-white rounded-3xl border border-white/10 shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">App Settings</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="p-1 rounded-full text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2.5">
                    <Bell className="w-4 h-4 text-rose-400" />
                    <span>Push Notifications</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-rose-500 w-4 h-4 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2.5">
                    <EyeOff className="w-4 h-4 text-purple-400" />
                    <span>Incognito Mode</span>
                  </div>
                  <input type="checkbox" className="accent-rose-500 w-4 h-4 cursor-pointer" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Show Distance in Miles</span>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-rose-500 w-4 h-4 cursor-pointer" />
                </div>
              </div>

              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-rose-500 text-white font-bold text-xs shadow-spark"
              >
                Close Settings
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIP MODAL */}
      <AnimatePresence>
        {isVipModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl border border-amber-400/30 shadow-2xl p-6 space-y-4 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center mx-auto shadow-spark">
                <Crown className="w-8 h-8 fill-current" />
              </div>

              <h3 className="text-xl font-extrabold text-white">SparkMatch VIP Gold</h3>
              <p className="text-xs text-slate-300">
                Unlock unlimited likes, see everyone who liked your profile, get 5 free Super Likes every week, and priority profile boosts!
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" /> <span>Unlimited Swiping & Rewinds</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" /> <span>See Who Liked You First</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" /> <span>5 Free Super Likes Weekly</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4" /> <span>1 Free Boost Every Month</span>
                </div>
              </div>

              <button
                onClick={() => setIsVipModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-black text-sm shadow-spark"
              >
                Claim Demo VIP ($0.00)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
