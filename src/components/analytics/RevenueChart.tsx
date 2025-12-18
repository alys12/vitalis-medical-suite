import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { RevenueData } from '@/lib/mock-medical-data';
interface RevenueChartProps {
  data: RevenueData[];
}
export function RevenueChart({ data }: RevenueChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm h-full">
      <CardHeader>
        <CardTitle>Revenue by Service</CardTitle>
        <CardDescription>Monthly financial breakdown across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-900 p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold text-sm mb-1">{item.name}</p>
                          <p className="text-teal-600 font-bold text-lg">
                            {formatCurrency(item.value)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
              No revenue data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}