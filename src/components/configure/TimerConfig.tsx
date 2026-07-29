import { cn } from '../../lib/utils/cn';
import { RangeSlider } from '../ui/RangeSlider';
import type { QuizConfig } from '../../types/quiz.types';

interface TimerConfigProps {
  config: QuizConfig;
  onChange: (config: QuizConfig) => void;
}

export function TimerConfig({ config, onChange }: TimerConfigProps) {
  return (
    <div className="space-y-4">
      <span className="text-sm font-semibold text-ink/70">Tiempo para resolver</span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...config, timeMode: 'free' })}
          className={cn(
            'flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-colors',
            config.timeMode === 'free' ? 'border-primary bg-primary/10 text-primary' : 'border-ink/10 text-ink/50'
          )}
        >
          Tiempo libre
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...config, timeMode: 'timed' })}
          className={cn(
            'flex-1 rounded-2xl border-2 px-4 py-3 text-sm font-semibold transition-colors',
            config.timeMode === 'timed' ? 'border-primary bg-primary/10 text-primary' : 'border-ink/10 text-ink/50'
          )}
        >
          Con tiempo
        </button>
      </div>

      {config.timeMode === 'timed' && (
        <RangeSlider
          label="Minutos totales"
          min={5}
          max={90}
          step={5}
          value={config.timeLimitMinutes ?? 15}
          valueLabel={`${config.timeLimitMinutes ?? 15} min`}
          onChange={(timeLimitMinutes) => onChange({ ...config, timeLimitMinutes })}
        />
      )}
    </div>
  );
}
