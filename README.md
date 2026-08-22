# 🌿 EcoCommute — Intelligent Sustainable Transit Platform

> **Problem ID: IHSA5 — Sustainable Transportation**  
> Complete dual-product mobility platform for individual commuters (B2C) and corporate ESG workforce mobility management (B2B) with optional viaSocket automation layer.

---

## 🌟 Overview & Two Products

### 1. B2C — Individual Smart Commuter Recommender
* **Multimodal Evaluation**: Compares Public Bus / BRTS, Solo Cab, Personal Vehicle, Carpool, Cycling, and Walking.
* **Deterministic & Explainable Engine**: Scores routes across Cost (₹), Travel Time (min), Distance (km), CO₂ Emissions (kg), and Occupancy.
* **Transparent Recommendation Reason**: Clearly explains savings ("You save ₹155 and approximately 1.21 kg CO₂ compared with a solo cab").
* **Carpool Matching**: Matches riders with compatible departure times, origin-destination pairs, and seats.
* **Interactive Vector Route Map**: Visualizes waypoints, transit corridors, and live transit delay simulations.
* **Green Credits & Impact Dashboard**: Awards Green Points per clean commute and tracks cumulative tree-equivalency impact.

### 2. B2B — Corporate Commute & ESG Workforce Management
* **Company Registration & Policy Configuration**: Commute policy, monthly bonus budget, supported transport modes, reward rules, and best employee criteria.
* **One-Time Employee Onboarding**: Shift schedules, home-to-office locations, and commute preferences.
* **Corporate Executive Dashboard**:
  - Total Employees & Today's Trips
  - Monthly CO₂ Avoided & Corporate Cost Savings
  - Carpool Adoption Rate (%) & Public Transit Usage (%)
  - Weekly & Monthly Sustainability Trend Charts (Recharts)
  - Top Green Commuters Leaderboard
* **Corporate Rewards & Budget Disbursal**: Distribute cash bonuses and recognition points.
* **viaSocket Enterprise Automation Layer**:
  - Optional, decoupled automation layer (`VIASOCKET_ENABLED=true/false`).
  - Supported webhook events: `commute.completed`, `employee.registered`, `weekly.report.generated`, `reward.earned`, `carpool.matched`.
  - Live Automation Log & status viewer.

---

## 🚀 Tech Stack

* **Frontend & Backend**: Next.js 14 (App Router) + TypeScript
* **Styling**: Tailwind CSS + shadcn/ui components + Lucide Icons
* **Data Visualization**: Recharts (LineChart, AreaChart, PieChart, BarChart)
* **Validation**: Zod schema parsing
* **Database & Dual-Mode Store**: MongoDB Atlas + Built-in In-Memory Mock Store (zero external dependencies required for 100% demo uptime)
* **Automation**: viaSocket Webhooks & REST Event Dispatcher
* **Deployment**: Optimized for Vercel

---

## 🎯 Demo Mode & Indore Presets

The application includes `DEMO_MODE=true` by default with seeded data for Indore:
* **Key Locations**: Vijay Nagar, Palasia, Rajwada, Bhawarkua, Rau, AB Road, Devi Ahilya Bai Holkar Airport, MR 10, Sapna Sangeeta, TI Mall.
* **Demo Credentials (1-Click Login available on `/login`)**:
  - **B2C Commuter**: `demo@ecocommute.in` / `demo1234`
  - **B2B Corporate Admin**: `admin@greentech.in` / `company1234`
  - **Employee**: `rahul@greentech.in` / `employee1234`

---

## 🗺️ Application Sitemap & Routes

### B2C Commuter Flow
* `/` — Landing Page with dual B2C/B2B showcase
* `/login` — Unified authentication portal with 1-click demo logins
* `/register` — Individual commuter onboarding
* `/dashboard` — Commuter impact metrics, Green Points, and recent journeys
* `/plan` — Multimodal commute planner with optimization priority profiles
* `/results` — Best option recommendation, explanation reason, carpool match, and vector map
* `/trip/[id]` — Live commute tracking, simulated delay, and trip completion
* `/history` — Historical commutes filtered by Today, Week, Month, All Time
* `/impact` — Carbon avoidance analytics and environmental equivalence
* `/profile` — Commuter credentials and default engine preferences

### B2B Corporate Flow
* `/company/register` — Corporate registration and commute policy onboarding
* `/company/login` — Corporate portal authentication
* `/company/dashboard` — Enterprise sustainability command center, trends, and leaderboard
* `/company/employees` — Employee directory with one-time registration modal
* `/company/analytics` — Deep-dive ESG carbon reduction reports
* `/company/rewards` — Monthly budget tracking and reward disbursement
* `/company/integrations` — viaSocket webhook automation hub and event logs

---

## 🔌 viaSocket Architecture

```text
EcoCommute (Core Logic: Recommendation, CO2, Eco Score)
   │
   ▼
Backend Event Bus (sendViaSocketEvent)
   │
   ├── [VIASOCKET_ENABLED=true] ──▶ viaSocket Webhook ──▶ HR Sheet / Slack / ERP
   │
   └── [VIASOCKET_ENABLED=false] ─▶ Stored in Automation Log (zero crashes)
```

Core calculations NEVER depend on viaSocket. viaSocket provides enterprise-grade extensibility.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
# MongoDB (Optional — app falls back to in-memory store automatically)
MONGODB_URI="mongodb://localhost:27017/ecocommute"

# JWT Secret
JWT_SECRET="ecocommute-jwt-secret-2026"

# Demo Mode
NEXT_PUBLIC_DEMO_MODE="true"

# viaSocket (Optional)
VIASOCKET_ENABLED="false"
VIASOCKET_WEBHOOK_URL=""
VIASOCKET_API_KEY=""
```

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Test production build
npm run build
```

---

## 🏆 Acceptance Test Journey

1. **B2C**:
   - Go to `/plan` → Select **Vijay Nagar** to **Rajwada**.
   - Select priority **Balanced** → Click **Find Best Option**.
   - Review recommended Public Bus with savings banner (`"You save ₹155 and approximately 1.21 kg CO2 compared with a solo cab"`).
   - Review compatible carpool with **Rahul Verma** (2 seats, ₹60).
   - Click **Start & Complete This Commute** → View trip completion and Green Points award.
   - Check `/history` and `/impact`.

2. **B2B**:
   - Go to `/company/dashboard` → Inspect corporate sustainability metrics, weekly trends, mode split, and leaderboard.
   - Go to `/company/employees` → Click **Register New Employee** → Register a new teammate.
   - Go to `/company/integrations` → View viaSocket connection status, dispatch test webhook event, and verify recent automation event log.
