import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Register User
export const registerUser = createAsyncThunk(
  'auth/register', // More descriptive action type
  async (formData) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
      withCredentials: true, // Make sure cookies are sent with the request
    });
    return response.data;
  }
);

// Login User
export const loginUser = createAsyncThunk(
  'auth/login', // More descriptive action type
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
        },
      });
      return response.data; // Return response data if successful
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Check Authentication
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await axios.get('http://localhost:5000/api/auth/checkAuth', {
      withCredentials: true, 
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate',
      }
    });
    return response.data; 
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User Actions
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // Store user data from response
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Login User Actions
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      // Check Auth Actions
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success; 
        state.user = action.payload.success ? action.payload.user : null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

// Export Actions
export const { setUser } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;
