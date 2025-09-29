import './Login.css';  // import CSS file
import React, { useState, useContext } from 'react';
import api from '../api.js';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post('/auth/login/', { username, password });
      const { access, refresh } = resp.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      const userObj = { username };
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);
      nav('/');
    } catch (err) {
      console.error(err);
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
