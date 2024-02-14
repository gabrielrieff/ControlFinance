import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AuthProvider } from '~/context/auth/authContext';

import './globals.css';
import { ThemeProvider } from '~/components/ProviderTheme';

export const metadata: Metadata = {
  title: 'Login'
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${poppins.className}`}>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
