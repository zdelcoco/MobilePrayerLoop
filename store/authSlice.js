import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL, BASE_API_PORT } from '@env';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const url = `${BASE_API_URL}:${BASE_API_PORT}/user/login`;
      const response = await axios.post(url, { username, password });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue({ type: 'InvalidCredentials', message: 'Invalid username or password' });
        } else if (error.response.status >= 500) {
          return rejectWithValue({ type: 'ServerError', message: 'Server error occurred. Please try again later.' });
        }
      } else if (error.request) {
        return rejectWithValue({ type: 'NetworkError', message: 'Network error. Please check your connection.' });
      } else {
        return rejectWithValue({ type: 'UnknownError', message: 'An unknown error occurred.' });
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = {
          userId: action.payload.user.User_ID,
          userName: action.payload.user.Username,
          email: action.payload.user.Email,
          firstName: action.payload.user.First_Name,
          lastName: action.payload.user.Last_Name,
          token: action.payload.token,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;