'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, ArrowRight, QrCode } from 'lucide-react';
import { PRICING_PLANS } from '@/lib/upi';
import { UpiPaymentModal } from '@/components/payment/UpiPaymentModal';

export function PricingSection() {
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Micro-Pricing for Students & Job Seekers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Simple, Affordable Plans (Starting at ₹19)
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Free core ATS scoring for everyone. Unlock AI rewrites, PDF reports, and ATS templates via UPI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.recommended;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  isFeatured
                    ? 'bg-gradient-to-b from-indigo-900 to-slate-900 text-white border-2 border-indigo-500 shadow-xl scale-[1.02]'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-900 dark:text-white'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 right-6 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isFeatured ? 'text-indigo-300' : 'text-indigo-600'
                      }`}
                    >
                      {plan.name}
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-4xl font-extrabold tracking-tight">
                        ₹{plan.price}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isFeatured ? 'text-indigo-200' : 'text-slate-500'
                        }`}
                      >
                        /{plan.period}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        isFeatured ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      {plan.description}
                    </p>
                  </div>

                  <ul
                    className={`space-y-3 text-xs ${
                      isFeatured ? 'text-indigo-100' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                            isFeatured ? 'text-emerald-400' : 'text-emerald-500'
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanForPayment(plan.id)}
                    className={`w-full py-3.5 rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 ${
                      isFeatured
                        ? 'text-slate-900 bg-white hover:bg-indigo-50'
                        : 'text-white bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    Pay ₹{plan.price} via UPI QR
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      <UpiPaymentModal
        isOpen={Boolean(selectedPlanForPayment)}
        onClose={() => setSelectedPlanForPayment(null)}
        defaultPlanId={selectedPlanForPayment || 'PRO_49'}
      />
    </section>
  );
}
