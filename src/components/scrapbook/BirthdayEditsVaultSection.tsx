"use client";

import React from "react";
import { PostageStamp } from "./PostageStamp";
import { PolaroidFrame } from "./PolaroidFrame";
import { MEDIA_VAULT_ITEMS } from "../../data/storyData";

export const BirthdayEditsVaultSection: React.FC = () => {
  return (
    <section
      id="media-vault"
      className="py-24 sm:py-32 px-4 sm:px-6 relative max-w-5xl mx-auto"
    >
      {/* Chapter Marker */}
      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-xs font-bold text-[#8C4A2F] bg-[#FBECE7] px-2.5 py-1 rounded border border-[#F3D5CA]">
          CHAPTER 11
        </span>
        <div className="h-px bg-[#EADBCE] flex-1" />
        <PostageStamp date="ANNUAL VAULT" label="CREATIVE GIFTS" color="terracotta" />
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
        <p className="font-handwriting text-2xl sm:text-3xl text-[#8C4A2F]">
          The Next Edition of Our Tradition
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#2C2926] leading-tight">
          Videos, Edits, Shayari & Poems.
        </h2>
        <p className="font-sans text-sm sm:text-base text-[#6B635B] leading-relaxed">
          Har saal Monaco ke liye birthday edits aur shayari banana ek sacred ritual ban chuka tha. Aapne meri poems padhi aur bola tha ki yeh best hain aur aur likha karo.
        </p>
        <div className="inline-block bg-[#FAF4EC] px-4 py-2 rounded border border-[#EADBCE] font-serif italic text-xs sm:text-sm text-[#443F3A]">
          "Toh iss saal, sirf ek normal video edit ke bajaye... I made this whole digital place for us."
        </div>
      </div>

      {/* Grid of Film Strip / Polaroid Placeholders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-6 justify-items-center pt-4">
        {MEDIA_VAULT_ITEMS.map((item) => (
          <PolaroidFrame
            key={item.id}
            title={item.title}
            subtitle={item.subtitle}
            placeholderLabel={item.placeholderLabel}
            note={item.note}
            type={item.type}
            src={item.src}
            rotation={item.rotation || 0}
            aspectRatio={item.aspectRatio || "polaroid"}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-[#7A6C58] font-sans">
          💡 <em>All cards above are ready for real photos, poems, and edits whenever you want to drop them in!</em>
        </p>
      </div>
    </section>
  );
};
