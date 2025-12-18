import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DemographicData } from '@/lib/mock-medical-data';
interface DemographicsChartProps {
  data: DemographicData[];
}
export function DemographicsChart({ data }: DemographicsChartProps) {
  // Calculate total for the center text
  const totalPatients = data.reduce((acc, curr) => acc + curr.value, 0);
  return (
    <Card className="col-span-1 border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle>Patient Demographics</CardTitle>
        <CardDescription>Age distribution of active patients</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full relative">
          {data && data.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-white dark:bg-slate-900 p-2 border rounded-lg shadow-md text-xs">
                            <span className="font-semibold">{item.name}:</span> {item.value}%
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
                <span className="text-3xl font-bold text-slate-700 dark:text-slate-200">
                  {totalPatients > 0 ? '100%' : '0%'}
                </span>
                <span className="text-xs text-muted-foreground">Distribution</span>
              </div>
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No demographic data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}