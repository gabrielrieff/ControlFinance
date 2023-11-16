'use client';

import { usePathname } from 'next/navigation';
import { nameRoutes } from '~/@types/nameRoutes';
import { Admin } from './ui/Admin';

export const Header = () => {
  const pathname = usePathname() as string;

  const title = nameRoutes[pathname] || 'Título Padrão';

  return (
    <header className="h-[85px] flex justify-between px-6 py-1 items-center bg-white-100 rounded-[20px]">
      <h1 className="font-semibold text-[30px] md:text-[24px] sm:text-[16px]">
        {title}
      </h1>
      <Admin />
    </header>
  );
};
