import React, { useState, useEffect } from 'react';
import { fetchAboutMe, saveAboutMe, type AboutMe } from '../services/api';

const AdminAboutMe: React.FC = () => {
    
    const [enData, setEnData] = useState<AboutMe>({ language: 'en', text: '', stack: [], hobbies: [], goals: [] });
    const [frData, setFrData] = useState<AboutMe>({ language: 'fr', text: '', stack: [], hobbies: [], goals: [] });

    const [enStackInput, setEnStackInput] = useState('');
    const [enHobbyInput, setEnHobbyInput] = useState('');
    const [enGoalInput, setEnGoalInput] = useState('');

    const [frStackInput, setFrStackInput] = useState('');
    const [frHobbyInput, setFrHobbyInput] = useState('');
    const [frGoalInput, setFrGoalInput] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const en = await fetchAboutMe('en');
                if (en) setEnData(en);
                const fr = await fetchAboutMe('fr');
                if (fr) setFrData(fr);
            } catch (error) {
                console.error('Failed to load about me data', error);
            }
        };
        loadData();
    }, []);

    const handleSave = async (language: 'en' | 'fr') => {
        try {
            if (language === 'en') {
                await saveAboutMe(enData);
                alert('English About Me saved successfully!');
            } else {
                await saveAboutMe(frData);
                alert('French About Me saved successfully!');
            }
        } catch (error) {
            console.error('Failed to save about me', error);
            alert('Failed to save.');
        }
    };

    const renderSection = (
        lang: 'en' | 'fr',
        data: AboutMe,
        setData: React.Dispatch<React.SetStateAction<AboutMe>>,
        stackInput: string, setStackInput: React.Dispatch<React.SetStateAction<string>>,
        hobbyInput: string, setHobbyInput: React.Dispatch<React.SetStateAction<string>>,
        goalInput: string, setGoalInput: React.Dispatch<React.SetStateAction<string>>
    ) => (
        <div style={{ flex: 1, background: '#333', padding: '1.5rem', borderRadius: '8px', color: '#fff' }}>
            <h3>{lang === 'en' ? 'English' : 'Français'}</h3>
            
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Text</label>
                <textarea
                    value={data.text}
                    onChange={e => setData({ ...data, text: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff', minHeight: '100px' }}
                />
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Stack</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        value={stackInput}
                        onChange={e => setStackInput(e.target.value)}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                    <button type="button" onClick={() => {
                        if (stackInput.trim()) {
                            setData({ ...data, stack: [...data.stack, stackInput.trim()] });
                            setStackInput('');
                        }
                    }} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {data.stack.map((item, i) => (
                        <span key={i} style={{ background: '#555', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {item}
                            <button type="button" onClick={() => setData({ ...data, stack: data.stack.filter((_, index) => index !== i) })} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Hobbies</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        value={hobbyInput}
                        onChange={e => setHobbyInput(e.target.value)}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                    <button type="button" onClick={() => {
                        if (hobbyInput.trim()) {
                            setData({ ...data, hobbies: [...data.hobbies, hobbyInput.trim()] });
                            setHobbyInput('');
                        }
                    }} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {data.hobbies.map((item, i) => (
                        <span key={i} style={{ background: '#555', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {item}
                            <button type="button" onClick={() => setData({ ...data, hobbies: data.hobbies.filter((_, index) => index !== i) })} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Goals</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="text"
                        value={goalInput}
                        onChange={e => setGoalInput(e.target.value)}
                        style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', background: '#222', color: '#fff' }}
                    />
                    <button type="button" onClick={() => {
                        if (goalInput.trim()) {
                            setData({ ...data, goals: [...data.goals, goalInput.trim()] });
                            setGoalInput('');
                        }
                    }} style={{ padding: '0.5rem 1rem', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {data.goals.map((item, i) => (
                        <span key={i} style={{ background: '#555', padding: '0.25rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {item}
                            <button type="button" onClick={() => setData({ ...data, goals: data.goals.filter((_, index) => index !== i) })} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer' }}>×</button>
                        </span>
                    ))}
                </div>
            </div>

            <button onClick={() => handleSave(lang)} style={{ width: '100%', padding: '0.75rem', background: '#2196F3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Save {lang === 'en' ? 'English' : 'French'}
            </button>
        </div>
    );

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}>About Me</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {renderSection('en', enData, setEnData, enStackInput, setEnStackInput, enHobbyInput, setEnHobbyInput, enGoalInput, setEnGoalInput)}
                {renderSection('fr', frData, setFrData, frStackInput, setFrStackInput, frHobbyInput, setFrHobbyInput, frGoalInput, setFrGoalInput)}
            </div>
        </div>
    );
};

export default AdminAboutMe;
