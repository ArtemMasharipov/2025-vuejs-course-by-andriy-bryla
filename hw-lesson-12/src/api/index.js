/**
 * Enhanced API service with consistent error handling
 */
import lessonsData from '@/data/lessons.json';
import teachersData from '@/data/teachers.json';

// Configuration
const API_CONFIG = {
  defaultDelay: 300,
  authDelay: 500
};

// Simulates network delay
const delay = (ms = API_CONFIG.defaultDelay) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Create standardized response format
const createResponse = (data, success = true) => ({
  success,
  data,
  timestamp: Date.now()
});

// Create standardized error response
const createErrorResponse = (error) => ({
  success: false,
  error: error.message || 'Unknown error occurred',
  timestamp: Date.now()
});

// API request handler with consistent error handling
const apiHandler = async (requestFn) => {
  try {
    const result = await requestFn();
    return createResponse(result);
  } catch (error) {
    console.error('API Error:', error);
    return createErrorResponse(error);
  }
};

// API implementation
const api = {
  async getLessons() {
    return apiHandler(async () => {
      await delay();
      return lessonsData;
    });
  },

  async getTeachers() {
    return apiHandler(async () => {
      await delay();
      return teachersData;
    });
  },

  async login(credentials) {
    return apiHandler(async () => {
      await delay(API_CONFIG.authDelay);
      
      if (credentials.username === 'user' && credentials.password === 'password') {
        return { username: credentials.username };
      }
      
      throw new Error('Invalid credentials');
    });
  }
};

export default api;
