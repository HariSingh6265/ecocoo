"use client";

import React from "react";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { TelegramOriginSection } from "./TelegramOriginSection";
import { CyberPoliceSection } from "./CyberPoliceSection";
import { FirstMisunderstandingSection } from "./FirstMisunderstandingSection";
import { KeptTalkingSection } from "./KeptTalkingSection";
import { NoVideoCallSection } from "./NoVideoCallSection";
import { AapProblemSection } from "./AapProblemSection";
import { TheGapSection } from "./TheGapSection";
import { TerraceSection } from "./TerraceSection";
import { LongCallsSection } from "./LongCallsSection";
import { AllDaySharingSection } from "./AllDaySharingSection";
import { ResultsComparisonSection } from "./ResultsComparisonSection";
import { BirthdayEditsVaultSection } from "./BirthdayEditsVaultSection";
import { UnbrokenFriendshipSection } from "./UnbrokenFriendshipSection";
import { PuneIncidentSection } from "./PuneIncidentSection";
import { ClassifiedMemorySection } from "./ClassifiedMemorySection";
import { PersonalitySection } from "./PersonalitySection";
import { MutualSupportSection } from "./MutualSupportSection";
import { FamilyNoteSection } from "./FamilyNoteSection";
import { FinalMessageSection } from "./FinalMessageSection";
import { CustomizerHelperModal } from "./CustomizerHelperModal";
import { WashiTape } from "./WashiTape";

export const ScrapbookContainer: React.FC = () => {
  return (
    <div className="relative min-h-screen paper-texture font-sans text-[#2C2926]">
      {/* Floating navigation and audio controls */}
      <Navbar />

      <main className="relative z-10">
        {/* Section 00: Mysterious Prologue */}
        <HeroSection />

        {/* Subtle decorative divider */}
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center my-6">
          <WashiTape width="w-32" tilt={1} variant="parchment" />
        </div>

        {/* Chapter 01: Origins in Class 10 & Telegram */}
        <TelegramOriginSection />

        {/* Chapter 02: The Cyber Police Era */}
        <CyberPoliceSection />

        {/* Chapter 03: The Perspective Shift & Understanding */}
        <FirstMisunderstandingSection />

        {/* Chapter 04: The One Thing We Never Did (Zero Video Calls) */}
        <NoVideoCallSection />

        {/* Chapter 05: The "Aap" Problem */}
        <AapProblemSection />

        {/* Chapter 06: The Gap & Resuming Without Awkwardness */}
        <TheGapSection />

        {/* Chapter 07: The Terrace Late Night Sky */}
        <TerraceSection />

        {/* Chapter 08: The 2–3 Hour Calls Disappearing */}
        <LongCallsSection />

        {/* Transition: Somehow We Kept Talking */}
        <KeptTalkingSection />

        {/* Chapter 09: We Used to Talk All Day / What Should I Do? */}
        <AllDaySharingSection />

        {/* Chapter 10: The 89% Board Exam Incident */}
        <ResultsComparisonSection />

        {/* Chapter 11: Creative Archive (Edits, Shayari & Poems) */}
        <BirthdayEditsVaultSection />

        {/* Chapter 12: The Friendship That Remembered */}
        <UnbrokenFriendshipSection />

        {/* Chapter 13: The September 15 Pune Incident */}
        <PuneIncidentSection />

        {/* Chapter 14: The Classified Memory Easter Egg */}
        <ClassifiedMemorySection />

        {/* Chapter 15: Things You Don't Realize About Yourself */}
        <PersonalitySection />

        {/* Chapter 16: You Support Me Too */}
        <MutualSupportSection />

        {/* Chapter 17: Family & Roops Shared Birthday */}
        <FamilyNoteSection />

        {/* Chapter 18: The Emotional Birthday Reveal & Climax */}
        <FinalMessageSection />
      </main>

      {/* Floating customize guide modal */}
      <CustomizerHelperModal />

      {/* Footer */}
      <footer className="py-16 border-t border-[#EADBCE] text-center text-xs text-[#7A6C58] bg-[#FAF7F2]">
        <div className="max-w-md mx-auto space-y-3 px-4">
          <p className="font-serif italic text-base text-[#443F3A]">
            "Some people remain important anyway."
          </p>
          <p className="font-mono text-xs text-[#8C4A2F] font-semibold">
            A Handcrafted Scrapbook for Monaco • 15 September
          </p>
          <p className="font-handwriting text-sm text-stone-500">
            Aap hi rahenge. 😂
          </p>
        </div>
      </footer>
    </div>
  );
};
