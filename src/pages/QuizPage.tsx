import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { QuizPlayer } from '../components/quiz/QuizPlayer';
import { useLibraryStore } from '../store/useLibraryStore';

export default function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useLibraryStore((state) => state.quizzes.find((item) => item.id === quizId));

  if (!quiz) {
    return (
      <EmptyState
        title="No encontramos este quiz"
        description="Puede que haya sido eliminado de tu biblioteca"
        action={
          <Link to="/biblioteca">
            <Button>Ir a mi biblioteca</Button>
          </Link>
        }
      />
    );
  }

  return <QuizPlayer quiz={quiz} onFinish={(attempt) => navigate(`/resultados/${attempt.id}`)} />;
}
