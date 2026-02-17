import React, { useContext } from 'react';
import './Work.css';
import { initialWorkExperiences } from '../data/workData';
import { LanguageContext } from '../components/LanguageContext';

const Work: React.FC = () => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="work-page-wrapper">
             <div className="work-bg-highlight highlight-1" />
             <div className="work-bg-highlight highlight-2" />
            
            <div className="work-container">
                <h1 className="work-title" style={{ textAlign: 'center', marginBottom: '40px', fontSize: '3rem', fontWeight: 700 }}>{t.navbar.work || "Work Experience"}</h1>
                
                <div className="work-list">
                    {initialWorkExperiences.map(exp => (
                        <div key={exp.id} className="work-card">
                            <div className="work-header">
                                <div>
                                    <h2 className="work-role">{exp.title}</h2>
                                    <div className="work-company">{exp.company}</div>
                                </div>
                                <div className="work-meta" style={{ textAlign: 'right' }}>
                                    <div className="work-period" style={{ fontWeight: 600, color: '#fff' }}>{exp.period}</div>
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
