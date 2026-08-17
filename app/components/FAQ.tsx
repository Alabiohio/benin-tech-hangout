'use client';

import { useState } from 'react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    question: 'Is the event free or paid?',
    answer:
      'Registration for BTF 2.0 is free but you\'ll require a pass to access the venue and participate in the various sessions.',
  },
  {
    id: '2',
    question: 'Who should attend BTF 2.0?',
    answer:
      'BTF 2.0 is designed for tech enthusiasts, entrepreneurs, developers, students, and anyone interested in the technology ecosystem in Edo State and beyond.',
  },
  {
    id: '3',
    question: 'Can I speak at BTF 2.0?',
    answer:
      'Yes! We are always looking for speakers and experts to share their knowledge. Please visit our speaker registration page to apply.',
  },
  {
    id: '4',
    question: 'Where is the event taking place at?',
    answer:
      'BTF 2.0 will be held at a premier venue in Benin City, Edo State. The exact location will be provided upon registration.',
  },
  {
    id: '5',
    question: 'How can I get a free pass?',
    answer:
      'Free passes are available through early bird registration and volunteer programs. Visit the registration page to secure yours.',
  },
];

function FaqAccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="w-full border-b border-[var(--color-gray-neutral)] flex gap-4 items-start px-6 py-4">
      <div className="flex-1 flex flex-col gap-2">
        {!isOpen ? (
          <h3 className="text-[20px] font-bold font-['Bricolage_Grotesque'] leading-[1.2] text-[var(--color-inverted)] tracking-[-0.8px]">
            {item.question}
          </h3>
        ) : (
          <>
            <h3 className="text-[20px] font-bold font-['Bricolage_Grotesque'] leading-[1.2] text-[var(--color-blue)] tracking-[-0.8px]">
              {item.question}
            </h3>
            <p className="text-[16px] font-normal font-['Inter'] leading-[1.2] text-[var(--color-inverted)] tracking-[-0.32px]">
              {item.answer}
            </p>
          </>
        )}
      </div>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-8 h-8 bg-[var(--color-green-inverted)] flex items-center justify-center transition-transform ${
          isOpen ? 'rounded-full' : 'rounded-bl-full rounded-br-full rounded-tl-full'
        }`}
        aria-expanded={isOpen}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          {/* Horizontal bar (always visible) */}
          <div className="absolute w-5 h-0.5 bg-[var(--color-inverted)]" />
          {/* Vertical bar (only visible when closed) */}
          {!isOpen && <div className="absolute w-0.5 h-5 bg-[var(--color-inverted)]" />}
        </div>
      </button>
    </div>
  );
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('1');

  return (
    <div className="w-full bg-[var(--color-neutral)] flex flex-col md:flex-row gap-10 md:gap-10 items-start px-5 py-10 md:px-10 md:py-20">
      {/* Left Sidebar */}
      <div className="w-full md:flex-1 md:max-w-[440px] md:sticky md:top-0">
        <h1 className="text-[3rem] md:text-[80px] font-extralight font-['Bricolage_Grotesque'] leading-[0.8] text-[var(--color-inverted)] tracking-[-1.4px] md:tracking-[-6.4px] mb-6">
          Frequently Asked{' '}
          <span className="font-bold text-[var(--color-blue)]">Questions</span>
        </h1>
        <p className="text-[18px] font-normal font-['Inter'] leading-[1.4] text-[var(--color-inverted)] tracking-[-0.36px]">
          We've answered some questions you are likely to ask
        </p>
      </div>

      {/* Right Accordion */}
      <div className="w-full flex-1 flex flex-col">
        {FAQ_ITEMS.map((item) => (
          <FaqAccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
          />
        ))}
      </div>
    </div>
  );
}
