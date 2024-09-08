const initialState = {
  notes: [],
    loading: false,
    error: null,
  };
   
  const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_NOTES_SUCCESS':
        return { ...state, notes: action.payload, loading: false };
      case 'FETCH_NOTES_FAILURE':
        return { ...state, error: action.payload, loading: false };
      // Add other cases for add, update, delete, etc.
      default:
        return state;
    }
  };
   
export default notesReducer;
   