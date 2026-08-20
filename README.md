# 🚀 ResumeATS Pro - Production-Ready Resume + ATS Analyzer

A modern, production-grade **Resume + ATS Compatibility Analyzer** web application built with Next.js 14, TypeScript, Tailwind CSS, Prisma ORM, and Supabase PostgreSQL.

---

## ✨ Features

- 📄 **Multi-Format Resume Parsing**: Supports both **PDF** and **DOCX** files with layout and structure extraction.
- 🎯 **Two Analysis Modes**:
  - **Mode 1 (General ATS Scan)**: ATS parsability, formatting audit, action verbs, and core skill density.
  - **Mode 2 (Job Description Match)**: 5-dimension match scoring, matched vs. missing keywords, and biggest skill gaps.
- 📊 **100-Point Algorithmic ATS Scoring**:
  - Formatting & Structure (20 pts)
  - Content Quality & Word Count (20 pts)
  - Keyword Matching & Taxonomy (25 pts)
  - Experience & Impact Metrics (15 pts)
  - Contact Information Completeness (10 pts)
  - ATS Machine Parsability (10 pts)
- ✍️ **AI Bullet-Point Optimizer**: Highlights weak bullets and generates high-impact XYZ formula rewrites (`Accomplished [X] as measured by [Y] by doing [Z]`).
- 💳 **UPI QR Code Payments & Pro Tiers**: Micro-pricing tiers (₹19, ₹49, ₹99) with dynamic QR codes, mobile intent links (GPay, PhonePe, Paytm), and 12-digit UTR tracking.
- 🛡️ **Admin Portal (`/admin/payments`)**: Real-time revenue tracking in ₹ INR and UTR transaction management.
- ☁️ **Cloud Database & Storage**: Supabase PostgreSQL database + optional Supabase Storage bucket for candidate resumes.
- 🔒 **Privacy by Design**: Ephemeral parsing with secure database persistence for registered users.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Database & ORM**: [Prisma](https://www.prisma.io/) + [Supabase PostgreSQL](https://supabase.com/)
- **Parsers**: `pdf-parse`, `mammoth` (DOCX)
- **Auth**: JWT Cookie Authentication with `bcryptjs`
- **Payments**: Native UPI Deep Linking & Dynamic QR Codes

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-ats-analyzer.git
cd resume-ats-analyzer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

### 4. Push database schema
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment on Vercel

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Set **Framework Preset** to `Next.js`.
4. Add the following **Environment Variables** in Vercel Project Settings:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_UPI_ID`
   - `NEXT_PUBLIC_UPI_NAME`
5. Click **Deploy**!

---

## 📄 License
MIT License
