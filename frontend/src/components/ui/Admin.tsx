'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { AuthContext } from '~/context/auth/authContext';
import Foto01 from '../../../public/FotoPerfil.jpeg';

export const Admin = () => {
  const [hidden, setHidden] = useState(true);
  const { signOut } = useContext(AuthContext);

  const handleAdmin = () => {
    setHidden(!hidden);
  };
  return (
    <button
      onClick={handleAdmin}
      className="p-2 flex items-center gap-2 relative"
    >
      <Image alt="" src={Foto01} width={46} className="rounded-full" />

      <div className="flex flex-col items-end">
        <span>Gabriel Rieff</span>
        <span className="text-grey-700 text-sm">Admin</span>
      </div>

      <section
        className={`${
          hidden ? 'hidden ' : 'flex '
        }absolute bg-grey-400 w-[200px] text-white-100`}
      >
        <button className="" onClick={signOut}>
          Sair
        </button>
      </section>
    </button>
  );
};
