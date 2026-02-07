import React from 'react';
import ArchiveIcon from './ArchiveIcon';

interface ContactSectionProps {
  messageList: Array<{ id: number; name: string; email: string; content: string; createdAt: string }>;
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
  archivedView?: boolean;
}


const ContactSection: React.FC<ContactSectionProps> = ({ messageList, onDelete, onArchive, archivedView }) => (
  <section>
    <div className="dashboard-content">
      <h2 style={{ textAlign: 'center', marginTop: 32, fontSize: '2em', color: archivedView ? '#fbbf24' : '#f87171' }}>{archivedView ? 'Archived Contacts' : 'Contact Messages'}</h2>
      <table className="admin-feedback-table">
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
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
          {messageList.map(msg => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>
                <div className="comment-scroll" style={{ maxWidth: 320, overflowX: 'auto', whiteSpace: 'pre', display: 'flex', alignItems: 'center', padding: '0 20px' }}>{msg.content}</div>
              </td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
              <td style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'visible', minWidth: 0 }}>
                {onDelete && <button onClick={() => onDelete(msg.id)}>Delete</button>}
                {!archivedView && onArchive && (
                  <button className="archive-icon-btn" title="Archive" onClick={() => onArchive(msg.id)}>
                    <ArchiveIcon style={{ verticalAlign: 'middle' }} />
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

export default ContactSection;
