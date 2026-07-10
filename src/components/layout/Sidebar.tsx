import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { NAV_ITEMS } from '@/config/navigation';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeId, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden lg:flex h-screen sticky top-0 w-64 flex-col border-r border-border/40 glass px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl brand-gradient brand-glow">
          <ShieldCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">SafeSpend</h1>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Spend Smart</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-brand/10 border border-brand/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <Icon className="relative shrink-0" style={{ width: 18, height: 18 }} />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto px-2">
        <div className="glass-card p-4">
          <p className="text-xs font-medium text-muted-foreground mb-1">Safe-to-Spend Tip</p>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Wait 24 hours before any purchase over ₹2,000. You&apos;ll skip 40% of impulse buys.
          </p>
        </div>
      </div>
    </aside>
  );
}
