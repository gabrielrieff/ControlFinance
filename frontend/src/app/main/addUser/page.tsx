'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import Image from 'next/image';
import { FaGear } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { Button } from '~/components/shared/Button';
import { Input } from '~/components/shared/Input';

export default function NovoUsuario() {
  const {} = useContext(AuthContext);

  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [isForm, setIsForm] = useState(true);

  function handleForm() {
    setIsForm(!isForm);
  }

  return (
    <main
      className="flex flex-col justify-between items-center bg-white-100
    h-full w-full rounded-[20px] p-4"
    >
      <section className="w-full">
        <div
          className={`border border-grey-600 w-full flex justify-between
        items-center p-2`}
        >
          <span>Criar novo usuário</span>
          <IoIosArrowDown
            size={25}
            className={`cursor-pointer hover:text-orenge-500 transition-[.3s] ${
              isForm ? 'rotate-180' : 'rotate-0'
            }`}
            onClick={handleForm}
          />
        </div>
        <div>
          <form
            autoComplete="off"
            className={`bg-grey-300 p-2 pt-5  ${
              isForm ? 'flex' : 'hidden'
            } flex-col transition-[.3s]`}
          >
            <div className="flex gap-1 justify-between md:flex-col">
              <label className="w-full" htmlFor="first-name">
                <span>Nome</span>
                <Input
                  id="first-name"
                  type="text"
                  className="border border-grey-500 rounded-none"
                />
              </label>
              <label className="w-full" htmlFor="last-name">
                <span>Sobrenome</span>
                <Input
                  id="last-name"
                  type="text"
                  className="border border-grey-500 rounded-none"
                />
              </label>
              <label className="w-full" htmlFor="password">
                <span>Senha</span>
                <Input
                  id="password"
                  type="password"
                  className="border border-grey-500 rounded-none w-full"
                />
              </label>
            </div>

            <div className="flex items-end gap-1 justify-between md:flex-col mt-4">
              <label htmlFor="Email" className="w-full">
                <span>E-mail</span>
                <Input
                  id="Email"
                  type="email"
                  className="border border-grey-500 rounded-none"
                />
              </label>
              <label htmlFor="typeUser" className="flex flex-col w-full">
                <span>Tipo de usuário</span>
                <select
                  id="typeUser"
                  className="w-full p-2 border border-grey-500"
                >
                  <option></option>
                  <option value={2}>Master</option>
                  <option value={1}>Admin</option>
                  <option value={0}>Padrão</option>
                </select>
              </label>
              <label className="w-full">
                <Button
                  className="bg-green-400 hover:bg-green-500 transition-[.3s]
                text-white-100 font-semibold rounded-none p-2 py-[9px]"
                >
                  Salvar
                </Button>
              </label>
            </div>
          </form>

          <table className="w-full lg:text-[12px] md:text-[10px] mt-5">
            <thead>
              <tr
                className="flex w-full justify-center md:justify-around bg-grey-300/90 
          rounded-[10px] mb-3 p-2"
              >
                <th className="w-1/5 center">Usuário</th>
                <th className="w-1/5 center">Tipo de usuario</th>
                <th className="w-2/5 center">ID</th>
                <th className="w-1/5 center">Data de criação</th>
                <th className="w-1/5 center">
                  <FaGear size={30} />
                </th>
              </tr>
            </thead>
            <tbody className="gap-2 flex flex-col">
              <tr className="bg-grey-300/30 rounded-[10px] p-2 flex w-full justify-between">
                <td
                  className="flex items-center justify-center gap-3 md:gap-1 md:flex-col 
                            w-1/5"
                >
                  <Image
                    alt={''}
                    src={``}
                    width={40}
                    height={40}
                    className="rounded-full lg:w-[30px] lg:h-[30px]"
                  />
                  <span>Gabriel Rieff</span>
                </td>

                <td className="w-1/5 center">Admin</td>

                <td className="w-2/5 center">
                  c6d0112e-a2eb-42bc-9d9b-6c7b7d6c7b85
                </td>

                <td className="w-1/5 center">13/10/2023</td>

                <td className="w-1/5 center gap-3 lg:gap-1 md:flex-col">
                  <Button className="bg-red-500 hover:bg-red-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 ">
                    Excluir
                  </Button>
                  <Button className="bg-orenge-500 hover:bg-orenge-500/60 transition-[.3s] text-white-100 font-semibold rounded-lg p-1 ">
                    Editar
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
