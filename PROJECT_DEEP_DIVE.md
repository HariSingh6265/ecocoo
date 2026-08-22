# 🌿 EcoCommute: Comprehensive Deep-Dive & Architecture Documentation

> **Problem ID: IHSA5 — Sustainable Urban Mobility & Corporate ESG**  
> **Application:** EcoCommute (Full-Stack Monolith)  
> **Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Native MongoDB 6.3, Google Maps Platform, viaSocket Automation  

---

## 📑 Table of Contents
1. [Ideation & Problem Framing](#1-ideation--problem-framing)
2. [Mathematical Models & Algorithmic Engines](#2-mathematical-models--algorithmic-engines)
3. [Full-Stack System Architecture](#3-full-stack-system-architecture)
4. [Database Schema & Security Engineering](#4-database-schema--security-engineering)
5. [Step-by-Step User Journeys (B2C & B2B)](#5-step-by-step-user-journeys-b2c--b2b)
6. [Presentation & Pitch Script](#6-presentation--pitch-script)
7. [Deployment & Production Setup](#7-deployment--production-setup)

---

## 🎯 1. Ideation & Problem Framing

### The Real-World Problem
- **Individual Commuters (B2C)**: High solo cab and fuel expenses, unpredictable congestion delays, zero incentives for taking green transport.
- **Corporate Employers (B2B)**: Strict Scope 3 ESG decarbonization requirements, zero real-time visibility into workforce daily commute footprints, high parking real estate costs.

### The Strategic Solution: Dual-Product Loop
```
       ┌─────────────────────────────────────────────────────────────┐
       │                   THE REAL-WORLD PROBLEM                    │
       ├──────────────────────────────┬──────────────────────────────┤
       │     Individual Commuters     │      Corporate Employers     │
       ├──────────────────────────────┼──────────────────────────────┤
       │ • High solo cab & fuel costs │ • Scope 3 ESG targets        │
       │ • Traffic congestion delays  │ • Zero employee commute data │
       │ • No incentives to go green  │ • High parking infrastructure│
       └──────────────────────────────┴──────────────────────────────┘
                                      │
                                      ▼
       ┌─────────────────────────────────────────────────────────────┐
       │                 THE ECOCOMMUTE SOLUTION                     │
       │  B2C (Smart Recommender)  +  B2B (ESG & Rewards Engine)     │
       └─────────────────────────────────────────────────────────────┘
```

1. **B2C (Commuter Product)**: Provides an instant smart mobility recommender that ranks Public Bus (BRTS), Carpool, Solo Cab, Cycling, and Walking based on real cost (₹), travel time, and carbon savings.
2. **B2B (Enterprise Product)**: Gives HR and ESG managers a unified analytics dashboard tracking employee commute adoption, carpool rates, and verifiable Scope 3 carbon avoidance.
3. **viaSocket Automation Layer**: Decoupled webhook integration that automatically notifies Slack channels or updates HR reward portals upon commute completion without blocking core application logic.

---

## 🧮 2. Mathematical Models & Algorithmic Engines

### A. Distance & Routing Engine
- **Haversine Formula**: Calculates great-circle distance between two latitude/longitude coordinates:
  $$d = 2R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta\text{lng}}{2}\right)}\right)$$
- **Road Multiplier ($1.35\times$)**: Converts straight-line geographical distance to real road path distance.
- **Google Directions API Integration**: Queries real-time traffic duration (`departure_time=now`) with an in-memory TTL cache (5-minute expiry) to minimize API billing costs.

### B. Carbon Emission Calculator ($\text{kg CO}_2 / \text{km}$)
Mode-specific emission factors based on Indian urban transit standards:
- **Solo Cab (Petrol/Diesel)**: $0.180\text{ kg CO}_2/\text{km}$ *(Baseline)*
- **Personal Car**: $0.160\text{ kg CO}_2/\text{km}$
- **Carpool (Shared 3-4 riders)**: $0.045\text{ kg CO}_2/\text{km}$
- **Public Transit (BRTS Bus)**: $0.035\text{ kg CO}_2/\text{km}$
- **Cycling & Walking**: $0.000\text{ kg CO}_2/\text{km}$

$$\text{CO}_2\text{ Saved} = \text{Baseline Solo Cab Emission} - \text{Chosen Mode Emission}$$

### C. Fare & Pricing Engine (Indore Transit Baselines)
- **Public Bus (BRTS)**: $\text{Base ₹10} + ₹1.5/\text{km}$
- **Solo Cab**: $\text{Base ₹50} + ₹16.0/\text{km}$
- **Carpool**: $\text{Base ₹20} + ₹4.5/\text{km}$
- **Bicycle / Walking**: $₹0$

$$\text{Money Saved} = \text{Solo Cab Fare} - \text{Chosen Mode Fare}$$

### D. Eco Score Algorithm ($0 \text{ to } 100$)
Evaluates sustainability based on mode efficiency, distance, and vehicle occupancy:
$$\text{EcoScore} = \text{Clamp}_{10}^{100}\left(100 - (\text{EmissionFactor} \times 350) + (\text{OccupancyBonus} \times 15)\right)$$

### E. Multi-Criteria Scoring & Ranking Engine
Uses **Min-Max Normalization** to score all available modes across 5 weighted dimensions:
$$\text{Score} = w_{\text{cost}} \cdot N_{\text{cost}} + w_{\text{co2}} \cdot N_{\text{co2}} + w_{\text{time}} \cdot N_{\text{time}} + w_{\text{dist}} \cdot N_{\text{dist}} + w_{\text{occ}} \cdot N_{\text{occ}}$$

#### Weight Profiles:
- **Balanced**: Cost 35%, $\text{CO}_2$ 30%, Time 20%, Distance 10%, Occupancy 5%
- **Cost-Saver**: Cost 55%, $\text{CO}_2$ 20%, Time 15%, Distance 10%
- **Eco-Warrior**: $\text{CO}_2$ 55%, Cost 20%, Time 15%, Occupancy 10%
- **Fastest**: Time 55%, Cost 20%, $\text{CO}_2$ 15%, Distance 10%

---

## 🏗️ 3. Full-Stack System Architecture

```
                               ┌───────────────────────────┐
                               │   Next.js 14 App Router   │
                               │  (React 18 + TailwindCSS) │
                               └─────────────┬─────────────┘
                                             │
                      ┌──────────────────────┴──────────────────────┐
                      ▼                                             ▼
        ┌───────────────────────────┐                 ┌───────────────────────────┐
        │       Client Pages        │                 │      Server API Routes    │
        │ • / (Auth Gateway)        │                 │ • /api/auth/*             │
        │ • /plan & /results        │                 │ • /api/commute/plan       │
        │ • /trip/[id] (Live Trip)  │                 │ • /api/company/*          │
        │ • /company/dashboard      │                 │ • /api/trips              │
        │ • /dev/db (Explorer)      │                 │ • /api/health & /ready    │
        └───────────────────────────┘                 └─────────────┬─────────────┘
                                                                    │
                 ┌──────────────────────────────────────────────────┼─────────────────────────────────┐
                 ▼                                                  ▼                                 ▼
   ┌───────────────────────────┐                      ┌───────────────────────────┐     ┌───────────────────────────┐
   │    Google Maps Engine     │                      │    Native MongoDB 6.3     │     │    viaSocket Webhooks     │
   │ • Directions API (traffic)│                      │ • MongoDB Atlas Cloud     │     │ • Decoupled HR & Slack    │
   │ • In-Memory TTL Cache     │                      │ • Zero-Mock Pure DB Ops   │     │ • Async Event Delivery    │
   │ • Deep Link Handoff       │                      │ • Password Redaction      │     │ • Fail-Safe Local Log     │
   └───────────────────────────┘                      └───────────────────────────┘     └───────────────────────────┘
```

### Architectural Highlights:
1. **Modular Monolith**: Single repository for frontend UI and serverless backend API eliminates microservice orchestration complexity and network hops.
2. **Native MongoDB Driver**: Avoids Mongoose model re-compilation bugs across Next.js serverless invocations and hot-reloads while maintaining full Zod and TypeScript safety.
3. **Resilient Google Routing**: Attempts live Google Directions API calls first; automatically falls back to mathematical coordinate formulas if API keys or network are unavailable.
4. **Universal Turn-by-Turn Deep Link**: Hands off route navigation to native Google Maps on Android and iOS:
   ```text
   https://www.google.com/maps/dir/?api=1&origin=<from>&destination=<to>&travelmode=<mode>
   ```

---

## 🔒 4. Database Schema & Security Engineering

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│    users    │◄──────┤    trips     │──────►│   rewards    │
└──────┬──────┘       └──────────────┘       └──────────────┘
       │                      ▲
       │ 1-to-Many            │
       ▼                      │
┌─────────────┐       ┌───────┴──────┐       ┌──────────────────┐
│  companies  │◄──────┤  employees   │       │ automationEvents │
└─────────────┘       └──────────────┘       └──────────────────┘
```

### MongoDB Collections Breakdown:
| Collection | Purpose | Key Fields |
| :--- | :--- | :--- |
| **`users`** | Commuters & Admins | `_id`, `name`, `email`, `password` (bcrypt), `role`, `greenPoints`, `totalCO2Saved`, `totalMoneySaved` |
| **`trips`** | Logged Commutes | `_id`, `userId`, `from`, `to`, `mode`, `distanceKm`, `cost`, `co2Saved`, `moneySaved`, `ecoScore`, `status` |
| **`companies`** | Corporate Workplaces | `_id`, `name`, `email`, `monthlyBudget`, `commutePolicy`, `workingHours`, `transportOptions` |
| **`employees`** | Staff Profiles | `_id`, `companyId`, `employeeCode`, `name`, `homeLocation`, `officeLocation`, `shiftTimes`, `activeCarpoolDriver` |
| **`rewards`** | Incentive Grants | `_id`, `companyId`, `employeeId`, `points`, `amount`, `reason`, `status`, `date` |
| **`automationEvents`** | Webhook Logs | `_id`, `eventId`, `eventType`, `status` (*delivered/logged*), `payload`, `statusCode`, `responseMessage` |
| **`auditLogs`** | Security Audit Trail | `_id`, `eventType`, `userId`, `origin`, `destination`, `mode`, `timestamp` |

### Security Measures:
- **Stateless JWT in `httpOnly` Cookies**: Prevents XSS token theft.
- **Zero Password Exposure**: All developer API queries enforce `{ projection: { password: 0 } }`.
- **Role-Based Access Control**: Strict segregation between `user` (B2C), `employee` (B2B staff), and `company` (Corporate Admin).

---

## 🚶‍♂️ 5. Step-by-Step User Journeys (B2C & B2B)

### A. Individual Commuter Journey (B2C)
1. **Welcome & Sign In (`/`)**: 1-click login as Demo Commuter or Sign Up.
2. **Plan Commute (`/plan`)**: Choose start & end point in Indore (e.g. *Vijay Nagar* to *Rajwada*), set priority (*Balanced*).
3. **Compare Results (`/results`)**: See Recommended Transit (Bus/BRTS), savings breakdown (Save ₹155, avoid 1.21 kg $\text{CO}_2$), and matched Carpool driver (*Rahul Verma, 2 seats*).
4. **Live Ride & Navigation (`/trip/[id]`)**: Click *"Open in Google Maps"* for turn-by-turn navigation; track live route progress.
5. **Trip Completion (`/trip/[id]`)**: Claim Green Points, update personal Eco Score.
6. **Impact Analytics (`/dashboard`, `/impact`)**: View weekly and monthly charts of money and carbon saved.

### B. Corporate Employer Journey (B2B)
1. **Company Registration (`/company/register`)**: Onboard enterprise, configure commute policy, and allocate reward budget.
2. **Employee Directory (`/company/employees`)**: Add employees with shifts, home locations, and carpool preferences.
3. **ESG Dashboard (`/company/dashboard`)**: View real-time Scope 3 carbon reduction, carpool rates, and employee leaderboards.
4. **Automations & Webhooks (`/company/integrations`)**: Monitor viaSocket event dispatches for automated Slack kudos and HR rewards.

---

## 🎤 6. Presentation & Pitch Script

### Summary Cue Card
- **Problem (30s)**: High solo car emissions & cost; corporate Scope 3 ESG blindness.
- **Solution (45s)**: EcoCommute dual-product platform (B2C Smart Recommender + B2B Corporate ESG Portal).
- **Live Demo (2 mins)**: Plan route -> Compare modes & savings -> Turn-by-turn handoff -> Trip completed & Green Points -> Corporate ESG dashboard.
- **Tech Stack (30s)**: Next.js 14, MongoDB Atlas Cloud, Google Maps Directions API, viaSocket webhooks, Dockerized.

---

## 🚀 7. Deployment & Production Setup

### Environment Variables (`.env`)
```env
MONGODB_URI="mongodb+srv://admin:Hari6265@cluster0.vre7yov.mongodb.net/ecocommute?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="ecocommute-jwt-secret-prod-2026"
NEXT_PUBLIC_APP_URL="https://ecocommute.vercel.app"
NEXT_PUBLIC_DEMO_MODE="true"
NEXT_PUBLIC_GOOGLE_MAPS_KEY=""
```

### Database Seeding Command
```powershell
npm run seed
```

### Local Dev Server
```powershell
npm run dev
# Open http://localhost:3000
```

### Health Check Endpoints
- **Liveness**: `GET /api/health` → `{"status":"ok"}`
- **Readiness**: `GET /api/ready` → `{"status":"ready","database":"connected"}`
- **Developer DB Explorer**: `GET /dev/db`
