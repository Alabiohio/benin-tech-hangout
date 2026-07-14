export const metadata = {
  title: "Privacy Policy | Benin Tech Fest 2.0",
  description: "Privacy Policy for Benin Tech Fest 2.0 - Learn how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Benin Tech Fest 2.0",
    description: "Learn how Benin Tech Fest 2.0 collects, uses, and protects your personal information.",
    url: "https://benintechfest.com.ng/privacy-policy",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Privacy Policy" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Benin Tech Fest 2.0",
    description: "Learn how Benin Tech Fest 2.0 protects your personal information.",
    images: ["/logo/logo.png"],
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
