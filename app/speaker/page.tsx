'use client';

import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const speakers = [
  {
    id: 1,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
    tint: 'from-[#dfeaf8] via-[#edf2fb] to-[#d4dfe7]',
  },
  {
    id: 2,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
    tint: 'from-[#f3dfe4] via-[#f5e6e8] to-[#ebd7d0]',
  },
  {
    id: 3,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
    tint: 'from-[#efe9e2] via-[#f8f4ef] to-[#d7dbe0]',
  },
  {
    id: 4,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
    tint: 'from-[#e8e4df] via-[#f9f3f0] to-[#dfe3e4]',
  },
];

const allSpeakers = [
  {
    id: 1,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    summary: 'Teams present 24-hour builds to a panel of judges, investors, and corporate partners.',
    topic: 'THE FUTURE OF TECH AND FINANCE IN EDO STATE',
    tags: ['Networking'],
    image: '/speakers/speaker1.png',
    tint: 'from-[#dfeaf8] via-[#edf2fb] to-[#d4dfe7]',
  },
  {
    id: 2,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    summary: 'Teams present 24-hour builds to a panel of judges, investors, and corporate partners.',
    image: '/speakers/speaker1.png',
    tint: 'from-[#f3dfe4] via-[#f5e6e8] to-[#ebd7d0]',
  },
  {
    id: 3,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    summary: 'Teams present 24-hour builds to a panel of judges, investors, and corporate partners.',
    image: '/speakers/speaker1.png',
    tint: 'from-[#efe9e2] via-[#f8f4ef] to-[#d7dbe0]',
  },
  {
    id: 4,
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    summary: 'Teams present 24-hour builds to a panel of judges, investors, and corporate partners.',
    image: '/speakers/speaker1.png',
    tint: 'from-[#e8e4df] via-[#f9f3f0] to-[#dfe3e4]',
  },
];

function CaretLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
      <path d="M14.5 6.5L8.5 12L14.5 17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CaretRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
      <path d="M9.5 6.5L15.5 12L9.5 17.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[#111111] sm:h-5 sm:w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[#111111] sm:h-5 sm:w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.3 10.3V16.5M8.3 7.9v.1M11.3 16.5v-4.3c0-1.4.6-2.2 1.8-2.2 1.2 0 1.8.7 1.8 2.1v4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[#111111] sm:h-5 sm:w-5">
      <path d="M13.2 4.8c.7 1.2 1.9 2.1 3.5 2.2v2.1c-1.2 0-2.3-.4-3.2-1.1v6.8c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.6 0 1.2.1 1.8.4V11c-.4-.2-.8-.3-1.3-.3-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V4.8h2.3Z" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[#111111] sm:h-5 sm:w-5">
      <path d="M5.4 5.3 10.1 11l-4.7 7.7h2.5l3.6-5.8 3.2 5.8h4.2L13.8 11l4.8-5.7h-2.4l-3.3 4.8-3.3-4.8H5.4Z" fill="currentColor" />
    </svg>
  );
}

function SpeakerRow({ speaker, isOpen, onToggle }: { speaker: (typeof allSpeakers)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-[#111111]/20 first:border-t-0">
      <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
        <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
          <div className={`flex h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-br ${speaker.tint} shadow-[inset_0_0_0_1px_rgba(17,17,17,0.08)] sm:h-24 sm:w-24`}>
            <img src={speaker.image} alt={speaker.name} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[2.1rem] font-bold leading-[1] tracking-[-0.06em] text-[#111111] sm:text-[3.2rem] md:text-[4rem]">
              {speaker.name}
            </h3>
            {isOpen && speaker.summary ? (
              <p className="mt-3 max-w-[720px] text-[0.95rem] leading-[1.35] text-[#111111]/80 sm:text-[1.05rem]">
                {speaker.summary}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/25 bg-[#ffffff] text-[#111111]">
              <InstagramIcon />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/25 bg-[#ffffff] text-[#111111]">
              <LinkedInIcon />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/25 bg-[#ffffff] text-[#111111]">
              <TikTokIcon />
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111111]/25 bg-[#ffffff] text-[#111111]">
              <XIcon />
            </span>
          </div>

          <div className="hidden text-right text-[0.95rem] font-medium leading-[1.15] text-[#111111] sm:block">
            <span className="block">Founder, Treskaro &amp;</span>
            <span className="block">Father Startups</span>
          </div>

          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? 'Collapse speaker details' : 'Expand speaker details'}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-3xl font-medium leading-none text-[#111111] transition ${isOpen ? 'bg-[#1ed6b0]' : 'bg-[#1ed6b0]'}`}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
      </div>

      {isOpen && speaker.topic ? (
        <div className="pb-6 pl-0 sm:pb-7 sm:pl-[6.5rem]">
          <div className="flex max-w-[1100px] items-center gap-3 rounded-xl bg-[#f2f2f2] px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex-1 text-[0.82rem] font-bold uppercase tracking-[0.08em] text-[#111111] sm:text-[1.05rem]">
              {speaker.topic}
            </div>
            {speaker.tags?.length ? (
              <div className="flex flex-wrap justify-end gap-2">
                {speaker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#d9d9d9] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-[#111111]/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function SpeakerPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSpeaker, setExpandedSpeaker] = useState(0);

  const visibleSpeakers = useMemo(() => {
    return Array.from({ length: Math.min(4, speakers.length) }, (_, index) => {
      return speakers[(activeIndex + index) % speakers.length];
    });
  }, [activeIndex]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? speakers.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === speakers.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#111111]">
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="mx-auto max-w-[1420px] px-4 pb-12 pt-4 sm:px-6 md:px-8 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div className="px-0">
              <div className="mx-auto mt-14 mb-12 w-full max-w-[1440px]">
                <h2 className="text-[40px] font-light leading-[0.8] tracking-[-0.04em] text-[#111111] md:text-[60px] lg:text-[80px]">
                  Meet Our
                  <span className="block font-bold text-[#111111]">Inspiring Voices</span>
                </h2>
              </div>

              <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#111111] md:text-[0.8rem]">
                Featured speakers
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous speaker"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ededeb] text-[#111111] transition hover:bg-[#e1e0df] sm:h-14 sm:w-14"
              >
                <CaretLeftIcon />
              </button>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next speaker"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ededeb] text-[#111111] transition hover:bg-[#e1e0df] sm:h-14 sm:w-14"
              >
                <CaretRightIcon />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {visibleSpeakers.map((speaker) => (
              <article key={`${speaker.id}-${speaker.name}`} className="group flex flex-col">
                <div className={`flex aspect-[0.9] w-full overflow-hidden rounded-none bg-gradient-to-br ${speaker.tint} shadow-[inset_0_0_0_1px_rgba(17,17,17,0.05)]`}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  <p className="text-[0.63rem] font-semibold uppercase tracking-[0.12em] text-[#111111] opacity-80 sm:text-[0.7rem]">
                    {speaker.category}
                  </p>
                  <h2 className="text-[1.15rem] font-bold leading-[1.1] tracking-[-0.04em] text-[#111111] sm:text-[1.35rem]">
                    {speaker.name}
                  </h2>
                  <p className="text-[0.92rem] leading-[1.25] text-[#111111]/60">
                    {speaker.title}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <span
                key={index}
                className={`h-2.5 w-2.5 rounded-full ${index === activeIndex % 4 ? 'bg-[#111111]' : 'bg-[#d2d2cf]'}`}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1500px] px-4 pb-20 sm:px-6 md:px-8">
          <div className="flex items-center gap-4 border-t border-[#111111]/20 pt-4">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[#111111] sm:text-[0.8rem]">
              ALL SPEAKERS
            </span>
            <div className="h-px flex-1 bg-[#111111]/20" />
          </div>

          <div className="mt-3">
            {allSpeakers.map((speaker, index) => (
              <SpeakerRow
                key={speaker.id}
                speaker={speaker}
                isOpen={expandedSpeaker === index}
                onToggle={() => setExpandedSpeaker((prev) => (prev === index ? -1 : index))}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
