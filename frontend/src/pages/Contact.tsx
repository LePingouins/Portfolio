
import React, { useState, useContext } from 'react';
import './Contact.css';
import { LanguageContext } from '../components/LanguageContext';
import type { LanguageContextType } from '../components/LanguageContextValue';
import { submitContactMessage } from '../services/api';

const Contact: React.FC = () => {
  const { language } = useContext(LanguageContext) as LanguageContextType;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      await submitContactMessage(form);
      setSubmitted(true);
    } catch {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      <div className="contact-container">
        <h1>{language === 'fr' ? 'Contactez-moi' : 'Contact Me'}</h1>
        <p>{language === 'fr' ? "Une question, une collaboration ou juste envie de dire bonjour ? Remplissez le formulaire ci-dessous !" : "Have a question, want to collaborate, or just want to say hi? Fill out the form below!"}</p>
        {submitted ? (
          <div className="contact-success">{language === 'fr' ? "Merci pour votre message !" : "Thank you for your message!"}</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 18 }}>
            <input type="text" name="name" placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} value={form.name} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="email" name="email" placeholder={language === 'fr' ? 'Votre email' : 'Your email'} value={form.email} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="text" name="subject" placeholder={language === 'fr' ? 'Sujet' : 'Subject'} value={form.subject} onChange={handleChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <textarea name="message" placeholder={language === 'fr' ? 'Votre message' : 'Your message'} value={form.message} onChange={handleChange} required rows={5} style={{ padding: 10, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            {error && <div className="feedback-error" style={{ color: '#ef4444', fontWeight: 600 }}>{error}</div>}
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 8 }}>{language === 'fr' ? 'Envoyer' : 'Send'}</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
