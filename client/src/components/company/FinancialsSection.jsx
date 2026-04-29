import { useState } from 'react';
import FinancialTable from './FinancialTable';
import LoadingSpinner from '../LoadingSpinner';
import ErrorBanner from '../ErrorBanner';

const TABS = [
  { key: 'quarterly', label: 'Quarterly' },
  { key: 'pnl', label: 'Profit & Loss' },
  { key: 'balanceSheet', label: 'Balance Sheet' },
  { key: 'cashFlow', label: 'Cash Flow' },
  { key: 'ratios', label: 'Ratios' },
];

export default function FinancialsSection({ financials, loading, error }) {
  const [activeTab, setActiveTab] = useState('quarterly');

  if (loading) return <LoadingSpinner className="py-8" />;
  if (error) return <ErrorBanner message={error} />;
  if (!financials) return null;

  const active = TABS.find((t) => t.key === activeTab);
  const tableData = financials[activeTab];

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Financials</h2>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-gray-200 bg-gray-50">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors min-h-[44px]
                border-b-2 -mb-px
                ${activeTab === tab.key
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table content */}
        <div className="p-0">
          <FinancialTable
            title={active?.label || ''}
            headers={tableData?.headers || []}
            rows={tableData?.rows || []}
          />
        </div>
      </div>
    </section>
  );
}
