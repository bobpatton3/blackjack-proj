import { DeckDataContextProvider } from '@/context/deckDataContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blackjack',
  description: 'simple Blackjack app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DeckDataContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </DeckDataContextProvider>
  )
}
