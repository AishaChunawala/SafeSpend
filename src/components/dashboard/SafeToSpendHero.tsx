import { motion } from 'framer-motion';
import { ShieldCheck, TrendingDown } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/format';
import { SAFE_TO_SPEND, DISCRETIONARY_SPENT } from '@/lib/seed-data';

export function SafeToSpendHero() {
  const { currency } = useApp();
  const spentPct = Math.round((DISCRETIONARY_SPENT / (DISCRETIONARY_SPENT + SAFE_TO_SPEND)) * 100);

  return (
    <GlassCard padding="lg" className="relative overflow-hidden h-full">
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: 'hsl(var(--brand))' }} />

      <div className="relative flex flex-col items-center text-center gap-4 h-full justify-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full brand-bg">
            <ShieldCheck className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Safe-to-Spend</span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight brand-text"
        >
          {formatCurrency(SAFE_TO_SPEND, currency)}
        </motion.div>

        <p className="text-sm text-muted-foreground max-w-md text-balance">
          This is yours to spend freely this month — after every bill, subscription, and savings goal is covered.
        </p>

        <div className="w-full max-w-md mt-2">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">Discretionary spent</span>
            <span className="font-medium">{spentPct}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${spentPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="h-full rounded-full brand-gradient"
            />
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <TrendingDown className="h-3 w-3" />
            <span>{formatCurrency(DISCRETIONARY_SPENT, currency, { compact: true })} spent so far</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
