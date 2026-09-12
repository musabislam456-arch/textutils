// Text processing helpers

export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  readingTimeFormatted: string;
  speakingTimeFormatted: string;
  pagesDoubleSpaced: number;
  pagesSingleSpaced: number;
  readingEaseScore: number;
  readingGradeLevel: string;
  topKeywords: { word: string; count: number; percentage: number }[];
}

const COMMON_STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'are', 'was', 'were', 'been', 'has', 'had'
]);

export function countSyllables(word: string): number {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? Math.max(1, syllables.length) : 1;
}

export function computeTextStats(text: string, filterStopWords = true): TextStats {
  if (!text || text.trim() === '') {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      readingTimeFormatted: '0 sec',
      speakingTimeFormatted: '0 sec',
      pagesDoubleSpaced: 0,
      pagesSingleSpaced: 0,
      readingEaseScore: 100,
      readingGradeLevel: 'Elementary',
      topKeywords: []
    };
  }

  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Clean words match
  const rawWords = text.match(/[\p{L}\p{N}'’-]+/gu) || [];
  const words = rawWords.length;
  
  // Sentences
  const sentenceMatches = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

  // Paragraphs
  const paragraphMatches = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const paragraphs = paragraphMatches.length > 0 ? paragraphMatches.length : (words > 0 ? 1 : 0);

  // Lines
  const lines = text.split('\n').length;

  // Reading time (225 words/min)
  const readingMinutes = words / 225;
  const readingSecs = Math.round(readingMinutes * 60);
  const readingTimeFormatted = readingSecs < 60
    ? `${readingSecs} sec`
    : `${Math.floor(readingSecs / 60)} min ${readingSecs % 60} sec`;

  // Speaking time (130 words/min)
  const speakingMinutes = words / 130;
  const speakingSecs = Math.round(speakingMinutes * 60);
  const speakingTimeFormatted = speakingSecs < 60
    ? `${speakingSecs} sec`
    : `${Math.floor(speakingSecs / 60)} min ${speakingSecs % 60} sec`;

  // Pages
  const pagesDoubleSpaced = Number((words / 250).toFixed(1));
  const pagesSingleSpaced = Number((words / 500).toFixed(1));

  // Readability - Flesch Reading Ease Formula:
  // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let totalSyllables = 0;
  for (const w of rawWords) {
    totalSyllables += countSyllables(w);
  }

  let readingEase = 100;
  let gradeLevel = 'Standard';
  if (words > 0 && sentences > 0) {
    const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words);
    readingEase = Math.min(100, Math.max(0, Math.round(score)));

    if (readingEase >= 90) gradeLevel = '5th Grade (Very Easy)';
    else if (readingEase >= 80) gradeLevel = '6th Grade (Easy)';
    else if (readingEase >= 70) gradeLevel = '7th Grade (Fairly Easy)';
    else if (readingEase >= 60) gradeLevel = '8th–9th Grade (Standard)';
    else if (readingEase >= 50) gradeLevel = '10th–12th Grade (Fairly Difficult)';
    else if (readingEase >= 30) gradeLevel = 'College Level (Difficult)';
    else gradeLevel = 'College Graduate (Very Confusing/Technical)';
  }

  // Word frequency
  const freqMap: Record<string, number> = {};
  for (const w of rawWords) {
    const clean = w.toLowerCase();
    if (clean.length > 1) {
      if (!filterStopWords || !COMMON_STOP_WORDS.has(clean)) {
        freqMap[clean] = (freqMap[clean] || 0) + 1;
      }
    }
  }

  const topKeywords = Object.entries(freqMap)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Number(((count / (words || 1)) * 100).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    lines,
    readingTimeMinutes: Number(readingMinutes.toFixed(2)),
    speakingTimeMinutes: Number(speakingMinutes.toFixed(2)),
    readingTimeFormatted,
    speakingTimeFormatted,
    pagesDoubleSpaced,
    pagesSingleSpaced,
    readingEaseScore: readingEase,
    readingGradeLevel: gradeLevel,
    topKeywords
  };
}

// Title case small words
const TITLE_CASE_SMALL_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'en', 'for', 'if', 'in', 'of',
  'on', 'or', 'the', 'to', 'via', 'vs', 'per', 'nor', 'off', 'out', 'up'
]);

export function toTitleCase(str: string): string {
  if (!str) return '';
  return str.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, (match, index, fullStr) => {
    const lower = match.toLowerCase();
    const isFirst = index === 0;
    const isLast = index + match.length === fullStr.length;
    
    // Check if preceded by punctuation like colon or dot
    const prevChar = index > 1 ? fullStr[index - 2] : '';
    const isAfterMajorPunctuation = prevChar === ':' || prevChar === '.' || prevChar === '—' || prevChar === '-';

    if (!isFirst && !isLast && !isAfterMajorPunctuation && TITLE_CASE_SMALL_WORDS.has(lower)) {
      return lower;
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

export function toSentenceCase(str: string): string {
  if (!str) return '';
  // Capitalizes the first letter of each sentence, keeping whitespace and newlines intact
  return str.toLowerCase().replace(/(^\s*|[.!?\n]\s+)([a-z\u00C0-\u00FF])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase();
  });
}

export function toCamelCase(str: string): string {
  if (!str) return '';
  const words = str.trim().split(/[\s_\-]+/).filter(Boolean);
  if (words.length === 0) return '';
  return words
    .map((w, idx) => {
      const lower = w.toLowerCase();
      if (idx === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function toSnakeCase(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .toLowerCase();
}

export function toKebabCase(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(str: string): string {
  if (!str) return '';
  const words = str.trim().split(/[\s_\-]+/).filter(Boolean);
  return words
    .map(w => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function toAlternatingCase(str: string): string {
  if (!str) return '';
  let upper = false;
  return str
    .split('')
    .map(c => {
      if (/[a-zA-Z]/.test(c)) {
        upper = !upper;
        return upper ? c.toUpperCase() : c.toLowerCase();
      }
      return c;
    })
    .join('');
}

export function toInvertCase(str: string): string {
  if (!str) return '';
  return str
    .split('')
    .map(c => {
      if (c === c.toUpperCase()) return c.toLowerCase();
      return c.toUpperCase();
    })
    .join('');
}

export function toConstantCase(str: string): string {
  return toSnakeCase(str).toUpperCase();
}
