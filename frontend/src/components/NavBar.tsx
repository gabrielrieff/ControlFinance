'use client';

import { useContext } from 'react';
import { BiSolidDashboard, BiTransfer, BiUserPlus } from 'react-icons/bi';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { RiSettings5Fill } from 'react-icons/ri';
import { AuthContext } from '~/context/auth/authContext';
import { ActiveLink } from './shared/ActiveLink';

export const NavBar = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <nav className="max-w-[250px] bg-white-100 h-full pe-2 rounded-br-[40px] rounded-tr-[40px]">
      <h1 className="font-medium text-[24px] flex items-center justify-center h-[114px]">
        MyWallet
      </h1>
      <section className=" flex flex-col gap-[40px] ml-2">
        <ActiveLink href={'/main/dashboard'}>
          <BiSolidDashboard size={30} />
          <span>Dashboard</span>
        </ActiveLink>

        <ActiveLink href={'/main/addUser'}>
          <BiUserPlus size={30} />
          <span>Criar novo usuário</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <BiTransfer size={30} />
          <span>Transações mensais</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <GiReceiveMoney size={30} />
          <span>Adicionar receita</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <GiPayMoney size={30} />
          <span>Adicionar despeça</span>
        </ActiveLink>

        <ActiveLink href={''}>
          <RiSettings5Fill size={30} />
          <span>Configurações</span>
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
