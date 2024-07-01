import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'; // Update with your actual backend URL

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

const API = {
  // Fetch cities data from backend
  getCities: async () => {
    try {
      const response = await axiosInstance.get('/api/data/cities');
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error; // Throw error for handling in components
    }
  },

  // Fetch vehicles data from backend
  getVehicles: async () => {
    try {
      const response = await axiosInstance.get('/api/data/vehicles');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error; // Throw error for handling in components
    }
  },

  // Fetch cops data from backend
  getCops: async () => {
    try {
      const response = await axiosInstance.get('/api/data/cops');
      return response.data;
    } catch (error) {
      console.error('Error fetching cops:', error);
      throw error; // Throw error for handling in components
    }
  },

  // Send city and vehicle selections to backend for finding fugitive
  findFugitive: async (citySelections, vehicleSelections) => {
    try {
      const response = await axiosInstance.post('/api/fugitive/find', {
        citySelections,
        vehicleSelections,
      });
      return response.data.message;
    } catch (error) {
      console.error('Error finding fugitive:', error);
      throw error; // Throw error for handling in components
    }
  },
};

export default API;
