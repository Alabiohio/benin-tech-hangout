import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benin Tech Hangout 2.0 | Strengthening Benin City's Tech Ecosystem",
  description: "A free tech community event focused on bringing together tech talents, founders, students, brands, companies, and organizations to strengthen and grow Benin City’s tech ecosystem.",
};

import AOSInit from "./components/AOSInit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400;1,700&family=Righteous&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
