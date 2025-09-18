import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatData {
  value: string
  label: string
  color?: string
}

interface StatCardProps {
  title: string
  icon?: LucideIcon
  stats: StatData[]
  bg_color: string
  children?: React.ReactNode
  className?: string
}

export function StatCard({ title, icon: Icon, stats, bg_color, children, className }: StatCardProps) {
  return (
    <Card className={`bg-[${bg_color}] shadow-card border-0 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-[#16697A]">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-foreground" style={{ color: stat.color }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        {children && (
          <div className="h-24 bg-muted/30 rounded-lg flex items-center justify-center">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}