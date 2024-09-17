import axios from 'axios';
import { getToken } from './../utils/tokenUtils';
import { handleApiError } from './../utils/errorUtils';

const API_URL = process.env.REACT_APP_API_URL_PROD;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async (page = 0, pageSize = 10) => {
  try {
    const token = getToken();
    const response = await api.get('/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, '/notes'); 
  }
};

export const fetchNoteById = async (id) => {
  try {
    const token = getToken();
    const response = await api.get(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `/notes/${id}`); 
  }
};

export const addNote = async (note) => {
  try {
    const token = getToken();
    const response = await api.post('/notes', note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('Unexpected response format from /notes.');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, '/notes'); 
  }
};

export const updateNote = async (id, note) => {
  try {
    const token = getToken();
    const response = await api.put(`/notes/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `/notes/${id}`);
  }
};

export const deleteNote = async (nid) => {
  try {
    const token = getToken();
    await api.delete(`/notes/${nid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    handleApiError(error, `/notes/${nid}`); 
  }
};