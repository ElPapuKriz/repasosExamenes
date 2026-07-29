export type QuestionType = 'open' | 'closed';

export interface ClosedOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: ClosedOption[];
  correctOptionId?: string;
  referenceAnswer?: string;
}

export type TimeMode = 'free' | 'timed';

export interface QuizConfig {
  questionCount: number;
  openClosedBalance: number; // 0 = solo cerradas, 100 = solo abiertas
  timeMode: TimeMode;
  timeLimitMinutes?: number;
}

export type SourceFileType = 'pdf' | 'docx' | 'pptx';

export interface SourceFileMeta {
  id: string;
  name: string;
  type: SourceFileType;
  sizeKb: number;
}

export interface SavedQuiz {
  id: string;
  title: string;
  createdAt: string;
  sourceFiles: SourceFileMeta[];
  config: QuizConfig;
  questions: QuizQuestion[];
  summary: string;
}

export interface QuestionAnswerRecord {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  completedAt: string;
  scorePercent: number;
  totalQuestions: number;
  correctCount: number;
  durationSeconds: number;
  answers: QuestionAnswerRecord[];
}
