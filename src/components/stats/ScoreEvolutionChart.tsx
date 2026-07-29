import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card } from '../ui/Card';

interface ChartPoint {
  attempt: number;
  score: number;
  title: string;
  date: string;
}

export function ScoreEvolutionChart({ data }: { data: ChartPoint[] }) {
  return (
    <Card>
      <p className="mb-4 font-semibold text-ink/70">Puntaje por intento</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#23213B15" />
            <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) => [`${value}%`, "Puntaje"]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.title ?? `Intento ${label}`}
            />
            <Line type="monotone" dataKey="score" stroke="#6C63FF" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
