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
            <tr className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-600">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`text-left px-4 py-3 font-medium text-gray-600 dark:text-slate-400 whitespace-nowrap
                    ${i === 0 ? 'sticky left-0 bg-gray-50 dark:bg-slate-700/50 z-10 border-r border-gray-200 dark:border-slate-600' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-2.5 text-gray-700 dark:text-slate-300 whitespace-nowrap
                      ${ci === 0 ? 'sticky left-0 bg-white dark:bg-slate-800 font-medium text-gray-900 dark:text-slate-100 border-r border-gray-100 dark:border-slate-700 z-10' : ''}`}
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
