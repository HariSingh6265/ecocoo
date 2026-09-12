"use client";

import React from "react";

interface PostageStampProps {
  date?: string;
  location?: string;
  label?: string;
  color?: "terracotta" | "navy" | "sage" | "amber";
  className?: string;
}

export const PostageStamp: React.FC<PostageStampProps> = ({
  date = "15.09",
  location = "ARCHIVE",
  label = "FRIENDSHIP DISPATCH",
  color = "terracotta",
  className = "",
}) => {
  const colorSchemes = {
    terracotta: "border-[#C25E3B]/40 bg-[#FAF4EE] text-[#8C3D21]",
    navy: "border-[#2C3E50]/40 bg-[#F2F5F8] text-[#1E293B]",
    sage: "border-[#5B7A68]/40 bg-[#F1F6F3] text-[#344E41]",
    amber: "border-[#B45309]/40 bg-[#FEF9EE] text-[#78350F]",
  };

  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2.5 border-2 border-dashed rounded-sm select-none ${colorSchemes[color]} ${className}`}
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <div className="text-[9px] uppercase tracking-widest font-mono opacity-75 font-semibold">
        {label}
      </div>
      <div className="text-sm font-serif font-bold tracking-tight my-0.5">
        {date}
      </div>
      <div className="text-[8px] uppercase tracking-wider font-mono opacity-70">
        {location}
      </div>
    </div>
  );
};
