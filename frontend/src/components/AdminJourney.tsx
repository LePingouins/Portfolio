import React, { useState, useEffect } from 'react';
import { fetchJourney, addJourney, updateJourney, deleteJourney, type Journey } from '../services/api';

const AdminJourney: React.FC = () => {
    const [enItems, setEnItems] = useState<Journey[]>([]);
    const [frItems, setFrItems] = useState<Journey[]>([]);

    const [form, setForm] = useState<Journey>({ language: 'en', title: '', date: '', description: '', displayOrder: 0 });
    const [editId, setEditId] = useState<number | null>(null);

    const loadData = async () => {
        try {
            const en = await fetchJourney('en');
            setEnItems(en);
            const fr = await fetchJourney('fr');
            setFrItems(fr);
        } catch (error) {
            console.error('Failed to load journey data', error);
        }
    };

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const en = await fetchJourney('en');
                if (mounted) setEnItems(en);
                const fr = await fetchJourney('fr');
                if (mounted) setFrItems(fr);
            } catch (error) {
                console.error('Failed to load journey data', error);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateJourney(editId, form);
            } else {
                await addJourney(form);
            }
            setForm({ language: 'en', title: '', date: '', description: '', displayOrder: 0 });
            setEditId(null);
            loadData();
        } catch (error) {
            console.error('Failed to save journey', error);
            alert('Failed to save.');
        }
    };

    const handleEdit = (item: Journey) => {
        setForm(item);
        setEditId(item.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteJourney(id);
                loadData();
            } catch (error) {
                console.error('Failed to delete journey', error);
                alert('Failed to delete.');
            }
        }
    };

    const renderList = (items: Journey[], title: string) => (
        <div style={{ flex: 1, background: '#333', padding: '1.5rem', borderRadius: '8px', color: '#fff' }}>
            <h3>{title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map(item => (
                    <div key={item.id} style={{ background: '#444', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleEdit(item)} style={{ background: '#2196F3', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Edit</button>
                            <button onClick={() => item.id && handleDelete(item.id)} style={{ background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                        </div>
                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title} ({item.date})</h4>
                        <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#ccc' }}>{item.description}</p>
                        <small style={{ color: '#888' }}>Order: {item.displayOrder}</small>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>My Journey</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#333', padding: '1.5rem', borderRadius: '8px', color: '#fff' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Language</label>
                        <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}>
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Order</label>
                        <input type="number" value={form.displayOrder} onChange={e => setForm({ ...form, displayOrder: parseInt(e.target.value) })} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                        <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Date</label>
                        <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }} />
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                    <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', minHeight: '80px' }} />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" style={{ flex: 1, padding: '0.75rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        {editId ? 'Update Journey' : 'Add Journey'}
                    </button>
                    {editId && (
                        <button type="button" onClick={() => { setEditId(null); setForm({ language: 'en', title: '', date: '', description: '', displayOrder: 0 }); }} style={{ padding: '0.75rem', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {renderList(enItems, 'English')}
                {renderList(frItems, 'Français')}
            </div>
        </div>
    );
};

export default AdminJourney;
