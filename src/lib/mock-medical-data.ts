import { subDays, format, addDays, startOfWeek, addHours, setHours, setMinutes, startOfDay } from 'date-fns';
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
  start: Date;
  end: Date;
  type: 'Checkup' | 'Follow-up' | 'Emergency' | 'Surgery' | 'Consultation';
  status: 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}
// Helper to generate consistent vitals
const generateVitals = () => ({
  bloodPressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`,
  heartRate: 60 + Math.floor(Math.random() * 40),
  temperature: 36.5 + Math.random(),
  weight: 60 + Math.floor(Math.random() * 30),
  height: 160 + Math.floor(Math.random() * 30),
  oxygenSaturation: 95 + Math.floor(Math.random() * 5),
});
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
    phone: '(555) 123-4567',
    dob: '1990-05-15',
    address: '123 Maple Ave, Springfield, IL',
    insurance: { provider: 'BlueCross', policyNumber: 'BC-123456789' },
    vitals: generateVitals(),
    history: [
      { date: format(subDays(new Date(), 2), 'MMM dd, yyyy'), type: 'Checkup', notes: 'Routine follow-up for hypertension. BP stable.', doctor: 'Dr. Anderson' },
      { date: format(subDays(new Date(), 32), 'MMM dd, yyyy'), type: 'Lab Work', notes: 'Blood panel ordered.', doctor: 'Dr. Smith' },
    ],
    notes: [
      { id: 'n1', date: format(subDays(new Date(), 2), 'MMM dd, yyyy'), author: 'Dr. Anderson', content: 'Patient reports mild headaches. Advised to monitor BP daily.' }
    ]
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
    phone: '(555) 987-6543',
    dob: '1979-11-20',
    address: '456 Oak Ln, Metropolis, NY',
    insurance: { provider: 'Aetna', policyNumber: 'AE-987654321' },
    vitals: generateVitals(),
    history: [
      { date: format(subDays(new Date(), 5), 'MMM dd, yyyy'), type: 'Consultation', notes: 'Discussed diet changes and insulin dosage.', doctor: 'Dr. Anderson' },
    ],
    notes: []
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
    phone: '(555) 456-7890',
    dob: '1996-02-10',
    address: '789 Pine St, Gotham, NJ',
    insurance: { provider: 'UnitedHealth', policyNumber: 'UH-456123789' },
    vitals: generateVitals(),
    history: [
      { date: format(subDays(new Date(), 1), 'MMM dd, yyyy'), type: 'Emergency', notes: 'Severe migraine with aura. Administered sumatriptan.', doctor: 'Dr. Lee' },
    ],
    notes: []
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
    phone: '(555) 234-5678',
    dob: '1972-08-05',
    address: '321 Cedar Blvd, Star City, CA',
    insurance: { provider: 'Cigna', policyNumber: 'CI-789456123' },
    vitals: generateVitals(),
    history: [
      { date: format(new Date(), 'MMM dd, yyyy'), type: 'Surgery Follow-up', notes: 'Wound healing well. No signs of infection.', doctor: 'Dr. Strange' },
    ],
    notes: []
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
    phone: '(555) 876-5432',
    dob: '1963-04-25',
    address: '654 Elm St, Central City, MO',
    insurance: { provider: 'Medicare', policyNumber: 'MC-123456789A' },
    vitals: generateVitals(),
    history: [],
    notes: []
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
    phone: '(555) 345-6789',
    dob: '1983-12-12',
    address: '987 Birch Rd, Coast City, FL',
    insurance: { provider: 'Humana', policyNumber: 'HU-987123654' },
    vitals: generateVitals(),
    history: [],
    notes: []
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
// Generate appointments for the current week
const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'P-1001',
    patientName: 'Sarah Jenkins',
    title: 'Hypertension Follow-up',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 0), 9), 0), // Mon 9:00
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 0), 10), 0),
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 'apt-2',
    patientId: 'P-1002',
    patientName: 'Michael Chen',
    title: 'Diabetes Consultation',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 0), 11), 30), // Mon 11:30
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 0), 12), 30),
    type: 'Consultation',
    status: 'Scheduled'
  },
  {
    id: 'apt-3',
    patientId: 'P-1003',
    patientName: 'Emma Wilson',
    title: 'Migraine Check',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 1), 14), 0), // Tue 14:00
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 1), 14), 45),
    type: 'Checkup',
    status: 'Confirmed'
  },
  {
    id: 'apt-4',
    patientId: 'P-1004',
    patientName: 'James Rodriguez',
    title: 'Post-op Review',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 2), 10), 0), // Wed 10:00
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 2), 11), 0),
    type: 'Follow-up',
    status: 'Confirmed'
  },
  {
    id: 'apt-5',
    patientId: 'P-1005',
    patientName: 'Linda Kim',
    title: 'Arthritis Therapy',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 3), 15), 30), // Thu 15:30
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 3), 16), 30),
    type: 'Consultation',
    status: 'Scheduled'
  },
  {
    id: 'apt-6',
    patientId: 'P-1006',
    patientName: 'Robert Taylor',
    title: 'Annual Physical',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 4), 9), 0), // Fri 9:00
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 4), 10), 30),
    type: 'Checkup',
    status: 'Confirmed'
  },
  {
    id: 'apt-7',
    patientId: 'P-1001',
    patientName: 'Sarah Jenkins',
    title: 'Lab Results Review',
    start: setMinutes(setHours(addDays(startOfCurrentWeek, 4), 13), 0), // Fri 13:00
    end: setMinutes(setHours(addDays(startOfCurrentWeek, 4), 13), 30),
    type: 'Follow-up',
    status: 'Scheduled'
  }
];