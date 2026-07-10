import {
  Wallet, TrendingUp, Repeat, PiggyBank, CreditCard, ShieldCheck, ArrowLeftRight,
  Plane, Laptop, ShieldCheck as Shield, Heart,
} from 'lucide-react';
import { SafeToSpendHero } from '@/components/dashboard/SafeToSpendHero';
import { MonthRunway } from '@/components/dashboard/MonthRunway';
import { PurchaseAdvisor } from '@/components/dashboard/PurchaseAdvisor';
import { StatCard } from '@/components/common/StatCard';
import { GlassCard } from '@/components/common/GlassCard';
import { CategoryPieChart } from '@/components/charts/CategoryPieChart';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCompact, formatDate } from '@/lib/format';
import {
  MONTHLY_INCOME, FIXED_EXPENSES, SUBSCRIPTIONS_TOTAL, SAVINGS_GOAL,
  DISCRETIONARY_SPENT, SAFE_TO_SPEND, transactions, categories, savingsGoals,
} from '@/lib/seed-data';

const goalIcons: Record<string, React.ReactNode> = {
  ShieldCheck: <Shield className="h-5 w-5 text-white" />,
  Plane: <Plane className="h-5 w-5 text-white" />,
  Laptop: <Laptop className="h-5 w-5 text-white" />,
  Heart: <Heart className="h-5 w-5 text-white" />,
};

export function DashboardPage() {
  const { currency } = useApp();
  const recentTx = transactions.slice(0, 6);
  const pieData = categories.filter((c) => c.spent > 0).map((c) => ({ name: c.name, value: c.spent, color: c.color }));

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2"><SafeToSpendHero /></div>
        <div className="lg:col-span-3"><MonthRunway /></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Monthly Income" amountInr={MONTHLY_INCOME} icon={<TrendingUp style={{ width: 18, height: 18 }} />} delta={0} accent="green" />
        <StatCard label="Fixed Expenses" amountInr={FIXED_EXPENSES} icon={<Wallet style={{ width: 18, height: 18 }} />} delta={-3} accent="rose" />
        <StatCard label="Subscriptions" amountInr={SUBSCRIPTIONS_TOTAL} icon={<Repeat style={{ width: 18, height: 18 }} />} delta={2} accent="violet" />
        <StatCard label="Savings" amountInr={SAVINGS_GOAL} icon={<PiggyBank style={{ width: 18, height: 18 }} />} delta={15} accent="brand" />
        <StatCard label="Discretionary" amountInr={DISCRETIONARY_SPENT} icon={<CreditCard style={{ width: 18, height: 18 }} />} delta={-8} accent="amber" />
        <StatCard label="Safe-to-Spend" amountInr={SAFE_TO_SPEND} icon={<ShieldCheck style={{ width: 18, height: 18 }} />} hint="this month" accent="brand" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <PurchaseAdvisor />
        <GlassCard padding="lg" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">Cashflow</h3>
              <p className="text-sm text-muted-foreground">Net flow this month</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-chart-6">
                {formatCurrency(MONTHLY_INCOME - FIXED_EXPENSES - SUBSCRIPTIONS_TOTAL - DISCRETIONARY_SPENT - SAVINGS_GOAL, currency, { compact: true, sign: true })}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-chart-6/10">
              <p className="text-xs text-muted-foreground mb-1">Total Inflow</p>
              <p className="text-xl font-bold text-chart-6">{formatCompact(MONTHLY_INCOME, currency)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/10">
              <p className="text-xs text-muted-foreground mb-1">Total Outflow</p>
              <p className="text-xl font-bold text-destructive">
                {formatCompact(FIXED_EXPENSES + SUBSCRIPTIONS_TOTAL + DISCRETIONARY_SPENT + SAVINGS_GOAL, currency)}
              </p>
            </div>
          </div>
          <div className="space-y-2 mt-2">
            {[
              { label: 'Fixed Expenses', value: FIXED_EXPENSES, color: 'hsl(var(--chart-5))' },
              { label: 'Subscriptions', value: SUBSCRIPTIONS_TOTAL, color: 'hsl(var(--chart-4))' },
              { label: 'Discretionary', value: DISCRETIONARY_SPENT, color: 'hsl(var(--chart-1))' },
              { label: 'Savings', value: SAVINGS_GOAL, color: 'hsl(var(--chart-6))' },
            ].map((item) => {
              const total = FIXED_EXPENSES + SUBSCRIPTIONS_TOTAL + DISCRETIONARY_SPENT + SAVINGS_GOAL;
              const pct = (item.value / total) * 100;
              return (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{formatCompact(item.value, currency)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: item.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="lg:col-span-2 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold tracking-tight">Recent Transactions</h3>
            <span className="text-xs text-muted-foreground">{transactions.length} this month</span>
          </div>
          <div className="flex flex-col divide-y divide-border/30">
            {recentTx.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-3 first:pt-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${tx.type === 'income' ? 'bg-chart-6/10 text-chart-6' : tx.type === 'subscription' ? 'bg-chart-4/10 text-chart-4' : 'bg-muted text-muted-foreground'}`}>
                    {tx.type === 'income' ? <TrendingUp className="h-4 w-4" /> : tx.type === 'subscription' ? <Repeat className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} · {formatDate(tx.date)}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-chart-6' : ''}`}>
                  {tx.type === 'income' ? '+' : '-'}{formatCompact(tx.amount, currency)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-tight">Category Breakdown</h3>
          <CategoryPieChart data={pieData} height={200} />
          <div className="grid grid-cols-2 gap-2">
            {pieData.slice(0, 6).map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: `hsl(var(--chart-${c.color}))` }} />
                <span className="text-muted-foreground truncate">{c.name}</span>
                <span className="font-medium ml-auto">{formatCompact(c.value, currency)}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div>
        <h3 className="text-lg font-semibold tracking-tight mb-3">Goals Progress</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savingsGoals.map((goal) => (
            <GlassCard key={goal.id} hover padding="md" className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ background: `hsl(var(--chart-${goal.color}))` }}>
                    {goalIcons[goal.icon] ?? <PiggyBank className="h-5 w-5 text-white" />}
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">{goal.name}</p>
                    <p className="text-xs text-muted-foreground">by {formatDate(goal.deadline)}</p>
                  </div>
                </div>
                <span className="text-lg font-bold">{Math.round((goal.current / goal.target) * 100)}%</span>
              </div>
              <div className="space-y-1.5">
                <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%`, background: `hsl(var(--chart-${goal.color}))` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{formatCurrency(goal.current, currency, { compact: true })}</span>
                  <span>{formatCurrency(goal.target, currency, { compact: true })}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
