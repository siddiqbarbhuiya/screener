import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import SkeletonCard from '../components/SkeletonCard';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let current = true;
    Promise.all(TOP_SYMBOLS.map((sym) => api.get(`/company/${sym}`)))
      .then((responses) => { if (current) setStocks(responses.map((r) => r.data)); })
      .catch(() => { if (current) setStocks([]); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
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

      {/* Top movers */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Stocks</h2>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOP_SYMBOLS.map((s) => (
              <SkeletonCard key={s} className="h-28" />
            ))}
          </div>
        ) : stocks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Unable to load stock data.</p>
        )}
      </section>

      {/* Quick links */}
      <section className="border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </section>
    </div>
  );
}
