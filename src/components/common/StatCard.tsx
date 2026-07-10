import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  amountInr: number;
  icon: React.ReactNode;
  delta?: number;
  hint?: string;
  accent?: 'brand' | 'blue' | 'amber' | 'violet' | 'rose' | 'green';
}

const accentMap = {
  brand: 'text-brand bg-brand/10',
  blue: 'text-chart-2 bg-chart-2/10',
  amber: 'text-chart-3 bg-chart-3/10',
  violet: 'text-chart-4 bg-chart-4/10',
  rose: 'text-chart-5 bg-chart-5/10',
  green: 'text-chart-6 bg-chart-6/10',
};

export function StatCard({
  label,
  amountInr,
  icon,
  delta,
  hint,
  accent = 'brand',
}: StatCardProps) {
  const { currency } = useApp();
  const positive = (delta ?? 0) >= 0;

  return (
    <GlassCard hover padding="md" className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', accentMap[accent])}>
          {icon}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold tracking-tight"
      >
        {formatCurrency(amountInr, currency)}
      </motion.div>
      <div className="flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span className={cn('inline-flex items-center gap-0.5 font-medium', positive ? 'text-chart-6' : 'text-destructive')}>
            {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </GlassCard>
  );
}
