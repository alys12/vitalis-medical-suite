import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RevenueChart } from '@/components/analytics/RevenueChart';
import { DemographicsChart } from '@/components/analytics/DemographicsChart';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { MOCK_STATS } from '@/lib/mock-medical-data';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Download, Calendar as CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_APPOINTMENT_TRENDS } from '@/lib/mock-medical-data';
export function AnalyticsPage() {
  return (
    <AppLayout container contentClassName="space-y-8 bg-slate-50/50 dark:bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Deep dive into clinic performance, financial health, and patient trends.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="static" />
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>
      {/* KPI Cards */}
      <section>
        <StatsCards stats={MOCK_STATS} />
      </section>
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart />
        <DemographicsChart />
      </div>
      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MOCK_APPOINTMENT_TRENDS}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0F766E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#0F766E"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                    name="Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="cancelled"
                    stroke="#F43F5E"
                    fillOpacity={1}
                    fill="url(#colorCancelled)"
                    name="Cancelled"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}