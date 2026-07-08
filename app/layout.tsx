import type { Metadata } from "next";
import { Oswald } from "next/font/google"; // Import next/font/google
import "./globals.css";
import "aos/dist/aos.css";

// Configure fonts
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald-google",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Benin Tech Fest 2.0 | Strengthening Benin City's Tech Ecosystem",
  description: "Join 3000+ innovators at the flagship tech event of Benin City. A curated space for the ecosystem to connect, learn, and scale. Connect with leaders, founders, and talents.",
  keywords: ["Benin Tech Fest", "Benin City Tech", "Tech Event Nigeria", "Edo State Tech", "Networking", "Innovation"],
  authors: [{ name: "Benin Tech Community" }],
  openGraph: {
    title: "Benin Tech Fest 2.0 | Experience the Future",
    description: "The flagship tech event of Benin City returns. Join the most impactful gathering of tech talents, founders, and organizations.",
    url: "https://benintechFestpreview.vercel.app",
    siteName: "Benin Tech Fest",
    images: [
      {
        url: "/BTH-10-1.jpg",
        width: 1200,
        height: 630,
        alt: "Benin Tech Fest 2.0 Hero Image",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benin Tech Fest 2.0",
    description: "Uniting Benin City's Tech Community. Join 3000+ innovators this year.",
    images: ["/BTH-10-1.jpg"],
  },
  icons: {
    icon: "/logo/logo.png",
    apple: "/logo/logo.png",
  }
};


import AosInit from "./components/AosInit";
import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable}`}>
      <body className="antialiased font-righteous">
        <AosInit />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
