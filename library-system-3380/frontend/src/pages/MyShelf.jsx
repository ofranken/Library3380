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
  const [borrowedBooks, setBorrowedBooks] = useState([]); // ✅ NEW STATE
  const [classReadings, setClassReadings] = useState({});
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const getAuthToken = () => localStorage.getItem('token');

  // Fetch user name
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/user/name`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setUserName(data.name);
      } catch (err) {
        console.error('Error fetching user name:', err);
      }
    };
    fetchUserName();
  }, []);

  // Fetch available classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE_URL}/classes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const formatted = data.classes.map(cls => ({
            classId: cls.Class_ID,
            department: cls.Department,
            number: cls.Number,
            title: cls.Class_title,
            code: `${cls.Department}${cls.Number}`,
            display: `${cls.Department}${cls.Number} - ${cls.Class_title}`
          }));
          setAvailableClasses(formatted);
        }
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    fetchClasses();
  }, []);

  // Fetch enrolled classes
  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE_URL}/user/enrolled-classes`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.classes) {
          const formatted = data.classes.map(cls => ({
            classId: cls.Class_ID,
            department: cls.Department,
            number: cls.Number,
            title: cls.Class_title,
            code: `${cls.Department}${cls.Number}`,
            display: `${cls.Department}${cls.Number} - ${cls.Class_title}`
          }));
          setSelectedClasses(formatted);
          formatted.forEach(cls => fetchClassReadings(cls.classId));
        }
      } catch (err) {
        console.error('Error fetching enrolled classes:', err);
      }
    };
    fetchEnrolledClasses();
  }, []);

  // Fetch TBR
  useEffect(() => {
    const fetchTbr = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE_URL}/user/tbr`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const formatted = data.books.map(b => ({
            id: b.ISBN,
            isbn: b.ISBN,
            title: b.Title,
            author: b.Authors || 'Unknown Author',
            coverImage: `/images/${b.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
          }));
          setTbrBooks(formatted);
        }
      } catch (err) {
        console.error('Error fetching TBR:', err);
      }
    };
    fetchTbr();
  }, []);

  // ✅ Fetch Borrowed Books
  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE_URL}/user/borrows`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const formatted = data.books.map(b => ({
            id: b.ISBN,
            isbn: b.ISBN,
            title: b.Title,
            author: b.Authors || 'Unknown Author',
            coverImage: `/images/${b.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
          }));
          setBorrowedBooks(formatted);
        }
      } catch (err) {
        console.error('Error fetching borrowed books:', err);
      }
    };
    fetchBorrowed();
  }, []);

  // Fetch reviewed books
  useEffect(() => {
    const fetchReviewed = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`${API_BASE_URL}/user/reviews`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          const formatted = data.books.map(b => ({
            id: b.ISBN,
            isbn: b.ISBN,
            title: b.Title,
            author: b.Authors || 'Unknown Author',
            coverImage: `/images/${b.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`,
            rating: b.Out_of_five_stars
          }));
          setReadBooks(formatted);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviewed books:', err);
        setLoading(false);
      }
    };
    fetchReviewed();
  }, []);

  // Fetch readings for a class
  const fetchClassReadings = async (classId) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE_URL}/classes/${classId}/required`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.books.length > 0) {
        const formatted = data.books.map(b => ({
          id: b.ISBN,
          isbn: b.ISBN,
          title: b.Title,
          author: b.Authors || 'Unknown Author',
          coverImage: `/images/${b.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
        }));
        setClassReadings(prev => ({
          ...prev,
          [classId]: {
            books: formatted,
            shelfTitle: `${data.books[0].Department}${data.books[0].Number}: ${data.books[0].Class_title} - Required Readings`
          }
        }));
      }
    } catch (err) {
      console.error('Error fetching class readings:', err);
    }
  };

  // Filtering/search logic
  useEffect(() => {
    if (!searchInput.trim()) {
      setFilteredClasses([]);
      setShowDropdown(false);
    } else {
      const filtered = availableClasses.filter(cls =>
        cls.display.toLowerCase().includes(searchInput.toLowerCase()) &&
        !selectedClasses.some(sel => sel.classId === cls.classId)
      );
      setFilteredClasses(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchInput, availableClasses, selectedClasses]);

  const handleSearchChange = e => setSearchInput(e.target.value);
  const handleKeyPress = e => {
    if (e.key === 'Enter' && searchInput.trim() !== '') {
      const match = availableClasses.find(cls =>
        cls.display.toLowerCase() === searchInput.toLowerCase() ||
        cls.code.toLowerCase() === searchInput.toLowerCase()
      );
      if (match && !selectedClasses.some(sel => sel.classId === match.classId)) {
        addClass(match);
      } else if (filteredClasses.length > 0) {
        addClass(filteredClasses[0]);
      }
    }
  };

  const addClass = async (cls) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE_URL}/user/enroll-class`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ classId: cls.classId })
      });
      const data = await res.json();
      if (data.success) {
        setSelectedClasses([...selectedClasses, cls]);
        setSearchInput('');
        setShowDropdown(false);
        fetchClassReadings(cls.classId);
      }
    } catch (err) {
      console.error('Error adding class:', err);
    }
  };

  const removeClass = async (classId) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE_URL}/user/unenroll-class/${classId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSelectedClasses(selectedClasses.filter(c => c.classId !== classId));
        setClassReadings(prev => {
          const copy = { ...prev };
          delete copy[classId];
          return copy;
        });
      }
    } catch (err) {
      console.error('Error removing class:', err);
    }
  };

  const handleBookClick = isbn => navigate(`/book/${isbn}`);

  const renderStars = rating =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i + 1 <= rating ? 'filled' : 'empty'}`}>★</span>
    ));

  const BookCard = ({ book, showRating }) => (
    <div className="dedicated-book-card" onClick={() => handleBookClick(book.isbn)} style={{ cursor: 'pointer' }}>
      <div className="book-spine"></div>
      <img
        src={book.coverImage}
        alt={book.title}
        className="book-card-cover"
        onError={e => { e.target.src = 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=No+Cover'; }}
      />
      <div className="book-card-info">
        <h4 className="book-card-titling">{book.title}</h4>
        <p className="book-card-author">{book.author}</p>
        {showRating && book.rating && <div className="book-card-rating">{renderStars(book.rating)}</div>}
      </div>
    </div>
  );

  const Bookshelf = ({ title, books, showRating }) => (
    <div className="bookshelf-container">
      <h2 className="shelf-title">{title}</h2>
      <div className="bookshelf">
        <div className="shelf-top"></div>
        <div className="books-row">
          {books.length ? books.map(b => <BookCard key={b.id} book={b} showRating={showRating} />)
            : <div className="empty-shelf-message">No books on this shelf yet</div>}
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

          {/* ✅ My Classes at Top */}
          <div className="class-management-section">
            <h2 className="section-title">My Classes</h2>
            <p className="section-description">Add classes to see their required readings on your shelf</p>

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
                        onClick={() => addClass(cls)}
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
                    <button className="class-tag-remove" onClick={() => removeClass(cls.classId)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ✅ Shelves Below */}
          <div className="shelves-section">
            <Bookshelf title="Borrowed Books" books={borrowedBooks} />
            <Bookshelf title="Personal TBR" books={tbrBooks} />
            <Bookshelf title="Read Books" books={readBooks} showRating />
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
