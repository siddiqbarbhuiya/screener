import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCards } from '../context/CardsContext';

// Card types: 'text' (gradient bg), 'image' (right-side img panel), 'bg-image' (full-bleed bg + overlay)
// stocks[] renders as clickable NSE symbol tags linking to company pages.

const CARD_W = 80;  // % — active card width
const GAP    = 12;  // px — gap between cards

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
  const hasBgImage  = card.type === 'bg-image' && card.imageUrl;
  const hasRightImg = card.type === 'image'    && card.imageUrl;

  const wrapStyle = hasBgImage
    ? {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url(${card.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={`relative w-full flex items-center overflow-hidden rounded-xl h-40 sm:h-48
                  ${!hasBgImage ? `bg-gradient-to-r ${card.gradient}` : ''}`}
      style={wrapStyle}
    >
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -right-6  -bottom-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative z-10 px-5 sm:px-8 py-4 flex-1 min-w-0">
        <span className="inline-block text-xs font-semibold text-white/80 bg-white/15 px-3 py-0.5
                         rounded-full mb-2 backdrop-blur-sm leading-5">
          {card.badge}
        </span>
        <h3 className="text-base sm:text-xl font-bold text-white mb-1 leading-snug">
          {card.title}
        </h3>
        <p className="text-xs text-white/75 mb-3 leading-relaxed line-clamp-2">
          {card.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {card.stocks.map(sym => <StockTag key={sym} symbol={sym} />)}
          {card.cta && (
            <Link
              to={card.cta.to}
              onClick={e => e.stopPropagation()}
              className="px-3.5 py-1.5 bg-white text-gray-900 text-xs font-bold rounded-full
                         hover:bg-gray-100 transition-colors shadow-sm"
            >
              {card.cta.label} →
            </Link>
          )}
        </div>
      </div>

      {/* Right-side image panel (type: 'image') */}
      {hasRightImg && (
        <div className="hidden sm:block w-2/5 h-full flex-shrink-0 relative overflow-hidden">
          <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
        </div>
      )}
    </div>
  );
}

export default function PromoCarousel() {
  const { cards } = useCards();
  const count = cards.length;

  // Extended track: [clone-of-last, ...real, clone-of-first]
  // index 0       → clone of last  → silent-jump to `count` after transition
  // index 1..count → real cards
  // index count+1 → clone of first → silent-jump to 1 after transition
  const extended = [cards[count - 1], ...cards, cards[0]];

  const [index, setIndex]       = useState(1);
  const [animated, setAnimated] = useState(true);
  const timerRef  = useRef(null);
  const prevCount = useRef(count);

  // Reset to first card whenever cards are added
  useEffect(() => {
    if (count !== prevCount.current) {
      prevCount.current = count;
      setAnimated(false);
      setIndex(1);
    }
  }, [count]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIndex(i => i + 1), 5000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  // After transition, silently teleport from clone to the real equivalent card
  const handleTransitionEnd = useCallback(() => {
    if (index === 0) {
      setAnimated(false);
      setIndex(count);
    } else if (index === count + 1) {
      setAnimated(false);
      setIndex(1);
    }
  }, [index, count]);

  // Re-enable animation one paint after a silent jump
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnimated(true))
      );
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const goPrev = () => { setIndex(i => i - 1); startTimer(); };
  const goNext = () => { setIndex(i => i + 1); startTimer(); };
  const goTo   = (dot) => { setIndex(dot + 1); startTimer(); };

  const dotActive = ((index - 1) % count + count) % count;
  const offset    = `calc(${10 - index * CARD_W}% - ${index * GAP}px)`;

  if (!count) return null;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={startTimer}
    >
      {/* Sliding track */}
      <div
        className="flex"
        onTransitionEnd={handleTransitionEnd}
        style={{
          gap: `${GAP}px`,
          transform: `translateX(${offset})`,
          transition: animated ? 'transform 0.5s ease-out' : 'none',
        }}
      >
        {extended.map((card, i) => (
          <div key={i} style={{ flex: `0 0 ${CARD_W}%`, minWidth: 0 }}>
            <PromoCard card={card} />
          </div>
        ))}
      </div>

      {/* Prev — inside left 10% glimpse zone */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   w-7 h-7 flex items-center justify-center rounded-full
                   bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Next — inside right 10% glimpse zone */}
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   w-7 h-7 flex items-center justify-center rounded-full
                   bg-black/30 hover:bg-black/50 text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300
              ${idx === dotActive ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/45 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
