import { Card } from '../ui/Card';
import { formatDuration } from '../../lib/utils/quizMath';
import type { QuizAttempt } from '../../types/quiz.types';

interface ScoreSummaryProps {
  attempt: QuizAttempt;
  closingFeedback: string;
}

export function ScoreSummary({ attempt, closingFeedback }: ScoreSummaryProps) {
  return (
    <Card tabColor="success" className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink/40">Tu resultado</p>
      <p className="mt-2 font-display text-6xl text-primary">{attempt.scorePercent}%</p>
      <p className="mt-1 text-ink/60">
        {attempt.correctCount} de {attempt.totalQuestions} correctas · {formatDuration(attempt.durationSeconds)}
      </p>
      {closingFeedback && (
        <p className="mt-4 rounded-2xl bg-primary/5 p-4 text-sm text-ink/70">{closingFeedback}</p>
      )}
    </Card>
  );
}
