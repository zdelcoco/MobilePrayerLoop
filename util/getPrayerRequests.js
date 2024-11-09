// utils/getPrayerRequests.js
import axios from 'axios';
import { BASE_API_URL, BASE_API_PORT } from '@env';

export const getPrayerRequests = async (token) => {
  try {
    const url = `${BASE_API_URL}:${BASE_API_PORT}/prayer-requests`;      
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { success: true, data: response.data };

  } catch (error) {

    console.log(error);

    if (error.response) {
      if (error.response.status === 401) {
        return {
          success: false,
          error: { type: 'Unauthorized', message: 'Please log in again.' },
        };
      } else if (error.response.status >= 500) {
        return {
          success: false,
          error: {
            type: 'ServerError',
            message: 'Server error occurred. Please try again later.',
          },
        };
      }
    } else if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: {
          type: 'TimeoutError',
          message: 'Request timed out. Please try again.',
        },
      };
    }
    return {
      success: false,
      error: { type: 'UnknownError', message: 'An unknown error occurred.' },
    };
  }
};
