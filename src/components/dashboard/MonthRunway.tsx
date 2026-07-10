import { motion } from 'framer-motion';
import { TrendingUp, Home, Repeat, Wallet, Info } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { useApp } from '@/context/AppContext';
import { formatCompact } from '@/lib/format';
import { runwayEvents, TODAY, SAFE_TO_SPEND } from '@/lib/seed-data';
import type { RunwayEvent, Currency } from '@/types';
import { cn } from '@/lib/utils';

const typeConfig = {
  income: { color: 'hsl(var(--chart-6))', icon: TrendingUp, label: 'Income' },
  fixed: { color: 'hsl(var(--chart-5))', icon: Home, label: 'Fixed' },
  subscription: { color: 'hsl(var(--chart-4))', icon: Repeat, label: 'Subscription' },
  discretionary: { color: 'hsl(var(--chart-1))', icon: Wallet, label: 'Discretionary' },
};

export function MonthRunway() {
  const { currency } = useApp();
  const days = 31;

  return (
    <GlassCard padding="lg" className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Month Runway</h3>
          <p className="text-sm text-muted-foreground">Your financial commitments across July, day by day</p>
        </div>
        <div className="flex items-center gap-3 text-xs flex-wrap">
          {Object.entries(typeConfig).map(([key, cfg]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: cfg.color }} />
              {cfg.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="flex justify-between mb-2 px-1">
          {[1, 5, 10, 15, 20, 25, 31].map((d) => (
            <span key={d} className="text-[10px] text-muted-foreground font-medium">{d}</span>
          ))}
        </div>

        <div className="relative h-32 sm:h-36">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border rounded-full" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-1/2 h-1 rounded-full brand-gradient opacity-40"
            style={{ left: `${((TODAY - 1) / (days - 1)) * 100}%`, right: '0%', transform: 'translateY(-50%)' }}
          />

          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-0 bottom-0 z-20"
            style={{ left: `${((TODAY - 1) / (days - 1)) * 100}%` }}
          >
            <div className="relative h-full flex flex-col items-center">
              <div className="absolute top-0 -translate-x-1/2">
                <div className="brand-bg text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-lg">TODAY</div>
              </div>
              <div className="absolute top-6 bottom-0 w-0.5 brand-bg rounded-full" />
              <div className="absolute bottom-0 -translate-x-1/2 h-3 w-3 rounded-full brand-bg ring-4 ring-brand/20" />
            </div>
          </motion.div>

          {runwayEvents.map((event, i) => (
            <RunwayMarker key={i} event={event} totalDays={days} index={i} currency={currency} />
          ))}
        </div>

        <div className="flex justify-between mt-1 px-1">
          {[1, 5, 10, 15, 20, 25, 31].map((d) => (
            <span key={d} className="text-[10px] text-muted-foreground/60">Day {d}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 p-4 rounded-2xl bg-brand/5 border border-brand/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-bg">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Remaining safe spending</p>
            <p className="text-xl font-bold brand-text">{formatCompact(SAFE_TO_SPEND, currency)}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          <span>Spent freely until month end</span>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Upcoming Commitments</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {runwayEvents.filter((e) => e.day >= TODAY).slice(0, 6).map((event, i) => {
            const cfg = typeConfig[event.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: `${cfg.color}20`, color: cfg.color }}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{event.label}</p>
                  <p className="text-xs text-muted-foreground">Day {event.day}</p>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap">{formatCompact(event.amount, currency)}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

function RunwayMarker({ event, totalDays, index, currency }: { event: RunwayEvent; totalDays: number; index: number; currency: Currency }) {
  const cfg = typeConfig[event.type];
  const left = ((event.day - 1) / (totalDays - 1)) * 100;
  const isPast = event.day < TODAY;
  const above = index % 2 === 0;
  const verticalOffset = above ? -28 : 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: above ? -10 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
      className="absolute top-1/2 z-10"
      style={{ left: `${left}%`, transform: 'translate(-50%, -50%)' }}
    >
      <div
        className={cn('absolute left-1/2 w-0.5 -translate-x-1/2', above ? 'bottom-full mb-1' : 'top-full mt-1')}
        style={{ height: 20, background: isPast ? 'hsl(var(--border))' : cfg.color, opacity: isPast ? 0.4 : 0.6 }}
      />
      <div
        className="h-3 w-3 rounded-full border-2 border-background"
        style={{ background: isPast ? 'hsl(var(--muted-foreground))' : cfg.color, opacity: isPast ? 0.4 : 1 }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium pointer-events-none"
        style={{ top: verticalOffset, color: isPast ? 'hsl(var(--muted-foreground))' : cfg.color, opacity: isPast ? 0.5 : 1 }}
      >
        {formatCompact(event.amount, currency)}
      </div>
    </motion.div>
  );
}
