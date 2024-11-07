import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';

export function useLogin() {
  const dispatch = useDispatch();

  const login = async (username, password) => {
    try {
      const resultAction = dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        return {
          success: true,
          data: resultAction.payload,
          message: 'Login successful',
        };
      } else if (loginUser.rejected.match(resultAction)) {
        const error = resultAction.payload;
        return {
          success: false,
          error: {
            type: error.type,
            message: error.message,
          },
        };
      }
    } catch (error) {
      return {
        success: false,
        error: {
          type: 'UnexpectedError',
          message: 'An unexpected error occurred',
        },
      };
    }
  };

  return login;
}
