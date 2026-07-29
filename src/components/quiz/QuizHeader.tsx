import { Clock } from 'lucide-react';
import { formatClock } from '../../lib/utils/quizMath';

interface QuizHeaderProps {
  current: number;
  total: number;
  secondsLeft: number | null;
}

export function QuizHeader({ current, total, secondsLeft }: QuizHeaderProps) {
  const progressPercent = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-ink/60">
        <span>
          Pregunta {current} de {total}
        </span>
        {secondsLeft !== null && (
          <span className="flex items-center gap-1 font-mono text-primary">
            <Clock className="h-4 w-4" /> {formatClock(secondsLeft)}
          </span>
        )}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-ink/5">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
