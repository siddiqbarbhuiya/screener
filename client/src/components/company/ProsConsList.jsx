import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function ProsConsList({ pros = [], cons = [] }) {
  if (!pros.length && !cons.length) return null;

  return (
    <section>
      <h2 className="text-base font-semibold text-gray-800 mb-3">Pros & Cons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pros.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2 text-sm">
              <ThumbsUp size={16} /> Pros
            </h3>
            <ul className="space-y-2">
              {pros.map((p, i) => (
                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}
        {cons.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2 text-sm">
              <ThumbsDown size={16} /> Cons
            </h3>
            <ul className="space-y-2">
              {cons.map((c, i) => (
                <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
