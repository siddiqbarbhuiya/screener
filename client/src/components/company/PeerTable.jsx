import { Link } from 'react-router-dom';
import { formatCroresDirect, formatPct, formatNumber } from '../../utils/format';

export default function PeerTable({ peers = [], currentSymbol }) {
  if (!peers.length) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Peer Comparison</h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-0">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {['Symbol', 'Name', 'Price', 'P/E', 'Market Cap', 'ROCE', 'ROE'].map((h, i) => (
                  <th
                    key={h}
                    className={`text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap
                      ${i === 0 ? 'sticky left-0 bg-gray-50 z-10 border-r border-gray-100' : ''}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peers.map((peer) => (
                <tr
                  key={peer.symbol}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors
                    ${peer.symbol === currentSymbol ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-2.5 sticky left-0 bg-white border-r border-gray-100 z-10">
                    <Link
                      to={`/company/${peer.symbol}`}
                      className="font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {peer.symbol}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">{peer.name}</td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    ₹{peer.price?.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    {formatNumber(peer.pe)}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    {formatCroresDirect(peer.marketCap / 1e7)}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    {formatPct(peer.roce)}
                  </td>
                  <td className="px-4 py-2.5 text-gray-700 whitespace-nowrap">
                    {formatPct(peer.roe)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
