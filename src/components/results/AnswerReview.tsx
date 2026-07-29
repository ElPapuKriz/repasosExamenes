import { CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import type { QuizAttempt, SavedQuiz } from '../../types/quiz.types';

interface AnswerReviewProps {
  quiz: SavedQuiz;
  attempt: QuizAttempt;
}

export function AnswerReview({ quiz, attempt }: AnswerReviewProps) {
  return (
    <div className="space-y-3">
      {attempt.answers.map((answer) => {
        const question = quiz.questions.find((item) => item.id === answer.questionId);
        if (!question) return null;

        return (
          <Card key={answer.questionId} tabColor="none" className="space-y-2">
            <div className="flex items-start gap-2">
              {answer.isCorrect ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
              )}
              <div className="space-y-1">
                <p className="font-medium text-ink">{question.prompt}</p>
                <p className="text-sm text-ink/60">Tu respuesta: {answer.userAnswer}</p>
                {answer.feedback && <p className="text-sm text-ink/50">{answer.feedback}</p>}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
