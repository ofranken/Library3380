import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyShelf.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyShelf() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState('');
  const [readBooks, setReadBooks] = useState([]);
  const [tbrBooks, setTbrBooks] = useState([]);
  const [classReadings, setClassReadings] = useState({});
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch user's name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/name`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setUserName(data.name);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  // Fetch all available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/classes`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          const formattedClasses = data.classes.map(cls => ({
            classId: cls.Class_ID,
            department: cls.Department,
            number: cls.Number,
            title: cls.Class_title,
            code: `${cls.Department}${cls.Number}`,
            display: `${cls.Department}${cls.Number} - ${cls.Class_title}`
          }));
          setAvailableClasses(formattedClasses);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch user's TBR books
  useEffect(() => {
    const fetchTbrBooks = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/tbr`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          const formattedBooks = data.books.map(book => ({
            id: book.ISBN,
            isbn: book.ISBN,
            title: book.Title,
            author: book.Authors || 'Unknown Author',
            coverImage: `/images/${book.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
          }));
          setTbrBooks(formattedBooks);
        }
      } catch (error) {
        console.error('Error fetching TBR books:', error);
      }
    };
    fetchTbrBooks();
  }, []);

  // Fetch user's reviewed books
  useEffect(() => {
    const fetchReviewedBooks = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/reviews`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          const formattedBooks = data.books.map(book => ({
            id: book.ISBN,
            isbn: book.ISBN,
            title: book.Title,
            author: book.Authors || 'Unknown Author',
            coverImage: `/images/${book.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`,
            rating: book.Out_of_five_stars
          }));
          setReadBooks(formattedBooks);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviewed books:', error);
        setLoading(false);
      }
    };
    fetchReviewedBooks();
  }, []);

  // Fetch required readings when a class is selected
  const fetchClassReadings = async (classId, classInfo) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/classes/${classId}/required`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success && data.books.length > 0) {
        const formattedBooks = data.books.map(book => ({
          id: book.ISBN,
          isbn: book.ISBN,
          title: book.Title,
          author: book.Authors || 'Unknown Author',
          coverImage: `/images/${book.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
        }));
        
        setClassReadings(prev => ({
          ...prev,
          [classId]: {
            books: formattedBooks,
            shelfTitle: `${data.books[0].Department}${data.books[0].Number}: ${data.books[0].Class_title} - Required Readings`
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching class readings:', error);
    }
  };

  // Filter classes based on search input
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredClasses([]);
      setShowDropdown(false);
    } else {
      const filtered = availableClasses.filter(cls =>
        cls.display.toLowerCase().includes(searchInput.toLowerCase()) &&
        !selectedClasses.some(selected => selected.classId === cls.classId)
      );
      setFilteredClasses(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchInput, availableClasses, selectedClasses]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      const exactMatch = availableClasses.find(cls =>
        cls.display.toLowerCase() === searchInput.toLowerCase() ||
        cls.code.toLowerCase() === searchInput.toLowerCase()
      );
      
      if (exactMatch && !selectedClasses.some(selected => selected.classId === exactMatch.classId)) {
        addClass(exactMatch);
      } else if (filteredClasses.length > 0) {
        addClass(filteredClasses[0]);
      }
    }
  };

  const addClass = (classItem) => {
    setSelectedClasses([...selectedClasses, classItem]);
    setSearchInput('');
    setShowDropdown(false);
    fetchClassReadings(classItem.classId, classItem);
  };

  const removeClass = (classId) => {
    setSelectedClasses(selectedClasses.filter(cls => cls.classId !== classId));
    setClassReadings(prev => {
      const newReadings = { ...prev };
      delete newReadings[classId];
      return newReadings;
    });
  };

  const selectClassFromDropdown = (classItem) => {
    addClass(classItem);
  };

  const handleBookClick = (isbn) => {
    navigate(`/book/${isbn}`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  const BookCard = ({ book, showRating = false }) => (
    <div 
      className="dedicated-book-card" 
      onClick={() => handleBookClick(book.isbn)}
      style={{ cursor: 'pointer' }}
    >
      <div className="book-spine"></div>
      <img 
        src={book.coverImage} 
        alt={book.title} 
        className="book-card-cover"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=No+Cover';
        }}
      />
      <div className="book-card-info">
        <h4 className="book-card-titling">{book.title}</h4>
        <p className="book-card-author">{book.author}</p>
        {showRating && book.rating && (
          <div className="book-card-rating">
            {renderStars(book.rating)}
          </div>
        )}
      </div>
    </div>
  );

  const Bookshelf = ({ title, books, showRating = false }) => (
    <div className="bookshelf-container">
      <h2 className="shelf-title">{title}</h2>
      <div className="bookshelf">
        <div className="shelf-top"></div>
        <div className="books-row">
          {books.length > 0 ? (
            books.map(book => <BookCard key={book.id} book={book} showRating={showRating} />)
          ) : (
            <div className="empty-shelf-message">No books on this shelf yet</div>
          )}
        </div>
        <div className="shelf-bottom"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="my-shelf-page">
          <div className="my-shelf-container">
            <p>Loading your bookshelf...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="my-shelf-page">
        <div className="my-shelf-container">
          <h1 className="page-title">My Bookshelf</h1>
          <div className="user-name-div">
             <h2 className="user-name">🕮 --- ❀ --- 🕮</h2>
             <h2 className="user-name">{userName || 'Loading...'}</h2>
          </div>
          
          {/* Class Management Section */}
          <div className="class-management-section">
            <h2 className="section-title">My Classes</h2>
            <p className="section-description">
              Add classes to see their required readings on your shelf
            </p>
            
            <div className="class-search-container">
              <div className="search-input-wrapper">
                <input
                  type="text"
                  className="class-search-input"
                  placeholder="Search for a class (e.g., ENG301 or American Literature)..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  onKeyPress={handleKeyPress}
                  onFocus={() => searchInput && setShowDropdown(true)}
                />
                
                {showDropdown && (
                  <div className="class-dropdown">
                    {filteredClasses.map(cls => (
                      <div
                        key={cls.classId}
                        className="class-dropdown-item"
                        onClick={() => selectClassFromDropdown(cls)}
                      >
                        {cls.display}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="selected-classes">
                {selectedClasses.map(cls => (
                  <div key={cls.classId} className="class-tag">
                    <span className="class-tag-text">{cls.code}</span>
                    <button
                      className="class-tag-remove"
                      onClick={() => removeClass(cls.classId)}
                      aria-label={`Remove ${cls.code}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Personal Shelves */}
          <div className="shelves-section">
            <Bookshelf title="Personal TBR" books={tbrBooks} />
            <Bookshelf title="Read Books" books={readBooks} showRating={true} />
            
            {/* Class Required Readings Shelves */}
            {selectedClasses.map(cls => {
              const readings = classReadings[cls.classId];
              return readings ? (
                <Bookshelf
                  key={cls.classId}
                  title={readings.shelfTitle}
                  books={readings.books}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default MyShelf;