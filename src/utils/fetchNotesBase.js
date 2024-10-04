import { getToken } from './tokenUtils';
import { handleApiError } from './errorUtils';
import api from './fetchApiBase';

export const fetchNotesBase = async (
  url, page = 0, pageSize, publicOnly = false
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
