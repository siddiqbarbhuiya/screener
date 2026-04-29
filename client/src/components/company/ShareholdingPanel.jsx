import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const COLORS = {
  promoter: '#2563eb',
  dii: '#16a34a',
  fii: '#d97706',
  public: '#9ca3af',
};

export default function ShareholdingPanel({ data }) {
  const { dark } = useTheme();
  if (!data || !data.quarters?.length) return null;

  const chartData = data.quarters.map((q, i) => ({
    quarter: q,
    Promoters: data.promoter[i] ?? 0,
    DII: data.dii[i] ?? 0,
    FII: data.fii[i] ?? 0,
    Public: data.public[i] ?? 0,
  }));

  const tickColor = dark ? '#94a3b8' : '#9ca3af';
  const gridColor = dark ? '#334155' : '#f0f0f0';
  const tooltipStyle = dark
    ? { backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0', borderRadius: 8 }
    : {};

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 dark:text-slate-200 mb-3">Shareholding Pattern</h2>
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: tickColor }} tickLine={false} axisLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: tickColor }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip formatter={(v) => `${v.toFixed(2)}%`} contentStyle={tooltipStyle} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', color: tickColor }} />
            <Bar dataKey="Promoters" stackId="a" fill={COLORS.promoter} radius={[0, 0, 0, 0]} />
            <Bar dataKey="DII" stackId="a" fill={COLORS.dii} />
            <Bar dataKey="FII" stackId="a" fill={COLORS.fii} />
            <Bar dataKey="Public" stackId="a" fill={COLORS.public} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
