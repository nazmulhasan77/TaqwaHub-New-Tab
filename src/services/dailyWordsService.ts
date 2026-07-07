import {
  getFallbackDailyWords,
  ieltsWords,
  quranWords,
  vocabularyIntervalKey,
  type IeltsWord,
  type QuranWord
} from '../data/dailyWords';
import type { WordChangeInterval } from '../types';
import { deterministicIndex } from '../utils/dateUtils';
import { getStored, setStored } from './storageService';

export interface DailyWords {
  quran: QuranWord;
  ielts: IeltsWord;
}

const arabicStopWords = new Set([
  'الذي',
  'الذين',
  'التي',
  'ذلك',
  'هذه',
  'هذا',
  'كان',
  'قال',
  'على',
  'الى',
  'إلى',
  'عن',
  'من',
  'في',
  'ما',
  'لا',
  'لم',
  'لن',
  'ان',
  'أن',
  'إن',
  'قد',
  'كل',
  'ثم',
  'له',
  'به',
  'لهم',
  'لنا'
]);

function isIeltsWordType(value: unknown): value is IeltsWord['type'] {
  return value === 'noun' || value === 'verb' || value === 'adjective' || value === 'adverb';
}

function displayArabicWord(word: string): string {
  return word
    .replace(/[^\u0600-\u06FF]/g, '');
}

function normalizeArabicWord(word: string): string {
  return displayArabicWord(word)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/^\u0648(?=.{3,})/, '');
}

function pickQuranWordFromAyah(text: string, seed: string): { display: string; normalized: string } | null {
  const words = text
    .split(/\s+/)
    .map((word) => ({
      display: displayArabicWord(word),
      normalized: normalizeArabicWord(word)
    }))
    .filter((word) => word.normalized.length >= 3 && !arabicStopWords.has(word.normalized));

  if (!words.length) return null;
  return words[deterministicIndex(`${seed}:ayah-word`, words.length)];
}

async function translate(text: string, to: 'en' | 'bn'): Promise<string | null> {
  const url = new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q', text);
  url.searchParams.set('langpair', `ar|${to}`);

  const response = await fetch(url);
  if (!response.ok) return null;

  const json = await response.json();
  const translated = json?.responseData?.translatedText;
  return typeof translated === 'string' && translated.trim() ? translated.trim() : null;
}

async function getQuranWordFromApi(date: Date, interval: WordChangeInterval, fallback: QuranWord): Promise<QuranWord> {
  const seed = vocabularyIntervalKey(date, interval);
  const ayahNumber = deterministicIndex(`${seed}:quran-ayah-word`, 6236) + 1;
  const response = await fetch(`https://api.alquran.cloud/v1/ayah/${ayahNumber}/quran-uthmani`);
  if (!response.ok) throw new Error('Quran API unavailable');

  const json = await response.json();
  const ayahText = json?.data?.text;
  const selected = typeof ayahText === 'string' ? pickQuranWordFromAyah(ayahText, seed) : null;
  if (!selected) return fallback;

  const [english, bangla] = await Promise.all([
    translate(selected.normalized, 'en'),
    translate(selected.normalized, 'bn')
  ]);

  return {
    arabic: selected.display,
    english: english ?? fallback.english,
    bangla: bangla ?? fallback.bangla
  };
}

async function getIeltsWordFromApi(date: Date, interval: WordChangeInterval, fallback: IeltsWord): Promise<IeltsWord> {
  const seed = vocabularyIntervalKey(date, interval);
  const word = ieltsWords[deterministicIndex(`${seed}:ielts-api-word`, ieltsWords.length)].word;
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  if (!response.ok) throw new Error('Dictionary API unavailable');

  const json = await response.json();
  const firstMeaning = json?.[0]?.meanings?.[0];
  const definition = firstMeaning?.definitions?.[0]?.definition;
  const partOfSpeech = firstMeaning?.partOfSpeech;
  const type = isIeltsWordType(partOfSpeech) ? partOfSpeech : fallback.type;

  return {
    word,
    type,
    meaning: typeof definition === 'string' && definition.trim() ? definition : fallback.meaning
  };
}

export function getVocabularyKey(date = new Date(), interval: WordChangeInterval = 'daily'): string {
  return vocabularyIntervalKey(date, interval);
}

export function getFallbackDailyVocabulary(date = new Date(), interval: WordChangeInterval = 'daily'): DailyWords {
  return getFallbackDailyWords(date, interval);
}

export async function getDailyVocabulary(date = new Date(), interval: WordChangeInterval = 'daily'): Promise<DailyWords> {
  const intervalKey = vocabularyIntervalKey(date, interval);
  const key = `daily-words:${intervalKey}`;
  const cached = await getStored<DailyWords | null>(key, null);
  if (cached) return cached;

  const fallback = getFallbackDailyVocabulary(date, interval);

  try {
    const [quran, ielts] = await Promise.all([
      getQuranWordFromApi(date, interval, quranWords[deterministicIndex(`${intervalKey}:quran-word`, quranWords.length)]),
      getIeltsWordFromApi(date, interval, fallback.ielts)
    ]);
    const words = { quran, ielts };
    await setStored(key, words);
    return words;
  } catch {
    return fallback;
  }
}
