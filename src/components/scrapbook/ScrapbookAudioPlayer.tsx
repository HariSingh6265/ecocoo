"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { ambientSound } from "../../utils/audio";

export const ScrapbookAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (ambientSound) {
        ambientSound.stop();
      }
    };
  }, []);

  const handleToggle = () => {
    if (!ambientSound) return;
    const nextState = ambientSound.toggle();
    setIsPlaying(nextState);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EADBCE] shadow-sm text-xs font-sans">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1.5 text-[#57483B] hover:text-[#8C4A2F] transition-colors focus:outline-none"
        title={isPlaying ? "Mute ambient background sound" : "Play subtle ambient soundscape"}
        aria-label="Toggle ambient soundscape"
      >
        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#8C4A2F] animate-pulse" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
        <span className="font-medium text-[11px] hidden sm:inline">
          {isPlaying ? "Ambient Sound On" : "Sound: Off"}
        </span>
      </button>

      {/* Mini Visualizer bars when playing */}
      {isPlaying && (
        <div className="flex items-center gap-0.5 h-3 pl-1 border-l border-[#EADBCE]">
          <span className="w-0.5 h-2 bg-[#8C4A2F] rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
          <span className="w-0.5 h-3 bg-[#8C4A2F] rounded-full animate-[pulse_1.4s_ease-in-out_infinite]" />
          <span className="w-0.5 h-1.5 bg-[#8C4A2F] rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
        </div>
      )}
    </div>
  );
};
