export const getToken = () => {
     const token = localStorage.getItem('token');
     if (!token) {
       throw new Error('No token found. Please login.');
     }
     return token;
};