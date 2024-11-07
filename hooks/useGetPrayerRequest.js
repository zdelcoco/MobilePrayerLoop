import { useDispatch } from 'react-redux';
import { getPrayerRequest } from '../store/prayerRequestSlice';

export function useGetPrayerRequest() {
  const dispatch = useDispatch();

  const getPRs = async () => {
    try {
      const resultAction = await dispatch(getPrayerRequest());
      if (getPrayerRequest.fulfilled.match(resultAction)) {
        return {
          success: true,
          data: resultAction.payload,
          message: 'Prayer requests fetched successfully',
        };
      } else if (getPrayerRequest.rejected.match(resultAction)) {
        const error = resultAction.payload;
        return {
          success: false,
          error: {
            type: error.type || 'UnknownError',
            message: error.message || 'An unknown error occurred',
          },
        };
      } else {
        return {
          success: false,
          error: {
            type: 'UnexpectedError',
            message: 'An unexpected error occurred',
          },
        };
      }
    } catch (error) {
      console.error('Unexpected error in getPRs:', error);
      return {
        success: false,
        error: {
          type: 'UnexpectedError',
          message: 'An unexpected error occurred',
        },
      };
    }
  };

  return getPRs;
}