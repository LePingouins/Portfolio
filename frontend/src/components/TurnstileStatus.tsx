import React, { useEffect, useState } from 'react';
import './TurnstileStatus.css';

const POLL_MS = 400;
const TIMEOUT_MS = 8000;

const TurnstileStatus: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    let elapsed = 0;

    // Read Vite env correctly and attempt to inject the Turnstile script when a site key exists.
    const metaEl = typeof document !== 'undefined' ? document.querySelector('meta[name="turnstile-site-key"]') as HTMLMetaElement | null : null;
    const metaKey = metaEl?.getAttribute('content') || null;
    const siteKey = (import.meta as any)?.env?.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || (import.meta as any)?.env?.VITE_RECAPTCHA_SITE_KEY || metaKey || null;
    console.debug('TurnstileStatus init - siteKey:', siteKey, 'metaKey:', metaKey);

    // Allow disabling Turnstile in dev: if set, mark missing and don't inject script
    const disabled = !!((import.meta as any)?.env?.VITE_DISABLE_TURNSITLE === 'true');
    if (disabled) {
      console.info('TurnstileStatus: disabled via VITE_DISABLE_TURNSITLE');
      setStatus('missing');
      return;
    }

    if (!siteKey) {
      console.debug('TurnstileStatus: no site key available, marking missing');
      setStatus('missing');
      return;
    }

    // If we have a build-time env but no meta tag, create one so other scripts can read runtime key
    if (siteKey && !metaEl && typeof document !== 'undefined') {
      try {
        const m = document.createElement('meta');
        m.name = 'turnstile-site-key';
        m.content = siteKey;
        document.head.appendChild(m);
        console.debug('TurnstileStatus injected meta turnstile-site-key');
      } catch (e) {
        console.debug('TurnstileStatus failed to inject meta', e);
      }
    }
    console.debug('TurnstileStatus init - siteKey:', siteKey);

    const addScriptIfNeeded = () => {
      try {
        const hasScript = !!document.getElementById('cf-turnstile-script');
        if (!hasScript && siteKey) {
          const script = document.createElement('script');
          script.id = 'cf-turnstile-script';
          script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
          script.async = true;
          script.onload = () => {
            // small delay to allow global to be created
            setTimeout(() => {
              // @ts-ignore
              // @ts-ignore
              console.debug('TurnstileStatus script onload - window.turnstile present?', !!(window as any).turnstile);
              if ((window as any).turnstile) setStatus('ready');
            }, 200);
          };
          script.onerror = (e) => {
            console.error('Turnstile script failed to load', e);
            setStatus('missing');
          };
          document.body.appendChild(script);
          console.debug('TurnstileStatus injected script tag');
        }
      } catch (e) {
        // ignore DOM errors in non-browser environments
        console.error('Error injecting Turnstile script', e);
      }
    };

    const check = () => {
      // @ts-ignore
      const present = (typeof window !== 'undefined' && (window as any).turnstile);
      console.debug('TurnstileStatus check - window.turnstile present?', present);
      if (present) {
        setStatus('ready');
        return true;
      }
      return false;
    };

    addScriptIfNeeded();

    if (check()) return;
    const id = setInterval(() => {
      elapsed += POLL_MS;
      if (check()) {
        clearInterval(id);
        return;
      }
      if (elapsed >= TIMEOUT_MS) {
        setStatus('missing');
        clearInterval(id);
      }
    }, POLL_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={`turnstile-status turnstile-status--${status}`} title={`Turnstile: ${status}`}>
      {status === 'loading' && <span className="ts-dot ts-dot--loading"/>}
      {status === 'ready' && <span className="ts-check">✓</span>}
      {status === 'missing' && <span className="ts-x">✕</span>}
      <span className="ts-label">Turnstile {status === 'ready' ? 'loaded' : status === 'loading' ? 'loading' : 'missing'}</span>
    </div>
  );
};

export default TurnstileStatus;
