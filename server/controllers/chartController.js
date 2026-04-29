const { MOCK_CHART } = require('../services/mockData');

const VALID_PERIODS = ['1M', '6M', '1Y', '3Y', '5Y', 'Max'];

// TODO: Replace with real historical data source when available.
// Return shape: { labels: string[], prices: number[] }
exports.getChart = (req, res) => {
  const { symbol } = req.params;
  const period = VALID_PERIODS.includes(req.query.period) ? req.query.period : '1Y';
  const chartData = MOCK_CHART(symbol, period);
  return res.json(chartData);
};
