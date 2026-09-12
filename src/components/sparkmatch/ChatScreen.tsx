"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Send,
  Sparkles,
  Smile,
  Mic,
  Image as ImageIcon,
  CheckCheck,
  Flame,
  CheckCircle2,
  Heart
} from "lucide-react";
import { MatchItem, Profile, ChatMessage } from "@/types/sparkmatch";

interface ChatScreenProps {
  match: MatchItem;
  onBack: () => void;
  onSendMessage: (matchId: string, text: string) => void;
  onOpenProfileDetail: (profile: Profile) => void;
}

export default function ChatScreen({
  match,
  onBack,
  onSendMessage,
  onOpenProfileDetail
}: ChatScreenProps) {
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [callNotice, setCallNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [match.messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const messageText = inputText.trim();
    setInputText("");
    onSendMessage(match.id, messageText);

    // Simulate smart playful auto-reply
    setIsTyping(true);
    setTimeout(() => {
      const firstInterest = match.profile.interests && match.profile.interests.length > 0 ? match.profile.interests[0] : "coffee";
      const contextualReplies = [
        `Haha I completely agree! That's actually why I love #${firstInterest} so much 😄`,
        `You have the best energy! Tell me more about that 😊`,
        `Oh 100%! We should totally grab a drink and talk about that in person soon 🍸`,
        `That just made my day haha! What else do you have planned this week? ✨`,
        `You're definitely making a strong case for best conversationalist on this app 😉`
      ];
      const randomReply = contextualReplies[Math.floor(Math.random() * contextualReplies.length)];
      onSendMessage(match.id, randomReply);
    }, 1600);
  };

  const icebreakers = [
    `Ask about their love for #${match.profile.interests[0] || "Coffee"} ☕`,
    "Play 'Two Truths & a Lie' 🎲",
    "What is your go-to weekend spot? ✨",
    "Best travel mishap story? ✈️"
  ];

  const triggerCallNotice = (type: "Audio" | "Video") => {
    setCallNotice(`${type} Call with ${match.profile.name.split(" ")[0]} ringing... (Demo Feature)`);
    setTimeout(() => setCallNotice(null), 3000);
  };

  return (
    <div className="relative h-full flex flex-col bg-slate-950 text-white overflow-hidden select-none">
      {/* Call Banner / Notification */}
      <AnimatePresence>
        {callNotice && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-16 left-4 right-4 z-40 p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold text-center shadow-spark flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>{callNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between p-3.5 bg-slate-900/90 backdrop-blur-md border-b border-white/10 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar & Online status */}
          <div
            onClick={() => onOpenProfileDetail(match.profile)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-rose-500/50 group-hover:ring-rose-500 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={match.profile.photos[0]}
                  alt={match.profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {match.profile.activeNow && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1">
                <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors truncate max-w-[130px]">
                  {match.profile.name}
                </h3>
                {match.profile.verified && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
                )}
              </div>
              <div className="text-[11px] text-rose-300/80 font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 fill-rose-400 text-rose-400" />
                <span>{match.profile.compatibilityScore}% Match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 text-slate-300">
          <button
            onClick={() => triggerCallNotice("Audio")}
            className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => triggerCallNotice("Video")}
            className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            title="Video Date"
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => onOpenProfileDetail(match.profile)}
            className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            title="Profile Info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 hide-scrollbar">
        {/* Match Header Badge */}
        <div className="text-center py-4 space-y-2">
          <div className="inline-flex items-center gap-2 p-2 px-3.5 rounded-full bg-white/5 border border-white/10 text-xs text-rose-200">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>You matched with {match.profile.name} • {match.matchedAt}</span>
          </div>
        </div>

        {/* Messages */}
        {match.messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[78%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? "bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white rounded-br-none shadow-spark"
                    : "bg-white/10 backdrop-blur-md text-slate-100 rounded-bl-none border border-white/10 shadow-md"
                }`}
              >
                <p>{msg.text}</p>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                <span>{msg.timestamp}</span>
                {isUser && <CheckCheck className="w-3.5 h-3.5 text-rose-400" />}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 text-slate-300 rounded-bl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Icebreakers */}
      <div className="p-2 bg-slate-950/80 border-t border-white/5">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
          {icebreakers.map((prompt, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(prompt.replace(/^[^\w]+|[^\w]+$/g, ""));
              }}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-rose-200 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 bg-slate-900 border-t border-white/10 pb-4">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={`Message ${match.profile.name.split(" ")[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500/50 transition-colors"
          />

          {inputText.trim() ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="submit"
              className="p-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-spark hover:opacity-95 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          ) : (
            <button
              type="button"
              className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
