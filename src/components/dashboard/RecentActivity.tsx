import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityItem } from '@/lib/mock-medical-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
interface RecentActivityProps {
  activities: ActivityItem[];
}
export function RecentActivity({ activities }: RecentActivityProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  const getTypeColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'result': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'new_patient': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  const getTypeLabel = (type: ActivityItem['type']) => {
    switch (type) {
      case 'new_patient': return 'New Patient';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  return (
    <Card className="col-span-1 border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 group">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.patientId}`} />
                <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                  {getInitials(activity.patientName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none text-foreground group-hover:text-teal-700 transition-colors">
                    {activity.patientName}
                  </p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {activity.title}
                </p>
                <div className="flex items-center pt-1">
                  <Badge variant="outline" className={cn("text-[10px] px-2 py-0 h-5 font-medium border", getTypeColor(activity.type))}>
                    {getTypeLabel(activity.type)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}