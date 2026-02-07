
import React, { useState } from 'react';
import './FeedbackForm.css';
import { submitFeedback } from '../services/api';


interface FeedbackFormProps {
  onSubmit: (name?: string, comment?: string) => void;
}


const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  // console.log('DEBUG: FeedbackForm component is mounted');

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [honeypot, setHoneypot] = useState(''); // spam protection
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (honeypot) {
      setError('Spam detected.');
      return;
    }
    if (!name.trim() || !comment.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (name.length > 50) {
      setError('Name is too long.');
      return;
    }
    if (comment.length > 500) {
      setError('Comment is too long.');
      return;
    }
    try {
      await submitFeedback({ name, comment });
      onSubmit(name, comment);
      setName('');
      setComment('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to submit feedback.');
      } else {
        setError('Failed to submit feedback.');
      }
    }
  };

  return (
    <form
      className="feedback-form"
      onSubmit={handleSubmit}
      autoComplete="off"
      aria-label="Feedback form"
    >
      <div className="feedback-form-group">
        <input
          id="feedback-name"
          type="text"
          placeholder=" "
          value={name}
          onChange={e => setName(e.target.value)}
          required
          maxLength={50}
          aria-label="Your name"
        />
        <label htmlFor="feedback-name" className="floating-label">Your name</label>
      </div>
      <div className="feedback-form-group">
        <textarea
          id="feedback-comment"
          placeholder=" "
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
          rows={4}
          maxLength={500}
          aria-label="Your feedback"
        />
        <label htmlFor="feedback-comment" className="floating-label">Your feedback</label>
      </div>
      {/* Honeypot field for spam bots, hidden from users */}
      <input
        type="text"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      {error && <div className="feedback-error" role="alert">{error}</div>}
      <button type="submit">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
