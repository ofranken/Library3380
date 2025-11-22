import React, { useMemo } from 'react';
import './EnvelopeNotification.css';

function EnvelopeNotification({ message, bookDetails, onClose, type = 'borrow' }) {
  // Calculate due date (14 days from today) for borrow receipts - MUST be before early return
  const dueDate = useMemo(() => {
    if (type === 'borrow') {
      const today = new Date();
      const due = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
      return due.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return null;
  }, [type]);

  if (!message || !bookDetails) return null;

  // Extract book title and authors from bookDetails
  const bookTitle = bookDetails.title || bookDetails.Title || 'Unknown Title';
  const authors = bookDetails.authors || bookDetails.Authors || 'Unknown Author';
  const authorString = Array.isArray(authors) ? authors.join(', ') : authors;
  const format = bookDetails.Format_type || bookDetails.format || 'Unknown Format';
  
  // Get location - bookDetails.location should already be set correctly
  const location = bookDetails.location || 'Unknown Location';

  return (
    <div className="envelope-overlay" onClick={onClose}>
      <div className="envelope-container" onClick={(e) => e.stopPropagation()}>
        <button className="envelope-close-btn" onClick={onClose}>×</button>
        
        <div className="envelope">
          <div className="envelope-body">
            <div className="letter-content">
              {/* Header */}
              <div className="library-card-header">
                <div className="library-title">
                  {type === 'borrow' ? 'CHECKOUT SLIP' : 'RETURN RECEIPT'}
                </div>
                <div className="checkout-icon">
                  {type === 'borrow' ? '📚' : '✓'}
                </div>
              </div>

              {/* Status message */}
              <p className="notification-message">{message}</p>

              {/* Book details card */}
              <div className="book-details">
                <div className="detail-line">
                  <span className="detail-label">Title</span>
                  <span className="detail-value">{bookTitle}</span>
                </div>
                
                <div className="detail-line">
                  <span className="detail-label">Author</span>
                  <span className="detail-value">{authorString}</span>
                </div>
                
                <div className="detail-line">
                  <span className="detail-label">Format</span>
                  <span className="detail-value">{format}</span>
                </div>
                
                <div className="detail-line">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{location}</span>
                </div>

                {type === 'borrow' && dueDate && (
                  <div className="detail-line">
                    <span className="detail-label">Due Date</span>
                    <span className="detail-value">{dueDate}</span>
                  </div>
                )}
              </div>

              {/* Vintage card footer line */}
              <div className="library-card-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnvelopeNotification;