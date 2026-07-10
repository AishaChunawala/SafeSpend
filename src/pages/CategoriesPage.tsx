import { motion } from 'framer-motion';
import {
  Home, ShoppingCart, Car, UtensilsCrossed, Clapperboard, Zap,
  HeartPulse, ShoppingBag, Code, Plus,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCompact } from '@/lib/format';
import { categories } from '@/lib/seed-data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home style={{ width: 18, height: 18 }} />,
  ShoppingCart: <ShoppingCart style={{ width: 18, height: 18 }} />,
  Car: <Car style={{ width: 18, height: 18 }} />,
  UtensilsCrossed: <UtensilsCrossed style={{ width: 18, height: 18 }} />,
  Clapperboard: <Clapperboard style={{ width: 18, height: 18 }} />,
  Zap: <Zap style={{ width: 18, height: 18 }} />,
  HeartPulse: <HeartPulse style={{ width: 18, height: 18 }} />,
  ShoppingBag: <ShoppingBag style={{ width: 18, height: 18 }} />,
  Code: <Code style={{ width: 18, height: 18 }} />,
};

export function CategoriesPage() {
  const { currency } = useApp();
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
  const pieData = categories.map((c) => ({ name: c.name, value: c.spent, color: c.color }));

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="lg:col-span-1 flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-tight">Spending Breakdown</h3>
          <CategoryPieChart data={pieData} height={220} />
          <div className="grid grid-cols-2 gap-2 mt-2">
            {pieData.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: `hsl(var(--chart-${c.color}))` }} />
                <span className="text-muted-foreground truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Budget Overview</h3>
              <p className="text-sm text-muted-foreground">{formatCompact(totalSpent, currency)} of {formatCompact(totalBudget, currency)} spent</p>
            </div>
            <Button variant="outline" size="sm" className="glass border-border/50">
              <Plus className="h-4 w-4 mr-1" /> Add Category
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {categories.map((cat, i) => {
              const pct = Math.min(100, Math.round((cat.spent / cat.budget) * 100));
              const over = cat.spent > cat.budget;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-2xl bg-muted/30 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{ background: `hsl(var(--chart-${cat.color}) / 0.12)`, color: `hsl(var(--chart-${cat.color}))` }}>
                        {iconMap[cat.icon]}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{cat.name}</p>
                        <p className="text-xs text-muted-foreground">{over ? 'Over budget' : `${pct}% used`}</p>
                      </div>
                    </div>
                    <span className={cn('text-sm font-semibold', over && 'text-destructive')}>{formatCompact(cat.spent, currency)}</span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={pct} className="h-2"
                      style={{ '--progress-color': over ? 'hsl(var(--destructive))' : `hsl(var(--chart-${cat.color}))` } as React.CSSProperties} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatCurrency(cat.spent, currency, { compact: true })}</span>
                      <span>{formatCurrency(cat.budget, currency, { compact: true })}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
