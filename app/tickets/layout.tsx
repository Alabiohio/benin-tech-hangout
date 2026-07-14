export const metadata = {
  title: "Get Tickets | Benin Tech Fest 2.0",
  description: "Secure your spot at Benin Tech Fest 2.0. Join 3000+ innovators for the flagship tech event of Benin City. Early bird and regular tickets available.",
  openGraph: {
    title: "Get Tickets | Benin Tech Fest 2.0",
    description: "Join 3000+ innovators at Benin Tech Fest 2.0. Get your tickets now for the most impactful tech gathering in Benin City.",
    url: "https://benintechfest.com.ng/tickets",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Tickets" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Tickets | Benin Tech Fest 2.0",
    description: "Join 3000+ innovators at Benin Tech Fest 2.0. Get your tickets now.",
    images: ["/logo/logo.png"],
  },
};

export default function TicketsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
