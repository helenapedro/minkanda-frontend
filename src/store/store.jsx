import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../redux/notesSlice';
import userReducer from '../redux/userSlice';

//combining the notesReducer and userReducer into the reducer object
const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,

  },
});

export default store;
