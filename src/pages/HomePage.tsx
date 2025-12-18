import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { MOCK_STATS, MOCK_CHART_DATA, MOCK_ACTIVITY } from '@/lib/mock-medical-data';
import { Button } from '@/components/ui/button';
import { Plus, Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  return (
    <AppLayout container contentClassName="space-y-8 bg-slate-50/50 dark:bg-background min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Command Center</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, Dr. Anderson. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search patients..." 
              className="w-64 pl-9 bg-white dark:bg-secondary"
            />
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-background" />
          </Button>
          <ThemeToggle className="static" />
          <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>
      {/* Stats Grid */}
      <section>
        <StatsCards stats={MOCK_STATS} />
      </section>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <AnalyticsChart data={MOCK_CHART_DATA} />
        {/* Activity Feed */}
        <RecentActivity activities={MOCK_ACTIVITY} />
      </div>
    </AppLayout>
  );
}