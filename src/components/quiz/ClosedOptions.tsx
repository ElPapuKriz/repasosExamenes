import { cn } from '../../lib/utils/cn';
import type { ClosedOption } from '../../types/quiz.types';

interface ClosedOptionsProps {
  options: ClosedOption[];
  disabled: boolean;
  onSelect: (optionId: string) => void;
}

export function ClosedOptions({ options, disabled, onSelect }: ClosedOptionsProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option.id)}
          className={cn(
            'w-full rounded-2xl border-2 border-ink/10 px-4 py-3 text-left text-ink transition-colors',
            'hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-60'
          )}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
}
