import React, { useEffect, useState } from 'react';
import api from '../api.js';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import MealsPage from './MealsPage.jsx';
import MealsListPage from './MealsListPage.jsx';


export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const resp = await api.get('/summary/');
      setSummary(resp.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const calcProgress = (value, max) => {
    if (!max || max <= 0) return 0;
    return Math.min((value / max) * 100, 100);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
     <div className="dashboard-header">
  <h1 className="dashboard-title">Dashboard</h1>
  <nav className="dashboard-nav">
    <Link to="/login" className="nav-btn">Login</Link>
    <Link to="/register" className='nav-btn'>Register</Link>
  </nav>
</div>


      {summary ? (
        <div className="summary-card">
          {/* Circular Progress - Calories Remaining */}
          <div className="progress-circle">
            <svg className="circle-svg">
              <circle cx="80" cy="80" r="70" className="circle-bg" />
              <circle
                cx="80"
                cy="80"
                r="70"
                className="circle-progress"
                style={{
                  strokeDasharray: 440,
                  strokeDashoffset:
                    440 -
                    (summary.calories_remaining / summary.daily_goal) * 440,
                }}
              />
            </svg>
            <div className="circle-text">
              <h2>{summary.calories_remaining}</h2>
              <p>Remaining</p>
            </div>
          </div>

          {/* Straight progress bars with dots */}
          <div className="summary-bars">
            <div className="progress-item">
              <div className="progress-label">
                <span>
                  <span className="dot eaten-dot"></span> Eaten
                </span>
                <span>{summary.calories_eaten} / {summary.daily_goal}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill eaten"
                  style={{
                    width: `${calcProgress(
                      summary.calories_eaten,
                      summary.daily_goal
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span>
                  <span className="dot burned-dot"></span> Burned
                </span>
                <span>{summary.calories_burned} / {summary.daily_goal}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill burned"
                  style={{
                    width: `${calcProgress(
                      summary.calories_burned,
                      summary.daily_goal
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="progress-item">
              <div className="progress-label">
                <span>
                  <span className="dot goal-dot"></span> Daily Goal
                </span>
                <span>{summary.daily_goal}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill goal"
                  style={{
                    width: `${calcProgress(
                      summary.daily_goal,
                      summary.daily_goal
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="loading-text">Loading summary...</p>
      )}
      {/* Placeholder for future section */}
<div className="extra-section">
  <MealsPage />
</div>

    </div>
    
  );
}
