const initialState = {
     successMessage: '',
};
   
const successMessageReducer = (state = initialState, action) => {
     switch (action.type) {
          case 'notes/togglePrivacySuccess':
               return {
                    ...state,
                    successMessage: 'Privacy toggled successfully',
               };
          case 'notes/clearSuccessMessage':
               return {
                    ...state,
                    successMessage: '',
               };
          default:
               return state;
     }
};
   
export default successMessageReducer;