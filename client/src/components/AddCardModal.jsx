import { useState, useEffect, useRef } from 'react';
import { X, Upload, Type, PanelRight, ImageIcon } from 'lucide-react';
import { useCards } from '../context/CardsContext';

const GRADIENTS = [
  { label: 'Blue',   cls: 'from-blue-600 via-blue-700 to-indigo-800',     swatch: 'bg-blue-600' },
  { label: 'Green',  cls: 'from-emerald-500 via-emerald-600 to-teal-700',  swatch: 'bg-emerald-500' },
  { label: 'Purple', cls: 'from-violet-600 via-purple-700 to-indigo-800',  swatch: 'bg-violet-600' },
  { label: 'Orange', cls: 'from-orange-500 via-orange-600 to-red-700',     swatch: 'bg-orange-500' },
  { label: 'Dark',   cls: 'from-slate-700 via-slate-800 to-gray-900',      swatch: 'bg-slate-700' },
  { label: 'Rose',   cls: 'from-rose-500 via-pink-600 to-fuchsia-700',     swatch: 'bg-rose-500' },
];

const BLANK = {
  type: 'text',
  badge: '',
  title: '',
  subtitle: '',
  gradient: GRADIENTS[0].cls,
  imageUrl: '',
  stocks: '',
  ctaEnabled: false,
  ctaLabel: '',
  ctaTo: '',
};

const CARD_TYPES = [
  { val: 'text',     label: 'Text',        icon: Type },
  { val: 'image',    label: 'Image Panel',  icon: PanelRight },
  { val: 'bg-image', label: 'Full Image',   icon: ImageIcon },
];

export default function AddCardModal({ open, onClose }) {
  const { addCard } = useCards();
  const [form, setForm]         = useState(BLANK);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors]     = useState({});
  const fileRef       = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    setForm(BLANK);
    setFileName('');
    setErrors({});
  }, [open]);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    set('imageUrl', URL.createObjectURL(file));
    setFileName(file.name);
    setErrors(err => ({ ...err, imageUrl: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (form.type !== 'text' && !form.imageUrl.trim()) errs.imageUrl = 'Image URL or file is required.';
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const stocks = form.stocks.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
    addCard({
      type: form.type,
      gradient: form.type === 'text' ? form.gradient : '',
      imageUrl: form.type !== 'text' ? form.imageUrl : null,
      badge:    form.badge.trim() || '📌 Featured',
      title:    form.title.trim(),
      subtitle: form.subtitle.trim(),
      stocks,
      cta: form.ctaEnabled && form.ctaLabel.trim()
        ? { label: form.ctaLabel.trim(), to: form.ctaTo.trim() || '/' }
        : null,
    });
    onClose();
  };

  if (!open) return null;

  const inp = `w-full text-sm rounded-lg border px-3 py-2
               border-gray-200 dark:border-slate-600
               bg-white dark:bg-slate-700
               text-gray-900 dark:text-slate-100
               placeholder-gray-400 dark:placeholder-slate-500
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col transition-colors"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex-shrink-0">
          <h2 className="font-semibold text-gray-900 dark:text-slate-100">Add Promo Card</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full
                       text-gray-400 dark:text-slate-500
                       hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 space-y-5 flex-1">

          {/* Type */}
          <div>
            <label className="field-label dark:text-slate-400">Card Type</label>
            <div className="grid grid-cols-3 gap-2 mt-1.5">
              {CARD_TYPES.map(({ val, label, icon: Icon }) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => set('type', val)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-medium transition-all
                    ${form.type === val
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 hover:border-gray-300 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Badge */}
          <div>
            <label className="field-label dark:text-slate-400">Badge</label>
            <input ref={firstFieldRef} type="text" placeholder="📊 Market Insights" maxLength={40}
              value={form.badge} onChange={e => set('badge', e.target.value)} className={`${inp} mt-1.5`} />
          </div>

          {/* Title */}
          <div>
            <label className="field-label dark:text-slate-400">Title <span className="text-red-400 font-normal">*</span></label>
            <input type="text" placeholder="Screen Indian Stocks" maxLength={60}
              value={form.title}
              onChange={e => { set('title', e.target.value); setErrors(err => ({ ...err, title: '' })); }}
              className={`${inp} mt-1.5 ${errors.title ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''}`} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Subtitle */}
          <div>
            <label className="field-label dark:text-slate-400">Subtitle</label>
            <textarea placeholder="A short description shown on the card." maxLength={160} rows={2}
              value={form.subtitle} onChange={e => set('subtitle', e.target.value)}
              className={`${inp} mt-1.5 resize-none`} />
          </div>

          {/* Gradient (text only) */}
          {form.type === 'text' && (
            <div>
              <label className="field-label dark:text-slate-400">Background</label>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {GRADIENTS.map(g => (
                  <button key={g.cls} type="button" title={g.label} onClick={() => set('gradient', g.cls)}
                    className={`w-8 h-8 rounded-full ${g.swatch} border-2 transition-all
                      ${form.gradient === g.cls ? 'border-white scale-110 shadow-md' : 'border-transparent hover:scale-105'}`} />
                ))}
              </div>
            </div>
          )}

          {/* Image (image / bg-image) */}
          {form.type !== 'text' && (
            <div>
              <label className="field-label dark:text-slate-400">Image <span className="text-red-400 font-normal">*</span></label>
              <input type="url" placeholder="https://images.unsplash.com/..."
                value={form.imageUrl}
                onChange={e => { set('imageUrl', e.target.value); setFileName(''); setErrors(err => ({ ...err, imageUrl: '' })); }}
                className={`${inp} mt-1.5 ${errors.imageUrl ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : ''}`} />
              {errors.imageUrl && <p className="text-xs text-red-500 mt-1">{errors.imageUrl}</p>}

              <div className="flex items-center gap-2 my-3">
                <hr className="flex-1 border-gray-200 dark:border-slate-700" />
                <span className="text-xs text-gray-400 dark:text-slate-500">or upload</span>
                <hr className="flex-1 border-gray-200 dark:border-slate-700" />
              </div>

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button type="button" onClick={() => fileRef.current?.click()}
                className="flex items-center gap-2 w-full text-sm text-blue-600 dark:text-blue-400
                           border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20
                           hover:bg-blue-100 dark:hover:bg-blue-900/40 px-3 py-2 rounded-lg transition-colors">
                <Upload size={14} className="flex-shrink-0" />
                <span className="truncate text-xs">{fileName || 'Choose image file'}</span>
              </button>

              {form.imageUrl && (
                <div className="mt-2.5 rounded-lg overflow-hidden h-20 bg-gray-100 dark:bg-slate-700">
                  <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover"
                    onError={e => { e.currentTarget.parentElement.style.display = 'none'; }} />
                </div>
              )}
            </div>
          )}

          {/* Stocks */}
          <div>
            <label className="field-label dark:text-slate-400">
              Stock Tags{' '}
              <span className="text-gray-400 dark:text-slate-500 font-normal normal-case text-xs">(comma-separated)</span>
            </label>
            <input type="text" placeholder="HDFCBANK, ICICIBANK"
              value={form.stocks} onChange={e => set('stocks', e.target.value)}
              className={`${inp} mt-1.5`} />
          </div>

          {/* CTA */}
          <div>
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input type="checkbox" checked={form.ctaEnabled}
                onChange={e => set('ctaEnabled', e.target.checked)}
                className="w-4 h-4 rounded accent-blue-600" />
              <span className="text-sm text-gray-700 dark:text-slate-300 font-medium">Add a call-to-action button</span>
            </label>
            {form.ctaEnabled && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-slate-400 mb-1">Button label</label>
                  <input type="text" placeholder="Open Screener" value={form.ctaLabel}
                    onChange={e => set('ctaLabel', e.target.value)} className={inp} />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-slate-400 mb-1">Link</label>
                  <input type="text" placeholder="/screens" value={form.ctaTo}
                    onChange={e => set('ctaTo', e.target.value)} className={inp} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-slate-700 flex-shrink-0">
          <button onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 dark:text-slate-400
                       hover:text-gray-900 dark:hover:text-slate-100
                       rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit}
            className="px-5 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white
                       rounded-lg transition-colors shadow-sm">
            Add Card →
          </button>
        </div>
      </div>
    </div>
  );
}
