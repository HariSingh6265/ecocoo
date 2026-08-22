# 🌿 EcoCommute — Complete Project & Architecture Chat Backup

**Project Name:** EcoCommute  
**Problem ID:** IHSA5 — Sustainable Transportation & Corporate ESG  
**Date:** August 22, 2026  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, MongoDB / In-Memory Mock Store, Recharts, Lucide Icons, viaSocket Automation Engine, Google Maps API Integration.

---

## 1. Initial Master Specification & Requirements Summary

### Domain Overview
1. **B2C Product**: Individual sustainable commute recommendation across Public Bus/BRTS, Solo Cab, Personal Vehicle, Carpool, Cycling, and Walking. Deterministic scoring with explanation reason, carbon avoidance calculations, Eco Score (0-100), Green Points, and live trip completion.
2. **B2B Corporate Product**: Corporate mobility management for organizations (e.g. GreenTech Solutions). Company registration, commute policy enforcement, monthly reward budget, employee directory, live ESG analytics, workforce leaderboard, and employee daily journey planner.
3. **viaSocket Automation Layer**: Decoupled enterprise automation service supporting events (`commute.completed`, `employee.registered`, `reward.earned`, `carpool.matched`, `weekly.report.generated`). Works in dual-mode (sends live HTTP POST when enabled, logs locally when disabled).
4. **Indore Demo Preset Data**: Seeded landmarks across Indore (*Vijay Nagar, Palasia, Rajwada, Bhawarkua, Rau, AB Road, Airport, MR 10, Sapna Sangeeta, TI Mall*).

---

## 2. Expanded Multi-Role Authentication & Google Maps Specification

### A. Role-Based Access Control (RBAC)
* **B2C User / Commuter**: Account-level profile, multimodal route comparison, carpool rider matching, personal commute history, impact metrics.
* **B2B Employee**: Corporate-scoped identity (`companyId`, `employeeCode`), shift schedules, daily commute selector, corporate carpool network, company green leaderboard rank.
* **B2B Company Manager / Admin**: Tenant-scoped oversight, employee directory management, ESG analytics, rewards and bonus distribution, viaSocket webhook configuration, audit logs.
* **Carpool Driver**: Ride creation, seat capacity, mutual check-in initiation, route completion.

### B. Google Maps Live Route Integration
* Real-time routing from browser `navigator.geolocation.watchPosition` to destination.
* Server-side route proxy endpoint to protect Google Maps API secrets.
* High-accuracy vector fallback map when geolocation is denied or offline.

---

## 3. Implemented Routes & Endpoints

### Frontend Pages
* `/` — Landing page with dual B2C and B2B showcase
* `/login` — Unified authentication portal with 1-click demo logins
* `/register` — Individual commuter registration
* `/dashboard` — B2C personal dashboard
* `/plan` — Multimodal commute planner with priority profiles
* `/results` — Recommendation engine results, savings comparison, and route visualization
* `/trip/[id]` — Live commute tracking, simulated delay, and trip completion
* `/history` — Historical commute ledger
* `/impact` — Carbon avoidance & tree-equivalency charts
* `/profile` — Commuter credentials and default engine preferences
* `/employee/dashboard` — Employee daily commute portal
* `/company/register` — Corporate policy & organization onboarding
* `/company/login` — Corporate admin portal
* `/company/dashboard` — Enterprise sustainability command center
* `/company/employees` — Employee directory with registration modal
* `/company/analytics` — ESG carbon reduction trend analytics
* `/company/rewards` — Rewards ledger & bonus distribution
* `/company/integrations` — viaSocket webhook automation hub

### Backend REST API Endpoints
* `POST /api/auth/login` — Authenticates B2C, B2B Admin, or Employee with JWT cookie
* `POST /api/auth/register` — Onboards user or organization
* `GET /api/auth/me` — Returns authenticated identity
* `POST /api/auth/logout` — Clears authentication cookie
* `POST /api/commute/plan` — Deterministic multimodal recommendation engine
* `GET /api/trips` & `POST /api/trips` — Trip management and Green Points rewards
* `GET /api/trips/[id]` & `PATCH /api/trips/[id]` — Active trip tracking and completion
* `GET /api/dashboard` — B2C analytics summary
* `GET /api/company/dashboard` — B2B corporate analytics summary
* `GET /api/company/employees` & `POST /api/company/employees` — Corporate employee directory
* `GET /api/company/rewards` & `POST /api/company/rewards` — Corporate rewards ledger
* `GET /api/company/integrations` & `POST /api/company/integrations` — viaSocket status & webhook dispatcher

---

## 4. Verification & Build Status
* `npm run build` generates 28 static/dynamic routes with **0 errors**.
* Resilient in-memory database fallback active in [`src/lib/db/mongodb.ts`](file:///c:/Users/singh/Downloads/antigravityproject/src/lib/db/mongodb.ts).
