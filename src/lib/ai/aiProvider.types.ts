import type { QuizConfig, QuizQuestion } from '../../types/quiz.types';

export interface GradingResult {
  isCorrect: boolean;
  feedback: string;
}

export interface ClosingFeedbackInput {
  scorePercent: number;
  totalQuestions: number;
  correctCount: number;
}

export interface AiProvider {
  summarize: (rawText: string) => Promise<string>;
  generateQuestions: (summary: string, config: QuizConfig) => Promise<QuizQuestion[]>;
  gradeOpenAnswer: (question: QuizQuestion, userAnswer: string) => Promise<GradingResult>;
  generateClosingFeedback: (input: ClosingFeedbackInput) => Promise<string>;
}
