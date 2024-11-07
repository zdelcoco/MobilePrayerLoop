import { useDispatch } from 'react-redux';
import { loginUser } from '../store/authSlice';

export function useLogin() {
  const dispatch = useDispatch();

  const login = async (username, password) => {
    try {
      const resultAction = await dispatch(loginUser({ username, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        return resultAction.payload;
      } else {
        throw new Error(resultAction.error.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return login;
}