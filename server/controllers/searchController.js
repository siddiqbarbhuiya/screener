const api = require('../services/upstreamApi');
const { MOCK_SEARCH_RESULTS } = require('../services/mockData');

exports.search = async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Query parameter q is required' });

  try {
    const { data } = await api.get(`/search?q=${encodeURIComponent(q)}`);
    if (data && data.status === 'success' && Array.isArray(data.results)) {
      return res.json(data.results);
    }
    return res.json([]);
  } catch {
    console.log(`[MOCK FALLBACK] /api/search?q=${q} — upstream unreachable`);
    const lower = q.toLowerCase();
    const filtered = MOCK_SEARCH_RESULTS.filter(
      (s) =>
        s.symbol.toLowerCase().includes(lower) ||
        s.company_name.toLowerCase().includes(lower)
    );
    return res.json(filtered);
  }
};
