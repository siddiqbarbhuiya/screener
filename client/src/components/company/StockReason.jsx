import { useState } from 'react';
import { useAIGet } from '../../hooks/useAI';

const SENTIMENT_COLORS = {
  Positive: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
  Negative: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30',
  Mixed: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30',
};

const Sparkles = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
    <path d="M9 2L10.5 6.5L15 8L10.5 9.5L9 14L7.5 9.5L3 8L7.5 6.5Z" />
  </svg>
);

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const PremiumBadge = () => (
  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700/50">
    ✦ Premium
  </span>
);

const CachedBadge = () => (
  <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700/50 px-2 py-0.5 rounded-full">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="5" />
      <path d="M3.5 6l1.8 1.8L8.5 4.5" />
    </svg>
    Generated
  </span>
);

export default function StockReason({ symbol }) {
  const [expanded, setExpanded] = useState(false);
  const { data, loading } = useAIGet(`/ai/stock-reason/${symbol}`, { enabled: expanded, storageKey: `ai_stock_reason_${symbol}` });

  if (!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-4
                   flex items-center justify-between cursor-pointer
                   hover:border-blue-200 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2.5">
          <Sparkles />
          <span className="font-semibold text-gray-900 dark:text-slate-100 text-sm">Why is this stock moving?</span>
          <PremiumBadge />
        </div>
        <div className="flex items-center gap-2">
          {data && <CachedBadge />}
          <span className="text-gray-400 dark:text-slate-500"><ChevronRight /></span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-48 animate-pulse" />
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded animate-pulse" />
          <div className="h-3 bg-gray-100 dark:bg-slate-700 rounded w-3/4 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data?.aiAvailable) {
    if (!data?.configured) {
      return (
        <div
          onClick={() => setExpanded(false)}
          className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-4
                     flex items-center justify-between cursor-pointer hover:border-blue-200 dark:hover:border-blue-500/50 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles />
            <span className="font-semibold text-gray-900 dark:text-slate-100 text-sm">Why is this stock moving?</span>
            <PremiumBadge />
          </div>
          <span className="text-gray-400 dark:text-slate-500"><ChevronUp /></span>
        </div>
      );
    }
    const retryTime = data.retryAfter
      ? new Date(data.retryAfter).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : null;
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 dark:text-slate-100">Why is this stock moving?</h3>
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700/50 p-3 text-sm text-amber-700 dark:text-amber-400">
          <span className="font-medium">Stock reason unavailable</span>
          {' — '}{data.error || 'AI service temporarily unavailable.'}
          {retryTime && <span className="block mt-1 text-xs opacity-75">Retry available at {retryTime}</span>}
        </div>
      </div>
    );
  }

  const sentimentClass = SENTIMENT_COLORS[data.sentiment] || SENTIMENT_COLORS.Mixed;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">Why is this stock moving?</h3>
          <PremiumBadge />
        </div>
        <div className="flex items-center gap-2">
          {data.sentiment && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sentimentClass}`}>
              {data.sentiment}
            </span>
          )}
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
      </div>

      {data.headline && (
        <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{data.headline}</p>
      )}

      {data.factors?.length > 0 && (
        <ul className="space-y-1">
          {data.factors.map((f, i) => (
            <li key={i} className="text-sm text-gray-600 dark:text-slate-400 flex items-start gap-2">
              <span className="text-blue-400 mt-0.5 shrink-0">•</span>
              {f}
            </li>
          ))}
        </ul>
      )}

      {data.shortTermOutlook && (
        <p className="text-xs text-gray-500 dark:text-slate-500 border-t border-gray-100 dark:border-slate-700 pt-3">
          <span className="font-medium">Outlook: </span>{data.shortTermOutlook}
        </p>
      )}

      {data.news?.length > 0 && (
        <div className="border-t border-gray-100 dark:border-slate-700 pt-3">
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wide mb-2">Recent News</p>
          <ul className="space-y-2">
            {data.news.slice(0, 3).map((n, i) => (
              <li key={i}>
                <a
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline line-clamp-2"
                >
                  {n.title}
                </a>
                {n.source && (
                  <span className="text-xs text-gray-400 dark:text-slate-500 ml-1">— {n.source}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
