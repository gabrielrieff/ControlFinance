'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import Foto01 from '../../../public/FotoPerfil.jpeg';

export const Admin = () => {
  const { signOut, user } = useContext(AuthContext);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2">
        <Image alt="" src={Foto01} width={46} className="rounded-full" />

        <div className="flex flex-col items-end">
          <span>Gabriel Rieff</span>
          <span className="text-grey-700 text-sm">Admin</span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={20}
          className="bg-grey-300 w-[200px] rounded-md p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          <DropdownMenu.Item
            onClick={signOut}
            className="hover:bg-grey-400 cursor-pointer w-full text-start rounded-sm py-[3px] px-2"
          >
            Deslogar
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
