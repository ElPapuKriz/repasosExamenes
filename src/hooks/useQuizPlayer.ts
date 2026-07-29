import { useCallback, useState } from 'react';
import { puterAiProvider } from '../lib/ai/puterAiProvider';
import { createId } from '../lib/utils/createId';
import { useLibraryStore } from '../store/useLibraryStore';
import type { QuestionAnswerRecord, QuizAttempt, SavedQuiz } from '../types/quiz.types';

interface AnswerFeedback {
  isCorrect: boolean;
  feedback?: string;
}

export function useQuizPlayer(quiz: SavedQuiz) {
  const recordAttempt = useLibraryStore((state) => state.recordAttempt);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswerRecord[]>([]);
  const [lastFeedback, setLastFeedback] = useState<AnswerFeedback | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const currentQuestion = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const submitAnswer = useCallback(
    async (userAnswer: string) => {
      if (!currentQuestion) return;
      setIsGrading(true);

      const result: AnswerFeedback =
        currentQuestion.type === 'closed'
          ? { isCorrect: userAnswer === currentQuestion.correctOptionId }
          : await puterAiProvider.gradeOpenAnswer(currentQuestion, userAnswer);

      const record: QuestionAnswerRecord = {
        questionId: currentQuestion.id,
        userAnswer,
        isCorrect: result.isCorrect,
        feedback: result.feedback,
      };

      setAnswers((previous) => [...previous, record]);
      setLastFeedback(result);
      setIsGrading(false);
    },
    [currentQuestion]
  );

  const goToNextQuestion = useCallback(() => {
    setLastFeedback(null);
    setCurrentIndex((index) => index + 1);
  }, []);

  const finishAttempt = useCallback((): QuizAttempt => {
    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    const scorePercent = quiz.questions.length > 0 ? Math.round((correctCount / quiz.questions.length) * 100) : 0;

    const attempt: QuizAttempt = {
      id: createId(),
      quizId: quiz.id,
      quizTitle: quiz.title,
      completedAt: new Date().toISOString(),
      scorePercent,
      totalQuestions: quiz.questions.length,
      correctCount,
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
      answers,
    };

    recordAttempt(attempt);
    return attempt;
  }, [answers, quiz.id, quiz.questions.length, quiz.title, recordAttempt, startedAt]);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: quiz.questions.length,
    isLastQuestion,
    lastFeedback,
    isGrading,
    submitAnswer,
    goToNextQuestion,
    finishAttempt,
  };
}
