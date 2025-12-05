import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../images/bookshelf.jpg'; // Update filename to match yours

function SplashHero() {

  const heroStyle = {
    backgroundImage: `linear-gradient( rgba(45, 34, 27, 0.8),rgba(31, 23, 19, 1)), url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <section className="hero" id="home" style={heroStyle}>
      <div className="hero-content">
        <h1>Your web-based library solution!</h1>
        <p>Check out and return books, rate them, and schedule tutoring sessions all in one place!</p>
        <div className="hero-buttons">
          <Link to="/my-shelf"><button className="btn-primary">Browse Catalog</button></Link>
          <Link to="/my-shelf"><button className="btn-secondary">Get Required Readings</button></Link>
        </div>
      </div>
    </section>
  );
}

export default SplashHero;