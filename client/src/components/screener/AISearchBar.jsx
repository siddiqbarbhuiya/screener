import { useState } from 'react';
import { useAIPost } from '../../hooks/useAI';

export default function AISearchBar({ onTranslate }) {
  const [query, setQuery] = useState('');
  const { post, loading } = useAIPost();

  const handleTranslate = async () => {
    if (!query.trim()) return;
    const result = await post('/ai/screener', { query: query.trim() });
    if (result?.translatedQuery) {
      onTranslate(result.translatedQuery);
    } else if (result?.aiAvailable === false) {
      onTranslate('');
      let msg = result?.error || 'AI translation failed. Please try again.';
      if (result?.retryAfter) {
        const retryTime = new Date(result.retryAfter).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        msg += `\nRetry available at ${retryTime}`;
      }
      alert(msg);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleTranslate();
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        placeholder='e.g. "high ROCE quality stocks" or "undervalued mid-caps"'
        className="flex-1 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-sm
                   bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                   placeholder-gray-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleTranslate}
        disabled={loading || !query.trim()}
        className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg
                   hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors whitespace-nowrap"
      >
        {loading ? 'Translating…' : 'Translate with AI'}
      </button>
    </div>
  );
}
