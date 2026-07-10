import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '@/context/AppContext';
import { formatCompact } from '@/lib/format';

interface CategoryPieChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

export function CategoryPieChart({ data, height = 240, innerRadius = 60, outerRadius = 90 }: CategoryPieChartProps) {
  const { currency } = useApp();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={3} stroke="none">
          {data.map((entry, i) => (
            <Cell key={i} fill={`hsl(var(--chart-${entry.color}))`} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const p = payload[0].payload as { name: string; value: number };
            return (
              <div className="glass-card p-3 text-xs shadow-xl">
                <p className="font-semibold">{p.name}</p>
                <p className="text-muted-foreground">{formatCompact(p.value, currency)}</p>
              </div>
            );
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
