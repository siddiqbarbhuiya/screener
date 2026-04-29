import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorBanner({ message, onRetry }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
      <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
      <div className="flex-1">
        <p className="text-sm text-red-700">{message || 'Something went wrong.'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 min-h-[44px] px-2"
        >
          <RefreshCw size={14} />
          Retry
        </button>
      )}
    </div>
  );
}
