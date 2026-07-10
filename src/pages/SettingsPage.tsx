import { Moon, Sun, Globe, Bell, Shield, User, Palette } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { theme, toggleTheme, currency, setCurrency } = useApp();

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <GlassCard padding="lg" className="flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-brand/30">
          <AvatarFallback className="brand-bg text-white text-xl font-semibold">A</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Aarav Sharma</h3>
          <p className="text-sm text-muted-foreground">aarav@example.com</p>
        </div>
        <Button variant="outline" className="glass border-border/50"><User className="h-4 w-4 mr-2" />Edit Profile</Button>
      </GlassCard>

      <GlassCard padding="lg" className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5"><Palette className="h-5 w-5 text-muted-foreground" /><h3 className="text-lg font-semibold tracking-tight">Appearance</h3></div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </span>
            <div><p className="text-sm font-medium">Theme</p><p className="text-xs text-muted-foreground">Currently {theme === 'dark' ? 'Dark' : 'Light'} mode</p></div>
          </div>
          <div className="flex gap-2">
            <Button variant={theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => theme !== 'light' && toggleTheme()} className={cn(theme === 'light' && 'brand-bg text-white')}>
              <Sun className="h-4 w-4 mr-1" />Light
            </Button>
            <Button variant={theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => theme !== 'dark' && toggleTheme()} className={cn(theme === 'dark' && 'brand-bg text-white')}>
              <Moon className="h-4 w-4 mr-1" />Dark
            </Button>
          </div>
        </div>
      </GlassCard>

      <GlassCard padding="lg" className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5"><Globe className="h-5 w-5 text-muted-foreground" /><h3 className="text-lg font-semibold tracking-tight">Currency</h3></div>
        <div className="flex items-center justify-between py-2">
          <div><p className="text-sm font-medium">Display currency</p><p className="text-xs text-muted-foreground">Switch between INR and USD instantly</p></div>
          <Select value={currency} onValueChange={(v) => setCurrency(v as 'INR' | 'USD')}>
            <SelectTrigger className="w-32 glass border-border/50"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="INR">₹ Indian Rupee</SelectItem>
              <SelectItem value="USD">$ US Dollar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassCard>

      <GlassCard padding="lg" className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 mb-2"><Bell className="h-5 w-5 text-muted-foreground" /><h3 className="text-lg font-semibold tracking-tight">Notifications</h3></div>
        {[
          { label: 'Bill reminders', desc: 'Get notified before bills are due', on: true },
          { label: 'Safe-to-Spend alerts', desc: 'Weekly summary of your spending buffer', on: true },
          { label: 'Goal milestones', desc: 'When you hit savings milestones', on: true },
          { label: 'Subscription renewals', desc: 'Before subscriptions renew', on: false },
          { label: 'Overspending warnings', desc: 'When a category exceeds its budget', on: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2.5 border-t border-border/30 first:border-0">
            <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
            <Switch defaultChecked={item.on} />
          </div>
        ))}
      </GlassCard>

      <GlassCard padding="lg" className="flex flex-col gap-2">
        <div className="flex items-center gap-2.5 mb-2"><Shield className="h-5 w-5 text-muted-foreground" /><h3 className="text-lg font-semibold tracking-tight">Security</h3></div>
        {[
          { label: 'Two-factor authentication', desc: 'Extra security with OTP', on: true },
          { label: 'Biometric login', desc: 'Face ID or fingerprint', on: true },
          { label: 'Transaction PIN', desc: 'Required for purchases over ₹5,000', on: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between py-2.5 border-t border-border/30 first:border-0">
            <div><p className="text-sm font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
            <Switch defaultChecked={item.on} />
          </div>
        ))}
      </GlassCard>

      <p className="text-center text-xs text-muted-foreground py-2">SafeSpend v1.0 · Your data stays private and encrypted</p>
    </div>
  );
}
