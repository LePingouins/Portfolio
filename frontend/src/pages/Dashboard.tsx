


import React, { useEffect, useState } from 'react';
import './Dashboard.css';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8085'}/api/feedback`);
      const data = await res.json();
      setFeedbacks(data.reverse());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    const handler = () => fetchFeedbacks();
    window.addEventListener('feedback-submitted', handler);
    return () => window.removeEventListener('feedback-submitted', handler);
  }, []);

  // Calculate unique users
  const uniqueUsers = Array.from(new Set(feedbacks.map(fb => fb.name))).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header-block">
        <img src="/olivierlogo.png" alt="Dashboard" className="dashboard-icon" />
        <h1>Dashboard</h1>
        <p className="dashboard-desc">Welcome, Olivier! Here you can see analytics and stats about your portfolio’s feedback.</p>
        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Total Feedback</span>
            <span className="dashboard-stat-value">{loading ? '...' : feedbacks.length}</span>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Unique Users</span>
            <span className="dashboard-stat-value">{loading ? '...' : uniqueUsers}</span>
          </div>
          <div className="dashboard-stat">
            <span className="dashboard-stat-label">Last Feedback</span>
            <span className="dashboard-stat-value">
              {loading || feedbacks.length === 0 ? '—' : new Date(feedbacks[0].createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
