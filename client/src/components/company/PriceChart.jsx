import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import { useChart } from '../../hooks/useChart';
import SkeletonCard from '../SkeletonCard';

const PERIODS = ['1M', '6M', '1Y', '3Y', '5Y', 'Max'];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="font-semibold text-gray-900">₹{payload[0].value?.toLocaleString('en-IN')}</p>
      </div>
    );
  }
  return null;
}

export default function PriceChart({ symbol }) {
  const [period, setPeriod] = useState('1Y');
  const { data, loading } = useChart(symbol, period);

  const chartData = data
    ? data.labels.map((label, i) => ({ date: label, price: data.prices[i] }))
    : [];

  const prices = chartData.map((d) => d.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const padding = (maxPrice - minPrice) * 0.05 || 10;

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
        <h2 className="text-base font-semibold text-gray-800">Price History</h2>
        <div className="flex gap-1 flex-wrap">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors min-h-[36px]
                ${period === p
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
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
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              domain={[minPrice - padding, maxPrice + padding]}
              tickFormatter={(v) => `₹${v.toLocaleString('en-IN')}`}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} />
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
