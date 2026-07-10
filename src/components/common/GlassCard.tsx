import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, glow = false, padding = 'md', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'glass-card',
        hover && 'glass-hover',
        glow && 'brand-glow',
        paddingMap[padding],
        className
      )}
      {...props}
    />
  )
);
GlassCard.displayName = 'GlassCard';
