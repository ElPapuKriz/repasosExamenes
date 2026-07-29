import { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ClosedOptions } from './ClosedOptions';
import { OpenAnswerInput } from './OpenAnswerInput';
import type { QuizQuestion } from '../../types/quiz.types';

interface QuestionCardProps {
  question: QuizQuestion;
  isAnswered: boolean;
  isGrading: boolean;
  onSubmit: (answer: string) => void;
}

export function QuestionCard({ question, isAnswered, isGrading, onSubmit }: QuestionCardProps) {
  const [openAnswer, setOpenAnswer] = useState('');

  return (
    <Card tabColor={question.type === 'open' ? 'warm' : 'primary'}>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink/40">
        {question.type === 'open' ? 'Pregunta abierta' : 'Pregunta cerrada'}
      </span>
      <p className="mt-2 font-display text-xl text-ink">{question.prompt}</p>

      <div className="mt-5">
        {question.type === 'closed' ? (
          <ClosedOptions options={question.options ?? []} disabled={isAnswered || isGrading} onSelect={onSubmit} />
        ) : (
          <div className="space-y-3">
            <OpenAnswerInput value={openAnswer} disabled={isAnswered || isGrading} onChange={setOpenAnswer} />
            {!isAnswered && (
              <Button onClick={() => onSubmit(openAnswer)} disabled={!openAnswer.trim() || isGrading}>
                {isGrading ? 'Revisando...' : 'Responder'}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
