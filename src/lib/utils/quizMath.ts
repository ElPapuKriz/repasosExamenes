export function splitQuestionTypes(questionCount: number, openPercentage: number) {
  const openCount = Math.round((questionCount * openPercentage) / 100);
  const closedCount = questionCount - openCount;
  return { openCount, closedCount };
}

export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds}s`;
}

export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
