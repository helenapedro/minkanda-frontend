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

const initialState = {
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY), 
  token: localStorage.getItem(TOKEN_KEY),
  userInfo: (() => {
    const userInfo = localStorage.getItem('userInfo');
    try {
      return userInfo ? JSON.parse(userInfo) : null; 
    } catch (e) {
      console.error("Error parsing userInfo from localStorage:", e);
      return null;
    }
  })(),
  allUsers: [], 
  updateUserStatus: 'idle',
  loading: false,
  error: null,
};

// Create a slice for user
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      logoutUser: (state) => {
        state.userInfo = null;
        state.isAuthenticated = false;
        state.token = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem('userInfo');
        localStorage.removeItem(TOKEN_KEY); 
      },
      clearError: (state) => {
        state.error = null;
      },

      resetUpdateStatus(state) {
        state.updateUserStatus = 'idle';
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
              state.isAuthenticated = true;
              localStorage.setItem('userInfo', JSON.stringify(action.payload));   
              localStorage.setItem(TOKEN_KEY, action.payload.token);
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload || action.error.message;
          })

          .addCase(registerUserAsync.fulfilled, (state, action) => {
              state.userInfo = action.payload;
              state.token = action.payload.token;
              state.isAuthenticated = true;
              localStorage.setItem('userInfo', JSON.stringify(action.payload));
              localStorage.setItem(TOKEN_KEY, action.payload.token);
          })

          .addCase(getCurrentUserAsync.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(getCurrentUserAsync.fulfilled, (state, action) => { 
            state.loading = false;
            state.userInfo = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
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
              state.updateUserStatus = 'fulfilled';
              state.error = null;
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
                  state.isAuthenticated = false;
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

export const loginUserAsync = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await loginUser(credentials);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateCurrentUserAsync = createAsyncThunk(
  'user/updateCurrentUser', async (data) => {
  const response = await updateCurrentUser(data); 
  return response.data; 
});

export const getCurrentUserAsync = createAsyncThunk(
  'user/getCurrentUser', 
  async () => {
  const response = await getCurrentUser();
  return response;
});

export const fetchUserDetailsAsync = createAsyncThunk(
  'user/fetchDetails', async (userId) => {
  const response = await fetchUserDetails(userId);
  return response;
});

export const deleteUserAsync = createAsyncThunk(
  'user/delete', async (userId) => {
  await deleteUser(userId); 
  return userId; 
});

export const getAllUsersAsync = createAsyncThunk(
  'user/getAllUsers', async () => {
  const response = await getAllUsers();
  return response;
});


export const { logoutUser, clearError, resetUpdateStatus } = userSlice.actions;

// Selector to get authentication status
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserInfo = (state) => state.user.userInfo;


export default userSlice.reducer;