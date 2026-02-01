

import React, { useEffect, useState } from 'react';
import './Projects.css';
import { fetchProjects } from '../services/api';

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}


const Projects: React.FC = () => {
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
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, projects]);

  return (
    <div className="projects-page-bg">
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
        <div className="projects-list">
          {loading ? <div>Loading...</div> : filtered.length === 0 ? (
            <div>{language === 'fr' ? 'Aucun projet trouvé.' : 'No projects found.'}</div>
          ) : (
            filtered.map((project, idx) => (
              <div className="project-card" key={idx}>
                <img src={project.image} alt={project.title} className="project-image" />
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">{language === 'fr' ? 'Voir le projet' : 'View Project'}</a>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
