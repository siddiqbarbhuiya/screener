# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start both servers concurrently (recommended)
npm run dev

# Backend only
cd server && npm run dev      # nodemon (auto-restart on file change)
cd server && node index.js    # plain node (no restart)

# Frontend only
cd client && npm run dev      # Vite dev server at http://localhost:5173

# Install all dependencies (root + server + client)
npm run install:all

# Playwright smoke test (searches ITC, navigates to company page)
cd client && node test-search.mjs
```

Backend runs on **port 5000**, frontend on **port 5173**.

> **Node constraint**: Node 20.12.2 is installed. Vite is pinned to v5 — do not upgrade to v6+ without upgrading Node to ≥20.19 first.

---

## Architecture

This is a monorepo BFF (Backend for Frontend). The React client never calls any external API directly — all requests go through the Express server.

```
client (React + Vite)
   ↓ axios → localhost:5000/api
Express BFF (Node.js)
   ├── 0xramm API  http://65.0.104.9        (price/market data, search)
   ├── Yahoo Finance                         (planned replacement/supplement)
   ├── Alpha Vantage                         (planned secondary data)
   ├── News API                              (planned: stock-reason feature)
   ├── AI Layer  OpenAI OR Ollama            (planned: AI insights)
   └── server/services/mockData.js           (fallback when upstream fails)
```

### Server (`server/`)

| Layer | Path | Purpose |
|---|---|---|
| Entry | `index.js` | Express app, CORS, error handler, upstream reachability check on boot |
| Routes | `routes/stockRoutes.js` | All `/api/*` stock routes |
| Controllers | `controllers/*.js` | Fetch → transform → merge with mock → respond |
| Upstream client | `services/upstreamApi.js` | Axios instance for 0xramm (`API_BASE_URL`) |
| AI service | `services/aiService.js` | Routes to Gemini (`gemini-2.5-flash`) or Ollama based on `AI_PROVIDER` |
| Mock data | `services/mockData.js` | Full fallback dataset (ITC, RELIANCE, TCS + defaults) |
| Transformer | `utils/transformers.js` | Maps raw 0xramm fields to app schema |
| Limiter | `utils/limiter.js` | Caps concurrent upstream calls at 2 to avoid 503s |

**`companyController` data merge**: live price/market data from upstream is spread over the mock base, but `about`, `pros`, `cons`, `peers`, `roce`, `roe`, and `faceValue` are always sourced from mock (the upstream has no equivalent fields). AI features will eventually replace these mock enrichment fields.

### Client (`client/src/`)

| Layer | Path | Purpose |
|---|---|---|
| Pages | `pages/` | Home, CompanyDashboard, Screener, NotFound |
| Hooks | `hooks/` | `useSearch`, `useCompany`, `useFinancials`, `useChart`, `useScreen` |
| Components | `components/company/` | All company-page sub-panels |
| API util | `utils/api.js` | Axios instance using `VITE_API_BASE_URL` |
| Formatters | `utils/format.js` | `formatCrores`, `formatPct`, `formatINR`, `formatNumber` |

All data-fetching hooks use the `isCurrent` flag pattern to handle React StrictMode's double-effect invocation without race conditions:

```js
useEffect(() => {
  let current = true;
  api.get(url)
    .then(r => { if (current) setState(r.data); })
    .catch(e => { if (current) setError(e.message); })
    .finally(() => { if (current) setLoading(false); });
  return () => { current = false; };
}, [dep]);
```

---

## Planned AI Features (Priority Order)

All AI routes live under `/api/ai/`. The AI service (`services/aiService.js`) switches between Gemini and Ollama via `AI_PROVIDER` env var. **Fail gracefully** when AI is unavailable — return `null` and let the UI hide the section. Keep responses under ~300 tokens.

### 1. AI Company Summary — `GET /api/ai/company-summary/:symbol`
Fetch fundamentals + ratios, construct a prompt, return structured JSON with `summary`, `strengths`, `risks`, `verdict`. Frontend component: `components/company/AIInsights.jsx`.

### 2. Natural Language Screener — `POST /api/ai/screener`
Input: `{ "query": "IT companies with high ROE and low debt" }`. AI converts to JSON filter object (`sector`, `roe`, `pe`, `debt_to_equity`), then pipe into existing screener logic. Frontend component: `components/screener/AISearchBar.jsx`.

### 3. Why Is This Stock Moving — `GET /api/ai/stock-reason/:symbol`
Fetch top 5 headlines from News API (`newsapi.org/v2/everything?q={symbol}`), prompt AI to explain likely cause of price movement. Frontend component: `components/company/StockReason.jsx`.

### 4. Red Flag Detector — `GET /api/ai/red-flags/:symbol`
Check trends in debt, profit, ROE from mock financials. Prompt AI for plain-language risk bullets. Frontend component: `components/company/RedFlags.jsx`.

### 5. Portfolio Analyzer — `POST /api/portfolio/analyze`
Input: `[{ symbol, amount }]`. Output: sector distribution, risk summary, AI narrative. Frontend page: `pages/Portfolio.jsx`.

### AI Service Implementation

```js
// server/services/aiService.js
const generateAIResponse = async (prompt) => {
  if (process.env.AI_PROVIDER === 'ollama') return callOllama(prompt);
  return callGemini(prompt);  // default
};
```

Gemini call uses `@google/genai` SDK, model `gemini-2.5-flash`, with `response_mime_type: 'application/json'` so output is always valid JSON. Ollama call targets `process.env.OLLAMA_BASE_URL/api/generate` with model `llama3`. Cache AI responses keyed on `symbol + hash(prompt)` to avoid redundant calls.

---

## Performance & Reliability Rules

- Use `utils/limiter.js` for all concurrent outgoing upstream calls (already wired into `companyController`).
- Cache API and AI responses in-memory (or Redis later) — key by symbol + prompt hash for AI.
- Rate-limit AI endpoints to prevent runaway costs.
- Do NOT depend on real-time data for MVP — fall back to mock wherever the upstream is unavailable.

---

## Upstream API Quirks (0xramm)

- `dividend_yield` is returned in basis points (e.g. `471` = 4.71%). `transformers.js` normalises values `> 50` by dividing by 100.
- Historical chart, financial tables, and shareholding have no real endpoints — always returns mock.
- The upstream 503s under concurrent load — handled by `utils/limiter.js` (max 2) + retry with jitter in `companyController`.
- Search results have no `exchange` field — `SearchBar` renders the exchange badge conditionally.

---

## Environment Files

**`server/.env`** — add your keys where marked:
```
PORT=5000
NODE_ENV=development

# Existing data source
API_BASE_URL=http://65.0.104.9
NSE_BSE_API_KEY=

# Planned data sources
YAHOO_BASE_URL=https://query1.finance.yahoo.com
ALPHA_VANTAGE_API_KEY=
NEWS_API_KEY=

# AI layer
AI_PROVIDER=gemini
GEMINI_API_KEY=
OPENAI_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
```

**`client/.env`**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME="Indian Stock Screener AI"
```
