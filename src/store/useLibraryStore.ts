import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { QuizAttempt, SavedQuiz } from '../types/quiz.types';

interface LibraryState {
  quizzes: SavedQuiz[];
  attempts: QuizAttempt[];
  saveQuiz: (quiz: SavedQuiz) => void;
  deleteQuiz: (quizId: string) => void;
  recordAttempt: (attempt: QuizAttempt) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      quizzes: [],
      attempts: [],
      saveQuiz: (quiz) => set((state) => ({ quizzes: [quiz, ...state.quizzes] })),
      deleteQuiz: (quizId) =>
        set((state) => ({
          quizzes: state.quizzes.filter((quiz) => quiz.id !== quizId),
          attempts: state.attempts.filter((attempt) => attempt.quizId !== quizId),
        })),
      recordAttempt: (attempt) => set((state) => ({ attempts: [attempt, ...state.attempts] })),
    }),
    { name: 'exam-helper-library' }
  )
);
