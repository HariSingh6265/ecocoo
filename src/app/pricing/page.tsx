import React from 'react';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Pro Plans (Starting ₹19) | ResumeATS Pro',
  description: 'Affordable micro-pricing plans for students and job seekers. Pay securely via Google Pay, PhonePe, Paytm, or any UPI app.',
};

export default function PricingPage() {
  return (
    <div className="py-8 space-y-12">
      <PricingSection />
      <FaqSection />
    </div>
  );
}
