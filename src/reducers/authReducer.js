const initialState = {
     user: null,
   };
   
   const authReducer = (state = initialState, action) => {
     switch (action.type) {
       case 'LOGOUT_SUCCESS':
         return {
           ...state,
           user: null,
         };
       default:
         return state;
     }
   };
   
   export default authReducer;
    