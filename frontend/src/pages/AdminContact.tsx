import React, { useEffect, useState } from 'react';
import ContactSection from '../components/ContactSection';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}


import { archiveContactMessage } from '../services/api';

const AdminContact: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch('/api/contact-messages');
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/contact-messages/${id}`, { method: 'DELETE' });
    setMessages(messages => messages.filter(m => m.id !== id));
  };

  const handleArchive = async (id: number) => {
    await archiveContactMessage(id);
    setMessages(messages => messages.filter(m => m.id !== id));
  };

  useEffect(() => {
    (async () => {
      await fetchMessages();
    })();
  }, []);

  return (
    <div style={{ padding: 32 }}>
      {loading ? <div>Loading...</div> : (
        <ContactSection
          messageList={messages.map(m => ({
            id: m.id,
            name: m.name,
            email: m.email,
            content: m.message,
            createdAt: m.createdAt,
          }))}
          onDelete={handleDelete}
          onArchive={handleArchive}
        />
      )}
      {/* Archived contact messages are now shown in the Archive page */}
    </div>
  );
};

export default AdminContact;
