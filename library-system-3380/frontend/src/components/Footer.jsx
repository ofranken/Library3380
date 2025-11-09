import React from 'react';

function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} Procure (Olivia Franken, Isabella Bickhaus). All rights reserved.</p>
        <p>Ellis Library and Auditorium, 520 S 9th St, Columbia, MO 65201</p>
        <p>...</p>
        <p>MU CMP_SC 3380</p>
      </div>
    </footer>
  );
}

export default Footer;