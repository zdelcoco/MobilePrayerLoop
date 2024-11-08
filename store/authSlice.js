import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../util/login';
import { clearRequests } from './prayerRequestSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.status = 'idle';
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logoutSuccess } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  dispatch(loginStart());
  const result = await loginUser(username, password);
  if (result.success) {
    dispatch(loginSuccess(result.data));
  } else {
    dispatch(loginFailure(result.error));
  }
};

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
  dispatch(clearRequests());
};

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;