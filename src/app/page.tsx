import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { DashboardPreview } from '@/components/landing/DashboardPreview';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { BeforeAfterComparison } from '@/components/landing/BeforeAfterComparison';
import { AtsExplainer } from '@/components/landing/AtsExplainer';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { Testimonials } from '@/components/landing/Testimonials';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <DashboardPreview />
      <HowItWorks />
      <BeforeAfterComparison />
      <AtsExplainer />
      <FeaturesGrid />
      <Testimonials />
      <PricingSection />
      <FaqSection />
    </div>
  );
}
