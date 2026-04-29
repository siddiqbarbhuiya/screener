import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCompany } from '../hooks/useCompany';
import { useFinancials } from '../hooks/useFinancials';
import CompanyHeader from '../components/company/CompanyHeader';
import KeyMetrics from '../components/company/KeyMetrics';
import PriceChart from '../components/company/PriceChart';
import ProsConsList from '../components/company/ProsConsList';
import PeerTable from '../components/company/PeerTable';
import FinancialsSection from '../components/company/FinancialsSection';
import ShareholdingPanel from '../components/company/ShareholdingPanel';
import AIInsights from '../components/company/AIInsights';
import StockReason from '../components/company/StockReason';
import RedFlags from '../components/company/RedFlags';
import DashboardSkeleton from '../components/DashboardSkeleton';
import ErrorBanner from '../components/ErrorBanner';
import EmptyState from '../components/EmptyState';
import Seo from '../components/Seo';

export default function CompanyDashboard() {
  const { symbol } = useParams();

  useEffect(() => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('ai_') && !k.endsWith(`_${symbol}`)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  }, [symbol]);

  const { data, loading, error } = useCompany(symbol);
  const { data: financials, shareholding, loading: finLoading, error: finError } = useFinancials(symbol);

  if (loading) return <DashboardSkeleton />;
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ErrorBanner message={error} />
    </div>
  );
  if (!data) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <EmptyState message="Company not found" subtitle={`No data available for symbol "${symbol}"`} />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Seo
        title={`${symbol?.toUpperCase() || 'Company'} Analysis`}
        description={`Detailed analysis, fundamentals, chart, and peer comparison for ${symbol?.toUpperCase() || 'an Indian stock'}.`}
        path={`/company/${symbol}`}
      />
      <CompanyHeader data={data} />

      {data.about && (
        <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{data.about}</p>
        </section>
      )}

      <KeyMetrics data={data} />
      <PriceChart symbol={symbol} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <AIInsights symbol={symbol} />
        <StockReason symbol={symbol} />
      </div>

      <RedFlags symbol={symbol} />

      <ProsConsList pros={data.pros} cons={data.cons} />

      {data.peers?.length > 0 && (
        <PeerTable peers={data.peers} currentSymbol={symbol} />
      )}

      <FinancialsSection
        financials={financials}
        loading={finLoading}
        error={finError}
      />

      <ShareholdingPanel data={shareholding} />
    </div>
  );
}
