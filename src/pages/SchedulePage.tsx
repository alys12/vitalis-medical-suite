import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WeekCalendar } from '@/components/schedule/WeekCalendar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import { addWeeks, subWeeks, format } from 'date-fns';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Card, CardContent } from '@/components/ui/card';
import { useAppointments } from '@/lib/api-hooks';
import { Skeleton } from '@/components/ui/skeleton';
export function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: appointments, isLoading, error } = useAppointments();
  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());
  if (error) {
    return (
      <AppLayout container contentClassName="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-bold">Failed to load schedule</h2>
          <p>{(error as Error).message}</p>
        </div>
      </AppLayout>
    );
  }
  return (
    <AppLayout container contentClassName="h-[calc(100vh-4rem)] flex flex-col space-y-6 bg-slate-50/50 dark:bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Manage appointments and practitioner availability.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle className="static" />
          <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Appointment
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar Controls */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Quick Navigate</h3>
                <Button variant="ghost" size="sm" onClick={handleToday} className="h-7 text-xs">
                  Today
                </Button>
              </div>
              {/* Simple Mini Calendar Mockup */}
              <div className="bg-slate-50 dark:bg-muted/30 rounded-lg p-3 text-center">
                <div className="flex items-center justify-between mb-2 px-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handlePrevWeek}>
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium">{format(currentDate, 'MMMM yyyy')}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleNextWeek}>
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground mb-1">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-sm">
                  {Array.from({ length: 35 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 flex items-center justify-center rounded-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 ${i === 12 ? 'bg-teal-600 text-white hover:bg-teal-700' : ''}`}
                    >
                      {(i % 30) + 1}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold text-sm">Filters</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Checkups</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span>Follow-ups</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Emergency</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>Surgery</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Calendar Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-semibold ml-2">
                Week of {format(currentDate, 'MMM d, yyyy')}
              </h2>
            </div>
            <div className="flex items-center bg-white dark:bg-card border rounded-lg p-1">
              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs bg-slate-100 dark:bg-muted font-medium">Week</Button>
              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs text-muted-foreground">Day</Button>
              <Button variant="ghost" size="sm" className="h-7 px-3 text-xs text-muted-foreground">List</Button>
            </div>
          </div>
          <div className="flex-1 min-h-0 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
              </div>
            ) : null}
            <WeekCalendar date={currentDate} appointments={appointments ?? []} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}