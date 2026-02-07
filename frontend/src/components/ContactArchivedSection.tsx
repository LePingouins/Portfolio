import React from 'react';
import ArchiveIcon from './ArchiveIcon';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface ContactArchivedSectionProps {
  contacts: ContactMessage[];
  onDelete?: (id: number) => void;
  onUnarchive?: (id: number) => void;
}


const ContactArchivedSection: React.FC<ContactArchivedSectionProps> = ({ contacts, onDelete, onUnarchive }) => {
  return (
    <section>
      <div className="dashboard-content">
        <h2 style={{ textAlign: 'center', marginTop: 32, fontSize: '2em', color: '#fbbf24' }}>Archived Contacts</h2>
        <table className="admin-feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <div className="comment-scroll" style={{ maxWidth: 320, overflowX: 'auto', whiteSpace: 'pre', display: 'flex', alignItems: 'center', padding: '0 20px' }}>{c.message}</div>
                </td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'visible', minWidth: 0 }}>
                  {onDelete && (
                    <button onClick={() => onDelete(c.id)}>
                      Delete
                    </button>
                  )}
                  {onUnarchive && (
                    <button className="archive-icon-btn" title="Unarchive" onClick={() => onUnarchive(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                      <ArchiveIcon style={{ verticalAlign: 'middle', opacity: 0.7 }} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ContactArchivedSection;