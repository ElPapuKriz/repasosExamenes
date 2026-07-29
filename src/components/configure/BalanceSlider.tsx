import { cn } from '../../lib/utils/cn';
import { rangeThumbClassName } from '../../lib/utils/rangeInputStyles';
import { splitQuestionTypes } from '../../lib/utils/quizMath';

interface BalanceSliderProps {
  questionCount: number;
  value: number;
  onChange: (value: number) => void;
}

export function BalanceSlider({ questionCount, value, onChange }: BalanceSliderProps) {
  const { openCount, closedCount } = splitQuestionTypes(questionCount, value);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span className="text-primary">{closedCount} cerradas</span>
        <span className="text-accent-warm">{openCount} abiertas</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-linear-to from-primary to-accent-warm',
          rangeThumbClassName
        )}
      />
      <p className="text-center text-xs text-ink/40">
        Desliza a la izquierda para más preguntas cerradas, a la derecha para más abiertas
      </p>
    </div>
  );
}
