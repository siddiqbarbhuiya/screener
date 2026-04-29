const { MOCK_FINANCIALS } = require('../services/mockData');

exports.getFinancials = (req, res) => {
  const { quarterly, pnl, balanceSheet, cashFlow, ratios } = MOCK_FINANCIALS;
  return res.json({ quarterly, pnl, balanceSheet, cashFlow, ratios });
};

exports.getShareholding = (req, res) => {
  return res.json(MOCK_FINANCIALS.shareholding);
};
