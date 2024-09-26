import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginUser, 
  authUser,
  registerUser, 
  fetchUserDetails,
} from '../services/auth';

// Async actions using createAsyncThunk
export const loginUserAsync = createAsyncThunk('user/login', async (credentials) => {
  try {
    // First try to log in
    const response = await loginUser(credentials);
    return response; 
  } catch (error) {
     // If login fails, try to authenticate the user with authUser
    const authResponse = await authUser(credentials);
    return authResponse;
  }
  
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
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('userInfo');
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
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));  
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
