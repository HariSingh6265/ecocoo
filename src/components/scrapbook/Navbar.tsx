"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, ChevronRight, X, Sparkles, Feather } from "lucide-react";
import { STORY_CHAPTERS } from "../../data/storyData";
import { ScrapbookAudioPlayer } from "./ScrapbookAudioPlayer";

export const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top scroll progress track */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-stone-200/50 z-50">
        <div
          className="h-full bg-[#8C4A2F] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-3 inset-x-0 max-w-5xl mx-auto px-4 z-40 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Brand/Journal Badge */}
          <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#EADBCE] shadow-sm">
            <Feather className="w-3.5 h-3.5 text-[#8C4A2F]" />
            <span className="font-serif font-bold text-xs tracking-tight text-[#2C2926]">
              A Friendship Journal
            </span>
            <span className="text-[10px] font-mono text-[#8C4A2F] bg-[#FBECE7] px-1.5 py-0.5 rounded border border-[#F3D5CA]">
              15.09
            </span>
          </div>

          {/* Right controls: Audio & Chapters Menu */}
          <div className="flex items-center gap-2">
            <ScrapbookAudioPlayer />

            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-1.5 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EADBCE] shadow-sm text-xs text-[#57483B] hover:text-[#8C4A2F] transition-colors"
              aria-label="Open chapters index"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-medium hidden sm:inline">Memories Index</span>
            </button>
          </div>
        </div>
      </header>

      {/* Chapters Index Drawer Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] w-full max-w-sm h-full shadow-2xl p-6 overflow-y-auto border-l border-[#EADBCE] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EADBCE] mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#8C4A2F]" />
                  <h3 className="font-serif font-bold text-lg text-[#2C2926]">
                    Chapters & Memories
                  </h3>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#7A6C58] mb-4 font-sans leading-relaxed">
                A chronicle of our friendship from Class 10 to today. Tap any memory to jump to it.
              </p>

              <div className="space-y-1.5">
                {STORY_CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => scrollToSection(ch.id)}
                    className="w-full text-left p-2.5 rounded-md hover:bg-white border border-transparent hover:border-[#EADBCE] transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#8C4A2F] font-bold">
                          {ch.number}
                        </span>
                        <span className="font-serif text-sm font-semibold text-[#2C2926] group-hover:text-[#8C4A2F] transition-colors">
                          {ch.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A6C58] pl-6 font-sans">
                        {ch.subtitle}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#8C4A2F] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EADBCE] text-center">
              <p className="font-handwriting text-sm text-[#8C4A2F]">
                "Some people remain important anyway."
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
