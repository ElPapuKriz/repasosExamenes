import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Dropzone } from '../components/upload/Dropzone';
import { FileBadge } from '../components/upload/FileBadge';
import { ProcessingStatus } from '../components/upload/ProcessingStatus';
import { useFileProcessing } from '../hooks/useFileProcessing';
import { useSessionStore } from '../store/useSessionStore';

export default function UploadPage() {
  const navigate = useNavigate();
  const files = useSessionStore((state) => state.files);
  const stage = useSessionStore((state) => state.stage);
  const errorMessage = useSessionStore((state) => state.errorMessage);
  const { processFiles } = useFileProcessing();

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-6">
      <header className="space-y-2 text-center">
        <h1 className="font-display text-3xl text-ink">Sube tus apuntes</h1>
        <p className="text-ink/60">Convierte tu material de estudio en un quiz para reforzar antes del examen</p>
      </header>

      <Card>
        <Dropzone onFilesSelected={processFiles} />
        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {files.map((file) => (
              <FileBadge key={file.id} file={file} />
            ))}
          </div>
        )}
      </Card>

      <ProcessingStatus stage={stage} />
      {errorMessage && <p className="text-center text-sm text-danger">{errorMessage}</p>}

      <div className="flex justify-center">
        <Button disabled={stage !== 'ready'} onClick={() => navigate('/configurar')}>
          Continuar
        </Button>
      </div>
    </div>
  );
}
