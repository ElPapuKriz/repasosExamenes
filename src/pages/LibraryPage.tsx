import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { SavedQuizCard } from '../components/library/SavedQuizCard';
import { useLibraryStore } from '../store/useLibraryStore';

export default function LibraryPage() {
  const quizzes = useLibraryStore((state) => state.quizzes);
  const attempts = useLibraryStore((state) => state.attempts);
  const deleteQuiz = useLibraryStore((state) => state.deleteQuiz);

  if (quizzes.length === 0) {
    return (
      <EmptyState
        title="Aún no tienes quizzes guardados"
        description="Sube tus apuntes para crear tu primer quiz de repaso"
        action={
          <Link to="/">
            <Button>Crear mi primer quiz</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pt-6">
      <header className="text-center">
        <h1 className="font-display text-3xl text-ink">Mi biblioteca</h1>
        <p className="text-ink/60">Vuelve a repasar cualquiera de tus quizzes</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        {quizzes.map((quiz) => {
          const lastAttempt = attempts.find((attempt) => attempt.quizId === quiz.id);
          return (
            <SavedQuizCard key={quiz.id} quiz={quiz} lastAttempt={lastAttempt} onDelete={() => deleteQuiz(quiz.id)} />
          );
        })}
      </div>
    </div>
  );
}
