import React, { useState } from 'react';
import api from '../api.js';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // import CSS

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async () => {
    try {
      console.log("📡 Sending register request:", { username, email, password });
      const resp = await api.post('/auth/register/', { username, email, password });

      console.log("✅ Register response:", resp.data);

      localStorage.setItem('access_token', resp.data.access);
      localStorage.setItem('refresh_token', resp.data.refresh);
      localStorage.setItem('user', JSON.stringify(resp.data.user));

      nav('/');
    } catch (err) {
      console.error("❌ Register error:", err.response || err.message);
      alert('Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Sign up</h2>
        <div className="register-form">
          <div className="form-group">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="button" onClick={submit} className="register-btn">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
