import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Search } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors min-h-[44px] flex items-center px-3 rounded-md
     ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <TrendingUp className="text-blue-600" size={22} />
            <span className="font-bold text-gray-900 text-base hidden sm:block">
              {import.meta.env.VITE_APP_NAME || 'Stock Screener'}
            </span>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-auto">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/screens" className={navLinkClass}>Screener</NavLink>
            <NavLink to="/portfolio" className={navLinkClass}>Portfolio</NavLink>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 ml-auto md:hidden">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="p-2 text-gray-500 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-gray-50"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="p-2 text-gray-500 hover:text-gray-900 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md hover:bg-gray-50"
              aria-label="Menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="pb-3 md:hidden">
            <SearchBar autoFocus />
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="pb-3 border-t border-gray-100 pt-2 md:hidden flex flex-col gap-1">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/screens" className={navLinkClass}>Screener</NavLink>
            <NavLink to="/portfolio" className={navLinkClass}>Portfolio</NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
