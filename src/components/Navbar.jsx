import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/dashboard" className="nav-logo">
          AuthApp
        </Link>
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/api-test" className="nav-link">
            API Test
          </Link>
          <button onClick={handleLogout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;