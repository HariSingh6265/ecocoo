"use client";

import React, { useState } from "react";
import { Sliders, X, FileCode, Sparkles, Check, Copy } from "lucide-react";

export const CustomizerHelperModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  const handleCopyPath = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("src/data/storyData.ts");
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2000);
    }
  };

  return (
    <>
      {/* Floating subtle trigger at bottom left */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white/80 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-full border border-[#EADBCE] shadow-md text-xs font-mono text-stone-600 hover:text-[#8C4A2F] transition-all flex items-center gap-1.5"
          title="How to replace placeholders & customize"
        >
          <Sliders className="w-3.5 h-3.5 text-[#8C4A2F]" />
          <span className="hidden sm:inline">Customize / Media Guide</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#FAF7F2] border border-[#EADBCE] rounded-xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-200/80 hover:bg-stone-300 text-stone-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8C4A2F] uppercase tracking-wider mb-2">
              <FileCode className="w-4 h-4" /> Creator Guide & Replacement Instructions
            </div>

            <h3 className="font-serif text-xl font-bold text-[#2C2926] mb-3">
              How to Add Real Photos & Custom Text
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-[#57483B] font-sans">
              <p>
                All content in this website is neatly decoupled from code and located inside a single file:
              </p>

              <div className="bg-white p-3 rounded border border-[#EADBCE] flex items-center justify-between font-mono text-xs">
                <span className="text-[#8C3D21] font-semibold">src/data/storyData.ts</span>
                <button
                  onClick={handleCopyPath}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-300 text-[11px] flex items-center gap-1"
                >
                  {copiedPath ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  {copiedPath ? "Copied" : "Copy Path"}
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2926]">1. To add real photos / edits:</h4>
                <p className="text-stone-600 text-xs">
                  Place your image file in <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">/public/photos/my_edit.jpg</code>, then in <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">src/data/storyData.ts</code>, update the item with <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">src: '/photos/my_edit.jpg'</code>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2926]">2. To add your own audio file:</h4>
                <p className="text-stone-600 text-xs">
                  The site already features an ambient acoustic tone generator with zero external files. If you have a favorite MP3 song, place it in <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">/public/audio.mp3</code>.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#2C2926]">3. Easy Vercel Deployment:</h4>
                <p className="text-stone-600 text-xs">
                  You can deploy this Next.js project directly to Vercel with 1 click: <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px]">vercel</code> or push to your GitHub repo.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EADBCE] flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#2C2926] text-white text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
