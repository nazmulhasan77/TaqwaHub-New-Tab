import type { QuickLink } from '../types';
import { getFaviconUrl } from '../utils/linkUtils';

interface Props {
  quickLinks: QuickLink[];
  onAddLink?: () => void;
}

export default function QuickLinks({ quickLinks, onAddLink }: Props) {
  return (
    <section className="quick-links">
      {quickLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          className="quick-link glass"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.useFavicon ? (
            <img 
              src={getFaviconUrl(link.url)} 
              alt="" 
              className="quick-link-icon quick-link-favicon"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'inline';
              }}
            />
          ) : null}
          <span className="quick-link-icon" style={{ display: link.useFavicon ? 'none' : 'inline' }}>
            {link.icon || '🔗'}
          </span>
          <span className="quick-link-name">{link.name}</span>
        </a>
      ))}
      {onAddLink && (
        <button onClick={onAddLink} className="quick-link quick-link-add glass">
          <span className="quick-link-icon">+</span>
          <span className="quick-link-name">Add</span>
        </button>
      )}
    </section>
  );
}