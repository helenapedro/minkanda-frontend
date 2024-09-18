import { getToken } from './tokenUtils';
import { handleApiError } from './errorUtils';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_PROD;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchNotesBase = async (url, page = 0, pageSize = 10) => {
  try {
    const token = getToken();
    const response = await api.get(url, {
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
    handleApiError(error, url);
  }
};
