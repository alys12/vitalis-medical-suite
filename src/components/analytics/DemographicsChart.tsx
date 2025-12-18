import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MOCK_DEMOGRAPHICS } from '@/lib/mock-medical-data';
export function DemographicsChart() {
  return (
    <Card className="col-span-1 border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle>Patient Demographics</CardTitle>
        <CardDescription>Age distribution of active patients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={MOCK_DEMOGRAPHICS}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {MOCK_DEMOGRAPHICS.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-slate-900 p-2 border rounded-lg shadow-md text-xs">
                        <span className="font-semibold">{data.name}:</span> {data.value}%
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-xs text-slate-500 ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
            <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">1.2k</span>
            <span className="text-xs text-muted-foreground">Patients</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}