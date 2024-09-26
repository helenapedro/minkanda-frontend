import axios from 'axios';
import _ from 'underscore';

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

export const registerUser = async (userData) => {
  try {
      const { email, password, firstname, lastname, birthday, gender } = userData; 
      const response = await api.post('/register', { email, password, firstname, lastname, birthday, gender });
      return response.data;
  } catch (error) {
      console.error('Error registering user:', error);
      throw error;
  }
};

const ap = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  try {
    const response = await ap.post('http://localhost:80/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getCurrentUser = async () => { 
  try {
    const response = await api.get('/api/users/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching authenticated user:', error);
    throw error; 
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getAllUsers = async () => { 
  try {
    const response = await api.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error; 
  }
};

export const updateCurrentUser = async (userId, updatedData) => {
  try {
    const userFields = [
      'firstname',
      'lastname',
      'birthday',
      'phoneNumber',
      'address'
    ];
    const response = await api.put(
      `/api/users/${userId}`, 
      _.pick (updatedData, userFields)
    );
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; 
  }
};
