import api from "../utils/fetchApiBase";

const TOKEN_KEY = 'token'; 

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
