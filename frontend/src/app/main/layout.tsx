import type { Metadata } from 'next';
import { Header } from '~/components/Header';
import { NavBar } from '~/components/NavBar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="pt-BR">
      <div className="flex md:flex-col h-screen w-full pt-3 pr-3 pb-3 md:p-2">
        {/* <NavBar /> */}
        <div className="flex flex-col gap-2 w-full">
          <Header />
          {children}
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
}
