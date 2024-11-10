import { handleApiError } from '../utils/errorUtils';
import api from '../utils/fetchApiBase';

const TOKEN_KEY = 'token'; 

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    const { email, password, firstname, lastname } = userData; 

    const response = await api.post('/register', { 
      email, password, firstname, lastname
    });

    return response.data;

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/users/authenticate', credentials);

    return response.data; 

  } catch (error) {

    if (error.response && error.response.status === 401) {
      throw new Error('Invalid credentials');

    } else {
      throw error; 
    }
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
    const response = await api.get(`/api/users/${userId}`); 
    return response.data;
  } catch (error) {
    handleApiError(error, `/api/users/${userId}`);
    throw error;
  }
};

export const updateCurrentUser = async (updatedData) => {
  try {
    const { userId, ...userDetails } = updatedData;
    
    const response = await api.put(`/api/users/${userId}`, userDetails);
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
