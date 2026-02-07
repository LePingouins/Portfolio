

import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';
import './Projects.css';
import { fetchProjects } from '../services/api';

interface Project {
  id?: number;
  name: string;
  description: string;
  projectLink: string;
  websiteLink: string;
  imageUrl: string;
  techStack: string[];
}


const Projects: React.FC = () => {
    const { language } = useContext(LanguageContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      projects.filter(
        (p) =>
          (p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, projects]);

  return (
    <div className="projects-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      <div className="projects-container">
        <h1>{language === 'fr' ? 'Projets' : 'Projects'}</h1>
        <input
          type="text"
          className="project-search"
          placeholder={language === 'fr' ? 'Rechercher des projets...' : 'Search projects...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label={language === 'fr' ? 'Rechercher des projets' : 'Search projects'}
        />
        <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
          {loading ? <div>Loading...</div> : filtered.length === 0 ? (
            <div className="no-projects-message">{language === 'fr' ? 'Aucun projet trouvé.' : 'No projects found.'}</div>
          ) : (
            filtered.map((project, idx) => (
              <div
                className="project-card"
                key={idx}
                style={{
                  animationDelay: `${0.15 * idx}s`,
                  opacity: 0,
                  animation: 'fadeIn 0.7s ease forwards',
                  background: '#181818',
                  borderRadius: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                  padding: 24,
                  margin: '0 auto',
                  maxWidth: 700,
                  border: '1px solid #333',
                  position: 'relative',
                }}
              >
                <div className="project-content">
                  <img
                    src={project.imageUrl && project.imageUrl.trim() !== '' ? project.imageUrl : 'https://image2url.com/r2/default/images/1770457767250-ad3cf476-7cec-4c3d-982e-ae8844e0bdd1.png'}
                    alt={project.name}
                    className="project-image"
                    style={{ maxHeight: 120, borderRadius: 8, marginBottom: 12, background: '#222' }}
                  />
                  <h2 style={{ margin: '8px 0 4px 0', fontSize: 24 }}>{project.name}</h2>
                  <p style={{ margin: '0 0 8px 0', color: '#ccc' }}>{project.description}</p>
                  <div style={{ marginBottom: 8 }}>
                    {project.techStack && project.techStack.length > 0 && (
                      <span style={{ fontSize: 13, color: '#aaa' }}>
                        {project.techStack.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="project-actions">
                  <a href={project.projectLink} className="project-link" target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', fontWeight: 600, marginRight: 16 }}>{language === 'fr' ? 'Voir le projet' : 'View Project'}</a>
                  {project.websiteLink && (
                    <a href={project.websiteLink} className="project-link" target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', fontWeight: 600 }}>{language === 'fr' ? 'Site Web' : 'Website'}</a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
