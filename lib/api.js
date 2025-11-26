// lib/api.js
// API Helper functions for backend communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================
// Helper function to get auth token
// ============================================
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// ============================================
// Helper function to set auth token
// ============================================
export const setAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// ============================================
// Helper function to remove auth token
// ============================================
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

// ============================================
// Auth API calls
// ============================================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save token
      if (data.token) {
        setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token
      if (data.token) {
        setAuthToken(data.token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get user');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  logout: () => {
    removeAuthToken();
  }
};

// ============================================
// Events API calls
// ============================================

export const eventsAPI = {
  // Get all events
  getAll: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.category && filters.category !== 'All') {
        queryParams.append('category', filters.category);
      }
      
      if (filters.search) {
        queryParams.append('search', filters.search);
      }

      const url = `${API_URL}/api/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch events');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get single event by ID
  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch event');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Create new event (protected)
  create: async (eventData) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update event (protected)
  update: async (id, eventData) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update event');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Delete event (protected)
  delete: async (id) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete event');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get user's events (protected)
  getUserEvents: async () => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_URL}/api/events/user/my-events`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user events');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
};

// ============================================
// Export API URL for direct use if needed
// ============================================
export { API_URL };