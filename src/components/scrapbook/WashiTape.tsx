"use client";

import React from "react";

interface WashiTapeProps {
  className?: string;
  variant?: "parchment" | "terracotta" | "sage" | "neutral";
  tilt?: number; // e.g. -2, 3
  width?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  className = "",
  variant = "parchment",
  tilt = -1.5,
  width = "w-28",
}) => {
  const variantStyles = {
    parchment: "bg-[#EFE6D8]/80 border-y border-[#DFCDB7]/60 text-[#7A6C58]",
    terracotta: "bg-[#E8C5B8]/80 border-y border-[#D6A998]/60 text-[#8C4A2F]",
    sage: "bg-[#D8E6DC]/80 border-y border-[#BCCFC2]/60 text-[#455E50]",
    neutral: "bg-stone-200/80 border-y border-stone-300/60 text-stone-600",
  };

  return (
    <div
      style={{ transform: `rotate(${tilt}deg)` }}
      className={`h-5 ${width} ${variantStyles[variant]} shadow-sm backdrop-blur-[1px] relative overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Subtle serrated paper edge simulation */}
      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-black/5 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-l from-black/5 to-transparent" />
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />
    </div>
  );
};
