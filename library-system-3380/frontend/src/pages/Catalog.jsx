import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Catalog.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Catalog() {
  const navigate = useNavigate();
  
  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  
  // Books data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available filter options (will be populated from database)
  const [availableGenres, setAvailableGenres] = useState([]);
  const formats = ['Hardcopy', 'E-Book'];
  const ratings = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

  // Fetch books from database
  useEffect(() => {
    fetchBooks();
  }, [selectedGenres, selectedRatings]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      if (selectedGenres.length > 0) {
        selectedGenres.forEach(genre => params.append('genres', genre));
      }
      
      if (selectedRatings.length > 0) {
        selectedRatings.forEach(rating => params.append('ratings', rating));
      }

      const response = await fetch(`${API_BASE_URL}/books?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setBooks(data.books);
        
        // Extract unique genres from all books
        const genres = new Set();
        data.books.forEach(book => {
          book.genres.forEach(genre => genres.add(genre));
        });
        setAvailableGenres(Array.from(genres).sort());
      } else {
        setError('Failed to fetch books');
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Error loading catalog');
    } finally {
      setLoading(false);
    }
  };

  // Filter toggle functions
  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleFormat = (format) => {
    setSelectedFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  // Client-side format filtering
  const filteredBooks = books.filter(book => {
    const formatMatch = selectedFormats.length === 0; // Format filtering would need location data
    return formatMatch;
  });

  const renderStars = (rating) => {
    const stars = [];
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(numRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }

    return stars;
  };

  const handleBookClick = (isbn) => {
    navigate(`/book/${isbn}`);
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="catalog-page">
          <div className="catalog-header">
            <h1>Loading catalog...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="catalog-page">
          <div className="catalog-header">
            <h1>Error: {error}</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="catalog-page">
        <div className="catalog-header">
          <h1>Explore the Full Catalog...</h1>
          <p className="book-count">There are {filteredBooks.length} books available for your selection</p>
        </div>

        <div className="catalog-container">
          <aside className="filter-sidebar">
            <div className="filter-section">
              <h3>Genre</h3>
              {availableGenres.map(genre => (
                <label key={genre} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Rating</h3>
              {ratings.map(rating => (
                <label key={rating} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => toggleRating(rating)}
                  />
                  <span>{rating} stars & up</span>
                </label>
              ))}
            </div>
          </aside>

          <div className="books-grid">
            {filteredBooks.map(book => (
              <div 
                key={book.isbn} 
                className="book-card"
                onClick={() => handleBookClick(book.isbn)}
              >
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className="book-card-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450/A28C75/FFFFFF?text=No+Image';
                  }}
                />
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-authors">{book.authors.join(', ')}</p>
                <div className="book-card-rating">
                  {renderStars(book.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catalog;