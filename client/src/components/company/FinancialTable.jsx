import EmptyState from '../EmptyState';

export default function FinancialTable({ title, headers = [], rows = [] }) {
  if (!headers.length || !rows.length) {
    return <EmptyState message={`No ${title} data available`} />;
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table className="w-full text-sm min-w-max">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`text-left px-4 py-3 font-medium text-gray-600 whitespace-nowrap
                    ${i === 0 ? 'sticky left-0 bg-gray-50 z-10 border-r border-gray-200' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2.5 text-gray-700 whitespace-nowrap
                      ${ci === 0 ? 'sticky left-0 bg-white font-medium text-gray-900 border-r border-gray-100 z-10' : ''}`}
                  >
                    {cell ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
