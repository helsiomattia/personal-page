export function normalizeLanguage(language) {
  const code = (language || 'pt').split('-')[0];
  return ['en', 'es'].includes(code) ? code : 'pt';
}

export function getLocalizedString(value, language) {
  if (!value) return '';
  if (typeof value === 'string') return value;

  const lang = normalizeLanguage(language);
  return value[lang] || value.pt || '';
}

export function getLocalizedStringArray(value, language) {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  const lang = normalizeLanguage(language);
  return value[lang] || value.pt || [];
}
