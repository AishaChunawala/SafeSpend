import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertTriangle, XCircle, Baby, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { formatCurrency } from '@/lib/format';
import { SAFE_TO_SPEND } from '@/lib/seed-data';
import type { PurchaseAdvice } from '@/types';
import { cn } from '@/lib/utils';

const stateConfig = {
  safe: { icon: CheckCircle2, color: 'hsl(var(--chart-6))', bg: 'bg-chart-6/10', border: 'border-chart-6/30' },
  tight: { icon: AlertTriangle, color: 'hsl(var(--chart-3))', bg: 'bg-chart-3/10', border: 'border-chart-3/30' },
  skip: { icon: XCircle, color: 'hsl(var(--destructive))', bg: 'bg-destructive/10', border: 'border-destructive/30' },
  child: { icon: Baby, color: 'hsl(var(--chart-4))', bg: 'bg-chart-4/10', border: 'border-chart-4/30' },
};

function evaluatePurchase(amount: number): PurchaseAdvice {
  const remaining = SAFE_TO_SPEND;
  const ratio = amount / remaining;

  if (amount > 50000) {
    return {
      state: 'child',
      title: 'Talk to your parents',
      message: "This is a big purchase. If you're a child using Family Mode, ask a parent before spending this much. Adults should sleep on it for 48 hours.",
      actions: ['Ask a parent for permission', 'Wait 48 hours', 'Compare 3 alternatives'],
    };
  }

  if (ratio <= 0.25) {
    return {
      state: 'safe',
      title: 'You are safe to spend',
      message: `This is only ${Math.round(ratio * 100)}% of your safe-to-spend buffer. Go ahead — your bills and savings are already covered.`,
      actions: ['Buy it now', 'Add to next month budget if recurring'],
    };
  }

  if (ratio <= 0.6) {
    return {
      state: 'tight',
      title: "It's a little tight",
      message: `This uses ${Math.round(ratio * 100)}% of your remaining buffer. You can afford it, but discretionary spending for the rest of the month will be lean.`,
      actions: ['Wait 24 hours', 'Trim another category by 10%', 'Split the cost across 2 months'],
    };
  }

  return {
    state: 'skip',
    title: 'Skip it for now',
    message: `This would eat ${Math.round(ratio * 100)}% of your safe-to-spend. After this, you'd only have ${formatCurrency(remaining - amount, 'INR', { compact: true })} left for the rest of the month.`,
    actions: ['Delay until next month', 'Find a cheaper alternative', 'Add to a savings goal'],
  };
}

const examples = [
  { label: 'Dinner ₹800', text: 'Dinner ₹800' },
  { label: 'Weekend Trip ₹18,000', text: 'Weekend Trip ₹18000' },
  { label: 'Sneakers ₹1,200', text: 'Sneakers ₹1200' },
];

function parseAmount(input: string): number | null {
  const match = input.match(/(\d[\d,]*)/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ''), 10);
}

export function PurchaseAdvisor() {
  const { currency } = useApp();
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState<PurchaseAdvice | null>(null);
  const [parsedAmount, setParsedAmount] = useState<number>(0);

  const handleEvaluate = (text?: string) => {
    const value = text ?? input;
    const amount = parseAmount(value);
    if (!amount) return;
    setParsedAmount(amount);
    setAdvice(evaluatePurchase(amount));
  };

  const cfg = advice ? stateConfig[advice.state] : null;
  const Icon = cfg?.icon;

  return (
    <GlassCard padding="lg" className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl brand-bg">
          <Sparkles className="text-white" style={{ width: 18, height: 18 }} />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Smart Purchase Advisor</h3>
          <p className="text-xs text-muted-foreground">Should you buy it? Tell us what you&apos;re thinking.</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEvaluate()}
          placeholder="I want to buy..."
          className="h-11 glass border-border/50 text-base"
          aria-label="Purchase description"
        />
        <Button onClick={() => handleEvaluate()} className="h-11 px-5 brand-bg text-white hover:opacity-90" size="lg">
          Check
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex.label}
            onClick={() => { setInput(ex.label); handleEvaluate(ex.text); }}
            className="text-xs px-3 py-1.5 rounded-full glass border-border/50 text-muted-foreground hover:text-foreground hover:border-brand/30 transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {advice && cfg && Icon && (
          <motion.div
            key={advice.state}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={cn('rounded-2xl p-5 border', cfg.bg, cfg.border)}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl shrink-0" style={{ background: cfg.color, color: 'white' }}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-semibold" style={{ color: cfg.color }}>{advice.title}</h4>
                  <span className="text-sm font-bold whitespace-nowrap">{formatCurrency(parsedAmount, currency, { compact: true })}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{advice.message}</p>
                <div className="space-y-1.5">
                  {advice.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm" style={{ color: cfg.color }}>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!advice && (
        <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
          <span className="text-center">
            Your safe-to-spend is{' '}
            <span className="font-semibold brand-text">{formatCurrency(SAFE_TO_SPEND, currency, { compact: true })}</span>
            . Try an example above.
          </span>
        </div>
      )}
    </GlassCard>
  );
}
