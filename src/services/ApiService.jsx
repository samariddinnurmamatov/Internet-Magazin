import axios from 'axios';
import { BASE_URL } from '../utils/constants';


const API_BASE_URL = BASE_URL;

const ApiService = {
  fetchData: async ({ url, method, data, params }) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
    try {
      const response = await axios({
        method,
        url: `${API_BASE_URL}${url}`,
        data,
        params,
        headers
      });


      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
};

export default ApiService;
