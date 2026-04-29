const MOCK_SEARCH_RESULTS = [
  { symbol: 'ITC', company_name: 'ITC Limited', exchange: 'NSE' },
  { symbol: 'RELIANCE', company_name: 'Reliance Industries Ltd', exchange: 'NSE' },
  { symbol: 'TCS', company_name: 'Tata Consultancy Services Ltd', exchange: 'NSE' },
  { symbol: 'HDFCBANK', company_name: 'HDFC Bank Ltd', exchange: 'NSE' },
  { symbol: 'INFY', company_name: 'Infosys Ltd', exchange: 'NSE' },
  { symbol: 'ICICIBANK', company_name: 'ICICI Bank Ltd', exchange: 'NSE' },
  { symbol: 'HINDUNILVR', company_name: 'Hindustan Unilever Ltd', exchange: 'NSE' },
  { symbol: 'SBIN', company_name: 'State Bank of India', exchange: 'NSE' },
  { symbol: 'BHARTIARTL', company_name: 'Bharti Airtel Ltd', exchange: 'NSE' },
  { symbol: 'KOTAKBANK', company_name: 'Kotak Mahindra Bank Ltd', exchange: 'NSE' },
  { symbol: 'LT', company_name: 'Larsen & Toubro Ltd', exchange: 'NSE' },
  { symbol: 'AXISBANK', company_name: 'Axis Bank Ltd', exchange: 'NSE' },
  { symbol: 'BAJFINANCE', company_name: 'Bajaj Finance Ltd', exchange: 'NSE' },
  { symbol: 'WIPRO', company_name: 'Wipro Ltd', exchange: 'NSE' },
  { symbol: 'MARUTI', company_name: 'Maruti Suzuki India Ltd', exchange: 'NSE' },
  { symbol: 'TITAN', company_name: 'Titan Company Ltd', exchange: 'NSE' },
  { symbol: 'NESTLEIND', company_name: 'Nestle India Ltd', exchange: 'NSE' },
  { symbol: 'SUNPHARMA', company_name: 'Sun Pharmaceutical Industries Ltd', exchange: 'NSE' },
  { symbol: 'ULTRACEMCO', company_name: 'UltraTech Cement Ltd', exchange: 'NSE' },
  { symbol: 'POWERGRID', company_name: 'Power Grid Corporation of India Ltd', exchange: 'NSE' },
  { symbol: 'TATAMOTORS', company_name: 'Tata Motors Ltd', exchange: 'NSE' },
  { symbol: 'ONGC', company_name: 'Oil & Natural Gas Corporation Ltd', exchange: 'NSE' },
  { symbol: 'NTPC', company_name: 'NTPC Ltd', exchange: 'NSE' },
  { symbol: 'ADANIPORTS', company_name: 'Adani Ports & SEZ Ltd', exchange: 'NSE' },
  { symbol: 'JSWSTEEL', company_name: 'JSW Steel Ltd', exchange: 'NSE' },
  { symbol: 'TATASTEEL', company_name: 'Tata Steel Ltd', exchange: 'NSE' },
  { symbol: 'TECHM', company_name: 'Tech Mahindra Ltd', exchange: 'NSE' },
  { symbol: 'DRREDDY', company_name: 'Dr. Reddys Laboratories Ltd', exchange: 'NSE' },
  { symbol: 'CIPLA', company_name: 'Cipla Ltd', exchange: 'NSE' },
  { symbol: 'DIVISLAB', company_name: "Divi's Laboratories Ltd", exchange: 'NSE' },
];

const COMPANY_DATA = {
  ITC: {
    name: 'ITC Limited',
    sector: 'FMCG',
    industry: 'Cigarettes & Tobacco Products',
    price: 453.20,
    change: 5.35,
    percentChange: 1.19,
    high52w: 528.50,
    low52w: 399.35,
    dayHigh: 455.80,
    dayLow: 447.10,
    marketCap: 5660000000000,
    pe: 27.4,
    dividendYield: 3.12,
    bookValue: 122.50,
    eps: 16.54,
    roce: 38.2,
    roe: 29.5,
    faceValue: 1,
    about: 'ITC is one of India\'s foremost multi-business enterprises. Its diversified business includes Cigarettes & Tobacco, Hotels, Paperboards, Packaging & Agri-business, and FMCG. The company\'s FMCG brands include Aashirvaad, Sunfeast, Bingo!, Yippee! and more.',
    pros: [
      'Company has delivered good profit growth of 17.1% CAGR over last 5 years',
      'Company has been maintaining a healthy dividend payout of 92.8%',
      'Stock is trading at 3.70x its book value',
      'Company has a good return on equity (ROE) track record: 3 Years ROE 29%',
      'Promoter holding has not changed in last 5 quarters',
    ],
    cons: [
      'Promoter holding is low at 0.00%',
      'The company has low interest coverage ratio',
      'Tax rate seems high at 30%',
      'Revenue growth has slowed in recent quarters',
    ],
    peers: [
      { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2485.60, pe: 58.2, marketCap: 58350000000000, roce: 89.5, roe: 68.3 },
      { symbol: 'NESTLEIND', name: 'Nestle India', price: 2278.40, pe: 74.1, marketCap: 21950000000000, roce: 112.4, roe: 85.6 },
      { symbol: 'DABUR', name: 'Dabur India', price: 521.30, pe: 51.8, marketCap: 9260000000000, roce: 23.1, roe: 18.7 },
      { symbol: 'GODREJCP', name: 'Godrej Consumer Products', price: 1087.50, pe: 55.3, marketCap: 11150000000000, roce: 18.4, roe: 15.2 },
      { symbol: 'MARICO', name: 'Marico Ltd', price: 598.75, pe: 47.6, marketCap: 7750000000000, roce: 42.6, roe: 38.9 },
    ],
  },
  RELIANCE: {
    name: 'Reliance Industries Ltd',
    sector: 'Energy',
    industry: 'Refineries & Marketing',
    price: 2847.50,
    change: -12.30,
    percentChange: -0.43,
    high52w: 3217.90,
    low52w: 2220.30,
    dayHigh: 2862.00,
    dayLow: 2835.15,
    marketCap: 192480000000000,
    pe: 26.8,
    dividendYield: 0.35,
    bookValue: 1198.40,
    eps: 106.25,
    roce: 10.2,
    roe: 8.9,
    faceValue: 10,
    about: 'Reliance Industries Limited is India\'s largest private sector company. Reliance has diverse business interests spanning energy, petrochemicals, retail, telecommunications, and media. Its subsidiary Jio disrupted the Indian telecom sector.',
    pros: [
      'Company has reduced debt in recent years',
      'Jio Platforms showing strong subscriber growth',
      'Retail segment (Reliance Retail) is the largest retailer in India',
      'Strong cash flow generation from refining business',
    ],
    cons: [
      'High capital expenditure requirements',
      'Debt levels remain elevated despite reduction',
      'Telecom business faces intense competition',
    ],
    peers: [
      { symbol: 'ONGC', name: 'ONGC Ltd', price: 268.45, pe: 9.2, marketCap: 33750000000000, roce: 12.4, roe: 11.8 },
      { symbol: 'IOC', name: 'Indian Oil Corporation', price: 172.30, pe: 7.8, marketCap: 24360000000000, roce: 14.5, roe: 13.2 },
      { symbol: 'BPCL', name: 'Bharat Petroleum', price: 341.80, pe: 10.4, marketCap: 14810000000000, roce: 16.8, roe: 15.1 },
    ],
  },
  TCS: {
    name: 'Tata Consultancy Services Ltd',
    sector: 'IT',
    industry: 'IT Services & Consulting',
    price: 3587.40,
    change: 28.75,
    percentChange: 0.81,
    high52w: 4592.25,
    low52w: 3311.00,
    dayHigh: 3598.00,
    dayLow: 3560.20,
    marketCap: 130180000000000,
    pe: 28.5,
    dividendYield: 1.45,
    bookValue: 418.20,
    eps: 125.87,
    roce: 61.4,
    roe: 52.8,
    faceValue: 1,
    about: 'Tata Consultancy Services is an Indian multinational IT services and consulting company. It is the largest IT company in India by market capitalization. TCS offers a range of IT services including application development, business process services, and consulting.',
    pros: [
      'Consistent revenue growth over 5+ years',
      'Strong margins in the IT sector (22-25% EBITDA)',
      'High return on equity above 50%',
      'Strong cash generation and dividend payouts',
    ],
    cons: [
      'Slower revenue growth in recent quarters due to global IT spending slowdown',
      'High attrition historically (though improving)',
      'Currency headwinds from USD/INR movements',
    ],
    peers: [
      { symbol: 'INFY', name: 'Infosys', price: 1768.90, pe: 24.1, marketCap: 73560000000000, roce: 43.8, roe: 32.4 },
      { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.60, pe: 22.8, marketCap: 27490000000000, roce: 21.5, roe: 17.9 },
      { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1648.20, pe: 26.3, marketCap: 44720000000000, roce: 35.2, roe: 28.6 },
      { symbol: 'TECHM', name: 'Tech Mahindra', price: 1574.80, pe: 31.4, marketCap: 15390000000000, roce: 18.9, roe: 14.3 },
    ],
  },
};

const DEFAULT_COMPANY = (symbol) => ({
  symbol,
  name: symbol + ' Ltd',
  sector: 'Diversified',
  industry: 'Diversified',
  price: 500.00,
  change: 2.50,
  percentChange: 0.50,
  high52w: 620.00,
  low52w: 380.00,
  dayHigh: 505.00,
  dayLow: 495.00,
  marketCap: 50000000000,
  pe: 20.0,
  dividendYield: 1.5,
  bookValue: 150.00,
  eps: 25.00,
  roce: 18.0,
  roe: 15.0,
  faceValue: 1,
  about: `${symbol} is a listed company on Indian stock exchanges.`,
  pros: ['Consistent dividend payer', 'Healthy balance sheet'],
  cons: ['Limited growth visibility', 'High competition in sector'],
  peers: [],
});

function MOCK_COMPANY(symbol) {
  const sym = symbol.toUpperCase();
  const data = COMPANY_DATA[sym] || DEFAULT_COMPANY(sym);
  return { symbol: sym, ...data };
}

function generatePrices(base, count, volatility = 0.015) {
  const prices = [];
  let price = base;
  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * volatility * price;
    price = Math.max(price * 0.5, price + change);
    prices.push(parseFloat(price.toFixed(2)));
  }
  return prices;
}

function generateDates(count, intervalDays) {
  const dates = [];
  const end = new Date('2026-04-29');
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i * intervalDays);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

const PERIOD_CONFIG = {
  '1M': { count: 21, intervalDays: 1 },
  '6M': { count: 26, intervalDays: 7 },
  '1Y': { count: 52, intervalDays: 7 },
  '3Y': { count: 36, intervalDays: 30 },
  '5Y': { count: 60, intervalDays: 30 },
  'Max': { count: 120, intervalDays: 30 },
};

function MOCK_CHART(symbol, period) {
  const sym = symbol.toUpperCase();
  const basePrice = (COMPANY_DATA[sym] || DEFAULT_COMPANY(sym)).price;
  const cfg = PERIOD_CONFIG[period] || PERIOD_CONFIG['1Y'];
  const startMultiplier = period === '1M' ? 0.95 : period === '6M' ? 0.85 : period === '1Y' ? 0.75 : period === '3Y' ? 0.55 : period === '5Y' ? 0.40 : 0.25;
  const labels = generateDates(cfg.count, cfg.intervalDays);
  const prices = generatePrices(basePrice * startMultiplier, cfg.count);
  prices[prices.length - 1] = basePrice;
  return { labels, prices };
}

const MOCK_FINANCIALS = {
  quarterly: {
    headers: ['', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'],
    rows: [
      ['Revenue (₹ Cr)', '17,885', '19,221', '20,146', '21,348', '18,594', '20,187', '21,652'],
      ['Expenses (₹ Cr)', '13,204', '14,118', '14,897', '15,642', '13,798', '14,952', '16,024'],
      ['Operating Profit (₹ Cr)', '4,681', '5,103', '5,249', '5,706', '4,796', '5,235', '5,628'],
      ['OPM %', '26%', '27%', '26%', '27%', '26%', '26%', '26%'],
      ['Other Income (₹ Cr)', '412', '389', '445', '521', '398', '432', '467'],
      ['Interest (₹ Cr)', '8', '7', '9', '8', '7', '8', '9'],
      ['Depreciation (₹ Cr)', '342', '358', '371', '384', '356', '372', '389'],
      ['Profit Before Tax (₹ Cr)', '4,743', '5,127', '5,314', '5,835', '4,831', '5,287', '5,697'],
      ['Tax %', '25%', '25%', '25%', '26%', '25%', '25%', '25%'],
      ['Net Profit (₹ Cr)', '3,557', '3,845', '3,986', '4,317', '3,623', '3,965', '4,273'],
      ['EPS (₹)', '2.84', '3.07', '3.19', '3.45', '2.90', '3.17', '3.42'],
    ],
  },
  pnl: {
    headers: ['', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024', 'TTM'],
    rows: [
      ['Revenue (₹ Cr)', '48,586', '50,211', '45,910', '59,253', '69,481', '78,719', '80,433'],
      ['Expenses (₹ Cr)', '37,824', '38,956', '34,487', '44,218', '51,462', '57,861', '59,028'],
      ['Operating Profit (₹ Cr)', '10,762', '11,255', '11,423', '15,035', '18,019', '20,858', '21,405'],
      ['OPM %', '22%', '22%', '25%', '25%', '26%', '27%', '27%'],
      ['Other Income (₹ Cr)', '1,245', '1,378', '1,512', '1,687', '1,524', '1,767', '1,742'],
      ['Interest (₹ Cr)', '45', '38', '32', '28', '31', '32', '33'],
      ['Depreciation (₹ Cr)', '1,089', '1,178', '1,245', '1,312', '1,384', '1,455', '1,489'],
      ['Profit Before Tax (₹ Cr)', '10,873', '11,417', '11,658', '15,382', '18,128', '21,138', '21,625'],
      ['Tax %', '26%', '25%', '25%', '25%', '25%', '25%', '25%'],
      ['Net Profit (₹ Cr)', '8,046', '8,563', '8,744', '11,537', '13,596', '15,854', '16,219'],
      ['EPS (₹)', '6.43', '6.85', '6.99', '9.23', '10.87', '12.68', '12.97'],
      ['Dividend / Share (₹)', '5.75', '10.50', '10.75', '11.50', '6.25', '7.50', '—'],
    ],
  },
  balanceSheet: {
    headers: ['', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'],
    rows: [
      ['Equity Capital (₹ Cr)', '1,230', '1,229', '1,251', '1,249', '1,248', '1,247'],
      ['Reserves (₹ Cr)', '44,218', '48,563', '52,847', '61,284', '70,562', '80,987'],
      ['Borrowings (₹ Cr)', '287', '245', '198', '154', '126', '108'],
      ['Other Liabilities (₹ Cr)', '12,548', '13,247', '14,521', '16,478', '18,235', '20,112'],
      ['Total Liabilities (₹ Cr)', '58,283', '63,284', '68,817', '79,165', '90,171', '102,454'],
      ['Fixed Assets (₹ Cr)', '14,521', '15,478', '16,235', '17,124', '17,985', '18,742'],
      ['CWIP (₹ Cr)', '1,245', '1,387', '1,524', '1,678', '1,845', '2,012'],
      ['Investments (₹ Cr)', '18,547', '20,124', '22,485', '26,547', '30,214', '34,785'],
      ['Other Assets (₹ Cr)', '23,970', '26,295', '28,573', '33,816', '40,127', '46,915'],
      ['Total Assets (₹ Cr)', '58,283', '63,284', '68,817', '79,165', '90,171', '102,454'],
    ],
  },
  cashFlow: {
    headers: ['', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'],
    rows: [
      ['Cash from Operations (₹ Cr)', '9,845', '10,524', '11,248', '13,587', '15,824', '18,245'],
      ['Cash from Investing (₹ Cr)', '-4,512', '-5,124', '-3,845', '-5,678', '-6,245', '-7,124'],
      ['Cash from Financing (₹ Cr)', '-7,124', '-8,245', '-9,012', '-11,245', '-12,478', '-14,825'],
      ['Net Cash Flow (₹ Cr)', '-1,791', '-2,845', '-1,609', '-3,336', '-2,899', '-3,704'],
    ],
  },
  ratios: {
    headers: ['', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024'],
    rows: [
      ['Debtor Days', '48', '45', '41', '38', '35', '32'],
      ['Inventory Days', '112', '108', '105', '98', '94', '89'],
      ['Days Payable', '68', '71', '74', '78', '82', '85'],
      ['Cash Conversion Cycle', '92', '82', '72', '58', '47', '36'],
      ['Working Capital Days', '78', '68', '58', '44', '35', '27'],
      ['ROCE %', '32.4', '33.1', '34.5', '36.2', '37.8', '38.2'],
      ['ROE %', '24.1', '24.8', '25.4', '27.2', '28.6', '29.5'],
    ],
  },
  shareholding: {
    quarters: ['Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024'],
    promoter: [0, 0, 0, 0, 0, 0],
    dii: [36.8, 37.2, 37.5, 38.1, 38.4, 39.2],
    fii: [13.2, 13.8, 14.1, 14.5, 14.2, 13.8],
    public: [50.0, 49.0, 48.4, 47.4, 47.4, 47.0],
  },
};

const MOCK_SCREEN_RESULTS = [
  { symbol: 'ITC', name: 'ITC Limited', price: 453.20, pe: 27.4, marketCap: 566000, roce: 38.2, roe: 29.5, dividendYield: 3.12, bookValue: 122.50 },
  { symbol: 'TCS', name: 'TCS Ltd', price: 3587.40, pe: 28.5, marketCap: 1301800, roce: 61.4, roe: 52.8, dividendYield: 1.45, bookValue: 418.20 },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1768.90, pe: 24.1, marketCap: 735600, roce: 43.8, roe: 32.4, dividendYield: 2.15, bookValue: 248.50 },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2847.50, pe: 26.8, marketCap: 1924800, roce: 10.2, roe: 8.9, dividendYield: 0.35, bookValue: 1198.40 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1742.30, pe: 18.5, marketCap: 1324500, roce: 16.8, roe: 15.2, dividendYield: 1.12, bookValue: 598.40 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2485.60, pe: 58.2, marketCap: 583500, roce: 89.5, roe: 68.3, dividendYield: 1.85, bookValue: 84.20 },
  { symbol: 'NESTLEIND', name: 'Nestle India', price: 2278.40, pe: 74.1, marketCap: 219500, roce: 112.4, roe: 85.6, dividendYield: 1.28, bookValue: 102.50 },
  { symbol: 'WIPRO', name: 'Wipro Ltd', price: 524.60, pe: 22.8, marketCap: 274900, roce: 21.5, roe: 17.9, dividendYield: 0.38, bookValue: 165.80 },
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: 12487.50, pe: 25.6, marketCap: 377200, roce: 24.8, roe: 19.2, dividendYield: 0.68, bookValue: 3548.20 },
  { symbol: 'TITAN', name: 'Titan Company', price: 3312.80, pe: 85.4, marketCap: 294800, roce: 32.4, roe: 29.8, dividendYield: 0.45, bookValue: 298.40 },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 7248.50, pe: 35.2, marketCap: 437200, roce: 12.4, roe: 21.8, dividendYield: 0.27, bookValue: 1248.70 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 1287.40, pe: 17.8, marketCap: 906500, roce: 14.5, roe: 16.2, dividendYield: 0.85, bookValue: 512.30 },
  { symbol: 'KOTAKBANK', name: 'Kotak Mahindra Bank', price: 1984.60, pe: 22.4, marketCap: 394800, roce: 13.2, roe: 14.5, dividendYield: 0.12, bookValue: 498.20 },
  { symbol: 'LT', name: 'Larsen & Toubro', price: 3487.20, pe: 34.8, marketCap: 479200, roce: 15.8, roe: 14.2, dividendYield: 1.02, bookValue: 854.30 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 812.40, pe: 9.8, marketCap: 724800, roce: 10.5, roe: 17.8, dividendYield: 1.98, bookValue: 384.50 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 1748.60, pe: 68.4, marketCap: 1048200, roce: 12.4, roe: 28.4, dividendYield: 0.34, bookValue: 248.70 },
  { symbol: 'ONGC', name: 'ONGC Ltd', price: 268.45, pe: 9.2, marketCap: 337500, roce: 12.4, roe: 11.8, dividendYield: 4.28, bookValue: 198.40 },
  { symbol: 'NTPC', name: 'NTPC Ltd', price: 348.20, pe: 14.8, marketCap: 338200, roce: 11.2, roe: 12.4, dividendYield: 2.54, bookValue: 152.30 },
  { symbol: 'POWERGRID', name: 'Power Grid Corp', price: 312.80, pe: 15.4, marketCap: 290400, roce: 13.8, roe: 19.4, dividendYield: 3.84, bookValue: 148.20 },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: 1648.40, pe: 32.4, marketCap: 394800, roce: 18.4, roe: 14.8, dividendYield: 0.72, bookValue: 398.50 },
  { symbol: 'DRREDDY', name: "Dr. Reddy's Labs", price: 6248.70, pe: 26.8, marketCap: 104200, roce: 24.8, roe: 19.2, dividendYield: 0.32, bookValue: 1498.40 },
  { symbol: 'CIPLA', name: 'Cipla Ltd', price: 1548.20, pe: 28.4, marketCap: 124800, roce: 21.4, roe: 17.8, dividendYield: 0.58, bookValue: 498.30 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', price: 987.50, pe: 12.4, marketCap: 361200, roce: 18.4, roe: 48.2, dividendYield: 0.51, bookValue: 248.40 },
  { symbol: 'TATASTEEL', name: 'Tata Steel', price: 168.40, pe: 8.4, marketCap: 212400, roce: 14.8, roe: 11.2, dividendYield: 2.96, bookValue: 98.40 },
  { symbol: 'JSWSTEEL', name: 'JSW Steel', price: 984.60, pe: 15.4, marketCap: 239400, roce: 16.8, roe: 18.4, dividendYield: 0.81, bookValue: 298.50 },
  { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 1287.40, pe: 28.4, marketCap: 278400, roce: 14.8, roe: 18.2, dividendYield: 0.39, bookValue: 454.30 },
  { symbol: 'ULTRACEMCO', name: 'UltraTech Cement', price: 11487.50, pe: 38.4, marketCap: 332400, roce: 18.4, roe: 14.8, dividendYield: 0.43, bookValue: 2498.40 },
  { symbol: 'AXISBANK', name: 'Axis Bank', price: 1198.40, pe: 14.8, marketCap: 370800, roce: 12.8, roe: 17.4, dividendYield: 0.08, bookValue: 448.30 },
  { symbol: 'TECHM', name: 'Tech Mahindra', price: 1574.80, pe: 31.4, marketCap: 153900, roce: 18.9, roe: 14.3, dividendYield: 2.54, bookValue: 398.40 },
  { symbol: 'HCLTECH', name: 'HCL Technologies', price: 1648.20, pe: 26.3, marketCap: 447200, roce: 35.2, roe: 28.6, dividendYield: 4.25, bookValue: 348.50 },
];

module.exports = {
  MOCK_SEARCH_RESULTS,
  MOCK_COMPANY,
  MOCK_CHART,
  MOCK_FINANCIALS,
  MOCK_SCREEN_RESULTS,
};
