import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lilyLogo from '../images/Lily of the Valley Blockprint Logo.png';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img id="nav-lily" src={lilyLogo} alt="Lily Logo" />
          <h2>Procure</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/catalog" className="nav-link">Catalog</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-shelf" className="nav-link">Required Readings</Link>
          </li>
          <li className="nav-item">
            <Link to="/my-shelf" className="nav-link">My Shelf</Link>
          </li>
          
          {/* Show login/signup or user info based on auth status */}
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <span className="nav-user">
                  Hello, {currentUser?.firstName}
                </span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link nav-logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link nav-signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;