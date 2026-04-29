import { Link } from 'react-router-dom';

export default function Footer() {
  const footerLinks = [
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Terms', path: '/terms-and-conditions' },
    { label: 'Privacy', path: '/privacy-policy' },
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Links */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400 dark:text-slate-500 text-center">
          © {new Date().getFullYear()} Indian Stock Screener. Data is for informational purposes only and not investment advice.
          Prices may be delayed.
        </p>
      </div>
    </footer>
  );
}
