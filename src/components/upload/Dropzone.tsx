import { useRef, useState, type DragEvent } from 'react';
import { motion } from 'motion/react';
import { UploadCloud } from 'lucide-react';
import { cn } from '../../lib/utils/cn';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

const ACCEPTED_EXTENSIONS = '.pdf,.docx,.pptx';

export function Dropzone({ onFilesSelected }: DropzoneProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    onFilesSelected(Array.from(event.dataTransfer.files));
  };

  return (
    <motion.div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-12 text-center transition-colors',
        isDraggingOver ? 'border-primary bg-primary/5' : 'border-ink/15 bg-white'
      )}
    >
      <UploadCloud className="h-10 w-10 text-primary" strokeWidth={1.5} />
      <p className="font-display text-lg text-ink">Arrastra tus apuntes aquí</p>
      <p className="text-sm text-ink/50">PDF, Word o PowerPoint · o haz clic para elegir archivos</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS}
        className="hidden"
        onChange={(event) => onFilesSelected(Array.from(event.target.files ?? []))}
      />
    </motion.div>
  );
}
