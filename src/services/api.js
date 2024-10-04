import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
import { handleApiError } from '../utils/errorUtils';
import { fetchNotesBase } from '../utils/fetchNotesBase';

const API_URL = process.env.REACT_APP_API_URL_HEROKU;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPublicNotes = async (page = 0, pageSize = 10) => {
  return fetchNotesBase('/api/notes/public', page, pageSize);
};

export const fetchNotes = async (page = 0, pageSize = 10) => {
  return fetchNotesBase('/api/notes', page, pageSize);
};

export const fetchNoteById = async (id) => {
  try {
    const token = getToken();
    const response = await api.get(`/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `/api/notes/${id}`); 
  }
};

export const addNote = async (note) => {
  try {
    const token = getToken();
    const response = await api.post('/api/notes', note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error('Unexpected response format from /api/notes.');
    }

    return response.data;
  } catch (error) {
    handleApiError(error, '/api/notes'); 
  }
};

export const updateNote = async (id, note) => {
  try {
    const token = getToken();
    console.log('Sending request to update note:', note);
    const response = await api.patch(`/api/notes/${id}`, note, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, `/api/notes/${id}`);
  }
};

export const deleteNote = async (nid) => {
  try {
    const token = getToken();
    await api.delete(`/api/notes/${nid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    handleApiError(error, `/api/notes/${nid}`); 
  }
};