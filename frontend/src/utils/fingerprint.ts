export async function getDeviceFingerprint(): Promise<string> {
  try {
    const nav = window.navigator as any;
    const parts = [
      navigator.userAgent || '',
      navigator.language || '',
      String(screen.width) + 'x' + String(screen.height),
      String(new Date().getTimezoneOffset()),
      (navigator.plugins && navigator.plugins.length) ? String(navigator.plugins.length) : '0'
    ];
    const data = parts.join('||');
    const enc = new TextEncoder().encode(data);
    const hash = await crypto.subtle.digest('SHA-256', enc);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    return 'no-fp';
  }
}

export function ensureSessionId(): string {
  const name = 'SID=';
  const ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(name) === 0) return c.substring(name.length);
  }
  const sid = (crypto && (crypto as any).randomUUID) ? (crypto as any).randomUUID() : Math.random().toString(36).slice(2);
  // set cookie for 1 year; Secure and SameSite when available
  const attrs = ['path=/', 'max-age=' + 60 * 60 * 24 * 365];
  if (location.protocol === 'https:') attrs.push('Secure');
  attrs.push('SameSite=Lax');
  document.cookie = `SID=${sid}; ${attrs.join('; ')}`;
  return sid;
}
