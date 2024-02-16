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
import { Revenue } from './Revenue';
import { Dialog, DialogTrigger } from './shadcn/dialog';
import { Button } from './shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './shadcn/dropdown-menu';
import { Expense } from './Expense';
import { Categories } from './Categories';
import { SheetSide } from './SheetSide';
import { useTheme } from 'next-themes';
import { MdOutlineWbSunny } from 'react-icons/md';
import { GrGoogleWallet } from 'react-icons/gr';
import { BsMoonStarsFill } from 'react-icons/bs';

export const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const { setTheme } = useTheme();

  const typeUser =
    user?.userType! === enumUser.Admin
      ? 'Admin'
      : user?.userType! === enumUser.Padrao
      ? 'Padrão'
      : user?.userType! === enumUser.Master
      ? 'Master'
      : 'Tipo desconhecido';

  return (
    <header className="w-full flex justify-center dxl:justify-around fixed bluer backdrop-blur-sm bg-white/30 p-3">
      <SheetSide />

      <Link
        href={'/'}
        className="font-medium text-[24px] mlg center gap-2 hidden dxl:flex"
      >
        <GrGoogleWallet />
        MyWallet
      </Link>

      <NavigationMenu className="flex justify-around dxl:hidden">
        <NavigationMenuList className="w-[1200px] center flex-row justify-between gap-3">
          <div className="center flex-row gap-3">
            <NavigationMenuItem>
              <Link href={'/'} className="font-medium text-[24px] center gap-2">
                <GrGoogleWallet />
                MyWallet
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/main/dashboard"
                className={`${navigationMenuTriggerStyle()} flex gap-2`}
              >
                Dashboar
              </NavigationMenuLink>
            </NavigationMenuItem>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-2 px-4 py-1.5 hover:bg-accent rounded-md">
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
          </div>

          <div className="center flex-row gap-2">
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
                  <Link className="text-sm" href="/main/configuracao">
                    Configurações
                  </Link>
                </Button>

                <Button variant="link" asChild>
                  <Link className="text-sm" href="/main/users">
                    Usuários
                  </Link>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-none shadow-none"
                >
                  <MdOutlineWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <BsMoonStarsFill className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
