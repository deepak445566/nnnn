import axios from 'axios';

const API_URL = 'https://nnnn-x39m.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.message);
    
    // If main API fails, try fallback
    if (error.config.url === '/volunteers' && error.response?.status === 500) {
      console.log('Trying fallback endpoint...');
      return api.get('/fallback/volunteers');
    }
    
    return Promise.reject({
      success: false,
      message: error.response?.data?.message || 'Server error',
      status: error.response?.status || 500,
      data: error.response?.data || null
    });
  }
);

export const volunteerAPI = {
  // Get all volunteers with smart fallback
  getAllVolunteers: async () => {
    try {
      // First try main endpoint
      const response = await api.get('/volunteers');
      console.log('Volunteers API response:', response);
      return response;
    } catch (error) {
      console.error('Get volunteers error:', error);
      
      // Try fallback
      try {
        const fallback = await api.get('/mock/volunteers');
        console.log('Using fallback/mock data');
        return fallback;
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        
        // Return offline data structure
        return {
          success: true,
          data: [
            {
              _id: 'offline-1',
              name: 'Offline Mode',
              aakNo: '001',
              role: 'president',
              mobileNo: '0000000000',
              address: 'System is offline',
              imageUrl: null,
              joinDate: new Date(),
              createdAt: new Date()
            }
          ],
          isOffline: true,
          message: 'System is offline. Using local data.'
        };
      }
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return {
        success: true,
        ...response,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: 'Server unreachable',
        isOnline: false,
        timestamp: new Date()
      };
    }
  },

  // Other methods remain same...
  createVolunteer: async (formData) => {
    try {
      const response = await api.post('/volunteers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Create volunteer error:', error);
      throw error;
    }
  },

  getVolunteerById: async (id) => {
    try {
      const response = await api.get(`/volunteers/${id}`);
      return response;
    } catch (error) {
      console.error('Get volunteer error:', error);
      throw error;
    }
  },

  deleteVolunteer: async (id) => {
    try {
      const response = await api.delete(`/volunteers/${id}`);
      return response;
    } catch (error) {
      console.error('Delete volunteer error:', error);
      throw error;
    }
  }
};

export default api;