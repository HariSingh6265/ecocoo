"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Video, FileText, Sparkles, ZoomIn, X, Copy, Check, Play } from "lucide-react";
import { WashiTape } from "./WashiTape";

interface PolaroidFrameProps {
  title: string;
  subtitle?: string;
  placeholderLabel: string;
  note?: string;
  type?: "photo" | "video" | "edit" | "poem" | "shayari" | "telegram";
  src?: string;
  rotation?: number;
  aspectRatio?: "square" | "portrait" | "landscape" | "polaroid";
  className?: string;
}

export const PolaroidFrame: React.FC<PolaroidFrameProps> = ({
  title,
  subtitle,
  placeholderLabel,
  note,
  type = "photo",
  src,
  rotation = 0,
  aspectRatio = "polaroid",
  className = "",
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isVideoFile = Boolean(
    src && (
      src.toLowerCase().endsWith(".mp4") || 
      src.toLowerCase().endsWith(".webm") || 
      src.toLowerCase().endsWith(".mov") || 
      src.toLowerCase().endsWith(".m4v")
    )
  );

  const getIcon = () => {
    switch (type) {
      case "video":
      case "edit":
        return <Video className="w-8 h-8 text-[#8C4A2F]" />;
      case "poem":
      case "shayari":
        return <FileText className="w-8 h-8 text-[#5B7A68]" />;
      default:
        return <ImageIcon className="w-8 h-8 text-[#6B635B]" />;
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[4/5]";
      case "landscape":
        return "aspect-[16/10]";
      case "polaroid":
      default:
        return "aspect-[4/4.2]";
    }
  };

  const handleCopyTag = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(placeholderLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div
        style={{ transform: `rotate(${rotation}deg)` }}
        className={`relative inline-block transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] hover:z-20 ${className}`}
      >
        {/* Top Washi Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <WashiTape
            width="w-24"
            tilt={rotation > 0 ? -1 : 1.5}
            variant={type === "poem" || type === "shayari" ? "sage" : "terracotta"}
          />
        </div>

        {/* Polaroid Card Base */}
        <div className="polaroid-card bg-white p-3.5 sm:p-4 rounded-sm border border-[#EADBCE] w-full max-w-sm">
          {/* Media Window */}
          <div
            onClick={() => setIsZoomed(true)}
            className={`w-full ${getAspectClass()} bg-[#FAF6F0] rounded-[2px] border border-[#E5DACD] flex flex-col items-center justify-center p-2 relative overflow-hidden group cursor-pointer`}
          >
            {src && !hasError ? (
              isVideoFile ? (
                // Real Video
                <div className="w-full h-full relative flex items-center justify-center bg-stone-900 rounded-[2px] overflow-hidden">
                  <video
                    src={src}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    onError={() => setHasError(true)}
                    className="w-full h-full object-cover rounded-[2px]"
                  />
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    <div className="p-2.5 rounded-full bg-white/90 text-[#8C4A2F] shadow-md transform group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-[#8C4A2F]" />
                    </div>
                  </div>
                </div>
              ) : (
                // Real Image
                <img
                  src={src}
                  alt={title}
                  onError={() => setHasError(true)}
                  className="w-full h-full object-cover rounded-[2px]"
                />
              )
            ) : (
              // Aesthetic Placeholder
              <div className="text-center flex flex-col items-center justify-center space-y-2.5 p-3">
                <div className="p-3 bg-white/80 rounded-full shadow-sm border border-[#EADBCE] group-hover:scale-110 transition-transform">
                  {getIcon()}
                </div>
                <div className="font-mono text-xs font-semibold tracking-wider text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
                  {placeholderLabel}
                </div>
                <p className="text-[11px] text-[#7A6C58] max-w-[200px] leading-relaxed">
                  Click to inspect preview
                </p>
              </div>
            )}

            {/* Hover preview badge */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-stone-800 flex items-center gap-1 shadow-sm">
                <ZoomIn className="w-3.5 h-3.5" /> Preview
              </span>
            </div>
          </div>

          {/* Caption Area */}
          <div className="pt-3 pb-1 text-center">
            <h4 className="font-serif text-base font-semibold text-[#2C2926] tracking-tight">
              {title}
            </h4>
            {subtitle && (
              <p className="font-handwriting text-sm text-[#8C4A2F] -mt-0.5">
                {subtitle}
              </p>
            )}
            {note && (
              <p className="text-[11px] text-[#6B635B] mt-1.5 leading-snug font-sans px-1">
                {note}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Inspect Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="bg-[#FAF7F2] border border-[#EADBCE] rounded-lg max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Memory Vault Item
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2C2926] mb-1">
              {title}
            </h3>
            {subtitle && (
              <p className="font-handwriting text-base text-[#8C4A2F] mb-4">
                {subtitle}
              </p>
            )}

            {/* If real media exists, show media player / image */}
            {src && !hasError ? (
              <div className="my-4 rounded border border-[#EADBCE] overflow-hidden bg-black flex items-center justify-center">
                {isVideoFile ? (
                  <video
                    src={src}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[380px] object-contain"
                  />
                ) : (
                  <img
                    src={src}
                    alt={title}
                    className="w-full max-h-[380px] object-contain bg-[#FAF7F2]"
                  />
                )}
              </div>
            ) : (
              <div className="bg-white p-4 rounded border border-[#EADBCE] my-4 text-center">
                <div className="font-mono text-sm font-bold text-[#8C3D21] bg-[#FBECE7] p-2.5 rounded border border-[#F3D5CA] mb-2 flex items-center justify-between">
                  <span>{placeholderLabel}</span>
                  <button
                    onClick={handleCopyTag}
                    className="text-xs bg-white px-2 py-1 rounded border border-[#EADBCE] text-stone-700 hover:bg-stone-50 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy Tag"}
                  </button>
                </div>
                <p className="text-xs text-stone-500 text-left leading-relaxed">
                  <strong>How to replace:</strong> Put your file in <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">public/photos/</code> or <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">public/videos/</code>, then open <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">src/data/storyData.ts</code> and set <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[11px]">src: '/photos/your_file.jpg'</code>.
                </p>
              </div>
            )}

            {note && (
              <p className="text-sm text-[#57483B] leading-relaxed italic bg-[#F5EFEB] p-3 rounded border-l-2 border-[#8C4A2F]">
                "{note}"
              </p>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsZoomed(false)}
                className="px-4 py-1.5 bg-[#2C2926] text-white text-xs font-medium rounded hover:bg-stone-800 transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
