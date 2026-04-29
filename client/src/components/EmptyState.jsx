import { Inbox } from 'lucide-react';

export default function EmptyState({ message = 'No data available', subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox className="text-gray-300 dark:text-slate-600 mb-3" size={48} />
      <p className="text-gray-500 dark:text-slate-400 font-medium">{message}</p>
      {subtitle && <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}
