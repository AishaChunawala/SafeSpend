import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import { formatCompact } from '@/lib/format';
import type { CashflowPoint } from '@/types';

interface CashflowAreaChartProps {
  data: CashflowPoint[];
  height?: number;
}

export function CashflowAreaChart({ data, height = 280 }: CashflowAreaChartProps) {
  const { currency } = useApp();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="cashflowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--brand))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(var(--brand))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} interval={4} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} tickFormatter={(v) => formatCompact(v, currency)} width={48} />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as CashflowPoint;
            return (
              <div className="glass-card p-3 text-xs shadow-xl">
                <p className="font-semibold mb-1">Day {p.day}</p>
                <p className="text-muted-foreground">Balance: {formatCompact(p.balance, currency)}</p>
                {p.inflow > 0 && <p className="text-chart-6">In: {formatCompact(p.inflow, currency)}</p>}
                {p.outflow > 0 && <p className="text-destructive">Out: {formatCompact(p.outflow, currency)}</p>}
              </div>
            );
          }}
        />
        <Area type="monotone" dataKey="balance" stroke="hsl(var(--brand))" strokeWidth={2.5} fill="url(#cashflowGrad)" dot={false} activeDot={{ r: 5, fill: 'hsl(var(--brand))' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
