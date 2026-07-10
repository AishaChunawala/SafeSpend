import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Target,
  Clock,
  Users,
  FileUp,
  Settings,
} from 'lucide-react';

export interface NavConfig {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
}

export const NAV_ITEMS: NavConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'cashflow', label: 'Cashflow Forecast', icon: TrendingUp },
  { id: 'categories', label: 'Categories', icon: PieChart },
  { id: 'goals', label: 'Savings Goals', icon: Target },
  { id: 'time-cost', label: 'Time Cost Calculator', icon: Clock },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'statement', label: 'Statement Upload', icon: FileUp },
  { id: 'settings', label: 'Settings', icon: Settings },
];
