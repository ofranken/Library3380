import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import lilyLogo from '../images/Lily of the Valley Blockprint Logo.png';
import authService from '../services/authService';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pin: '',
    confirmPin: ''
  });

  const [errors, setErrors] = useState({});
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name must be 50 characters or less';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name must be 50 characters or less';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email must be 100 characters or less';
    }

    if (formData.phone && formData.phone.trim() !== '') {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        newErrors.phone = 'Phone must be 10 digits';
      } else if (formData.phone.length > 15) {
        newErrors.phone = 'Phone must be 15 characters or less';
      }
    }

    if (!formData.pin) {
      newErrors.pin = 'PIN is required';
    } else if (!/^\d{4}$/.test(formData.pin)) {
      newErrors.pin = 'PIN must be exactly 4 digits';
    }

    if (!formData.confirmPin) {
      newErrors.confirmPin = 'Please confirm your PIN';
    } else if (formData.pin !== formData.confirmPin) {
      newErrors.confirmPin = 'PINs do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await authService.signup(formData);
        
        // Show success message
        console.log('Signup successful:', response);
        
        // Redirect to home or dashboard
        navigate('/my-shelf');
      } catch (error) {
        setErrors({
          general: error.message || 'Signup failed. Please try again.'
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
      <div className="auth-container signup-container">
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
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-description">
              Sign up to save your search history for course booklists, review books, and manage your own digital bookshelf!
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

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    maxLength={50}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-input ${errors.lastName ? 'input-error' : ''}`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    maxLength={50}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={100}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="optional-label">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={15}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
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
                    placeholder="Create a 4-digit PIN"
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

              <div className="form-field">
                <label htmlFor="confirmPin" className="form-label">
                  Confirm PIN
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPin ? 'text' : 'password'}
                    id="confirmPin"
                    name="confirmPin"
                    className={`form-input ${errors.confirmPin ? 'input-error' : ''}`}
                    placeholder="Confirm your 4-digit PIN"
                    value={formData.confirmPin}
                    onChange={handleChange}
                    maxLength={4}
                    pattern="\d*"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    aria-label={showConfirmPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showConfirmPin ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPin && <span className="error-message">{errors.confirmPin}</span>}
              </div>

              <div className="terms-agreement">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{' '}
                    <Link to="/terms" className="inline-link">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="inline-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className="auth-footer">
              <p className="auth-redirect">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;