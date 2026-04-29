import { useState } from 'react';
import { useAIGet } from '../../hooks/useAI';

const VERDICT_COLORS = {
  Bull: 'bg-green-100 text-green-700 border-green-200',
  Bear: 'bg-red-100 text-red-700 border-red-200',
  Neutral: 'bg-yellow-100 text-yellow-700 border-yellow-200',
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
  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
    ✦ Premium
  </span>
);

const CachedBadge = () => (
  <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="5" />
      <path d="M3.5 6l1.8 1.8L8.5 4.5" />
    </svg>
    Generated
  </span>
);

export default function AIInsights({ symbol }) {
  const [expanded, setExpanded] = useState(false);
  const { data, loading } = useAIGet(`/ai/company-summary/${symbol}`, { enabled: expanded, storageKey: `ai_insights_${symbol}` });

  if (!expanded) {
    return (
      <div
        onClick={() => setExpanded(true)}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-4
                   flex items-center justify-between cursor-pointer
                   hover:border-blue-200 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-2.5">
          <Sparkles />
          <span className="font-semibold text-gray-900 text-sm">AI Analysis</span>
          <PremiumBadge />
        </div>
        <div className="flex items-center gap-2">
          {data && <CachedBadge />}
          <span className="text-gray-400"><ChevronRight /></span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-100 rounded w-32 animate-pulse" />
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 hover:text-gray-600">
            <ChevronUp />
          </button>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded animate-pulse" />
          <div className="h-3 bg-gray-100 rounded w-4/5 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data?.aiAvailable) {
    if (!data?.configured) {
      return (
        <div
          onClick={() => setExpanded(false)}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-4
                     flex items-center justify-between cursor-pointer hover:border-blue-200 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles />
            <span className="font-semibold text-gray-900 text-sm">AI Analysis</span>
            <PremiumBadge />
          </div>
          <span className="text-gray-400"><ChevronUp /></span>
        </div>
      );
    }
    const retryTime = data.retryAfter
      ? new Date(data.retryAfter).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      : null;
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">AI Analysis</h3>
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 hover:text-gray-600">
            <ChevronUp />
          </button>
        </div>
        <div className="bg-amber-50 rounded-lg border border-amber-200 p-3 text-sm text-amber-700">
          <span className="font-medium">AI Analysis unavailable</span>
          {' — '}{data.error || 'AI service temporarily unavailable.'}
          {retryTime && <span className="block mt-1 text-xs opacity-75">Retry available at {retryTime}</span>}
        </div>
      </div>
    );
  }

  const verdictClass = VERDICT_COLORS[data.verdict] || VERDICT_COLORS.Neutral;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">AI Analysis</h3>
          <PremiumBadge />
        </div>
        <div className="flex items-center gap-2">
          {data.verdict && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${verdictClass}`}>
              {data.verdict}
            </span>
          )}
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 hover:text-gray-600">
            <ChevronUp />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>

      {data.strengths?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Strengths</p>
          <ul className="space-y-1">
            {data.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5 shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.risks?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Risks</p>
          <ul className="space-y-1">
            {data.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-red-500 mt-0.5 shrink-0">−</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.verdictReason && (
        <p className="text-xs text-gray-500 border-t border-gray-100 pt-3">{data.verdictReason}</p>
      )}
    </div>
  );
}
