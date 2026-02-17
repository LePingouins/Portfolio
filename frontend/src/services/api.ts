// Gemini skill suggestions (proxy)
export async function fetchGeminiSkillSuggestions(query: string, model: 'flash' | 'pro' = 'flash') {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/gemini/suggest-skills` : `${API_BASE_URL}/api/gemini/suggest-skills`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, model })
  });
  if (!res.ok) throw new Error('Failed to fetch Gemini suggestions');
  return res.json();
}
// Archive contact message (admin)
export async function archiveContactMessage(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contact-messages/${id}/archive` : `${API_BASE_URL}/api/contact-messages/${id}/archive`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to archive contact message');
  return res.json();
}

// Fetch archived contact messages (admin)
export async function fetchArchivedContactMessages() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contact-messages/archived` : `${API_BASE_URL}/api/contact-messages/archived`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch archived contact messages');
  return res.json();
}
// Fetch all feedbacks (admin)
export async function fetchAllFeedbacks() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback` : `${API_BASE_URL}/api/feedback`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch feedbacks');
  return res.json();
}

// Fetch accepted feedbacks (public)
export async function fetchAcceptedFeedbacks() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/accepted` : `${API_BASE_URL}/api/feedback/accepted`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch accepted feedbacks');
  return res.json();
}

// Accept feedback (admin)
export async function acceptFeedback(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/${id}/accept` : `${API_BASE_URL}/api/feedback/${id}/accept`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to accept feedback');
  return res.json();
}

// Reject feedback (admin)
export async function rejectFeedback(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/${id}/reject` : `${API_BASE_URL}/api/feedback/${id}/reject`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to reject feedback');
  return res.json();
}

// Delete feedback (admin)
export async function deleteFeedback(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/${id}` : `${API_BASE_URL}/api/feedback/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete feedback');
}

// Archive feedback (admin)
export async function archiveFeedback(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/${id}/archive` : `${API_BASE_URL}/api/feedback/${id}/archive`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to archive feedback');
  return res.json();
}

// Unarchive feedback (admin)
export async function unarchiveFeedback(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/${id}/unarchive` : `${API_BASE_URL}/api/feedback/${id}/unarchive`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to unarchive feedback');
  return res.json();
}

// Fetch archived feedbacks (admin)
export async function fetchArchivedFeedbacks() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback/archived` : `${API_BASE_URL}/api/feedback/archived`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch archived feedbacks');
  return res.json();
}

// Feedback
export async function submitFeedback(feedback: { name: string; comment: string }) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/feedback` : `${API_BASE_URL}/api/feedback`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback),
  });
  if (!res.ok) throw new Error('Failed to submit feedback');
  return res.json();
}

// Contact Messages (admin)
export async function fetchContactMessages() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contact-messages` : `${API_BASE_URL}/api/contact-messages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch contact messages');
  return res.json();
}

export async function deleteContactMessage(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contact-messages/${id}` : `${API_BASE_URL}/api/contact-messages/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete contact message');
}

export async function submitContactMessage(message: { name: string; email: string; subject: string; message: string }) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contact-messages` : `${API_BASE_URL}/api/contact-messages`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
  if (!res.ok) throw new Error('Failed to submit contact message');
  return res.json();
}

// Simple service to fetch backend hello endpoint

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export async function fetchHello() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hello` : `${API_BASE_URL}/api/hello`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hello');
  return res.text();
}

// Type definitions
export interface Project {
  id?: number;
  name: string;
  description: string;
  projectLink: string;
  websiteLink: string;
  imageUrl: string;
  techStack: string[];
  archived?: boolean;
}
export interface Skill {
  id?: number;
  name: string;
}
export interface Work {
  id?: number;
  company: string;
  position: string;
}
export interface Education {
  id?: number;
  school: string;
  degree: string;
}
export interface Resume {
  id?: number;
  url: string;
}
export interface Hobby {
  id?: number;
  name: string;
}
export interface ContactInfo {
  id?: number;
  email: string;
}
export interface Testimonial {
  id?: number;
  name: string;
  comment: string;
}
export interface Message {
  id?: number;
  name: string;
  email: string;
  content: string;
}
export interface TestimonialPayload {
  name: string;
  text: string;
  role?: string;
  avatar?: string;
}

// Projects
export async function fetchProjects() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects` : `${API_BASE_URL}/api/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchArchivedProjects() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/archived` : `${API_BASE_URL}/api/projects/archived`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch archived projects');
  return res.json();
}

export async function archiveProject(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}/archive` : `${API_BASE_URL}/api/projects/${id}/archive`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to archive project');
  return res.json();
}

export async function unarchiveProject(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}/unarchive` : `${API_BASE_URL}/api/projects/${id}/unarchive`;
  const res = await fetch(url, { method: 'PATCH' });
  if (!res.ok) throw new Error('Failed to unarchive project');
  return res.json();
}
export async function addProject(project: Project) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects` : `${API_BASE_URL}/api/projects`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) });
  if (!res.ok) throw new Error('Failed to add project');
  return res.json();
}
export async function updateProject(id: number, project: Project) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/api/projects/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}
export async function deleteProject(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/api/projects/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete project');
}

// Skills
export async function fetchSkills() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills` : `${API_BASE_URL}/api/skills`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}
export async function addSkill(skill: Skill) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills` : `${API_BASE_URL}/api/skills`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(skill) });
  if (!res.ok) throw new Error('Failed to add skill');
  return res.json();
}
export async function deleteSkill(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills/${id}` : `${API_BASE_URL}/api/skills/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete skill');
}

// Work Experience
export async function fetchWork() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work` : `${API_BASE_URL}/api/work`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch work experience');
  return res.json();
}
export async function addWork(work: Work) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work` : `${API_BASE_URL}/api/work`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(work) });
  if (!res.ok) throw new Error('Failed to add work experience');
  return res.json();
}
export async function updateWork(id: number, work: Work) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work/${id}` : `${API_BASE_URL}/api/work/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(work) });
  if (!res.ok) throw new Error('Failed to update work experience');
  return res.json();
}
export async function deleteWork(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work/${id}` : `${API_BASE_URL}/api/work/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete work experience');
}

// Education
export async function fetchEducation() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education` : `${API_BASE_URL}/api/education`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch education');
  return res.json();
}
export async function addEducation(edu: Education) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education` : `${API_BASE_URL}/api/education`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edu) });
  if (!res.ok) throw new Error('Failed to add education');
  return res.json();
}
export async function updateEducation(id: number, edu: Education) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education/${id}` : `${API_BASE_URL}/api/education/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edu) });
  if (!res.ok) throw new Error('Failed to update education');
  return res.json();
}
export async function deleteEducation(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education/${id}` : `${API_BASE_URL}/api/education/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete education');
}

// Resume
export async function fetchResumes() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume` : `${API_BASE_URL}/api/resume`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch resumes');
  return res.json();
}
export async function addResume(resume: Resume) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume` : `${API_BASE_URL}/api/resume`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resume) });
  if (!res.ok) throw new Error('Failed to add resume');
  return res.json();
}
export async function updateResume(id: number, resume: Resume) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume/${id}` : `${API_BASE_URL}/api/resume/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resume) });
  if (!res.ok) throw new Error('Failed to update resume');
  return res.json();
}
export async function deleteResume(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume/${id}` : `${API_BASE_URL}/api/resume/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete resume');
}

// Hobbies
export async function fetchHobbies() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies` : `${API_BASE_URL}/api/hobbies`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hobbies');
  return res.json();
}
export async function addHobby(hobby: Hobby) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies` : `${API_BASE_URL}/api/hobbies`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hobby) });
  if (!res.ok) throw new Error('Failed to add hobby');
  return res.json();
}
export async function updateHobby(id: number, hobby: Hobby) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies/${id}` : `${API_BASE_URL}/api/hobbies/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hobby) });
  if (!res.ok) throw new Error('Failed to update hobby');
  return res.json();
}
export async function deleteHobby(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies/${id}` : `${API_BASE_URL}/api/hobbies/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete hobby');
}

// Contact Info
export async function fetchContactInfo() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo` : `${API_BASE_URL}/api/contactinfo`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch contact info');
  return res.json();
}
export async function addContactInfo(info: ContactInfo) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo` : `${API_BASE_URL}/api/contactinfo`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
  if (!res.ok) throw new Error('Failed to add contact info');
  return res.json();
}
export async function updateContactInfo(id: number, info: ContactInfo) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo/${id}` : `${API_BASE_URL}/api/contactinfo/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
  if (!res.ok) throw new Error('Failed to update contact info');
  return res.json();
}
export async function deleteContactInfo(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo/${id}` : `${API_BASE_URL}/api/contactinfo/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete contact info');
}

// Messages
export async function fetchMessages() {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages` : `${API_BASE_URL}/api/messages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}
export async function submitMessage(message: Message) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages` : `${API_BASE_URL}/api/messages`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message) });
  if (!res.ok) throw new Error('Failed to submit message');
  return res.json();
}
export async function deleteMessage(id: number) {
  const url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages/${id}` : `${API_BASE_URL}/api/messages/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete message');
}
