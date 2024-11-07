import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { BASE_API_URL, BASE_API_PORT } from '@env';

export function useLogin() {
  const dispatch = useDispatch();

  const loginUser = async (username, password) => {
    try {
      const url = `${BASE_API_URL}:${BASE_API_PORT}/user/login`;

      const response = await axios.post(url, {
        username,
        password,
      });

      const resBody = response.data;

      const user = {
        userId: resBody.user.User_ID,
        userName: resBody.user.Username,
        email: resBody.user.Email,
        firstName: resBody.user.First_Name,
        lastName: resBody.user.Last_Name,
        token: resBody.token,
      };

      dispatch(login(user));

      return resBody;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  return loginUser;
}
