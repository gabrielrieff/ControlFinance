'use client';

import { usePathname } from 'next/navigation';
import { Admin } from './ui/Admin';

export const Header = () => {
  const pathname = usePathname();

  const handleTitle = (title: string) => {
    const str = title.replace('/main/', '');
    const path = str.charAt(0).toUpperCase() + str.slice(1);

    if (path === 'AddUser') {
      return 'Adicionar novo usuário';
    } else {
      return path;
    }
  };

  const title = handleTitle(pathname);

  return (
    <header className="h-[85px] flex justify-between px-6 items-center bg-white-100 rounded-[20px]">
      <h1 className="font-semibold text-[30px]">{title}</h1>
      <Admin />
    </header>
  );
};
