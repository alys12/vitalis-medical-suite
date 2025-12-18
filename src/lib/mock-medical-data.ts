import { subDays, format, addDays } from 'date-fns';
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
// Mock Patients
export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'P-1001',
    name: 'Sarah Jenkins',
    age: 34,
    gender: 'Female',
    condition: 'Hypertension',
    status: 'Active',
    lastVisit: format(subDays(new Date(), 2), 'MMM dd, yyyy'),
    nextAppointment: format(addDays(new Date(), 5), 'MMM dd, yyyy'),
    email: 'sarah.j@example.com',
    phone: '(555) 123-4567'
  },
  {
    id: 'P-1002',
    name: 'Michael Chen',
    age: 45,
    gender: 'Male',
    condition: 'Type 2 Diabetes',
    status: 'Observation',
    lastVisit: format(subDays(new Date(), 5), 'MMM dd, yyyy'),
    email: 'm.chen@example.com',
    phone: '(555) 987-6543'
  },
  {
    id: 'P-1003',
    name: 'Emma Wilson',
    age: 28,
    gender: 'Female',
    condition: 'Migraine',
    status: 'Active',
    lastVisit: format(subDays(new Date(), 1), 'MMM dd, yyyy'),
    nextAppointment: format(addDays(new Date(), 2), 'MMM dd, yyyy'),
    email: 'emma.w@example.com',
    phone: '(555) 456-7890'
  },
  {
    id: 'P-1004',
    name: 'James Rodriguez',
    age: 52,
    gender: 'Male',
    condition: 'Post-op Recovery',
    status: 'Critical',
    lastVisit: format(new Date(), 'MMM dd, yyyy'),
    email: 'j.rod@example.com',
    phone: '(555) 234-5678'
  },
  {
    id: 'P-1005',
    name: 'Linda Kim',
    age: 61,
    gender: 'Female',
    condition: 'Arthritis',
    status: 'Active',
    lastVisit: format(subDays(new Date(), 14), 'MMM dd, yyyy'),
    email: 'l.kim@example.com',
    phone: '(555) 876-5432'
  },
  {
    id: 'P-1006',
    name: 'Robert Taylor',
    age: 41,
    gender: 'Male',
    condition: 'Routine Checkup',
    status: 'Recovered',
    lastVisit: format(subDays(new Date(), 30), 'MMM dd, yyyy'),
    email: 'r.taylor@example.com',
    phone: '(555) 345-6789'
  }
];
// Mock Stats
export const MOCK_STATS: DashboardStat[] = [
  {
    label: 'Total Patients',
    value: '1,284',
    trend: 12.5,
    trendLabel: 'vs last month',
    icon: 'users',
    color: 'bg-blue-500'
  },
  {
    label: 'Appointments Today',
    value: '42',
    trend: 4.3,
    trendLabel: 'vs yesterday',
    icon: 'calendar',
    color: 'bg-teal-500'
  },
  {
    label: 'Revenue (Monthly)',
    value: '$124,500',
    trend: 8.2,
    trendLabel: 'vs last month',
    icon: 'dollar',
    color: 'bg-emerald-500'
  },
  {
    label: 'Pending Tasks',
    value: '12',
    trend: -2.5,
    trendLabel: 'vs yesterday',
    icon: 'activity',
    color: 'bg-indigo-500'
  }
];
// Mock Activity
export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'appointment',
    title: 'Appointment Confirmed',
    description: 'General Checkup',
    time: '10:00 AM',
    patientId: 'P-1001',
    patientName: 'Sarah Jenkins'
  },
  {
    id: 'act-2',
    type: 'result',
    title: 'Lab Results Available',
    description: 'Blood Work Panel',
    time: '09:45 AM',
    patientId: 'P-1002',
    patientName: 'Michael Chen'
  },
  {
    id: 'act-3',
    type: 'emergency',
    title: 'Urgent Care Visit',
    description: 'Severe Abdominal Pain',
    time: '09:15 AM',
    patientId: 'P-1004',
    patientName: 'James Rodriguez'
  },
  {
    id: 'act-4',
    type: 'new_patient',
    title: 'New Patient Registration',
    description: 'Referred by Dr. Smith',
    time: '08:30 AM',
    patientId: 'P-1007',
    patientName: 'David Miller'
  }
];
// Mock Chart Data
export const MOCK_CHART_DATA: ChartDataPoint[] = Array.from({ length: 7 }).map((_, i) => {
  const date = subDays(new Date(), 6 - i);
  return {
    date: format(date, 'MMM dd'),
    visits: Math.floor(Math.random() * 30) + 20,
    revenue: Math.floor(Math.random() * 5000) + 2000,
    newPatients: Math.floor(Math.random() * 5) + 1
  };
});