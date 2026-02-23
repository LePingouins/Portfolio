import { useState, useEffect, useContext } from 'react';
import './AdminSkills.css';
import { fetchSkills, addSkill, deleteSkill } from '../services/api';
import { LanguageContext } from '../components/LanguageContext';

interface Skill {
    id: number;
    name: string;
}

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [input, setInput] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSkills = async () => {
        try {
            const data = await fetchSkills();
            setSkills(data);
        } catch (e) {
            console.error(e);
        }
    };
    loadSkills();
  }, []);

  const handleAddSkill = async () => {
    if (input.trim()) {
      setSaving(true);
      try {
        const newSkill = await addSkill({ name: input.trim() });
        setSkills([...skills, newSkill]);
        setInput('');
      } catch {
        window.alert(t.adminPages.skills.addFail || 'Failed to add skill');
      }
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    try {
      await deleteSkill(id);
      setSkills(skills.filter(s => s.id !== id));
    } catch {
      window.alert(t.adminPages.skills.deleteFail || 'Failed to delete skill');
    }
  };

  const { t } = useContext(LanguageContext);

  return (
    <div className="admin-skills-container">
      <h2>{t.adminPages.skills.title}</h2>
      <div className="skills-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.adminPages.skills.addPlaceholder}
          disabled={saving}
        />
        <button onClick={handleAddSkill} disabled={saving}>{saving ? t.adminPages.skills.saving : t.adminPages.skills.addButton}</button>
      </div>
      
      <ul className="skills-list">
        {skills.map((skill) => (
          <li key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{skill.name}</span>
            <button style={{ marginLeft: 8, fontSize: 12, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }} onClick={() => handleDeleteSkill(skill.id)}>{t.adminPages.skills.deleteConfirm || 'Delete'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSkills;
