import { islamicEvents } from '../data/islamicEvents';
import type { HijriDate, Language } from '../types';

function approxDayOfYear(month: number, day: number) {
  return Math.round((month - 1) * 29.5 + day);
}

function daysUntilAiyameBij(hijri: HijriDate) {
  if (hijri.day >= 13 && hijri.day <= 15) return 0;

  const today = approxDayOfYear(hijri.monthNumber, hijri.day);
  const targetMonth = hijri.day > 15 ? (hijri.monthNumber % 12) + 1 : hijri.monthNumber;
  let days = approxDayOfYear(targetMonth, 13) - today;
  if (days < 0) days += 354;
  return days;
}

export function getUpcomingIslamicEvent(hijri: HijriDate, language: Language) {
  const today = approxDayOfYear(hijri.monthNumber, hijri.day);
  const aiyameBijDay = hijri.day >= 13 && hijri.day <= 15 ? hijri.day - 12 : null;
  const recurringEvents = [
    {
      id: 'aiyame-bij',
      name: aiyameBijDay ? `Aiyame Bij Day ${aiyameBijDay}` : 'Aiyame Bij',
      bnName: aiyameBijDay ? `আইয়ামে বীজ Day ${aiyameBijDay}` : 'আইয়ামে বীজ',
      month: hijri.monthNumber,
      day: 13,
      type: 'range' as const,
      endDay: 15,
      days: daysUntilAiyameBij(hijri)
    }
  ];
  const events = [
    ...islamicEvents.map((event) => {
      let days = approxDayOfYear(event.month, event.day) - today;
      if (days < 0) days += 354;
      return { ...event, days };
    }),
    ...recurringEvents
  ]
    .map((event) => ({ ...event, label: language === 'bn' ? event.bnName : event.name }))
    .sort((a, b) => a.days - b.days);
  return events[0];
}

export function getAyyamReminder(hijri: HijriDate, language: Language): string | null {
  const d = hijri.day;
  if ([13, 14, 15].includes(d)) {
    return language === 'bn' ? 'আজ আইয়ামে বীজ রোজার দিন।' : 'Today is Ayyam al-Bid fasting day.';
  }
  if (d === 12) return language === 'bn' ? 'আগামীকাল আইয়ামে বীজ শুরু।' : 'Ayyam al-Bid starts tomorrow.';
  if (d >= 10 && d <= 12) return language === 'bn' ? 'আইয়ামে বীজ শীঘ্রই আসছে।' : 'Ayyam al-Bid is coming soon.';
  return null;
}
