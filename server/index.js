require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.json());

app.get('/health', (_, res) => res.json({ status: 'ok' }));

const stockRoutes = require('./routes/stockRoutes');
const aiRoutes = require('./routes/aiRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api', stockRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api', contactRoutes);

app.use((err, req, res, next) => {
  console.error('[ERROR]...................', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await axios.get(process.env.API_BASE_URL || 5000, { timeout: 3000 });
    console.log('[UPSTREAM] 0xramm API is reachable — using live data where available');
    console.log('server started at', process.env.PORT)
  } catch {
    console.log('[UPSTREAM] 0xramm API unreachable — all responses will use mock data');
  }
});
