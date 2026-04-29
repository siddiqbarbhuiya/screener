import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <Seo
        title="Page Not Found"
        description="The page you are looking for is unavailable on Indian Stock Screener."
        path="/404"
      />
      <p className="text-6xl font-bold text-gray-200 mb-4">404</p>
      <h1 className="text-xl font-semibold text-gray-700 mb-2">Page not found</h1>
      <p className="text-gray-500 text-sm mb-6">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg
                   text-sm font-medium hover:bg-blue-700 transition-colors min-h-[44px]"
      >
        <Home size={16} />
        Back to Home
      </Link>
    </div>
  );
}
