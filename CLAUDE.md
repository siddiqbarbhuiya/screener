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

# Production build + bundle analysis
cd client && npm run build
cd client && npm run build:analyze

# Lighthouse audits (requires running dev server)
cd client && npm run lighthouse:mobile
cd client && npm run lighthouse:desktop
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
   ├── Alpha Vantage                         (secondary data)
   ├── News API / Newsdata                   (stock news, market news)
   ├── AI Layer  Gemini OR Ollama            (AI insights, screener, red flags)
   └── server/services/mockData.js           (fallback when upstream fails)
```

### Server (`server/`)

| Layer | Path | Purpose |
|---|---|---|
| Entry | `index.js` | Express app, manual CORS headers, upstream reachability check on boot |
| Routes | `routes/stockRoutes.js` | `/api/*` stock, news, screen routes |
| Routes | `routes/aiRoutes.js` | `/api/ai/*` AI insight routes |
| Routes | `routes/portfolioRoutes.js` | `/api/portfolio/*` portfolio routes |
| Upstream client | `services/upstreamApi.js` | Axios instance for 0xramm (`API_BASE_URL`) |
| AI service | `services/aiService.js` | Routes to Gemini (`gemini-2.5-flash`) or Ollama; error parsing + retry |
| Cache service | `services/cacheService.js` | In-memory response cache keyed by symbol/prompt hash |
| News service | `services/newsService.js` | Wraps News API / Newsdata endpoints |
| Mock data | `services/mockData.js` | Full fallback dataset (ITC, RELIANCE, TCS + defaults) |
| Transformer | `utils/transformers.js` | Maps raw 0xramm fields to app schema |
| Limiter | `utils/limiter.js` | Caps concurrent upstream calls at 2 to avoid 503s |

**`companyController` data merge**: live price/market data from upstream is spread over the mock base, but `about`, `pros`, `cons`, `peers`, `roce`, `roe`, and `faceValue` are always sourced from mock.

### Stock Routes (`routes/stockRoutes.js`)

| Method | Path | Controller |
|---|---|---|
| GET | `/api/search` | `searchController.search` |
| GET | `/api/company/:symbol` | `companyController.getCompany` |
| GET | `/api/company/:symbol/chart` | `chartController.getChart` |
| GET | `/api/company/:symbol/financials` | `financialsController.getFinancials` |
| GET | `/api/company/:symbol/shareholding` | `financialsController.getShareholding` |
| GET | `/api/company/:symbol/news` | `newsController.stockNews` |
| GET | `/api/news/market` | `newsController.marketNews` |
| POST | `/api/screen` | `screenController.runScreen` |

### Client (`client/src/`)

| Layer | Path | Purpose |
|---|---|---|
| Pages | `pages/` | Home, CompanyDashboard, Screener, Portfolio, DocumentAnalyzer, NotFound |
| Hooks | `hooks/` | `useSearch`, `useCompany`, `useFinancials`, `useChart`, `useScreen`, `useAI` |
| Company components | `components/company/` | All company-page sub-panels (AIInsights, StockReason, RedFlags, StockNewsPanel, etc.) |
| Screener components | `components/screener/` | `AISearchBar` (natural language screener input) |
| API util | `utils/api.js` | Two axios instances: `api` (10s timeout) and `aiApi` (30s timeout) |
| Formatters | `utils/format.js` | `formatCrores`, `formatPct`, `formatINR`, `formatNumber` |

Use `aiApi` (not `api`) when calling `/api/ai/*` endpoints — AI responses can take longer than 10 seconds.

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

## AI Features

All AI routes live under `/api/ai/`. `services/aiService.js` switches between Gemini and Ollama via `AI_PROVIDER` env var. `generateAIResponse` returns `{ text, error, retryAfter }` — always fail gracefully when AI is unavailable and let the UI hide the section.

| Route | Component | Description |
|---|---|---|
| `GET /api/ai/company-summary/:symbol` | `AIInsights.jsx` | Summary, strengths, risks, verdict |
| `POST /api/ai/screener` | `AISearchBar.jsx` | Natural language → filter object → screener |
| `GET /api/ai/stock-reason/:symbol` | `StockReason.jsx` | News headlines → price movement explanation |
| `GET /api/ai/red-flags/:symbol` | `RedFlags.jsx` | Debt/profit/ROE trends → risk bullets |

Gemini uses `@google/genai` SDK with `response_mime_type: 'application/json'` for guaranteed JSON output. Ollama targets `OLLAMA_BASE_URL/api/generate` with model `llama3`. Both paths are wrapped by `safeParseJSON` to extract JSON from the response text.

---

## Performance & Reliability Rules

- Use `utils/limiter.js` for all concurrent outgoing upstream calls.
- Use `services/cacheService.js` for caching — key by symbol for company data, by `symbol + hash(prompt)` for AI responses.
- Rate-limit AI endpoints to prevent runaway costs.
- Fall back to `mockData.js` wherever the upstream is unavailable.

---

## Upstream API Quirks (0xramm)

- `dividend_yield` is returned in basis points (e.g. `471` = 4.71%). `transformers.js` normalises values `> 50` by dividing by 100.
- Historical chart, financial tables, and shareholding have no real endpoints — always returns mock.
- The upstream 503s under concurrent load — handled by `utils/limiter.js` (max 2) + retry with jitter in `companyController`.
- Search results have no `exchange` field — `SearchBar` renders the exchange badge conditionally.

---

## Environment Files

**`server/.env`**
```
PORT=5000
NODE_ENV=development

API_BASE_URL=http://65.0.104.9
ALPHA_VANTAGE_API_KEY=
NEWS_API_KEY=
NEWSDATA_API_KEY=

AI_PROVIDER=gemini          # gemini | ollama
GEMINI_API_KEY=
OLLAMA_BASE_URL=http://localhost:11434
```

**`client/.env`**
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME="Indian Stock Screener AI"
```
