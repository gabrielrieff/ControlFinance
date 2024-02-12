'use client';

import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { FormEvent, useContext, useRef } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';

export default function recoverPassword() {
  const { recoverPassword } = useContext(AuthContext);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function handleRecoverPassword(event: FormEvent) {
    event.preventDefault();

    if (emailRef.current?.value != '') {
      await recoverPassword(emailRef.current?.value!);
    }
  }
  return (
    <main className="flex justify-center items-center">
      <form
        onSubmit={handleRecoverPassword}
        className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen"
      >
        <h1 className="font-semibold text-[48px]">Recuperar senha</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              type="email"
              ref={emailRef}
              className="bg-slate-100 ps-11 h-[50px]"
            />
          </div>
        </label>
        <Button
          type="submit"
          variant={'default'}
        >
          Recuperar
        </Button>

        <Link href={'/'} className="text-blue-500 text underline sm:text-sm">
          Voltar para o login
        </Link>
      </form>
    </main>
  );
}
