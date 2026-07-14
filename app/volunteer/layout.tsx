export const metadata = {
  title: "Volunteer | Benin Tech Fest 2.0",
  description: "Volunteer at Benin Tech Fest 2.0. Join our team and help create an unforgettable experience for thousands of innovators in Benin City.",
  openGraph: {
    title: "Volunteer | Benin Tech Fest 2.0",
    description: "Join the team at Benin Tech Fest 2.0. Volunteer and help create an unforgettable experience.",
    url: "https://benintechfest.com.ng/volunteer",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Volunteer" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteer | Benin Tech Fest 2.0",
    description: "Join the team at Benin Tech Fest 2.0. Volunteer and help create an unforgettable experience.",
    images: ["/logo/logo.png"],
  },
};

export default function VolunteerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
