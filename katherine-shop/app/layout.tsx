import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katherine Design Studio — магазин',
  description: 'Дизайнерські сертифікати та поліграфія. Хмельницький, Україна.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Manrope:wght@800&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
