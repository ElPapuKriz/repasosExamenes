interface OpenAnswerInputProps {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export function OpenAnswerInput({ value, disabled, onChange }: OpenAnswerInputProps) {
  return (
    <textarea
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Escribe tu respuesta..."
      rows={4}
      className="w-full rounded-2xl border-2 border-ink/10 px-4 py-3 text-ink outline-none transition-colors focus:border-primary disabled:opacity-60"
    />
  );
}
