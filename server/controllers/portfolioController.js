const { generateAIResponse, safeParseJSON, isAIConfigured } = require('../services/aiService');
const { MOCK_COMPANY } = require('../services/mockData');

exports.analyze = async (req, res) => {
  const { holdings } = req.body;

  if (!Array.isArray(holdings) || holdings.length === 0) {
    return res.status(400).json({ error: 'holdings array is required' });
  }

  const enriched = holdings.map(({ symbol, amount }) => {
    const sym = String(symbol).toUpperCase();
    const company = MOCK_COMPANY(sym);
    return {
      symbol: sym,
      name: company.name,
      sector: company.sector,
      amount: parseFloat(amount) || 0,
      price: company.price,
      pe: company.pe,
      roce: company.roce,
      roe: company.roe,
    };
  });

  const totalAmount = enriched.reduce((s, h) => s + h.amount, 0);

  const sectorMap = {};
  for (const h of enriched) {
    sectorMap[h.sector] = (sectorMap[h.sector] || 0) + h.amount;
  }
  const sectorAllocation = Object.entries(sectorMap).map(([sector, amount]) => ({
    sector,
    amount,
    percentage: totalAmount > 0 ? parseFloat(((amount / totalAmount) * 100).toFixed(1)) : 0,
  }));

  if (!isAIConfigured()) {
    return res.json({ aiAvailable: false, enriched, sectorAllocation, totalAmount });
  }

  const holdingsSummary = enriched
    .map((h) => `${h.symbol} (${h.sector}): ₹${h.amount.toLocaleString('en-IN')} — P/E ${h.pe}, ROCE ${h.roce}%, ROE ${h.roe}%`)
    .join('\n');

  const sectorSummary = sectorAllocation
    .map((s) => `${s.sector}: ${s.percentage}%`)
    .join(', ');

  const prompt = `You are a portfolio analyst. Analyze this Indian stock portfolio:

Holdings:
${holdingsSummary}

Sector allocation: ${sectorSummary}
Total invested: ₹${totalAmount.toLocaleString('en-IN')}

Respond ONLY with a JSON object:
{
  "insights": ["insight 1", "insight 2", "insight 3"],
  "diversificationScore": 7,
  "topRisk": "One sentence about the biggest portfolio risk",
  "recommendation": "One sentence actionable suggestion"
}`;

  const { text, error, retryAfter } = await generateAIResponse(prompt);
  const parsed = safeParseJSON(text);

  const aiData = parsed
    ? { aiAvailable: true, ...parsed }
    : { aiAvailable: false, configured: true, error: error || 'AI returned invalid response', retryAfter: retryAfter || null };

  return res.json({ ...aiData, enriched, sectorAllocation, totalAmount });
};
