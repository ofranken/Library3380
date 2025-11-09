import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/SplashHero';
import Services from '../components/Services';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="HomePage">
      <Navbar />
      <Hero />
      <Services />
      <Footer />
    </div>
  );
}

export default HomePage;