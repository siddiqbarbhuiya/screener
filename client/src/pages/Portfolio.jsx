import { useState } from 'react';
import { PlusCircle, Trash2, BarChart2 } from 'lucide-react';
import { useAIPost } from '../hooks/useAI';
import Seo from '../components/Seo';

function HoldingRow({ holding, index, onChange, onRemove }) {
  return (
    <div className="flex gap-3 items-center">
      <input
        type="text"
        value={holding.symbol}
        onChange={(e) => onChange(index, 'symbol', e.target.value.toUpperCase())}
        placeholder="Symbol (e.g. TCS)"
        className="flex-1 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm uppercase
                   bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                   placeholder-gray-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={holding.amount}
        onChange={(e) => onChange(index, 'amount', e.target.value)}
        placeholder="Amount (₹)"
        min="0"
        className="flex-1 border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm
                   bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100
                   placeholder-gray-400 dark:placeholder-slate-500
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => onRemove(index)}
        className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

function SectorBar({ sector, percentage, amount }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700 dark:text-slate-200 font-medium">{sector}</span>
        <span className="text-gray-500 dark:text-slate-400">
          {percentage}% · ₹{amount.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [holdings, setHoldings] = useState([
    { symbol: '', amount: '' },
    { symbol: '', amount: '' },
  ]);
  const { data, loading, post } = useAIPost();

  const addRow = () => setHoldings((h) => [...h, { symbol: '', amount: '' }]);

  const removeRow = (idx) =>
    setHoldings((h) => h.filter((_, i) => i !== idx));

  const updateRow = (idx, field, value) =>
    setHoldings((h) =>
      h.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );

  const handleAnalyze = async () => {
    const valid = holdings.filter((h) => h.symbol.trim() && parseFloat(h.amount) > 0);
    if (valid.length === 0) return;
    await post('/portfolio/analyze', { holdings: valid });
  };

  const totalAmount = data?.totalAmount || 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <Seo
        title="Portfolio Analyzer"
        description="Analyze your Indian stock portfolio with sector allocation, diversification insights, and AI-powered recommendations."
        path="/portfolio"
      />
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Portfolio Analyzer</h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
          Enter your holdings to get sector allocation and AI insights.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
        <h2 className="font-semibold text-gray-800 dark:text-slate-200">Your Holdings</h2>

        <div className="space-y-3">
          {holdings.map((h, idx) => (
            <HoldingRow
              key={idx}
              holding={h}
              index={idx}
              onChange={updateRow}
              onRemove={removeRow}
            />
          ))}
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={addRow}
            className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <PlusCircle size={16} />
            Add holding
          </button>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="ml-auto px-5 py-2 bg-blue-600 text-white text-sm font-medium
                       rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? 'Analyzing…' : 'Analyze Portfolio'}
          </button>
        </div>
      </div>

      {data && (
        <>
          {data.sectorAllocation?.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 dark:text-slate-200">Sector Allocation</h2>
                <span className="text-sm text-gray-500 dark:text-slate-400">
                  Total: ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-3">
                {data.sectorAllocation.map((s) => (
                  <SectorBar key={s.sector} {...s} />
                ))}
              </div>
            </div>
          )}

          {data.enriched?.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 dark:text-slate-200 mb-4">Holdings Detail</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 text-left text-gray-500 dark:text-slate-400 text-xs uppercase tracking-wide">
                      <th className="pb-2 font-medium">Symbol</th>
                      <th className="pb-2 font-medium">Sector</th>
                      <th className="pb-2 font-medium text-right">P/E</th>
                      <th className="pb-2 font-medium text-right">ROCE%</th>
                      <th className="pb-2 font-medium text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                    {data.enriched.map((h) => (
                      <tr key={h.symbol}>
                        <td className="py-2 font-medium text-gray-900 dark:text-slate-100">{h.symbol}</td>
                        <td className="py-2 text-gray-600 dark:text-slate-400">{h.sector}</td>
                        <td className="py-2 text-right text-gray-600 dark:text-slate-400">{h.pe}</td>
                        <td className="py-2 text-right text-gray-600 dark:text-slate-400">{h.roce}%</td>
                        <td className="py-2 text-right font-medium text-gray-900 dark:text-slate-100">
                          ₹{h.amount.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {data.aiAvailable && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800 dark:text-slate-200">AI Portfolio Insights</h2>
                {data.diversificationScore != null && (
                  <span className="text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full">
                    Diversification {data.diversificationScore}/10
                  </span>
                )}
              </div>

              {data.insights?.length > 0 && (
                <ul className="space-y-2">
                  {data.insights.map((insight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300">
                      <BarChart2 size={14} className="text-blue-400 mt-0.5 shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              )}

              {data.topRisk && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-700/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">Top Risk</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{data.topRisk}</p>
                </div>
              )}

              {data.recommendation && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-700/50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">Recommendation</p>
                  <p className="text-sm text-green-700 dark:text-green-300">{data.recommendation}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
