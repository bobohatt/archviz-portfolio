import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: 'WaArchi Studio | Architekturvisualisierung',
    template: '%s | WaArchi Studio'
  },
  description: 'Professionelle 3D-Architekturvisualisierung. Fotorealistische Renderings für Architekten und Immobilienentwickler. Exterior, Interior und Produktvisualisierung.',
  keywords: ['Architekturvisualisierung', '3D Rendering', 'Archviz', 'Innenraumvisualisierung', 'Außenvisualisierung', 'Architectural Visualization', '3D Visualisierung'],
  authors: [{ name: 'WaArchi Studio' }],
  creator: 'WaArchi Studio',
  metadataBase: new URL('https://waarchi.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://waarchi.de',
    siteName: 'WaArchi Studio',
    title: 'WaArchi Studio | Architekturvisualisierung',
    description: 'Professionelle 3D-Architekturvisualisierung. Fotorealistische Renderings für Architekten und Immobilienentwickler.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'WaArchi Studio - Architekturvisualisierung',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WaArchi Studio | Architekturvisualisierung',
    description: 'Professionelle 3D-Architekturvisualisierung. Fotorealistische Renderings für Architekten und Immobilienentwickler.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${jost.variable} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}