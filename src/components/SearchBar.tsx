import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const search = () => {
    const value = query.trim();
    if (!value) return;

    // Check if it looks like a URL
    const looksLikeUrl = value.includes('.') && !value.includes(' ');
    if (looksLikeUrl) {
      const targetUrl = value.startsWith('http') ? value : `https://${value}`;
      window.location.href = targetUrl;
      return;
    }

    // Use Chrome Search API for web search
    if (typeof chrome !== 'undefined' && chrome.search) {
      chrome.search.query({
        text: value,
        disposition: 'CURRENT_TAB'
      });
    } else {
      // Fallback to Google if Chrome API not available
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
    }
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
