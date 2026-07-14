export const metadata = {
  title: "Exhibitor Registration | Benin Tech Fest 2.0",
  description: "Register as an exhibitor at Benin Tech Fest 2.0. Showcase your brand, products, and innovations to 3000+ tech enthusiasts and leaders.",
  openGraph: {
    title: "Exhibitor Registration | Benin Tech Fest 2.0",
    description: "Showcase your brand at Benin Tech Fest 2.0. Register now to exhibit to 3000+ innovators.",
    url: "https://benintechfest.com.ng/exhibitor",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Exhibitor" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exhibitor Registration | Benin Tech Fest 2.0",
    description: "Showcase your brand at Benin Tech Fest 2.0. Register to exhibit to 3000+ innovators.",
    images: ["/logo/logo.png"],
  },
};

export default function ExhibitorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
