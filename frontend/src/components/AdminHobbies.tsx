import React, { useState, useEffect } from 'react';
import { fetchHobbies, addHobby, deleteHobby, type Hobby } from '../services/api';

const AdminHobbies: React.FC = () => {
    const [hobbies, setHobbies] = useState<Hobby[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            try {
                const data = await fetchHobbies();
                if (isMounted) {
                    setHobbies(data);
                }
            } catch (error) {
                console.error('Failed to load hobbies', error);
            }
        };
        void loadInitialData();
        return () => { isMounted = false; };
    }, []);

    const loadHobbies = async () => {
        try {
            const data = await fetchHobbies();
            setHobbies(data);
        } catch (error) {
            console.error('Failed to load hobbies', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await addHobby({ name, description });
            setName('');
            setDescription('');
            loadHobbies();
        } catch (error) {
            console.error('Failed to add hobby', error);
            alert('Failed to add hobby');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this hobby?')) {
            try {
                await deleteHobby(id);
                setHobbies(prev => prev.filter(h => h.id !== id));
            } catch (error) {
                console.error('Failed to delete hobby', error);
                alert('Failed to delete hobby');
            }
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Manage Hobbies</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#333', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Hobby Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        placeholder="Gaming, Photography, etc."
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="A brief description..."
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', minHeight: '80px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Hobby</button>
            </form>

            <div className="hobbies-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {hobbies.map(hobby => (
                    <div key={hobby.id} style={{ background: '#333', padding: '1.5rem', borderRadius: '8px', position: 'relative' }}>
                        <button 
                            onClick={() => hobby.id && handleDelete(hobby.id)}
                            style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >×</button>
                        <h3 style={{ marginTop: 0, color: '#fff' }}>{hobby.name}</h3>
                        {hobby.description && <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{hobby.description}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminHobbies;
