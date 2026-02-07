import React from 'react';

import ArchiveIcon from './ArchiveIcon';
import '../pages/Feedback.css';

interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
  status: string;
  archived?: boolean;
}

interface FeedbackSectionProps {
  feedbacks: Feedback[];
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onDelete?: (id: number) => void;
  onArchive?: (id: number) => void;
  onUnarchive?: (id: number) => void;
  admin?: boolean;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedbacks, onAccept, onReject, onDelete, onArchive, onUnarchive, admin }) => {
  const accepted = feedbacks.filter(f => f.status === 'ACCEPTED');
  const isArchiveView = !!onUnarchive;
  return (
    <section>
      <h2 style={{ textAlign: 'center', marginTop: 32, fontSize: '2em', color: isArchiveView ? '#fbbf24' : '#f87171' }}>{isArchiveView ? 'Archived Feedbacks' : 'Feedback Submissions'}</h2>
      {admin && (
        <table className="admin-feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(f => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>
                  <div className="comment-scroll">{f.comment}</div>
                </td>
                <td>{new Date(f.createdAt).toLocaleString()}</td>
                <td><span className={`status ${f.status}`}>{f.status}</span></td>
                <td style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'visible', justifyContent: isArchiveView ? 'flex-end' : 'flex-start' }}>
                  {onAccept && f.status !== 'ACCEPTED' && (
                    <button onClick={() => onAccept(f.id)}>Accept</button>
                  )}
                  {onReject && f.status !== 'REJECTED' && (
                    <button onClick={() => onReject(f.id)}>Reject</button>
                  )}
                  {onDelete && (
                    <button onClick={() => onDelete(f.id)} style={{ background: 'linear-gradient(90deg, #991b1b 0%, #ef4444 100%)' }}>Delete</button>
                  )}
                  {!isArchiveView && onArchive && (
                    <button
                      className="archive-icon-btn"
                      title="Archive"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 8 }}
                      onClick={() => onArchive(f.id)}
                    >
                      <ArchiveIcon style={{ verticalAlign: 'middle' }} />
                    </button>
                  )}
                  {isArchiveView && onUnarchive !== undefined && (
                    <button
                      className="archive-icon-btn"
                      title="Unarchive"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 'auto' }}
                      onClick={() => (onUnarchive as (id: number) => void)(f.id)}
                    >
                      <ArchiveIcon style={{ verticalAlign: 'middle' }} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isArchiveView && (
        <div className="admin-feedback-comments" style={{ marginTop: 32, background: '#18181b', borderRadius: 12, boxShadow: '0 2px 16px #f8717122', padding: 24, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          <h3 style={{ color: '#f87171', fontWeight: 600, fontSize: '1.3em', marginBottom: 16 }}>Comments:</h3>
          {accepted.length === 0 && <div>No accepted feedbacks yet.</div>}
          <ul>
            {accepted.map((f: Feedback) => (
              <li key={f.id}>
                <strong>{f.name}</strong>: {f.comment}
                <span className="date">{new Date(f.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FeedbackSection;
