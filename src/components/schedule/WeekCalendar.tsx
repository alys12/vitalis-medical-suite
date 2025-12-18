import React, { useMemo } from 'react';
import { 
  format, 
  startOfWeek, 
  addDays, 
  isSameDay, 
  differenceInMinutes, 
  startOfDay, 
  setHours 
} from 'date-fns';
import { Appointment } from '@/lib/mock-medical-data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface WeekCalendarProps {
  date: Date;
  appointments: Appointment[];
}
export function WeekCalendar({ date, appointments }: WeekCalendarProps) {
  const startOfCurrentWeek = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 5 }).map((_, i) => addDays(startOfCurrentWeek, i));
  // Calendar configuration
  const startHour = 8; // 8 AM
  const endHour = 18; // 6 PM
  const totalHours = endHour - startHour;
  const pixelsPerHour = 80; // Height of one hour slot
  const hours = Array.from({ length: totalHours + 1 }).map((_, i) => startHour + i);
  const getAppointmentStyle = (apt: Appointment) => {
    const start = new Date(apt.start);
    const end = new Date(apt.end);
    // Calculate top position relative to startHour
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const dayStartMinutes = startHour * 60;
    const minutesFromStart = startMinutes - dayStartMinutes;
    const top = (minutesFromStart / 60) * pixelsPerHour;
    // Calculate height
    const durationMinutes = differenceInMinutes(end, start);
    const height = (durationMinutes / 60) * pixelsPerHour;
    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };
  const getTypeColor = (type: Appointment['type']) => {
    switch (type) {
      case 'Checkup': return 'bg-blue-100 border-blue-200 text-blue-700 hover:bg-blue-200';
      case 'Follow-up': return 'bg-teal-100 border-teal-200 text-teal-700 hover:bg-teal-200';
      case 'Emergency': return 'bg-red-100 border-red-200 text-red-700 hover:bg-red-200';
      case 'Surgery': return 'bg-purple-100 border-purple-200 text-purple-700 hover:bg-purple-200';
      case 'Consultation': return 'bg-amber-100 border-amber-200 text-amber-700 hover:bg-amber-200';
      default: return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  };
  return (
    <div className="flex flex-col h-full bg-white dark:bg-card rounded-xl border shadow-sm overflow-hidden">
      {/* Header Row */}
      <div className="flex border-b bg-slate-50 dark:bg-muted/30">
        <div className="w-16 shrink-0 border-r p-4" /> {/* Time column header */}
        {weekDays.map((day) => (
          <div 
            key={day.toString()} 
            className={cn(
              "flex-1 p-3 text-center border-r last:border-r-0",
              isSameDay(day, new Date()) ? "bg-teal-50/50 dark:bg-teal-900/10" : ""
            )}
          >
            <p className={cn(
              "text-xs font-medium uppercase mb-1",
              isSameDay(day, new Date()) ? "text-teal-600" : "text-muted-foreground"
            )}>
              {format(day, 'EEE')}
            </p>
            <div className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
              isSameDay(day, new Date()) ? "bg-teal-600 text-white" : "text-foreground"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      {/* Grid Body */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="flex" style={{ height: `${totalHours * pixelsPerHour}px` }}>
          {/* Time Column */}
          <div className="w-16 shrink-0 border-r bg-slate-50/30 dark:bg-muted/10">
            {hours.map((hour) => (
              <div 
                key={hour} 
                className="border-b text-xs text-muted-foreground text-right pr-2 pt-2 sticky left-0"
                style={{ height: `${pixelsPerHour}px` }}
              >
                {format(setHours(startOfDay(new Date()), hour), 'h a')}
              </div>
            ))}
          </div>
          {/* Days Columns */}
          {weekDays.map((day) => {
            const dayAppointments = appointments.filter(apt => isSameDay(new Date(apt.start), day));
            return (
              <div 
                key={day.toString()} 
                className="flex-1 border-r last:border-r-0 relative group"
              >
                {/* Hour grid lines */}
                {hours.map((hour) => (
                  <div 
                    key={hour} 
                    className="border-b border-dashed border-slate-100 dark:border-slate-800 w-full absolute"
                    style={{ top: `${(hour - startHour) * pixelsPerHour}px`, height: '1px' }}
                  />
                ))}
                {/* Current Time Indicator (if today) */}
                {isSameDay(day, new Date()) && (
                  <div 
                    className="absolute w-full border-t-2 border-red-400 z-20 pointer-events-none flex items-center"
                    style={{ 
                      top: `${((new Date().getHours() * 60 + new Date().getMinutes()) - (startHour * 60)) / 60 * pixelsPerHour}px` 
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-red-400 -ml-1" />
                  </div>
                )}
                {/* Appointments */}
                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={cn(
                      "absolute inset-x-1 rounded-md border p-2 text-xs shadow-sm transition-all hover:shadow-md hover:z-10 cursor-pointer overflow-hidden",
                      getTypeColor(apt.type)
                    )}
                    style={getAppointmentStyle(apt)}
                  >
                    <div className="font-semibold truncate">{apt.title}</div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] opacity-90">
                      <span className="font-medium">{format(apt.start, 'h:mm')}</span>
                      <span>-</span>
                      <span className="font-medium">{format(apt.end, 'h:mm a')}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apt.patientId}`} />
                        <AvatarFallback className="text-[8px]">PT</AvatarFallback>
                      </Avatar>
                      <span className="truncate font-medium">{apt.patientName}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}