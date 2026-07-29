import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { ScoreEvolutionChart } from '../components/stats/ScoreEvolutionChart';
import { StatsOverviewCards } from '../components/stats/StatsOverviewCards';
import { useLibraryStore } from '../store/useLibraryStore';

export default function StatsPage() {
  const attempts = useLibraryStore((state) => state.attempts);

  const chartData = useMemo(
    () =>
      [...attempts].reverse().map((attempt, index) => ({
        attempt: index + 1,
        score: attempt.scorePercent,
        title: attempt.quizTitle,
        date: new Date(attempt.completedAt).toLocaleDateString('es-PE'),
      })),
    [attempts]
  );

  if (attempts.length === 0) {
    return (
      <EmptyState
        title="Todavía no hay estadísticas"
        description="Resuelve un quiz para empezar a ver tu evolución"
        action={
          <Link to="/">
            <Button>Crear un quiz</Button>
          </Link>
        }
      />
    );
  }

  const averageScore = Math.round(attempts.reduce((sum, attempt) => sum + attempt.scorePercent, 0) / attempts.length);
  const bestScore = Math.max(...attempts.map((attempt) => attempt.scorePercent));

  return (
    <div className="mx-auto max-w-3xl space-y-6 pt-6">
      <header className="text-center">
        <h1 className="font-display text-3xl text-ink">Tu evolución</h1>
        <p className="text-ink/60">Así has mejorado a lo largo de tus repasos</p>
      </header>
      <StatsOverviewCards totalAttempts={attempts.length} averageScore={averageScore} bestScore={bestScore} />
      <ScoreEvolutionChart data={chartData} />
    </div>
  );
}
