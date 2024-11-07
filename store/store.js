// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import prayerRequestReducer from './prayerRequestSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    prayerRequest: prayerRequestReducer,
  },
});

export default store;
