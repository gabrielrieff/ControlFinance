'use client';
import { AuthContext } from '~/context/auth/authContext';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';
import { useFormSchema } from './schema';

import { z } from 'zod';

import { AiFillEye } from 'react-icons/ai';
import { BiSolidLock } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const { handleSubmit, register, schema, errors } = useFormSchema();

  type formDataProps = z.infer<typeof schema>;

  const [viewPassword, setViewPassword] = useState(true);

  const handleLogin = async (data: formDataProps) => {
    const { email, password } = data;
    if (email != '' && password != '') {
      const data = {
        email: email,
        password: password
      };
      await signIn(data);
    }
  };

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  return (
    <main className="flex justify-center items-center">
      <form
        autoComplete="off"
        onSubmit={handleSubmit(handleLogin)}
        className="w-[40%] xl:w-[60%] md:w-[85%] flex flex-col items-center justify-center gap-16 h-screen"
      >
        <h1 className="font-semibold text-[48px]">Login</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              autoComplete="off"
              {...register('email')}
              type="email"
              className="bg-grey-400 ps-11 h-[50px] bg-slate-100"
            />
          </div>
          {errors.email && (
            <span className="text-red-700 font-semibold">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="w-full">
          <span>Senha:</span>
          <div className="relative">
            <BiSolidLock size={30} className="absolute bottom-[10px] left-2" />
            <Input
              {...register('password')}
              type={viewPassword ? 'password' : 'text'}
              className="ps-11 pe-11 h-[50px] bg-slate-100"
            />
            <button
              onClick={handleViewPassword}
              className="absolute bottom-[10px] right-2 hover:text-grey-600 transition-[0.3s]"
            >
              <AiFillEye size={30} />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-700 font-semibold">
              {errors.password.message}
            </span>
          )}
        </label>
        <Button type="submit" variant={'default'} className="w-1/3 text-lg">
          Entrar
        </Button>

        <Link
          href={'/recoverPassword'}
          className="text-blue-500 text underline sm:text-sm"
        >
          Esqueci minha senha, preciso recuperar
        </Link>
      </form>
    </main>
  );
}
