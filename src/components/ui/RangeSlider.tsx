import { cn } from '../../lib/utils/cn';
import { rangeThumbClassName } from '../../lib/utils/rangeInputStyles';

interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  valueLabel?: string;
  onChange: (value: number) => void;
}

export function RangeSlider({ label, value, min, max, step = 1, valueLabel, onChange }: RangeSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink/70">{label}</span>
        <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-sm font-semibold text-primary">
          {valueLabel ?? value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-primary/15 accent-primary',
          rangeThumbClassName
        )}
      />
    </div>
  );
}
