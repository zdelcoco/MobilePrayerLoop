import axios from 'axios';

import { BASE_API_URL, BASE_API_PORT } from '@env';

export async function login(username, password) {
  console.log(`BASE_API_URL: ${BASE_API_URL}`);

  const url = `${BASE_API_URL}:${BASE_API_PORT}/user/login`;

  console.log(url);

  const response = await axios.post(url, {
    username,
    password,
  });

  console.log(response.data);

  const token = response.data.token;

  return token;
}