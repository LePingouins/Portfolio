

import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageContextValue';
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
    const { language, t } = useContext(LanguageContext);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filtered, setFiltered] = useState<Project[]>([]);

  useEffect(() => {
    // Artificial delay to show off the cool animation
    const loadData = async () => {
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));
      const fetchData = fetchProjects();
      
      try {
        const [_, data] = await Promise.all([minLoadTime, fetchData]);
        setProjects(data);
        setFiltered(data);
      } catch (error) {
        console.error("Failed to load projects", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    setFiltered(
      projects.filter((p) => {
          const matchesSearch = (p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()));
          const matchesTag = selectedTag ? p.techStack?.includes(selectedTag) : true;
          return matchesSearch && matchesTag;
      })
    );
  }, [search, projects, selectedTag]);

  // Extract unique tags
  const allTags = Array.from(new Set(projects.flatMap(p => p.techStack || []))).sort();

  return (
    <div className="projects-page-bg">
      <div className="bg-anim-circle bg-anim-circle1" />
      <div className="bg-anim-circle bg-anim-circle2" />
      <div className="bg-anim-circle bg-anim-circle3" />
      
      <div className="projects-container">
        <h1 className="page-title">{t.projects.title}</h1>
        
        <div className="controls-section">
            <input
            type="text"
            className="project-search"
            placeholder={t.projects.searchPlaceholder}
            value={search}
            onChange={e => setSearch(e.target.value)}
            />
            
            <div className="tags-carousel">
                <button 
                    className={`tag-chip ${selectedTag === null ? 'active' : ''}`}
                    onClick={() => setSelectedTag(null)}
                >
                    {t.projects.allTags}
                </button>
                {allTags.map(tag => (
                    <button 
                        key={tag} 
                        className={`tag-chip ${selectedTag === tag ? 'active' : ''}`}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>

        <div className="projects-grid">
          {loading ? (
             <div className="loading-container">
               <div className="cool-loader"></div>
               <div className="loading-text">{t.projects.loading}</div>
             </div>
          ) : filtered.length === 0 ? (
            <div className="no-projects-message">{t.projects.noProjects}</div>
          ) : (
            filtered.map((project, idx) => (
              <div
                className="project-card"
                key={idx}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="project-image-wrapper">
                    <img
                        src={project.imageUrl && project.imageUrl.trim() !== '' ? project.imageUrl : 'https://placehold.co/600x400/222/999?text=Project'}
                        alt={project.name}
                        className="project-image"
                    />
                    <div className="project-overlay">
                        <div className="overlay-links">
                             <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="icon-link">
                                {language === 'fr' ? 'Projet' : 'Project'}
                             </a>
                             {project.websiteLink && (
                                <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="icon-link">
                                    {language === 'fr' ? 'Site Web' : 'Website'}
                                </a>
                             )}
                        </div>
                    </div>
                </div>

                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  
                  <div className="tech-stack">
                    {project.techStack?.map((tech, i) => (
                      <span key={i} className="tech-badge">{tech}</span>
                    ))}
                  </div>
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

