import type { Metadata } from 'next';
import { AuthProvider } from '~/context/auth/authContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Login'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
