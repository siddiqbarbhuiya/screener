import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScreen } from '../hooks/useScreen';
import AISearchBar from '../components/screener/AISearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import Seo from '../components/Seo';
import { formatPct, formatNumber, formatCroresDirect } from '../utils/format';

const EXAMPLE_QUERIES = [
  'Market Cap > 10000 AND ROCE > 20',
  'P/E < 15 AND Dividend Yield > 2',
  'ROE > 25 AND Market Cap > 5000',
];

function ScreenerResultsTable({ results, total, page, limit, onPage }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total} companies
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-0">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Symbol', 'Name', 'Price', 'P/E', 'Market Cap (Cr)', 'ROCE %', 'ROE %', 'Div Yield %'].map((h, i) => (
                  <th
                    key={h}
                    className={`text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap
                      ${i === 0 ? 'sticky left-0 bg-gray-50 z-10 border-r border-gray-100' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.symbol} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2.5 sticky left-0 bg-white border-r border-gray-100 z-10">
                    <Link
                      to={`/company/${r.symbol}`}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      {r.symbol}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">{r.name}</td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    ₹{r.price?.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700">{formatNumber(r.pe)}</td>
                  <td className="px-4 py-2.5 text-gray-700">{formatCroresDirect(r.marketCap)}</td>
                  <td className="px-4 py-2.5 text-gray-700">{formatPct(r.roce)}</td>
                  <td className="px-4 py-2.5 text-gray-700">{formatPct(r.roe)}</td>
                  <td className="px-4 py-2.5 text-gray-700">{formatPct(r.dividendYield)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50
                       disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onPage(page + 1)}
            disabled={page >= totalPages}
            className="p-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50
                       disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function Screener() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const LIMIT = 20;
  const { results, total, loading, error, run } = useScreen();

  const handleRun = () => {
    setPage(1);
    run({ query, page: 1, limit: LIMIT });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    run({ query, page: newPage, limit: LIMIT });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Seo
        title="Stock Screener"
        description="Filter Indian stocks with custom financial queries using market cap, P/E, ROCE, ROE, and dividend yield."
        path="/screens"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Stock Screener</h1>
        <p className="text-sm text-gray-500 mt-1">
          Filter Indian stocks using custom queries across fundamental metrics.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">AI Natural Language Search</label>
          <AISearchBar onTranslate={(q) => { if (q) setQuery(q); }} />
          <p className="text-xs text-gray-400 mt-1.5">Describe what you're looking for in plain English — AI will translate it to a filter query.</p>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Query</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleRun();
            }}
            rows={3}
            placeholder="Market Cap > 10000 AND P/E < 20 AND ROCE > 15"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-mono
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       resize-none placeholder-gray-400"
          />
          <p className="text-xs text-gray-400 mt-1.5">
            Fields: <code className="bg-gray-100 px-1 rounded">Market Cap</code>{' '}
            <code className="bg-gray-100 px-1 rounded">P/E</code>{' '}
            <code className="bg-gray-100 px-1 rounded">ROCE</code>{' '}
            <code className="bg-gray-100 px-1 rounded">ROE</code>{' '}
            <code className="bg-gray-100 px-1 rounded">Dividend Yield</code>{' '}
            <code className="bg-gray-100 px-1 rounded">Book Value</code>
            {' '}&nbsp;·&nbsp; Operators: {'> < >= <= ='}  &nbsp;·&nbsp; Join with <code className="bg-gray-100 px-1 rounded">AND</code>
            {' '}&nbsp;·&nbsp; Ctrl+Enter to run
          </p>
        </div>

        {/* Example queries */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => setQuery(q)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5
                           rounded-full transition-colors min-h-[32px]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRun}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg
                     text-sm font-medium hover:bg-blue-700 active:scale-95 transition
                     disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
        >
          <Play size={15} />
          {loading ? 'Running...' : 'Run Screener'}
        </button>
      </div>

      {loading && <LoadingSpinner className="py-8" />}
      {error && <ErrorBanner message={error} />}
      {results && results.length === 0 && (
        <EmptyState
          message="No stocks matched your query"
          subtitle="Try adjusting the filters or use one of the example queries above."
        />
      )}
      {results && results.length > 0 && (
        <ScreenerResultsTable
          results={results}
          total={total}
          page={page}
          limit={LIMIT}
          onPage={handlePageChange}
        />
      )}
    </div>
  );
}
