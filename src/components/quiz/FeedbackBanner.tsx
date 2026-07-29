import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface FeedbackBannerProps {
  isCorrect: boolean;
  feedback?: string;
}

export function FeedbackBanner({ isCorrect, feedback }: FeedbackBannerProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-2xl px-5 py-4',
        isCorrect ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'
      )}
    >
      {isCorrect ? (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
      ) : (
        <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
      )}
      <div>
        <p className="font-semibold">{isCorrect ? '¡Correcto!' : 'No es correcto'}</p>
        {feedback && <p className="text-sm opacity-80">{feedback}</p>}
      </div>
    </div>
  );
}
