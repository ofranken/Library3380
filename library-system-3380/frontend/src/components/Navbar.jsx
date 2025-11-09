import React from 'react';
import lilyLogo from '../images/Lily of the Valley Blockprint Logo.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img id="nav-lily" src={lilyLogo} alt="Lily Logo" />
          <h2>Procure</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/catalog" className="nav-link">Catalog</a>
          </li>
          <li className="nav-item">
            <a href="/book" className="nav-link">Required Readings</a>
          </li>
          <li className="nav-item">
            <a href="my-shelf" className="nav-link">My Shelf</a>
          </li>
                    <li className="nav-item">
            <a href="login" className="nav-link">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;