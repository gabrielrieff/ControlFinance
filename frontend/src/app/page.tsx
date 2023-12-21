'use client';
import { AuthContext } from '~/context/auth/authContext';

import Link from 'next/link';
import { FormEvent, useContext, useRef, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiSolidLock } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [viewPassword, setViewPassword] = useState(true);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (emailRef.current?.value != '' && passwordRef.current?.value != '') {
      const data = {
        email: emailRef.current?.value!,
        password: passwordRef.current?.value!
      };
      await signIn(data);
    }
  }

  function handleViewPassword() {
    setViewPassword(!viewPassword);
  }

  return (
    <main className="flex justify-center items-center">
      <form
        autoComplete="off"
        onSubmit={handleLogin}
        className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen"
      >
        <h1 className="font-semibold text-[48px]">Login</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              type="email"
              inputref={emailRef}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              outline-green-500 bg-grey-400 ps-11 h-[50px]"
            />
          </div>
        </label>

        <label className="w-full">
          <span>Senha:</span>
          <div className="relative">
            <BiSolidLock size={30} className="absolute bottom-[10px] left-2" />
            <Input
              inputref={passwordRef}
              type={viewPassword ? 'password' : 'text'}
              className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              outline-green-500 bg-grey-400 ps-11 pe-11 h-[50px]"
            />
            <button onClick={handleViewPassword}>
              <AiFillEye
                size={30}
                className="absolute bottom-[10px] right-2 hover:text-grey-600 transition-[0.3s]"
              />
            </button>
          </div>
        </label>
        <Button
          type="submit"
          className="bg-green-500 text-[26px] font-semibold w-[40%] text-white-100 hover:bg-green-400 hover:text-grey-700 transition-[.3s]"
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
