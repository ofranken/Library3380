import React from 'react';
import bookIcon from '../images/book.png';
import reviewIcon from '../images/review.png';
import tutorIcon from '../images/write.png';
import booklistIcon from '../images/book-list.png';

function Services() {
  const services = [
    {
      icon: bookIcon,
      alt: "Book icon",
      title: "Book Lending",
      description: "Check out books of your choosing for 2-week periods"
    },
    {
      icon: booklistIcon,
      alt: "List icon",
      title: "Class Book Lists", 
      description: "Select your classes and automatically generate your book list"
    },
    {
      icon: tutorIcon,
      alt: "Tutor icon",
      title: "Tutoring Sessions",
      description: "Schedule appointments with available writing tutors"
    },
    {
      icon: reviewIcon,
      alt: "Star icon",
      title: "Rapid Reviewing",
      description: "Keep track of your reads through quick reviews and view rating averages"
    }
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img 
                src={service.icon} 
                alt={service.alt} 
                className="service-icon"
              />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;