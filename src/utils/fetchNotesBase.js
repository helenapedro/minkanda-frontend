import { getToken } from './tokenUtils';
import { handleApiError } from './errorUtils';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_HEROKU;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchNotesBase = async (
  url, 
  page = 0, 
  pageSize, 
  publicOnly = false
) => {
  const endpoint = publicOnly ? '/api/notes/public' : url;
  try {
    const token = getToken();
    const response = await api.get(endpoint, {
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
    handleApiError(error, endpoint);
    throw error;
  }
};
