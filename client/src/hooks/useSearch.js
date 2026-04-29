import { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setLoading(true);
      api
        .get(`/search?q=${encodeURIComponent(query)}`)
        .then((r) => setResults(r.data || []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer.current);
  }, [query]);

  return { query, setQuery, results, loading };
}
