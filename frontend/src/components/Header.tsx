'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from './shadcn/navigation-menu';
import { Avatar, AvatarImage } from './shadcn/avatar';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { enumUser } from '~/@types/enum/EnumAdmin';
import { BiSolidDashboard, BiTransfer } from 'react-icons/bi';
import { FaList } from 'react-icons/fa';
import { Revenue } from './Revenue';
import { Dialog, DialogTrigger } from './shadcn/dialog';
import { Button } from './shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './shadcn/dropdown-menu';
import { Expense } from './Expense';
import { Categories } from './Categories';
import { SheetSide } from './SheetSide';

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const typeUser =
    user?.userType! === enumUser.Admin
      ? 'Admin'
      : user?.userType! === enumUser.Padrao
      ? 'Padrão'
      : user?.userType! === enumUser.Master
      ? 'Master'
      : 'Tipo desconhecido';

  return (
    <div className="w-full flex justify-around">
      <SheetSide />

      <Link href={'/'} className="font-medium text-[24px] center">
        MyWallet
      </Link>
      <NavigationMenu className="flex items-center justify-around xl:hidden">
        <NavigationMenuList className="w-2/3">
          <NavigationMenuItem>
            <Link href="/main/dashboard" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex gap-2`}
              >
                <BiSolidDashboard size={20} />
                Dashboar
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/main/transactions" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} flex gap-2`}
              >
                <FaList size={20} />
                Lista de transações
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 px-4 py-1.5 hover:bg-accent rounded-md">
              <BiTransfer size={20} />
              Transações
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col items-start">
              <DropdownMenuLabel>Transações/Categoria</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link">Adicionar receita</Button>
                </DialogTrigger>
                <Revenue />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link">Adicionar despesa</Button>
                </DialogTrigger>
                <Expense />
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link">Categorias</Button>
                </DialogTrigger>
                <Categories />
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 px-4 py-1.5 w-full hover:bg-accent rounded-md">
              <div className="flex flex-col items-end w-[115px]">
                <span>
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="font-light text-sm">{typeUser}</span>
              </div>
              <Avatar>
                {user?.photo && (
                  <AvatarImage
                    src={`http://localhost:3333/files/image/user/${user.photo}`}
                    alt={`${user!.firstName} ${user!.lastName}`}
                    className="object-cover"
                  />
                )}
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="flex flex-col items-start">
              <DropdownMenuLabel>Usuário</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Button variant="link" asChild>
                <a className="" href="/main/configuracao">
                  Configurações
                </a>
              </Button>

              <Button variant="link" asChild>
                <a className="" href="/main/users">
                  Usuários
                </a>
              </Button>

              <Button
                className="cursor-pointer"
                variant="link"
                onClick={signOut}
              >
                Sair
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
