const axios = require('axios');

async function fetchHeadlines(symbol, count = 5) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const { data } = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: symbol,
        language: 'en',
        sortBy: 'publishedAt',
        pageSize: count,
        apiKey,
      },
      timeout: 8000,
    });
    return (data.articles || []).slice(0, count).map((a) => ({
      title: a.title,
      source: a.source?.name,
      publishedAt: a.publishedAt,
      url: a.url,
    }));
  } catch (e) {
    console.error('[NEWS] fetch error:', e.message);
    return [];
  }
}

module.exports = { fetchHeadlines };
