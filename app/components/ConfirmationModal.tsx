'use client';

import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-2 sm:p-4 md:p-8">
      <div className="relative w-[min(92vw,342px)] rounded-[24px] bg-[#f4f4f4] shadow-[0_30px_80px_rgba(0,0,0,0.18)] md:w-[720px] md:max-w-[720px] md:rounded-[40px] md:px-[80px] md:py-[80px]">
        <button
          type="button"
          aria-label="Close confirmation"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00000014] text-[2.5rem] font-light leading-none text-[#111111] transition-opacity hover:opacity-80 md:right-10 md:top-10"
        >
          ×
        </button>

        <div className="flex flex-col items-center justify-center px-4 pb-6 pt-16 text-center md:px-0 md:pb-0 md:pt-0">
          <div className="mb-4 flex items-center justify-center md:mb-8">
            <img
              src="/logo/logo-icon.png"
              alt="BTF logo"
              className="h-[120px] w-[108px] object-contain md:hidden"
            />
            <img
              src="/logo/logo-icon.png"
              alt="BTF logo"
              className="hidden h-[240px] w-[216px] object-contain md:block"
            />
          </div>

          <h2
            className="font-cabinet-grotesk font-black leading-[0.8] tracking-[-0.08em] text-[#111111] text-[2.5rem] md:text-[80px]"
            style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
          >
            You’re all set!
          </h2>

          <p className="mt-4 max-w-[294px] text-center text-[1rem] font-normal leading-[1.4] tracking-[-0.02em] text-[#111111] md:mt-6 md:max-w-[560px] md:text-[18px]">
            You’ll receive a confirmation email shortly on your registration.
            <br className="hidden md:block" />
            See you at BTF.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 flex h-[52px] w-full max-w-[294px] items-center justify-center rounded-full bg-[#1570EF] text-[1.25rem] font-medium uppercase tracking-[-0.02em] text-white shadow-[0_0_0_2px_rgba(21,112,239,0.12)] transition-colors duration-200 hover:bg-[#0f62d9] md:mt-8 md:h-[60px] md:max-w-[294px] md:text-[20px]"
          >
            Alright, got it
          </button>
        </div>
      </div>
    </div>
  );
}
