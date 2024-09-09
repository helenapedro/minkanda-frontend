import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}); 

export const fetchNotes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/notes', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data.content;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const fetchNoteById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please login.');
    }
    const response = await api.get(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching note:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const addNote = async (note) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("You can't add a new note without a valid token.");
    }

    const response = await api.post('/notes', note, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.data) {
      throw new Error('Unexpected response format.');
    }

    return response.data.content;
  } catch (error) {
    console.error('Error adding note:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const updateNote = async (id, note) => {
  try {
    const response = await api.put(`/notes/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (nid) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found.');
    }
    await api.delete(`/notes/${nid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};