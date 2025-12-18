import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { PatientsPage } from '@/pages/PatientsPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/patients",
    element: <PatientsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  // Fallback for demo routes to prevent 404s during development
  {
    path: "/schedule",
    element: <HomePage />, // Placeholder
  },
  {
    path: "/analytics",
    element: <HomePage />, // Placeholder
  },
  {
    path: "/settings",
    element: <HomePage />, // Placeholder
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)