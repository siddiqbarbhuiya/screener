import { useState } from 'react';
import { useAIGet } from '../../hooks/useAI';

const SEVERITY_STYLES = {
  High: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700/50',
  Medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700/50',
  Low: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700/50',
};

const RISK_BADGE = {
  High: 'bg-red-600 text-white',
  Medium: 'bg-orange-500 text-white',
  Low: 'bg-green-600 text-white',
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

export default function RedFlags({ symbol }) {
  const [expanded, setExpanded] = useState(false);
  const { data, loading } = useAIGet(`/ai/red-flags/${symbol}`, { enabled: expanded, storageKey: `ai_red_flags_${symbol}` });

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
          <span className="font-semibold text-gray-900 dark:text-slate-100 text-sm">Red Flag Detector</span>
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
            <div className="h-4 bg-gray-100 dark:bg-slate-700 rounded w-32 animate-pulse" />
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-14 bg-gray-100 dark:bg-slate-700 rounded animate-pulse" />
          ))}
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
            <span className="font-semibold text-gray-900 dark:text-slate-100 text-sm">Red Flag Detector</span>
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
            <h3 className="font-semibold text-gray-900 dark:text-slate-100">Red Flag Detector</h3>
            <PremiumBadge />
          </div>
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700/50 p-3 text-sm text-amber-700 dark:text-amber-400">
          <span className="font-medium">Red flag analysis unavailable</span>
          {' — '}{data.error || 'AI service temporarily unavailable.'}
          {retryTime && <span className="block mt-1 text-xs opacity-75">Retry available at {retryTime}</span>}
        </div>
      </div>
    );
  }

  const flags = data.flags || [];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-slate-100">Red Flag Detector</h3>
          <PremiumBadge />
        </div>
        <div className="flex items-center gap-2">
          {data.overallRisk && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${RISK_BADGE[data.overallRisk] || RISK_BADGE.Medium}`}>
              {data.overallRisk} Risk
            </span>
          )}
          <button onClick={() => setExpanded(false)} title="Collapse" className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
            <ChevronUp />
          </button>
        </div>
      </div>

      {flags.length === 0 ? (
        <p className="text-sm text-green-600 dark:text-green-400">No significant red flags detected.</p>
      ) : (
        <ul className="space-y-3">
          {flags.map((flag, i) => (
            <li key={i} className={`rounded-lg border p-3 ${SEVERITY_STYLES[flag.severity] || SEVERITY_STYLES.Low}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{flag.title}</span>
                <span className="text-xs font-semibold opacity-75">{flag.severity}</span>
              </div>
              <p className="text-xs opacity-80">{flag.description}</p>
            </li>
          ))}
        </ul>
      )}

      {data.riskSummary && (
        <p className="text-xs text-gray-500 dark:text-slate-500 border-t border-gray-100 dark:border-slate-700 pt-3">{data.riskSummary}</p>
      )}
    </div>
  );
}
