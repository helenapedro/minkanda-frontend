import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../redux/notesSlice';
import userReducer from '../redux/userSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,

  },
});

export default store;
