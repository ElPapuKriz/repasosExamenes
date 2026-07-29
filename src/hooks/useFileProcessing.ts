import { useCallback } from 'react';
import { detectFileType, parseFile } from '../lib/parsing';
import { puterAiProvider } from '../lib/ai/puterAiProvider';
import { useSessionStore } from '../store/useSessionStore';
import type { SourceFileMeta } from '../types/quiz.types';

export function useFileProcessing() {
  const setFiles = useSessionStore((state) => state.setFiles);
  const setStage = useSessionStore((state) => state.setStage);
  const setSummary = useSessionStore((state) => state.setSummary);
  const setError = useSessionStore((state) => state.setError);

  const processFiles = useCallback(
    async (fileList: File[]) => {
      const validFiles = fileList.filter((file) => detectFileType(file) !== null);
      if (validFiles.length === 0) {
        setError('Solo se aceptan archivos PDF, DOCX o PPTX.');
        return;
      }

      const filesMeta: SourceFileMeta[] = validFiles.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        type: detectFileType(file)!,
        sizeKb: Math.round(file.size / 1024),
      }));

      setFiles(filesMeta);
      setStage('reading');

      try {
        const texts = await Promise.all(validFiles.map((file) => parseFile(file)));
        const combinedText = texts.join('\n\n---\n\n');

        setStage('summarizing');
        const summary = await puterAiProvider.summarize(combinedText);

        setSummary(summary);
        setStage('ready');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'No se pudo procesar los archivos.');
      }
    },
    [setFiles, setStage, setSummary, setError]
  );

  return { processFiles };
}
