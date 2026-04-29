import { useEffect } from 'react';

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    if (property) {
      tag.setAttribute('property', name);
    } else {
      tag.setAttribute('name', name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    const siteTitle = 'Indian Stock Screener';
    document.title = title ? `${title} | ${siteTitle}` : siteTitle;

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
      setMeta('twitter:description', description);
    }

    setMeta('og:title', document.title, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:card', 'summary_large_image');

    const origin = window.location.origin;
    const canonicalHref = path ? `${origin}${path}` : window.location.href;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);

    setMeta('og:url', canonicalHref, true);
  }, [title, description, path]);

  return null;
}
