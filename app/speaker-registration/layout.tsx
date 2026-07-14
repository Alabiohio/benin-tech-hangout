export const metadata = {
  title: "Speaker Registration | Benin Tech Fest 2.0",
  description: "Apply to speak or nominate a speaker for Benin Tech Fest 2.0. Share your expertise with 3000+ innovators at Benin City's flagship tech event.",
  openGraph: {
    title: "Speaker Registration | Benin Tech Fest 2.0",
    description: "Take the stage at Benin Tech Fest 2.0. Apply to speak or nominate a visionary leader.",
    url: "https://benintechfest.com.ng/speaker-registration",
    siteName: "Benin Tech Fest",
    images: [{ url: "/logo/logo.png", width: 1200, height: 630, alt: "Benin Tech Fest 2.0 Speaker Registration" }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speaker Registration | Benin Tech Fest 2.0",
    description: "Apply to speak at Benin Tech Fest 2.0. Share your expertise with 3000+ innovators.",
    images: ["/logo/logo.png"],
  },
};

export default function SpeakerRegistrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
