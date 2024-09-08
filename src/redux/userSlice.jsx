import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchUserDetails } from '../services/auth';

// Async actions using createAsyncThunk
export const loginUserAsync = createAsyncThunk('user/login', async (credentials) => {
  const response = await loginUser(credentials);
  return response; // Assume response contains user info and token
});

export const registerUserAsync = createAsyncThunk('user/register', async (userDetails) => {
  const response = await registerUser(userDetails);
  return response;
});
 
export const fetchUserDetailsAsync = createAsyncThunk('user/fetchDetails', async (userId) => {
  const response = await fetchUserDetails(userId);
  return response;
}); 

// Create a slice for user
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null; // Clear user info on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // Assuming payload is user info
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload; // Auto-login after registration
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
