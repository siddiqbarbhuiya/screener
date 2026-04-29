import { useState } from 'react';
import api from '../utils/api';

export function useScreen() {
  const [results, setResults] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = ({ query, page = 1, limit = 20 }) => {
    setLoading(true);
    setError(null);
    api
      .post('/screen', { query, page, limit })
      .then((r) => {
        setResults(r.data.results);
        setTotal(r.data.total);
      })
      .catch((e) => setError(e.message || 'Failed to run screener'))
      .finally(() => setLoading(false));
  };

  return { results, total, loading, error, run };
}
