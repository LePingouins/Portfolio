import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackSection from '../components/FeedbackSection';
import { fetchAllFeedbacks, acceptFeedback, rejectFeedback, deleteFeedback, archiveFeedback } from '../services/api';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
}

const AdminDashboard: React.FC = () => {
  // Use universal content-safe background utility for all admin pages
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const navigate = useNavigate();
  const { section } = useParams();
  // Normalize section: default to 'feedbacks' if not present or if 'feedback' (singular)
  const adminSection = !section || section === 'feedback' ? 'feedbacks' : section;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchAllFeedbacks().then(setFeedbacks).catch(() => setFeedbacks([]));
  }, [navigate]);

  const handleAccept = async (id: number) => {
    await acceptFeedback(id);
    setFeedbacks(fbs => fbs.map(f => f.id === id ? { ...f, status: 'ACCEPTED' } : f));
  };
  const handleReject = async (id: number) => {
    await rejectFeedback(id);
    setFeedbacks(fbs => fbs.map(f => f.id === id ? { ...f, status: 'REJECTED' } : f));
  };
  const handleDelete = async (id: number) => {
    await deleteFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
  };
  const handleArchive = async (id: number) => {
    await archiveFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
  };

  return (
    <>
      <div className="content-safe-bg" style={{ fontSize: 18, fontFamily: 'Inter, Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="dashboard-content">
          {adminSection === 'feedbacks' && (
            <FeedbackSection
              feedbacks={feedbacks}
              onAccept={handleAccept}
              onReject={handleReject}
              onDelete={handleDelete}
              onArchive={handleArchive}
              admin
            />
          )}
          {/* Add more admin sections here as needed */}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
