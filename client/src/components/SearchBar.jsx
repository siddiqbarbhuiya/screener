import { useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import LoadingSpinner from './LoadingSpinner';

export default function SearchBar({ placeholder = 'Search stocks — e.g. ITC, Reliance...', autoFocus = false }) {
  const navigate = useNavigate();
  const { query, setQuery, results, loading } = useSearch();
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef(null);

  const handleSelect = useCallback(
    (symbol) => {
      setQuery('');
      setOpen(false);
      setActiveIdx(-1);
      navigate(`/company/${symbol}`);
    },
    [navigate, setQuery]
  );

  const handleKeyDown = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[activeIdx >= 0 ? activeIdx : 0];
      if (item) handleSelect(item.symbol);
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 pointer-events-none" size={16} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIdx(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 text-sm
                     bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-400"
        />
        {loading && (
          <div className="absolute right-3">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200
                       rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {results.map((item, i) => (
            <li key={item.symbol}>
              <button
                onMouseDown={() => handleSelect(item.symbol)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 min-h-[44px]
                            hover:bg-gray-50 transition-colors
                            ${i === activeIdx ? 'bg-blue-50' : ''}`}
              >
                <span className="font-semibold text-sm text-blue-700 w-24 flex-shrink-0">
                  {item.symbol}
                </span>
                <span className="text-sm text-gray-700 truncate">{item.company_name}</span>
                {item.exchange && (
                  <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{item.exchange}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
