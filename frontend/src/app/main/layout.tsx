import type { Metadata } from 'next';
import { Header } from '~/components/Header';
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
      <div className="flex flex-col items-center gap-2 w-full">
        <Header />
        {children}
      </div>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
