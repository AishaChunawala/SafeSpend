import { motion } from 'framer-motion';
import { ShieldCheck, Plane, Laptop, Heart, PiggyBank, Plus, Target, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCompact, formatDate } from '@/lib/format';
import { savingsGoals } from '@/lib/seed-data';

const goalIcons: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-5 w-5 text-white" />,
  Plane: <Plane className="h-5 w-5 text-white" />,
  Laptop: <Laptop className="h-5 w-5 text-white" />,
  Heart: <Heart className="h-5 w-5 text-white" />,
};

export function SavingsGoalsPage() {
  const { currency } = useApp();
  const totalTarget = savingsGoals.reduce((s, g) => s + g.target, 0);
  const totalCurrent = savingsGoals.reduce((s, g) => s + g.current, 0);
  const overallPct = Math.round((totalCurrent / totalTarget) * 100);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-3 gap-4">
        <GlassCard padding="md" className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl brand-bg"><Target className="h-6 w-6 text-white" /></span>
          <div><p className="text-xs text-muted-foreground">Total Saved</p><p className="text-2xl font-bold">{formatCompact(totalCurrent, currency)}</p></div>
        </GlassCard>
        <GlassCard padding="md" className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-4/15 text-chart-4"><PiggyBank className="h-6 w-6" /></span>
          <div><p className="text-xs text-muted-foreground">Total Target</p><p className="text-2xl font-bold">{formatCompact(totalTarget, currency)}</p></div>
        </GlassCard>
        <GlassCard padding="md" className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-6/15 text-chart-6"><Target className="h-6 w-6" /></span>
          <div><p className="text-xs text-muted-foreground">Overall Progress</p><p className="text-2xl font-bold">{overallPct}%</p></div>
        </GlassCard>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Your Goals</h3>
        <Button variant="outline" size="sm" className="glass border-border/50"><Plus className="h-4 w-4 mr-1" /> New Goal</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savingsGoals.map((goal, i) => {
          const remaining = goal.target - goal.current;
          const pct = Math.round((goal.current / goal.target) * 100);
          return (
            <motion.div key={goal.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <GlassCard hover padding="lg" className="flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `hsl(var(--chart-${goal.color}))` }}>
                    {goalIcons[goal.icon] ?? <PiggyBank className="h-5 w-5 text-white" />}
                  </span>
                  <span className="text-2xl font-bold">{pct}%</span>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{goal.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Calendar className="h-3 w-3" /><span>by {formatDate(goal.deadline, { year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                      className="h-full rounded-full" style={{ background: `hsl(var(--chart-${goal.color}))` }} />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{formatCurrency(goal.current, currency, { compact: true })}</span>
                    <span className="text-muted-foreground">{formatCurrency(goal.target, currency, { compact: true })}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <span className="text-xs text-muted-foreground">Remaining</span>
                  <span className="text-sm font-semibold">{formatCompact(remaining, currency)}</span>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
