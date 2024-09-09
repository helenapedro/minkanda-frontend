export const handleApiError = (error, endpoint) => {
     const errorMessage = error.response
       ? `Error at ${endpoint}: ${error.response.data.message} (status: ${error.response.status})`
       : error.message;
     console.error(errorMessage);
     throw new Error(errorMessage);
};