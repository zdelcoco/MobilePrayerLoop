import { createSlice } from '@reduxjs/toolkit';
import { getPrayerRequests } from '../util/getPrayerRequests';

const prayerRequestSlice = createSlice({
  name: 'prayerRequest',
  initialState: {
    prayerRequests: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    fetchStart: (state) => {
      state.status = 'loading';
    },
    fetchSuccess: (state, action) => {
      state.status = 'succeeded';
      state.prayerRequests = action.payload;
      state.error = null;
    },
    fetchFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    clearRequests: (state) => {
      state.prayerRequests = [];
      state.status = 'idle';
      state.error = null;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, clearRequests } = prayerRequestSlice.actions;

export const fetchPrayerRequests = () => async (dispatch, getState) => {
  dispatch(fetchStart());
  const token = getState().auth.user.token; 
  const result = await getPrayerRequests(token);
  if (result.success) {
    dispatch(fetchSuccess(result.data));
  } else {
    dispatch(fetchFailure(result.error));
  }
};

export const selectPrayerRequests = (state) => (state.prayerRequest);

export default prayerRequestSlice.reducer;