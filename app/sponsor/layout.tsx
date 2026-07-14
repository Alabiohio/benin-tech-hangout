export const metadata = {
  title: "Sponsor | Benin Tech Fest 2.0",
  description: "Partner with Benin Tech Fest 2.0 and position your brand at the center of Benin City's fastest-growing tech community. Sponsorship opportunities available.",
  openGraph: {
    title: "Sponsor | Benin Tech Fest 2.0",
    description: "Partner with Benin Tech Fest 2.0 and reach 3000+ tech innovators. Become a sponsor today.",
    url: "https://benintechfest.com.ng/sponsor",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Sponsor" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsor | Benin Tech Fest 2.0",
    description: "Partner with Benin Tech Fest 2.0 and reach 3000+ tech innovators.",
    images: ["/logo/logo.png"],
  },
};

export default function SponsorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
