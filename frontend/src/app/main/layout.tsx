import type { Metadata } from 'next';
import { Header } from '~/components/Header';
import { NavBar } from '~/components/NavBar';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-blue-300 flex h-screen w-screen pt-3 pr-3 pb-3">
        <NavBar />
        <div className="flex flex-col gap-2 w-full">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
