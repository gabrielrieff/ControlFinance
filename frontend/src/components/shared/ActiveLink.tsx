'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { AnchorHTMLAttributes, ReactNode } from 'react';

type activeLinkPros = {
  children: ReactNode;
} & LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export const ActiveLink = ({ href, children, ...rest }: activeLinkPros) => {
  const pathname = usePathname();

  const isCurrentPath = pathname === href || pathname === rest.as;
  return (
    <Link
      {...rest}
      href={href}
      className={`${
        isCurrentPath ? 'bg-black-100 text-white-100' : 'hover:bg-grey-400'
      } flex items-center rounded-lg p-1 gap-3`}
    >
      {children}
    </Link>
  );
};
