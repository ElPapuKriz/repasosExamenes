import {
  buildClosingFeedbackPrompt,
  buildGradingPrompt,
  buildQuestionsPrompt,
  buildSummaryPrompt,
} from './prompts';
import { createId } from '../utils/createId';
import type { AiProvider, GradingResult } from './aiProvider.types';
import type { QuizQuestion } from '../../types/quiz.types';

async function askPuter(prompt: string): Promise<string> {
  const response = await window.puter.ai.chat(prompt);
  if (typeof response === 'string') return response;
  return response?.message?.content ?? response?.text ?? '';
}

function extractJsonPayload(rawText: string): string {
  const withoutFences = rawText.replace(/```json|```/g, '').trim();
  const firstBracket = withoutFences.search(/[[{]/);
  if (firstBracket === -1) return withoutFences;

  const lastBracket = Math.max(withoutFences.lastIndexOf(']'), withoutFences.lastIndexOf('}'));
  return lastBracket === -1 ? withoutFences : withoutFences.slice(firstBracket, lastBracket + 1);
}

async function askPuterForJson<T>(prompt: string): Promise<T> {
  const rawText = await askPuter(prompt);
  return JSON.parse(extractJsonPayload(rawText)) as T;
}

function withGuaranteedUniqueIds(questions: QuizQuestion[]): QuizQuestion[] {
  const seenIds = new Set<string>();
  return questions.map((question) => {
    const needsNewId = !question.id || seenIds.has(question.id);
    const id = needsNewId ? createId() : question.id;
    seenIds.add(id);
    return { ...question, id };
  });
}

export const puterAiProvider: AiProvider = {
  async summarize(rawText) {
    return askPuter(buildSummaryPrompt(rawText));
  },

  async generateQuestions(summary, config) {
    const questions = await askPuterForJson<QuizQuestion[]>(buildQuestionsPrompt(summary, config));
    return withGuaranteedUniqueIds(questions);
  },

  async gradeOpenAnswer(question, userAnswer) {
    return askPuterForJson<GradingResult>(buildGradingPrompt(question, userAnswer));
  },

  async generateClosingFeedback(input) {
    return askPuter(buildClosingFeedbackPrompt(input));
  },
};
