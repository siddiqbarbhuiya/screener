import { TrendingUp, TrendingDown } from 'lucide-react';

export default function CompanyHeader({ data }) {
  const isPositive = data.change >= 0;

  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{data.name}</h1>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
              {data.symbol}
            </span>
          </div>
          {data.sector && (
            <p className="text-sm text-gray-500 dark:text-slate-400">
              {data.sector}
              {data.industry && data.industry !== data.sector ? ` · ${data.industry}` : ''}
            </p>
          )}
        </div>

        <div className="text-left md:text-right">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold text-gray-900 dark:text-slate-100">
              {data.price != null ? `₹${data.price.toLocaleString('en-IN')}` : 'N/A'}
            </span>
            {data.change != null && (
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-semibold
                ${isPositive
                  ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400'
                  : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {isPositive ? '+' : ''}{data.change?.toFixed(2)} ({data.percentChange?.toFixed(2)}%)
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 md:justify-end">
            {data.dayHigh != null && <span>Day H: <span className="text-gray-700 dark:text-slate-200 font-medium">₹{data.dayHigh.toLocaleString('en-IN')}</span></span>}
            {data.dayLow  != null && <span>Day L: <span className="text-gray-700 dark:text-slate-200 font-medium">₹{data.dayLow.toLocaleString('en-IN')}</span></span>}
          </div>
          <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 md:justify-end">
            {data.high52w != null && <span>52W H: <span className="text-green-600 dark:text-green-400 font-medium">₹{data.high52w.toLocaleString('en-IN')}</span></span>}
            {data.low52w  != null && <span>52W L: <span className="text-red-500 dark:text-red-400 font-medium">₹{data.low52w.toLocaleString('en-IN')}</span></span>}
          </div>
        </div>
      </div>
    </div>
  );
}
