
import React, { useState, useContext, useEffect } from 'react';
import './Feedback.css';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackSection from '../components/FeedbackSection';
import { LanguageContext } from '../components/LanguageContext';
import { fetchAcceptedFeedbacks } from '../services/api';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
}

const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showFabHint, setShowFabHint] = useState(true);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    fetchAcceptedFeedbacks().then(setFeedbacks).catch(() => setFeedbacks([]));
  }, [submitted]);


  // Modal open/close handlers
  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="content-safe-bg">
      <div className="feedback-page-bg">
        <div className="bg-anim-circle bg-anim-circle1" />
        <div className="bg-anim-circle bg-anim-circle2" />
        <div className="bg-anim-circle bg-anim-circle3" />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          minHeight: '70vh',
          justifyContent: 'flex-start',
          paddingTop: 0,
        }}>
          {/* Comments Section at the Top */}
          <div style={{ width: '100%', maxWidth: 700, margin: '24px auto 48px auto' }}>
            <FeedbackSection feedbacks={feedbacks} />
          </div>

          {/* Modern Floating Action Button */}
          {/* FAB Hint Bubble */}
          {showFabHint && (
            <div className="fab-hint-bubble">
              <span>{language === 'fr' ? 'Envie de laisser un commentaire ? Cliquez ici !' : 'Want to add a comment? Click this!'}</span>
              <button className="fab-hint-close" onClick={() => setShowFabHint(false)} aria-label="Close hint">×</button>
            </div>
          )}
          <button
            className="fab-add-feedback"
            onClick={() => { openModal(); setShowFabHint(false); }}
            aria-label={language === 'fr' ? 'Ajouter un avis' : 'Add Feedback'}
          >
            <span className="fab-icon">
              {/* Chat bubble SVG icon */}
              <svg viewBox="0 0 32 32" fill="none"><path d="M6 24v-2.5A2.5 2.5 0 0 1 8.5 19H24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h.5V28l5.5-4h10a2 2 0 0 0 2-2V19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </button>

          {/* Modal Overlay for Feedback Form */}
          {modalOpen && (
            <div className="feedback-modal-overlay" onClick={closeModal}>
              <div
                className="feedback-modal-card"
                onClick={e => e.stopPropagation()}
              >
                <button className="modal-close-btn" onClick={closeModal} aria-label="Close">×</button>
                <h1 style={{ textAlign: 'left', marginBottom: 8 }}>{language === 'fr' ? 'Laisser un avis' : 'Leave Feedback'}</h1>
                <p style={{ marginBottom: 24 }}>{language === 'fr' ? "Votre avis est important ! Laissez un commentaire ci-dessous." : "Your feedback is important! Leave a comment below."}</p>

                {submitted ? (
                  <div className="contact-success">{language === 'fr' ? "Merci pour votre avis !" : "Thank you for your feedback!"}</div>
                ) : (
                  <FeedbackForm onSubmit={() => setSubmitted(true)} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default Feedback;
