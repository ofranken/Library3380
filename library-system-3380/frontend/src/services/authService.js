// src/services/authService.js
// Unified AuthService for login/signup + consistent token handling

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  // 🔹 Store auth token + user consistently
  storeSession(token, user) {
    localStorage.setItem('token', token); // unified key name
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 🔹 Signup
  async signup(studentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentData.studentId,
          pin: studentData.pin,
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          email: studentData.email,
          phone: studentData.phone || null
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      if (data.token) this.storeSession(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  // 🔹 Login
  async login(studentId, pin) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, pin }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (data.token) this.storeSession(data.token, data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // 🔹 Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // 🔹 Helpers
  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // 🔹 Authenticated GET utility
  async authGet(endpoint) {
    const token = this.getToken();
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) this.logout();
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // 🔹 Profile (example protected route)
  async getUserProfile() {
    return this.authGet('/user/profile');
  }
}

export default new AuthService();
