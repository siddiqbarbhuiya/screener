import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useChart(symbol, period) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    let current = true;
    setLoading(true);
    setError(null);
    api
      .get(`/company/${symbol}/chart?period=${period}`)
      .then((r) => { if (current) setData(r.data); })
      .catch((e) => { if (current) setError(e.message || 'Failed to load chart data'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [symbol, period]);

  return { data, loading, error };
}
