import React, { useState } from 'react';
import './BookDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bookCoverImage from '../images/hpplaceholder.jpg';

function BookDetail() {
  const [selectedLocation, setSelectedLocation] = useState('main-library');
  const [selectedFormat, setSelectedFormat] = useState('hardcopy');

  // Sample book data - you can pass this as props later
  const book = {
    coverImage: bookCoverImage,
    isbn: '978-0-123456-78-9',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    authors: ['J.K. Rowling', 'John Smith'],
    rating: 4.5,
    reviewCount: 127,
    genres: ['Education', 'Reference', 'Non-Fiction'],
    description: 'An comprehensive exploration of modern library science, covering cataloging systems, information retrieval, digital archives, and the evolving role of libraries in the digital age. This essential text provides both theoretical foundations and practical applications for aspiring librarians and information professionals.',
    availability: {
      'main-library': {
        hardcopy: 5,
        ebook: 'Unlimited'
      },
      'north-branch': {
        hardcopy: 2,
        ebook: 'Unlimited'
      },
      'south-branch': {
        hardcopy: 0,
        ebook: 'Unlimited'
      },
      'east-branch': {
        hardcopy: 3,
        ebook: 'Unlimited'
      }
    }
  };

  const locations = [
    { value: 'main-library', label: 'Main Library' },
    { value: 'north-branch', label: 'North Branch' },
    { value: 'south-branch', label: 'South Branch' },
    { value: 'east-branch', label: 'East Branch' }
  ];

  const formats = [
    { value: 'hardcopy', label: 'Hardcopy' },
    { value: 'ebook', label: 'E-Book' }
  ];

  const getAvailability = () => {
    return book.availability[selectedLocation][selectedFormat];
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  return (
    <div>
            <Navbar />

    <div className="book-detail-page">
      <div className="book-detail-container">
        <div className="book-image-section">
          <img src={book.coverImage} alt={book.title} className="book-cover" />
        </div>

        <div className="book-info-section">
          <div className="book-header">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-authors">by {book.authors.join(', ')}</p>
          </div>

          <div className="book-isbn">
            <span className="isbn-label">ISBN:</span> {book.isbn}
          </div>

          <div className="book-rating">
            <div className="stars">
              {renderStars(book.rating)}
            </div>
            <span className="rating-number">{book.rating}</span>
            <span className="review-count">({book.reviewCount} reviews)</span>
          </div>

          <div className="book-genres">
            <span className="genre-label">Genres:</span>
            {book.genres.map((genre, index) => (
              <span key={index} className="genre-tag">{genre}</span>
            ))}
          </div>

          <div className="book-description">
            <h3>Description</h3>
            <p>{book.description}</p>
          </div>

          <div className="availability-section">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <select 
                id="location" 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="form-select"
              >
                {locations.map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="format">Format</label>
              <select 
                id="format"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="form-select"
              >
                {formats.map(fmt => (
                  <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="copies">Copies Available</label>
              <input 
                id="copies"
                type="text" 
                value={getAvailability()} 
                readOnly 
                className="form-input-readonly"
              />
            </div>
          </div>

          <button className="checkout-button">Borrow</button>
        </div>
      </div>
    </div>
        <Footer/>

        </div>
  );
}

export default BookDetail;