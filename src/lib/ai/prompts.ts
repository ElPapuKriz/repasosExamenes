import { splitQuestionTypes } from '../utils/quizMath';
import type { QuizConfig, QuizQuestion } from '../../types/quiz.types';
import type { ClosingFeedbackInput } from './aiProvider.types';

export function buildSummaryPrompt(rawText: string): string {
  return `Eres un asistente de estudio. Lee el siguiente material y extrae únicamente los conceptos, definiciones, fechas y datos que un estudiante debería dominar antes de un examen. Ignora portadas, pies de página y contenido irrelevante. Responde en español, en viñetas cortas, sin introducciones ni despedidas.

MATERIAL:
"""
${rawText.slice(0, 12000)}
"""`;
}

export function buildQuestionsPrompt(summary: string, config: QuizConfig): string {
  const { openCount, closedCount } = splitQuestionTypes(config.questionCount, config.openClosedBalance);

  return `Eres un profesor creando un examen de práctica a partir de este resumen de estudio:
"""
${summary}
"""

Genera exactamente ${config.questionCount} preguntas: ${closedCount} de opción múltiple ("closed") y ${openCount} abiertas ("open"). Cada pregunta debe evaluar un concepto distinto del resumen. Varía la dificultad.

Responde ÚNICAMENTE con un arreglo JSON válido (sin texto adicional, sin bloques de código), donde cada elemento sigue este formato:
{
  "id": "identificador único, por ejemplo q1",
  "type": "closed" o "open",
  "prompt": "texto de la pregunta",
  "options": [{ "id": "a", "text": "..." }, { "id": "b", "text": "..." }, { "id": "c", "text": "..." }, { "id": "d", "text": "..." }],
  "correctOptionId": "id de la opción correcta, solo si type es closed",
  "referenceAnswer": "respuesta esperada en 1-2 frases, solo si type es open"
}

No incluyas el campo "options" ni "correctOptionId" en preguntas abiertas. No incluyas "referenceAnswer" en preguntas cerradas.`;
}

export function buildGradingPrompt(question: QuizQuestion, userAnswer: string): string {
  return `Pregunta: "${question.prompt}"
Respuesta de referencia: "${question.referenceAnswer ?? ''}"
Respuesta del estudiante: "${userAnswer}"

Evalúa si la respuesta del estudiante es correcta considerando el sentido de lo que escribió, no la redacción exacta. Responde ÚNICAMENTE con este JSON, sin texto adicional:
{ "isCorrect": true o false, "feedback": "una frase breve en español explicando por qué" }`;
}

export function buildClosingFeedbackPrompt(input: ClosingFeedbackInput): string {
  return `Un estudiante obtuvo ${input.correctCount} de ${input.totalQuestions} preguntas correctas (${input.scorePercent}%) en un quiz de repaso. Escribe 1-2 frases breves y motivadoras en español, con un consejo concreto según el resultado. Sin emojis en exceso, sin repetir el número textualmente.`;
}
