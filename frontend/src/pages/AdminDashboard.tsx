import React, { useEffect, useState, lazy, Suspense } from 'react';
const LazyAdminSkills = lazy(() => import('./AdminSkills'));
import { useNavigate, useParams } from 'react-router-dom';
import FeedbackSection from '../components/FeedbackSection';
import AdminProjects from '../components/AdminProjects';
import AdminWork from '../components/AdminWork';
import type { ProjectForm } from '../components/AdminProjects';
import { addProject } from '../services/api';
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
  // Normalize section: default to 'feedbacks' if not present or if 'feedback' (singular), but handle /admin/projects
  let adminSection = section;
  if (!adminSection || adminSection === 'feedback') {
    // Check if pathname is /admin/projects
    const pathname = window.location.pathname;
    if (pathname === '/admin/projects') {
      adminSection = 'projects';
    } else {
      adminSection = 'feedbacks';
    }
  }

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
        <div className="dashboard-content" style={{ width: '100%' }}>
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
          {adminSection === 'projects' && (
            <AdminProjects onAddProject={async (project: ProjectForm) => {
              try {
                // Map ProjectForm to backend Project type
                await addProject({
                  name: project.name,
                  description: project.description,
                  projectLink: project.projectLink,
                  websiteLink: project.websiteLink,
                  imageUrl: project.imageUrl,
                  techStack: project.techStack,
                });
                window.alert('Project added successfully!');
              } catch {
                window.alert('Failed to add project.');
              }
            }} />
          )}
          {adminSection === 'work' && (
            <AdminWork />
          )}
          {adminSection === 'skills' && (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyAdminSkills />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
