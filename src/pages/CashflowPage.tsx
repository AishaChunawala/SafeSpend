import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { StatCard } from '@/components/common/StatCard';
import { CashflowAreaChart } from '@/components/charts/CashflowAreaChart';
import { TrendBarChart } from '@/components/charts/TrendBarChart';
import { useApp } from '@/context/AppContext';
import { formatCompact } from '@/lib/format';
import {
  cashflowForecast, monthlyTrend, MONTHLY_INCOME, FIXED_EXPENSES,
  SUBSCRIPTIONS_TOTAL, DISCRETIONARY_SPENT, SAVINGS_GOAL, runwayEvents, TODAY,
} from '@/lib/seed-data';

export function CashflowPage() {
  const { currency } = useApp();
  const netCashflow = MONTHLY_INCOME - FIXED_EXPENSES - SUBSCRIPTIONS_TOTAL - DISCRETIONARY_SPENT - SAVINGS_GOAL;
  const endBalance = cashflowForecast[cashflowForecast.length - 1].balance;
  const lowestBalance = Math.min(...cashflowForecast.map((p) => p.balance));
  const lowestDay = cashflowForecast.find((p) => p.balance === lowestBalance)?.day;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Net Cashflow" amountInr={netCashflow} icon={<Wallet style={{ width: 18, height: 18 }} />} accent="brand" hint="this month" />
        <StatCard label="Projected End Balance" amountInr={endBalance} icon={<TrendingUp style={{ width: 18, height: 18 }} />} accent="green" />
        <StatCard label="Lowest Point" amountInr={lowestBalance} icon={<TrendingDown style={{ width: 18, height: 18 }} />} accent="amber" hint={`Day ${lowestDay}`} />
        <StatCard label="Savings Rate" amountInr={SAVINGS_GOAL} icon={<Calendar style={{ width: 18, height: 18 }} />} accent="violet" hint={`${Math.round((SAVINGS_GOAL / MONTHLY_INCOME) * 100)}% of income`} />
      </div>

      <GlassCard padding="lg" className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">31-Day Cashflow Forecast</h3>
          <p className="text-sm text-muted-foreground">Projected balance after every committed expense and subscription</p>
        </div>
        <CashflowAreaChart data={cashflowForecast} height={320} />
      </GlassCard>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard padding="lg" className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Monthly Spending Trend</h3>
            <p className="text-sm text-muted-foreground">Income vs expenses vs savings</p>
          </div>
          <TrendBarChart data={monthlyTrend} height={280} />
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-tight">Upcoming Cashflow Events</h3>
          <div className="flex flex-col divide-y divide-border/30">
            {runwayEvents.filter((e) => e.day >= TODAY).map((event, i) => (
              <div key={i} className="flex items-center justify-between py-3 first:pt-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
                    style={{
                      background: event.type === 'income' ? 'hsl(var(--chart-6) / 0.1)' : event.type === 'fixed' ? 'hsl(var(--chart-5) / 0.1)' : event.type === 'subscription' ? 'hsl(var(--chart-4) / 0.1)' : 'hsl(var(--chart-1) / 0.1)',
                      color: event.type === 'income' ? 'hsl(var(--chart-6))' : event.type === 'fixed' ? 'hsl(var(--chart-5))' : event.type === 'subscription' ? 'hsl(var(--chart-4))' : 'hsl(var(--chart-1))',
                    }}>
                    {event.type === 'income' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{event.label}</p>
                    <p className="text-xs text-muted-foreground">Day {event.day}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${event.type === 'income' ? 'text-chart-6' : ''}`}>
                  {event.type === 'income' ? '+' : '-'}{formatCompact(event.amount, currency)}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
