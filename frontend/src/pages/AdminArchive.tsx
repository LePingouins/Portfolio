import React, { useEffect, useState, useContext } from 'react';
import { LanguageContext } from '../components/LanguageContext';
// import { useNavigate } from 'react-router-dom';
import { fetchArchivedProjects, unarchiveProject } from '../services/api';
import ArchiveIcon from '../components/ArchiveIcon';
import './AdminArchive.css';

interface Project {
  id?: number;
  name: string;
  description: string;
  projectLink: string;
  websiteLink: string;
  imageUrl: string;
  techStack: string[];
  archived?: boolean;
}

const AdminArchive: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchArchivedProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const handleUnarchive = async (project: Project) => {
    if (!project.id) return;
    await unarchiveProject(project.id);
    setProjects(projects.filter(p => p.id !== project.id));
  };

  const { t } = useContext(LanguageContext);

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', color: '#fff' }}>
      <h2 style={{ marginBottom: 16 }}>{t.archive.projectsTitle}</h2>
      {loading ? <div>{t.archive.loading}</div> : projects.length === 0 ? (
        <div>{t.archive.noProjects}</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
          {projects.map((project) => (
            <div key={project.id} className="admin-archive-card">
              <div>
                <div style={{ fontWeight: 600, fontSize: 18 }}>{project.name}</div>
                <div style={{ fontSize: 14, color: '#aaa', marginBottom: 4 }}>{project.description}</div>
                <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>
                  {project.techStack && project.techStack.length > 0 && project.techStack.join(', ')}
                </div>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>{t.archive.link.project}</a>
                {project.websiteLink && <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>{t.archive.link.website}</a>}
                <img
                  src={project.imageUrl && project.imageUrl.trim() !== '' ? project.imageUrl : 'https://image2url.com/r2/default/images/1770457767250-ad3cf476-7cec-4c3d-982e-ae8844e0bdd1.png'}
                  alt={project.name}
                  style={{ maxHeight: 40, marginLeft: 12, verticalAlign: 'middle', background: '#333', borderRadius: 6 }}
                />
              </div>
              <button onClick={() => handleUnarchive(project)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }} title={t.admin.projects.actions.unarchive}>
                <ArchiveIcon style={{ width: 24, height: 24, filter: 'grayscale(0.7)' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArchive;
