import { useState, useEffect, useContext } from 'react';
import './AdminSkills.css';
import { fetchSkills, addSkill, deleteSkill } from '../services/api';
import { LanguageContext } from '../components/LanguageContext';

interface Skill {
  id?: number;
  name: string;
  category: string;
  proficiency: number;
}

const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('Languages');
  const [proficiency, setProficiency] = useState(80);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editProficiency, setEditProficiency] = useState(80);

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
        const newSkill = await addSkill({ name: input.trim(), category, proficiency });
        setSkills([...skills, newSkill]);
        setInput('');
        setProficiency(80);
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

  const startEdit = (skill: Skill) => {
    setEditingId(skill.id!);
    setEditName(skill.name);
    setEditProficiency(skill.proficiency);
  };

  const handleEditSkill = async () => {
    if (editingId && editName.trim()) {
      setSaving(true);
      try {
        // PATCH/PUT endpoint assumed, update as needed
        const updatedSkill = await addSkill({ id: editingId, name: editName.trim(), category, proficiency: editProficiency });
        setSkills(skills.map(s => s.id === editingId ? updatedSkill : s));
        setEditingId(null);
        setEditName('');
        setEditProficiency(80);
      } catch {
        window.alert('Failed to update skill');
      }
      setSaving(false);
    }
  };

  const { t } = useContext(LanguageContext);

  const categories = ['Languages', 'Frameworks', 'Tools'];

  return (
    <div className="admin-skills-container">
      <h2>{t.adminPages.skills.title}</h2>
      <div className="skills-form">
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={t.adminPages.skills.addPlaceholder}
          disabled={saving}
        />
        <input
          type="number"
          min={0}
          max={100}
          value={proficiency}
          onChange={e => setProficiency(Number(e.target.value))}
          style={{ width: 60, marginLeft: 8 }}
        />
        <button onClick={handleAddSkill} disabled={saving}>{saving ? t.adminPages.skills.saving : t.adminPages.skills.addButton}</button>
      </div>

      {categories.map(cat => (
        <div key={cat} style={{ marginTop: 24 }}>
          <h3>{cat}</h3>
          <ul className="skills-list">
            {skills.filter(s => s.category === cat).map((skill) => (
              <li key={skill.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                {editingId === skill.id ? (
                  <>
                    <input value={editName} onChange={e => setEditName(e.target.value)} style={{ width: 120 }} />
                    <input type="number" min={0} max={100} value={editProficiency} onChange={e => setEditProficiency(Number(e.target.value))} style={{ width: 60 }} />
                    <button onClick={handleEditSkill} disabled={saving}>Save</button>
                    <button onClick={() => setEditingId(null)} disabled={saving}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{skill.name}</span>
                    <span style={{ color: '#3b82f6', fontWeight: 600 }}>{skill.proficiency}%</span>
                    <button style={{ marginLeft: 8, fontSize: 12, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }} onClick={() => handleDeleteSkill(skill.id!)}>{t.adminPages.skills.deleteConfirm || 'Delete'}</button>
                    <button style={{ marginLeft: 8, fontSize: 12, background: '#fbbf24', color: '#222', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }} onClick={() => startEdit(skill)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminSkills;
