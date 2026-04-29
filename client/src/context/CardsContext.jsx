import { createContext, useContext, useState } from 'react';

const INITIAL_CARDS = [
  {
    id: 1,
    type: 'text',
    gradient: 'from-blue-600 via-blue-700 to-indigo-800',
    imageUrl: null,
    badge: '📊 Market Insights',
    title: 'Screen Indian Stocks',
    subtitle: 'Filter by Market Cap, P/E, ROCE, ROE, and dozens of other fundamentals to find your next pick.',
    stocks: [],
    cta: { label: 'Open Screener', to: '/screens' },
  },
  {
    id: 2,
    type: 'text',
    gradient: 'from-emerald-500 via-emerald-600 to-teal-700',
    imageUrl: null,
    badge: '🏦 Sector Spotlight',
    title: 'Banking Sector',
    subtitle: 'Strong Q4 results expected across private banks. Consistent growth with expanding NIMs.',
    stocks: ['HDFCBANK', 'ICICIBANK'],
    cta: null,
  },
  {
    id: 3,
    type: 'bg-image',
    gradient: '',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    badge: '🚀 Market Milestone',
    title: 'Nifty at Record High',
    subtitle: 'Broad-based rally drives India\'s benchmark index to all-time highs with strong FII inflows.',
    stocks: [],
    cta: null,
  },
  {
    id: 4,
    type: 'text',
    gradient: 'from-violet-600 via-purple-700 to-indigo-800',
    imageUrl: null,
    badge: '💻 IT Sector',
    title: "India's Tech Giants",
    subtitle: 'Global IT spending recovery benefits TCS and Infosys with robust deal-win momentum.',
    stocks: ['TCS', 'INFY'],
    cta: null,
  },
  {
    id: 5,
    type: 'image',
    gradient: 'from-orange-500 via-orange-600 to-red-700',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
    badge: '⚡ Conglomerate',
    title: 'Reliance Industries',
    subtitle: "India's largest company by market cap — spanning telecom, retail, and energy.",
    stocks: ['RELIANCE'],
    cta: null,
  },
  {
    id: 6,
    type: 'text',
    gradient: 'from-slate-700 via-slate-800 to-gray-900',
    imageUrl: null,
    badge: '🤖 AI-Powered',
    title: 'Portfolio Analysis',
    subtitle: 'Get AI-generated insights — sector exposure, risk profile, and smart rebalancing suggestions.',
    stocks: [],
    cta: { label: 'Try Portfolio', to: '/portfolio' },
  },
];

const CardsContext = createContext(null);

export function CardsProvider({ children }) {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const addCard = (card) =>
    setCards(prev => [...prev, { ...card, id: Date.now() }]);

  return (
    <CardsContext.Provider value={{ cards, addCard }}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (!ctx) throw new Error('useCards must be used within CardsProvider');
  return ctx;
}
