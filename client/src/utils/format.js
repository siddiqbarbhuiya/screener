export function formatCrores(n) {
  if (n == null || isNaN(n)) return 'N/A';
  const cr = n / 1e7;
  if (cr >= 1e5) return `₹${(cr / 1e5).toFixed(2)}L Cr`;
  if (cr >= 1e3) return `₹${(cr / 1e3).toFixed(2)}K Cr`;
  return `₹${cr.toFixed(0)} Cr`;
}

export function formatCroresDirect(n) {
  if (n == null || isNaN(n)) return 'N/A';
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)}L Cr`;
  if (n >= 1e3) return `₹${(n / 1e3).toFixed(2)}K Cr`;
  return `₹${n.toFixed(0)} Cr`;
}

export function formatPct(n) {
  if (n == null || isNaN(n)) return 'N/A';
  return `${parseFloat(n).toFixed(2)}%`;
}

export function formatINR(n) {
  if (n == null || isNaN(n)) return 'N/A';
  return `₹${parseFloat(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

export function formatNumber(n, decimals = 2) {
  if (n == null || isNaN(n)) return 'N/A';
  return parseFloat(n).toFixed(decimals);
}
