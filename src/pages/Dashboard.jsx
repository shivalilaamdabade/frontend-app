import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await getProfile();
        // We don't need to store user data since we're not displaying it
      } catch (error) {
        console.error('Profile fetch error:', error);
        setError('Failed to load profile. Please login again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="form-container">
          <div className="error-message" style={{ textAlign: 'center' }}>
            {error}
          </div>
          <button 
            onClick={() => navigate('/login')} 
            className="btn" 
            style={{ marginTop: '20px', width: '100%' }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container">
        <h1 className="dashboard-title">
          Hello, Welcome
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;