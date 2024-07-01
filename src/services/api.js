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

  findFugitive: async (selections) => {
    try {
      const response = await axiosInstance.post('/api/fugitive/find', {
        selections
      });
      return response.data;
    } catch (error) {
      console.error('Error finding fugitive:', error);
      throw error; 
    }
  },
};

export default API;
