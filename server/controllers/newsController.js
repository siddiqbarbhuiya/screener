const cache = require('../services/cacheService');
const { fetchHeadlines, fetchTrendingMarketNews } = require('../services/newsService');

const TTL = {
  stock: 10 * 60 * 1000,
  market: 8 * 60 * 1000,
};

exports.stockNews = async (req, res) => {
  const sym = (req.params.symbol || '').toUpperCase();
  if (!sym) return res.status(400).json({ error: 'symbol is required' });
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 6));

  const key = `news:stock:${sym}:page:${page}:limit:${limit}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  const items = await fetchHeadlines(sym, limit, page);
  const payload = { symbol: sym, page, limit, hasMore: items.length === limit, items };
  cache.set(key, payload, TTL.stock);
  return res.json(payload);
};

exports.marketNews = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 8));
  const key = `news:market:trending:page:${page}:limit:${limit}`;
  const cached = cache.get(key);
  if (cached) return res.json(cached);

  const items = await fetchTrendingMarketNews(limit, page);
  const payload = { page, limit, hasMore: items.length === limit, items };
  cache.set(key, payload, TTL.market);
  return res.json(payload);
};
