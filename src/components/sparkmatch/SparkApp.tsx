"use client";

import React, { useState, useMemo } from "react";
import { TabType, Profile, MatchItem, FilterState, UserProfileState, ChatMessage } from "@/types/sparkmatch";
import { initialProfiles } from "@/data/mockProfiles";
import { initialMatches } from "@/data/initialMatches";
import SplashScreen from "./SplashScreen";
import DiscoverScreen from "./DiscoverScreen";
import MatchesScreen from "./MatchesScreen";
import ChatScreen from "./ChatScreen";
import ProfileScreen from "./ProfileScreen";
import MatchPopup from "./MatchPopup";
import ProfileDetailModal from "./ProfileDetailModal";
import FilterModal from "./FilterModal";
import BottomNav from "./BottomNav";
import { Smartphone, Monitor, Volume2, VolumeX, Sparkles } from "lucide-react";

// Web Audio tone generator for match & like sounds
function playAudioChime(type: "match" | "like" | "pass" | "superlike") {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (type === "match") {
      // Fanfare chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.6);
      });
    } else if (type === "like") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch (e) {
    // AudioContext not allowed before user gesture
  }
}

export default function SparkApp() {
  // Navigation & View state
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabType>("discover");
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Core Data State
  const [allProfiles, setAllProfiles] = useState<Profile[]>(initialProfiles);
  const [swipedHistory, setSwipedHistory] = useState<{ profile: Profile; action: "like" | "pass" | "superlike" }[]>([]);
  const [matches, setMatches] = useState<MatchItem[]>(initialMatches);
  const [activeChatMatch, setActiveChatMatch] = useState<MatchItem | null>(null);

  // Modals state
  const [newMatchCelebration, setNewMatchCelebration] = useState<Profile | null>(null);
  const [detailModalProfile, setDetailModalProfile] = useState<Profile | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [boostActive, setBoostActive] = useState(false);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    gender: "all",
    ageRange: [20, 35],
    maxDistance: 25,
    selectedInterests: [],
    verifiedOnly: false,
    minCompatibility: 80
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfileState>({
    name: "Alex Morgan",
    age: 26,
    occupation: "Product Designer & Coffee Snob",
    bio: "Passionate about minimalist design, discovering underground jazz bars, and pour-over Ethiopian roast coffee. Always up for spontaneous travel adventures!",
    location: "Brooklyn, NY",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
    ],
    interests: ["Design", "Coffee", "Jazz", "Travel", "Photography"],
    sparksCount: 1420,
    superLikesLeft: 5,
    boostsLeft: 2,
    isVip: true,
    lookingFor: "Long-term connection",
    zodiac: "Taurus ♉",
    height: "5'10\""
  });

  // Filtered candidate profiles deck
  const candidateProfiles = useMemo(() => {
    return allProfiles.filter((p) => {
      // Gender filter
      if (filters.gender !== "all" && p.gender !== filters.gender) return false;
      // Age filter
      if (p.age < filters.ageRange[0] || p.age > filters.ageRange[1]) return false;
      // Distance filter
      if (p.distanceMiles > filters.maxDistance) return false;
      // Compatibility filter
      if (p.compatibilityScore < filters.minCompatibility) return false;
      // Verified only
      if (filters.verifiedOnly && !p.verified) return false;
      return true;
    });
  }, [allProfiles, filters]);

  // SWIPE HANDLERS
  const handleSwipeLike = (profile: Profile, isSuperLike = false) => {
    if (soundEnabled) playAudioChime(isSuperLike ? "superlike" : "like");

    // Remove from candidate pool
    setAllProfiles((prev) => prev.filter((p) => p.id !== profile.id));
    setSwipedHistory((prev) => [...prev, { profile, action: isSuperLike ? "superlike" : "like" }]);

    // Simulated match probability (65% chance or guaranteed for super likes)
    const isMatch = isSuperLike || Math.random() < 0.65;

    if (isMatch) {
      if (soundEnabled) playAudioChime("match");
      setNewMatchCelebration(profile);

      // Add to matches state
      const newMatch: MatchItem = {
        id: `match-${profile.id}`,
        profile,
        lastMessage: isSuperLike ? `Super Liked ${profile.name}! Say hi!` : `You matched with ${profile.name}!`,
        lastMessageTime: "Just now",
        unreadCount: 1,
        matchedAt: "Just now",
        isSuperMatch: isSuperLike,
        messages: [
          {
            id: `msg-${Date.now()}`,
            sender: "match",
            text: isSuperLike
              ? `Hey Alex! Wow thanks for the Super Like! Your profile looks so cool ✨`
              : `Hey Alex! Great to match with you 😊 Loved your profile!`,
            timestamp: "Just now",
            status: "delivered"
          }
        ]
      };

      setMatches((prev) => [newMatch, ...prev]);
    }
  };

  const handleSwipePass = (profile: Profile) => {
    if (soundEnabled) playAudioChime("pass");
    setAllProfiles((prev) => prev.filter((p) => p.id !== profile.id));
    setSwipedHistory((prev) => [...prev, { profile, action: "pass" }]);
  };

  const handleSuperLike = (profile: Profile) => {
    if (userProfile.superLikesLeft > 0) {
      setUserProfile((prev) => ({ ...prev, superLikesLeft: prev.superLikesLeft - 1 }));
      handleSwipeLike(profile, true);
    } else {
      handleSwipeLike(profile, false);
    }
  };

  // REWIND / UNDO LAST SWIPE
  const handleRewind = () => {
    if (swipedHistory.length === 0) return;
    const last = swipedHistory[swipedHistory.length - 1];
    setSwipedHistory((prev) => prev.slice(0, -1));
    setAllProfiles((prev) => [last.profile, ...prev]);
  };

  // TRIGGER BOOST
  const handleTriggerBoost = () => {
    if (boostActive) return;
    setBoostActive(true);
    setUserProfile((prev) => ({ ...prev, boostsLeft: Math.max(0, prev.boostsLeft - 1) }));
    setTimeout(() => setBoostActive(false), 30000);
  };

  // SEND MESSAGE HANDLER
  const handleSendMessage = (matchId: string, text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
      status: "delivered"
    };

    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            lastMessage: text,
            lastMessageTime: "Just now",
            unreadCount: 0,
            messages: [...m.messages, newMessage]
          };
        }
        return m;
      })
    );

    if (activeChatMatch && activeChatMatch.id === matchId) {
      setActiveChatMatch((prev) =>
        prev
          ? {
              ...prev,
              lastMessage: text,
              lastMessageTime: "Just now",
              messages: [...prev.messages, newMessage]
            }
          : null
      );
    }
  };

  // NAVIGATE TO CHAT FROM MATCH CELEBRATION
  const handleOpenChatFromMatch = (profile: Profile) => {
    setNewMatchCelebration(null);
    const existing = matches.find((m) => m.profile.id === profile.id);
    if (existing) {
      setActiveChatMatch(existing);
      setCurrentTab("chat");
    } else {
      const matchObj: MatchItem = {
        id: `match-${profile.id}`,
        profile,
        lastMessage: `You matched with ${profile.name}!`,
        lastMessageTime: "Just now",
        unreadCount: 0,
        matchedAt: "Just now",
        messages: []
      };
      setMatches((prev) => [matchObj, ...prev]);
      setActiveChatMatch(matchObj);
      setCurrentTab("chat");
    }
  };

  // RESET APP STATE
  const handleResetApp = () => {
    setAllProfiles(initialProfiles);
    setSwipedHistory([]);
    setMatches(initialMatches);
    setActiveChatMatch(null);
    setCurrentTab("discover");
    setHasStarted(false);
  };

  // Unread badge calculations
  const totalUnreadMessages = matches.reduce((acc, m) => acc + m.unreadCount, 0);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Demo Bar for Investors / Founders */}
      <header className="w-full max-w-lg mb-2 px-4 py-2 hidden sm:flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-200">SparkMatch Demo Prototype</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-rose-300">
            v2.4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-rose-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span>{soundEnabled ? "Audio On" : "Muted"}</span>
          </button>

          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1 hover:text-white transition-colors"
            title="Toggle Device Mockup Frame"
          >
            {deviceFrameMode ? <Monitor className="w-3.5 h-3.5 text-purple-400" /> : <Smartphone className="w-3.5 h-3.5 text-purple-400" />}
            <span>{deviceFrameMode ? "Full View" : "Phone Frame"}</span>
          </button>
        </div>
      </header>

      {/* Main Container / Mobile Phone Shell */}
      <main
        className={`relative w-full overflow-hidden transition-all duration-300 ${
          deviceFrameMode
            ? "max-w-md h-[844px] rounded-[48px] border-[10px] border-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.8)] ring-1 ring-white/15"
            : "max-w-md min-h-screen sm:min-h-[844px] sm:h-[844px] sm:rounded-3xl border-0 sm:border sm:border-white/10 shadow-2xl"
        } bg-slate-950 flex flex-col`}
      >
        {/* iPhone Dynamic Island Mockup (in Device Frame Mode) */}
        {deviceFrameMode && (
          <div className="relative w-full h-8 flex items-center justify-between px-7 pt-2 select-none z-50">
            <span className="text-[11px] font-bold text-white tracking-tight">9:41</span>
            <div className="w-24 h-4 bg-black rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-[10px] text-white">
              <span>5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-white/60 p-0.5">
                <div className="w-full h-full bg-white rounded-[1px]" />
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col">
          {!hasStarted ? (
            <SplashScreen onStart={() => setHasStarted(true)} />
          ) : (
            <>
              {/* Active Tab Screen */}
              <div className="relative flex-1 w-full h-full overflow-hidden">
                {currentTab === "discover" && (
                  <DiscoverScreen
                    profiles={candidateProfiles}
                    onSwipeLike={handleSwipeLike}
                    onSwipePass={handleSwipePass}
                    onSuperLike={handleSuperLike}
                    onOpenProfileDetail={(p) => setDetailModalProfile(p)}
                    onOpenFilter={() => setIsFilterModalOpen(true)}
                    onRewind={handleRewind}
                    canRewind={swipedHistory.length > 0}
                    boostActive={boostActive}
                    onTriggerBoost={handleTriggerBoost}
                  />
                )}

                {currentTab === "matches" && (
                  <MatchesScreen
                    matches={matches}
                    onSelectMatch={(m) => {
                      setActiveChatMatch(m);
                      setCurrentTab("chat");
                    }}
                    onOpenProfileDetail={(p) => setDetailModalProfile(p)}
                  />
                )}

                {currentTab === "chat" && (
                  activeChatMatch ? (
                    <ChatScreen
                      match={activeChatMatch}
                      onBack={() => {
                        setActiveChatMatch(null);
                        setCurrentTab("matches");
                      }}
                      onSendMessage={handleSendMessage}
                      onOpenProfileDetail={(p) => setDetailModalProfile(p)}
                    />
                  ) : (
                    <MatchesScreen
                      matches={matches}
                      onSelectMatch={(m) => setActiveChatMatch(m)}
                      onOpenProfileDetail={(p) => setDetailModalProfile(p)}
                    />
                  )
                )}

                {currentTab === "profile" && (
                  <ProfileScreen
                    userProfile={userProfile}
                    onUpdateProfile={(updated) => setUserProfile(updated)}
                    onResetApp={handleResetApp}
                  />
                )}
              </div>

              {/* Bottom Navigation (Hidden when inside active chat view) */}
              {!(currentTab === "chat" && activeChatMatch) && (
                <BottomNav
                  currentTab={currentTab}
                  onTabChange={(tab) => {
                    if (tab !== "chat") setActiveChatMatch(null);
                    setCurrentTab(tab);
                  }}
                  unreadMessagesCount={totalUnreadMessages}
                  newMatchesCount={matches.filter((m) => m.unreadCount > 0).length}
                />
              )}
            </>
          )}
        </div>

        {/* POPUP MODALS */}
        <MatchPopup
          matchedProfile={newMatchCelebration}
          userPhoto={userProfile.photos[0]}
          onSendMessage={handleOpenChatFromMatch}
          onKeepSwiping={() => setNewMatchCelebration(null)}
        />

        <ProfileDetailModal
          profile={detailModalProfile}
          onClose={() => setDetailModalProfile(null)}
          onLike={(p) => {
            handleSwipeLike(p);
            setDetailModalProfile(null);
          }}
          onPass={(p) => {
            handleSwipePass(p);
            setDetailModalProfile(null);
          }}
          onSuperLike={(p) => {
            handleSuperLike(p);
            setDetailModalProfile(null);
          }}
        />

        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          filters={filters}
          onApplyFilters={(newFilters) => setFilters(newFilters)}
          onReset={() =>
            setFilters({
              gender: "all",
              ageRange: [18, 38],
              maxDistance: 30,
              selectedInterests: [],
              verifiedOnly: false,
              minCompatibility: 75
            })
          }
        />
      </main>
    </div>
  );
}
