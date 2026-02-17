
import React, { useState, useContext, useEffect } from 'react';
import './Feedback.css';
import FeedbackForm from '../components/FeedbackForm';
import { LanguageContext } from '../components/LanguageContextValue';
import { fetchAcceptedFeedbacks } from '../services/api';
import { StarIcon } from '../components/FeedbackIcons';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
}

// Helper: Parse the comment to see if it has metadata we added like [FEATURE] [4/5 Stars] - ...
const parseComment = (raw: string) => {
    let category = 'GENERAL';
    let rating = 5;
    let text = raw;

    // Try to extract category [CAT]
    const catMatch = raw.match(/^\[([A-Z]+)\]/);
    if (catMatch) {
        category = catMatch[1];
        text = text.replace(catMatch[0], '').trim();
    }

    // Try to extract rating [N/5 Stars]
    const ratingMatch = text.match(/^\[(\d)\/5 Stars\] -/);
    if (ratingMatch) {
        rating = parseInt(ratingMatch[1]);
        text = text.replace(ratingMatch[0], '').trim();
    }

    return { category, rating, text };
};

const Feedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const { t } = useContext(LanguageContext);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetchAcceptedFeedbacks()
        .then(data => {
            // Sort by new
            const sorted = data.sort((a: Feedback, b: Feedback) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setFeedbacks(sorted);
        })
        .catch(() => setFeedbacks([]));
  }, [reload]);


  return (
    <div className="feedback-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      
      <div className="feedback-container">
        
        {/* Left: Feedbacks List */}
        <div className="feedback-wall">
           <div className="feedback-header">
               <h1>{t.feedback.header}</h1>
               <p>{t.feedback.sub}</p>
           </div>
           
           <div className="feedback-grid">
               {feedbacks.length === 0 ? (
                   <div style={{ color: '#71717a', fontStyle: 'italic' }}>
                       {t.feedback.noFeedback}
                   </div>
               ) : (
                   feedbacks.map((f, index) => {
                       const { category, rating, text } = parseComment(f.comment);
                       return (
                           <div key={f.id} className="feedback-card" style={{ animationDelay: `${index * 0.15}s` }}>
                               <div className="card-header">
                                   <span className="card-name">{f.name}</span>
                                   <span className="card-date">{new Date(f.createdAt).toLocaleDateString()}</span>
                               </div>
                               <div className="card-stars">
                                   {[1,2,3,4,5].map(s => (
                                       <StarIcon key={s} width={16} height={16} filled={s <= rating} />
                                   ))}
                               </div>
                               <div className="card-comment">{text}</div>
                               <div className="card-badge">{category}</div>
                           </div>
                       );
                   })
               )}
           </div>
        </div>

        {/* Right: Sticky Form */}
        <div className="feedback-form-wrapper">
            <FeedbackForm onSubmit={() => setReload(p => p + 1)} />
        </div>

      </div>
    </div>
  );
};

export default Feedback;
