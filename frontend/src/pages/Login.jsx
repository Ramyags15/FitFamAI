// src/pages/Login.jsx
import { useState } from 'react';
import api from '../api';

export default function Login(){
  const [mode, setMode] = useState('login'); // or 'register'
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const register = async () => {
    try {
      const res = await api.post('/users/register', { name, email, password });
      localStorage.setItem('userId', res.data.userId);
      setMsg('Registered — userId saved. Go to Tracker.');
    } catch (e) {
      setMsg(e.response?.data?.message || e.message);
    }
  };

  const login = async () => {
    try {
      const res = await api.post('/users/login', { email, password });
      localStorage.setItem('userId', res.data.userId);
      setMsg('Logged in — userId saved.');
    } catch (e) {
      setMsg(e.response?.data?.message || e.message);
    }
  };

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>

      {mode === 'register' && (
        <div>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        </div>
      )}

      <div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>

      <div style={{ marginTop: 8 }}>
        {mode === 'login' ? (
          <button onClick={login}>Login</button>
        ) : (
          <button onClick={register}>Register</button>
        )}
        <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMsg(''); }}>
          {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>

      {msg && <p>{msg}</p>}
      <p>After login/register your <code>userId</code> is stored in localStorage for demo purposes.</p>
    </div>
  );
}
