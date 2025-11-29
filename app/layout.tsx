import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aventure de Sacha - Apprentissage CP',
  description: 'Plateforme d\'apprentissage ludique pour Sacha',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}

