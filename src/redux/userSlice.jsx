import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  loginUser, 
  getCurrentUser,
  registerUser, 
  fetchUserDetails,
  getAllUsers,
  updateCurrentUser,
  deleteUser
} from '../services/auth';

const TOKEN_KEY = 'token'; 

// Create a slice for user
const userSlice = createSlice({
  name: 'user',
  initialState: {
      userInfo: null,
      allUsers: [], 
      loading: false,
      error: null,
  },
  reducers: {
      logoutUser: (state) => {
          state.userInfo = null;
          state.loading = false;
          state.error = null;
          localStorage.removeItem('userInfo');
          localStorage.removeItem(TOKEN_KEY); 
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

              localStorage.setItem(TOKEN_KEY, action.payload.token);
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })

          .addCase(registerUserAsync.fulfilled, (state, action) => {
              state.userInfo = action.payload;
              localStorage.setItem('userInfo', JSON.stringify(action.payload));
          })

          .addCase(getCurrentUserAsync.pending, (state) => {
              state.loading = true;
          })
          .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
              state.loading = false;   

              state.userInfo = action.payload;
          })
          .addCase(getCurrentUserAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
              state.userInfo = null;
              localStorage.removeItem('userInfo');
              localStorage.removeItem(TOKEN_KEY); 
          })

          .addCase(fetchUserDetailsAsync.fulfilled, (state, action) => {
              state.userInfo = action.payload;
          })

          .addCase(getAllUsersAsync.pending, (state) => {
              state.loading = true;
          })
          .addCase(getAllUsersAsync.fulfilled, (state, action) => {
              state.loading = false;
              state.allUsers = action.payload;
          })
          .addCase(getAllUsersAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })

          .addCase(updateCurrentUserAsync.pending, (state) => {
              state.loading = true;
          })
          .addCase(updateCurrentUserAsync.fulfilled, (state, action) => {
              state.loading = false;
              state.userInfo = action.payload; 
              localStorage.setItem('userInfo', JSON.stringify(action.payload));
          })
          .addCase(updateCurrentUserAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })

          .addCase(deleteUserAsync.pending, (state) => {
              state.loading = true;   

          })
          .addCase(deleteUserAsync.fulfilled, (state, action) => {
              state.loading = false;
              state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
              if (state.userInfo && state.userInfo.id === action.payload) {
                  state.userInfo = null;
                  localStorage.removeItem('userInfo'); 
                  localStorage.removeItem(TOKEN_KEY); 
              }
          })
          .addCase(deleteUserAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          });
  },
});

// Async thunks
export const registerUserAsync = createAsyncThunk('user/register', async (userDetails) => {
  const response = await registerUser(userDetails);
  return response;
});

export const updateCurrentUserAsync = createAsyncThunk('user/updateCurrentUser', async (data) => {
  const response = await updateCurrentUser(data); 
  return response.data; 
});

export const getCurrentUserAsync = createAsyncThunk('user/getCurrentUser', async () => {
  const response = await getCurrentUser();
  return response.data;
});

export const getAllUsersAsync = createAsyncThunk('user/getAllUsers', async () => {
  const response = await getAllUsers();
  return response.data;
});

export const fetchUserDetailsAsync = createAsyncThunk('user/fetchDetails', async (userId) => {
  const response = await fetchUserDetails(userId);
  return response;
});

export const loginUserAsync = createAsyncThunk('user/login', async (credentials) => {
  const response = await loginUser(credentials);
  return response; 
});

export const deleteUserAsync = createAsyncThunk('user/delete', async (userId) => {
  await deleteUser(userId); 
  return userId; 
});


export const { 
  logoutUser,
  loggedInWithJwt,
  currentUserReceived,
  currentUserUpdated,
} = userSlice.actions;

export default userSlice.reducer;