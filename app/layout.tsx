import type { Metadata } from "next";
import { Andika, Righteous } from "next/font/google"; // Import next/font/google
import "./globals.css";
import "aos/dist/aos.css";

// Configure fonts
const andika = Andika({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-andika-google",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-righteous-google",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Benin Tech Hangout 2.0 | Strengthening Benin City's Tech Ecosystem",
  description: "Join 1000+ innovators at the flagship tech event of Benin City. A curated space for the ecosystem to connect, learn, and scale. Connect with leaders, founders, and talents.",
  keywords: ["Benin Tech Hangout", "Benin City Tech", "Tech Event Nigeria", "Edo State Tech", "Networking", "Innovation"],
  authors: [{ name: "Benin Tech Community" }],
  openGraph: {
    title: "Benin Tech Hangout 2.0 | Experience the Future",
    description: "The flagship tech event of Benin City returns. Join the most impactful gathering of tech talents, founders, and organizations.",
    url: "https://benintechhangoutpreview.vercel.app",
    siteName: "Benin Tech Hangout",
    images: [
      {
        url: "/BTH-10-1.jpg",
        width: 1200,
        height: 630,
        alt: "Benin Tech Hangout 2.0 Hero Image",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benin Tech Hangout 2.0",
    description: "Uniting Benin City's Tech Community. Join 1000+ innovators this year.",
    images: ["/BTH-10-1.jpg"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  }
};

import AOSInit from "./components/AOSInit";
import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${andika.variable} ${righteous.variable}`}>
      <body className="antialiased font-sans">
        <AOSInit />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
