'use client';

import React, { useState } from 'react';
import { PRICING_PLANS, PricingPlan, generateUpiUri, generateQrCodeUrl, DEFAULT_UPI_CONFIG } from '@/lib/upi';
import { X, Check, Copy, QrCode, Smartphone, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface UpiPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: string;
  onSuccess?: () => void;
}

export function UpiPaymentModal({
  isOpen,
  onClose,
  defaultPlanId = 'PRO_49',
  onSuccess,
}: UpiPaymentModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [upiRefId, setUpiRefId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const upiUri = generateUpiUri({
    amount: selectedPlan.price,
    transactionNote: `ResumeATS_${selectedPlan.name.replace(/\s+/g, '_')}`,
  });

  const qrCodeUrl = generateQrCodeUrl(upiUri);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(DEFAULT_UPI_CONFIG.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiRefId || upiRefId.trim().length < 8) {
      setError('Please enter a valid 12-digit UPI Reference Number / Transaction ID (UTR).');
      return;
    }

    if (!payerEmail || !payerEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          upiRefId: upiRefId.trim(),
          payerName: payerName.trim(),
          payerEmail: payerEmail.trim(),
          payerPhone: payerPhone.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to verify payment.');
      }

      setIsSuccess(true);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Payment submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Unlock Pro ATS Features
              </h3>
              <p className="text-xs text-slate-500">
                Instant activation via any UPI app (GPay, PhonePe, Paytm, BHIM)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Payment Verified & Pro Unlocked!
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you! Your <strong>{selectedPlan.name}</strong> plan is now active. All premium features, unlimited AI rewrites, and PDF downloads are unlocked.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition"
            >
              Continue to Application
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Step 1: Select Plan */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Select Your Plan
              </label>
              <div className="grid grid-cols-3 gap-3">
                {PRICING_PLANS.map((plan) => {
                  const isSelected = plan.id === selectedPlanId;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      {plan.badge && (
                        <span className="absolute -top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-600 text-white uppercase">
                          {plan.badge}
                        </span>
                      )}
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {plan.name}
                      </p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                          ₹{plan.price}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          /{plan.period.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scan QR & Pay */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-indigo-600" />
                  2. Scan UPI QR Code to Pay ₹{selectedPlan.price}
                </label>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Amount: ₹{selectedPlan.price} INR
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* QR Code */}
                <div className="p-2 rounded-2xl bg-white shadow-sm border border-slate-200 flex-shrink-0">
                  <img
                    src={qrCodeUrl}
                    alt="UPI QR Code"
                    className="w-40 h-40 object-contain rounded-xl"
                  />
                </div>

                {/* Details & Copy */}
                <div className="space-y-3 min-w-0 flex-1 text-center sm:text-left text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Payee UPI ID:</span>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-0.5">
                      <code className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded text-xs">
                        {DEFAULT_UPI_CONFIG.upiId}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 flex items-center gap-1 text-[11px]"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        {copiedUpi ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500">
                    Works with <strong>Google Pay, PhonePe, Paytm, Amazon Pay, BHIM</strong>, and all banking UPI apps.
                  </p>

                  {/* Mobile Direct Intent Link */}
                  <a
                    href={upiUri}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
                  >
                    <Smartphone className="w-4 h-4" />
                    Pay via UPI App Directly
                  </a>
                </div>
              </div>
            </div>

            {/* Step 3: Enter 12-Digit UTR Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>3. Enter 12-Digit UPI Transaction ID / UTR Number <span className="text-rose-500">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">Found in your payment receipt</span>
                </label>
                <input
                  type="text"
                  required
                  value={upiRefId}
                  onChange={(e) => setUpiRefId(e.target.value)}
                  placeholder="e.g. 423910847291 or Ref No."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Your Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={payerEmail}
                    onChange={(e) => setPayerEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Candidate Name"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 transition shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Submit UTR & Activate {selectedPlan.name} (₹{selectedPlan.price})
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Secure Payment · Instant Feature Activation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
