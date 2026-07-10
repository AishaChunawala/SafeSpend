import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, TrendingUp, Wallet, PieChart, Target, Users,
  Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const features = [
  { icon: ShieldCheck, title: 'Safe-to-Spend', desc: 'Know exactly how much you can spend freely after every bill and savings goal is covered.' },
  { icon: TrendingUp, title: 'Cashflow Forecast', desc: 'See your balance across the entire month — every subscription, bill, and income event mapped.' },
  { icon: PieChart, title: 'Smart Categories', desc: 'Auto-categorized spending with budgets that alert you before you overspend.' },
  { icon: Target, title: 'Savings Goals', desc: 'Visual progress toward every goal — emergency fund, vacation, gadgets, and more.' },
  { icon: Wallet, title: 'Purchase Advisor', desc: 'Ask before you buy. Get instant advice on whether a purchase fits your budget.' },
  { icon: Users, title: 'Family Mode', desc: 'Parent and child views with allowances, savings goals, and kid-friendly guidance.' },
];

export function LandingPage() {
  const { signIn, signUp } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    if (mode === 'login') {
      const { error: err } = await signIn(email, password);
      if (err) setError(err);
    } else {
      const { error: err } = await signUp(email, password);
      if (err) {
        setError(err);
      } else {
        setSuccess('Account created! You can now sign in.');
        setMode('login');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Hero / Marketing */}
      <div className="relative flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 lg:py-20 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-10 blur-3xl brand-bg" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-5 blur-3xl bg-chart-4" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient brand-glow">
              <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">SafeSpend</h1>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Spend Smart, Save Smarter</p>
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
            Know your{' '}
            <span className="brand-text">Safe-to-Spend</span>{' '}
            before you swipe.
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
            SafeSpend calculates how much you can freely spend after every bill, subscription, and savings goal is covered — so you never overspend again.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl brand-bg shrink-0">
                    <Icon className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="font-semibold text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Right: Auth Form */}
      <div className="lg:w-[480px] xl:w-[520px] flex items-center justify-center px-6 py-12 lg:py-20 border-t lg:border-t-0 lg:border-l border-border/40 glass">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold tracking-tight mb-1">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {mode === 'login'
                ? 'Sign in to access your dashboard.'
                : 'Start spending smart in under a minute.'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex p-1 rounded-xl glass border border-border/40 mb-6">
            <button
              onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                mode === 'login' ? 'brand-bg text-white' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); setSuccess(null); }}
              className={cn(
                'flex-1 py-2 text-sm font-medium rounded-lg transition-all',
                mode === 'signup' ? 'brand-bg text-white' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="pl-10 h-11 glass border-border/50"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="pl-10 h-11 glass border-border/50"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-chart-6/10 border border-chart-6/30 text-sm text-chart-6"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 brand-bg text-white hover:opacity-90 disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(null); setSuccess(null); }}
              className="font-medium brand-text hover:underline"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
