'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { ActiveLink } from './shared/ActiveLink';
import { Dialog } from './shared/Dialog';

import { BiSolidDashboard, BiTransfer, BiUserPlus } from 'react-icons/bi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { MdCategory } from 'react-icons/md';
import { RiSettings5Fill } from 'react-icons/ri';
import { enumUser } from '~/@types/enum/EnumAdmin';
import { AddExpense } from './ui/AddExpense';
import { AddRecipe } from './ui/AddRecipe';

export const NavBar = () => {
  const { signOut, user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalExpense, setIsOpenModalExpense] = useState(false);

  function handleOpenModal() {
    setIsOpen(!isOpen);
  }

  function handleModalExpense() {
    setIsOpenModalExpense(!isOpenModalExpense);
  }

  return (
    <nav
      className={`max-w-[250px] bg-white-100 h-screen pe-2 rounded-br-[40px] mr-3
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

        <ActiveLink href={'/main/transactions'} data-title="Transações mensais">
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
          <AddRecipe closeModal={handleOpenModal} />
        </Dialog.Root>

        <Dialog.Root
          isOpen={isOpenModalExpense}
          Open={
            <ActiveLink
              href={''}
              onClick={handleModalExpense}
              data-title="Adicionar despesa"
            >
              <GiPayMoney size={30} />
              <span className="lg:hidden">Adicionar despesa</span>
            </ActiveLink>
          }
        >
          <AddExpense closeModal={handleModalExpense} />
        </Dialog.Root>
        {user?.userType === enumUser.Master && (
          <>
            <ActiveLink href={'/main/addUser'} data-title="Criar novo usuário">
              <BiUserPlus size={30} />
              <span className="lg:hidden">Criar novo usuário</span>
            </ActiveLink>

            <ActiveLink href={''} data-title="Categorias">
              <MdCategory size={30} />
              <span className="lg:hidden">Categorias</span>
            </ActiveLink>
          </>
        )}

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
