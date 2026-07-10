import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calculator, Coffee, Zap } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { formatCurrency, convert } from '@/lib/format';
import { MONTHLY_INCOME } from '@/lib/seed-data';

const WORK_HOURS_PER_MONTH = 160;
const HOURLY_RATE_INR = MONTHLY_INCOME / WORK_HOURS_PER_MONTH;

const presets = [
  { label: 'Coffee ₹400', value: 400 },
  { label: 'Movie ₹600', value: 600 },
  { label: 'Sneakers ₹4,000', value: 4000 },
  { label: 'iPhone ₹80,000', value: 80000 },
];

export function TimeCostPage() {
  const { currency } = useApp();
  const [amount, setAmount] = useState('');

  const hours = useMemo(() => {
    const n = parseFloat(amount);
    if (!n || n <= 0) return 0;
    const inrValue = currency === 'USD' ? n / 0.012 : n;
    return inrValue / HOURLY_RATE_INR;
  }, [amount, currency]);

  const days = hours / 8;
  const coffees = hours > 0 ? Math.round((parseFloat(amount) || 0) / convert(400, currency)) : 0;

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <GlassCard padding="lg" className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl brand-bg"><Calculator className="h-5 w-5 text-white" /></div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Time Cost Calculator</h3>
            <p className="text-sm text-muted-foreground">How many hours of work does this purchase really cost?</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Purchase amount ({currency})</label>
          <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="h-12 text-lg glass border-border/50" />
          <div className="flex flex-wrap gap-2 mt-3">
            {presets.map((p) => (
              <button key={p.label} onClick={() => setAmount(String(Math.round(convert(p.value, currency))))}
                className="text-xs px-3 py-1.5 rounded-full glass border-border/50 text-muted-foreground hover:text-foreground hover:border-brand/30 transition-colors">
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {hours > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-brand/5 border border-brand/20 text-center">
              <Clock className="h-7 w-7 mx-auto mb-2 brand-text" />
              <p className="text-3xl font-bold brand-text">{hours < 1 ? hours.toFixed(1) : Math.round(hours)}h</p>
              <p className="text-xs text-muted-foreground mt-1">of work</p>
            </div>
            <div className="p-5 rounded-2xl bg-chart-4/10 border border-chart-4/20 text-center">
              <Zap className="h-7 w-7 mx-auto mb-2 text-chart-4" />
              <p className="text-3xl font-bold text-chart-4">{days < 1 ? days.toFixed(1) : Math.round(days * 10) / 10}d</p>
              <p className="text-xs text-muted-foreground mt-1">of work days</p>
            </div>
            <div className="p-5 rounded-2xl bg-chart-3/10 border border-chart-3/20 text-center">
              <Coffee className="h-7 w-7 mx-auto mb-2 text-chart-3" />
              <p className="text-3xl font-bold text-chart-3">{coffees}</p>
              <p className="text-xs text-muted-foreground mt-1">coffees worth</p>
            </div>
          </motion.div>
        )}

        {hours > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl bg-muted/30 text-sm text-muted-foreground leading-relaxed">
            At your income of {formatCurrency(MONTHLY_INCOME, currency, { compact: true })}/month (~{formatCurrency(HOURLY_RATE_INR, currency, { compact: true })}/hour), this purchase costs you{' '}
            <span className="font-semibold text-foreground">{hours < 1 ? `${hours.toFixed(1)} hours` : `${Math.round(hours)} hours`}</span> of your life. Is it worth that time?
          </motion.div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /><span>Based on 160 working hours/month at your monthly income</span>
        </div>
      </GlassCard>
    </div>
  );
}
