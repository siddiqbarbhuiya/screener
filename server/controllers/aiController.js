const cache = require('../services/cacheService');
const { generateAIResponse, safeParseJSON, isAIConfigured } = require('../services/aiService');
const { fetchHeadlines } = require('../services/newsService');
const { MOCK_COMPANY, MOCK_FINANCIALS } = require('../services/mockData');

const TTL = {
  companySummary: 6 * 60 * 60 * 1000,
  stockReason: 30 * 60 * 1000,
  redFlags: 12 * 60 * 60 * 1000,
  nlScreener: 5 * 60 * 1000,
};

exports.companySummary = async (req, res) => {
  const { symbol } = req.params;
  const sym = symbol.toUpperCase();

  if (!isAIConfigured()) {
    return res.json({ aiAvailable: false, error: 'GEMINI_API_KEY not configured in server/.env' });
  }

  const cacheKey = `summary:${sym}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const company = MOCK_COMPANY(sym);
  const prompt = `You are a financial analyst. Given data about ${company.name} (${sym}), write a concise investment analysis.

Company: ${company.name}
Sector: ${company.sector}
Industry: ${company.industry}
Price: ₹${company.price}
P/E: ${company.pe}
ROCE: ${company.roce}%
ROE: ${company.roe}%
Dividend Yield: ${company.dividendYield}%
Market Cap: ₹${(company.marketCap / 1e12).toFixed(2)} Lakh Cr
52W High/Low: ₹${company.high52w} / ₹${company.low52w}
Pros: ${company.pros?.join('; ')}
Cons: ${company.cons?.join('; ')}

Respond ONLY with a JSON object with these keys:
{
  "summary": "2-3 sentence business overview",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "risks": ["risk 1", "risk 2"],
  "verdict": "Bull/Bear/Neutral",
  "verdictReason": "One sentence justification"
}`;

  const { text, error, retryAfter } = await generateAIResponse(prompt);
  const parsed = safeParseJSON(text);

  if (!parsed) return res.json({ aiAvailable: false, configured: true, error: error || 'AI returned invalid response', retryAfter: retryAfter || null });

  const result = { aiAvailable: true, ...parsed };
  cache.set(cacheKey, result, TTL.companySummary);
  return res.json(result);
};

exports.stockReason = async (req, res) => {
  const { symbol } = req.params;
  const sym = symbol.toUpperCase();

  if (!isAIConfigured()) {
    return res.json({ aiAvailable: false, error: 'GEMINI_API_KEY not configured in server/.env' });
  }

  const cacheKey = `reason:${sym}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const company = MOCK_COMPANY(sym);
  const news = await fetchHeadlines(sym, 5);
  const newsText = news.length
    ? news.map((n) => `- ${n.title} (${n.source})`).join('\n')
    : 'No recent news available.';

  const prompt = `You are a financial analyst. Explain why ${company.name} (${sym}) stock may be moving.

Current Price: ₹${company.price} (${company.percentChange > 0 ? '+' : ''}${company.percentChange}% today)
52W High: ₹${company.high52w}, 52W Low: ₹${company.low52w}
Sector: ${company.sector}

Recent News:
${newsText}

Respond ONLY with a JSON object:
{
  "headline": "One-line reason for price movement",
  "factors": ["factor 1", "factor 2", "factor 3"],
  "sentiment": "Positive/Negative/Mixed",
  "shortTermOutlook": "One sentence"
}`;

  const { text, error, retryAfter } = await generateAIResponse(prompt);
  const parsed = safeParseJSON(text);

  if (!parsed) return res.json({ aiAvailable: false, configured: true, error: error || 'AI returned invalid response', retryAfter: retryAfter || null });

  const result = { aiAvailable: true, news, ...parsed };
  cache.set(cacheKey, result, TTL.stockReason);
  return res.json(result);
};

exports.redFlags = async (req, res) => {
  const { symbol } = req.params;
  const sym = symbol.toUpperCase();

  if (!isAIConfigured()) {
    return res.json({ aiAvailable: false, error: 'GEMINI_API_KEY not configured in server/.env' });
  }

  const cacheKey = `redflags:${sym}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const company = MOCK_COMPANY(sym);
  const fin = MOCK_FINANCIALS;

  const netProfitRow = fin.pnl.rows.find((r) => r[0].includes('Net Profit'));
  const borrowingsRow = fin.balanceSheet.rows.find((r) => r[0].includes('Borrowings'));
  const roceRow = fin.ratios.rows.find((r) => r[0].includes('ROCE'));

  const prompt = `You are a risk analyst. Identify red flags for ${company.name} (${sym}).

Financials (latest years):
Net Profit trend (₹ Cr): ${netProfitRow ? netProfitRow.slice(1).join(', ') : 'N/A'}
Borrowings trend (₹ Cr): ${borrowingsRow ? borrowingsRow.slice(1).join(', ') : 'N/A'}
ROCE trend (%): ${roceRow ? roceRow.slice(1).join(', ') : 'N/A'}

Key metrics:
P/E: ${company.pe}
Dividend Yield: ${company.dividendYield}%
ROE: ${company.roe}%
Market Cap: ₹${(company.marketCap / 1e12).toFixed(2)} Lakh Cr
Pros: ${company.pros?.join('; ')}
Cons: ${company.cons?.join('; ')}

Respond ONLY with a JSON object:
{
  "flags": [
    { "title": "flag title", "description": "brief explanation", "severity": "High|Medium|Low" }
  ],
  "overallRisk": "High|Medium|Low",
  "riskSummary": "One sentence overall risk assessment"
}`;

  const { text, error, retryAfter } = await generateAIResponse(prompt);
  const parsed = safeParseJSON(text);

  if (!parsed) return res.json({ aiAvailable: false, configured: true, error: error || 'AI returned invalid response', retryAfter: retryAfter || null });

  const result = { aiAvailable: true, ...parsed };
  cache.set(cacheKey, result, TTL.redFlags);
  return res.json(result);
};

exports.nlScreener = async (req, res) => {
  const { query } = req.body;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'query is required' });
  }

  if (!isAIConfigured()) {
    return res.json({ aiAvailable: false, error: 'GEMINI_API_KEY not configured in server/.env' });
  }

  const cacheKey = `nlscreen:${query.trim().toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  const prompt = `You are an expert Indian stock market screener assistant. Convert the user's natural language query into a structured filter string using only the available fields.

AVAILABLE FIELDS:
- Market Cap   : market capitalisation in ₹ Crores. Large cap > 20000, Mid cap 5000–20000, Small cap < 5000
- P/E          : Price-to-Earnings ratio. Undervalued < 15, Fair value 15–25, Expensive > 40
- ROCE         : Return on Capital Employed %. Good > 20, Excellent > 30
- ROE          : Return on Equity %. Good > 15, Excellent > 25
- Dividend Yield: annual dividend as % of price. Decent > 2, High > 4
- Book Value   : net asset value per share in ₹
- Price        : current share price in ₹

OPERATORS: >  <  >=  <=  =
COMBINE WITH: AND  (uppercase, no OR supported)

CONCEPT → FIELD MAPPING (Indian market):
| Concept                                              | Filter                                      |
|------------------------------------------------------|---------------------------------------------|
| undervalued / cheap / value / low PE                 | P/E < 15                                    |
| moderately valued                                    | P/E < 25                                    |
| expensive / overvalued                               | P/E > 40                                    |
| large cap / blue chip / index stock                  | Market Cap > 20000                          |
| mid cap                                              | Market Cap > 5000 AND Market Cap < 20000    |
| small cap / smallcap                                 | Market Cap < 5000                           |
| high quality / quality business                      | ROCE > 20 AND ROE > 15                      |
| compounder / wealth creator / high growth            | ROCE > 25 AND ROE > 20                      |
| efficient capital use / asset light                  | ROCE > 25                                   |
| cash rich / strong balance sheet / asset heavy       | Book Value > 200                            |
| high dividend / income stock / dividend paying       | Dividend Yield > 3                          |
| very high dividend / dividend yield                  | Dividend Yield > 5                          |
| high ROE / good ROE                                  | ROE > 20                                    |
| high ROCE / high ROC / good returns on capital       | ROCE > 20                                   |
| low debt / debt free / debt light                    | ROCE > 20  (proxy: high ROCE = efficient capital, often low debt) |
| penny stock / cheap price                            | Price < 100                                 |
| high price stock                                     | Price > 1000                                |

CONCEPTS TO SKIP (no available field — ignore silently, do not error):
- FII activity, FII buying, FII stake, institutional buying
- Cash flow, operating cash flow, free cash flow
- Revenue growth, sales growth, earnings growth
- Promoter holding, pledging
- Debt-to-equity ratio (use ROCE as proxy instead)
- Sector / industry filters (IT, pharma, FMCG, etc.)
- Momentum, 52-week high/low, technical indicators
- Any concept not in the mapping table above

RULES:
1. Use ONLY the 7 fields listed above.
2. Skip any concept that has no direct field mapping — never return an error for it.
3. Combine ALL extracted conditions with AND.
4. Use the thresholds from the mapping table; for ambiguous terms pick moderate values.
5. If the query mentions multiple related concepts (e.g. "cash rich AND cash flow improved"), map once — do not duplicate the same condition.
6. Spelling mistakes in the query are common — infer intent (e.g. "stocs" = stocks, "hight" = high, "ROC" = ROCE).
7. If absolutely nothing is mappable, return { "translatedQuery": "" }.

EXAMPLES:
"high dividend blue chip stocks"
→ "Dividend Yield > 3 AND Market Cap > 20000"

"undervalued mid cap quality stocks"
→ "P/E < 15 AND Market Cap > 5000 AND Market Cap < 20000 AND ROCE > 20 AND ROE > 15"

"IT companies with high ROE and low PE"
→ "ROE > 20 AND P/E < 25"

"dividend paying value stocks with strong returns"
→ "Dividend Yield > 2 AND P/E < 20 AND ROCE > 20"

"undervalued stocs and FII activity has been increased and Cash rich and cash flow improved and has high ROC and ROE"
→ "P/E < 15 AND Book Value > 200 AND ROCE > 20 AND ROE > 15"

"small cap growth compounders with high dividend"
→ "Market Cap < 5000 AND ROCE > 25 AND ROE > 20 AND Dividend Yield > 2"

"cheap large cap stocks with decent dividend"
→ "P/E < 20 AND Market Cap > 20000 AND Dividend Yield > 2"

Now translate this query:
"${query}"

Respond ONLY with a JSON object — no explanation, no markdown:
{ "translatedQuery": "FIELD operator VALUE AND FIELD operator VALUE" }`;

  const { text, error, retryAfter } = await generateAIResponse(prompt);
  console.log('[nlScreener] raw text =>', text, '| error =>', error);
  const parsed = safeParseJSON(text);

  if (!parsed) return res.json({ aiAvailable: false, configured: true, error: error || 'AI returned invalid response', retryAfter: retryAfter || null });

  const result = { aiAvailable: true, translatedQuery: parsed.translatedQuery || '' };
  cache.set(cacheKey, result, TTL.nlScreener);
  return res.json(result);
};
