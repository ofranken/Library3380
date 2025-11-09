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

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});