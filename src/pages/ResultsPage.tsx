import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AnswerReview } from '../components/results/AnswerReview';
import { ScoreSummary } from '../components/results/ScoreSummary';
import { puterAiProvider } from '../lib/ai/puterAiProvider';
import { useLibraryStore } from '../store/useLibraryStore';

export default function ResultsPage() {
  const { attemptId } = useParams();
  const attempt = useLibraryStore((state) => state.attempts.find((item) => item.id === attemptId));
  const quiz = useLibraryStore((state) => state.quizzes.find((item) => item.id === attempt?.quizId));
  const [closingFeedback, setClosingFeedback] = useState('');

  useEffect(() => {
    if (!attempt) return;
    puterAiProvider
      .generateClosingFeedback({
        scorePercent: attempt.scorePercent,
        totalQuestions: attempt.totalQuestions,
        correctCount: attempt.correctCount,
      })
      .then(setClosingFeedback)
      .catch(() => setClosingFeedback(''));
  }, [attempt]);

  if (!attempt || !quiz) {
    return <p className="pt-16 text-center text-ink/50">No encontramos este resultado.</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-6">
      <ScoreSummary attempt={attempt} closingFeedback={closingFeedback} />
      <AnswerReview quiz={quiz} attempt={attempt} />
      <div className="flex justify-center gap-3">
        <Link to={`/quiz/${quiz.id}`}>
          <Button variant="secondary">Volver a intentar</Button>
        </Link>
        <Link to="/estadisticas">
          <Button>Ver estadísticas</Button>
        </Link>
      </div>
    </div>
  );
}
