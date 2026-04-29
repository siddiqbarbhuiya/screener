import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Card types: 'text' (gradient bg), 'image' (right-side img panel), 'bg-image' (full-bleed bg + overlay)
// Add imageUrl to switch a card from gradient to image mode.
// stocks[] renders as clickable NSE symbol tags linking to company pages.

const CARDS = [
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
    id: 4,
    type: 'text',
    gradient: 'from-orange-500 via-orange-600 to-red-700',
    imageUrl: null,
    badge: '⚡ Conglomerate',
    title: 'Reliance Industries',
    subtitle: "India's largest company by market cap — spanning telecom, retail, and energy with unmatched scale.",
    stocks: ['RELIANCE'],
    cta: null,
  },
  {
    id: 5,
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

function StockTag({ symbol }) {
  return (
    <Link
      to={`/company/${symbol}`}
      onClick={e => e.stopPropagation()}
      className="px-2.5 py-1 bg-white/20 hover:bg-white/35 border border-white/30 text-white
                 text-xs font-semibold rounded-full transition-colors backdrop-blur-sm"
    >
      {symbol}
    </Link>
  );
}

function PromoCard({ card }) {
  const hasBgImage = card.type === 'bg-image' && card.imageUrl;
  const hasRightImage = card.type === 'image' && card.imageUrl;

  const wrapperStyle = hasBgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52)), url(${card.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={`relative w-full h-44 sm:h-48 md:h-52 flex items-center overflow-hidden
                  ${!hasBgImage ? `bg-gradient-to-r ${card.gradient}` : ''}`}
      style={wrapperStyle}
    >
      {/* Decorative background circles */}
      <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -right-6  -bottom-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      {/* Text content */}
      <div className="relative z-10 px-6 sm:px-10 py-6 flex-1 min-w-0">
        <span className="inline-block text-xs font-semibold text-white/80 bg-white/15 px-3 py-0.5
                         rounded-full mb-3 backdrop-blur-sm leading-5">
          {card.badge}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 leading-tight">
          {card.title}
        </h3>
        <p className="text-sm text-white/75 mb-3 max-w-md leading-relaxed line-clamp-2">
          {card.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {card.stocks.map(sym => <StockTag key={sym} symbol={sym} />)}
          {card.cta && (
            <Link
              to={card.cta.to}
              onClick={e => e.stopPropagation()}
              className="px-4 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-full
                         hover:bg-gray-100 transition-colors shadow-sm"
            >
              {card.cta.label} →
            </Link>
          )}
        </div>
      </div>

      {/* Right-side image panel (type: 'image') */}
      {hasRightImage && (
        <div className="hidden sm:block w-2/5 h-full flex-shrink-0 relative overflow-hidden">
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </div>
      )}
    </div>
  );
}

export default function PromoCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const count = CARDS.length;

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive(a => (a + 1) % count),
      5000
    );
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const goTo = (idx) => {
    setActive(((idx % count) + count) % count);
    startTimer();
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-md"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startTimer}
    >
      {/* Sliding track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {CARDS.map(card => (
          <div key={card.id} className="min-w-full flex-shrink-0">
            <PromoCard card={card} />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={() => goTo(active - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 flex items-center justify-center rounded-full
                   bg-black/25 hover:bg-black/45 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next button */}
      <button
        onClick={() => goTo(active + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 flex items-center justify-center rounded-full
                   bg-black/25 hover:bg-black/45 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {CARDS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300
              ${idx === active
                ? 'w-5 h-2 bg-white'
                : 'w-2 h-2 bg-white/45 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
