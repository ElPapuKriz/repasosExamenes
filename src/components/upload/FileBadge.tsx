import { FileText, Presentation } from 'lucide-react';
import type { SourceFileMeta } from '../../types/quiz.types';

const iconByType = {
  pdf: FileText,
  docx: FileText,
  pptx: Presentation,
};

export function FileBadge({ file }: { file: SourceFileMeta }) {
  const Icon = iconByType[file.type];

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-4 py-2">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-ink">{file.name}</span>
      <span className="text-xs text-ink/40">{file.sizeKb} KB</span>
    </div>
  );
}
