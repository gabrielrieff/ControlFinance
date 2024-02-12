'use client';
import { AuthContext } from '~/context/auth/authContext';

import Link from 'next/link';
import { useContext, useRef, useState } from 'react';

import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'

import { AiFillEye } from 'react-icons/ai';
import { BiSolidLock } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';


const schema = z.object({
  email: z.string().min(1, {message: 'Por gentileza forneça um email!'}).email(),
  password: z.string().min(1, {message: 'Por gentileza forneça a senha'})
})

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const { handleSubmit, register, formState: {errors} } = useForm({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [viewPassword, setViewPassword] = useState(true);

  async function handleLogin(data: any) {
    console.log(data)
    // if (emailRef.current?.value != '' && passwordRef.current?.value != '') {
    //   const data = {
    //     email: emailRef.current?.value!,
    //     password: passwordRef.current?.value!
    //   };
    //   await signIn(data);
    // }
  }

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  return (
    <main className="flex justify-center items-center">
      <form
        autoComplete="off"
        onSubmit={() => handleLogin(handleSubmit)}
        className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen"
      >
        <h1 className="font-semibold text-[48px]">Login</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              {...register('email')}
              type="email"
              className="bg-grey-400 ps-11 h-[50px] bg-slate-100"
            />
          </div>
          {errors.email && (
            <span>{errors.email.message}</span>
          )}
        </label>

        <label className="w-full">
          <span>Senha:</span>
          <div className="relative">
            <BiSolidLock size={30} className="absolute bottom-[35px] left-2" />
            <Input
              {...register('password')}
              type={viewPassword ? 'password' : 'text'}
              className="ps-11 pe-11 h-[50px] bg-slate-100"
            />
            <button onClick={handleViewPassword}>
              <AiFillEye
                size={30}
                className="absolute bottom-[35px] right-2 hover:text-grey-600 transition-[0.3s]"
              />
            </button>
          </div>
          {errors.password && (
            <span>{errors.password.message}</span>
          )}
        </label>
        <Button
          type="submit"
          variant={"default"}
        >
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
