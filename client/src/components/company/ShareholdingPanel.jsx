import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const COLORS = {
  promoter: '#2563eb',
  dii: '#16a34a',
  fii: '#d97706',
  public: '#9ca3af',
};

export default function ShareholdingPanel({ data }) {
  if (!data || !data.quarters?.length) return null;

  const chartData = data.quarters.map((q, i) => ({
    quarter: q,
    Promoters: data.promoter[i] ?? 0,
    DII: data.dii[i] ?? 0,
    FII: data.fii[i] ?? 0,
    Public: data.public[i] ?? 0,
  }));

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Shareholding Pattern</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="quarter" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip formatter={(v) => `${v.toFixed(2)}%`} />
            <Legend iconSize={10} wrapperStyle={{ fontSize: '12px' }} />
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
