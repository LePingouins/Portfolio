import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchSkills, addSkill, deleteSkill, fetchProjects, addProject, updateProject, deleteProject, fetchWork, addWork, updateWork, deleteWork, fetchEducation, addEducation, updateEducation, deleteEducation, fetchResumes, deleteResume, fetchHobbies, addHobby, updateHobby, deleteHobby, fetchContactInfo, addContactInfo, updateContactInfo, deleteContactInfo, fetchTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial, fetchMessages, deleteMessage } from '../services/api';
interface Message {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}
interface Testimonial {
  id: number;
  name: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}
interface ContactInfo {
  id: number;
  type: string;
  value: string;
}
interface Hobby {
  id: number;
  name: string;
  description: string;
}


interface Feedback {
  id: number;
  name: string;
  comment: string;
  createdAt: string;
}
interface Skill {
  id: number;
  name: string;
}
interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
}
interface Work {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}
interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}


const AdminDashboard: React.FC = () => {
  // Forced style for guaranteed visibility
  const forcedStyle = {
    color: '#fff',
    background: '#18181b',
    minHeight: '100vh',
    fontSize: 18,
    fontFamily: 'Inter, Arial, sans-serif',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
  };
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', link: '', image: '' });
  const [workList, setWorkList] = useState<Work[]>([]);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workForm, setWorkForm] = useState({ company: '', position: '', description: '', startDate: '', endDate: '' });
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [educationForm, setEducationForm] = useState({ school: '', degree: '', field: '', startDate: '', endDate: '' });
  const [resume, setResume] = useState<{ id: number; fileName: string; url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hobbyList, setHobbyList] = useState<Hobby[]>([]);
  const [editingHobby, setEditingHobby] = useState<Hobby | null>(null);
  const [hobbyForm, setHobbyForm] = useState({ name: '', description: '' });
  const [contactList, setContactList] = useState<ContactInfo[]>([]);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [contactForm, setContactForm] = useState({ type: '', value: '' });
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>([]);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const navigate = useNavigate();
  // ...move all handler functions here, before return...


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin-login');
      return;
    }
    (async () => {
      try {
        const feedbackRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8085'}/api/feedback`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!feedbackRes.ok) throw new Error('Failed to fetch feedback');
        const feedbackData = await feedbackRes.json();
        setFeedbacks(feedbackData);
        await Promise.all([
          fetchSkills().then(setSkills),
          fetchProjects().then(setProjects),
          fetchWork().then(setWorkList),
          fetchEducation().then(setEducationList),
          fetchResumes().then(resumes => setResume(resumes[0] || null)),
          fetchHobbies().then(setHobbyList),
          fetchContactInfo().then(setContactList),
          fetchTestimonials().then(setTestimonialList),
          fetchMessages().then(setMessageList),
        ]);
        setLoading(false);
      } catch {
        setLoadError('Failed to load admin data. Please check your backend/API.');
        setLoading(false);
      }
    })();
  }, [navigate]);

  // Handler for education form input changes
  const handleEducationFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducationForm({ ...educationForm, [e.target.name]: e.target.value });
  };
  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!educationForm.school.trim() || !educationForm.degree.trim()) return;
    const edu = await addEducation(educationForm);
    setEducationList([...educationList, edu]);
    setEducationForm({ school: '', degree: '', field: '', startDate: '', endDate: '' });
  };
  const handleEditEducation = (edu: Education) => {
    setEditingEducation(edu);
    setEducationForm({
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
    });
  };
  const handleUpdateEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;
    const updated = await updateEducation(editingEducation.id, educationForm);
    setEducationList(educationList.map(ed => (ed.id === editingEducation.id ? updated : ed)));
    setEditingEducation(null);
    setEducationForm({ school: '', degree: '', field: '', startDate: '', endDate: '' });
  };
  const handleDeleteEducation = async (id: number) => {
    await deleteEducation(id);
    setEducationList(educationList.filter(ed => ed.id !== id));
  };

  // Handler functions for Work
  const handleWorkFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setWorkForm({ ...workForm, [e.target.name]: e.target.value });
  };
  const handleAddWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workForm.company.trim() || !workForm.position.trim()) return;
    const work = await addWork(workForm);
    setWorkList([...workList, work]);
    setWorkForm({ company: '', position: '', description: '', startDate: '', endDate: '' });
  };
  const handleEditWork = (work: Work) => {
    setEditingWork(work);
    setWorkForm({
      company: work.company,
      position: work.position,
      description: work.description,
      startDate: work.startDate,
      endDate: work.endDate,
    });
  };
  const handleUpdateWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWork) return;
    const updated = await updateWork(editingWork.id, workForm);
    setWorkList(workList.map(w => (w.id === editingWork.id ? updated : w)));
    setEditingWork(null);
    setWorkForm({ company: '', position: '', description: '', startDate: '', endDate: '' });
  };
  const handleDeleteWork = async (id: number) => {
    await deleteWork(id);
    setWorkList(workList.filter(w => w.id !== id));
  };

  // Handler functions for Projects
  const handleProjectFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;
    const project = await addProject(projectForm);
    setProjects([...projects, project]);
    setProjectForm({ title: '', description: '', link: '', image: '' });
  };
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      link: project.link,
      image: project.image,
    });
  };
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    const updated = await updateProject(editingProject.id, projectForm);
    setProjects(projects.map(p => (p.id === editingProject.id ? updated : p)));
    setEditingProject(null);
    setProjectForm({ title: '', description: '', link: '', image: '' });
  };
  const handleDeleteProject = async (id: number) => {
    await deleteProject(id);
    setProjects(projects.filter(p => p.id !== id));
  };

  // Handler functions for Resume
  const handleDeleteResume = async () => {
    if (!resume) return;
    await deleteResume(resume.id);
    setResume(null);
  };

  // Handler functions for Hobbies
  const handleHobbyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHobbyForm({ ...hobbyForm, [e.target.name]: e.target.value });
  };
  const handleAddHobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hobbyForm.name.trim()) return;
    const hobby = await addHobby(hobbyForm);
    setHobbyList([...hobbyList, hobby]);
    setHobbyForm({ name: '', description: '' });
  };
  const handleEditHobby = (hobby: Hobby) => {
    setEditingHobby(hobby);
    setHobbyForm({ name: hobby.name, description: hobby.description });
  };
  const handleUpdateHobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHobby) return;
    const updated = await updateHobby(editingHobby.id, hobbyForm);
    setHobbyList(hobbyList.map(h => (h.id === editingHobby.id ? updated : h)));
    setEditingHobby(null);
    setHobbyForm({ name: '', description: '' });
  };
  const handleDeleteHobby = async (id: number) => {
    await deleteHobby(id);
    setHobbyList(hobbyList.filter(h => h.id !== id));
  };

  // Handler functions for Contact Info
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.type.trim() || !contactForm.value.trim()) return;
    const contact = await addContactInfo(contactForm);
    setContactList([...contactList, contact]);
    setContactForm({ type: '', value: '' });
  };
  const handleEditContact = (contact: ContactInfo) => {
    setEditingContact(contact);
    setContactForm({ type: contact.type, value: contact.value });
  };
  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact) return;
    const updated = await updateContactInfo(editingContact.id, contactForm);
    setContactList(contactList.map(c => (c.id === editingContact.id ? updated : c)));
    setEditingContact(null);
    setContactForm({ type: '', value: '' });
  };
  const handleDeleteContact = async (id: number) => {
    await deleteContactInfo(id);
    setContactList(contactList.filter(c => c.id !== id));
  };

  // Handler functions for Testimonials
  const handleApproveTestimonial = async (id: number) => {
    const updated = await approveTestimonial(id);
    setTestimonialList(testimonialList.map(t => (t.id === id ? updated : t)));
  };
  const handleRejectTestimonial = async (id: number) => {
    const updated = await rejectTestimonial(id);
    setTestimonialList(testimonialList.map(t => (t.id === id ? updated : t)));
  };
  const handleDeleteTestimonial = async (id: number) => {
    await deleteTestimonial(id);
    setTestimonialList(testimonialList.filter(t => t.id !== id));
  };

  // Handler functions for Messages
  const handleDeleteMessage = async (id: number) => {
    await deleteMessage(id);
    setMessageList(messageList.filter(m => m.id !== id));
  };

  // Render
  if (loading) {
    return (
      <div style={{ ...forcedStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
        <style>{`
          body, html, #root {
            background: #18181b !important;
            color: #fff !important;
          }
          input, textarea, select, button {
            background: #23232b !important;
            color: #fff !important;
            border: 1px solid #fff !important;
          }
          th, td, label, h1, h2, h3, h4, h5, h6, p, span, a {
            color: #fff !important;
          }
          table {
            background: #23232b !important;
            color: #fff !important;
          }
        `}</style>
        Loading...
      </div>
    );
  }
  if (loadError) {
    return (
      <div style={{ ...forcedStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
        <style>{`
          body, html, #root {
            background: #18181b !important;
            color: #fff !important;
          }
          input, textarea, select, button {
            background: #23232b !important;
            color: #fff !important;
            border: 1px solid #fff !important;
          }
          th, td, label, h1, h2, h3, h4, h5, h6, p, span, a {
            color: #fff !important;
          }
          table {
            background: #23232b !important;
            color: #fff !important;
          }
        `}</style>
        {loadError}
      </div>
    );
  }
  return (
    <div style={forcedStyle}>
      <style>{`
        body, html, #root {
          background: #18181b !important;
          color: #fff !important;
        }
        input, textarea, select, button {
          background: #23232b !important;
          color: #fff !important;
          border: 1px solid #fff !important;
        }
        th, td, label, h1, h2, h3, h4, h5, h6, p, span, a {
          color: #fff !important;
        }
        table {
          background: #23232b !important;
          color: #fff !important;
        }
        .dashboard-content {
          background: #23232b;
          color: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.2);
          padding: 32px;
          margin: 32px 0;
          min-width: 320px;
          max-width: 900px;
          width: 100%;
          z-index: 1;
        }
      `}</style>
      <div className="dashboard-content">
        <h1 style={{ color: '#fff', marginBottom: 24 }}>Admin Dashboard</h1>
        {/* Education Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Education Management</h2>
          <form onSubmit={editingEducation ? handleUpdateEducation : handleAddEducation} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 600 }}>
            <input type="text" name="school" placeholder="School" value={educationForm.school} onChange={handleEducationFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <input type="text" name="degree" placeholder="Degree" value={educationForm.degree} onChange={handleEducationFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <input type="text" name="field" placeholder="Field of Study" value={educationForm.field} onChange={handleEducationFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="text" name="startDate" placeholder="Start Date (e.g. 2020-09)" value={educationForm.startDate} onChange={handleEducationFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="text" name="endDate" placeholder="End Date (e.g. 2024-06 or Present)" value={educationForm.endDate} onChange={handleEducationFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingEducation ? 'Update' : 'Add'} Education</button>
            {editingEducation && <button type="button" onClick={() => { setEditingEducation(null); setEducationForm({ school: '', degree: '', field: '', startDate: '', endDate: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>School</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Degree</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Field</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Start</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>End</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educationList.map(edu => (
                <tr key={edu.id}>
                  <td style={{ padding: 8 }}>{edu.school}</td>
                  <td style={{ padding: 8 }}>{edu.degree}</td>
                  <td style={{ padding: 8 }}>{edu.field}</td>
                  <td style={{ padding: 8 }}>{edu.startDate}</td>
                  <td style={{ padding: 8 }}>{edu.endDate}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEditEducation(edu)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteEducation(edu.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Skills Management */}
        {/* ...existing code for Skills, Work, Projects, Testimonials, Contact Info, Resume, Hobbies, Feedback, Messages... */}
        {/* Skills Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Skills Management</h2>
          <form onSubmit={async e => { e.preventDefault(); if (!newSkill.trim()) return; const skill = await addSkill({ name: newSkill }); setSkills([...skills, skill]); setNewSkill(''); }} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
            <input type="text" placeholder="Add new skill" value={newSkill} onChange={e => setNewSkill(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minWidth: 200 }} />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer' }}>Add</button>
          </form>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map(skill => (
              <li key={skill.id} style={{ background: '#232323', color: '#fff', borderRadius: 16, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
                {skill.name}
                <button onClick={async () => { await deleteSkill(skill.id); setSkills(skills.filter(s => s.id !== skill.id)); }} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: 18 }} title="Delete">&times;</button>
              </li>
            ))}
          </ul>
        </section>
        {/* Work Experience Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Work Experience Management</h2>
          <form onSubmit={editingWork ? handleUpdateWork : handleAddWork} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 600 }}>
            <input type="text" name="company" placeholder="Company" value={workForm.company} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <input type="text" name="position" placeholder="Position" value={workForm.position} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <textarea name="description" placeholder="Description" value={workForm.description} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 60 }} />
            <input type="text" name="startDate" placeholder="Start Date (e.g. 2022-01)" value={workForm.startDate} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="text" name="endDate" placeholder="End Date (e.g. 2023-06 or Present)" value={workForm.endDate} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingWork ? 'Update' : 'Add'} Work</button>
            {editingWork && <button type="button" onClick={() => { setEditingWork(null); setWorkForm({ company: '', position: '', description: '', startDate: '', endDate: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Company</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Position</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Start</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>End</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workList.map(work => (
                <tr key={work.id}>
                  <td style={{ padding: 8 }}>{work.company}</td>
                  <td style={{ padding: 8 }}>{work.position}</td>
                  <td style={{ padding: 8 }}>{work.description}</td>
                  <td style={{ padding: 8 }}>{work.startDate}</td>
                  <td style={{ padding: 8 }}>{work.endDate}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEditWork(work)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteWork(work.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Projects Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Projects Management</h2>
          <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 500 }}>
            <input type="text" name="title" placeholder="Project title" value={projectForm.title} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <textarea name="description" placeholder="Project description" value={projectForm.description} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 60 }} required />
            <input type="text" name="link" placeholder="Project link (URL)" value={projectForm.link} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <input type="text" name="image" placeholder="Image URL" value={projectForm.image} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingProject ? 'Update' : 'Add'} Project</button>
            {editingProject && <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', link: '', image: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Title</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Link</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Image</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td style={{ padding: 8 }}>{project.title}</td>
                  <td style={{ padding: 8 }}>{project.description}</td>
                  <td style={{ padding: 8 }}><a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4f8cff' }}>{project.link}</a></td>
                  <td style={{ padding: 8 }}>{project.image ? <img src={project.image} alt={project.title} style={{ width: 60, borderRadius: 6 }} /> : ''}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEditProject(project)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteProject(project.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Testimonial Moderation */}
        <section style={{ marginBottom: 40 }}>
          <h2>Testimonial Moderation</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Content</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Status</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonialList.map(testimonial => (
                <tr key={testimonial.id}>
                  <td style={{ padding: 8 }}>{testimonial.name}</td>
                  <td style={{ padding: 8 }}>{testimonial.content}</td>
                  <td style={{ padding: 8 }}>{testimonial.status}</td>
                  <td style={{ padding: 8 }}>
                    {testimonial.status === 'pending' && (
                      <>
                        <button onClick={() => handleApproveTestimonial(testimonial.id)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Approve</button>
                        <button onClick={() => handleRejectTestimonial(testimonial.id)} style={{ background: '#f59e42', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Reject</button>
                      </>
                    )}
                    <button onClick={() => handleDeleteTestimonial(testimonial.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Contact Info Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Contact Info Management</h2>
          <form onSubmit={editingContact ? handleUpdateContact : handleAddContact} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 600 }}>
            <input type="text" name="type" placeholder="Type (e.g. Email, Phone, LinkedIn)" value={contactForm.type} onChange={handleContactFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <input type="text" name="value" placeholder="Value (e.g. user@email.com, +123456789, linkedin.com/in/...)" value={contactForm.value} onChange={handleContactFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#6366f1', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingContact ? 'Update' : 'Add'} Contact</button>
            {editingContact && <button type="button" onClick={() => { setEditingContact(null); setContactForm({ type: '', value: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Type</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Value</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactList.map(contact => (
                <tr key={contact.id}>
                  <td style={{ padding: 8 }}>{contact.type}</td>
                  <td style={{ padding: 8 }}>{contact.value}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEditContact(contact)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteContact(contact.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Resume Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Resume Management</h2>
          {resume ? (
            <div style={{ marginBottom: 10 }}>
              <a href={resume?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontWeight: 600, marginRight: 16 }}>{resume?.fileName}</a>
              <button onClick={handleDeleteResume} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
            </div>
          ) : (
            <div style={{ color: '#aaa' }}>No resume uploaded.</div>
          )}
        </section>
        {/* Hobbies Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Hobbies Management</h2>
          <form onSubmit={editingHobby ? handleUpdateHobby : handleAddHobby} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 500 }}>
            <input type="text" name="name" placeholder="Hobby name" value={hobbyForm.name} onChange={handleHobbyFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
            <textarea name="description" placeholder="Description" value={hobbyForm.description} onChange={handleHobbyFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 40 }} required />
            <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingHobby ? 'Update' : 'Add'} Hobby</button>
            {editingHobby && <button type="button" onClick={() => { setEditingHobby(null); setHobbyForm({ name: '', description: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
          </form>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hobbyList.map(hobby => (
                <tr key={hobby.id}>
                  <td style={{ padding: 8 }}>{hobby.name}</td>
                  <td style={{ padding: 8 }}>{hobby.description}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleEditHobby(hobby)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteHobby(hobby.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Feedback Submissions */}
        <section style={{ marginBottom: 40 }}>
          <h2>Feedback Submissions</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Comment</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(f => (
                <tr key={f.id}>
                  <td style={{ padding: 8 }}>{f.name}</td>
                  <td style={{ padding: 8 }}>{f.comment}</td>
                  <td style={{ padding: 8 }}>{new Date(f.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {/* Messages Management */}
        <section style={{ marginBottom: 40 }}>
          <h2>Contact Messages</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Email</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Message</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Date</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messageList.map(msg => (
                <tr key={msg.id}>
                  <td style={{ padding: 8 }}>{msg.name}</td>
                  <td style={{ padding: 8 }}>{msg.email}</td>
                  <td style={{ padding: 8 }}>{msg.content}</td>
                  <td style={{ padding: 8 }}>{new Date(msg.createdAt).toLocaleString()}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => handleDeleteMessage(msg.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
      {/* ...existing dashboard content continues here, inside the returned divs above... */}
      {/* Skills Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Skills Management</h2>
        <form onSubmit={async e => { e.preventDefault(); if (!newSkill.trim()) return; const skill = await addSkill({ name: newSkill }); setSkills([...skills, skill]); setNewSkill(''); }} style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <input type="text" placeholder="Add new skill" value={newSkill} onChange={e => setNewSkill(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minWidth: 200 }} />
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer' }}>Add</button>
        </form>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {skills.map(skill => (
            <li key={skill.id} style={{ background: '#232323', color: '#fff', borderRadius: 16, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
              {skill.name}
              <button onClick={async () => { await deleteSkill(skill.id); setSkills(skills.filter(s => s.id !== skill.id)); }} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: 18 }} title="Delete">&times;</button>
            </li>
          ))}
        </ul>
      </section>
      {/* Work Experience Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Work Experience Management</h2>
        <form onSubmit={editingWork ? handleUpdateWork : handleAddWork} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 600 }}>
          <input type="text" name="company" placeholder="Company" value={workForm.company} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <input type="text" name="position" placeholder="Position" value={workForm.position} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <textarea name="description" placeholder="Description" value={workForm.description} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 60 }} />
          <input type="text" name="startDate" placeholder="Start Date (e.g. 2022-01)" value={workForm.startDate} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
          <input type="text" name="endDate" placeholder="End Date (e.g. 2023-06 or Present)" value={workForm.endDate} onChange={handleWorkFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingWork ? 'Update' : 'Add'} Work</button>
          {editingWork && <button type="button" onClick={() => { setEditingWork(null); setWorkForm({ company: '', position: '', description: '', startDate: '', endDate: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
        </form>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Company</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Position</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Start</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>End</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workList.map(work => (
              <tr key={work.id}>
                <td style={{ padding: 8 }}>{work.company}</td>
                <td style={{ padding: 8 }}>{work.position}</td>
                <td style={{ padding: 8 }}>{work.description}</td>
                <td style={{ padding: 8 }}>{work.startDate}</td>
                <td style={{ padding: 8 }}>{work.endDate}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEditWork(work)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteWork(work.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Projects Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Projects Management</h2>
        <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 500 }}>
          <input type="text" name="title" placeholder="Project title" value={projectForm.title} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <textarea name="description" placeholder="Project description" value={projectForm.description} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 60 }} required />
          <input type="text" name="link" placeholder="Project link (URL)" value={projectForm.link} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
          <input type="text" name="image" placeholder="Image URL" value={projectForm.image} onChange={handleProjectFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} />
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingProject ? 'Update' : 'Add'} Project</button>
          {editingProject && <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', link: '', image: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
        </form>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Title</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Link</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Image</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td style={{ padding: 8 }}>{project.title}</td>
                <td style={{ padding: 8 }}>{project.description}</td>
                <td style={{ padding: 8 }}><a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4f8cff' }}>{project.link}</a></td>
                <td style={{ padding: 8 }}>{project.image ? <img src={project.image} alt={project.title} style={{ width: 60, borderRadius: 6 }} /> : ''}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEditProject(project)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteProject(project.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Testimonial Moderation */}
      <section style={{ marginBottom: 40 }}>
        <h2>Testimonial Moderation</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Content</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Status</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonialList.map(testimonial => (
              <tr key={testimonial.id}>
                <td style={{ padding: 8 }}>{testimonial.name}</td>
                <td style={{ padding: 8 }}>{testimonial.content}</td>
                <td style={{ padding: 8 }}>{testimonial.status}</td>
                <td style={{ padding: 8 }}>
                  {testimonial.status === 'pending' && (
                    <>
                      <button onClick={() => handleApproveTestimonial(testimonial.id)} style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Approve</button>
                      <button onClick={() => handleRejectTestimonial(testimonial.id)} style={{ background: '#f59e42', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Reject</button>
                    </>
                  )}
                  <button onClick={() => handleDeleteTestimonial(testimonial.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Contact Info Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Contact Info Management</h2>
        <form onSubmit={editingContact ? handleUpdateContact : handleAddContact} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 600 }}>
          <input type="text" name="type" placeholder="Type (e.g. Email, Phone, LinkedIn)" value={contactForm.type} onChange={handleContactFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <input type="text" name="value" placeholder="Value (e.g. user@email.com, +123456789, linkedin.com/in/...)" value={contactForm.value} onChange={handleContactFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#6366f1', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingContact ? 'Update' : 'Add'} Contact</button>
          {editingContact && <button type="button" onClick={() => { setEditingContact(null); setContactForm({ type: '', value: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
        </form>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Type</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Value</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map(contact => (
              <tr key={contact.id}>
                <td style={{ padding: 8 }}>{contact.type}</td>
                <td style={{ padding: 8 }}>{contact.value}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEditContact(contact)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteContact(contact.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Resume Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Resume Management</h2>
        {resume ? (
          <div style={{ marginBottom: 10 }}>
            <a href={resume?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', fontWeight: 600, marginRight: 16 }}>{resume?.fileName}</a>
            <button onClick={handleDeleteResume} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
          </div>
        ) : (
          <div style={{ color: '#aaa' }}>No resume uploaded.</div>
        )}
      </section>
      {/* Hobbies Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Hobbies Management</h2>
        <form onSubmit={editingHobby ? handleUpdateHobby : handleAddHobby} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18, maxWidth: 500 }}>
          <input type="text" name="name" placeholder="Hobby name" value={hobbyForm.name} onChange={handleHobbyFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff' }} required />
          <textarea name="description" placeholder="Description" value={hobbyForm.description} onChange={handleHobbyFormChange} style={{ padding: 8, borderRadius: 6, border: '1px solid #444', background: '#18181b', color: '#fff', minHeight: 40 }} required />
          <button type="submit" style={{ padding: '8px 18px', borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 15, cursor: 'pointer', marginTop: 6 }}>{editingHobby ? 'Update' : 'Add'} Hobby</button>
          {editingHobby && <button type="button" onClick={() => { setEditingHobby(null); setHobbyForm({ name: '', description: '' }); }} style={{ background: 'none', color: '#ef4444', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: 2 }}>Cancel</button>}
        </form>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Description</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hobbyList.map(hobby => (
              <tr key={hobby.id}>
                <td style={{ padding: 8 }}>{hobby.name}</td>
                <td style={{ padding: 8 }}>{hobby.description}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEditHobby(hobby)} style={{ background: '#232323', color: '#fff', border: '1px solid #444', borderRadius: 6, padding: '4px 10px', marginRight: 6, cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDeleteHobby(hobby.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Feedback Submissions */}
      <section style={{ marginBottom: 40 }}>
        <h2>Feedback Submissions</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Comment</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(f => (
              <tr key={f.id}>
                <td style={{ padding: 8 }}>{f.name}</td>
                <td style={{ padding: 8 }}>{f.comment}</td>
                <td style={{ padding: 8 }}>{new Date(f.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Messages Management */}
      <section style={{ marginBottom: 40 }}>
        <h2>Contact Messages</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Email</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Message</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left', padding: 8 }}>Date</th>
              <th style={{ borderBottom: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messageList.map(msg => (
              <tr key={msg.id}>
                <td style={{ padding: 8 }}>{msg.name}</td>
                <td style={{ padding: 8 }}>{msg.email}</td>
                <td style={{ padding: 8 }}>{msg.content}</td>
                <td style={{ padding: 8 }}>{new Date(msg.createdAt).toLocaleString()}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleDeleteMessage(msg.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    }
    export default AdminDashboard;
