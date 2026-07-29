import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import type { QuizAttempt, SavedQuiz } from '../../types/quiz.types';

interface SavedQuizCardProps {
  quiz: SavedQuiz;
  lastAttempt?: QuizAttempt;
  onDelete: () => void;
}

export function SavedQuizCard({ quiz, lastAttempt, onDelete }: SavedQuizCardProps) {
  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg text-ink">{quiz.title}</h3>
        <button type="button" onClick={onDelete} className="text-ink/30 transition-colors hover:text-danger">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <p className="text-sm text-ink/50">{quiz.questions.length} preguntas</p>
      {lastAttempt && (
        <p className="text-sm font-semibold text-primary">Último intento: {lastAttempt.scorePercent}%</p>
      )}
      <Link to={`/quiz/${quiz.id}`} className="inline-block font-semibold text-primary hover:underline">
        Repasar de nuevo →
      </Link>
    </Card>
  );
}
