import type { Hadith, Language } from '../types';

interface Props {
  hadith: Hadith;
  language: Language;
}

export default function HadithCard({ hadith, language }: Props) {
  const text = language === 'bn' ? hadith.bangla : hadith.english;
  return (
    <section className="glass card quote-card compact-quote">
      <div className="section-title">
        <span>Hadith</span>
      </div>
      <p>{text}</p>
      <small>{hadith.source}</small>
    </section>
  );
}
