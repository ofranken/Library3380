import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import authService from '../services/authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function BookDetail() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('hardcopy');
  
  // TBR and Review state
  const [inWishlist, setInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  
  const isAuthenticated = authService.isAuthenticated();

  // Fetch book details
  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  // Check TBR status and user review
  useEffect(() => {
    if (isAuthenticated && book) {
      checkWishlistStatus();
      fetchUserReview();
    }
  }, [isAuthenticated, book]);

  const fetchBookDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/books/${isbn}`);
      const data = await response.json();

      if (data.success) {
        setBook(data.book);
        
        // Set default location to first available
        if (data.book.availability.length > 0) {
          setSelectedLocation(data.book.availability[0].Location_ID.toString());
        }
      } else {
        setError('Book not found');
      }
    } catch (err) {
      console.error('Error fetching book:', err);
      setError('Error loading book details');
    } finally {
      setLoading(false);
    }
  };

  const checkWishlistStatus = async () => {
    const token = authService.getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/tbr/check/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setInWishlist(data.inWishlist);
      }
    } catch (err) {
      console.error('Error checking wishlist:', err);
    }
  };

  const fetchUserReview = async () => {
    const token = authService.getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success && data.review) {
        setUserRating(parseFloat(data.review.Out_of_five_stars));
      }
    } catch (err) {
      console.error('Error fetching review:', err);
    }
  };

  const handleTBRToggle = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const token = authService.getToken();
    
    try {
      if (inWishlist) {
        // Remove from wishlist
        const response = await fetch(`${API_BASE_URL}/tbr/remove/${isbn}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setInWishlist(false);
        }
      } else {
        // Add to wishlist
        const response = await fetch(`${API_BASE_URL}/tbr/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isbn })
        });
        const data = await response.json();
        if (data.success) {
          setInWishlist(true);
        }
      }
    } catch (err) {
      console.error('Error toggling TBR:', err);
    }
  };

  const handleRatingClick = async (rating) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const token = authService.getToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isbn, rating })
      });
      
      const data = await response.json();
      if (data.success) {
        setUserRating(rating);
        // Refresh book details to get updated average rating
        fetchBookDetails();
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
    }
  };

  const handleMarkAsUnread = async () => {
    const token = authService.getToken();
    
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${isbn}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setUserRating(null);
        // Refresh book details to get updated average rating
        fetchBookDetails();
      }
    } catch (err) {
      console.error('Error removing rating:', err);
    }
  };

  const getAvailability = () => {
    if (!book || !selectedLocation) return 0;
    
    const locationAvail = book.availability.find(
      a => a.Location_ID.toString() === selectedLocation && 
           a.Format_type.toLowerCase() === selectedFormat.toLowerCase()
    );
    
    return locationAvail ? locationAvail.Quantity : 0;
  };

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

  const renderRatingStars = () => {
  // Render DOM in reverse order (5 down to 1) so CSS sibling selector
  // can color the "left" stars using row-reverse.
  return [5, 4, 3, 2, 1].map(star => (
    <span
      key={star}
      data-star={star}
      className={`rating-star ${star <= (hoverRating || userRating) ? 'filled' : ''}`}
      onMouseEnter={() => setHoverRating(star)}
      onMouseLeave={() => setHoverRating(0)}
      onClick={() => handleRatingClick(star)}
      role="button"
      aria-label={`${star} star`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleRatingClick(star); }}
    >
      ★
    </span>
  ));
};



  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="book-detail-page">
          <div className="book-detail-container">
            <h1>Loading...</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div>
        <Navbar />
        <div className="book-detail-page">
          <div className="book-detail-container">
            <h1>{error || 'Book not found'}</h1>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Get unique locations
  const locations = [...new Set(book.availability.map(a => ({
    id: a.Location_ID,
    name: a.Name
  }))).values()].filter((loc, index, self) => 
    index === self.findIndex(l => l.id === loc.id)
  );

  const formats = [
    { value: 'hardcopy', label: 'Hardcopy' },
    { value: 'ebook', label: 'E-Book' }
  ];

  return (
    <div>
      <Navbar />

      <div className="book-detail-page">
        <div className="book-detail-container">
          <div className="book-image-section">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="book-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600/A28C75/FFFFFF?text=No+Image';
              }}
            />
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

            {/* TBR Button */}
            <button 
              className={`tbr-button ${inWishlist ? 'in-wishlist' : ''}`}
              onClick={handleTBRToggle}
            >
              {inWishlist ? 'REMOVE FROM TBR' : 'ADD TO TBR'}
            </button>

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
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
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

            {/* Rating Section */}
            {isAuthenticated && (
              <div className="user-rating-section">
                <h3>Rate this book:</h3>
                <div className="rating-stars-container">
                  {renderRatingStars()}
                </div>
                {userRating && (
                  <button 
                    className="mark-unread-button"
                    onClick={handleMarkAsUnread}
                  >
                    MARK AS UNREAD
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default BookDetail;