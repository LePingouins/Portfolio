// Simple service to fetch backend hello endpoint

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function fetchHello() {
  // Avoid double /api/api/hello if API_BASE_URL already ends with /api
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hello` : `${API_BASE_URL}/api/hello`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hello');
  return res.text();
}


// Projects
export async function fetchProjects() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects` : `${API_BASE_URL}/api/projects`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}
export async function addProject(project) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects` : `${API_BASE_URL}/api/projects`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) });
  if (!res.ok) throw new Error('Failed to add project');
  return res.json();
}
export async function updateProject(id, project) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/api/projects/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(project) });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}
export async function deleteProject(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/projects/${id}` : `${API_BASE_URL}/api/projects/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete project');
}

// Skills
export async function fetchSkills() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills` : `${API_BASE_URL}/api/skills`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch skills');
  return res.json();
}
export async function addSkill(skill) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills` : `${API_BASE_URL}/api/skills`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(skill) });
  if (!res.ok) throw new Error('Failed to add skill');
  return res.json();
}
export async function deleteSkill(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/skills/${id}` : `${API_BASE_URL}/api/skills/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete skill');
}

// Work Experience
export async function fetchWork() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work` : `${API_BASE_URL}/api/work`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch work experience');
  return res.json();
}
export async function addWork(work) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work` : `${API_BASE_URL}/api/work`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(work) });
  if (!res.ok) throw new Error('Failed to add work experience');
  return res.json();
}
export async function updateWork(id, work) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work/${id}` : `${API_BASE_URL}/api/work/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(work) });
  if (!res.ok) throw new Error('Failed to update work experience');
  return res.json();
}
export async function deleteWork(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/work/${id}` : `${API_BASE_URL}/api/work/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete work experience');
}

// Education
export async function fetchEducation() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education` : `${API_BASE_URL}/api/education`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch education');
  return res.json();
}
export async function addEducation(edu) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education` : `${API_BASE_URL}/api/education`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edu) });
  if (!res.ok) throw new Error('Failed to add education');
  return res.json();
}
export async function updateEducation(id, edu) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education/${id}` : `${API_BASE_URL}/api/education/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(edu) });
  if (!res.ok) throw new Error('Failed to update education');
  return res.json();
}
export async function deleteEducation(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/education/${id}` : `${API_BASE_URL}/api/education/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete education');
}

// Resume
export async function fetchResumes() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume` : `${API_BASE_URL}/api/resume`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch resumes');
  return res.json();
}
export async function addResume(resume) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume` : `${API_BASE_URL}/api/resume`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resume) });
  if (!res.ok) throw new Error('Failed to add resume');
  return res.json();
}
export async function updateResume(id, resume) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume/${id}` : `${API_BASE_URL}/api/resume/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resume) });
  if (!res.ok) throw new Error('Failed to update resume');
  return res.json();
}
export async function deleteResume(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/resume/${id}` : `${API_BASE_URL}/api/resume/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete resume');
}

// Hobbies
export async function fetchHobbies() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies` : `${API_BASE_URL}/api/hobbies`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hobbies');
  return res.json();
}
export async function addHobby(hobby) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies` : `${API_BASE_URL}/api/hobbies`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hobby) });
  if (!res.ok) throw new Error('Failed to add hobby');
  return res.json();
}
export async function updateHobby(id, hobby) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies/${id}` : `${API_BASE_URL}/api/hobbies/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(hobby) });
  if (!res.ok) throw new Error('Failed to update hobby');
  return res.json();
}
export async function deleteHobby(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/hobbies/${id}` : `${API_BASE_URL}/api/hobbies/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete hobby');
}

// Contact Info
export async function fetchContactInfo() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo` : `${API_BASE_URL}/api/contactinfo`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch contact info');
  return res.json();
}
export async function addContactInfo(info) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo` : `${API_BASE_URL}/api/contactinfo`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
  if (!res.ok) throw new Error('Failed to add contact info');
  return res.json();
}
export async function updateContactInfo(id, info) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo/${id}` : `${API_BASE_URL}/api/contactinfo/${id}`;
  const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(info) });
  if (!res.ok) throw new Error('Failed to update contact info');
  return res.json();
}
export async function deleteContactInfo(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/contactinfo/${id}` : `${API_BASE_URL}/api/contactinfo/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete contact info');
}

// Testimonials
export async function fetchTestimonials() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/testimonials` : `${API_BASE_URL}/api/testimonials`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}
export async function submitTestimonial(testimonial) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/testimonials` : `${API_BASE_URL}/api/testimonials`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(testimonial) });
  if (!res.ok) throw new Error('Failed to submit testimonial');
  return res.json();
}
export async function approveTestimonial(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/testimonials/${id}/approve` : `${API_BASE_URL}/api/testimonials/${id}/approve`;
  const res = await fetch(url, { method: 'PUT' });
  if (!res.ok) throw new Error('Failed to approve testimonial');
  return res.json();
}
export async function rejectTestimonial(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/testimonials/${id}/reject` : `${API_BASE_URL}/api/testimonials/${id}/reject`;
  const res = await fetch(url, { method: 'PUT' });
  if (!res.ok) throw new Error('Failed to reject testimonial');
  return res.json();
}
export async function deleteTestimonial(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/testimonials/${id}` : `${API_BASE_URL}/api/testimonials/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete testimonial');
}

// Messages
export async function fetchMessages() {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages` : `${API_BASE_URL}/api/messages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}
export async function submitMessage(message) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages` : `${API_BASE_URL}/api/messages`;
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(message) });
  if (!res.ok) throw new Error('Failed to submit message');
  return res.json();
}
export async function deleteMessage(id) {
  let url = API_BASE_URL.endsWith('/api') ? `${API_BASE_URL}/messages/${id}` : `${API_BASE_URL}/api/messages/${id}`;
  const res = await fetch(url, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete message');
}
