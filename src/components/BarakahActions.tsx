import { useState } from 'react';
import type { Language } from '../types';

export interface BarakahAction {
  id: string;
  name: string;
  bnName: string;
  icon: string;
  completed: boolean;
}

interface Props {
  onToggle: (id: string) => void;
  actions: BarakahAction[];
  language: Language;
}

export default function BarakahActions({ onToggle, actions, language }: Props) {
  return (
    <section className="barakah-actions">
      <h2 className="barakah-title">
        {language === 'bn' ? "আজকের বরকত কর্ম" : "Today's Barakah Actions"}
      </h2>
      <div className="barakah-grid">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onToggle(action.id)}
            className={`barakah-item glass ${action.completed ? 'completed' : ''}`}
          >
            <span className="barakah-icon">{action.icon}</span>
            <div className="barakah-text">
              <span className="barakah-name">
                {language === 'bn' ? action.bnName : action.name}
              </span>
            </div>
            <span className="barakah-check">{action.completed ? '✓' : '○'}</span>
          </button>
        ))}
      </div>
    </section>
  );
}