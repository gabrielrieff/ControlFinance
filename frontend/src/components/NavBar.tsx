'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { ActiveLink } from './shared/ActiveLink';
import { Dialog } from './shared/Dialog';

import { BiSolidDashboard, BiTransfer, BiUserPlus } from 'react-icons/bi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { RiSettings5Fill } from 'react-icons/ri';

export const NavBar = () => {
  const { signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(!isOpen);
  }

  return (
    <nav
      className={`max-w-[250px] bg-white-100 h-full pe-2 rounded-br-[40px] mr-3
        rounded-tr-[40px] relative transition-all duration-500 ease-in`}
    >
      <h1
        className="font-medium text-[24px] flex items-center justify-center
       h-[114px] lg:hidden"
      >
        MyWallet
      </h1>
      <section className=" flex flex-col gap-[40px] ml-2 mt-8">
        <ActiveLink href={'/main/dashboard'} data-title="Dashboard">
          <BiSolidDashboard size={30} />
          <span className="lg:hidden">Dashboard</span>
        </ActiveLink>

        <ActiveLink href={''} data-title="Transações mensais">
          <BiTransfer size={30} />
          <span className="lg:hidden">Transações mensais</span>
        </ActiveLink>

        <Dialog.Root
          isOpen={isOpen}
          Open={
            <ActiveLink
              href={''}
              onClick={handleOpenModal}
              data-title="Adicionar receita"
            >
              <GiReceiveMoney size={30} />
              <span className="lg:hidden">Adicionar receita</span>
            </ActiveLink>
          }
        >
          <Dialog.Title>Teste de titulo</Dialog.Title>
          <Dialog.Content description="Este modal serve para você adicionar uma nova receita">
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                defaultValue="Pedro Duarte"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="text-violet11 w-[90px] text-right text-[15px]"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="username"
                defaultValue="@peduarte"
              />
            </fieldset>
          </Dialog.Content>
          <Dialog.Close isOpen={handleOpenModal}></Dialog.Close>
        </Dialog.Root>

        <ActiveLink href={''} data-title="Adicionar despesa">
          <GiPayMoney size={30} />
          <span className="lg:hidden">Adicionar despesa</span>
        </ActiveLink>

        <ActiveLink href={'/main/addUser'} data-title="Criar novo usuário">
          <BiUserPlus size={30} />
          <span className="lg:hidden">Criar novo usuário</span>
        </ActiveLink>

        <ActiveLink href={''} data-title="Categorias">
          <MdCategory size={30} />
          <span className="lg:hidden">Categorias</span>
        </ActiveLink>

        <ActiveLink href={'/main/configuracao'} data-title="Configurações">
          <RiSettings5Fill size={30} />
          <span className="lg:hidden">Configurações</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <button className="hover:underline" onClick={signOut}>
            Sair
          </button>
        </ActiveLink>
      </section>
    </nav>
  );
};
