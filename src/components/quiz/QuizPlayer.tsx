import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Button } from '../ui/Button';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { FeedbackBanner } from './FeedbackBanner';
import { useQuizPlayer } from '../../hooks/useQuizPlayer';
import { useCountdown } from '../../hooks/useCountdown';
import type { QuizAttempt, SavedQuiz } from '../../types/quiz.types';

interface QuizPlayerProps {
  quiz: SavedQuiz;
  onFinish: (attempt: QuizAttempt) => void;
}

export function QuizPlayer({ quiz, onFinish }: QuizPlayerProps) {
  const player = useQuizPlayer(quiz);
  const isTimed = quiz.config.timeMode === 'timed';
  const totalSeconds = (quiz.config.timeLimitMinutes ?? 15) * 60;
  const { secondsLeft, isFinished } = useCountdown(totalSeconds, isTimed);

  useEffect(() => {
    if (isTimed && isFinished) {
      onFinish(player.finishAttempt());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimed, isFinished]);

  if (!player.currentQuestion) return null;

  const handleNext = () => {
    if (player.isLastQuestion) {
      onFinish(player.finishAttempt());
    } else {
      player.goToNextQuestion();
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-6">
      <QuizHeader current={player.currentIndex + 1} total={player.totalQuestions} secondsLeft={isTimed ? secondsLeft : null} />

      <AnimatePresence mode="wait">
        <motion.div
          key={player.currentQuestion.id}
          initial={{ opacity: 0, rotateX: -8, y: 12 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, rotateX: 8, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <QuestionCard
            question={player.currentQuestion}
            isAnswered={player.lastFeedback !== null}
            isGrading={player.isGrading}
            onSubmit={player.submitAnswer}
          />
        </motion.div>
      </AnimatePresence>

      {player.lastFeedback && (
        <>
          <FeedbackBanner isCorrect={player.lastFeedback.isCorrect} feedback={player.lastFeedback.feedback} />
          <div className="flex justify-center">
            <Button onClick={handleNext}>{player.isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta'}</Button>
          </div>
        </>
      )}
    </div>
  );
}
