import React, { useContext } from 'react';
import ArchiveIcon from './ArchiveIcon';
import { LanguageContext } from './LanguageContext';

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
  const { t } = useContext(LanguageContext);
  return (
    <section>
      <div className="dashboard-content">
        <h2 style={{ textAlign: 'center', marginTop: 32, fontSize: '2em', color: '#fbbf24' }}>{t.archive.contactsTitle}</h2>
        <table className="admin-feedback-table">
          <thead>
            <tr>
              <th>{t.archive.table.name}</th>
              <th>{t.archive.table.email}</th>
              <th>{t.archive.table.message}</th>
              <th>{t.archive.table.date}</th>
              <th>{t.archive.table.actions}</th>
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
                      {t.archive.action.delete}
                    </button>
                  )}
                  {onUnarchive && (
                    <button className="archive-icon-btn" title={t.archive.action.unarchive} onClick={() => onUnarchive(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
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