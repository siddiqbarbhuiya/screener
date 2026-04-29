import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, Search, Plus, Sun, Moon } from 'lucide-react';
import SearchBar from './SearchBar';
import AddCardModal from './AddCardModal';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { dark, toggle } = useTheme();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors min-h-[44px] flex items-center px-3 rounded-md
     ${isActive
       ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
       : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-800'}`;

  const iconBtn = `p-2 rounded-md min-h-[44px] min-w-[44px] flex items-center justify-center
                   text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100
                   hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors`;

  return (
    <>
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm dark:shadow-slate-900/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-14 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <TrendingUp className="text-blue-600 dark:text-blue-400" size={22} />
            <span className="font-bold text-gray-900 dark:text-slate-100 text-base hidden sm:block">
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
            <NavLink to="/document-analyzer" className={navLinkClass}>Analyzer</NavLink>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`ml-1 ${iconBtn}`}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Add card */}
            <button
              onClick={() => setModalOpen(true)}
              title="Add Promo Card"
              className="ml-1 w-8 h-8 flex items-center justify-center rounded-full
                         border border-gray-300 dark:border-slate-600
                         text-gray-500 dark:text-slate-400
                         hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400
                         hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <Plus size={15} />
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 ml-auto md:hidden">
            <button onClick={toggle} aria-label="Toggle dark mode" className={iconBtn}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setModalOpen(true)}
              aria-label="Add promo card"
              className={iconBtn}
            >
              <Plus size={18} />
            </button>
            <button onClick={() => setSearchOpen(s => !s)} aria-label="Search" className={iconBtn}>
              <Search size={20} />
            </button>
            <button onClick={() => setMenuOpen(m => !m)} aria-label="Menu" className={iconBtn}>
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
          <nav className="pb-3 border-t border-gray-100 dark:border-slate-800 pt-2 md:hidden flex flex-col gap-1">
            <NavLink to="/" end className={navLinkClass}>Home</NavLink>
            <NavLink to="/screens" className={navLinkClass}>Screener</NavLink>
            <NavLink to="/portfolio" className={navLinkClass}>Portfolio</NavLink>
            <NavLink to="/document-analyzer" className={navLinkClass}>Analyzer</NavLink>
          </nav>
        )}
      </div>
    </header>

    <AddCardModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
