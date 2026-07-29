import { useCallback, useState } from 'react';
import { puterAiProvider } from '../lib/ai/puterAiProvider';
import { createId } from '../lib/utils/createId';
import { useLibraryStore } from '../store/useLibraryStore';
import { useSessionStore } from '../store/useSessionStore';
import type { QuizConfig, SavedQuiz } from '../types/quiz.types';

export function useQuizGeneration() {
  const summary = useSessionStore((state) => state.summary);
  const files = useSessionStore((state) => state.files);
  const resetSession = useSessionStore((state) => state.reset);
  const saveQuiz = useLibraryStore((state) => state.saveQuiz);

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (title: string, config: QuizConfig): Promise<SavedQuiz | null> => {
      setIsGenerating(true);
      setError(null);

      try {
        const questions = await puterAiProvider.generateQuestions(summary, config);

        const quiz: SavedQuiz = {
          id: createId(),
          title: title.trim() || `Quiz de repaso · ${new Date().toLocaleDateString('es-PE')}`,
          createdAt: new Date().toISOString(),
          sourceFiles: files,
          config,
          questions,
          summary,
        };

        saveQuiz(quiz);
        resetSession();
        return quiz;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'No se pudo generar el quiz. Intenta de nuevo.');
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    [summary, files, saveQuiz, resetSession]
  );

  return { generate, isGenerating, error };
}
