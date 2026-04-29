const axios = require('axios');

function normalizeNewsDataArticle(article) {
  return {
    title: article.title,
    source: article.source_id || article.source_name || 'Unknown source',
    publishedAt: article.pubDate || article.published_at || null,
    url: article.link || article.url || null,
  };
}

function normalizeNewsApiArticle(article) {
  return {
    title: article.title,
    source: article.source?.name || 'Unknown source',
    publishedAt: article.publishedAt || null,
    url: article.url || null,
  };
}

async function fetchFromNewsData(query, count, page = 1) {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) return [];

  try {
    const { data } = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: apiKey,
        q: query,
        language: 'en',
        country: 'in',
        category: 'business',
        size: count,
        page,
      },
      timeout: 8000,
    });
    return (data.results || []).slice(0, count).map(normalizeNewsDataArticle);
  } catch (e) {
    console.error('[NEWSDATA] fetch error:', e.message);
    return [];
  }
}

async function fetchFromNewsApi(query, count, page = 1) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const { data } = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: query,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: count,
        page,
        apiKey,
      },
      timeout: 8000,
    });
    return (data.articles || []).slice(0, count).map(normalizeNewsApiArticle);
  } catch (e) {
    console.error('[NEWSAPI] fetch error:', e.message);
    return [];
  }
}

async function fetchHeadlines(symbol, count = 5, page = 1) {
  const query = `${symbol} stock India`;
  const primary = await fetchFromNewsData(query, count, page);
  if (primary.length) return primary;
  return fetchFromNewsApi(query, count, page);
}

async function fetchTrendingMarketNews(count = 8, page = 1) {
  const query = 'Indian stock market OR NSE OR BSE';
  const primary = await fetchFromNewsData(query, count, page);
  if (primary.length) return primary;
  return fetchFromNewsApi(query, count, page);
}

module.exports = { fetchHeadlines, fetchTrendingMarketNews };
