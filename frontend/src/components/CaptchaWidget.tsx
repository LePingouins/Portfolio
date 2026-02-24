import React, { useEffect, useState, useRef } from 'react';
import './CaptchaWidget.css';

declare global {
    interface Window {
        grecaptcha?: {
            render?: (el: string | HTMLElement, opts?: unknown) => number;
        };
        turnstile?: {
            render?: (selector: string, opts?: unknown) => string | number;
            remove?: (id: string | number) => void;
        };
    }
}

interface Props {
  siteKey?: string | null;
  onVerified: (token: string) => void;
  onCancel?: () => void;
  // If not provided, will try to detect based on siteKey format or default to cloudflare
  provider?: 'google' | 'cloudflare'; 
    // If true, render an offscreen/invisible widget to preload scripts and widget
    preload?: boolean;
    // Called when the widget has been rendered and is ready to accept user interaction
    onReady?: () => void;
}

const CaptchaWidget: React.FC<Props> = ({ siteKey, onVerified, onCancel, provider = 'cloudflare', preload = false, onReady }) => {
  const [loading, setLoading] = useState(false);
  const widgetIdRef = useRef<string | null>(null);
    // generate a unique id for the container so multiple instances don't clash
    const [containerId] = useState(() => 'captcha-container-' + Math.random().toString(36).substr(2, 9));

    // runtime fallback: allow meta tag to supply site key when env wasn't injected
    const runtimeMetaKey = typeof document !== 'undefined' ? document.querySelector('meta[name="turnstile-site-key"]')?.getAttribute('content') : null;
    const effectiveSiteKey = siteKey || runtimeMetaKey;
    const disabled = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_DISABLE_TURNSITLE === 'true');
    if (disabled) console.info('CaptchaWidget: Turnstile disabled via VITE_DISABLE_TURNSITLE');

    useEffect(() => {
        console.debug('CaptchaWidget init - effectiveSiteKey:', effectiveSiteKey, 'preload:', preload, 'disabled:', disabled);
        if (disabled) return; // don't try to load script when explicitly disabled
        if (!effectiveSiteKey) return;

    if (provider === 'cloudflare') {
        const scriptId = 'cf-turnstile-script';
        
        const renderWidget = () => {
            if (!window.turnstile) return;
            try {
                // clear container first just in case
                const el = document.getElementById(containerId);
                if (el) el.innerHTML = '';

                const renderFn = window.turnstile.render;
                if (typeof renderFn !== 'function') {
                  console.error('Turnstile render function missing');
                  return;
                }

                // If widget is already rendered in this container, don't re-render
                if (widgetIdRef.current) {
                    try {
                        if (window.turnstile?.remove) {
                            window.turnstile.remove(widgetIdRef.current);
                        }
                    } catch (e) {
                        console.warn('Failed to remove turnstile widget', e);
                    }
                    widgetIdRef.current = null;
                }

                const id = renderFn(`#${containerId}`, {
                    sitekey: effectiveSiteKey,
                    callback: (token: string) => onVerified(token),
                    'error-callback': (code:  unknown) => { 
                        console.error('Turnstile error callback:', code);
                        if (onCancel) onCancel(); 
                    },
                } as Record<string, unknown>);
                widgetIdRef.current = id != null ? String(id) : null;
                console.debug('CaptchaWidget render - widget id', id);
                if (onReady) try { onReady(); } catch { /* ignore */ }
            } catch (err) {
                console.error('Turnstile render error', err);
            }
        };

        const existingScript = document.getElementById(scriptId) as HTMLScriptElement;

        const loadScript = () => {
             const script = document.createElement('script');
             script.id = scriptId;
             script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
             script.async = true;
             script.addEventListener('load', () => {
               console.debug('CaptchaWidget script loaded');
               renderWidget();
             });
             document.body.appendChild(script);
             script.addEventListener('error', (ev) => console.error('CaptchaWidget script error', ev));
        };

        if (!existingScript) {
             loadScript();
        } else if (window.turnstile) {
             // If script exists and turnstile object is ready, render immediately
             renderWidget();
        } else {
             // Script exists but turnstile object not ready usually means it's still loading
             // We can attach a load listener to the existing script if possible, or poll
             existingScript.addEventListener('load', renderWidget);
             
             // Fallback: poll for turnstile object availability
             const checkInterval = setInterval(() => {
                 if (window.turnstile) {
                     clearInterval(checkInterval);
                     renderWidget();
                 }
             }, 100);
             setTimeout(() => clearInterval(checkInterval), 5000); // 5s timeout
        }

        return () => {
            try {
                if (window.turnstile && widgetIdRef.current) {
                    const removeFn = window.turnstile.remove;
                    // turnstile.remove accepts string or number; pass original id if numeric
                    if (typeof removeFn === 'function') {
                        removeFn(widgetIdRef.current);
                    }
                }
            } catch {
                /* ignore */
            }
            widgetIdRef.current = null;
        };
    } else {
        // GOOGLE RECAPTCHA LEGACY SUPPORT
        const scriptId = 'google-recaptcha-script';
        let script = document.getElementById(scriptId) as HTMLScriptElement;
        
        const renderGoogle = () => {
             if (window.grecaptcha && window.grecaptcha.render) {
                try {
                    window.grecaptcha.render(containerId, { 
                        'sitekey': effectiveSiteKey, 
                        'callback': (token: string) => onVerified(token) 
                    });
                    if (onReady) try { onReady(); } catch { /* ignore */ }
                    // widgetIdRef.current = id; // google returns number
                } catch { /* ignore */ }
             }
        };

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
            script.async = true;
            script.addEventListener('load', renderGoogle);
            document.body.appendChild(script);
        } else {
            renderGoogle();
        }
    }
    }, [effectiveSiteKey, disabled, provider, onVerified, onCancel, onReady, preload, containerId]);

    // If site key not provided and not explicitly disabled, show dev fallback
    if (!effectiveSiteKey && !disabled) {
     const handleVerify = () => {
        setLoading(true);
        setTimeout(() => {
            onVerified('local-test');
            setLoading(false);
        }, 500);
     };
     // Dev mode fallback
     return (
        <div className="captcha-modal">
            <div className="captcha-box">
                <h3>Verification required (Dev)</h3>
                <p>No Site Key configured.</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button className="submit-btn" onClick={handleVerify} disabled={loading}>{loading ? 'Verifying...' : 'Verify (Mock)'}</button>
                    {onCancel && <button className="submit-btn" onClick={onCancel} style={{ background: 'transparent', border: '1px solid #444' }}>Cancel</button>}
                </div>
            </div>
        </div>
     );
  }

    // If disabled via env, provide a dev fallback UI (or hidden container in preload)
    if (disabled) {
        if (preload) {
            return (
                <div aria-hidden style={{ position: 'absolute', left: -9999, top: 0, width: 1, height: 1, overflow: 'hidden' }}>
                    <div id={containerId} />
                </div>
            );
        }

        const handleVerifyDisabled = () => {
            setLoading(true);
            setTimeout(() => {
                onVerified('local-test');
                setLoading(false);
            }, 300);
        };

        return (
            <div className="captcha-modal">
                <div className="captcha-box">
                    <h3>Verification (Dev)</h3>
                    <p>Turnstile is disabled for local development.</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <button className="submit-btn" onClick={handleVerifyDisabled} disabled={loading}>{loading ? 'Verifying...' : 'Verify (Mock)'}</button>
                        {onCancel && <button className="submit-btn" onClick={onCancel} style={{ background: 'transparent', border: '1px solid #444' }}>Cancel</button>}
                    </div>
                </div>
            </div>
        );
    }

    // If preload mode, render a hidden offscreen container and avoid modal UI
    if (preload) {
        return (
            <div aria-hidden style={{ position: 'absolute', left: -9999, top: 0, width: 1, height: 1, overflow: 'hidden' }}>
                <div id={containerId} />
            </div>
        );
    }

    return (
        <div className="captcha-modal">
            <div className="captcha-box">
                <h3>{provider === 'cloudflare' ? 'Security Check' : 'Verification required'}</h3>
                <div id={containerId} style={{ minHeight: 120, display: 'flex', justifyContent: 'center' }}></div>
                {onCancel && <button className="submit-btn" onClick={onCancel} style={{ background: 'transparent', border: '1px solid #444', marginTop: 10 }}>Cancel</button>}
            </div>
        </div>
    );
};

export default CaptchaWidget;

