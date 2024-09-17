export const handleApiError = (error, endpoint) => {
  if (error.response) {
    console.error(`Error at ${endpoint}:`, error.response.data.message || error.response.statusText);
    throw new Error(error.response.data.message || 'Something went wrong.');
  } else if (error.request) {
    console.error(`No response from server at ${endpoint}:`, error.request);
    throw new Error('Server did not respond. Please try again later.');
  } else {
    console.error(`Error setting up request to ${endpoint}:`, error.message);
    throw new Error(error.message);
  }
};