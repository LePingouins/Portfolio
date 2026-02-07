import React from 'react';
import type { Project } from '../models/Project';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className="projects-list">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          {project.techStack && (
            <div className="tech-stack">
              <strong>Tech Stack:</strong> {project.techStack.join(', ')}
            </div>
          )}
          {project.date && <div><strong>Date:</strong> {project.date}</div>}
          {project.imageUrl && <img src={project.imageUrl} alt={project.name} className="project-image" />}
          <div className="project-links">
            <a href={project.projectLink} target="_blank" rel="noopener noreferrer">Project Link</a>
            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">Website Link</a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
