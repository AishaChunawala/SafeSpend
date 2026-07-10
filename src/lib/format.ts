import type { Currency } from '@/types';

const INR_TO_USD = 0.012;

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
};

const CURRENCY_LOCALES: Record<Currency, string> = {
  INR: 'en-IN',
  USD: 'en-US',
};

export function convert(amountInr: number, currency: Currency): number {
  return currency === 'USD' ? amountInr * INR_TO_USD : amountInr;
}

export function formatCurrency(
  amountInr: number,
  currency: Currency = 'INR',
  opts: { compact?: boolean; sign?: boolean } = {}
): string {
  const value = convert(amountInr, currency);
  const symbol = CURRENCY_SYMBOLS[currency];
  const locale = CURRENCY_LOCALES[currency];

  if (opts.compact) {
    const abs = Math.abs(value);
    let formatted: string;
    if (abs >= 100000) {
      formatted = (value / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
    } else if (abs >= 1000) {
      formatted = (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    } else {
      formatted = value.toLocaleString(locale, { maximumFractionDigits: 0 });
    }
    const prefix = opts.sign && value > 0 ? '+' : '';
    return `${prefix}${symbol}${formatted}`;
  }

  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const prefix = opts.sign && value > 0 ? '+' : '';
  return `${prefix}${symbol}${formatted}`;
}

export function formatCompact(amountInr: number, currency: Currency = 'INR'): string {
  return formatCurrency(amountInr, currency, { compact: true });
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    ...opts,
  });
}
