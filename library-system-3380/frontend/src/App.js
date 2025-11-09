import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetail';
import MyShelf from './pages/MyShelf';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import './fonts/fonts.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book" element={<BookDetail />} />
          <Route path="/my-shelf" element={<MyShelf />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;