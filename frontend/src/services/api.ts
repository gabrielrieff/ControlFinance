import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { AuthTokenError } from '~/context/auth/errors/authTokenError';

export function apiClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  //const { signOut } = useContext(AuthContext);
  const api = axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      Authorization: `Bearer ${cookies['@nextauth.token']}`
    }
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (typeof window !== undefined) {
          //signOut();
          return;
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export const api = apiClient();
