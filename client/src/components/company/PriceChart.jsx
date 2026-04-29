import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { useChart } from '../../hooks/useChart';
import { useTheme } from '../../context/ThemeContext';
import SkeletonCard from '../SkeletonCard';

const PERIODS = ['1M', '6M', '1Y', '3Y', '5Y', 'Max'];

function CustomTooltip({ active, payload, label, dark }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="text-gray-500 dark:text-slate-400 text-xs mb-0.5">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-slate-100">₹{payload[0].value?.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
}

export default function PriceChart({ symbol }) {
  const [period, setPeriod] = useState('1Y');
  const { data, loading } = useChart(symbol, period);
  const { dark } = useTheme();

  const chartData = data
    ? data.labels.map((label, i) => ({ date: label, price: data.prices[i] }))
    : [];

  const prices = chartData.map((d) => d.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const padding = (maxPrice - minPrice) * 0.05 || 10;

  const tickColor = dark ? '#94a3b8' : '#9ca3af';
  const gridColor = dark ? '#334155' : '#f0f0f0';

  return (
    <section className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200">Price History</h2>
        <div className="flex gap-1 flex-wrap">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors min-h-[36px]
                ${period === p
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-slate-200'
                }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonCard className="h-64" />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: tickColor }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: tickColor }}
              tickLine={false}
              axisLine={false}
              domain={[minPrice - padding, maxPrice + padding]}
              tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`}
              width={72}
            />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              dot={false}
              strokeWidth={2}
              activeDot={{ r: 4, fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
