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

export function SheetSide() {
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
    <div className="hidden xl:block">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <IoMenuOutline />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="w-1/3">
          <SheetHeader>
            <div className="flex flex-row gap-3">
              <SheetClose>
                <CgMenuMotion size={20} />
              </SheetClose>
              <SheetTitle>MyWallet</SheetTitle>
            </div>
          </SheetHeader>
          <div className="grid gap-4 py-4">
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
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
