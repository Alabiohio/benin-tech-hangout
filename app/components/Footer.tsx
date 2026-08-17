'use client';

import Image from 'next/image';
import footBanner from '@/assets/images/footer/pattern.png';
import insta from '@/assets/images/footer/instagram.svg';
import linkedin from '@/assets/images/footer/linkedin.svg';
import tiktok from '@/assets/images/footer/tiktok.svg';
import xlogo from '@/assets/images/footer/xlogo.svg';

import { useState } from 'react';

const imgFootBanner = footBanner.src;
const imgInstagram = insta.src;
const imgLinkedin = linkedin.src;
const imgTiktok = tiktok.src;
const imgX = xlogo.src;

interface FooterLink {
  label: string;
  href?: string;
}

const FOOTER_LINKS_COL1: FooterLink[] = [
  { label: 'Get tickets', href: '/ticket' },
  { label: 'Apply to pitch', href: 'https://forms.gle/uGBYW1cQ7ShDAjh38' },
  { label: 'Event schedule', href: '/schedule' },
  { label: 'Join our community', href: 'https://whatsapp.com/channel/0029VbCyw0P9mrGciiEpD71G' },
];

const FOOTER_LINKS_COL2: FooterLink[] = [
  { label: 'Volunteer', href: 'https://forms.gle/kkEu2pQNmznFTDpw8' },
  { label: 'Apply to speak', href: '/speaker-registration' },
  { label: 'Be an exhibitor', href: '/exhibition' },
  { label: 'Sponsor BTF 2.0', href: '/#sponsor' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
];

function SocialIcon({ icon, alt, href }: { icon: string; alt: string; href?: string }) {
  return (
    <a href={href || "#"} target={href ? "_blank" : undefined} rel={href ? "noopener noreferrer" : undefined} className="w-10 h-10 flex items-center justify-center hover:opacity-75 transition">
      <Image width={16} height={16} src={icon} alt={alt} className="w-full h-full" />
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full bg-[var(--color-blue-inverted)] flex flex-col gap-10 items-start justify-center p-5 md:p-10">
      {/* Footer Box */}
      <div className="w-full bg-[var(--color-static-black)] flex flex-col items-start justify-end overflow-hidden rounded-[40px] md:rounded-[80px]">
        {/* Footer Banner */}
        <div className="w-full aspect-[2720/448] relative overflow-hidden">
          <Image
            src={imgFootBanner}
            alt="BTF 2.0"
            className="w-full h-full object-cover"
            width={280}
            height={280}
          />
        </div>

        {/* Newsletter Section */}
        <div className="w-full border-t-2 border-b-2 border-[var(--color-gray-inverted)] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between px-6 py-6 md:px-10">
          {/* Left: Socials & Copyright */}
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-2 items-center">
              <SocialIcon icon={imgInstagram} alt="Instagram" href="https://www.instagram.com/benintechfest/" />
              <SocialIcon icon={imgLinkedin} alt="LinkedIn" href="https://www.linkedin.com/company/benin-tech-fest-page/" />
              <SocialIcon icon={imgTiktok} alt="TikTok" href="https://www.tiktok.com/@benintechfest" />
              <SocialIcon icon={imgX} alt="X (Twitter)" href="https://x.com/Benintechfest" />
            </div>
            <p className="text-[16px] font-normal font-['Inter'] leading-[1.2] text-[#a1a1a1] tracking-[-0.32px] text-center">
              © 2026 Benin Tech Fest. All rights reserved.
            </p>
          </div>

          {/* Right: Newsletter Subscription */}
          <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
              <div className="bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] flex gap-1 items-center px-6 py-4 rounded-lg w-full md:w-[400px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent text-[18px] font-normal font-['Inter'] text-white placeholder-[#a1a1a1] tracking-[-0.36px] outline-none w-full"
                />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={status === 'loading'}
                className="px-6 py-4 bg-[var(--color-static-blue)] text-[var(--color-static-white)] rounded-lg sm:rounded-full font-['Bricolage_Grotesque'] font-medium text-[20px] leading-[1] uppercase tracking-[-0.4px] hover:opacity-90 transition whitespace-nowrap text-center disabled:opacity-70"
              >
                {status === 'loading' ? 'SUBSCRIBING...' : status === 'success' ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
              </button>
            </div>
            {status === 'success' && <p className="text-[#84CAFF] text-[14px] font-normal font-['Inter'] pl-2">Successfully subscribed!</p>}
            {status === 'error' && <p className="text-red-400 text-[14px] font-normal font-['Inter'] pl-2">Failed to subscribe. Please try again.</p>}
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0 p-6 md:p-10 text-[18px] font-normal font-['Inter'] text-[#a1a1a1] tracking-[-0.36px]">
          {/* Column 1 */}
          <div className="flex flex-col gap-2">
            {FOOTER_LINKS_COL1.map((link) => (
              <a
                key={link.label}
                href={link.href || '#'}
                className="leading-[1.4] hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-2">
            {FOOTER_LINKS_COL2.map((link) => (
              <a
                key={link.label}
                href={link.href || '#'}
                className="leading-[1.4] hover:text-white transition"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3 - Contact Info */}
          <div className="flex flex-col gap-2">
            <div>
              <p className="leading-[1.4]">Email:</p>
              <p className="leading-[1.4]">info@benintechfest.com.ng</p>
            </div>
            <p className="leading-[1.4]">Call/WhatsApp:</p>
            <div>
              <p className="leading-[1.4]">+2348142289951;</p>
              <p className="leading-[1.4]">+2348145658605</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
