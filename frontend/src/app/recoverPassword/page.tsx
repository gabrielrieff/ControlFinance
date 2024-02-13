'use client';

import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { Input } from '~/components/shadcn/input';
import { Button } from '~/components/shadcn/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Por gentileza informe um email' })
    .email({ message: 'Por gentileza informe um email valido' })
});

type formDataProps = z.infer<typeof schema>;

export default function recoverPassword() {
  const { recoverPassword } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<formDataProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema),
    defaultValues: {
      email: ''
    }
  });

  async function handleRecoverPassword(data: formDataProps) {
    const { email } = data;

    if (email != '') {
      await recoverPassword(email);
    }
  }
  return (
    <main className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleRecoverPassword)}
        className="w-[40%] lg:w-[60%] md:w-[75%] flex flex-col items-center justify-center gap-16 h-screen"
      >
        <h1 className="font-semibold text-[48px]">Recuperar senha</h1>

        <label className="w-full">
          <span>E-mail:</span>
          <div className="relative">
            <MdEmail size={30} className="absolute bottom-[10px] left-2" />
            <Input
              {...register('email')}
              type="email"
              className="bg-slate-100 ps-11 h-[50px]"
            />
          </div>
          {errors.email && (
            <span className="text-red-700 font-semibold">
              {errors.email.message}
            </span>
          )}
        </label>
        <Button type="submit" variant={'default'}>
          Recuperar
        </Button>

        <Link href={'/'} className="text-blue-500 text underline sm:text-sm">
          Voltar para o login
        </Link>
      </form>
    </main>
  );
}
