import { useState, useEffect } from 'react';
import api from '../utils/api';

export function useCompany(symbol) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;
    let current = true;
    setLoading(true);
    setError(null);
    api
      .get(`/company/${symbol}`)
      .then((r) => { if (current) setData(r.data); })
      .catch((e) => { if (current) setError(e.message || 'Failed to load company data'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [symbol]);

  return { data, loading, error };
}
