Here is a comprehensive, highly-structured blueprint designed specifically for an agentic AI code editor (like Cursor, Devin, or GitHub Copilot Workspace). 

You can copy the entire markdown block below and paste it directly into your AI code editor's chat or prompt window.

```markdown
# SYSTEM PROMPT & PROJECT BLUEPRINT: Indian Stock Market Screener

## 1. Project Overview
You are an expert full-stack developer AI. Your task is to build a responsive web and mobile application that replicates the core (non-AI) functionalities of `screener.in` for the Indian Stock Market. 

The application will use a Node.js backend serving as a BFF (Backend for Frontend) and a React.js (Vite) frontend. Data will be sourced using logic/endpoints referenced from `https://github.com/0xramm/Indian-Stock-Market-API`.

## 2. Tech Stack
* **Frontend:** React.js (Vite), Tailwind CSS (for responsive UI), React Router DOM (routing), Axios (data fetching), Recharts (for financial charts), Lucide React (icons).
* **Backend:** Node.js, Express.js, Cors, Axios (to proxy/fetch data from the core API), Dotenv.
* **Data Source:** Integration based on `0xramm/Indian-Stock-Market-API`.
* **Architecture:** Monorepo structure with `/client` and `/server` folders.

## 3. Core Features to Implement (Based on Screener.in)
1.  **Global Search:** Autocomplete search bar for Indian stocks (BSE/NSE).
2.  **Company Dashboard (The core view):**
    * **Header:** Company Name, Current Price, Day Change (%), 52W High/Low.
    * **About Section:** Brief company description.
    * **Key Metrics Grid:** Market Cap, Current Price, High / Low, Stock P/E, Book Value, Dividend Yield, ROCE, ROE, Face Value.
    * **Price Chart:** Interactive line chart for 1M, 6M, 1Y, 3Y, 5Y, Max.
    * **Pros & Cons:** Bullet points analyzing the company's financial health.
    * **Peer Comparison:** Table comparing the company with peers in the same sector.
    * **Financial Tables (Tabular Data):**
        * Quarterly Results
        * Profit & Loss (Yearly)
        * Balance Sheet
        * Cash Flows
        * Ratios (Debtor days, Inventory days, etc.)
        * Shareholding Pattern (Promoters, FIIs, DIIs, Public).
3.  **Screening Tool (Query Builder):**
    * A page where users can input queries like `Market Capitalization > 500 AND Price to Earning < 15`.
    * Display a paginated data table of results matching the query.

## 4. Environment Variables Structure
Create these exactly as shown.

**`/server/.env`**
```env
PORT=5000
NODE_ENV=development
# Base URL for the 0xramm API service (assuming it runs locally or is deployed)
API_BASE_URL=http://localhost:8000 
# Add any specific API keys required by the 0xramm repo integrations
NSE_BSE_API_KEY=your_api_key_here_if_needed
```

**`/client/.env`**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME="Indian Stock Screener"
```

## 5. Execution Plan for AI Agent

Follow these phases strictly. Do not proceed to the next phase until the current one is fully functional and tested.

### Phase 1: Project Initialization & Structure
1.  Initialize a new directory.
2.  Create the backend: `mkdir server`, `cd server`, `npm init -y`, install dependencies (`express`, `cors`, `axios`, `dotenv`, `nodemon`).
3.  Create the frontend: `npm create vite@latest client -- --template react`, `cd client`, install dependencies (`tailwindcss`, `react-router-dom`, `recharts`, `lucide-react`, `axios`).
4.  Configure Tailwind CSS in the `/client` directory.
5.  Set up the monorepo scripts in a root `package.json` using `concurrently` to run both client and server simultaneously.

### Phase 2: Backend Development (Node.js API Gateway)
1.  Set up `server/index.js` with Express, CORS, and JSON body parsing.
2.  Review the `0xramm/Indian-Stock-Market-API` documentation/code to understand the endpoint structure for searching stocks, fetching stock fundamentals, and getting historical chart data.
3.  Create the following Express routes in `/server/routes/stockRoutes.js`:
    * `GET /api/search?q={query}` - Returns autocomplete list of stocks.
    * `GET /api/company/:symbol` - Returns key metrics, about, and pros/cons.
    * `GET /api/company/:symbol/chart?period={period}` - Returns time-series data for the chart.
    * `GET /api/company/:symbol/financials` - Returns Quarterly, P&L, Balance Sheet, Cash Flow, Ratios.
    * `GET /api/company/:symbol/shareholding` - Returns shareholding patterns.
    * `POST /api/screen` - Accepts a screening query and returns matching stocks.
4.  Implement the controller logic to fetch and map data from the `0xramm` API to these endpoints. Ensure error handling is robust (try/catch blocks, standard 500/404 responses).

### Phase 3: Frontend Foundation & State
1.  Set up React Router in `/client/src/App.jsx` with the following routes:
    * `/` (Home)
    * `/company/:symbol` (Company Details)
    * `/screens` (Query Builder)
2.  Create a standard layout component `/client/src/components/Layout.jsx` featuring:
    * **Navbar:** Logo, Global Search Bar (with autocomplete dropdown), Navigation Links (Home, Screens).
    * **Footer:** Standard disclaimer and copyright.
3.  Implement responsive design in the Layout (hamburger menu for mobile).
4.  Create an Axios instance in `/client/src/utils/api.js` configured with `import.meta.env.VITE_API_BASE_URL`.

### Phase 4: Developing Core UI Components
1.  **Home Page (`/client/src/pages/Home.jsx`):** * Hero section with a large search bar.
    * Trending/Top gainers quick-view cards.
2.  **Company Page (`/client/src/pages/CompanyDashboard.jsx`):**
    * Build this in a modular way. Create sub-components:
        * `CompanyHeader.jsx` (Title & current price).
        * `KeyMetrics.jsx` (CSS Grid for Market Cap, P/E, etc.).
        * `PriceChart.jsx` (Use Recharts, add buttons for 1M, 6M, 1Y toggles).
        * `FinancialTable.jsx` (A reusable component that takes columns and data rows to render P&L, Balance Sheet, etc. It must scroll horizontally on mobile).
        * `Shareholding.jsx` (Stacked bar chart or simple table).
3.  **Screener Page (`/client/src/pages/Screener.jsx`):**
    * Text area for writing queries.
    * "Run Query" button.
    * Results data table below the query builder.

### Phase 5: Styling & Responsiveness Polish
1.  Ensure all tables have `overflow-x-auto` to prevent breaking mobile layouts.
2.  Use Tailwind's grid system extensively (e.g., `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` for metrics).
3.  Ensure touch targets on mobile (buttons, dropdown items) are at least `44px` tall.
4.  Use subtle borders and shadows (e.g., `border-gray-200 shadow-sm`) to match the clean, data-heavy aesthetic of `screener.in`.

### Phase 6: Final Integration & Review
1.  Connect frontend components to backend endpoints using React `useEffect` hooks or a library like SWR/React Query.
2.  Implement loading states (spinners or skeleton loaders) while fetching data.
3.  Implement empty states ("No data available") to prevent app crashes when the API returns null fields.
4.  Review console logs to ensure no React key warnings or unhandled promises exist.

**Final Instruction for Agent:** Begin by executing Phase 1 and output the terminal commands and resulting file structures. Ask for my confirmation before moving to Phase 2.
```