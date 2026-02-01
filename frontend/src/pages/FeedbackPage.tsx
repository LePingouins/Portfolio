
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
}

const FeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8085'}/api/feedback`);
    const data = await res.json();
    setFeedbacks(data.reverse());
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await fetchFeedbacks();
    })();
    const handler = () => fetchFeedbacks();
    window.addEventListener('feedback-submitted', handler);
    return () => window.removeEventListener('feedback-submitted', handler);
  }, []);

  // Submission is now handled from the Home modal, so no form or handler here

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-block">
        <img src="/olivierlogo.png" alt="Feedback" className="dashboard-icon" />
        <h1>Feedback</h1>
        <p className="dashboard-desc">We value your thoughts and suggestions! Here are all the comments from visitors.</p>
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Total Feedback</span>
            <span className="dashboard-stat-value">{loading ? '...' : feedbacks.length}</span>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Last Feedback</span>
            <span className="dashboard-stat-value">
              {loading || feedbacks.length === 0 ? '—' : new Date(feedbacks[0].createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <h2 className="dashboard-section-title">All Comments</h2>
      <div className="dashboard-list feedback-list-enhanced">
        {loading ? <div>Loading...</div> : (
          feedbacks.length === 0 ? <div>No feedback yet.</div> :
          feedbacks.map(fb => (
            <div className="dashboard-card feedback-card-enhanced" key={fb.id}>
              <div className="feedback-card-header">
                <div className="feedback-avatar">
                  {fb.name ? fb.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <div className="dashboard-feedback-name">{fb.name}</div>
                  <div className="dashboard-feedback-date">{new Date(fb.createdAt).toLocaleString()}</div>
                </div>
              </div>
              <div className="dashboard-feedback-comment feedback-comment-enhanced">{fb.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
