function transformStockToCompany(raw, symbol) {
  return {
    symbol: symbol.toUpperCase(),
    name: raw.company_name || raw.name || symbol,
    sector: raw.sector || null,
    industry: raw.industry || null,
    price: parseFloat(raw.last_price) || null,
    change: parseFloat(raw.change) || null,
    percentChange: parseFloat(raw.percent_change) || null,
    high52w: parseFloat(raw.year_high) || null,
    low52w: parseFloat(raw.year_low) || null,
    dayHigh: parseFloat(raw.day_high) || null,
    dayLow: parseFloat(raw.day_low) || null,
    marketCap: parseFloat(raw.market_cap) || null,
    pe: parseFloat(raw.pe_ratio) || null,
    dividendYield: (() => {
      const v = parseFloat(raw.dividend_yield);
      if (!v) return null;
      // API returns dividend yield in basis points (e.g. 471 = 4.71%)
      return v > 50 ? parseFloat((v / 100).toFixed(2)) : v;
    })(),
    bookValue: parseFloat(raw.book_value) || null,
    eps: parseFloat(raw.earnings_per_share) || null,
    // Fields not in 0xramm API — filled from mock
    roce: null,
    roe: null,
    faceValue: null,
    about: null,
    pros: [],
    cons: [],
    peers: [],
  };
}

module.exports = { transformStockToCompany };
