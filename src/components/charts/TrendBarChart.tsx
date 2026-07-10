import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useApp } from '@/context/AppContext';
import { formatCompact } from '@/lib/format';
import type { MonthlyTrendPoint } from '@/types';

interface TrendBarChartProps {
  data: MonthlyTrendPoint[];
  height?: number;
}

export function TrendBarChart({ data, height = 260 }: TrendBarChartProps) {
  const { currency } = useApp();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompact(v, currency)} width={48} />
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="glass-card p-3 text-xs shadow-xl">
                <p className="font-semibold mb-1.5">{label}</p>
                {payload.map((p) => (
                  <p key={p.dataKey as string} className="text-muted-foreground">
                    {String(p.dataKey)}: {formatCompact(p.value as number, currency)}
                  </p>
                ))}
              </div>
            );
          }}
        />
        <Bar dataKey="income" fill="hsl(var(--chart-2))" radius={[6, 6, 0, 0]} maxBarSize={28} />
        <Bar dataKey="expenses" fill="hsl(var(--chart-5))" radius={[6, 6, 0, 0]} maxBarSize={28} />
        <Bar dataKey="savings" fill="hsl(var(--chart-1))" radius={[6, 6, 0, 0]} maxBarSize={28} />
      </BarChart>
    </ResponsiveContainer>
  );
}
