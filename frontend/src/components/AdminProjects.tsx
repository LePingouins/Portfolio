import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { fetchProjects, deleteProject, updateProject, archiveProject, unarchiveProject } from '../services/api';
import ArchiveIcon from './ArchiveIcon';
import './AdminProjects.css';
import type { Project } from '../services/api';
// Use a local Project type matching the desired fields
export type ProjectForm = {
  name: string;
  description: string;
  projectLink: string;
  websiteLink: string;
  imageUrl: string;
  techStack: string[];
}

interface AdminProjectsProps {
  onAddProject: (project: ProjectForm) => void;
}

const initialState: ProjectForm = {
  name: '',
  description: '',
  projectLink: '',
  websiteLink: '',
  imageUrl: '',
  techStack: [],
};

const AdminProjects: React.FC<AdminProjectsProps> = ({ onAddProject }) => {
  const [form, setForm] = useState(initialState);
  const [techInput, setTechInput] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch projects on mount and after add/delete/archive
  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data.filter((p: Project) => !p.archived));
    } catch {
      setProjects([]);
    }
    setLoading(false);
  };
  const handleArchive = async (project: Project) => {
    if (!project.id) return;
    if (!project.archived) {
      await archiveProject(project.id);
    } else {
      await unarchiveProject(project.id);
    }
    loadProjects();
  };

  useEffect(() => {
    (async () => {
      await loadProjects();
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTechAdd = () => {
    if (techInput.trim()) {
      setForm({ ...form, techStack: [...form.techStack, techInput.trim()] });
      setTechInput('');
    }
  };

  // Remove tech stack handler

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await updateProject(editId, { ...form });
    } else {
      await onAddProject({ ...form });
    }
    setForm(initialState);
    setEditId(null);
    loadProjects();
  };

  const handleEdit = (project: Project) => {
    setForm({
      name: project.name,
      description: project.description,
      projectLink: project.projectLink,
      websiteLink: project.websiteLink,
      imageUrl: project.imageUrl,
      techStack: project.techStack || [],
    });
    setEditId(project.id ?? null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number | undefined) => {
    if (typeof id !== 'number') return;
    if (!window.confirm(t.adminConfirm.deleteProject)) return;
    await deleteProject(id);
    loadProjects();
  };

  const { t } = useContext(LanguageContext);

  return (
    <>
      <form className="admin-project-form" onSubmit={handleSubmit} style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: '2rem',
        background: '#222',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
      }}>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.projectName}
          <input name="name" value={form.name} onChange={handleChange} placeholder={t.admin.projects.form.projectName} required style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #444', marginTop: 4, background: '#181818', color: '#fff' }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.description}
          <textarea name="description" value={form.description} onChange={handleChange} placeholder={t.admin.projects.form.description} required style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #444', marginTop: 4, background: '#181818', color: '#fff', minHeight: 80 }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.projectLink}
          <input name="projectLink" value={form.projectLink} onChange={handleChange} placeholder={t.admin.projects.form.projectLink} required style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #444', marginTop: 4, background: '#181818', color: '#fff' }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.websiteLink} <span style={{ color: '#aaa', fontWeight: 400 }}></span>
          <input name="websiteLink" value={form.websiteLink} onChange={handleChange} placeholder={t.admin.projects.form.websiteLink} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #444', marginTop: 4, background: '#181818', color: '#fff' }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.imageLink} <span style={{ color: '#aaa', fontWeight: 400 }}></span>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder={t.admin.projects.form.imageLink} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #444', marginTop: 4, background: '#181818', color: '#fff' }} />
        </label>
        <label style={{ color: '#fff', fontWeight: 500 }}>{t.admin.projects.form.techStack} <span style={{ color: '#aaa', fontWeight: 400 }}></span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 4 }}>
            <input value={techInput} onChange={e => setTechInput(e.target.value)} placeholder={t.admin.projects.form.addTech} style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #444', background: '#181818', color: '#fff' }} />
            <button type="button" onClick={handleTechAdd} style={{ padding: '0.5rem 1rem', borderRadius: 6, background: '#e74c3c', color: '#fff', border: 'none', fontWeight: 600 }}>{t.admin.projects.form.addTech}</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {form.techStack.map((tech, idx) => (
              <span key={idx} style={{ background: '#444', color: '#fff', borderRadius: 6, padding: '0.3rem 0.7rem', fontSize: 14, display: 'flex', alignItems: 'center' }}>
                {tech}
                <button type="button" onClick={() => setForm({ ...form, techStack: form.techStack.filter((_, tIdx) => tIdx !== idx) })} style={{ marginLeft: 6, background: 'none', border: 'none', color: '#e74c3c', fontWeight: 700, cursor: 'pointer' }}>×</button>
              </span>
            ))}
          </div>
        </label>
        <button type="submit" style={{ padding: '0.7rem 1.5rem', borderRadius: 6, background: editId ? '#4faaff' : '#e74c3c', color: '#fff', border: 'none', fontWeight: 700, fontSize: 18, marginTop: 12 }}>{editId ? t.admin.projects.actions.save : t.admin.projects.actions.add}</button>
      </form>

      <div style={{ maxWidth: 700, margin: '2rem auto', color: '#fff', minHeight: 200, paddingBottom: 64 }}>
        <h2 style={{ marginBottom: 16 }}>{t.admin.projects.title}</h2>
        {loading ? <div>{t.projects.loading}</div> : projects.length === 0 ? (
          <div style={{ minHeight: 80, display: 'flex', alignItems: 'center' }}>{t.projects.noProjects}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginBottom: 64 }}>
            {projects.map((project) => (
              <div key={project.id} className="admin-project-card">
                <div className="admin-project-content">
                  <div style={{ fontWeight: 600, fontSize: 18 }}>{project.name}</div>
                  <div style={{ fontSize: 14, color: '#aaa', marginBottom: 4, maxWidth: 420, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', height: 22 }}>{project.description}</div>
                  <div style={{ fontSize: 13, color: '#aaa', marginBottom: 4 }}>
                    {project.techStack && project.techStack.length > 0 && project.techStack.join(', ')}
                  </div>
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>Project Link</a>
                  {project.websiteLink && <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" style={{ color: '#4faaff', marginRight: 12 }}>Website</a>}
                  <img
                    src={project.imageUrl && project.imageUrl.trim() !== '' ? project.imageUrl : '/project-placeholder.png'}
                    alt={project.name}
                    className="admin-project-img"
                    style={{ maxHeight: 40, marginLeft: 12, verticalAlign: 'middle', background: '#333', borderRadius: 6 }}
                  />
                </div>
                <div className="admin-project-actions">
                  <button onClick={() => handleEdit(project)} style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }}>{t.admin.projects.actions.edit}</button>
                  <button onClick={() => handleDelete(project.id)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }}>{t.admin.projects.actions.delete}</button>
                  <button onClick={() => handleArchive(project)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }} title={project.archived ? t.admin.projects.actions.unarchive : t.admin.projects.actions.archive}>
                    <ArchiveIcon style={{ width: 24, height: 24, filter: project.archived ? 'grayscale(0.7)' : 'none' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminProjects;
