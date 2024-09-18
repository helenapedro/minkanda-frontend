export const logout = () => {
     return async (dispatch) => {
          // Clear token from local storage or cookies
          localStorage.removeItem('authToken');
          // cookies.remove('authToken');

          // Perform any necessary cleanup or API calls here
          dispatch({ type: 'LOGOUT_SUCCESS' });
     };
};
   