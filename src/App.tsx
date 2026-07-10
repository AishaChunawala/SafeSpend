import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, LogOut } from 'lucide-react';
import { AppProvider, useApp } from '@/context/AppContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CashflowPage } from '@/pages/CashflowPage';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { SavingsGoalsPage } from '@/pages/SavingsGoalsPage';
import { TimeCostPage } from '@/pages/TimeCostPage';
import { FamilyPage } from '@/pages/FamilyPage';
import { StatementPage } from '@/pages/StatementPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { Button } from '@/components/ui/button';

function AuthGate() {
  const { authLoading, session, signOut } = useApp();
  const [activeId, setActiveId] = useState('dashboard');

  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl brand-gradient brand-glow">
            <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading SafeSpend...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!session) {
    return <LandingPage />;
  }

  const renderPage = () => {
    switch (activeId) {
      case 'dashboard':
        return <DashboardPage />;
      case 'cashflow':
        return <CashflowPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'goals':
        return <SavingsGoalsPage />;
      case 'time-cost':
        return <TimeCostPage />;
      case 'family':
        return <FamilyPage />;
      case 'statement':
        return <StatementPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="relative">
      <AppLayout activeId={activeId} onNavigate={setActiveId}>
        {renderPage()}
      </AppLayout>
      <Button
        variant="ghost"
        size="sm"
        onClick={signOut}
        className="fixed bottom-4 right-4 z-50 glass border-border/50 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4 mr-1.5" />
        Sign Out
      </Button>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AuthGate />
    </AppProvider>
  );
}

export default App;
