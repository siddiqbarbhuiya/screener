import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import api from '../utils/api';

const MOCK = [
  { name: 'NIFTY 50',           value: 24285.40, change:  125.30, pctChange:  0.52 },
  { name: 'SENSEX',             value: 79943.20, change:  386.55, pctChange:  0.49 },
  { name: 'BANK NIFTY',         value: 51642.80, change: -124.65, pctChange: -0.24 },
  { name: 'NIFTY IT',           value: 38542.15, change:  892.30, pctChange:  2.37 },
  { name: 'NIFTY MIDCAP 100',   value: 56784.50, change:  234.80, pctChange:  0.41 },
  { name: 'NIFTY SMALLCAP 100', value: 18965.30, change:  -45.20, pctChange: -0.24 },
  { name: 'INDIA VIX',          value:    12.84, change:   -0.32, pctChange: -2.43 },
  { name: 'NIFTY AUTO',         value: 22456.75, change:  312.40, pctChange:  1.41 },
  { name: 'NIFTY PHARMA',       value: 19873.25, change:  -98.45, pctChange: -0.49 },
  { name: 'NIFTY FMCG',         value: 56234.80, change:  445.60, pctChange:  0.80 },
  { name: 'NIFTY METAL',        value: 10234.60, change:  -87.30, pctChange: -0.85 },
  { name: 'NIFTY REALTY',       value:  1045.25, change:   18.45, pctChange:  1.80 },
];

function IndexItem({ item }) {
  const pos = item.pctChange >= 0;
  return (
    <span className="inline-flex items-center gap-2 px-4 select-none">
      <span className="text-xs font-semibold text-gray-500 tracking-wide">{item.name}</span>
      <span className="text-xs font-bold text-gray-900">
        {item.value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${pos ? 'text-green-600' : 'text-red-500'}`}>
        {pos ? <TrendingUp size={10} strokeWidth={2.5} /> : <TrendingDown size={10} strokeWidth={2.5} />}
        {pos ? '+' : ''}{item.pctChange.toFixed(2)}%
      </span>
      <span className="text-gray-200 ml-1 text-base leading-none">|</span>
    </span>
  );
}

export default function IndicesTicker() {
  const [indices, setIndices] = useState(MOCK);

  useEffect(() => {
    let current = true;
    api.get('/indices')
      .then(r => { if (current && Array.isArray(r.data) && r.data.length) setIndices(r.data); })
      .catch(() => {});
    return () => { current = false; };
  }, []);

  return (
    <div className="bg-white border-b border-gray-100 overflow-hidden h-9 flex items-center">
      <div
        className="flex items-center animate-ticker whitespace-nowrap"
        onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {/* Duplicated list creates a seamless loop — first copy scrolls off as second takes its place */}
        {[...indices, ...indices].map((item, i) => (
          <IndexItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
