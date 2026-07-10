import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

interface GoalProgressCardProps {
  name: string;
  current: number;
  target: number;
  icon: React.ReactNode;
  deadline?: string;
  color?: string;
}

export function GoalProgressCard({
  name,
  current,
  target,
  icon,
  deadline,
  color = 'var(--chart-1)',
}: GoalProgressCardProps) {
  const { currency } = useApp();
  const pct = Math.min(100, Math.round((current / target) * 100));

  return (
    <GlassCard hover padding="md" className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: `hsl(${color})` }}>
            {icon}
          </span>
          <div>
            <p className="font-semibold leading-tight">{name}</p>
            {deadline && <p className="text-xs text-muted-foreground">by {deadline}</p>}
          </div>
        </div>
        <span className="text-lg font-bold">{pct}%</span>
      </div>
      <div className="space-y-1.5">
        <Progress value={pct} className="h-2.5" style={{ '--progress-color': `hsl(${color})` } as React.CSSProperties} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(current, currency, { compact: true })}</span>
          <span>{formatCurrency(target, currency, { compact: true })}</span>
        </div>
      </div>
      {pct >= 100 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('text-xs font-medium text-chart-6')}>
          Goal achieved!
        </motion.p>
      )}
    </GlassCard>
  );
}
