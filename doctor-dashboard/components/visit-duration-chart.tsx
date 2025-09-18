import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  duration: {
    label: 'Duration (min)',
    color: 'hsl(var(--chart-3))',
  },
}

export function VisitDurationChart({ data }: { data: any[] }) {
  const formattedData = (data ?? []).map((d) => {
    
    const numericValue = typeof d.value === "string"
      ? parseInt(d.duration.replace(/[^\d]/g, ""), 10)
      : Number(d.duration)

    return {
      label: d.label,
      value: isNaN(numericValue) ? 0 : numericValue,
    }
  })

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="label" 
            tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="var(--chart-3)" 
            strokeWidth={2}
            dot={{ fill: 'var(--chart-3)', strokeWidth: 0, r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

