# Ivory Silk Collective — Luxury E-Commerce Monorepo

Welcome to the **Ivory Silk Collective** luxury fashion e-commerce platform.

---

## 🏗 Project Architecture

This codebase is organized as a clean two-tier **Monorepo**:

```text
ivorysilk/
├── frontend/             # Next.js 15 App Router Frontend
│   ├── app/              # App Router Pages (Shop, PDPs, Collections, Checkout)
│   ├── components/       # UI Components & Commerce Elements
│   ├── features/         # Domain Modules & Product Datasets
│   ├── public/           # Local High-Res Fashion Editorial Media
│   └── package.json
│
├── backend/              # Express + TypeScript REST API Server
│   ├── src/
│   │   ├── server.ts     # Express endpoints (/api/products, /api/collections, /api/checkout)
│   │   └── data/         # Seeded Product & Collection Data
│   └── package.json
│
├── package.json          # Root Monorepo Orchestrator
└── README.md
```

---

## 🚀 Running the Project

### 1. Run Frontend (Next.js App)
To launch the storefront interface:
```bash
npm run dev:frontend
```
*Access the storefront at:* `http://localhost:3000`

---

### 2. Run Backend (Express REST API)
To launch the backend API:
```bash
npm run dev:backend
```
*Access the API at:* `http://localhost:5000/api/health`

---

### 3. Run Both Concurrently
To run both frontend and backend together:
```bash
npm run dev:all
```

---

## 📡 Backend API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | `GET` | Server status and timestamp |
| `/api/collections` | `GET` | Fetch all luxury silk collection definitions |
| `/api/products` | `GET` | Search & filter products by category, collection, or search query |
| `/api/products/:slug` | `GET` | Retrieve single product details |
| `/api/checkout` | `POST` | Process order requests & generate `IS-XXXXXX` order receipts |

---

## 🛍 Client Demonstration Features
- **Editorial Design System**: High-contrast luxury minimalist layout.
- **Garment PDP**: Size/color swatch pickers, size guide modal, and zoomable gallery.
- **Cart & Bag Drawer**: Live quantity calculation and free express shipping meter.
- **Checkout Flow**: Complete shipping calculation and guest checkout simulator.
