const INDICES = [
  { name: 'NIFTY 50',          value: 24285.40, change:  125.30, pctChange:  0.52 },
  { name: 'SENSEX',            value: 79943.20, change:  386.55, pctChange:  0.49 },
  { name: 'BANK NIFTY',        value: 51642.80, change: -124.65, pctChange: -0.24 },
  { name: 'NIFTY IT',          value: 38542.15, change:  892.30, pctChange:  2.37 },
  { name: 'NIFTY MIDCAP 100',  value: 56784.50, change:  234.80, pctChange:  0.41 },
  { name: 'NIFTY SMALLCAP 100',value: 18965.30, change:  -45.20, pctChange: -0.24 },
  { name: 'INDIA VIX',         value:    12.84, change:   -0.32, pctChange: -2.43 },
  { name: 'NIFTY AUTO',        value: 22456.75, change:  312.40, pctChange:  1.41 },
  { name: 'NIFTY PHARMA',      value: 19873.25, change:  -98.45, pctChange: -0.49 },
  { name: 'NIFTY FMCG',        value: 56234.80, change:  445.60, pctChange:  0.80 },
  { name: 'NIFTY METAL',       value: 10234.60, change:  -87.30, pctChange: -0.85 },
  { name: 'NIFTY REALTY',      value:  1045.25, change:   18.45, pctChange:  1.80 },
];

exports.getIndices = (_req, res) => res.json(INDICES);
