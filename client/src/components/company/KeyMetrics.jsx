import { formatCrores, formatPct, formatNumber } from '../../utils/format';

function MetricCell({ label, value }) {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-900">
        {value ?? <span className="text-gray-400 font-normal">N/A</span>}
      </p>
    </div>
  );
}

export default function KeyMetrics({ data }) {
  const metrics = [
    { label: 'Market Cap', value: formatCrores(data.marketCap) },
    { label: 'Current Price', value: data.price != null ? `₹${data.price.toLocaleString('en-IN')}` : null },
    { label: 'Day High / Low', value: data.dayHigh != null ? `₹${data.dayHigh} / ₹${data.dayLow}` : null },
    { label: 'Stock P/E', value: data.pe != null ? formatNumber(data.pe) : null },
    { label: 'Book Value', value: data.bookValue != null ? `₹${formatNumber(data.bookValue)}` : null },
    { label: 'Dividend Yield', value: data.dividendYield != null ? formatPct(data.dividendYield) : null },
    { label: 'ROCE', value: data.roce != null ? formatPct(data.roce) : null },
    { label: 'ROE', value: data.roe != null ? formatPct(data.roe) : null },
    { label: 'Face Value', value: data.faceValue != null ? `₹${data.faceValue}` : null },
  ];

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Key Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <MetricCell key={m.label} label={m.label} value={m.value} />
        ))}
      </div>
    </section>
  );
}
