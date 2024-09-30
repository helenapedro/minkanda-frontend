import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_HEROKU;
const TOKEN_KEY = 'token'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllUsers = async () => { 
  try {
    const response = await api.get('/api/users'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; 
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`); 
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};
