import React, { useState, useEffect } from 'react';
import './MyShelf.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyShelf() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Sample data - replace with actual database queries
  const [readBooks, setReadBooks] = useState([
    {
      id: 1,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Book+1',
      rating: 5,
      isbn: '978-0-061120-08-4'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Book+2',
      rating: 4,
      isbn: '978-0-452284-23-4'
    },
    {
      id: 3,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Book+3',
      rating: 5,
      isbn: '978-0-141439-51-8'
    }
  ]);

  const [tbrBooks, setTbrBooks] = useState([
    {
      id: 4,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Book+4',
      isbn: '978-0-743273-56-5'
    },
    {
      id: 5,
      title: 'Moby Dick',
      author: 'Herman Melville',
      coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Book+5',
      isbn: '978-0-142437-24-7'
    }
  ]);

  // Sample class data with required readings - replace with database query
  const classesData = {
    'ENG301': {
      name: 'American Literature',
      code: 'ENG301',
      requiredReadings: [
        {
          id: 10,
          title: 'The Scarlet Letter',
          author: 'Nathaniel Hawthorne',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Scarlet',
          isbn: '978-0-142437-26-1'
        },
        {
          id: 11,
          title: 'The Adventures of Huckleberry Finn',
          author: 'Mark Twain',
          coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Huck+Finn',
          isbn: '978-0-486280-61-7'
        },
        {
          id: 12,
          title: 'Their Eyes Were Watching God',
          author: 'Zora Neale Hurston',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Eyes',
          isbn: '978-0-060838-67-6'
        }
      ]
    },
    'HIST202': {
      name: 'World History II',
      code: 'HIST202',
      requiredReadings: [
        {
          id: 20,
          title: 'A People\'s History',
          author: 'Howard Zinn',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=History',
          isbn: '978-0-060838-55-3'
        },
        {
          id: 21,
          title: 'Guns, Germs, and Steel',
          author: 'Jared Diamond',
          coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Guns',
          isbn: '978-0-393317-55-2'
        }
      ]
    },
    'PHI101': {
      name: 'Introduction to Philosophy',
      code: 'PHI101',
      requiredReadings: [
        {
          id: 30,
          title: 'Meditations',
          author: 'Marcus Aurelius',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Meditations',
          isbn: '978-0-140449-33-4'
        },
        {
          id: 31,
          title: 'The Republic',
          author: 'Plato',
          coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Republic',
          isbn: '978-0-140455-11-3'
        },
        {
          id: 32,
          title: 'Beyond Good and Evil',
          author: 'Friedrich Nietzsche',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Nietzsche',
          isbn: '978-0-679724-65-6'
        }
      ]
    },
    'BIO205': {
      name: 'Ecology and Evolution',
      code: 'BIO205',
      requiredReadings: [
        {
          id: 40,
          title: 'The Origin of Species',
          author: 'Charles Darwin',
          coverImage: 'https://via.placeholder.com/120x180/8B4513/FFFFFF?text=Darwin',
          isbn: '978-0-451529-06-9'
        },
        {
          id: 41,
          title: 'Silent Spring',
          author: 'Rachel Carson',
          coverImage: 'https://via.placeholder.com/120x180/654321/FFFFFF?text=Spring',
          isbn: '978-0-618249-06-0'
        }
      ]
    }
  };

  // Initialize available classes from classesData
  useEffect(() => {
    const classes = Object.values(classesData).map(cls => ({
      code: cls.code,
      name: cls.name,
      display: `${cls.code} - ${cls.name}`
    }));
    setAvailableClasses(classes);
  }, []);

  // Filter classes based on search input
  useEffect(() => {
    if (searchInput.trim() === '') {
      setFilteredClasses([]);
      setShowDropdown(false);
    } else {
      const filtered = availableClasses.filter(cls =>
        cls.display.toLowerCase().includes(searchInput.toLowerCase()) &&
        !selectedClasses.some(selected => selected.code === cls.code)
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
      
      if (exactMatch && !selectedClasses.some(selected => selected.code === exactMatch.code)) {
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
  };

  const removeClass = (classCode) => {
    setSelectedClasses(selectedClasses.filter(cls => cls.code !== classCode));
  };

  const selectClassFromDropdown = (classItem) => {
    addClass(classItem);
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
    <div className="book-card">
      <div className="book-spine"></div>
      <img src={book.coverImage} alt={book.title} className="book-card-cover" />
      <div className="book-card-info">
        <h4 className="book-card-title">{book.title}</h4>
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

  return (
    <div>
      <Navbar />
      
      <div className="my-shelf-page">
        <div className="my-shelf-container">
          <h1 className="page-title">My Bookshelf</h1>
          
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
                        key={cls.code}
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
                  <div key={cls.code} className="class-tag">
                    <span className="class-tag-text">{cls.code}</span>
                    <button
                      className="class-tag-remove"
                      onClick={() => removeClass(cls.code)}
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
              const classData = classesData[cls.code];
              return classData ? (
                <Bookshelf
                  key={cls.code}
                  title={`${cls.code} - Required Readings`}
                  books={classData.requiredReadings}
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