# 🌿 Whole Purple

### **Ethically Sourced, Always.**

![Whole Purple Social Preview](public/images/social-preview.png)

## 📖 Overview
**Whole Purple** is a premium, full-stack e-commerce ecosystem dedicated to delivering the purity of nature to your doorstep. Specializing in ethically sourced fresh produce, premium marinated proteins, and organic pantry essentials, the platform combines a high-fidelity retail experience with a powerful administrative backbone designed for modern logistics.

---

## ✨ Key Features

### 🛒 Premium Retail Experience
- **Elegant Storefront**: A fluid, responsive shopping experience with cinematic product visualization.
- **Dynamic Cart & Checkout**: Real-time basket management with secure, integrated payment flows.
- **Role-Based Access**: Specialized portals for Clients, Shop Managers, and Executive Administrators.

### 📊 Executive Dashboards
- **Operations Hub**: A high-fidelity dashboard for Shop Managers with live inventory health, fulfillment velocity charts, and operational efficiency metrics.
- **Strategic Oversight**: Admin-level analytics tracking revenue trajectories, customer base growth, and cross-platform performance.
- **Mobile-First Analytics**: Every chart and stat is mathematically optimized for a seamless experience across all devices.

### 📄 Professional Documentation
- **Secure Invoice Engine**: A standalone, formal document generation system that produces print-ready, high-fidelity receipts.
- **Internal Operations Panel**: Real-time order status management with dynamic, color-coded tracking (Pending, Paid, Shipped, Delivered).

---

## 🛠 Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom cubic-bezier animations.
- **Database**: [Prisma](https://www.prisma.io/) with SQLite/PostgreSQL support.
- **Auth**: [Next-Auth](https://next-auth.js.org/) for robust RBAC (Role-Based Access Control).
- **Icons**: [Lucide React](https://lucide.dev/) for consistent, minimalist iconography.
- **Charts**: [Recharts](https://recharts.org/) for responsive, data-driven visualizations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/DavidAkerele/wholepurple.git
   cd wholepurple
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## 📦 Deployment
The project is optimized for deployment on **Vercel** or any Node.js environment. Ensure all environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`) are correctly configured in your production settings.

---

## 💜 Brand Vision
Whole Purple isn't just about food; it's about a sustainable, transparent supply chain that honors both the producer and the consumer. Every line of code in this platform is written to ensure that the beauty of nature is matched by the efficiency of our technology.

---
© 2026 Whole Purple Ltd. All Rights Reserved.
