import { create } from 'zustand';
import type { QuizConfig, SourceFileMeta } from '../types/quiz.types';

export type ProcessingStage = 'idle' | 'reading' | 'summarizing' | 'ready' | 'error';

const defaultConfig: QuizConfig = {
  questionCount: 10,
  openClosedBalance: 50,
  timeMode: 'free',
  timeLimitMinutes: 15,
};

interface SessionState {
  files: SourceFileMeta[];
  summary: string;
  stage: ProcessingStage;
  errorMessage: string | null;
  config: QuizConfig;
  setFiles: (files: SourceFileMeta[]) => void;
  setStage: (stage: ProcessingStage) => void;
  setSummary: (summary: string) => void;
  setError: (message: string) => void;
  setConfig: (config: QuizConfig) => void;
  reset: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  files: [],
  summary: '',
  stage: 'idle',
  errorMessage: null,
  config: defaultConfig,
  setFiles: (files) => set({ files }),
  setStage: (stage) => set({ stage }),
  setSummary: (summary) => set({ summary }),
  setError: (message) => set({ errorMessage: message, stage: 'error' }),
  setConfig: (config) => set({ config }),
  reset: () =>
    set({
      files: [],
      summary: '',
      stage: 'idle',
      errorMessage: null,
      config: defaultConfig,
    }),
}));
