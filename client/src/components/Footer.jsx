export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Indian Stock Screener. Data is for informational purposes only and not investment advice.
          Prices may be delayed.
        </p>
      </div>
    </footer>
  );
}
