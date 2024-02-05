'use client';

import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from './shadcn/navigation-menu';
import { Avatar, AvatarImage } from './shadcn/avatar';
import { useContext, useState } from 'react';
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

export const Header = () => {
  const { user } = useContext(AuthContext);
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
      <Link href={'/'} className="font-medium text-[24px]">
        MyWallet
      </Link>
      <NavigationMenu className="flex items-center justify-around">
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
              <DropdownMenuLabel>Edit Entry</DropdownMenuLabel>
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
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link">Categorias</Button>
                </DialogTrigger>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <NavigationMenuItem className="flex">
            <NavigationMenuTrigger className="flex gap-2">
              <div className="flex flex-col items-end">
                {user?.firstName} {user?.lastName}
                <span className="font-light text-sm">{typeUser}</span>
              </div>
              <Avatar>
                {/* <AvatarImage
                  src={`http://localhost:3333/files/image/user/${user!.photo!}`}
                  alt={`${user!.firstName} ${user!.lastName}`}
                  className="object-cover"
                /> */}
              </Avatar>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="">
              <ul className="grid gap-3 p-4 w-[580px]">
                <li className="row-span-3">
                  <Button variant={'link'}>
                    <NavigationMenuLink asChild>
                      <a className="" href="/main/configuracao">
                        Configurações
                      </a>
                    </NavigationMenuLink>
                  </Button>
                </li>

                <li className="row-span-3">
                  <Button variant={'link'}>
                    <NavigationMenuLink asChild>
                      <a className="" href="/main/users">
                        Usuários
                      </a>
                    </NavigationMenuLink>
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
