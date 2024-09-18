import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    logoutUser: (state) => {
      // Handle logout logic
      state.user = null;
      state.isAuthenticated = false;
    },
    // Other actions...
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
