'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';
import { AuthContext } from '~/context/auth/authContext';

export default function Configuracao() {
  const { user } = useContext(AuthContext);

  return (
    <main
      className="flex flex-col justify-start gap-[60px] items-center bg-white-100
      h-full rounded-[20px] p-4"
    >
      <section>
        <h1 className="text-center font-bold text-[20px]">Dados do usuário</h1>
        <form
          autoComplete="off"
          className="flex items-center justify-center gap-10"
        >
          <div className="">
            {!user?.photo ? (
              <>
                <label htmlFor="input-file">
                  <Input id="input-file" type="file" className="hidden " />
                  <div className="w-[256px] h-[256px] rounded-full bg-grey-300 flex items-center justify-center">
                    <AiOutlineUser size={150} />
                  </div>
                </label>
                <Button type="button">Adicionar uma foto</Button>
              </>
            ) : (
              <>
                <label htmlFor="input-file">
                  <Input id="input-file" type="file" className="hidden " />
                  <Image
                    alt={`${user!.firstName} ${user!.lastName}`}
                    src={`http://localhost:3333/files/image/user/${
                      user!.photo
                    }`}
                    width={256}
                    height={256}
                    className="rounded-full"
                  />
                </label>
                <Button type="button">Alterar minha foto</Button>
              </>
            )}
          </div>
          <div className="gap-4 flex flex-col">
            <label>
              <span>Nome</span>
              <Input
                type="text"
                className="border border-grey-500 bg-grey-300"
              />
            </label>
            <label>
              <span>Sobrenome</span>
              <Input
                type="text"
                className="border border-grey-500 bg-grey-300"
              />
            </label>
            <label>
              <span>E-mail</span>
              <Input
                autoComplete="off"
                type="email"
                className="border border-grey-500 bg-grey-300"
              />
            </label>

            <Button
              className="bg-green-500 hover:bg-green-400 transition-[.3s]
             text-white-100 font-semibold"
            >
              Salvar os dados do usuário
            </Button>
          </div>
        </form>
      </section>
      <form autoComplete="off" className="flex flex-col gap-3">
        <h1 className="text-center font-bold text-[20px]">Trocar a senha</h1>
        <label>
          <span>Senha antiga</span>
          <Input
            type="password"
            className="border border-grey-500 bg-grey-300"
          />
        </label>
        <div className="flex gap-2">
          <label>
            <span>Nova senha</span>
            <Input
              type="password"
              className="border border-grey-500 bg-grey-300"
            />
          </label>

          <label>
            <span>Confirme a nova senha</span>
            <Input
              type="password"
              className="border border-grey-500 bg-grey-300"
            />
          </label>
        </div>

        <Button
          className="bg-green-500 hover:bg-green-400 transition-[.3s]
             text-white-100 font-semibold"
        >
          Salvar senha
        </Button>
      </form>
    </main>
  );
}
