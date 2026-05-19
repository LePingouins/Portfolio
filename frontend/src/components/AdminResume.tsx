import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { fetchResumes, addResume, updateResume, deleteResume, type Resume } from '../services/api';

const AdminResume: React.FC = () => {
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [url, setUrl] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const { t } = useContext(LanguageContext);

    const load = async () => {
        try {
            const data = await fetchResumes();
            setResumes(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { load(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) return;
        setLoading(true);
        try {
            if (editingId !== null) {
                await updateResume(editingId, { url });
            } else {
                await addResume({ url });
            }
            await load();
            setUrl('');
            setEditingId(null);
        } catch (err) {
            console.error(err);
            alert(t.adminPages.resume.saveFail);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (resume: Resume) => {
        setEditingId(resume.id ?? null);
        setUrl(resume.url);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(t.adminPages.resume.deleteConfirm)) return;
        try {
            await deleteResume(id);
            setResumes(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            console.error(err);
            alert(t.adminPages.resume.deleteFail);
        }
    };

    const handleCancel = () => { setUrl(''); setEditingId(null); };

    return (
        <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto', color: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.adminPages.resume.title}</h2>
            <p style={{ color: '#aaa', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {t.adminPages.resume.description}
            </p>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#333', padding: '1.5rem', borderRadius: '8px' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', color: '#ccc', fontSize: '0.9rem' }}>
                    {t.adminPages.resume.urlLabel}
                </label>
                <input
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    required
                    placeholder={t.adminPages.resume.urlPlaceholder}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', marginBottom: '1rem' }}
                />
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" disabled={loading} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer', fontWeight: 600 }}>
                        {editingId !== null ? t.adminPages.resume.saveButton : t.adminPages.resume.addButton}
                    </button>
                    {editingId !== null && (
                        <button type="button" onClick={handleCancel} style={{ background: '#555', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                            {t.adminPages.resume.cancelButton}
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {resumes.length === 0 ? (
                    <p style={{ opacity: 0.6, textAlign: 'center' }}>{t.adminPages.resume.noEntries}</p>
                ) : resumes.map(resume => (
                    <div key={resume.id} style={{ background: '#2a2a2a', padding: '1.25rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        <a href={resume.url} target="_blank" rel="noopener noreferrer" style={{ color: '#ef4444', wordBreak: 'break-all', flex: 1, fontSize: '0.9rem' }}>
                            {resume.url}
                        </a>
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                            <button onClick={() => handleEdit(resume)} style={{ background: '#374151', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.35rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                {t.adminPages.resume.editButton}
                            </button>
                            <button onClick={() => handleDelete(resume.id!)} style={{ background: '#7f1d1d', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.35rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                {t.adminPages.resume.deleteButton}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminResume;
