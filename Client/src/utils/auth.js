// Authentication utility functions

const API_BASE_URL = 'http://localhost:5000/api/auth';

// Login function
export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Login failed' };
    }
  } catch (err) {
    console.error('Login error:', err);
    return { success: false, message: 'Network error' };
  }
};

// Logout function
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Call logout API
      const res = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        console.log('Logout successful');
      }
    }

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    return { success: true };
    
  } catch (err) {
    console.error('Logout error:', err);
    // Still clear local storage even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check token validity
export const isTokenValid = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const res = await fetch(`${API_BASE_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return res.ok;
  } catch (err) {
    return false;
  }
};
