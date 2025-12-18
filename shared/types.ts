export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Existing types from template (preserved for backward compatibility)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// --- Medical Domain Types ---
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  condition: string;
  status: 'Active' | 'Recovered' | 'Critical' | 'Observation';
  lastVisit: string;
  nextAppointment?: string;
  avatar?: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  insurance: {
    provider: string;
    policyNumber: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number; // kg
    height: number; // cm
    oxygenSaturation: number;
  };
  history: {
    date: string;
    type: string;
    notes: string;
    doctor: string;
  }[];
  notes: {
    id: string;
    date: string;
    author: string;
    content: string;
  }[];
}
export interface DashboardStat {
  label: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: 'users' | 'calendar' | 'activity' | 'dollar';
  color: string;
}
export interface ActivityItem {
  id: string;
  type: 'appointment' | 'result' | 'new_patient' | 'emergency';
  title: string;
  description: string;
  time: string;
  patientId: string;
  patientName: string;
}
export interface ChartDataPoint {
  date: string;
  visits: number;
  revenue: number;
  newPatients: number;
}
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  start: string; // ISO string for serialization
  end: string;   // ISO string for serialization
  type: 'Checkup' | 'Follow-up' | 'Emergency' | 'Surgery' | 'Consultation';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}
export interface RevenueData {
  name: string;
  value: number;
  color: string;
}
export interface DemographicData {
  name: string;
  value: number;
  color: string;
}
export interface AppointmentTrend {
  month: string;
  completed: number;
  cancelled: number;
  noShow: number;
}
// API Response Types
export interface DashboardData {
  stats: DashboardStat[];
  chartData: ChartDataPoint[];
  activity: ActivityItem[];
}
export interface AnalyticsData {
  revenue: RevenueData[];
  demographics: DemographicData[];
  trends: AppointmentTrend[];
}