import { BiSolidDashboard, BiUserPlus } from 'react-icons/bi';
import { ActiveLink } from './shared/ActiveLink';

export const NavBar = () => {
  return (
    <nav className="max-w-[250px] bg-white-100 h-full pe-2 rounded-br-[40px] rounded-tr-[40px]">
      <h1 className="font-medium text-[24px] flex items-center justify-center h-[114px]">
        MyWallet
      </h1>
      <section className=" flex flex-col gap-[40px] ml-2">
        <ActiveLink href={'/dashboard'}>
          <BiSolidDashboard size={30} />
          <span>Dashboard</span>
        </ActiveLink>

        <ActiveLink href={'/AddUser'}>
          <BiUserPlus size={30} />
          <span>Criar novo usuário</span>
        </ActiveLink>
      </section>
    </nav>
  );
};
