import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

type TabColor = 'primary' | 'warm' | 'success' | 'danger' | 'none';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tabColor?: TabColor;
}

const tabColorClassNames: Record<TabColor, string> = {
  primary: 'bg-primary',
  warm: 'bg-accent-warm',
  success: 'bg-success',
  danger: 'bg-danger',
  none: 'hidden',
};

export function Card({ tabColor = 'primary', className, children, ...props }: CardProps) {
  return (
    <div className={cn('relative rounded-3xl bg-white p-6 shadow-soft', className)} {...props}>
      <span className={cn('absolute -top-2 left-6 h-2 w-10 rounded-full', tabColorClassNames[tabColor])} />
      {children}
    </div>
  );
}
