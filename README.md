# FairShift — Fair Work. Clear Pay. Safer Workplaces.
### SRM PromptWars 2026 | UN Sustainable Development Goal 8: Decent Work & Economic Growth
**Author:** Madhan Kumar T  
**Repository:** [Madhan310301/SRMEvent_MadhanKumarT](https://github.com/Madhan310301/SRMEvent_MadhanKumarT)  
**Demo URL:** `http://localhost:5173/` (Localhost)  

---

## 📌 Executive Summary

**FairShift** is a comprehensive, multilingual, offline-first workforce fairness and workplace safety platform engineered specifically for labor-intensive and multi-tier organizations. Built in direct alignment with **United Nations Sustainable Development Goal 8 (Decent Work and Economic Growth)**, FairShift bridges the transparency gap between frontline workers, contractors, site supervisors, and enterprise owners.

The platform directly serves two major sectors:
1. **Mega-Construction Projects** (e.g., Kaveri Infrastructure & Metro Rail Site 4)
2. **Colleges & Higher Education Institutions** (e.g., SRM Institute of Science & Technology Campus Facilities)

FairShift combines **Grovemade-inspired editorial aesthetics** (warm off-white canvas `#FAFAF8`, refined Cormorant Garamond typography, evergreen accents `#286B58`, high-contrast cards, and zero fragile external image dependencies) with **deep engineering resilience** (IndexedDB offline sync, Web Speech API audio for low-literacy workers, Zero-PII anonymous whistleblower grievance tracking, and the 60fps **MorphOrb** AI workforce discovery assistant).

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **pnpm**: v9+ (or `npm`)

### 2. Local Setup & Execution
```bash
# Clone the repository
git clone https://github.com/Madhan310301/SRMEvent_MadhanKumarT.git
cd SRMEvent_MadhanKumarT

# Install dependencies
pnpm install

# Run unit test suite (18/18 automated tests passing)
pnpm test

# Build for production
pnpm run build

# Start the high-performance development server
pnpm dev --host
```

Open your browser to:
👉 **`http://localhost:5173/`**

---

## 👥 The 6-Persona Evaluation Suite

FairShift features a **one-click Persona Switcher** embedded directly in the top header. You can seamlessly evaluate the platform from every vantage point without manually logging out or managing passwords:

### 🏗️ Sector A: Mega-Construction (Kaveri Infrastructure)
| Persona | Name | Role | Primary Features to Test |
| :--- | :--- | :--- | :--- |
| **Owner** | **Rajesh Kaveri** | Managing Director & Enterprise Owner | Executive ESG dashboard, compliance overview, wage escrow verification, multi-site workforce audit. |
| **Employer** | **Ramesh Sundaram** | Head Safety Officer & Site Director | Daily shift attendance, overtime calculation approval, safety hazard triage, MorphOrb natural-language worker search. |
| **Employee** | **Murugan K.** | Senior Tower Crane Operator | QR Shift Clock-In, itemized payslip with **Audio TTS**, photo/voice hazard reporting, portable Skill Passport. |

### 🎓 Sector B: Higher Education Campus (SRM Institute of Science & Technology)
| Persona | Name | Role | Primary Features to Test |
| :--- | :--- | :--- | :--- |
| **Owner** | **Dr. P. Sathyanarayanan** | Pro-Chancellor & Institution Owner | Campus-wide labor standards compliance, contractor safety audits, institutional ethics score. |
| **Employer** | **Dr. Arun Kumar** | Director of Campus Infrastructure | Facilities & sanitation scheduling, hazard mitigation lifecycle, contractor SLA verification. |
| **Employee** | **Lakshmi S.** | Facilities & Sanitation Lead | Full **Tamil localized UI** (`ta`), biometric/QR attendance simulator, anonymous grievance token system. |

---

## 🧭 Step-by-Step Evaluator Demo Guide

Follow these walkthrough scenarios to experience FairShift's complete feature set:

### Scenario 1: Natural-Language Workforce Discovery with MorphOrb
1. Click the top-bar persona dropdown and select **Ramesh Sundaram (Employer / Site Lead)**.
2. Navigate to **Workforce Directory** (`/employer/workers`).
3. Notice the **MorphOrb** assistant at the top: an interactive, 3D particle sphere rendered via pure HTML5 Canvas at 60fps (Float32Array buffer, dynamically tiered particle density for battery saving on mobile).
4. Try typing natural language queries in the search box (or press `/` or `Ctrl+K`):
   - Type: `crane operators with overtime`
   - Or click any of the preset quick chips: *"Overtime > 10h"*, *"Safety Certified"*, *"Night Shift"*, *"Pending Hazards"*.
   - Try regional terms: *`overtime > 10 மணிநேரம்`* (Tamil) or *`overtime > 10 घंटे`* (Hindi).
5. Watch the deterministic zero-SQL engine parse your intent into verified badge filters without PII leakage, filtering the workforce table instantly. Toggle between **Table** and **Card** views.

---

### Scenario 2: Transparent Pay Breakdown & Audio TTS (SDG 8.5)
1. In the top header, switch persona to **Murugan K. (Employee / Crane Lead)**.
2. Navigate to **My Payslips** (`/worker/payslips`).
3. Open the latest payslip. Note the exact, unbundled breakdown:
   - **Base Rate**: ₹850/shift × 26 days = ₹22,100
   - **Overtime Pay**: 18.5 hours calculated transparently at **2.0× statutory multiplier** (Factories Act 1948 compliant) = ₹3,931
   - **Safety & Attendance Bonus**: +₹1,500
   - **Statutory Deductions**: PF (12%) & ESI (0.75%) clearly itemized with zero mysterious withholding.
4. Click the **"Listen to Pay Breakdown"** button: FairShift activates the browser's Web Speech API to synthesize audio in the worker's selected language, ensuring complete transparency for low-literacy workers.

---

### Scenario 3: Multimedia Voice & Photo Hazard Reporting (SDG 8.8)
1. Remaining as **Murugan K.**, navigate to **Hazard Reports** (`/worker/hazards`).
2. Click **Report a Hazard**:
   - Choose a hazard category (e.g., *Electrical*, *Falling Objects*, *Scaffolding*, *Fatigue/Heat Stress*).
   - Set the risk level (*Critical*, *High*, *Medium*, *Low*).
   - Record an audio voice memo using the native **MediaRecorder** button (supports quick reporting directly from scaffolding).
   - Attach a site photo.
3. Submit the report. Switch personas to **Ramesh Sundaram (Site Director)**:
   - Go to **Safety & Hazards** (`/employer/hazards`).
   - Notice the newly filed hazard tagged with timestamp and severity. Ramesh can acknowledge, assign a technician, and resolve it with an audit trail.

---

### Scenario 4: Zero-PII Anonymous Whistleblower System ("Speak Up")
1. Under **Murugan K.**, navigate to **Speak Up / Feedback** (`/worker/feedback`).
2. Submit an anonymous grievance regarding unsafe working conditions or unfair treatment.
3. **Privacy by Design Guarantee**:
   - The application does NOT record email, user ID, IP address, or device fingerprint.
   - Upon submission, FairShift generates a cryptographically unique 12-character alphanumeric **Secret Tracking Token** (e.g., `FS-8842-X9Q1`).
4. Copy the token. Log out or open an incognito window, navigate to `/feedback/track`, enter the token, and view the status and management responses privately without revealing your identity.

---

### Scenario 5: Tamper-Evident Portable Skill Passport
1. As an employee, navigate to **Skill Passport** (`/worker/passport`).
2. View verified credentials:
   - *Tower Crane Operations Grade-A* (Verified by Kaveri Infra)
   - *Fall Protection & Harness Safety* (Verified by National Safety Council)
   - *First Aid & CPR Certification*
3. Each certification features a cryptographically signed QR verification token. When workers migrate to new contractors or construction sites, their verified credentials accompany them, eliminating exploitation and uncertified high-risk assignments.

---

### Scenario 6: Multi-Lingual Regional Support
1. In the top navigation bar, click the **Language Selector** (`EN`).
2. Switch to any of the 8 supported Indian languages:
   - **Tamil** (`தமிழ்`)
   - **Hindi** (`हिन्दी`)
   - **Telugu** (`తెలుగు`)
   - **Kannada** (`ಕನ್ನಡ`)
   - **Malayalam** (`മലയാളം`)
   - **Marathi** (`मराठी`)
   - **Bengali** (`বাংলা`)
   - **English** (`en`)
3. The interface re-renders instantly with culturally accurate terminology and regional typography.

---

## 🎨 Architectural & Design Highlights

### 1. Grovemade-Inspired Editorial Aesthetics
- **Canvas**: Warm off-white (`#FAFAF8`) eliminating harsh fluorescent blue-light strain.
- **Typography**: Cormorant Garamond serif headings paired with clean, accessible DM Sans body and tabular numbers for financial figures.
- **Color Discipline**: Deep forest evergreen (`#286B58`) primary accent, warm amber alerts (`#D97706`), and restrained neutral borders (`#E8E8E5`).
- **Resilience**: Zero external unauthenticated CDN image links; all illustrations and status badges are rendered via embedded SVGs and native CSS.

### 2. High-Performance Particle Engine (MorphOrb)
- Fibonacci sphere distribution with 3D spherical projection ($X, Y, Z \rightarrow X', Y'$).
- Uses typed `Float32Array` buffers to eliminate JavaScript garbage collection stutters.
- Dynamically scales particle count based on `navigator.hardwareConcurrency` (80 particles on dual-core low-end smartphones, 200 on workstations).
- Automatically pauses during browser tab inactivity via `document.visibilityState` to preserve battery.

### 3. Offline-First PWA & Storage Architecture
- Built-in **Dexie / IndexedDB** local cache stores attendance logs, hazard drafts, and recent payslips.
- Background Outbox automatically replays and syncs pending submissions when internet connectivity is restored.
- Full Progressive Web App manifest (`manifest.webmanifest`) and Service Worker registration.

---

## 🧪 Automated Test Suite

FairShift includes comprehensive unit tests verifying statutory calculation accuracy, overtime multipliers, and workforce search parsing:

```bash
pnpm test
```

**Output:**
```
✓ tests/unit/calculations.test.ts (14 tests) 15ms
   ✓ calculates standard shift wages without overtime
   ✓ calculates overtime at exactly 2.0x standard hourly rate
   ✓ applies 12% provident fund deduction accurately
   ✓ applies 0.75% ESI deduction accurately
   ✓ enforces maximum allowable shift limits (12 hours)
   ✓ triggers fatigue alert when rest period < 11 hours
   ...
✓ tests/unit/workforceSearch.test.ts (4 tests) 10ms
   ✓ parses natural language overtime queries
   ✓ parses skill certification filters
   ✓ handles multilingual tokens in query strings
   ✓ sanitizes input preventing PII leakage

Test Files  2 passed (2)
     Tests  18 passed (18)
```

---

## 🔒 Security & Privacy Architecture

- **Role-Based Access Control (RBAC)**: Strict segregation between `Worker`, `Employer`, and `Owner` permission scopes.
- **Zero-PII Grievances**: Anonymous reports contain zero foreign keys or session metadata.
- **Content Security**: All inputs sanitized to prevent XSS; zero arbitrary `eval` or dynamic script execution.
- **Client Bundle Footprint**: Entire repository is optimized and strictly lightweight ($<1\text{ MB}$ raw repository size).

---

## 📄 License & Attribution

Developed for **PromptWars 2026** by **Madhan Kumar T** ([@Madhan310301](https://github.com/Madhan310301)).  
Supporting **UN SDG 8: Decent Work and Economic Growth**.
