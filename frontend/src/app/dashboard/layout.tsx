import type { Metadata } from 'next';
import { Header } from '~/components/Header';
import { NavBar } from '~/components/NavBar';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-blue-300 flex h-screen pt-3 pr-3 pb-3">
        <div className="w-[300px]">
          <NavBar />
        </div>
        <div className="grid grid-rows-3 col-span-1 w-full">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
