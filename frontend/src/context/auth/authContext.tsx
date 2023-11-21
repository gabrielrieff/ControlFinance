'use client';

import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import {
  Category,
  invoiceProps,
  recipeProps,
  signInProps,
  userProps
} from '~/@types/contextTypes';
import { api } from '~/services/api';

type AuthContextData = {
  user?: userProps;
  isAuthenticated: boolean;
  signIn: (credentials: signInProps) => Promise<void>;
  signOut: () => void;
  recoverPassword: (email: string) => Promise<void>;
  updateUser: (data: FormData) => Promise<void>;
  AddRecipe: (data: recipeProps) => Promise<void>;
  listInvoice: Array<invoiceProps>;
  categories: Array<Category>;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<userProps>();
  const [listInvoice, setListInvoice] = useState<Array<invoiceProps>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      api
        .get('/user/detail')
        .then((response) => {
          const { id, firstName, lastName, email, admin, photo } =
            response.data;

          setUser({
            id,
            firstName,
            lastName,
            email,
            admin,
            photo
          });
        })
        .catch(() => {
          signOut();
        });

      api.get('/category').then((response) => {
        const { id, title, banner } = response.data;

        setCategories(response.data);
        return categories;
      });
    }
  }, []);

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      allInvoices();
    }
  }, []);

  async function signIn(props: signInProps) {
    try {
      const response = await api.post('/session', {
        email: props.email,
        password: props.password
      });
      const { id, email, password, firstName, token } = response.data;
      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({
        email,
        firstName,
        id
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      push('/main/dashboard');
    } catch (error) {
      console.log('error: ', error);
    }
  }

  function signOut() {
    try {
      destroyCookie(undefined, '@nextauth.token');
      push('/');
    } catch (error) {}
  }

  async function recoverPassword(email: string) {
    try {
      const response = await api.post('/forgotpassword', { email });
      push('/changePassword');
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async function allInvoices() {
    const inovoice = await api.get('/invoices');
    setListInvoice(inovoice.data);
    return listInvoice;
  }

  async function updateUser(data: FormData) {
    await api.patch(`/user/${user?.id}`, data).then((response) => {
      const { id, firstName, lastName, email, admin, photo } = response.data;

      setUser({
        id,
        firstName,
        lastName,
        email,
        admin,
        photo
      });
    });
  }

  async function AddRecipe(data: recipeProps) {
    const recipe = await api.post('/invoices', data);
    allInvoices();
  }

  async function changePassword() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        recoverPassword,
        updateUser,
        AddRecipe,
        listInvoice,
        categories
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
