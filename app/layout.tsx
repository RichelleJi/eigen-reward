import './global.css';
import OnchainProviders from '@/OnchainProviders';

import type { Metadata } from 'next';
import { inter } from './fonts';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  other: {
    boat: '0.17.0',
  },
};

// Stat analytics before the App renders,
// so we can track page views and early events

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body className="flex flex-1 flex-col">
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
