import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetail.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnvelopeNotification from '../components/EnvelopeNotification.jsx';
import authService from '../services/authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function BookDetail() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('Hardcopy');
  
  // TBR and Review state
  const [inWishlist, setInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Borrow state
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [borrowing, setBorrowing] = useState(false);
  
  // Notification state
  const [notification, setNotification] = useState(null);
  
  const isAuthenticated = authService.isAuthenticated();

  // Calculate locations from book availability
  const locations = useMemo(() => {
    if (!book) return [];
    return [...new Set(book.availability.map(a => ({
      id: a.Location_ID,
      name: a.Name
    }))).values()].filter((loc, index, self) => 
      index === self.findIndex(l => l.id === loc.id)
    );
  }, [book]);

  // Fetch book details
  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  // Check TBR status, user review, and borrow status
  useEffect(() => {
    if (isAuthenticated && book) {
      checkWishlistStatus();
      fetchUserReview();
    }
  }, [isAuthenticated, book]);

  // Check borrow status when location or format changes
  useEffect(() => {
    if (isAuthenticated && book && selectedLocation && selectedFormat) {
      checkBorrowStatus();
    }
  }, [isAuthenticated, book, selectedLocation, selectedFormat]);

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

  const checkBorrowStatus = async () => {
    const token = authService.getToken();
    try {
      const response = await fetch(
        `${API_BASE_URL}/borrow/check/${isbn}/${selectedLocation}/${selectedFormat}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        setIsBorrowed(data.isBorrowed);
      }
    } catch (err) {
      console.error('Error checking borrow status:', err);
    }
  };

  const handleBorrowReturn = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (getAvailability() === 0 && !isBorrowed) {
      alert('No copies available');
      return;
    }

    setBorrowing(true);
    const token = authService.getToken();

    try {
      if (isBorrowed) {
        // Return book - DELETE with parameters in URL
        const response = await fetch(
          `${API_BASE_URL}/borrow/${isbn}/${selectedLocation}/${selectedFormat}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const data = await response.json();
        if (data.success) {
          setIsBorrowed(false);
          // Get the location name from the locations array
          const selectedLocationObj = locations.find(loc => loc.id.toString() === selectedLocation);
          const locationName = selectedLocationObj ? selectedLocationObj.name : 'Unknown Location';
          
          setNotification({
            message: 'Book returned successfully!',
            bookDetails: {
              title: book.title,
              authors: book.authors,
              Format_type: selectedFormat,
              location: locationName
            },
            type: 'return'
          });
          // Refresh book details to update availability
          fetchBookDetails();
        } else {
          alert(data.message || 'Failed to return book');
        }
      } else {
        // Borrow book - POST with body
        const response = await fetch(`${API_BASE_URL}/borrow`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            isbn,
            locationId: parseInt(selectedLocation),
            formatType: selectedFormat
          })
        });

        const data = await response.json();
        if (data.success) {
          setIsBorrowed(true);
          // Get the location name from the locations array
          const selectedLocationObj = locations.find(loc => loc.id.toString() === selectedLocation);
          const locationName = selectedLocationObj ? selectedLocationObj.name : 'Unknown Location';
          
          setNotification({
            message: 'Book borrowed successfully!',
            bookDetails: {
              title: book.title,
              authors: book.authors,
              Format_type: selectedFormat,
              location: locationName
            },
            type: 'borrow'
          });
          // Refresh book details to update availability
          fetchBookDetails();
        } else {
          alert(data.message || 'Failed to borrow book');
        }
      }
    } catch (err) {
      console.error('Error borrowing/returning book:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setBorrowing(false);
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
           a.Format_type === selectedFormat
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

  const formats = ['Hardcopy', 'E-Book'];

  return (
    <div>
      <Navbar />

      {/* Envelope Notification */}
      {notification && (
        <EnvelopeNotification
          message={notification.message}
          bookDetails={notification.bookDetails}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

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
                    <option key={fmt} value={fmt}>{fmt}</option>
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

            <button 
              className={`checkout-button ${isBorrowed ? 'return-button' : ''}`}
              onClick={handleBorrowReturn}
              disabled={borrowing || (!isBorrowed && getAvailability() === 0)}
            >
              {borrowing ? (isBorrowed ? 'Returning...' : 'Borrowing...') : (isBorrowed ? 'RETURN' : 'BORROW')}
            </button>

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