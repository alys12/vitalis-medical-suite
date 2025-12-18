import { useQuery } from '@tanstack/react-query';
import { api } from './api-client';
import type { 
  DashboardData, 
  AnalyticsData, 
  Patient, 
  Appointment 
} from '@shared/types';
// Dashboard Hooks
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api<DashboardData>('/api/dashboard'),
  });
}
// Analytics Hooks
export function useAnalytics() {
  return useQuery({
    queryKey: ['analytics'],
    queryFn: () => api<AnalyticsData>('/api/analytics'),
  });
}
// Patient Hooks
export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await api<{ items: Patient[]; next: string | null }>('/api/patients');
      return response.items;
    },
  });
}
// Appointment Hooks
export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await api<{ items: Appointment[]; next: string | null }>('/api/appointments');
      return response.items;
    },
  });
}