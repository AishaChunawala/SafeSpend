import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { NAV_ITEMS } from '@/config/navigation';

interface TopBarProps {
  activeId: string;
  onOpenMobile: () => void;
}

export function TopBar({ activeId, onOpenMobile }: TopBarProps) {
  const { theme, toggleTheme, currency, setCurrency } = useApp();
  const activeLabel = NAV_ITEMS.find((n) => n.id === activeId)?.label ?? '';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 glass border-b border-border/40">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobile} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold tracking-tight">{activeLabel}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Select value={currency} onValueChange={(v) => setCurrency(v as 'INR' | 'USD')}>
          <SelectTrigger className="w-[80px] h-9 glass border-border/50 text-sm font-medium">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INR">₹ INR</SelectItem>
            <SelectItem value="USD">$ USD</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="glass border-border/50">
          {theme === 'dark' ? <Sun style={{ width: 18, height: 18 }} /> : <Moon style={{ width: 18, height: 18 }} />}
        </Button>

        <Avatar className="h-9 w-9 border-2 border-brand/30">
          <AvatarFallback className="brand-bg text-white text-sm font-semibold">A</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
