import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google"; // Import next/font/google
import "./globals.css";
import "aos/dist/aos.css";

// Configure fonts
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald-google",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-google",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://benintechfest.com.ng'),
  title: "Benin Tech Fest 2.0 | A CONVERGENCE Of EDO'S TECH ECOSYSTEM",
  description: "Join 3000+ innovators at the flagship tech event of Benin City. A curated space for the ecosystem to connect, learn, and scale. Connect with leaders, founders, and talents.",
  keywords: ["Benin Tech Fest", "Benin City Tech", "Tech Event Nigeria", "Edo State Tech", "Networking", "Innovation"],
  authors: [{ name: "Benin Tech Fest" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Benin Tech Fest 2.0 | A CONVERGENCE OF EDO'S TECH ECOSYSTEM",
    description: "The flagship tech event of Benin City returns. Join the most impactful gathering of tech talents, founders, and organizations.",
    url: "https://benintechfest.com.ng",
    siteName: "Benin Tech Fest",
    images: [
      {
        url: "/assets/banner.png",
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
    images: ["/assets/banner.png"],
  },
  icons: {
    icon: "/logo/logo.png",
    apple: "/logo/logo.png",
  }
};


import AosInit from "./components/AosInit";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased font-cabinet-grotesk overflow-x-hidden">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AosInit />
          <ScrollToTop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}