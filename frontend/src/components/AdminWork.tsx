import React, { useState } from 'react';
import '../pages/AdminDashboard.css'; // Reuse existing styles if possible or create new one

export interface WorkExperience {
    id: number;
    title: string;
    company: string;
    period: string;
    location: string;
    responsibilities: string[];
}

const initialWorkExperiences: WorkExperience[] = [
    {
        id: 1,
        title: 'Data Entry Clerk / Office Assistant',
        company: 'Horizon Nature',
        period: '2021 - 2023',
        location: 'Saint-Léonard, Montréal, QC',
        responsibilities: [
            'Entered and verified high-volume data with precision and confidentiality.',
            'Supported daily operations and coordinated document management.'
        ]
    },
    {
        id: 2,
        title: 'Handler',
        company: 'Horizon Nature',
        period: '2019 - 2021',
        location: 'Saint-Léonard, Montréal, QC',
        responsibilities: [
            'Movement, organization, and preparation of materials in a dynamic environment',
            'Maintained accuracy and teamwork in daily tasks',
            'Developed reliability and time management skills'
        ]
    }
];

const AdminWork: React.FC = () => {
    const [experiences, setExperiences] = useState<WorkExperience[]>(initialWorkExperiences);
    const [form, setForm] = useState<Omit<WorkExperience, 'id'>>({
        title: '',
        company: '',
        period: '',
        location: '',
        responsibilities: []
    });
    const [responsibilityInput, setResponsibilityInput] = useState('');

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newExperience: WorkExperience = {
            id: Date.now(),
            ...form
        };
        setExperiences(prev => [...prev, newExperience]);
        setForm({
            title: '',
            company: '',
            period: '',
            location: '',
            responsibilities: []
        });
    };

    const handleDelete = (id: number) => {
        setExperiences(prev => prev.filter(exp => exp.id !== id));
    };

    return (
        <div className="admin-work-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', color: '#fff' }}>
            <h2>Manage Work Experience</h2>
            
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

                <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#2196F3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Experience</button>
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
