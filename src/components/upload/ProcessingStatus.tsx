import { Loader2 } from 'lucide-react';
import type { ProcessingStage } from '../../store/useSessionStore';

const messageByStage: Record<ProcessingStage, string> = {
  idle: '',
  reading: 'Leyendo tus documentos...',
  summarizing: 'Identificando las ideas más importantes...',
  ready: '¡Listo! Ya entendí tu material.',
  error: 'Algo salió mal.',
};

export function ProcessingStatus({ stage }: { stage: ProcessingStage }) {
  if (stage === 'idle') return null;

  const isLoading = stage === 'reading' || stage === 'summarizing';

  return (
    <div className="flex items-center gap-3 rounded-2xl bg-primary/5 px-5 py-4 text-primary">
      {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
      <span className="font-medium">{messageByStage[stage]}</span>
    </div>
  );
}
