'use client';

import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

export default function NovoUsuario() {
  const {} = useContext(AuthContext);
  return (
    <main
      className="flex flex-col justify-between items-center bg-white-100
    h-full rounded-[20px] p-4"
    >
      adicionar usuario
    </main>
  );
}
