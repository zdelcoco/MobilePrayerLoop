// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null,
    userName: null,
    email: null,
    firstName: null,
    lastName: null,

    token: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload.userId;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.userName = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;
