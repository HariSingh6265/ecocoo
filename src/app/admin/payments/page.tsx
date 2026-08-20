'use client';

import React, { useEffect, useState } from 'react';
import { IndianRupee, QrCode, Search, CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw, User } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

interface PaymentRecord {
  id: string;
  userId: string | null;
  planId: string;
  planName: string;
  amount: number;
  upiRefId: string;
  payerName: string | null;
  payerEmail: string;
  payerPhone: string | null;
  status: string;
  createdAt: string;
  user?: { id: string; name: string; email: string } | null;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [stats, setStats] = useState({ totalPayments: 0, totalRevenueINR: 0, approvedCount: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadPayments = () => {
    setIsLoading(true);
    fetch('/api/payments')
      .then((res) => res.json())
      .then((data) => {
        setPayments(data.payments || []);
        if (data.stats) setStats(data.stats);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const filtered = payments.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.upiRefId.toLowerCase().includes(term) ||
      p.payerEmail.toLowerCase().includes(term) ||
      (p.payerName && p.payerName.toLowerCase().includes(term)) ||
      p.planName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-7 h-7 text-indigo-600" />
              UPI Payments & Subscriptions
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Admin Portal
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track incoming UPI transactions, verified UTR reference numbers, and active pro users
          </p>
        </div>

        <button
          onClick={loadPayments}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-2 rounded-xl hover:bg-slate-50 transition"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh Transactions
        </button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Revenue
          </span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            ₹{stats.totalRevenueINR} <span className="text-xs text-slate-400 font-normal">INR</span>
          </p>
          <span className="text-[11px] text-slate-400">From verified UPI payments</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Transactions
          </span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {stats.totalPayments}
          </p>
          <span className="text-[11px] text-slate-400">{stats.approvedCount} Active subscribers</span>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Average Order Value
          </span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            ₹{stats.totalPayments > 0 ? Math.round(stats.totalRevenueINR / stats.totalPayments) : 0}
          </p>
          <span className="text-[11px] text-slate-400">Plans: ₹19 / ₹49 / ₹99</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by 12-digit UTR, email, or customer name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 font-bold border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Plan & Amount</th>
                <th className="p-4">UPI UTR / Ref ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 italic">
                    {searchTerm ? 'No payments match your search query.' : 'No UPI payments recorded yet.'}
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {item.payerName || 'Anonymous Candidate'}
                      </div>
                      <div className="text-[11px] text-slate-500">{item.payerEmail}</div>
                      {item.payerPhone && (
                        <div className="text-[10px] text-slate-400">{item.payerPhone}</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {item.planName}
                      </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                        ₹{item.amount} INR
                      </span>
                    </td>
                    <td className="p-4">
                      <code className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        {item.upiRefId}
                      </code>
                    </td>
                    <td className="p-4 text-slate-500 whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
