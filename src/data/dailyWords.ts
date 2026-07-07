import { deterministicIndex } from '../utils/dateUtils';
import type { WordChangeInterval } from '../types';

export interface QuranWord {
  arabic: string;
  english: string;
  bangla: string;
}

export interface IeltsWord {
  word: string;
  type: 'noun' | 'verb' | 'adjective' | 'adverb';
  meaning: string;
}

export const quranWords: QuranWord[] = [
  { arabic: 'ٱللَّه', english: 'Allah', bangla: 'আল্লাহ' },
  { arabic: 'رَبّ', english: 'Lord', bangla: 'প্রতিপালক' },
  { arabic: 'قَالَ', english: 'He said', bangla: 'তিনি বললেন' },
  { arabic: 'كَانَ', english: 'Was / used to be', bangla: 'ছিল / হতো' },
  { arabic: 'يَوْم', english: 'Day', bangla: 'দিন' },
  { arabic: 'نَاس', english: 'People', bangla: 'মানুষ' },
  { arabic: 'آمَنُوا', english: 'They believed', bangla: 'তারা ঈমান এনেছে' },
  { arabic: 'عِلْم', english: 'Knowledge', bangla: 'জ্ঞান' },
  { arabic: 'عَمَل', english: 'Deed', bangla: 'কর্ম' },
  { arabic: 'حَقّ', english: 'Truth / right', bangla: 'সত্য / অধিকার' },
  { arabic: 'كِتَاب', english: 'Book', bangla: 'কিতাব / গ্রন্থ' },
  { arabic: 'خَيْر', english: 'Goodness', bangla: 'কল্যাণ' },
  { arabic: 'رَحْمَة', english: 'Mercy', bangla: 'রহমত / দয়া' },
  { arabic: 'أَرْض', english: 'Earth', bangla: 'পৃথিবী' },
  { arabic: 'سَمَاء', english: 'Sky / heaven', bangla: 'আকাশ' },
  { arabic: 'ذِكْر', english: 'Remembrance', bangla: 'স্মরণ / জিকির' },
  { arabic: 'صَلَاة', english: 'Prayer', bangla: 'নামাজ / সালাত' },
  { arabic: 'صَبْر', english: 'Patience', bangla: 'ধৈর্য' },
  { arabic: 'نُور', english: 'Light', bangla: 'আলো' },
  { arabic: 'قَلْب', english: 'Heart', bangla: 'হৃদয়' }
];

export const ieltsWords: IeltsWord[] = [
  { word: 'significant', type: 'adjective', meaning: 'Important or large enough to be noticed.' },
  { word: 'concept', type: 'noun', meaning: 'An idea or principle used to understand something.' },
  { word: 'crucial', type: 'adjective', meaning: 'Extremely important for success or a result.' },
  { word: 'factor', type: 'noun', meaning: 'One thing that helps cause or influence an outcome.' },
  { word: 'consistent', type: 'adjective', meaning: 'Staying the same in quality, behavior, or standard.' },
  { word: 'evidence', type: 'noun', meaning: 'Information that supports whether something is true.' },
  { word: 'beneficial', type: 'adjective', meaning: 'Helpful or producing a good effect.' },
  { word: 'approach', type: 'noun', meaning: 'A way of dealing with a problem or task.' },
  { word: 'complex', type: 'adjective', meaning: 'Made of many connected parts and difficult to understand.' },
  { word: 'impact', type: 'noun', meaning: 'A strong effect or influence.' },
  { word: 'efficient', type: 'adjective', meaning: 'Working well without wasting time, money, or energy.' },
  { word: 'trend', type: 'noun', meaning: 'A general direction of change or development.' },
  { word: 'reliable', type: 'adjective', meaning: 'Able to be trusted or depended on.' },
  { word: 'policy', type: 'noun', meaning: 'An official plan or rule used by an organization or government.' },
  { word: 'sustainable', type: 'adjective', meaning: 'Able to continue without damaging future resources.' },
  { word: 'perspective', type: 'noun', meaning: 'A particular way of thinking about something.' },
  { word: 'essential', type: 'adjective', meaning: 'Completely necessary.' },
  { word: 'challenge', type: 'noun', meaning: 'A difficult task or problem.' },
  { word: 'accurate', type: 'adjective', meaning: 'Correct and free from mistakes.' },
  { word: 'outcome', type: 'noun', meaning: 'The final result of an action or situation.' }
];

export function localDateKey(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

export function vocabularyIntervalKey(date = new Date(), interval: WordChangeInterval = 'daily'): string {
  const datePart = localDateKey(date);
  const hour = date.getHours();

  if (interval === 'daily') return datePart;
  if (interval === 'hourly') return `${datePart}:h${String(hour).padStart(2, '0')}`;

  const hours = Number(interval.replace('h', ''));
  const bucketStart = Math.floor(hour / hours) * hours;
  return `${datePart}:h${String(bucketStart).padStart(2, '0')}:${interval}`;
}

export function getFallbackDailyWords(date = new Date(), interval: WordChangeInterval = 'daily') {
  const key = vocabularyIntervalKey(date, interval);

  return {
    quran: quranWords[deterministicIndex(`${key}:quran-word`, quranWords.length)],
    ielts: ieltsWords[deterministicIndex(`${key}:ielts-word`, ieltsWords.length)]
  };
}
