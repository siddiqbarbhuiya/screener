import { useEffect, useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import api from '../../utils/api';

function formatTime(dateString) {
  if (!dateString) return 'Recent';
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return 'Recent';
  return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function StockNewsPanel({ symbol }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!symbol) return;
    let current = true;
    setLoading(true);
    api
      .get(`/company/${symbol}/news`, { params: { page, limit: 6 } })
      .then((r) => {
        if (!current) return;
        setItems(r.data?.items || []);
        setHasMore(Boolean(r.data?.hasMore));
      })
      .catch(() => {
        if (!current) return;
        setItems([]);
        setHasMore(false);
      })
      .finally(() => {
        if (current) setLoading(false);
      });
    return () => {
      current = false;
    };
  }, [symbol, page]);

  useEffect(() => {
    setPage(1);
  }, [symbol]);

  return (
    <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Newspaper size={16} className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200">Latest News</h2>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400 dark:text-slate-500">Loading latest headlines...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-slate-500">No recent news found for this stock.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <a
              key={`${item.url || item.title}-${idx}`}
              href={item.url || '#'}
              target="_blank"
              rel="noreferrer"
              className="block border border-gray-100 dark:border-slate-700 rounded-lg p-3
                         hover:border-blue-200 dark:hover:border-blue-500/50
                         hover:bg-blue-50/40 dark:hover:bg-blue-900/20 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100 line-clamp-2">{item.title}</p>
              <div className="mt-1 text-xs text-gray-500 dark:text-slate-400 flex items-center justify-between gap-2">
                <span className="truncate">{item.source || 'Market News'}</span>
                <span>{formatTime(item.publishedAt)}</span>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                Read story <ExternalLink size={12} />
              </span>
            </a>
          ))}
          <div className="pt-1 flex items-center justify-end gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={loading || page === 1}
              className="px-3 py-1.5 text-xs rounded-md border border-gray-200 dark:border-slate-700
                         text-gray-600 dark:text-slate-400
                         hover:bg-gray-50 dark:hover:bg-slate-700
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-xs text-gray-500 dark:text-slate-400">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading || !hasMore}
              className="px-3 py-1.5 text-xs rounded-md border border-gray-200 dark:border-slate-700
                         text-gray-600 dark:text-slate-400
                         hover:bg-gray-50 dark:hover:bg-slate-700
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
