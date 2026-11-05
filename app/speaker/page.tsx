'use client';

import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

type Speaker = {
  id: number;
  name: string;
  title: string;
  category: string;
  topic: string;
  image: string;
  tint: string;
  linkedin?: string;
  instagram?: string;
};

const speakers: Speaker[] = [
  {
    id: 1,
    name: 'Precious Imuwahen',
    title: 'Founder & Lead Strategy Skillz HQ',
    category: '',
    topic: 'The Human Advantage in an Al-Driven Economy',
    image: '/speakers/precious.png',
    tint: 'from-[#dfeaf8] via-[#edf2fb] to-[#d4dfe7]',
    linkedin: 'https://www.linkedin.com/in/preciousajoonu',
    instagram: 'https://www.instagram.com/thinkingschool',
  },
  {
    id: 2,
    name: 'Andrew Igbineweka',
    title: 'Ecosystem Enabler, Founder of The Networking Salon',
    category: '',
    topic: 'Networking Masterclass: Beyond Your Skills How to Sell Yourself, Build Valuable Connections, and Attract Opportunities.',
    image: '/speakers/andrew.jpg',
    tint: 'from-[#f3dfe4] via-[#f5e6e8] to-[#ebd7d0]',
  },
  {
    id: 3,
    name: 'Tope Aladenusi',
    title: 'Africa Cyber Leader Delliot',
    category: '',
    topic: 'Cybersecurity & the Future of Digital Trust',
    image: '/speakers/tope.png',
    tint: 'from-[#efe9e2] via-[#f8f4ef] to-[#d7dbe0]',
  },
  {
    id: 4,
    name: 'Munirat Antoinette Lecky',
    title: 'Special Adviser to the Governor on Tourism and Creative Economy',
    category: '',
    topic: 'The Future of Work: Turning Skills, Creativity & Technology into Opportunities',
    image: '/speakers/lecky.JPG',
    tint: 'from-[#e8e4df] via-[#f9f3f0] to-[#dfe3e4]',
  },
  {
    id: 5,
    name: "Jah'swill Ojo-Obasuyi",
    title: 'Founder & CEO of Quevora',
    category: '',
    topic: 'The Future of Work: Turning Skills, Creativity & Technology into Opportunities',
    image: '/speakers/jahswill.JPEG',
    tint: 'from-[#dfeaf8] via-[#edf2fb] to-[#d4dfe7]',
    linkedin: 'https://www.linkedin.com/in/jahswill-ojoobasuyi',
    instagram: 'https://www.instagram.com/thesmbeast',
  },
  {
    id: 6,
    name: 'Abdulrazak Abdulrahman Abubakar',
    title: 'Blockchain Specialist | Financial Engineer | PhD Candidate, University of Johannesburg Executive Commissioner, ESERC',
    category: '',
    topic: '',
    image: '/speakers/abubakar.jpg',
    tint: 'from-[#f3dfe4] via-[#f5e6e8] to-[#ebd7d0]',
  },
  {
    id: 7,
    name: 'Jobina Arinze',
    title: 'Head of Edo Innovate',
    category: '',
    topic: '',
    image: '/speakers/jobina.png',
    tint: 'from-[#efe9e2] via-[#f8f4ef] to-[#d7dbe0]',
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
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[var(--color-inverted)] sm:h-5 sm:w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[var(--color-inverted)] sm:h-5 sm:w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.3 10.3V16.5M8.3 7.9v.1M11.3 16.5v-4.3c0-1.4.6-2.2 1.8-2.2 1.2 0 1.8.7 1.8 2.1v4.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[var(--color-inverted)] sm:h-5 sm:w-5">
      <path d="M13.2 4.8c.7 1.2 1.9 2.1 3.5 2.2v2.1c-1.2 0-2.3-.4-3.2-1.1v6.8c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5c.6 0 1.2.1 1.8.4V11c-.4-.2-.8-.3-1.3-.3-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V4.8h2.3Z" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4 text-[var(--color-inverted)] sm:h-5 sm:w-5">
      <path d="M5.4 5.3 10.1 11l-4.7 7.7h2.5l3.6-5.8 3.2 5.8h4.2L13.8 11l4.8-5.7h-2.4l-3.3 4.8-3.3-4.8H5.4Z" fill="currentColor" />
    </svg>
  );
}

function SpeakerRow({ speaker, isOpen, onToggle }: { speaker: Speaker; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-[var(--color-trans-10-inverted)] first:border-t-0">
      <div className="relative flex flex-col gap-4 py-5 pr-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-6 sm:pr-0">
        <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div className={`flex h-30 w-30 shrink-0 overflow-hidden bg-gradient-to-br ${speaker.tint} shadow-[inset_0_0_0_1px_rgba(17,17,17,0.08)] sm:h-24 sm:w-24`}>
            <img src={speaker.image} alt={speaker.name} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="break-words text-[1.5rem] font-bold leading-[1] tracking-[-0.06em] text-[var(--color-inverted)] sm:text-[1.8rem] md:text-[2rem]">
              {speaker.name}
            </h3>
            {speaker.topic ? (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                aria-hidden={!isOpen}
              >
                <div className="overflow-hidden">
                  <div className="mt-3 bg-[var(--color-trans-10-inverted)] px-4 py-3 sm:px-5 sm:py-4">
                    <p className="text-[0.82rem] font-bold uppercase leading-snug tracking-[0.08em] text-[var(--color-inverted)] sm:text-[1.05rem]">
                      {speaker.topic}
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex max-w-full shrink-0 items-center gap-3 sm:max-w-[48%] sm:gap-4">
          <div className="min-w-0 text-left sm:text-right">
            <p className="text-[0.75rem] leading-[1.2] text-[var(--color-gray-inverted)] sm:text-[0.95rem]">
              {speaker.title}
            </p>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="mt-3 flex items-center justify-start gap-2.5 sm:justify-end">
                  {speaker.instagram && (
                    <a
                      href={speaker.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-trans-10-inverted)] bg-[var(--color-neutral)] text-[var(--color-inverted)]"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-trans-10-inverted)] bg-[var(--color-neutral)] text-[var(--color-inverted)]"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? 'Collapse speaker details' : 'Expand speaker details'}
            className={`absolute right-0 top-5 flex h-11 w-11 shrink-0 items-center justify-center text-3xl font-medium leading-none text-[#111111] transition sm:static ${isOpen ? 'rounded-full rounded-tr-none bg-[#1ed6b0]' : 'rounded-full bg-[#1ed6b0]'}`}
          >
            {isOpen ? '−' : '+'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default function SpeakerPage() {
  const speakersScrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedSpeaker, setExpandedSpeaker] = useState(0);

  const handleSpeakersScroll = () => {
    const container = speakersScrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children);
    const index = cards.reduce((nearestIndex, card, cardIndex) => {
      const nearestCard = cards[nearestIndex] as HTMLElement;
      const cardLeft = (card as HTMLElement).getBoundingClientRect().left;
      const nearestLeft = nearestCard.getBoundingClientRect().left;
      return Math.abs(cardLeft - container.getBoundingClientRect().left) <
        Math.abs(nearestLeft - container.getBoundingClientRect().left)
        ? cardIndex
        : nearestIndex;
    }, 0);

    setActiveIndex(index);
  };

  const scrollToSpeaker = (index: number) => {
    const container = speakersScrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;
    if (!container || !card) return;

    container.scrollTo({
      left: container.scrollLeft + card.getBoundingClientRect().left - container.getBoundingClientRect().left,
      behavior: 'smooth',
    });
  };

  const scrollSpeakers = (direction: -1 | 1) => {
    const container = speakersScrollRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(getComputedStyle(container).columnGap) || 0;
    container.scrollBy({
      left: direction * ((firstCard?.offsetWidth ?? container.clientWidth) + gap),
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral)] text-[var(--color-inverted)]">
      <Navbar />

      <main className="pt-24 md:pt-28">
        <section className="mx-auto max-w-[1420px] px-4 pb-12 pt-4 sm:px-6 md:px-8 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div className="px-0">
              <div className="mx-auto mt-14 mb-12 w-full max-w-[1440px]">
                <h2 className="text-[40px] font-light leading-[0.8] tracking-[-0.04em] text-[var(--color-inverted)] md:text-[60px] lg:text-[80px]">
                  Meet Our
                  <span className="block font-bold text-[var(--color-inverted)]">Inspiring Voices</span>
                </h2>
              </div>

              <p className="mt-4 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--color-inverted)] md:text-[0.8rem]">
                Featured speakers
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => scrollSpeakers(-1)}
                aria-label="Previous speaker"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-trans-10-inverted)] text-[var(--color-inverted)] transition hover:opacity-70 sm:h-14 sm:w-14"
              >
                <CaretLeftIcon />
              </button>

              <button
                type="button"
                onClick={() => scrollSpeakers(1)}
                aria-label="Next speaker"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-trans-10-inverted)] text-[var(--color-inverted)] transition hover:opacity-70 sm:h-14 sm:w-14"
              >
                <CaretRightIcon />
              </button>
            </div>
          </div>

          <div
            ref={speakersScrollRef}
            onScroll={handleSpeakersScroll}
            className="mt-8 flex gap-6 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {speakers.map((speaker) => (
              <article key={`${speaker.id}-${speaker.name}`} className="group flex w-[85%] shrink-0 snap-start flex-col sm:w-[calc(50%-0.75rem)] xl:w-[calc(25%-1.125rem)]">
                <div className={`flex aspect-[0.9] w-full overflow-hidden rounded-none bg-gradient-to-br ${speaker.tint} shadow-[inset_0_0_0_1px_rgba(17,17,17,0.05)]`}>
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  {speaker.category ? (
                    <p className="text-[0.63rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-inverted)] opacity-80 sm:text-[0.7rem]">
                      {speaker.category}
                    </p>
                  ) : null}
                  <h2 className="text-[1.15rem] font-bold leading-[1.1] tracking-[-0.04em] text-[var(--color-inverted)] sm:text-[1.35rem]">
                    {speaker.name}
                  </h2>
                  <p className="text-[0.92rem] leading-[1.25] text-[var(--color-gray-inverted)]">
                    {speaker.title}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {speakers.map((speaker, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToSpeaker(index)}
                aria-label={`Go to ${speaker.name}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-[var(--color-inverted)]' : 'bg-[var(--color-trans-10-inverted)]'}`}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1500px] px-4 pb-20 sm:px-6 md:px-8">
          <div className="flex items-center gap-4 border-t border-[var(--color-trans-10-inverted)] pt-4">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-inverted)] sm:text-[0.8rem]">
              ALL SPEAKERS
            </span>
            <div className="h-px flex-1 bg-[var(--color-trans-10-inverted)]" />
          </div>

          <div className="mt-3">
            {speakers.map((speaker, index) => (
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
