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

function isInAiyameBijPeriod(hijri: HijriDate): boolean {
  // From 1st to 15th of every Arabic month is Aiyame Bij period
  return hijri.day >= 1 && hijri.day <= 15;
}

export function getUpcomingIslamicEvent(hijri: HijriDate, language: Language) {
  const today = approxDayOfYear(hijri.monthNumber, hijri.day);
  
  // If we're in Aiyame Bij period (1st-15th), show Aiyame Bij countdown
  if (isInAiyameBijPeriod(hijri)) {
    const daysRemaining = 16 - hijri.day; // Days until end of Aiyame Bij
    const dayOfAiyame = hijri.day;
    return {
      id: 'aiyame-bij',
      name: dayOfAiyame >= 13 ? `Aiyame Bij Day ${dayOfAiyame - 12}` : 'Aiyame Bij',
      bnName: dayOfAiyame >= 13 ? `আইয়ামে বীজ Day ${dayOfAiyame - 12}` : 'আইয়ামে বীজ',
      month: hijri.monthNumber,
      day: 1,
      type: 'range' as const,
      endDay: 15,
      days: daysRemaining,
      label: language === 'bn' ? `আইয়ামে বীজ (${daysRemaining} দিন বাকি)` : `Aiyame Bij (${daysRemaining} days left)`
    };
  }
  
  // Otherwise, show next Islamic event
  const events = islamicEvents.map((event) => {
    let days = approxDayOfYear(event.month, event.day) - today;
    if (days < 0) days += 354;
    return { ...event, days };
  })
    .map((event) => ({ ...event, label: language === 'bn' ? event.bnName : event.name }))
    .sort((a, b) => a.days - b.days);
  
  return events[0];
}

export function getAyyamReminder(hijri: HijriDate, language: Language): string | null {
  const d = hijri.day;
  // Aiyame Bij period: 1st-15th of every Arabic month
  if (d >= 1 && d <= 15) {
    const daysRemaining = 16 - d;
    if (daysRemaining === 0) {
      return language === 'bn' ? 'আজ আইয়ামে বীজ শেষ দিন।' : 'Today is the last day of Ayyam al-Bid.';
    }
    return language === 'bn' 
      ? `আইয়ামে বীজ চলছে (${daysRemaining} দিন বাকি)` 
      : `Ayyam al-Bid in progress (${daysRemaining} days left)`;
  }
  // 16-29: Show next Islamic event instead of Aiyame Bij reminders
  return null;
}
