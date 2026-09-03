import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One Tribe",
  description: "One Tribe Bologna Ultimate Frisbee: squadre, corsi e comunità sportiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${montserrat.variable} antialiased`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
