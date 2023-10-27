'use client';

import { useContext } from 'react';
import { AuthContext } from '~/context/auth/authContext';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <main className="flex justify-center items-center">
      <h1>Dashboard</h1>
      <button onClick={signOut} className="text-red-200">
        sair
      </button>
    </main>
  );
}
