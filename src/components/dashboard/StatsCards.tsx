import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Activity, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DashboardStat } from '@/lib/mock-medical-data';
import { cn } from '@/lib/utils';
interface StatsCardsProps {
  stats: DashboardStat[];
}
const iconMap = {
  users: Users,
  calendar: Calendar,
  activity: Activity,
  dollar: DollarSign,
};
export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        const isPositive = stat.trend >= 0;
        return (
          <Card key={index} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Icon className={cn("w-6 h-6", {
                    "text-blue-600": stat.icon === 'users',
                    "text-teal-600": stat.icon === 'calendar',
                    "text-emerald-600": stat.icon === 'dollar',
                    "text-indigo-600": stat.icon === 'activity',
                  })} />
                </div>
                <div className={cn("flex items-center text-sm font-medium", 
                  isPositive ? "text-green-600" : "text-red-600"
                )}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {Math.abs(stat.trend)}%
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                <div className="flex items-baseline mt-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <span className="ml-2 text-xs text-muted-foreground hidden sm:inline-block">
                    {stat.trendLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}