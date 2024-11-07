import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_API_URL, BASE_API_PORT } from '@env';
import { selectAuthState } from './authSlice';

export const getPrayerRequest = createAsyncThunk(
  'prayerRequest/get',
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const authState = selectAuthState(state);
      const token = authState.user?.token;

      if (!token) {
        return rejectWithValue({
          type: 'NoToken',
          message: 'No authentication token available',
        });
      }

      const url = `${BASE_API_URL}:${BASE_API_PORT}/user/PrayerRequests`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          return rejectWithValue({
            type: 'Unauthorized',
            message: 'Unauthorized access',
          });
        } else if (error.response.status >= 500) {
          return rejectWithValue({
            type: 'ServerError',
            message: 'Server error occurred. Please try again later.',
          });
        }
      } else if (error.request) {
        return rejectWithValue({
          type: 'NetworkError',
          message: 'Network error. Please check your connection.',
        });
      } else {
        return rejectWithValue({
          type: 'UnknownError',
          message: 'An unknown error occurred.',
        });
      }
    }
  }
);

const prayerRequestSlice = createSlice({
  name: 'prayerRequest',
  initialState: {
    requests: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearRequests: (state) => {
      state.requests = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrayerRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPrayerRequest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(getPrayerRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearRequests } = prayerRequestSlice.actions;
export const selectPrayerRequestState = (state) => state.prayerRequest;
export default prayerRequestSlice.reducer;
