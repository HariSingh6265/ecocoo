export interface PricingPlan {
  id: string;
  name: string;
  price: number; // in INR
  period: string;
  badge?: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'STARTER_19',
    name: 'Starter Scan',
    price: 19,
    period: 'one-time',
    description: 'Perfect for a quick single-resume ATS audit before an urgent application.',
    features: [
      '1 Full 100-Point ATS Analysis',
      'Downloadable PDF Report',
      '5 AI Bullet-Point Rewrites',
      'Missing Keywords Checklist',
      'Format & Layout Risk Audit',
    ],
  },
  {
    id: 'PRO_49',
    name: 'Job Match Pro',
    price: 49,
    period: 'per month',
    badge: 'Most Popular',
    recommended: true,
    description: 'Ideal for active job seekers targeting specific companies and roles.',
    features: [
      '5 Resume + Job Description Matches',
      'Unlimited AI Bullet-Point Rewrites',
      'Deep Keyword Gap Analysis',
      '2 ATS-Optimized Resume Templates (Word & LaTeX)',
      'Actionable XYZ Improvement Roadmap',
      'Save & Compare Previous Reports',
    ],
  },
  {
    id: 'UNLIMITED_99',
    name: 'Career Unlimited',
    price: 99,
    period: 'for 3 months',
    badge: 'Best Value',
    description: 'Complete career toolkit with unlimited scans, all templates, and LinkedIn audit.',
    features: [
      'Unlimited Resume & Job Analyses for 90 Days',
      'All 5 Premium ATS Resume Templates',
      'Unlimited AI Bullet Rewriter & Optimizer',
      'LinkedIn Profile & Headline Audit',
      'Multiple Job Comparison Matrix',
      'Priority Support',
    ],
  },
];

export const DEFAULT_UPI_CONFIG = {
  upiId: process.env.NEXT_PUBLIC_UPI_ID || 'paytmqr2810050501011@paytm',
  payeeName: process.env.NEXT_PUBLIC_UPI_NAME || 'ResumeATS Pro',
};

export function generateUpiUri(options: {
  upiId?: string;
  payeeName?: string;
  amount: number;
  transactionNote?: string;
}): string {
  const upiId = options.upiId || DEFAULT_UPI_CONFIG.upiId;
  const payeeName = options.payeeName || DEFAULT_UPI_CONFIG.payeeName;
  const note = options.transactionNote || `ResumeATS_${options.amount}_Plan`;

  return `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${options.amount}&cu=INR&tn=${encodeURIComponent(note)}`;
}

export function generateQrCodeUrl(upiUri: string): string {
  // Uses standard SVG/PNG QR Code generator
  return `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    upiUri
  )}&margin=10`;
}
