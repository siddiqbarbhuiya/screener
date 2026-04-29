import { useMemo, useRef, useState } from 'react';
import {
  Upload,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Volume2,
  Square,
} from 'lucide-react';
import { aiApi } from '../utils/api';
import Seo from '../components/Seo';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBanner from '../components/ErrorBanner';

function scoreStyle(score) {
  if (score >= 75) return 'bg-green-50 border-green-200 text-green-700';
  if (score >= 50) return 'bg-amber-50 border-amber-200 text-amber-700';
  return 'bg-red-50 border-red-200 text-red-700';
}

export default function DocumentAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [analysis, setAnalysis] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const tabs = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'metrics', label: 'Metrics' },
      { id: 'risks', label: 'Risks' },
      { id: 'projections', label: 'Projections' },
    ],
    []
  );

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const speak = (text) => {
    if (!text) return;
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(text);
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      const res = await aiApi.post('/ai/document-analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(res.data);
      setActiveTab('overview');
    } catch (e) {
      setError(e.response?.data?.error || e.message || 'Failed to analyze document.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    stopSpeaking();
    setFile(null);
    setError('');
    setAnalysis(null);
    setActiveTab('overview');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Seo
        title="Document Analyzer"
        description="Upload annual reports and analyze Indian stocks using AI-generated insights, risk flags, metrics, and long-term outlook."
        path="/document-analyzer"
      />

      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Document Analyzer</h1>
        <p className="text-sm text-gray-500 mt-1">
          Upload earnings or annual-report PDFs to generate a structured investment brief.
        </p>
      </div>

      {!analysis ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4">
          <label className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center block bg-blue-50/40">
            <Upload className="mx-auto text-blue-500 mb-3" size={32} />
            <p className="text-sm font-medium text-gray-800">Select a financial PDF document</p>
            <p className="text-xs text-gray-500 mt-1">Supported: annual reports, earnings presentations</p>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>

          {file && (
            <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
              <FileText size={16} className="text-blue-500" />
              <span className="truncate">{file.name}</span>
            </div>
          )}

          {error && <ErrorBanner message={error} />}

          <button
            onClick={handleAnalyze}
            disabled={!file || loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingSpinner size="sm" /> : <Activity size={16} />}
            {loading ? 'Analyzing Document...' : 'Generate Analysis'}
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{analysis.companyName}</h2>
              <p className="text-sm text-gray-500">
                {analysis.ticker} · {analysis.sector}
              </p>
            </div>
            <button
              onClick={reset}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              New Upload
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm rounded-md border ${
                  activeTab === tab.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Executive Summary</h3>
                  <button
                    onClick={() => (speaking ? stopSpeaking() : speak(analysis.summary))}
                    className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
                    aria-label="Read summary"
                  >
                    {speaking ? <Square size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{analysis.summary}</p>
              </div>

              <div className={`border rounded-xl p-5 ${scoreStyle(analysis.bullishnessScore)}`}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">Investment Sentiment</p>
                  <p className="text-2xl font-bold">{analysis.bullishnessScore}%</p>
                </div>
                <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full bg-current" style={{ width: `${analysis.bullishnessScore}%` }} />
                </div>
                <ul className="mt-3 text-sm space-y-1">
                  {(analysis.bullishnessReasoning || []).slice(0, 5).map((item, idx) => (
                    <li key={idx}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard label="Market Cap" value={analysis.marketCap} />
              <MetricCard label="Management Quality" value={`${analysis.managementQuality}/10`} />
              <MetricCard label="EPS" value={analysis.financialMetrics?.eps || 'N/A'} />
              <MetricCard label="P/E Ratio" value={String(analysis.financialMetrics?.peRatio ?? 'N/A')} />
              <TrendCard label="Revenue Growth" value={analysis.financialMetrics?.revenueGrowth} suffix="%" />
              <TrendCard label="Profit Margin" value={analysis.financialMetrics?.profitMargin} suffix="%" />
              <TrendCard label="ROE" value={analysis.financialMetrics?.roe} suffix="%" />
              <TrendCard inverse label="Debt to Equity" value={analysis.financialMetrics?.debtToEquity} />
            </div>
          )}

          {activeTab === 'risks' && (
            <div className="space-y-4">
              <div className="bg-white border border-red-200 rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-red-700 flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} />
                  Key Risks
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(analysis.keyRisks || []).slice(0, 8).map((risk, idx) => (
                    <li key={idx}>- {risk}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Future Outlook (3-5 years)</h3>
                  <button
                    onClick={() => (speaking ? stopSpeaking() : speak(analysis.futureOutlook))}
                    className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50"
                    aria-label="Read outlook"
                  >
                    {speaking ? <Square size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{analysis.futureOutlook}</p>
              </div>
            </div>
          )}

          {activeTab === 'projections' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Long-Term Projections</h3>
                <div className="divide-y divide-gray-100">
                  {(analysis.longTermProjections || []).map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between gap-4 text-sm">
                      <span className="text-gray-600">{item.metric || item.year || 'Projection'}</span>
                      <span className="font-medium text-gray-900">{item.value || item.revenueTarget || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-2">Market Opportunity</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{analysis.marketOpportunity}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900 mt-1">{value || 'N/A'}</p>
    </div>
  );
}

function TrendCard({ label, value, inverse = false, suffix = '' }) {
  const number = Number(value) || 0;
  const positive = inverse ? number <= 1 : number >= 0;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">{label}</p>
        {positive ? (
          <TrendingUp size={16} className="text-green-600" />
        ) : (
          <TrendingDown size={16} className="text-red-600" />
        )}
      </div>
      <p className={`text-lg font-semibold mt-1 ${positive ? 'text-green-700' : 'text-red-700'}`}>
        {number.toFixed(2)}{suffix}
      </p>
    </div>
  );
}
