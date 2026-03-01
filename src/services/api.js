import axios from 'axios';

// Use environment variable for API base URL, fallback to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
// const API_BASE_URL = 'https://backend-app-c2if.onrender.com/api'; // Production backend URL - verified working

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('=== API REQUEST DEBUG ===');
    console.log('Request URL:', config.baseURL + config.url);
    console.log('Request Method:', config.method);
    console.log('Request Data:', config.data);
    console.log('Request Headers:', config.headers);
    console.log('=== END REQUEST DEBUG ===');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Interceptor Error:', error);
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = async (userData) => {
  try {
    console.log('=== API SERVICE DEBUG ===');
    console.log('API: Sending registration request to', API_BASE_URL + '/register');
    console.log('API: Request data:', userData);
    console.log('API: Base URL:', API_BASE_URL);
    console.log('API: Axios config:', api.defaults);
    
    const response = await api.post('/register', userData);
    
    console.log('API: Registration response received:', response);
    console.log('API: Response status:', response.status);
    console.log('API: Response data:', response.data);
    console.log('API: Response headers:', response.headers);
    console.log('=== API SERVICE SUCCESS ===');
    
    return response.data;
  } catch (error) {
    console.error('=== API SERVICE ERROR ===');
    console.error('API: Registration error caught:', error);
    console.error('API: Error name:', error.name);
    console.error('API: Error message:', error.message);
    console.error('API: Error code:', error.code);
    console.error('API: Error stack:', error.stack);
    console.error('API: Error config:', error.config);
    console.error('API: Error response:', error.response);
    
    if (error.response) {
      console.error('API: Error response data:', error.response.data);
      console.error('API: Error response status:', error.response.status);
      console.error('API: Error response headers:', error.response.headers);
    }
    
    if (error.request) {
      console.error('API: Error request:', error.request);
    }
    
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Registration failed: Unknown error';
    
    console.error('API: Final error message:', errorMessage);
    console.error('=== END API SERVICE ERROR ===');
    
    throw error.response?.data || { message: errorMessage };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

export default api;