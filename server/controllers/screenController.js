const { MOCK_SCREEN_RESULTS } = require('../services/mockData');

const FIELD_MAP = {
  'market cap': 'marketCap',
  'market capitalization': 'marketCap',
  'p/e': 'pe',
  'pe': 'pe',
  'price to earning': 'pe',
  'price to earnings': 'pe',
  'roce': 'roce',
  'roe': 'roe',
  'dividend yield': 'dividendYield',
  'book value': 'bookValue',
  'price': 'price',
};

function parseQuery(queryStr) {
  if (!queryStr || !queryStr.trim()) return [];

  const conditions = queryStr.split(/\bAND\b/i).map((s) => s.trim()).filter(Boolean);
  const parsed = [];

  for (const cond of conditions) {
    const match = cond.match(/^(.+?)\s*(>=|<=|>|<|=)\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) continue;
    const fieldRaw = match[1].trim().toLowerCase();
    const operator = match[2];
    const value = parseFloat(match[3]);
    const field = FIELD_MAP[fieldRaw];
    if (field) parsed.push({ field, operator, value });
  }
  return parsed;
}

function applyCondition(stock, { field, operator, value }) {
  const stockVal = stock[field];
  if (stockVal == null) return false;
  switch (operator) {
    case '>': return stockVal > value;
    case '<': return stockVal < value;
    case '>=': return stockVal >= value;
    case '<=': return stockVal <= value;
    case '=': return stockVal === value;
    default: return false;
  }
}

exports.runScreen = (req, res) => {
  const { query = '', page = 1, limit = 20 } = req.body;
  const conditions = parseQuery(query);

  let results = MOCK_SCREEN_RESULTS;
  if (conditions.length > 0) {
    results = results.filter((stock) => conditions.every((c) => applyCondition(stock, c)));
  }

  const total = results.length;
  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const start = (pageNum - 1) * limitNum;
  const paginated = results.slice(start, start + limitNum);

  return res.json({
    results: paginated,
    total,
    page: pageNum,
    limit: limitNum,
    parsedQuery: conditions,
  });
};
