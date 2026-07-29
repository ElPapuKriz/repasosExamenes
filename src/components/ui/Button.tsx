import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark shadow-soft',
  secondary: 'bg-white text-ink border-2 border-primary/20 hover:border-primary/50',
  ghost: 'bg-transparent text-ink/70 hover:bg-ink/5',
  danger: 'bg-danger text-white hover:bg-danger/90',
};

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50',
        variantClassNames[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
