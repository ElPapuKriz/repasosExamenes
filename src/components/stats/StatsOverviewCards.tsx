import { Card } from '../ui/Card';

interface StatsOverviewCardsProps {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
}

export function StatsOverviewCards({ totalAttempts, averageScore, bestScore }: StatsOverviewCardsProps) {
  const stats = [
    { label: 'Quizzes resueltos', value: totalAttempts },
    { label: 'Promedio general', value: `${averageScore}%` },
    { label: 'Mejor puntaje', value: `${bestScore}%` },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} tabColor="none" className="text-center">
          <p className="font-mono text-2xl font-bold text-primary">{stat.value}</p>
          <p className="text-xs text-ink/50">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
