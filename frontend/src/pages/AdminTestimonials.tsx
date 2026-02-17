import React, { useEffect, useState } from 'react';
import './AdminSkills.css';
import './Testimonials.css';
import { fetchAllTestimonials, deleteTestimonial, approveTestimonial, rejectTestimonial } from '../services/api';


interface Testimonial {
  id: number;
  name: string;
  text?: string;
  role?: string;
  avatar?: string;
  approved: boolean;
  createdAt?: string;
  status?: 'APPROVED' | 'REJECTED' | 'PENDING';
}

const AdminTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);


  // Normalize testimonials to always have a status field
  function normalizeTestimonials(data: Partial<Testimonial>[]): Testimonial[] {
    return data.map(t => ({
      ...t,
      status: t.approved ? 'APPROVED' : 'PENDING',
      text: t.text ?? '',
    }) as Testimonial);
  }

  useEffect(() => {
    fetchAllTestimonials()
      .then(data => setTestimonials(normalizeTestimonials(data)))
      .catch(() => setTestimonials([]));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch {
      window.alert('Failed to delete testimonial');
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveTestimonial(id);
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: 'APPROVED', approved: true } : t));
    } catch {
      window.alert('Failed to approve testimonial');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectTestimonial(id);
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, status: 'REJECTED', approved: false } : t));
    } catch {
      window.alert('Failed to reject testimonial');
    }
  };

  return (
    <div className="admin-testimonials-container">
      <h2 className="admin-testimonials-title">Manage Testimonials</h2>
      
      <table className="admin-feedback-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Role</th>
            <th>Content</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map(t => (
            <tr key={t.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8em' }}>{t.name[0]}</div>
                  )}
                  <span>{t.name}</span>
                </div>
              </td>
              <td>{t.role || '-'}</td>
              <td>
                <div className="comment-scroll" style={{ maxWidth: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={t.text}>
                  {t.text}
                </div>
              </td>
              <td>
                <span className={`status ${t.status?.toLowerCase()}`}>{t.status}</span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: 8 }}>
                  {!t.approved && (
                     <button onClick={() => handleApprove(t.id)} style={{ background: '#22c55e', padding: '6px 12px', borderRadius: 4, border: 'none', color: '#fff', cursor: 'pointer' }}>Approve</button>
                  )}
                  {t.approved && (
                     <button onClick={() => handleReject(t.id)} style={{ background: '#f59e0b', padding: '6px 12px', borderRadius: 4, border: 'none', color: '#fff', cursor: 'pointer' }}>Reject</button>
                  )}
                  <button onClick={() => handleDelete(t.id)} style={{ background: '#ef4444', padding: '6px 12px', borderRadius: 4, border: 'none', color: '#fff', cursor: 'pointer' }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTestimonials;
