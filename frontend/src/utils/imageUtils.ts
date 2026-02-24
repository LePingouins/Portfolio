export function safeImageUrl(url?: string | null): string {
  const placeholder = '/project-placeholder.png';
  if (!url) return placeholder;
  const trimmed = url.trim();
  if (trimmed === '') return placeholder;
  // allow relative paths and data URIs
  if (trimmed.startsWith('/') || trimmed.startsWith('data:')) return trimmed;
  // disallow external http(s) hosts to avoid CSP violations
  if (/^https?:\/\//i.test(trimmed)) return placeholder;
  // otherwise return as-is
  return trimmed;
}
