import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { RangeSlider } from '../components/ui/RangeSlider';
import { BalanceSlider } from '../components/configure/BalanceSlider';
import { TimerConfig } from '../components/configure/TimerConfig';
import { useQuizGeneration } from '../hooks/useQuizGeneration';
import { useSessionStore } from '../store/useSessionStore';

export default function ConfigurePage() {
  const navigate = useNavigate();
  const summary = useSessionStore((state) => state.summary);
  const savedConfig = useSessionStore((state) => state.config);
  const [config, setConfig] = useState(savedConfig);
  const [title, setTitle] = useState('');
  const { generate, isGenerating, error } = useQuizGeneration();

  useEffect(() => {
    if (!summary) navigate('/', { replace: true });
  }, [summary, navigate]);

  const handleGenerate = async () => {
    const quiz = await generate(title, config);
    if (quiz) navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-3xl text-ink">Personaliza tu quiz</h1>
        <p className="text-ink/60">Elige cuántas preguntas quieres y de qué tipo</p>
      </header>

      <Card tabColor="warm" className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink/70" htmlFor="quiz-title">
            Título del quiz
          </label>
          <input
            id="quiz-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ej. Repaso Historia — Capítulo 4"
            className="w-full rounded-2xl border-2 border-ink/10 px-4 py-3 text-ink outline-none transition-colors focus:border-primary"
          />
        </div>

        <RangeSlider
          label="Cantidad de preguntas"
          min={5}
          max={20}
          value={config.questionCount}
          onChange={(questionCount) => setConfig({ ...config, questionCount })}
        />

        <BalanceSlider
          questionCount={config.questionCount}
          value={config.openClosedBalance}
          onChange={(openClosedBalance) => setConfig({ ...config, openClosedBalance })}
        />

        <TimerConfig config={config} onChange={setConfig} />
      </Card>

      {error && <p className="text-center text-sm text-danger">{error}</p>}

      <div className="flex justify-center">
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? 'Generando preguntas...' : 'Generar quiz'}
        </Button>
      </div>
    </div>
  );
}
