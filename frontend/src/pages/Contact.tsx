import React, { useState, useContext, useRef } from 'react';
import './Contact.css';
import { LanguageContext } from '../components/LanguageContext';
import { submitContactMessage, API_BASE_URL } from '../services/api';
import CaptchaWidget from '../components/CaptchaWidget';
import TurnstileStatus from '../components/TurnstileStatus';
import { EmailIcon, GithubIcon, LinkedinIcon, LocationIcon, SendIcon } from '../components/ContactIcons';

const Contact: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showCaptcha, setShowCaptcha] = useState(false);
  const preloadedTokenRef = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check localStorage for rate limit (10 mins)
    const lastContactTime = localStorage.getItem('lastContactTime');
    if (lastContactTime) {
      const diff = Date.now() - parseInt(lastContactTime, 10);
      const cooldownTime = 10 * 60 * 1000; // 10 minutes
      if (diff < cooldownTime) {
        const remaining = Math.ceil((cooldownTime - diff) / 60000);
        const errorTemplate = t.contact.form.cooldown || `Please wait ${remaining} minute(s) before sending another message.`;
        setErrorMessage(errorTemplate.replace('{minutes}', remaining.toString()));
        setStatus('error');
        return;
      }
    }
    
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrorMessage(t.contact.form.errorInit);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    try {
      await submitContactMessage(form);
      localStorage.setItem('lastContactTime', Date.now().toString());
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error: unknown) {
      console.error('Contact submit error:', error);
      const e = error as Record<string, unknown>;
      if (e && e.type === 'captcha') {
        setShowCaptcha(true);
        setStatus('idle');
        return;
      }
      setStatus('error');
      setErrorMessage(t.contact.form.errorSend);
    }
  };

  const handleCaptchaVerified = async (token: string) => {
    try {
      // send token to backend verify endpoint
      const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/verify-captcha` : `${API_BASE_URL}/api/verify-captcha`;
      await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) });
      setShowCaptcha(false);
      // retry submit
      setStatus('submitting');
      await submitContactMessage(form);
      localStorage.setItem('lastContactTime', Date.now().toString());
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Captcha verify/submit error:', err);
      setShowCaptcha(false);
      setStatus('error');
      setErrorMessage(t.contact.form.errorSend);
    }
  };


  return (
    <div className="contact-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />

      <div className="contact-card-wrapper">
        <div className="contact-info-panel">
          <div>
            <div className="contact-info-header">
              <h2>{t.contact.title}</h2>
              <p className="contact-info-text">{t.contact.subtitle}</p>
            </div>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="icon-box">
                  <LocationIcon />
                </div>
                <span>{t.contact.location}</span>
              </div>
              
              <a href="mailto:oligoudreault@gmail.com" className="contact-detail-item" style={{ textDecoration: 'none' }}>
                <div className="icon-box">
                  <EmailIcon />
                </div>
                <span>oligoudreault@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <p style={{ color: '#71717a', fontSize: '0.9em', marginBottom: '15px' }}>{t.contact.socialLabel}</p>
            <div className="social-links">
              <a href="https://github.com/LePingouins" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <GithubIcon width={20} height={20} />
              </a>
              <a href="https://www.linkedin.com/in/olivier-goudreault-09120a386/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <LinkedinIcon width={20} height={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>{t.contact.form.title}</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <TurnstileStatus />
            </div>
          </div>
          {/* Preload invisible widget so Turnstile script and widget are ready when needed */}
           <CaptchaWidget
             preload
             siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY || '1x00000000000000000000AA'}
             onVerified={(t: string) => { preloadedTokenRef.current = t; }}
           />
          {showCaptcha && (
            // Lazily load site key, prefer Cloudflare Turnstile
            <CaptchaWidget 
                siteKey={import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || import.meta.env.VITE_RECAPTCHA_SITE_KEY || '1x00000000000000000000AA'} 
                onVerified={handleCaptchaVerified} 
                onCancel={() => setShowCaptcha(false)} 
            />
          )}
          {status === 'success' ? (
            <div className="success-message-container">
              <div className="success-icon-large">
                <SendIcon width={64} height={64} />
              </div>
              <h3 className="success-title">{t.contact.form.successTitle}</h3>
              <p className="success-desc">{t.contact.form.successDesc}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="submit-btn" 
                style={{ marginTop: '30px', background: 'transparent', border: '1px solid #3f3f46' }}
              >
                {t.contact.form.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>{t.contact.form.title}</h3>
              </div>
              
              <div className="form-group">
                <label htmlFor="contact-name" style={{ position: 'absolute', left: -9999 }}>{t.contact.form.name}</label>
                <input 
                  id="contact-name"
                  name="name"
                  aria-label={t.contact.form.name}
                  type="text" 
                  className="form-input" 
                  placeholder={t.contact.form.name}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email" style={{ position: 'absolute', left: -9999 }}>{t.contact.form.email}</label>
                <input 
                  id="contact-email"
                  name="email"
                  aria-label={t.contact.form.email}
                  type="email" 
                  className="form-input" 
                  placeholder={t.contact.form.email}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject" style={{ position: 'absolute', left: -9999 }}>{t.contact.form.subject}</label>
                <input 
                  id="contact-subject"
                  name="subject"
                  aria-label={t.contact.form.subject}
                  type="text" 
                  className="form-input" 
                  placeholder={t.contact.form.subject}
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" style={{ position: 'absolute', left: -9999 }}>{t.contact.form.message}</label>
                <textarea 
                  id="contact-message"
                  name="message" 
                  aria-label={t.contact.form.message}
                  className="form-textarea" 
                  placeholder={t.contact.form.message}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {errorMessage && status === 'error' && (
                <div className="error-message">
                  {errorMessage}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <span className="sc-spinner" /> 
                    {t.contact.form.submitting}
                  </>
                ) : (
                  <>
                    {t.contact.form.submit} <SendIcon width={16} height={16} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
