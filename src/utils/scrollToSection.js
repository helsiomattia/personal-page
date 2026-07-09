export function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

export function getScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToSection(id, attempt = 0) {
  const el = document.getElementById(id);

  if (!el) {
    if (attempt < 20) window.setTimeout(() => scrollToSection(id, attempt + 1), 50);
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: getScrollBehavior() });
}
