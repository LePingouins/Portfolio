import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { fetchEducation, addEducation, updateEducation, deleteEducation, type Education } from '../services/api';

const emptyForm: Education = { school: '', degree: '', field: '', startDate: '', endDate: '' };

const AdminEducation: React.FC = () => {
    const [entries, setEntries] = useState<Education[]>([]);
    const [form, setForm] = useState<Education>(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const { t } = useContext(LanguageContext);

    useEffect(() => {
        let isMounted = true;
        fetchEducation().then(data => { if (isMounted) setEntries(data); }).catch(console.error);
        return () => { isMounted = false; };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.school.trim() || !form.degree.trim()) return;
        setLoading(true);
        try {
            if (editingId !== null) {
                await updateEducation(editingId, form);
            } else {
                await addEducation(form);
            }
            const data = await fetchEducation();
            setEntries(data);
            setForm(emptyForm);
            setEditingId(null);
        } catch (err) {
            console.error(err);
            alert(t.adminPages.education.saveFail);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (edu: Education) => {
        setEditingId(edu.id ?? null);
        setForm({ school: edu.school, degree: edu.degree, field: edu.field ?? '', startDate: edu.startDate ?? '', endDate: edu.endDate ?? '' });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(t.adminPages.education.deleteConfirm)) return;
        try {
            await deleteEducation(id);
            setEntries(prev => prev.filter(e => e.id !== id));
        } catch (err) {
            console.error(err);
            alert(t.adminPages.education.deleteFail);
        }
    };

    const handleCancel = () => { setForm(emptyForm); setEditingId(null); };

    const fieldStyle: React.CSSProperties = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', marginBottom: '0.75rem' };
    const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#ccc' };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t.adminPages.education.title}</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#333', padding: '1.5rem', borderRadius: '8px' }}>
                <label style={labelStyle}>{t.adminPages.education.schoolLabel}</label>
                <input name="school" value={form.school} onChange={handleChange} required placeholder={t.adminPages.education.schoolPlaceholder} style={fieldStyle} />

                <label style={labelStyle}>{t.adminPages.education.degreeLabel}</label>
                <input name="degree" value={form.degree} onChange={handleChange} required placeholder={t.adminPages.education.degreePlaceholder} style={fieldStyle} />

                <label style={labelStyle}>{t.adminPages.education.fieldLabel}</label>
                <input name="field" value={form.field ?? ''} onChange={handleChange} placeholder={t.adminPages.education.fieldPlaceholder} style={fieldStyle} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>{t.adminPages.education.startDateLabel}</label>
                        <input name="startDate" type="text" value={form.startDate ?? ''} onChange={handleChange} placeholder="2022" style={fieldStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>{t.adminPages.education.endDateLabel}</label>
                        <input name="endDate" type="text" value={form.endDate ?? ''} onChange={handleChange} placeholder="2025" style={fieldStyle} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="submit" disabled={loading} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer', fontWeight: 600 }}>
                        {editingId !== null ? t.adminPages.education.saveButton : t.adminPages.education.addButton}
                    </button>
                    {editingId !== null && (
                        <button type="button" onClick={handleCancel} style={{ background: '#555', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                            {t.adminPages.education.cancelButton}
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {entries.length === 0 ? (
                    <p style={{ opacity: 0.6, textAlign: 'center' }}>{t.adminPages.education.noEntries}</p>
                ) : entries.map(edu => (
                    <div key={edu.id} style={{ background: '#2a2a2a', padding: '1.25rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{edu.school}</div>
                            <div style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '0.2rem' }}>{edu.degree}{edu.field ? ` — ${edu.field}` : ''}</div>
                            {(edu.startDate || edu.endDate) && (
                                <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.2rem' }}>{edu.startDate ?? '?'} – {edu.endDate ?? t.adminPages.education.present}</div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                            <button onClick={() => handleEdit(edu)} style={{ background: '#374151', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.35rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                {t.adminPages.education.editButton}
                            </button>
                            <button onClick={() => handleDelete(edu.id!)} style={{ background: '#7f1d1d', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.35rem 0.9rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                                {t.adminPages.education.deleteButton}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminEducation;
