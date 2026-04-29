const api = require('../services/upstreamApi');
const { transformStockToCompany } = require('../utils/transformers');
const { MOCK_COMPANY } = require('../services/mockData');
const limiter = require('../utils/limiter');

async function fetchLive(sym) {
  return limiter.run(async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const { data } = await api.get(`/stock?symbol=${encodeURIComponent(sym)}&res=num`);
        if (data?.status === 'success' && data?.data) return data.data;
        return null;
      } catch (e) {
        if (e.response?.status === 503 && attempt < 2) {
          await new Promise((r) => setTimeout(r, 300 + attempt * 400 + Math.random() * 200));
          continue;
        }
        return null;
      }
    }
    return null;
  });
}

exports.getCompany = async (req, res) => {
  const { symbol } = req.params;
  const sym = symbol.toUpperCase();
  const mock = MOCK_COMPANY(sym);

  const raw = await fetchLive(sym);
  if (raw) {
    const transformed = transformStockToCompany(raw, sym);
    const merged = {
      ...mock,
      ...transformed,
      about: mock.about,
      pros: mock.pros,
      cons: mock.cons,
      peers: mock.peers,
      roce: mock.roce,
      roe: mock.roe,
      faceValue: mock.faceValue,
    };
    return res.json(merged);
  }

  console.log(`[MOCK FALLBACK] /api/company/${sym} — upstream unreachable`);
  return res.json(mock);
};
