'use client';

import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  users?: Array<userProps>;
  isAuthenticated: boolean;
  signIn: (credentials: signInProps) => Promise<void>;
  signOut: () => void;
  deleteUser: (id: string) => void;
  updateUser: (data: FormData) => Promise<void>;
  recoverPassword: (email: string) => Promise<void>;

  AddInvoice: (data: recipeProps) => Promise<void>;
  updateInvoide: (id: string, data: recipeProps) => Promise<void>;
  invoices: Array<invoiceProps>;
  invoicesTake: Array<invoiceProps>;

  deleteInvoice: (id: string) => Promise<void>;
  createCategori: (data: FormData) => Promise<void>;
  deleteCategori: (id: string) => Promise<void>;
  categories: Array<Category>;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<userProps>();
  const [users, setUsers] = useState<Array<userProps>>([]);
  const [invoices, setInvoices] = useState<Array<invoiceProps>>([]);
  const [invoicesTake, setInvoicesTake] = useState<Array<invoiceProps>>([]);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const isAuthenticated = !!user;

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      const data = {
        year,
        month
      };

      api
        .get(`/user/detail?year=${year}&month=${month}`)
        .then((response) => {
          const {
            id,
            firstName,
            lastName,
            email,
            userType,
            photo,
            expense,
            sum,
            revenue
          } = response.data;

          setUser({
            id,
            firstName,
            lastName,
            email,
            userType,
            expense,
            sum,
            revenue,
            photo
          });
        })
        .catch(() => {
          signOut();
        });

      getCategori();

      getUsers();
    }
  }, [invoices]);

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();
    if (token) {
      getInvoices(year, month);
      getInvoicesTake(year, month);
    }
  }, []);

  //User connected routers
  async function changePassword() {}

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
    } catch (error) {
      console.log('erro ao deslogar');
    }
  }

  async function deleteUser(id: string) {
    try {
      await api.delete(`/user/${id}`);
      getUsers();
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
      toast.error('Não foi possível deletar o usuário!');
    }
  }

  async function updateUser(data: FormData) {
    try {
      await api.patch(`/user/${user?.id}`, data).then((response) => {
        const { id, firstName, lastName, email, userType, photo } =
          response.data;

        setUser({
          id,
          firstName,
          lastName,
          email,
          userType,
          photo
        });
      });
      toast.success('Usuários atualizado com sucesso!');
    } catch (error) {
      toast.error('Não foi possível atualizar o usuário!');
    }
  }

  async function recoverPassword(email: string) {
    try {
      const response = await api.post('/forgotpassword', { email });
      push('/changePassword');
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async function getUsers() {
    const response = await api.get('/users-list');

    setUsers(response.data);
  }

  //Invoice connected routers
  async function getInvoices(year?: number, month?: number) {
    try {
      const inovoice = await api.get(`/invoice?year=${year}&month=${month}`);

      setInvoices(inovoice.data);

      return invoices;
    } catch (error) {}
  }

  async function getInvoicesTake(year?: number, month?: number) {
    try {
      const inovoice = await api.get(
        `/invoices?take=10&${year}&month=${month}`
      );

      setInvoicesTake(inovoice.data);

      return invoices;
    } catch (error) {}
  }

  async function deleteInvoice(id: string) {
    try {
      const response = await api.delete(`/invoice/${id}`);
      toast.success('Fatura excluída com sucesso!');

      getInvoices(year, month);
    } catch (error) {
      toast.error('Não foi possível excluir sua fatura!');
    }
  }

  async function AddInvoice(data: recipeProps) {
    try {
      const recipe = await api.post('/invoices', data);

      toast.success('Novo valor adicionado com sucesso!');
      getInvoices(year, month);
    } catch (error) {
      toast.error(
        'Aconteceu algo e não foi possível adicionar uma nova fatura, por favor verifique!'
      );
    }
  }

  async function updateInvoide(id: string, data: recipeProps) {
    try {
      const response = await api.patch(`/invoice/${id}`, data);

      toast.success('Fatura atualizada com sucesso!');

      getInvoices(year, month);
    } catch (error) {
      toast.error('Não foi possível atualizar a fatura!');
    }
  }

  //Categori connected routers
  async function createCategori(data: FormData) {
    try {
      const response = await api.post('/category', data);
      toast.success('Categoria criada com sucesso!');

      getCategori();
    } catch (error) {
      toast.error('Não foi possível criar a categoria!');
    }
  }

  async function getCategori() {
    api.get('/category').then((response) => {
      const { id, title, banner } = response.data;

      setCategories(response.data);
      return categories;
    });
  }

  async function deleteCategori(id: string) {
    try {
      const response = await api.delete(`/category/${id}`);
      toast.success('Categoria deletada com sucesso!');

      getCategori();
    } catch (error) {
      toast.error('Não foi possível deletar a categoria!');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        signIn,
        signOut,
        deleteUser,
        updateUser,
        recoverPassword,
        AddInvoice,
        updateInvoide,
        deleteInvoice,
        invoices,
        invoicesTake,
        deleteCategori,
        createCategori,
        categories
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};
