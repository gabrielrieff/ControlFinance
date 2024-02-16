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
        isCurrentPath ? 'text-purple-700' : ''
      } inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 px-4 py-2 cursor-pointer`}
    >
      {children}
    </Link>
  );
};
