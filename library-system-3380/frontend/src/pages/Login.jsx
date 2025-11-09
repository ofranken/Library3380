import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import lilyLogo from '../images/Lily of the Valley Blockprint Logo.png';
import authService from '../services/authService';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    pin: ''
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (formData.studentId.length > 20) {
      newErrors.studentId = 'Student ID must be 20 characters or less';
    }

    if (!formData.pin) {
      newErrors.pin = 'PIN is required';
    } else if (!/^\d{4}$/.test(formData.pin)) {
      newErrors.pin = 'PIN must be exactly 4 digits';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await authService.login(formData.studentId, formData.pin);
        
        // Show success message
        console.log('Login successful:', response);
        
        // Redirect to home or dashboard
        navigate('/my-shelf');
      } catch (error) {
        setErrors({
          general: error.message || 'Login failed. Please check your credentials.'
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left-section">
          <div className="auth-branding">
            <div className="auth-logo-container">
              <img src={lilyLogo} alt="Lily Logo" className="auth-lily-logo" />
              <h1 className="auth-logo">Procure</h1>
            </div>
            <p className="auth-tagline">Your Digital Library Companion</p>
          </div>
        </div>

        <div className="auth-right-section">
          <div className="auth-form-container">
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-description">
              Access your account to explore, manage, and review books on your bookshelf.
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {errors.general && (
                <div className="general-error-message">
                  {errors.general}
                </div>
              )}
              
              <div className="form-field">
                <label htmlFor="studentId" className="form-label">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  className={`form-input ${errors.studentId ? 'input-error' : ''}`}
                  placeholder="Enter your Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  maxLength={20}
                />
                {errors.studentId && <span className="error-message">{errors.studentId}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="pin" className="form-label">
                  PIN
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPin ? 'text' : 'password'}
                    id="pin"
                    name="pin"
                    className={`form-input ${errors.pin ? 'input-error' : ''}`}
                    placeholder="Enter your 4-digit PIN"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength={4}
                    pattern="\d*"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPin(!showPin)}
                    aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.pin && <span className="error-message">{errors.pin}</span>}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-redirect">
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;