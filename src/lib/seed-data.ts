import type {
  Transaction,
  Category,
  SavingsGoal,
  Subscription,
  FamilyMember,
  CashflowPoint,
  MonthlyTrendPoint,
  RunwayEvent,
} from '@/types';

export const MONTHLY_INCOME = 100000;
export const FIXED_EXPENSES = 43000;
export const SUBSCRIPTIONS_TOTAL = 2646;
export const SAVINGS_GOAL = 15000;
export const DISCRETIONARY_SPENT = 28100;
export const SAFE_TO_SPEND = 11254;
export const TODAY = new Date().getDate();

export const transactions: Transaction[] = [
  { id: 't1', name: 'Salary Credit', category: 'Income', amount: 100000, type: 'income', date: '2026-07-01', merchant: 'Acme Corp' },
  { id: 't2', name: 'Rent — 3BHK Bandra', category: 'Housing', amount: 28000, type: 'expense', date: '2026-07-02', merchant: 'Landlord' },
  { id: 't3', name: 'Netflix Premium', category: 'Entertainment', amount: 649, type: 'subscription', date: '2026-07-03' },
  { id: 't4', name: 'Spotify Family', category: 'Entertainment', amount: 199, type: 'subscription', date: '2026-07-03' },
  { id: 't5', name: 'Groceries — Nature Basket', category: 'Food', amount: 4200, type: 'expense', date: '2026-07-04', merchant: 'Nature Basket' },
  { id: 't6', name: 'Uber Rides', category: 'Transport', amount: 1850, type: 'expense', date: '2026-07-05', merchant: 'Uber' },
  { id: 't7', name: 'Electricity Bill', category: 'Utilities', amount: 3200, type: 'expense', date: '2026-07-05', merchant: 'Adani Electricity' },
  { id: 't8', name: 'Dinner — Bombay Canteen', category: 'Dining', amount: 3800, type: 'expense', date: '2026-07-06', merchant: 'Bombay Canteen' },
  { id: 't9', name: 'Amazon Prime', category: 'Entertainment', amount: 299, type: 'subscription', date: '2026-07-07' },
  { id: 't10', name: 'Gym Membership', category: 'Health', amount: 1800, type: 'expense', date: '2026-07-08', merchant: 'Cult.fit' },
  { id: 't11', name: 'Coffee — Blue Tokai', category: 'Dining', amount: 480, type: 'expense', date: '2026-07-08', merchant: 'Blue Tokai' },
  { id: 't12', name: 'Mobile Recharge', category: 'Utilities', amount: 799, type: 'expense', date: '2026-07-09', merchant: 'Jio' },
  { id: 't13', name: 'Movie — PVR INOX', category: 'Entertainment', amount: 1200, type: 'expense', date: '2026-07-09', merchant: 'PVR' },
  { id: 't14', name: 'Fuel — HP Pump', category: 'Transport', amount: 3500, type: 'expense', date: '2026-07-10', merchant: 'HP' },
  { id: 't15', name: 'Zomato Order', category: 'Dining', amount: 920, type: 'expense', date: '2026-07-10', merchant: 'Zomato' },
  { id: 't16', name: 'Adobe Creative Cloud', category: 'Software', amount: 1425, type: 'subscription', date: '2026-07-12' },
  { id: 't17', name: 'Notion Plus', category: 'Software', amount: 800, type: 'subscription', date: '2026-07-12' },
  { id: 't18', name: 'Shopping — Westside', category: 'Shopping', amount: 5400, type: 'expense', date: '2026-07-11', merchant: 'Westside' },
  { id: 't19', name: 'Pharmacy — Apollo', category: 'Health', amount: 650, type: 'expense', date: '2026-07-11', merchant: 'Apollo' },
  { id: 't20', name: 'Savings Transfer', category: 'Savings', amount: 15000, type: 'expense', date: '2026-07-05', merchant: 'HDFC' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'Housing', icon: 'Home', budget: 28000, spent: 28000, color: '1' },
  { id: 'c2', name: 'Food', icon: 'ShoppingCart', budget: 8000, spent: 4200, color: '2' },
  { id: 'c3', name: 'Transport', icon: 'Car', budget: 6000, spent: 5350, color: '3' },
  { id: 'c4', name: 'Dining', icon: 'UtensilsCrossed', budget: 6000, spent: 5200, color: '5' },
  { id: 'c5', name: 'Entertainment', icon: 'Clapperboard', budget: 3000, spent: 2348, color: '4' },
  { id: 'c6', name: 'Utilities', icon: 'Zap', budget: 5000, spent: 3999, color: '6' },
  { id: 'c7', name: 'Health', icon: 'HeartPulse', budget: 3000, spent: 2450, color: '1' },
  { id: 'c8', name: 'Shopping', icon: 'ShoppingBag', budget: 5000, spent: 5400, color: '3' },
  { id: 'c9', name: 'Software', icon: 'Code', budget: 2500, spent: 2225, color: '2' },
];

export const savingsGoals: SavingsGoal[] = [
  { id: 'g1', name: 'Emergency Fund', target: 300000, current: 185000, deadline: '2026-12-31', icon: 'ShieldCheck', color: '1' },
  { id: 'g2', name: 'Japan Trip', target: 250000, current: 92000, deadline: '2027-03-15', icon: 'Plane', color: '2' },
  { id: 'g3', name: 'New MacBook', target: 180000, current: 142000, deadline: '2026-09-01', icon: 'Laptop', color: '3' },
  { id: 'g4', name: 'Wedding Fund', target: 500000, current: 210000, deadline: '2027-12-01', icon: 'Heart', color: '5' },
];

export const subscriptions: Subscription[] = [
  { id: 's1', name: 'Netflix Premium', amount: 649, cycle: 'monthly', nextCharge: '2026-08-03', category: 'Entertainment' },
  { id: 's2', name: 'Spotify Family', amount: 199, cycle: 'monthly', nextCharge: '2026-08-03', category: 'Entertainment' },
  { id: 's3', name: 'Amazon Prime', amount: 299, cycle: 'monthly', nextCharge: '2026-08-07', category: 'Entertainment' },
  { id: 's4', name: 'Adobe Creative Cloud', amount: 1425, cycle: 'monthly', nextCharge: '2026-08-12', category: 'Software' },
  { id: 's5', name: 'Notion Plus', amount: 800, cycle: 'monthly', nextCharge: '2026-08-12', category: 'Software' },
  { id: 's6', name: 'iCloud 200GB', amount: 75, cycle: 'monthly', nextCharge: '2026-08-15', category: 'Utilities' },
  { id: 's7', name: 'ChatGPT Plus', amount: 1640, cycle: 'monthly', nextCharge: '2026-08-20', category: 'Software' },
  { id: 's8', name: 'Google One', amount: 210, cycle: 'monthly', nextCharge: '2026-08-22', category: 'Utilities' },
];

export const familyMembers: FamilyMember[] = [
  { id: 'f1', name: 'Aarav (You)', role: 'parent', avatar: 'A' },
  { id: 'f2', name: 'Priya', role: 'parent', avatar: 'P' },
  { id: 'f3', name: 'Kiara', role: 'child', avatar: 'K', allowance: 3000, spent: 1200, saved: 1800, goalName: 'New Bicycle', goalTarget: 6000, goalCurrent: 1800 },
  { id: 'f4', name: 'Vivaan', role: 'child', avatar: 'V', allowance: 2500, spent: 1900, saved: 600, goalName: 'Gaming Console', goalTarget: 30000, goalCurrent: 3200 },
];

export const cashflowForecast: CashflowPoint[] = (() => {
  const arr: CashflowPoint[] = [];
  let running = 0;
  for (let i = 0; i < 31; i++) {
    const day = i + 1;
    let inflow = 0;
    let outflow = 0;
    if (day === 1) inflow = 100000;
    if (day === 2) outflow += 28000;
    if (day === 3) outflow += 848;
    if (day === 5) outflow += 18999;
    if (day === 7) outflow += 299;
    if (day === 12) outflow += 2225;
    if (day === 15) outflow += 75;
    if (day === 20) outflow += 1640;
    if (day === 22) outflow += 210;
    if (day === 25) outflow += 5000;
    if (day === 28) outflow += 4000;
    running += inflow - outflow;
    arr.push({ day, inflow, outflow, balance: running });
  }
  return arr;
})();

export const monthlyTrend: MonthlyTrendPoint[] = [
  { month: 'Feb', income: 100000, expenses: 71000, savings: 12000 },
  { month: 'Mar', income: 100000, expenses: 78000, savings: 11000 },
  { month: 'Apr', income: 105000, expenses: 73000, savings: 14000 },
  { month: 'May', income: 100000, expenses: 82000, savings: 9000 },
  { month: 'Jun', income: 100000, expenses: 76000, savings: 13000 },
  { month: 'Jul', income: 100000, expenses: 73746, savings: 15000 },
];

export const runwayEvents: RunwayEvent[] = [
  { day: 1, label: 'Salary', amount: 100000, type: 'income' },
  { day: 2, label: 'Rent', amount: 28000, type: 'fixed' },
  { day: 3, label: 'Netflix + Spotify', amount: 848, type: 'subscription' },
  { day: 5, label: 'Bills + Savings', amount: 18999, type: 'fixed' },
  { day: 7, label: 'Amazon Prime', amount: 299, type: 'subscription' },
  { day: 12, label: 'Adobe + Notion', amount: 2225, type: 'subscription' },
  { day: 15, label: 'iCloud', amount: 75, type: 'subscription' },
  { day: 20, label: 'ChatGPT Plus', amount: 1640, type: 'subscription' },
  { day: 22, label: 'Google One', amount: 210, type: 'subscription' },
  { day: 25, label: 'Discretionary', amount: 5000, type: 'discretionary' },
  { day: 28, label: 'Discretionary', amount: 4000, type: 'discretionary' },
];
