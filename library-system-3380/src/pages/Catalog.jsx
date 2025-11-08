import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Catalog.css';

function Catalog() {
  // Filter state
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Filter options
  const genres = ['Fiction', 'Non-Fiction', 'Classics', 'Mystery', 'Horror', 'Romance', 'Science Fiction', 'Fantasy', 'Young Adult', 'Biography', 'History'];
  const formats = ['Hardcopy', 'E-Book'];
  const ratings = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, 0.5];

  // Placeholder book data - will be replaced with MySQL data later
  const placeholderBooks = [
    {
      id: 1,
      coverImage: 'https://via.placeholder.com/300x450/A28C75/FFFFFF?text=Book+1',
      title: 'The Great Adventure',
      authors: ['John Smith'],
      rating: 4.5,
      genre: 'Fiction',
      format: 'Hardcopy'
    },
    {
      id: 2,
      coverImage: 'https://via.placeholder.com/300x450/6C5141/FFFFFF?text=Book+2',
      title: 'Mystery of the Night',
      authors: ['Jane Doe'],
      rating: 4,
      genre: 'Mystery',
      format: 'E-Book'
    },
    {
      id: 3,
      coverImage: 'https://via.placeholder.com/300x450/7C2220/FFFFFF?text=Book+3',
      title: 'Science and Beyond',
      authors: ['Dr. Alan Roberts'],
      rating: 5,
      genre: 'Non-Fiction',
      format: 'Hardcopy'
    },
    {
      id: 4,
      coverImage: 'https://via.placeholder.com/300x450/5F2119/FFFFFF?text=Book+4',
      title: 'Love in Paris',
      authors: ['Emma Wilson'],
      rating: 3.5,
      genre: 'Romance',
      format: 'E-Book'
    },
    {
      id: 5,
      coverImage: 'https://via.placeholder.com/300x450/A28C75/FFFFFF?text=Book+5',
      title: 'The Last Frontier',
      authors: ['Michael Chang'],
      rating: 4.5,
      genre: 'Science Fiction',
      format: 'Hardcopy'
    },
    {
      id: 6,
      coverImage: 'https://via.placeholder.com/300x450/6C5141/FFFFFF?text=Book+6',
      title: 'Dragon Tales',
      authors: ['Sarah Miller'],
      rating: 4,
      genre: 'Fantasy',
      format: 'E-Book'
    },
    {
      id: 7,
      coverImage: 'https://via.placeholder.com/300x450/7C2220/FFFFFF?text=Book+7',
      title: 'Life of Churchill',
      authors: ['Richard Brown'],
      rating: 4.5,
      genre: 'Biography',
      format: 'Hardcopy'
    },
    {
      id: 8,
      coverImage: 'https://via.placeholder.com/300x450/5F2119/FFFFFF?text=Book+8',
      title: 'Ancient Civilizations',
      authors: ['Dr. Lisa Anderson'],
      rating: 5,
      genre: 'History',
      format: 'E-Book'
    },
    {
      id: 9,
      coverImage: 'https://via.placeholder.com/300x450/A28C75/FFFFFF?text=Book+9',
      title: 'The Silent Witness',
      authors: ['James Patterson'],
      rating: 3.5,
      genre: 'Mystery',
      format: 'Hardcopy'
    },
    {
      id: 10,
      coverImage: 'https://via.placeholder.com/300x450/6C5141/FFFFFF?text=Book+10',
      title: 'Modern Art Explained',
      authors: ['Victoria Stevens'],
      rating: 4,
      genre: 'Non-Fiction',
      format: 'E-Book'
    },
    {
      id: 11,
      coverImage: 'https://via.placeholder.com/300x450/7C2220/FFFFFF?text=Book+11',
      title: 'Starship Journey',
      authors: ['Alex Turner'],
      rating: 4.5,
      genre: 'Science Fiction',
      format: 'Hardcopy'
    },
    {
      id: 12,
      coverImage: 'https://via.placeholder.com/300x450/5F2119/FFFFFF?text=Book+12',
      title: 'Enchanted Forest',
      authors: ['Maya Rodriguez'],
      rating: 5,
      genre: 'Fantasy',
      format: 'E-Book'
    }
  ];

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

  // Filter books based on selections
  const filteredBooks = placeholderBooks.filter(book => {
    const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    const formatMatch = selectedFormats.length === 0 || selectedFormats.includes(book.format);
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(book.rating);
    return genreMatch && formatMatch && ratingMatch;
  });

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
      <Navbar/>

      
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Explore the Full Catalog...</h1>
        <p className="book-count">There are {filteredBooks.length} books available for your selection</p>
      </div>

      <div className="catalog-container">
        <aside className="filter-sidebar">
          <div className="filter-section">
            <h3>Genre</h3>
            {genres.map(genre => (
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
            <h3>Format</h3>
            {formats.map(format => (
              <label key={format} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => toggleFormat(format)}
                />
                <span>{format}</span>
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
            <div key={book.id} className="book-card">
              <img src={book.coverImage} alt={book.title} className="book-card-image" />
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

    <Footer/>
    </div>
  );
}

export default Catalog;