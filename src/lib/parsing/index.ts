import { parseDocx } from './parseDocx';
import { parsePdf } from './parsePdf';
import { parsePptx } from './parsePptx';
import type { SourceFileType } from '../../types/quiz.types';

export function detectFileType(file: File): SourceFileType | null {
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf' || extension === 'docx' || extension === 'pptx') return extension;
  return null;
}

export async function parseFile(file: File): Promise<string> {
  const type = detectFileType(file);
  if (type === 'pdf') return parsePdf(file);
  if (type === 'docx') return parseDocx(file);
  if (type === 'pptx') return parsePptx(file);
  throw new Error(`Formato no soportado: ${file.name}`);
}
