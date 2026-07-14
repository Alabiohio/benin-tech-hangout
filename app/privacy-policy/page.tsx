import Link from "next/link";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-biro-blue hover:text-biro-blue-dark transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="text-[11px] font-black uppercase tracking-widest">Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-500 font-medium max-w-2xl">
            Your privacy is important to us. This Privacy Policy explains how Benin Tech Fest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, discloses, and safeguards your information when you visit our website or register for our events.
          </p>
          <p className="mt-2 text-slate-400 text-sm">
            Last updated: July 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-12">

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Register for the event (attendee, volunteer, exhibitor, or speaker registration)</li>
                <li>Fill out contact forms or request information</li>
                <li>Subscribe to our newsletter or communications</li>
                <li>Interact with our social media pages</li>
              </ul>
              <p>This information may include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full name and organization name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Professional details (job title, company, industry)</li>
                <li>Payment information (processed through secure third-party payment processors)</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              2. How We Use Your Information
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process your event registration and confirm your attendance</li>
                <li>Send event-related updates, schedules, and announcements</li>
                <li>Facilitate networking and matching with other attendees, speakers, and partners</li>
                <li>Process ticket purchases and payments</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you newsletters, marketing communications, and information about future events (you may opt out at any time)</li>
                <li>Improve our website and event experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              3. How We Share Your Information
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website, processing payments, sending emails, and providing event services.</li>
                <li><strong>Event Partners and Sponsors:</strong> Limited information (such as name, company, and job title) may be shared with sponsors and partners for networking purposes. We will always inform you if this applies.</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights, property, or safety, or that of others.</li>
                <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of our assets.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              4. Data Security
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              5. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can choose to disable cookies through your browser settings, though some features of the website may not function properly as a result.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              6. Your Rights
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request that we correct any inaccurate or incomplete information.</li>
                <li><strong>Deletion:</strong> Request that we delete your personal information (subject to legal obligations).</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, commonly used format.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:benintechfest@gmail.com" className="text-biro-blue hover:text-biro-blue-dark underline">benintechfest@gmail.com</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              7. Third-Party Links
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Our website may contain links to third-party websites, including payment processors and social media platforms. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              8. Children&apos;s Privacy
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 13, we will take steps to delete that information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black font-cabinet-grotesk text-slate-900 uppercase tracking-tight mb-4">
              10. Contact Us
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-2">
                <p className="font-black text-slate-900 uppercase text-[11px] tracking-widest">Benin Tech Fest</p>
                <p>Email: <a href="mailto:benintechfest@gmail.com" className="text-biro-blue hover:text-biro-blue-dark underline">benintechfest@gmail.com</a></p>
                <p>Phone: <a href="tel:+2347012341561" className="text-biro-blue hover:text-biro-blue-dark underline">+234 701 234 1561</a></p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
