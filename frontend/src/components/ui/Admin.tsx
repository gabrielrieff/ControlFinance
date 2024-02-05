'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useContext } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { enumUser } from '~/@types/enum/EnumAdmin';
import { AuthContext } from '~/context/auth/authContext';

export const Admin = () => {
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2">
        {!user?.photo ? (
          <div
            className="bg-grey-400 h-[40px] w-[40px] flex items-center
           justify-center rounded-full"
          >
            <BiSolidUser size={30} />
          </div>
        ) : (
          <Image
            alt={`${user!.firstName} ${user!.lastName}`}
            src={`http://localhost:3333/files/image/user/${user!.photo}`}
            width={46}
            height={46}
            className="rounded-full h-[46px] object-cover"
          />
        )}

        <div className="flex flex-col items-end">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-grey-700 text-sm">{typeUser}</span>
        </div>
      </DropdownMenu.Trigger>
    </DropdownMenu.Root>
  );
};
