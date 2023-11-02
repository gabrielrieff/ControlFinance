import type { Metadata } from 'next';
import { Header } from '~/components/Header';

export const metadata: Metadata = {
  title: 'Dashboard'
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className="bg-blue-300">
        <Header />
        {children}
      </body>
    </html>
  );
}
