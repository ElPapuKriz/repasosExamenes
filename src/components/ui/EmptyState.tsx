import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      <p className="text-ink/60">{description}</p>
      {action}
    </div>
  );
}
