import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useFinancials(symbol) {
  const [data, setData] = useState(null);
  const [shareholding, setShareholding] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    let current = true;
    setLoading(true);
    setError(null);
    Promise.all([
      api.get(`/company/${symbol}/financials`),
      api.get(`/company/${symbol}/shareholding`),
    ])
      .then(([fin, sh]) => {
        if (current) { setData(fin.data); setShareholding(sh.data); }
      })
      .catch((e) => { if (current) setError(e.message || 'Failed to load financial data'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [symbol]);

  return { data, shareholding, loading, error };
}
