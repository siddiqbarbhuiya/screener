const { GoogleGenAI } = require('@google/genai');

const ANALYSIS_PROMPT = `You are an expert financial analyst specializing in Indian stock market (NSE/BSE) companies.
Analyze the provided financial document and extract comprehensive investment insights.

Return ONLY a valid JSON object (no markdown, no backticks) with this EXACT structure:
{
  "companyName": "string",
  "ticker": "string (NSE/BSE ticker)",
  "sector": "string (e.g., IT, Pharma, Auto, Banking, FMCG, etc.)",
  "marketCap": "string (e.g., 'Rs 1.2 Lakh Cr')",
  "summary": "string (150 words executive summary)",
  "bullishnessScore": number (0-100 scale),
  "bullishnessReasoning": ["string", "string", "string", "string", "string"],
  "financialMetrics": {
    "revenueGrowth": number (% growth YoY),
    "profitMargin": number (% net profit margin),
    "debtToEquity": number (debt/equity ratio),
    "roe": number (return on equity %),
    "eps": "string (earnings per share)",
    "peRatio": number (price to earnings ratio)
  },
  "longTermProjections": [
    {"metric": "FY25 Revenue Target", "value": "string"},
    {"metric": "FY26 Target", "value": "string"},
    {"metric": "CAGR Expected", "value": "string"},
    {"metric": "Margin Expansion", "value": "string"},
    {"metric": "Capex Plan", "value": "string"}
  ],
  "orderBook": {
    "totalValue": "string (e.g., 'Rs 50,000 Cr')",
    "timeline": "string (execution timeline)"
  },
  "keyRisks": ["string risk 1", "string risk 2", "string risk 3", "string risk 4", "string risk 5", "string risk 6", "string risk 7", "string risk 8"],
  "futureOutlook": "string (200 words 3-5 year outlook)",
  "competitiveAdvantage": ["string advantage 1", "string advantage 2", "string advantage 3", "string advantage 4"],
  "managementQuality": number (1-10 scale),
  "pricingStrategy": "string (company's pricing strategy and market position)",
  "marketOpportunity": "string (TAM and market opportunity)"
}`;

function sanitizeText(raw = '') {
  if (!raw) return '';
  return raw.replace(/```json/gi, '').replace(/```/g, '').trim();
}

function toSafeAnalysis(analysisData = {}) {
  return {
    companyName: analysisData.companyName || 'Unknown Company',
    ticker: analysisData.ticker || 'N/A',
    sector: analysisData.sector || 'Unknown',
    marketCap: analysisData.marketCap || 'N/A',
    summary: analysisData.summary || 'Summary not available.',
    bullishnessScore: Math.min(100, Math.max(0, Number(analysisData.bullishnessScore) || 50)),
    bullishnessReasoning: Array.isArray(analysisData.bullishnessReasoning)
      ? analysisData.bullishnessReasoning.slice(0, 5)
      : ['Analysis completed'],
    financialMetrics: {
      revenueGrowth: Number(analysisData.financialMetrics?.revenueGrowth) || 0,
      profitMargin: Number(analysisData.financialMetrics?.profitMargin) || 0,
      debtToEquity: Number(analysisData.financialMetrics?.debtToEquity) || 0,
      roe: Number(analysisData.financialMetrics?.roe) || 0,
      eps: analysisData.financialMetrics?.eps || 'N/A',
      peRatio: Number(analysisData.financialMetrics?.peRatio) || 0,
    },
    longTermProjections: Array.isArray(analysisData.longTermProjections)
      ? analysisData.longTermProjections.slice(0, 8)
      : [],
    orderBook: analysisData.orderBook || { totalValue: 'N/A', timeline: 'N/A' },
    keyRisks: Array.isArray(analysisData.keyRisks) ? analysisData.keyRisks.slice(0, 8) : [],
    futureOutlook: analysisData.futureOutlook || 'Outlook not available.',
    competitiveAdvantage: Array.isArray(analysisData.competitiveAdvantage)
      ? analysisData.competitiveAdvantage.slice(0, 4)
      : [],
    managementQuality: Math.min(10, Math.max(1, Number(analysisData.managementQuality) || 5)),
    pricingStrategy: analysisData.pricingStrategy || 'Strategy analysis pending',
    marketOpportunity: analysisData.marketOpportunity || 'Market analysis pending',
  };
}

exports.analyzeDocument = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No PDF file uploaded' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(400).json({ error: 'GEMINI_API_KEY not configured in server/.env' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const base64Data = req.file.buffer.toString('base64');

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { text: ANALYSIS_PROMPT },
            {
              inlineData: {
                mimeType: 'application/pdf',
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        response_mime_type: 'application/json',
      },
    });

    const text = sanitizeText(response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || '');
    const parsed = JSON.parse(text);
    return res.json(toSafeAnalysis(parsed));
  } catch (error) {
    console.error('[document-analyze] failed:', error.message);
    return res.status(500).json({
      error: error.message || 'Failed to analyze document',
    });
  }
};
