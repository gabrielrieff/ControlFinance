'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';

import { ActiveLink } from './shared/ActiveLink';
import { Dialog } from './shared/Dialog';

import { BiSolidDashboard, BiTransfer } from 'react-icons/bi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { MdCategory, MdLogout } from 'react-icons/md';
import { PiUserListFill } from 'react-icons/pi';
import { RiSettings5Fill } from 'react-icons/ri';

import { enumUser } from '~/@types/enum/EnumAdmin';
import { AddExpense } from './ui/AddExpense';
import { AddRecipe } from './ui/AddRecipe';
import { CategoriModal } from './ui/CategoriModal';

export const NavBar = () => {
  const { signOut, user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalExpense, setIsOpenModalExpense] = useState(false);
  const [isModalCategori, setIsModalCategori] = useState(false);

  function handleOpenModal() {
    setIsOpen(!isOpen);
  }

  function handleModalExpense() {
    setIsOpenModalExpense(!isOpenModalExpense);
  }

  function handleModalCategori() {
    setIsModalCategori(!isModalCategori);
  }

  return (
    <nav
      className={`max-w-[250px] md:max-w-full bg-white-100 h-full md:h-[55px]  pe-2 rounded-br-[40px] mr-3
        rounded-tr-[40px] md:rounded-[20px] relative transition-all duration-500 ease-in md:m-0 md:mb-2`}
    >
      <h1
        className="font-medium text-[24px] flex items-center justify-center
       h-[114px] lg:hidden"
      >
        MyWallet
      </h1>
      <section
        className="md:max-w-full flex flex-col md:flex-row md:m-0 md:p-2 gap-[40px]
        ml-2 mt-8 overflow-x-auto overflow-y-hidden scroll"
      >
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
              <PiUserListFill size={30} />
              <span className="lg:hidden">Usuários</span>
            </ActiveLink>

            <Dialog.Root
              isOpen={isModalCategori}
              Open={
                <ActiveLink
                  href={''}
                  data-title="Categorias"
                  onClick={handleModalCategori}
                >
                  <MdCategory size={30} />
                  <span className="lg:hidden">Categorias</span>
                </ActiveLink>
              }
            >
              <CategoriModal closeModal={handleModalCategori} />
            </Dialog.Root>
          </>
        )}

        <ActiveLink href={'/main/configuracao'} data-title="Configurações">
          <RiSettings5Fill size={30} />
          <span className="lg:hidden">Configurações</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <button className="hover:underline" onClick={signOut}>
            <span className="md:hidden">Sair</span>
            <MdLogout size={30} className="hidden md:flex" />
          </button>
        </ActiveLink>
      </section>
    </nav>
  );
};
