// server.js - Backend API Server
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'procure_library',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisify pool for async/await
const promisePool = pool.promise();

// JWT Secret (store in .env file in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
  connection.release();
});

// ==================== AUTH ROUTES ====================

// SIGNUP endpoint
app.post('/api/auth/signup', async (req, res) => {
  const { studentId, pin, firstName, lastName, email, phone } = req.body;

  // Validation
  if (!studentId || !pin || !firstName || !lastName || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'All required fields must be provided' 
    });
  }

  // Validate PIN is 4 digits
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ 
      success: false, 
      message: 'PIN must be exactly 4 digits' 
    });
  }

  // Validate Student ID length
  if (studentId.length > 20) {
    return res.status(400).json({ 
      success: false, 
      message: 'Student ID must be 20 characters or less' 
    });
  }

  try {
    // Check if Student ID already exists
    const [existingStudent] = await promisePool.query(
      'SELECT Student_ID FROM STUDENT WHERE Student_ID = ?',
      [studentId]
    );

    if (existingStudent.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Student ID already exists' 
      });
    }

    // Check if email already exists
    const [existingEmail] = await promisePool.query(
      'SELECT Email FROM STUDENT WHERE Email = ?',
      [email]
    );

    if (existingEmail.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Insert new student - PIN stored directly (not hashed)
    await promisePool.query(
      'INSERT INTO STUDENT (Student_ID, Pin, Fname, Lname, Email, Phone) VALUES (?, ?, ?, ?, ?, ?)',
      [studentId, pin, firstName, lastName, email, phone || null]
    );

    // Generate JWT token
    const token = jwt.sign(
      { studentId, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        studentId,
        firstName,
        lastName,
        email
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during signup' 
    });
  }
});

// LOGIN endpoint
app.post('/api/auth/login', async (req, res) => {
  const { studentId, pin } = req.body;

  // Validation
  if (!studentId || !pin) {
    return res.status(400).json({ 
      success: false, 
      message: 'Student ID and PIN are required' 
    });
  }

  try {
    // Find student by Student ID
    const [students] = await promisePool.query(
      'SELECT Student_ID, Pin, Fname, Lname, Email FROM STUDENT WHERE Student_ID = ?',
      [studentId]
    );

    if (students.length === 0) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Student ID or PIN' 
      });
    }

    const student = students[0];

    // Compare PIN directly (not hashed)
    if (pin !== student.Pin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Student ID or PIN' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { studentId: student.Student_ID, email: student.Email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        studentId: student.Student_ID,
        firstName: student.Fname,
        lastName: student.Lname,
        email: student.Email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Protected route example - Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [students] = await promisePool.query(
      'SELECT Student_ID, Fname, Lname, Email, Phone, Created_At, Last_Login FROM STUDENT WHERE Student_ID = ?',
      [req.user.studentId]
    );

    if (students.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user: students[0]
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching profile' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ==================== BOOK CATALOG ROUTES ====================

// Get all books for catalog with filters
app.get('/api/books', async (req, res) => {
  try {
    const { genres, formats, ratings } = req.query;

    let query = `
      SELECT DISTINCT
        b.ISBN,
        b.Title,
        b.Description,
        GROUP_CONCAT(DISTINCT ba.Author SEPARATOR ', ') as Authors,
        COALESCE(AVG(r.Out_of_five_stars), 3.0) as Average_Rating,
        GROUP_CONCAT(DISTINCT bg.Genre SEPARATOR ', ') as Genres
      FROM BOOK b
      LEFT JOIN BOOK_AUTHOR ba ON b.ISBN = ba.ISBN
      LEFT JOIN REVIEWS r ON b.ISBN = r.ISBN
      LEFT JOIN BOOK_GENRE bg ON b.ISBN = bg.ISBN
    `;

    const conditions = [];
    const params = [];

    // Filter by genres if provided
    if (genres) {
      const genreList = Array.isArray(genres) ? genres : [genres];
      conditions.push(`bg.Genre IN (${genreList.map(() => '?').join(',')})`);
      params.push(...genreList);
    }

    // Filter by ratings if provided
    if (ratings) {
      const ratingList = Array.isArray(ratings) ? ratings : [ratings];
      conditions.push(`COALESCE(AVG(r.Out_of_five_stars), 3.0) >= ?`);
      params.push(Math.min(...ratingList.map(Number)));
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY b.ISBN, b.Title, b.Description ORDER BY b.Title';

    const [books] = await promisePool.query(query, params);

    res.status(200).json({
      success: true,
      books: books.map(book => ({
        isbn: book.ISBN,
        title: book.Title,
        description: book.Description,
        authors: book.Authors ? book.Authors.split(', ') : [],
        rating: parseFloat(book.Average_Rating).toFixed(1),
        genres: book.Genres ? book.Genres.split(', ') : [],
        coverImage: `/images/${book.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`
      }))
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching books' 
    });
  }
});

// Get single book details by ISBN
app.get('/api/books/:isbn', async (req, res) => {
  const { isbn } = req.params;

  try {
    // Get book basic info
    const [books] = await promisePool.query(
      'SELECT ISBN, Title, Description FROM BOOK WHERE ISBN = ?',
      [isbn]
    );

    if (books.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Book not found' 
      });
    }

    const book = books[0];

    // Get authors
    const [authors] = await promisePool.query(
      'SELECT Author FROM BOOK_AUTHOR WHERE ISBN = ?',
      [isbn]
    );

    // Get genres
    const [genres] = await promisePool.query(
      'SELECT Genre FROM BOOK_GENRE WHERE ISBN = ?',
      [isbn]
    );

    // Get average rating
    const [ratingResult] = await promisePool.query(
      'SELECT COALESCE(AVG(Out_of_five_stars), 3.0) as Average_Rating, COUNT(*) as Review_Count FROM REVIEWS WHERE ISBN = ?',
      [isbn]
    );

    // Get availability by location and format
    const [availability] = await promisePool.query(
      `SELECT l.Name, f.Format_type, f.Quantity, l.Location_ID
       FROM FORMAT f
       JOIN LOCATION l ON f.Location_ID = l.Location_ID
       WHERE f.ISBN = ?`,
      [isbn]
    );

    res.status(200).json({
      success: true,
      book: {
        isbn: book.ISBN,
        title: book.Title,
        description: book.Description,
        authors: authors.map(a => a.Author),
        genres: genres.map(g => g.Genre),
        rating: parseFloat(ratingResult[0].Average_Rating).toFixed(1),
        reviewCount: ratingResult[0].Review_Count,
        coverImage: `/images/${book.Title.replace(/\s+/g, '_').replace(/:/g, '')}.jpg`,
        availability: availability
      }
    });

  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching book details' 
    });
  }
});

// Check if book is in user's TBR wishlist
app.get('/api/tbr/check/:isbn', authenticateToken, async (req, res) => {
  const { isbn } = req.params;
  const studentId = req.user.studentId;

  try {
    const [result] = await promisePool.query(
      'SELECT * FROM TBR_WISHLIST WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    res.status(200).json({
      success: true,
      inWishlist: result.length > 0
    });

  } catch (error) {
    console.error('Error checking TBR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error checking wishlist' 
    });
  }
});

// Add book to TBR wishlist
app.post('/api/tbr/add', authenticateToken, async (req, res) => {
  const { isbn } = req.body;
  const studentId = req.user.studentId;

  try {
    // Check if already in wishlist
    const [existing] = await promisePool.query(
      'SELECT * FROM TBR_WISHLIST WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ 
        success: false, 
        message: 'Book already in wishlist' 
      });
    }

    await promisePool.query(
      'INSERT INTO TBR_WISHLIST (ISBN, Student_ID) VALUES (?, ?)',
      [isbn, studentId]
    );

    res.status(201).json({
      success: true,
      message: 'Book added to wishlist'
    });

  } catch (error) {
    console.error('Error adding to TBR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error adding to wishlist' 
    });
  }
});

// Remove book from TBR wishlist
app.delete('/api/tbr/remove/:isbn', authenticateToken, async (req, res) => {
  const { isbn } = req.params;
  const studentId = req.user.studentId;

  try {
    await promisePool.query(
      'DELETE FROM TBR_WISHLIST WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    res.status(200).json({
      success: true,
      message: 'Book removed from wishlist'
    });

  } catch (error) {
    console.error('Error removing from TBR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error removing from wishlist' 
    });
  }
});

// Get user's review for a book
app.get('/api/reviews/:isbn', authenticateToken, async (req, res) => {
  const { isbn } = req.params;
  const studentId = req.user.studentId;

  try {
    const [reviews] = await promisePool.query(
      'SELECT Out_of_five_stars FROM REVIEWS WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    res.status(200).json({
      success: true,
      review: reviews.length > 0 ? reviews[0] : null
    });

  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching review' 
    });
  }
});

// Add or update review
app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { isbn, rating } = req.body;
  const studentId = req.user.studentId;

  if (!isbn || !rating || rating < 0 || rating > 5) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid ISBN or rating' 
    });
  }

  try {
    // Check if review exists
    const [existing] = await promisePool.query(
      'SELECT * FROM REVIEWS WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    if (existing.length > 0) {
      // Update existing review
      await promisePool.query(
        'UPDATE REVIEWS SET Out_of_five_stars = ? WHERE ISBN = ? AND Student_ID = ?',
        [rating, isbn, studentId]
      );
    } else {
      // Insert new review
      await promisePool.query(
        'INSERT INTO REVIEWS (Student_ID, ISBN, Out_of_five_stars) VALUES (?, ?, ?)',
        [studentId, isbn, rating]
      );
    }

    res.status(200).json({
      success: true,
      message: 'Review submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error submitting review' 
    });
  }
});

// Delete review (Mark as unread)
app.delete('/api/reviews/:isbn', authenticateToken, async (req, res) => {
  const { isbn } = req.params;
  const studentId = req.user.studentId;

  try {
    await promisePool.query(
      'DELETE FROM REVIEWS WHERE ISBN = ? AND Student_ID = ?',
      [isbn, studentId]
    );

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting review' 
    });
  }
});

// Get all classes
app.get('/api/classes', authenticateToken, async (req, res) => {
  try {
    const [classes] = await promisePool.query(
      'SELECT Class_ID, Department, Number, Class_title FROM CLASS ORDER BY Department, Number'
    );
    res.json({ success: true, classes });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ success: false, message: 'Error fetching classes' });
  }
});

// Get user’s TBR books
app.get('/api/user/tbr', authenticateToken, async (req, res) => {
  try {
    const [books] = await promisePool.query(`
      SELECT b.ISBN, b.Title, GROUP_CONCAT(DISTINCT ba.Author SEPARATOR ', ') AS Authors
      FROM TBR_WISHLIST t
      JOIN BOOK b ON t.ISBN = b.ISBN
      LEFT JOIN BOOK_AUTHOR ba ON b.ISBN = ba.ISBN
      WHERE t.Student_ID = ?
      GROUP BY b.ISBN, b.Title
    `, [req.user.studentId]);
    res.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching TBR:', error);
    res.status(500).json({ success: false, message: 'Error fetching TBR' });
  }
});

// Get user’s reviewed books
app.get('/api/user/reviews', authenticateToken, async (req, res) => {
  try {
    const [books] = await promisePool.query(`
      SELECT b.ISBN, b.Title, GROUP_CONCAT(DISTINCT ba.Author SEPARATOR ', ') AS Authors, r.Out_of_five_stars
      FROM REVIEWS r
      JOIN BOOK b ON r.ISBN = b.ISBN
      LEFT JOIN BOOK_AUTHOR ba ON b.ISBN = ba.ISBN
      WHERE r.Student_ID = ?
      GROUP BY b.ISBN, b.Title, r.Out_of_five_stars
    `, [req.user.studentId]);
    res.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
});

// Get required readings for a class
app.get('/api/classes/:classId/required', authenticateToken, async (req, res) => {
  try {
    const [books] = await promisePool.query(`
      SELECT c.Department, c.Number, c.Class_title, b.ISBN, b.Title,
             GROUP_CONCAT(DISTINCT ba.Author SEPARATOR ', ') AS Authors
      FROM REQUIRES r
      JOIN CLASS c ON r.Class_ID = c.Class_ID
      JOIN BOOK b ON r.ISBN = b.ISBN
      LEFT JOIN BOOK_AUTHOR ba ON b.ISBN = ba.ISBN
      WHERE c.Class_ID = ?
      GROUP BY c.Department, c.Number, c.Class_title, b.ISBN, b.Title
    `, [req.params.classId]);
    res.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching required readings:', error);
    res.status(500).json({ success: false, message: 'Error fetching required readings' });
  }
});

// Get user’s name
app.get('/api/user/name', authenticateToken, async (req, res) => {
  try {
    const [result] = await promisePool.query(
      'SELECT Fname, Lname FROM STUDENT WHERE Student_ID = ?',
      [req.user.studentId]
    );
    if (result.length === 0) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, name: `${result[0].Fname} ${result[0].Lname}` });
  } catch (error) {
    console.error('Error fetching user name:', error);
    res.status(500).json({ success: false, message: 'Error fetching name' });
  }
});


// ==================== TAKES TABLE ROUTES (Class Enrollment) ====================

// Get user's enrolled classes from TAKES table
app.get('/api/user/enrolled-classes', authenticateToken, async (req, res) => {
  try {
    console.log('📚 Fetching enrolled classes for student:', req.user.studentId);
    
    const [classes] = await promisePool.query(`
      SELECT c.Class_ID, c.Department, c.Number, c.Class_title
      FROM TAKES t
      JOIN CLASS c ON t.Class_ID = c.Class_ID
      WHERE t.Student_ID = ?
      ORDER BY c.Department, c.Number
    `, [req.user.studentId]);
    
    console.log('📚 Found enrolled classes:', classes.length);
    
    res.json({ 
      success: true, 
      classes: classes || [] 
    });
  } catch (error) {
    console.error('❌ Error fetching enrolled classes:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching enrolled classes' 
    });
  }
});

// Enroll in a class (add to TAKES table)
app.post('/api/user/enroll-class', authenticateToken, async (req, res) => {
  const { classId } = req.body;
  const studentId = req.user.studentId;

  console.log('➕ Enrolling student', studentId, 'in class', classId);

  if (!classId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Class ID is required' 
    });
  }

  try {
    // Check if class exists
    const [classExists] = await promisePool.query(
      'SELECT Class_ID FROM CLASS WHERE Class_ID = ?',
      [classId]
    );

    if (classExists.length === 0) {
      console.log('❌ Class not found:', classId);
      return res.status(404).json({ 
        success: false, 
        message: 'Class not found' 
      });
    }

    // Check if already enrolled
    const [existing] = await promisePool.query(
      'SELECT * FROM TAKES WHERE Student_ID = ? AND Class_ID = ?',
      [studentId, classId]
    );

    if (existing.length > 0) {
      console.log('⚠️ Already enrolled in class:', classId);
      return res.status(409).json({ 
        success: false, 
        message: 'Already enrolled in this class' 
      });
    }

    // Enroll in class
    await promisePool.query(
      'INSERT INTO TAKES (Student_ID, Class_ID) VALUES (?, ?)',
      [studentId, classId]
    );

    console.log('✅ Successfully enrolled in class:', classId);

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in class'
    });

  } catch (error) {
    console.error('❌ Error enrolling in class:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error enrolling in class' 
    });
  }
});

// Unenroll from a class (remove from TAKES table)
app.delete('/api/user/unenroll-class/:classId', authenticateToken, async (req, res) => {
  const { classId } = req.params;
  const studentId = req.user.studentId;

  console.log('➖ Unenrolling student', studentId, 'from class', classId);

  try {
    // Delete from TAKES table
    const [result] = await promisePool.query(
      'DELETE FROM TAKES WHERE Student_ID = ? AND Class_ID = ?',
      [studentId, classId]
    );

    if (result.affectedRows === 0) {
      console.log('⚠️ Enrollment not found');
      return res.status(404).json({ 
        success: false, 
        message: 'Enrollment not found' 
      });
    }

    console.log('✅ Successfully unenrolled from class:', classId);

    res.status(200).json({
      success: true,
      message: 'Successfully unenrolled from class'
    });

  } catch (error) {
    console.error('❌ Error unenrolling from class:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error unenrolling from class' 
    });
  }
});

// ==================== USER BORROWED BOOKS ROUTE ====================
// Get all books currently borrowed by the logged-in user
app.get('/api/user/borrowed-books', authenticateToken, async (req, res) => {
  try {
    const [books] = await promisePool.query(`
      SELECT 
        b.ISBN, 
        b.Title, 
        GROUP_CONCAT(DISTINCT ba.Author SEPARATOR ', ') AS Authors,
        br.Borrow_date,
        br.Due_date,
        br.Returned
      FROM BORROWS br
      JOIN BOOK b ON br.ISBN = b.ISBN
      LEFT JOIN BOOK_AUTHOR ba ON b.ISBN = ba.ISBN
      WHERE br.Student_ID = ?
      GROUP BY b.ISBN, b.Title, br.Borrow_date, br.Due_date, br.Returned
      ORDER BY br.Borrow_date DESC
    `, [req.user.studentId]);

    res.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ success: false, message: 'Error fetching borrowed books' });
  }
});


// ==================== END OF TAKES TABLE ROUTES ====================
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});