'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { useContext } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { AuthContext } from '~/context/auth/authContext';

export const Admin = () => {
  const { user } = useContext(AuthContext);
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
            src={`http://localhost:3333/files/${user!.photo}`}
            width={46}
            height={46}
            className="rounded-full"
          />
        )}

        <div className="flex flex-col items-end">
          <span>
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-grey-700 text-sm">{user?.admin}</span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          alignOffset={20}
          className="bg-grey-700 text-white-100 w-[200px] rounded-md p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        ></DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
