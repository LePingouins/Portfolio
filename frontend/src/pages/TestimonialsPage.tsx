import React, { useState, useContext } from 'react';
import { submitTestimonial } from '../services/api';
import './Testimonials.css';
import './Home.css';
import { LanguageContext } from '../components/LanguageContext';

type TestimonialPayload = {
  name: string;
  text: string;
  role?: string;
  avatar?: string;
};

const TestimonialsPage: React.FC = () => {
  const { t } = useContext(LanguageContext);
  const [input, setInput] = useState('');
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (input.trim() && author.trim()) {
      setLoading(true);
      try {
        const payload: TestimonialPayload = { name: author, text: input, role: role || undefined, avatar: avatar || undefined };
        await submitTestimonial(payload);
        setSuccess(true);
        setInput('');
        setAuthor('');
        setRole('');
        setAvatar('');
        setTimeout(() => setSuccess(false), 5000);
      } catch {
        window.alert('Failed to submit testimonial');
      }
      setLoading(false);
    }
  };

  return (
    <div className="home-page-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0px' }}>
      {/* Dynamic Background */}
      <div className="home-bg-layer" />
      <div className="bg-gradient-orb orb-1" />
      <div className="bg-gradient-orb orb-2" />
      <div className="bg-gradient-orb orb-3" />

      <div className="admin-testimonials-container" style={{ width: '100%', maxWidth: '800px', margin: '0 20px', zIndex: 10, position: 'relative' }}>
        <h2 className="admin-testimonials-title">{t.testimonials.title}</h2>
        <p style={{ textAlign: 'center', marginBottom: 32, color: '#a1a1aa' }}>
          {t.testimonials.subtitle}
        </p>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: 40, background: '#18181b', borderRadius: 12, border: '1px solid #22c55e' }}>
            <h3 style={{ color: '#22c55e', fontSize: '1.5rem', marginBottom: 10 }}>{t.testimonials.successTitle}</h3>
            <p style={{ color: '#d1d5db' }}>{t.testimonials.successMessage}</p>
            <button 
              onClick={() => setSuccess(false)}
              className="admin-testimonials-add-btn"
              style={{ marginTop: 20, background: '#22c55e' }}
            >
              {t.testimonials.submitAnother}
            </button>
          </div>
        ) : (
          <div className="admin-testimonials-form-card" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <div className="admin-testimonials-form-grid">
              <input
                className="admin-testimonials-input"
                type="text"
                placeholder={t.testimonials.form.namePlaceholder}
                value={author}
                onChange={e => setAuthor(e.target.value)}
              />
              <input
                className="admin-testimonials-input"
                type="text"
                placeholder={t.testimonials.form.rolePlaceholder}
                value={role}
                onChange={e => setRole(e.target.value)}
              />
              <input
                className="admin-testimonials-input"
                type="text"
                placeholder={t.testimonials.form.avatarPlaceholder}
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
              />
            </div>
            <textarea
              className="admin-testimonials-textarea"
              placeholder={t.testimonials.form.messagePlaceholder}
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ minHeight: 120 }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button 
                className="admin-testimonials-add-btn" 
                onClick={handleSubmit} 
                disabled={loading || !input.trim() || !author.trim()}
                style={{ width: '100%', maxWidth: 200 }}
              >
                {loading ? t.testimonials.button.submitting : t.testimonials.button.submit}
              </button>
            </div>
            <p style={{ marginTop: 16, fontSize: '0.85rem', color: '#71717a', textAlign: 'center' }}>
              {t.testimonials.approvalNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
