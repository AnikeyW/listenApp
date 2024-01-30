import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Player from '@/components/player/Player';
import Wrapper from '@/components/wrapper/Wrapper';
import MainSection from '@/components/mainSection/mainSection';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ListenBro',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
  // appleWebApp: {
  //   statusBarStyle: 'black-translucent',
  // },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Wrapper>
          <Navbar />
          <MainSection>{children}</MainSection>
          <Player />
        </Wrapper>
        <div id={'overlays'}></div>
      </body>
    </html>
  );
}
