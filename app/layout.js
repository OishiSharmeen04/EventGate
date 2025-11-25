import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TicketHub - Discover Amazing Events',
  description: 'Book tickets for concerts, conferences, sports events, and more',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> 
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
