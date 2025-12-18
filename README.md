# Vitalis Medical Suite

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alys12/vitalis-medical-suite)

**Vitalis** is a next-generation, visually immersive medical practice management dashboard designed to streamline clinical workflows while providing deep analytical insights. It serves as the central nervous system for modern clinics, offering a unified interface for patient management, appointment scheduling, and operational analytics.

The platform features a high-density 'Command Center' dashboard that aggregates critical daily metrics—patient volume, appointment adherence, and revenue velocity—into elegant, interactive visualizations.

## 🚀 Key Features

*   **Command Center Dashboard**: A widget-based overview utilizing Recharts for real-time data visualization of patient trends, sparklines for vital signs, and actionable lists for upcoming appointments.
*   **Patient Directory**: A sophisticated data grid with advanced filtering, search, and quick-view capabilities for patient electronic health records (EHR) summaries.
*   **Smart Scheduler**: A calendar-integrated view for managing practitioner availability and appointments.
*   **Analytics Engine**: Detailed breakdown of clinic performance, demographics, and financial health.
*   **Visual Excellence**: A 'Clean Medical' aesthetic employing glassmorphism, subtle micro-interactions, and a professional color palette (Teal, Cyan, Indigo) for maximum clarity and user delight.

## 🛠️ Technology Stack

This project is built on a high-performance, edge-native stack designed for speed and reliability.

*   **Frontend**: React 18, Vite, TypeScript
*   **UI Framework**: Tailwind CSS v3, Shadcn UI (Radix Primitives)
*   **State Management**: Zustand
*   **Visualization**: Recharts
*   **Icons**: Lucide React
*   **Backend**: Cloudflare Workers (Hono)
*   **Persistence**: Cloudflare Durable Objects (SQLite-based storage)
*   **Runtime**: Cloudflare Edge Network

## 📦 Project Structure

The project follows a monorepo-like structure where the frontend and backend worker coexist but are built separately.

```
├── src/                  # Frontend React Application
│   ├── components/       # Reusable UI components (Shadcn)
│   ├── pages/            # Application views (Dashboard, Patients, etc.)
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities and API clients
├── worker/               # Cloudflare Worker Backend
│   ├── index.ts          # Worker entry point
│   ├── user-routes.ts    # API route definitions
│   └── entities.ts       # Durable Object entity definitions
└── shared/               # Shared types between frontend and backend
```

## ⚡ Getting Started

### Prerequisites

*   **Bun**: This project uses Bun as the package manager.
*   **Node.js**: Required for some build tools.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/vitalis-med-suite.git
    cd vitalis-med-suite
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

### Development

To start the development server (Frontend + Worker proxy):

```bash
bun run dev
```

This will start the Vite development server, usually at `http://localhost:5173`.

### Building for Production

To build the frontend assets and prepare the worker:

```bash
bun run build
```

## 🚀 Deployment

This application is designed to be deployed to Cloudflare Workers.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/alys12/vitalis-medical-suite)

### Manual Deployment

1.  Ensure you are logged into Cloudflare via Wrangler:
    ```bash
    npx wrangler login
    ```

2.  Deploy the application:
    ```bash
    bun run deploy
    ```

This command builds the frontend and deploys the worker with the static assets to your Cloudflare account.

## ⚠️ Important Notes

*   **Durable Objects**: This project uses Cloudflare Durable Objects for data persistence. Ensure your Cloudflare plan supports this feature.
*   **Bindings**: The project is configured to use a single `GlobalDurableObject` binding. Do not modify `wrangler.jsonc` bindings as it may break the application architecture.
*   **Mock Data**: The initial phase includes rich mock data generators to demonstrate UI capabilities before full backend integration.

## 📄 License

This project is licensed under the MIT License.