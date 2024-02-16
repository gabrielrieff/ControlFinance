'use client';
import Link from 'next/link';
import { Categories } from './Categories';
import { Expense } from './Expense';
import { Revenue } from './Revenue';
import { Button } from './shadcn/button';
import { Dialog, DialogTrigger } from './shadcn/dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './shadcn/sheet';

import { CgMenuMotion } from 'react-icons/cg';
import { Avatar, AvatarImage } from './shadcn/avatar';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import { enumUser } from '~/@types/enum/EnumAdmin';
import { IoMenuOutline } from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './shadcn/dropdown-menu';
import { MdOutlineWbSunny } from 'react-icons/md';
import { BsMoonStarsFill } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import { GrGoogleWallet } from 'react-icons/gr';

export function SheetSide() {
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
    <div className="hidden dxl:block">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <IoMenuOutline />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="w-1/3 dmd:w-2/3">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <GrGoogleWallet />
              MyWallet
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-around items-start mt-7 h-full">
            <div className="flex flex-col items-start justify-center gap-4 py-4 ml-8">
              <Button variant="link" asChild>
                <Link className="" href="/main/configuracao">
                  Configurações
                </Link>
              </Button>

              <Button variant="link" asChild>
                <Link className="" href="/main/users">
                  Usuários
                </Link>
              </Button>

              <Button variant="link" asChild>
                <Link href="/main/dashboard">Dashboar</Link>
              </Button>

              <Button variant="link" asChild>
                <Link href="/main/transactions">Lista de transações</Link>
              </Button>

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

              <Button variant="link" onClick={signOut}>
                sair
              </Button>
            </div>
            <SheetFooter>
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
              <div className="flex">
                <Avatar>
                  {user?.photo && (
                    <AvatarImage
                      src={`http://localhost:3333/files/image/user/${user.photo}`}
                      alt={`${user!.firstName} ${user!.lastName}`}
                      className="object-cover"
                    />
                  )}
                </Avatar>
                <div className="flex flex-col items-end w-[115px]">
                  <span>
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="font-light text-sm">{typeUser}</span>
                </div>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
