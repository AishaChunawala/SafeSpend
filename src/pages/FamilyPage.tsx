import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Wallet, PiggyBank, ShieldCheck, TrendingUp, Star, Gift, Target, Sparkles,
} from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { StatCard } from '@/components/common/StatCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { formatCurrency, formatCompact } from '@/lib/format';
import { familyMembers, MONTHLY_INCOME, FIXED_EXPENSES, DISCRETIONARY_SPENT, SAFE_TO_SPEND } from '@/lib/seed-data';
import { cn } from '@/lib/utils';

export function FamilyPage() {
  const { familyMode, setFamilyMode, activeChildId, setActiveChildId, currency } = useApp();
  const children = familyMembers.filter((m) => m.role === 'child');
  const activeChild = familyMembers.find((m) => m.id === activeChildId) ?? children[0];
  const combinedSpending = FIXED_EXPENSES + DISCRETIONARY_SPENT + 5000;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <Tabs value={familyMode} onValueChange={(v) => setFamilyMode(v as 'parent' | 'child')}>
        <TabsList className="glass">
          <TabsTrigger value="parent" className="data-[state=active]:bg-brand/10">Parent View</TabsTrigger>
          <TabsTrigger value="child" className="data-[state=active]:bg-brand/10">Child View</TabsTrigger>
        </TabsList>

        <TabsContent value="parent" className="mt-6">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Household Income" amountInr={MONTHLY_INCOME} icon={<TrendingUp style={{ width: 18, height: 18 }} />} accent="green" />
              <StatCard label="Combined Spending" amountInr={combinedSpending} icon={<Wallet style={{ width: 18, height: 18 }} />} accent="rose" delta={-5} />
              <StatCard label="Members" amountInr={familyMembers.length * 1000} icon={<Users style={{ width: 18, height: 18 }} />} accent="blue" hint={`${familyMembers.length} people`} />
              <StatCard label="Family Safe-to-Spend" amountInr={SAFE_TO_SPEND} icon={<ShieldCheck style={{ width: 18, height: 18 }} />} accent="brand" />
            </div>

            <GlassCard padding="lg" className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold tracking-tight">Family Members</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {familyMembers.map((member) => (
                  <div key={member.id} className="p-4 rounded-2xl bg-muted/30 flex flex-col items-center gap-2 text-center">
                    <Avatar className="h-14 w-14 border-2 border-brand/30">
                      <AvatarFallback className="brand-bg text-white text-lg font-semibold">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full', member.role === 'parent' ? 'bg-brand/10 text-brand' : 'bg-chart-4/10 text-chart-4')}>
                        {member.role === 'parent' ? 'Parent' : 'Child'}
                      </span>
                    </div>
                    {member.role === 'child' && member.allowance && (
                      <p className="text-xs text-muted-foreground">Allowance: {formatCompact(member.allowance, currency)}</p>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>

            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-3">Children</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {children.map((child) => {
                  const spentPct = child.allowance ? Math.round((child.spent! / child.allowance) * 100) : 0;
                  const goalPct = child.goalTarget ? Math.round((child.goalCurrent! / child.goalTarget) * 100) : 0;
                  return (
                    <GlassCard key={child.id} hover padding="lg" className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-brand/30">
                          <AvatarFallback className="brand-bg text-white font-semibold">{child.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold">{child.name}</p>
                          <p className="text-xs text-muted-foreground">Child account</p>
                        </div>
                        <Button variant="outline" size="sm" className="glass border-border/50"
                          onClick={() => { setActiveChildId(child.id); setFamilyMode('child'); }}>
                          View as Child
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-3 rounded-xl bg-muted/30">
                          <Wallet className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Allowance</p>
                          <p className="text-sm font-semibold">{formatCompact(child.allowance ?? 0, currency)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-destructive/10">
                          <TrendingUp className="h-4 w-4 mx-auto mb-1 text-destructive rotate-180" />
                          <p className="text-xs text-muted-foreground">Spent</p>
                          <p className="text-sm font-semibold text-destructive">{formatCompact(child.spent ?? 0, currency)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-chart-6/10">
                          <PiggyBank className="h-4 w-4 mx-auto mb-1 text-chart-6" />
                          <p className="text-xs text-muted-foreground">Saved</p>
                          <p className="text-sm font-semibold text-chart-6">{formatCompact(child.saved ?? 0, currency)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Allowance used</span><span className="font-medium">{spentPct}%</span></div>
                          <Progress value={spentPct} className="h-2" style={{ '--progress-color': 'hsl(var(--chart-3))' } as React.CSSProperties} />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{child.goalName}</span><span className="font-medium">{goalPct}%</span></div>
                          <Progress value={goalPct} className="h-2" style={{ '--progress-color': 'hsl(var(--chart-1))' } as React.CSSProperties} />
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="child" className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeChild?.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex flex-col gap-6">
              {children.length > 1 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Viewing as:</span>
                  {children.map((child) => (
                    <button key={child.id} onClick={() => setActiveChildId(child.id)}
                      className={cn('flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                        activeChildId === child.id ? 'brand-bg text-white' : 'glass border-border/50 text-muted-foreground hover:text-foreground')}>
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className={cn('text-xs font-semibold', activeChildId === child.id ? 'bg-white/20 text-white' : 'brand-bg text-white')}>{child.avatar}</AvatarFallback>
                      </Avatar>
                      {child.name}
                    </button>
                  ))}
                </div>
              )}

              <GlassCard padding="lg" glow className="relative overflow-hidden">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-20 blur-3xl brand-bg" />
                <div className="relative flex flex-col items-center text-center gap-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 brand-text" />
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Hi {activeChild?.name?.split(' ')[0]}! You can safely spend</span>
                  </div>
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl sm:text-6xl font-bold tracking-tight brand-text">
                    {formatCurrency(activeChild?.saved ?? 0, currency)}
                  </motion.div>
                  <p className="text-sm text-muted-foreground max-w-xs">That&apos;s your saved money! Spend it wisely on things you really want.</p>
                </div>
              </GlassCard>

              <div className="grid grid-cols-3 gap-4">
                <GlassCard padding="md" className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-3/15 text-chart-3"><Gift className="h-6 w-6" /></span>
                  <p className="text-xs text-muted-foreground">My Allowance</p>
                  <p className="text-xl font-bold">{formatCompact(activeChild?.allowance ?? 0, currency)}</p>
                </GlassCard>
                <GlassCard padding="md" className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chart-6/15 text-chart-6"><PiggyBank className="h-6 w-6" /></span>
                  <p className="text-xs text-muted-foreground">My Savings</p>
                  <p className="text-xl font-bold text-chart-6">{formatCompact(activeChild?.saved ?? 0, currency)}</p>
                </GlassCard>
                <GlassCard padding="md" className="flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 brand-text"><Target className="h-6 w-6" /></span>
                  <p className="text-xs text-muted-foreground">My Goal</p>
                  <p className="text-xl font-bold">{formatCompact(activeChild?.goalCurrent ?? 0, currency)}</p>
                </GlassCard>
              </div>

              <GlassCard padding="lg" className="flex flex-col gap-4">
                <div className="flex items-center gap-2.5"><Star className="h-5 w-5 text-chart-3" /><h3 className="text-lg font-semibold tracking-tight">My Savings Goal</h3></div>
                {activeChild?.goalName && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-lg">{activeChild.goalName}</p>
                        <p className="text-sm text-muted-foreground">{formatCompact(activeChild.goalCurrent ?? 0, currency)} of {formatCompact(activeChild.goalTarget ?? 0, currency)}</p>
                      </div>
                      <span className="text-2xl font-bold brand-text">{Math.round(((activeChild.goalCurrent ?? 0) / (activeChild.goalTarget ?? 1)) * 100)}%</span>
                    </div>
                    <div className="h-4 rounded-full bg-muted overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, ((activeChild.goalCurrent ?? 0) / (activeChild.goalTarget ?? 1)) * 100)}%` }} transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full brand-gradient relative">
                        <div className="absolute inset-0 flex items-center justify-end pr-2">
                          <span className="text-xs font-bold text-white">{formatCompact((activeChild.goalTarget ?? 0) - (activeChild.goalCurrent ?? 0), currency)} to go</span>
                        </div>
                      </motion.div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">Keep saving! You&apos;re doing great. Every {formatCompact(100, currency)} you save gets you closer to your {activeChild.goalName}.</p>
                  </>
                )}
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
