import React, { useEffect, useState } from 'react';
import { fetchArchivedFeedbacks, unarchiveFeedback, deleteFeedback, fetchArchivedContactMessages, deleteContactMessage } from '../services/api';
import FeedbackSection from '../components/FeedbackSection';
import ContactArchivedSection from '../components/ContactArchivedSection';


interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
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

  useEffect(() => {
    fetchArchivedFeedbacks().then(setFeedbacks).catch(() => setFeedbacks([]));
    fetchArchivedContactMessages().then(setArchivedContacts).catch(() => setArchivedContacts([]));
  }, []);
  const handleDeleteContact = async (id: number) => {
    await deleteContactMessage(id);
    setArchivedContacts(msgs => msgs.filter(m => m.id !== id));
  };

  const handleUnarchive = async (id: number) => {
    await unarchiveFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
  };
  const handleDelete = async (id: number) => {
    await deleteFeedback(id);
    setFeedbacks(fbs => fbs.filter(f => f.id !== id));
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
          onDelete={handleDelete}
          onUnarchive={handleUnarchive}
          admin
        />
      </div>
    </div>
  );
};

export default Archive;
