import React, { useEffect, useState } from 'react';
import './Work.css';
import { initialWorkExperiences } from '../data/workData';
import { type WorkExperience, fetchWorkExperiences } from '../services/api';

const Work: React.FC = () => {
    // const { t } = useContext(LanguageContext);
    const [experiences, setExperiences] = useState<WorkExperience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                const data = await fetchWorkExperiences();
                setExperiences(data);
            } catch (error) {
                console.error('Failed to load work experiences', error);
                // Fallback to local data if API fails (optional, maybe better to show error or empty)
                setExperiences(initialWorkExperiences);
            } finally {
                setLoading(false);
            }
        };
        loadExperiences();
    }, []);

    if (loading) {
        return <div className="work-loading" style={{textAlign: 'center', padding: '50px', color: '#fff'}}>Loading...</div>;
    }

    return (
        <div className="work-page-wrapper">
             <div className="work-bg-highlight highlight-1" />
             <div className="work-bg-highlight highlight-2" />
            
            <div className="work-container">
                <h1 className="work-title">Work Experience</h1>
                
                <div className="work-list">
                    {experiences.map((exp, index) => (
                        <div key={exp.id || index} className="work-card">
                            <div className="work-header">
                                <div>
                                    <h2 className="work-role">{exp.title}</h2>
                                    <h3 className="work-company">{exp.company}</h3>
                                </div>
                                <div className="work-meta">
                                    <div className="work-period">{exp.period}</div>
                                    <div className="work-location">{exp.location}</div>
                                </div>
                            </div>
                            <ul className="work-responsibilities">
                                {exp.responsibilities.map((resp, idx) => (
                                    <li key={idx}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Work;
