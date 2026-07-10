export type Currency = 'INR' | 'USD';
export type Theme = 'dark' | 'light';
export type TransactionType = 'income' | 'expense' | 'subscription';

export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: TransactionType;
  date: string;
  merchant?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  budget: number;
  spent: number;
  color: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
  color: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  cycle: 'monthly' | 'yearly';
  nextCharge: string;
  category: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role: 'parent' | 'child';
  avatar: string;
  allowance?: number;
  spent?: number;
  saved?: number;
  goalName?: string;
  goalTarget?: number;
  goalCurrent?: number;
}

export interface CashflowPoint {
  day: number;
  inflow: number;
  outflow: number;
  balance: number;
}

export interface MonthlyTrendPoint {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface RunwayEvent {
  day: number;
  label: string;
  amount: number;
  type: 'income' | 'fixed' | 'subscription' | 'discretionary';
}

export interface PurchaseAdvice {
  state: 'safe' | 'tight' | 'skip' | 'child';
  title: string;
  message: string;
  actions: string[];
}
