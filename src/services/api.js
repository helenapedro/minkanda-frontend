import { getToken } from '../utils/tokenUtils';
import { handleApiError } from '../utils/errorUtils';
import { fetchNotesBase } from '../utils/fetchNotesBase';
import api from '../utils/fetchApiBase';


export const fetchNotes = async (page = 0, pageSize = 10) => {
  return fetchNotesBase('/api/notes', page, pageSize);
};

export const fetchPublicNotes = async (page = 0, pageSize = 10) => {
  return fetchNotesBase('/api/notes/public', page, pageSize, true);
};


export const fetchNoteById = async (noteId) => {
  try {
    const token = getToken();
    const response = await api.get(`/api/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `/api/notes/${noteId}`); 
    throw error; 
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
    throw error; 
  }
};

export const updateNote = async (noteId, noteData) => {
  try {
    const token = getToken();

    const response = await api.patch(`/api/notes/${noteId}`, noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    
  } catch (error) {
    handleApiError(error, `/api/notes/${noteId}`);
    throw error; 
  }
};

export const toggleNotePrivacy = async (noteId) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    const response = await api.put(`/api/notes/${noteId}/togglePrivacy`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, `/api/notes/${noteId}/togglePrivacy`); 
    throw error; 
  }
}

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
    throw error; 
  }
};