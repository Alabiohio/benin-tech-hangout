'use client';

import { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  shareUrl?: string;
  shareText?: string;
  showShareOptions?: boolean;
  ctaText?: string;
  onCtaClick?: () => void;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title = "You’re all set!",
  message = "You’ll receive a confirmation email shortly on your registration. See you at BTF.",
  shareUrl,
  shareText = "I just registered for Benin Tech Fest 2.0 (BTF 2.0)! 🚀 Join me in Benin City from Nov 5-7, 2026.",
  showShareOptions = true,
  ctaText = "Alright, got it",
  onCtaClick,
}: ConfirmationModalProps) {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentShareUrl = shareUrl || (typeof window !== 'undefined' ? `${window.location.origin}/register` : 'https://benintechfest.com/register');
  const fullShareMessage = `${shareText}\n\nRegister here: ${currentShareUrl}`;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // Fallback
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleShareLinkedIn = () => {
    copyToClipboard(fullShareMessage);
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentShareUrl)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
    showToast('Link & post text prepared! Opening LinkedIn...');
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentShareUrl)}&hashtags=BTF2026,BeninTechFest`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening X (Twitter)...');
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp...');
  };

  const handleShareInstagram = async () => {
    const copied = await copyToClipboard(fullShareMessage);
    if (copied) {
      showToast('Caption copied to clipboard! Opening Instagram...');
    } else {
      showToast('Opening Instagram...');
    }
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleShareTikTok = async () => {
    const copied = await copyToClipboard(fullShareMessage);
    if (copied) {
      showToast('Caption copied to clipboard! Opening TikTok...');
    } else {
      showToast('Opening TikTok...');
    }
    setTimeout(() => {
      window.open('https://www.tiktok.com/', '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleNativeOrCopyShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Benin Tech Fest 2.0',
          text: shareText,
          url: currentShareUrl,
        });
        showToast('Shared successfully!');
        return;
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return;
      }
    }
    
    const copied = await copyToClipboard(fullShareMessage);
    if (copied) {
      showToast('Event share text & link copied to clipboard!');
    } else {
      showToast('Failed to copy link.');
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-3 sm:p-4 md:p-6 overflow-y-auto">
      <div className="relative w-full max-w-[92vw] sm:max-w-[540px] md:max-w-[680px] my-auto rounded-[24px] bg-[#f8f9fa] p-5 sm:p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] text-center max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close confirmation"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#00000014] text-[1.8rem] sm:text-[2.2rem] font-light leading-none text-[#111111] transition-opacity hover:opacity-80"
        >
          ×
        </button>

        {/* Toast Notification Banner */}
        {toast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>{toast}</span>
          </div>
        )}

        {/* Header Badge & Logo */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="mb-3 flex items-center justify-center">
            <img
              src="/logo/logo-icon.png"
              alt="BTF logo"
              className="h-[70px] w-[63px] sm:h-[100px] sm:w-[90px] md:h-[130px] md:w-[117px] object-contain"
            />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-[#1570EF] font-semibold text-xs sm:text-sm tracking-wide uppercase mb-2">
            Registration Confirmed
          </span>

          <h2
            className="font-cabinet-grotesk font-extrabold leading-[0.95] tracking-[-0.06em] text-[#111111] text-[2rem] sm:text-[2.8rem] md:text-[50px]"
            style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
          >
            {title}
          </h2>

          <p className="mt-2 sm:mt-3 max-w-[500px] text-[0.95rem] sm:text-[1.1rem] font-normal leading-[1.4] tracking-[-0.01em] text-[#4b5563]">
            {message}
          </p>

          {/* Social Share Section */}
          {showShareOptions && (
            <div className="mt-5 sm:mt-6 w-full pt-4 border-t border-gray-200">
              <div className="mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-base font-bold text-[#111827] tracking-tight">
                  Spread the Word! Tell your network you&apos;re attending BTF 2.0
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  Click a platform below to instantly share or copy your invitation:
                </p>
              </div>

              {/* Social Buttons Icon Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
                {/* LinkedIn */}
                <button
                  type="button"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                  onClick={handleShareLinkedIn}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-[#084e96] hover:scale-105 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.3.7-1.93 1.63-1.93 1.15 0 1.57.8 1.57 2.11v4.75h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </button>

                {/* X / Twitter */}
                <button
                  type="button"
                  aria-label="Share on X (Twitter)"
                  title="Share on X (Twitter)"
                  onClick={handleShareTwitter}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#000000] text-white flex items-center justify-center hover:bg-[#1a1a1a] hover:scale-105 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>

                {/* Instagram */}
                <button
                  type="button"
                  aria-label="Share on Instagram"
                  title="Share on Instagram"
                  onClick={handleShareInstagram}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </button>

                {/* TikTok */}
                <button
                  type="button"
                  aria-label="Share on TikTok"
                  title="Share on TikTok"
                  onClick={handleShareTikTok}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#010101] text-white flex items-center justify-center hover:bg-[#1a1a1a] hover:scale-105 transition-all shadow-md border border-gray-800 active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0 text-[#00F2FE]" viewBox="0 0 24 24">
                    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 1 1-2.896-2.896c.244 0 .482.03.71.088V9.336a6.34 6.34 0 0 0-.71-.04A6.335 6.335 0 1 0 15.813 15.63V8.892a8.212 8.212 0 0 0 4.776 1.517V6.964a4.773 4.773 0 0 1-1.000-.278z" />
                  </svg>
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  onClick={handleShareWhatsApp}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1da851] hover:scale-105 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </button>

                {/* Copy Link / Native Share */}
                <button
                  type="button"
                  aria-label="Copy Link"
                  title="Copy Link"
                  onClick={handleNativeOrCopyShare}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#1E293B] text-white flex items-center justify-center hover:bg-[#0f172a] hover:scale-105 transition-all shadow-md active:scale-95"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none shrink-0" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Close / Action Button */}
          <button
            type="button"
            onClick={onCtaClick || onClose}
            className="mt-6 flex h-[48px] sm:h-[56px] w-full max-w-[294px] items-center justify-center rounded-full bg-[#1570EF] text-[1.1rem] sm:text-[1.2rem] font-medium uppercase tracking-[-0.02em] text-white shadow-[0_0_0_2px_rgba(21,112,239,0.12)] transition-colors duration-200 hover:bg-[#0f62d9]"
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}

