"use client"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect } from 'react';

const chartConfig = {
  patients: {
    label: 'Patients',
    color: 'hsl(var(--chart-3))',
  },
}

export function PatientAgeChart({ data }: { data: any[] }) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="ageRange" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey="patients" 
            fill="var(--chart-3)"
            radius={[2, 2, 0, 0]}
            className="fill-medical-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}