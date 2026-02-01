import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#18181b', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
      <div style={{ position: 'absolute', inset: 0, background: '#18181b', opacity: 1, zIndex: 0 }}></div>
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#232323',
          padding: 32,
          borderRadius: 12,
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          minWidth: 320,
          color: '#fff',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <h2 style={{ color: '#ef4444', marginBottom: 24 }}>Admin Login</h2>
        <div style={{ marginBottom: 18 }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444', background: '#232323', color: '#fff', fontSize: 16, fontWeight: 500 }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #444', background: '#232323', color: '#fff', fontSize: 16, fontWeight: 500 }}
          />
        </div>
        {error && <div style={{ color: '#d32f2f', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 12, borderRadius: 6, background: '#ef4444', color: '#fff', fontWeight: 600, border: 'none', fontSize: 16, cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
