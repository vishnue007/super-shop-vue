// Authentication utility functions

const API_BASE_URL = 'http://localhost:5000/api/auth';

// Types
export class User {
  constructor(
    public _id: string,
    public name: string,
    public email: string,
    public createdAt: string,
    public lastLogin?: string,
    public lastLogout?: string
  ) {}
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: {
    user: User;
  };
  message?: string;
}

// Register function
export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, data };
    } else {
      return { success: false, message: data.message || 'Registration failed' };
    }
  } catch (err) {
    console.error('Registration error:', err);
    return { success: false, message: 'Network error' };
  }
};

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok && data.success) {
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
export const logout = async (): Promise<{ success: boolean }> => {
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
    // Still clear local storage even if API fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return { success: true };
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Get token
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Check token validity
export const isTokenValid = async (): Promise<boolean> => {
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
