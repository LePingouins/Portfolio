
import React, { useState, useContext } from 'react';
import './FeedbackForm.css';
import { submitFeedback } from '../services/api';
import { LanguageContext } from '../components/LanguageContextValue';
import { CheckCircleIcon, StarIcon } from './FeedbackIcons';

interface FeedbackFormProps {
  onSubmit: (name?: string, comment?: string) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const { language } = useContext(LanguageContext);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('general');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const t = {
    title: language === 'fr' ? 'Votre Avis' : 'Share your thought',
    desc: language === 'fr' ? 'Aidez-moi à améliorer ce portfolio.' : 'Help me improve this portfolio.',
    nameLbl: language === 'fr' ? 'Nom / Pseudo' : 'Name / Alias',
    commentLbl: language === 'fr' ? 'Commentaire' : 'Feedback',
    ratingLbl: language === 'fr' ? 'Note' : 'Rating',
    catLbl: language === 'fr' ? 'Catégorie' : 'Category',
    btn: language === 'fr' ? 'Envoyer' : 'Submit Feedback',
    success: language === 'fr' ? 'Merci pour votre retour !' : 'Thanks for your feedback!',
    another: language === 'fr' ? 'Envoyer un autre' : 'Submit another',
    cats: {
        general: language === 'fr' ? 'Général' : 'General',
        bug: language === 'fr' ? 'Bug / Problème' : 'Bug / Issue',
        feature: language === 'fr' ? 'Suggestion' : 'Feature Request',
        content: language === 'fr' ? 'Contenu' : 'Content',
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (honeypot) return;
    
    // Check localStorage for rate limit (10 mins)
    const lastFeedbackTime = localStorage.getItem('lastFeedbackTime');
    if (lastFeedbackTime) {
      const diff = Date.now() - parseInt(lastFeedbackTime, 10);
      if (diff < 10 * 60 * 1000) {
        const remaining = Math.ceil((10 * 60 * 1000 - diff) / 60000);
        setError(language === 'fr' 
          ? `Veuillez attendre ${remaining} minute(s) avant d'envoyer un autre commentaire.` 
          : `Please wait ${remaining} minute(s) before submitting another feedback.`);
        return;
      }
    }

    if (!name.trim() || !comment.trim()) {
      setError(language === 'fr' ? 'Champs requis.' : 'Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    try {
      // NOTE: backend might not accept rating/category yet? 
      // Assuming we send them as part of the comment or extend the API. 
      // For now, I'll append them to the comment if the backend structure is rigid,
      // OR better, assuming I can just send extra fields and they might be ignored or accepted.
      // Let's check `submitFeedback` signature next time, but for now I'll combine them for safety 
      // if I can't change the backend.
      // Actually, looking at `Feedbacks` interface in `Feedback.tsx`, it only had `name`, `comment`.
      // I will prefix the category/rating to the comment for now to persist data without backend changes
      // or assume the backend is flexible.
      
      const enrichedComment = `[${category.toUpperCase()}] [${rating}/5 Stars] - ${comment}`;
      
      await submitFeedback({ name, comment: enrichedComment }); // Adapting to existing API
      
      // Store timestamp
      localStorage.setItem('lastFeedbackTime', Date.now().toString());
      
      setSuccess(true);
      onSubmit(name, enrichedComment);
      setName('');
      setComment('');
      setRating(5);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(language === 'fr' ? "Erreur d'envoi." : 'Failed to submit.');
      }
    } finally {
        setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="feedback-form-card success-state">
              <div className="success-icon">
                <CheckCircleIcon width={64} height={64} />
              </div>
              <h3>{t.success}</h3>
              <button className="submit-button" onClick={() => setSuccess(false)} style={{ marginTop: 20 }}>
                  {t.another}
              </button>
          </div>
      );
  }

  return (
    <div className="feedback-form-card">
        <h2>{t.title}</h2>
        <p>{t.desc}</p>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
            <div className="frm-group">
                <label className="frm-label">{t.nameLbl}</label>
                <input 
                    className="frm-input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                />
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
                <div className="frm-group" style={{ flex: 1 }}>
                    <label className="frm-label">{t.catLbl}</label>
                    <select 
                        className="frm-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value="general">{t.cats.general}</option>
                        <option value="content">{t.cats.content}</option>
                        <option value="feature">{t.cats.feature}</option>
                        <option value="bug">{t.cats.bug}</option>
                    </select>
                </div>

                <div className="frm-group" style={{ flex: 1 }}>
                    <label className="frm-label">{t.ratingLbl}</label>
                    <div className="rating-container">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star-btn ${rating >= star ? 'active' : ''}`}
                                onClick={() => setRating(star)}
                            >
                                <StarIcon filled={rating >= star} width={24} height={24} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="frm-group">
                <label className="frm-label">{t.commentLbl}</label>
                <textarea 
                    className="frm-textarea"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="..."
                />
            </div>

            {/* Honeypot */}
            <input 
                type="text" 
                style={{ display: 'none' }} 
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
            />

            <button type="submit" className="submit-button" disabled={loading}>
                {loading ? '...' : t.btn}
            </button>
        </form>
    </div>
  );
};

export default FeedbackForm;

