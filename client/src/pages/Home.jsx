import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart2, FileText, Newspaper, ExternalLink } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
import Seo from '../components/Seo';
import PromoCarousel from '../components/PromoCarousel';
import api from '../utils/api';

const TOP_SYMBOLS = ['ITC', 'RELIANCE', 'TCS', 'HDFCBANK', 'INFY', 'ICICIBANK'];

function StockCard({ stock }) {
  const isPositive = stock.percentChange >= 0;
  return (
    <Link
      to={`/company/${stock.symbol}`}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4
                 hover:shadow-md hover:border-blue-200 transition-all group"
    >
      <div className="flex justify-between items-start mb-1.5">
        <span className="font-bold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
          {stock.symbol}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full
            ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? '+' : ''}{stock.percentChange?.toFixed(2)}%
        </span>
      </div>
      <p className="text-xs text-gray-500 truncate mb-2">{stock.name}</p>
      <p className="text-lg font-semibold text-gray-900">
        ₹{stock.price?.toLocaleString('en-IN')}
      </p>
    </Link>
  );
}

export default function Home() {
  const [stocks, setStocks] = useState([]);
  const [pendingSymbols, setPendingSymbols] = useState(TOP_SYMBOLS);
  const [marketNews, setMarketNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsPage, setNewsPage] = useState(1);
  const [hasMoreNews, setHasMoreNews] = useState(false);

  useEffect(() => {
    let current = true;
    setStocks([]);
    setPendingSymbols(TOP_SYMBOLS);

    TOP_SYMBOLS.forEach((sym) => {
      api
        .get(`/company/${sym}`)
        .then((response) => {
          if (!current) return;
          setStocks((prev) => {
            const next = [...prev.filter((s) => s.symbol !== response.data.symbol), response.data];
            return next.sort(
              (a, b) => TOP_SYMBOLS.indexOf(a.symbol) - TOP_SYMBOLS.indexOf(b.symbol)
            );
          });
        })
        .catch(() => {
          // Ignore individual symbol errors and continue rendering successful cards.
        })
        .finally(() => {
          if (!current) return;
          setPendingSymbols((prev) => prev.filter((s) => s !== sym));
        });
    });

    return () => { current = false; };
  }, []);

  useEffect(() => {
    let current = true;
    setNewsLoading(true);
    api
      .get('/news/market', { params: { page: newsPage, limit: 8 } })
      .then((r) => {
        if (!current) return;
        setMarketNews(r.data?.items || []);
        setHasMoreNews(Boolean(r.data?.hasMore));
      })
      .catch(() => {
        if (!current) return;
        setMarketNews([]);
        setHasMoreNews(false);
      })
      .finally(() => {
        if (current) setNewsLoading(false);
      });
    return () => {
      current = false;
    };
  }, [newsPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <Seo
        title="Home"
        description="Screen and analyze Indian stocks. Search NSE and BSE companies, review key metrics, and discover market movers."
        path="/"
      />
      {/* Hero */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-sm font-medium">
          <BarChart2 size={16} />
          Indian Stock Market Data
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Screen & Analyze
          <br />
          <span className="text-blue-600">Indian Stocks</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Search any NSE or BSE listed company to view fundamentals, financials, and peer comparisons.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar
            placeholder="Search stocks — ITC, Reliance, TCS..."
            autoFocus
          />
        </div>
      </section>

      {/* Promo carousel */}
      <section>
        <PromoCarousel />
      </section>

      {/* Top movers */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Stocks</h2>
        {stocks.length > 0 || pendingSymbols.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
            {pendingSymbols.map((symbol) => (
              <SkeletonCard key={symbol} className="h-28" />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Unable to load stock data.</p>
        )}
      </section>

      {/* Market news */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Newspaper size={18} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Trending Market News</h2>
        </div>
        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <SkeletonCard key={n} className="h-28" />
            ))}
          </div>
        ) : marketNews.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketNews.map((item, idx) => (
                <a
                  key={`${item.url || item.title}-${idx}`}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <p className="text-sm font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                  <div className="mt-2 text-xs text-gray-500 flex items-center justify-between gap-2">
                    <span className="truncate">{item.source || 'Market News'}</span>
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                        : 'Recent'}
                    </span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600">
                    Read story <ExternalLink size={12} />
                  </span>
                </a>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setNewsPage((p) => Math.max(1, p - 1))}
                disabled={newsLoading || newsPage === 1}
                className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs text-gray-500">Page {newsPage}</span>
              <button
                onClick={() => setNewsPage((p) => p + 1)}
                disabled={newsLoading || !hasMoreNews}
                className="px-3 py-1.5 text-xs rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No market headlines available right now.</p>
        )}
      </section>

      {/* Quick links */}
      <section className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/screens"
            className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm
                       hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart2 className="text-blue-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Stock Screener</h3>
            </div>
            <p className="text-sm text-gray-500">
              Filter stocks by Market Cap, P/E, ROCE, ROE and more with custom queries.
            </p>
          </Link>

          <Link
            to="/company/ITC"
            className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm
                       hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Company Analysis</h3>
            </div>
            <p className="text-sm text-gray-500">
              View detailed financials, charts, peer comparison, and shareholding patterns.
            </p>
          </Link>

          <Link
            to="/document-analyzer"
            className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm
                       hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="text-purple-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-900">Document Analyzer</h3>
            </div>
            <p className="text-sm text-gray-500">
              Upload earnings PDFs and generate AI-based investment summaries, metrics, and risk insights.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
