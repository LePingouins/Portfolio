import React, { useState, useEffect } from 'react';
import type { WorkExperience } from '../models/WorkExperience';
import { addWorkExperience, deleteWorkExperience, fetchWorkExperiences, type WorkExperienceForm } from '../services/api';

const AdminWork: React.FC = () => {
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [form, setForm] = useState<WorkExperienceForm>({
        title: '',
        company: '',
        period: '',
        location: '',
        responsibilities: []
    });
    const [responsibilityInput, setResponsibilityInput] = useState('');

    useEffect(() => {
        let isMounted = true;
        const loadInitialData = async () => {
            try {
                const data = await fetchWorkExperiences();
                if (isMounted) {
                    setExperiences(data);
                }
            } catch (error) {
                console.error('Failed to load work experiences', error);
            }
        };
        void loadInitialData();
        return () => { isMounted = false; };
    }, []);

    const handleAddResponsibility = () => {
        if (responsibilityInput.trim()) {
            setForm(prev => ({
                ...prev,
                responsibilities: [...prev.responsibilities, responsibilityInput.trim()]
            }));
            setResponsibilityInput('');
        }
    };

    const handleRemoveResponsibility = (index: number) => {
        setForm(prev => ({
            ...prev,
            responsibilities: prev.responsibilities.filter((_, i) => i !== index)
        }));
    };

    const fetchAndSetExperiences = async () => {
        try {
            const data = await fetchWorkExperiences();
            setExperiences(data);
        } catch (error) {
            console.error('Failed to load work experiences', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addWorkExperience(form);
            await fetchAndSetExperiences();
            setForm({
                title: '',
                company: '',
                period: '',
                location: '',
                responsibilities: []
            });
        } catch (error) {
            console.error('Failed to add work experience', error);
            alert('Failed to add work experience');
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            try {
                await deleteWorkExperience(id);
                setExperiences(prev => prev.filter(exp => exp.id !== id));
            } catch (error) {
                console.error('Failed to delete work experience', error);
                alert('Failed to delete work experience');
            }
        }
    };

    return (
        <div className="admin-work-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <h2 style={{ textAlign: 'center' }}>Manage Work Experience</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#333', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Company</label>
                    <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Period</label>
                    <input
                        type="text"
                        value={form.period}
                        onChange={e => setForm({ ...form, period: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location</label>
                    <input
                        type="text"
                        value={form.location}
                        onChange={e => setForm({ ...form, location: e.target.value })}
                        required
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Responsibilities</label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            value={responsibilityInput}
                            onChange={e => setResponsibilityInput(e.target.value)}
                            placeholder="Add a responsibility"
                            style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                        />
                        <button type="button" onClick={handleAddResponsibility} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                    </div>
                    <ul style={{ paddingLeft: '1.5rem', color: '#ddd' }}>
                        {form.responsibilities.map((resp, index) => (
                            <li key={index} style={{ marginBottom: '0.25rem' }}>
                                {resp} <button type="button" onClick={() => handleRemoveResponsibility(index)} style={{ marginLeft: '0.5rem', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Experience</button>
            </form>

            <div className="experiences-list">
                {experiences.map(exp => (
                    <div key={exp.id} style={{ background: '#333', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', position: 'relative' }}>
                        <button onClick={() => handleDelete(exp.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#ff4444', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Delete</button>
                        <h3 style={{ margin: '0 0 0.5rem 0', color: '#fff' }}>{exp.title}</h3>
                        <div style={{ color: '#aaa', marginBottom: '0.5rem' }}>
                            {exp.company} | {exp.location} | {exp.period}
                        </div>
                        <ul style={{ paddingLeft: '1.5rem', color: '#ddd', margin: 0 }}>
                            {exp.responsibilities.map((resp, idx) => (
                                <li key={idx} style={{ marginBottom: '0.25rem' }}>{resp}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminWork;
