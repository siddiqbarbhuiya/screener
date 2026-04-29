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
      className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-4
                 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-600 transition-all group"
    >
      <div className="flex justify-between items-start mb-1.5">
        <span className="font-bold text-gray-900 dark:text-slate-100 text-sm group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {stock.symbol}
        </span>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full
            ${isPositive
              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
              : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'}`}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? '+' : ''}{stock.percentChange?.toFixed(2)}%
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-slate-400 truncate mb-2">{stock.name}</p>
      <p className="text-lg font-semibold text-gray-900 dark:text-slate-100">
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
      api.get(`/company/${sym}`)
        .then((response) => {
          if (!current) return;
          setStocks((prev) => {
            const next = [...prev.filter((s) => s.symbol !== response.data.symbol), response.data];
            return next.sort((a, b) => TOP_SYMBOLS.indexOf(a.symbol) - TOP_SYMBOLS.indexOf(b.symbol));
          });
        })
        .catch(() => {})
        .finally(() => { if (current) setPendingSymbols((prev) => prev.filter((s) => s !== sym)); });
    });
    return () => { current = false; };
  }, []);

  useEffect(() => {
    let current = true;
    setNewsLoading(true);
    api.get('/news/market', { params: { page: newsPage, limit: 8 } })
      .then((r) => {
        if (!current) return;
        setMarketNews(r.data?.items || []);
        setHasMoreNews(Boolean(r.data?.hasMore));
      })
      .catch(() => { if (!current) return; setMarketNews([]); setHasMoreNews(false); })
      .finally(() => { if (current) setNewsLoading(false); });
    return () => { current = false; };
  }, [newsPage]);

  const pageBtnCls = `px-3 py-1.5 text-xs rounded-md border
    border-gray-200 dark:border-slate-700
    text-gray-600 dark:text-slate-400
    hover:bg-gray-50 dark:hover:bg-slate-800
    disabled:opacity-50 disabled:cursor-not-allowed transition-colors`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <Seo
        title="Home"
        description="Screen and analyze Indian stocks. Search NSE and BSE companies, review key metrics, and discover market movers."
        path="/"
      />

      {/* Hero */}
      <section className="text-center space-y-5 py-4">
        <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1.5 rounded-full text-sm font-medium">
          <BarChart2 size={16} />
          Indian Stock Market Data
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 leading-tight">
          Screen & Analyze
          <br />
          <span className="text-blue-600 dark:text-blue-400">Indian Stocks</span>
        </h1>
        <p className="text-gray-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
          Search any NSE or BSE listed company to view fundamentals, financials, and peer comparisons.
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar placeholder="Search stocks — ITC, Reliance, TCS..." autoFocus />
        </div>
      </section>

      {/* Promo carousel */}
      <section>
        <PromoCarousel />
      </section>

      {/* Top movers */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-4">Top Stocks</h2>
        {stocks.length > 0 || pendingSymbols.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stocks.map((stock) => <StockCard key={stock.symbol} stock={stock} />)}
            {pendingSymbols.map((symbol) => <SkeletonCard key={symbol} className="h-28" />)}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-slate-500">Unable to load stock data.</p>
        )}
      </section>

      {/* Market news */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Newspaper size={18} className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Trending Market News</h2>
        </div>
        {newsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4].map(n => <SkeletonCard key={n} className="h-28" />)}
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
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                             rounded-xl p-4 shadow-sm hover:border-blue-200 dark:hover:border-blue-600
                             hover:shadow-md transition-all"
                >
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 line-clamp-2">{item.title}</p>
                  <div className="mt-2 text-xs text-gray-500 dark:text-slate-400 flex items-center justify-between gap-2">
                    <span className="truncate">{item.source || 'Market News'}</span>
                    <span>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
                        : 'Recent'}
                    </span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    Read story <ExternalLink size={12} />
                  </span>
                </a>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setNewsPage(p => Math.max(1, p - 1))}
                disabled={newsLoading || newsPage === 1} className={pageBtnCls}>
                Previous
              </button>
              <span className="text-xs text-gray-500 dark:text-slate-400">Page {newsPage}</span>
              <button onClick={() => setNewsPage(p => p + 1)}
                disabled={newsLoading || !hasMoreNews} className={pageBtnCls}>
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-slate-500">No market headlines available right now.</p>
        )}
      </section>

      {/* Quick links */}
      <section className="border-t border-gray-200 dark:border-slate-700 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { to: '/screens',           icon: BarChart2,  iconCls: 'text-blue-600 dark:text-blue-400',   bgCls: 'bg-blue-50 dark:bg-blue-900/30',   title: 'Stock Screener',     desc: 'Filter stocks by Market Cap, P/E, ROCE, ROE and more with custom queries.' },
            { to: '/company/ITC',       icon: TrendingUp, iconCls: 'text-green-600 dark:text-green-400', bgCls: 'bg-green-50 dark:bg-green-900/30',  title: 'Company Analysis',   desc: 'View detailed financials, charts, peer comparison, and shareholding patterns.' },
            { to: '/document-analyzer', icon: FileText,   iconCls: 'text-purple-600 dark:text-purple-400',bgCls: 'bg-purple-50 dark:bg-purple-900/30',title: 'Document Analyzer', desc: 'Upload earnings PDFs and generate AI-based investment summaries, metrics, and risk insights.' },
          ].map(({ to, icon: Icon, iconCls, bgCls, title, desc }) => (
            <Link key={to} to={to}
              className="group bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700
                         rounded-xl p-5 shadow-sm hover:border-blue-200 dark:hover:border-blue-600
                         hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${bgCls}`}>
                  <Icon className={iconCls} size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
