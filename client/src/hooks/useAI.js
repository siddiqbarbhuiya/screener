import { useState, useEffect, useCallback, useRef } from 'react';
import { aiApi } from '../utils/api';

export function useAIGet(path, { enabled = true, storageKey = null } = {}) {
  const [data, setData] = useState(() => {
    if (!storageKey) return null;
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Prevents duplicate fetches; starts true when data was pre-loaded from cache
  const fetchedRef = useRef(false);

  // Sync fetchedRef with whether we already have data after the lazy init
  useEffect(() => {
    if (data !== null) fetchedRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!path || !enabled) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let current = true;
    setLoading(true);
    setError(null);
    aiApi
      .get(path)
      .then((r) => {
        if (current) {
          setData(r.data);
          if (storageKey) {
            try { localStorage.setItem(storageKey, JSON.stringify(r.data)); } catch {}
          }
        }
      })
      .catch((e) => {
        if (current) {
          setError(e.message || 'Failed');
          fetchedRef.current = false; // allow retry after error
        }
      })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [path, enabled]);

  return { data, loading, error };
}

export function useAIPost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = useCallback(async (path, body) => {
    setLoading(true);
    setError(null);
    try {
      const r = await aiApi.post(path, body);
      setData(r.data);
      return r.data;
    } catch (e) {
      setError(e.message || 'Failed');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, post };
}
