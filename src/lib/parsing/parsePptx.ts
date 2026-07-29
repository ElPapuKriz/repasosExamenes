import JSZip from 'jszip';

function getSlideNumber(path: string): number {
  const match = path.match(/slide(\d+)\.xml$/);
  return match ? Number(match[1]) : 0;
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export async function parsePptx(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  const slidePaths = Object.keys(zip.files)
    .filter((path) => /^ppt\/slides\/slide\d+\.xml$/.test(path))
    .sort((a, b) => getSlideNumber(a) - getSlideNumber(b));

  const slideTexts = await Promise.all(
    slidePaths.map(async (path) => {
      const xml = await zip.files[path].async('text');
      const textRuns = [...xml.matchAll(/<a:t>(.*?)<\/a:t>/g)];
      return textRuns.map((match) => decodeXmlEntities(match[1])).join(' ');
    })
  );

  return slideTexts.join('\n\n');
}
