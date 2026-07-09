import { useState } from 'react';
import type { SearchEngine } from '../types';

const engines: Record<SearchEngine, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  brave: 'https://search.brave.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q='
};

interface Props {
  searchEngine: SearchEngine;
}

export default function SearchBar({ searchEngine }: Props) {
  const [query, setQuery] = useState('');

  const search = () => {
    const value = query.trim();
    if (!value) return;
    const looksLikeUrl = value.includes('.') && !value.includes(' ');
    const target = looksLikeUrl ? `https://${value.replace(/^https?:\/\//, '')}` : `${engines[searchEngine]}${encodeURIComponent(value)}`;
    window.location.href = target;
  };

  return (
    <section className="search-stack">
      <div className="search-bar glass">
        <span className="search-icon">⌕</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && search()}
          placeholder="Search the web or type a URL"
        />
        <button onClick={search}>Search</button>
      </div>
    </section>
  );
}
