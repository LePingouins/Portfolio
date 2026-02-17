import React, { useState, useContext } from 'react';
import './Contact.css';
import { LanguageContext } from '../components/LanguageContext';
import { submitContactMessage } from '../services/api';
import { EmailIcon, GithubIcon, LinkedinIcon, LocationIcon, SendIcon } from '../components/ContactIcons';

const Contact: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setErrorMessage(t.contact.form.errorInit);
      return;
    }

    setStatus('submitting');
    
    try {
      await submitContactMessage(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact submit error:', error);
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
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  placeholder={t.contact.form.name}
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  placeholder={t.contact.form.email}
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  className="form-input" 
                  placeholder={t.contact.form.subject}
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <textarea 
                  name="message" 
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
