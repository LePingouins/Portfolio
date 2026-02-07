import React, { useEffect, useState } from 'react';
import { fetchArchivedFeedbacks, unarchiveFeedback, deleteFeedback, fetchArchivedContactMessages, deleteContactMessage } from '../services/api';
import FeedbackSection from '../components/FeedbackSection';
import ContactArchivedSection from '../components/ContactArchivedSection';
import { fetchArchivedProjects, unarchiveProject } from '../services/api';


interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
  archived?: boolean;
}

interface Project {
  id?: number;
  name: string;
  description: string;
  projectLink: string;
  websiteLink: string;
  imageUrl: string;
  techStack: string[];
  archived?: boolean;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const Archive: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [archivedContacts, setArchivedContacts] = useState<ContactMessage[]>([]);
  const [archivedProjects, setArchivedProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    fetchArchivedFeedbacks().then(setFeedbacks).catch(() => setFeedbacks([]));
    fetchArchivedContactMessages().then(setArchivedContacts).catch(() => setArchivedContacts([]));
    fetchArchivedProjects().then(data => {
      setArchivedProjects(data);
      setLoadingProjects(false);
    });
  }, []);

  const handleDeleteContact = async (id: number) => {
    await deleteContactMessage(id);
    setArchivedContacts(msgs => msgs.filter(m => m.id !== id));
  };

  const handleUnarchiveFeedback = async (id: number) => {
    await unarchiveFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
  };
  const handleDeleteFeedback = async (id: number) => {
    await deleteFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
  };

  const handleUnarchiveProject = async (id?: number) => {
    if (!id) return;
    await unarchiveProject(id);
    setArchivedProjects(projects => projects.filter(p => p.id !== id));
  };

  return (
    <div className="content-safe-bg" style={{ fontSize: 18, fontFamily: 'Inter, Arial, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 80 }}>
      <div className="dashboard-content">
        <ContactArchivedSection
          contacts={archivedContacts}
          onDelete={handleDeleteContact}
          onUnarchive={async (id: number) => {
            await fetch('/api/contact-messages/' + id + '/unarchive', { method: 'PATCH' });
            setArchivedContacts(msgs => msgs.filter(m => m.id !== id));
          }}
        />
        <FeedbackSection
          feedbacks={feedbacks}
          onDelete={handleDeleteFeedback}
          onUnarchive={handleUnarchiveFeedback}
          admin
        />
        <section>
          <h2 style={{ textAlign: 'center', marginTop: 32, fontSize: '2em', color: '#fbbf24' }}>Archived Projects</h2>
          {loadingProjects ? <div>Loading...</div> : archivedProjects.length === 0 ? (
            <div>No archived projects found.</div>
          ) : (
            <table className="admin-feedback-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Tech Stack</th>
                  <th>Links</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {archivedProjects.map(p => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>
                      <div className="comment-scroll" style={{ maxWidth: 320, overflowX: 'auto', whiteSpace: 'pre', display: 'flex', alignItems: 'center', padding: '0 20px' }}>{p.description}</div>
                    </td>
                    <td>{p.techStack && p.techStack.length > 0 ? p.techStack.join(', ') : '-'}</td>
                    <td>
                      <a href={p.projectLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>Project</a>
                      {p.websiteLink && <a href={p.websiteLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>Website</a>}
                    </td>
                    <td style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button className="archive-icon-btn" title="Unarchive" onClick={() => handleUnarchiveProject(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="7" width="18" height="13" rx="2" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
                          <rect x="1" y="3" width="22" height="4" rx="1.5" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
                          <path d="M9 13h6" stroke="#b45309" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default Archive;
