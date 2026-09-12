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
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center my-4">
          <WashiTape width="w-32" tilt={1} variant="parchment" />
        </div>

        {/* Section 01: Origins in Class 10 & Telegram */}
        <TelegramOriginSection />

        {/* Section 02: The Cyber Police Era */}
        <CyberPoliceSection />

        {/* Section 03: The Perspective Shift & Understanding */}
        <FirstMisunderstandingSection />

        {/* Section 04: Somehow We Kept Talking */}
        <KeptTalkingSection />

        {/* Section 05: No Video Call Ever */}
        <NoVideoCallSection />

        {/* Section 06: The "Aap" Problem */}
        <AapProblemSection />

        {/* Section 07: The Gap & Resuming Without Awkwardness */}
        <TheGapSection />

        {/* Section 08: The Terrace Late Night Sky */}
        <TerraceSection />

        {/* Section 09: The 2–3 Hour Calls */}
        <LongCallsSection />

        {/* Section 10: We Used to Talk All Day */}
        <AllDaySharingSection />

        {/* Section 11: The 89% Board Exam Incident */}
        <ResultsComparisonSection />

        {/* Section 12: Birthday Edits, Shayari & Poems Vault */}
        <BirthdayEditsVaultSection />

        {/* Section 13: The Friendship That Remembered */}
        <UnbrokenFriendshipSection />

        {/* Section 14: The September 15 Pune Incident */}
        <PuneIncidentSection />

        {/* Section 15: The Classified Memory Easter Egg */}
        <ClassifiedMemorySection />

        {/* Section 16: Things You Don't Realize About Yourself */}
        <PersonalitySection />

        {/* Section 17: You Support Me Too */}
        <MutualSupportSection />

        {/* Section 18: Family & Roops Shared Birthday */}
        <FamilyNoteSection />

        {/* Section 19: The Emotional Birthday Reveal & Climax */}
        <FinalMessageSection />
      </main>

      {/* Floating customize guide modal */}
      <CustomizerHelperModal />

      {/* Footer */}
      <footer className="py-12 border-t border-[#EADBCE] text-center text-xs text-[#7A6C58] bg-[#FAF7F2]">
        <div className="max-w-md mx-auto space-y-2 px-4">
          <p className="font-serif italic text-sm text-[#443F3A]">
            "Some people remain important anyway."
          </p>
          <p className="font-mono text-[11px] text-stone-400">
            A Handcrafted Scrapbook for Monica • 15 September
          </p>
        </div>
      </footer>
    </div>
  );
};
