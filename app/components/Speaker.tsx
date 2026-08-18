'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';

// Icon components
const CaretLeftIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const CaretRightIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

interface Speaker {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
}

const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
  },
  {
    id: '2',
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
  },
  {
    id: '3',
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
  },
  {
    id: '4',
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
  },
  {
    id: '5',
    name: 'Omokaro Osayi',
    title: 'Founder, Treskaro & Father Startups',
    category: 'DIGITAL ECONOMY',
    image: '/speakers/speaker1.png',
  },
];

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="flex flex-col items-center gap-4 overflow-hidden w-80 flex-shrink-0">
      <div className="w-full aspect-square relative overflow-hidden bg-[var(--color-neutral)] rounded-lg">
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-1">
        <p className="text-[10px] font-normal font-['Inter'] leading-[10px] text-[var(--color-inverted)] uppercase tracking-tight">
          {speaker.category}
        </p>
        <p className="text-lg font-bold font-['Inter'] leading-[1.4] text-[var(--color-inverted)]">
          {speaker.name}
        </p>
        <p className="text-sm font-normal font-['Inter'] leading-[1.2] text-[var(--color-inverted)] opacity-50">
          {speaker.title}
        </p>
      </div>
    </div>
  );
}

export default function Speaker() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const visibleSpeakers = Array.from({ length: Math.min(3, SPEAKERS.length) }, (_, index) => {
    return SPEAKERS[(currentSlide + index) % SPEAKERS.length];
  });

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SPEAKERS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === SPEAKERS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-start">
      {/* Hero Section */}
      <div className="bg-[var(--color-blue,#1570ef)] gap-x-[40px] gap-y-[40px] grid grid-cols-1 md:grid-cols-[minmax(0,0.70fr)_minmax(0,1fr)] px-[var(--space-gap,40px)] py-[var(--space-padding,80px)] relative w-full overflow-hidden">
        {/* Left side - Load animation placeholder */}
        <div className="justify-self-stretch relative self-stretch shrink-0 flex items-center justify-center">
          <svg
            className="w-full max-w-[544px] h-auto"
            viewBox="0 0 544 389"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              opacity="0.1"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M113.235 177.994V291.23H0L0 177.994H113.235ZM66.7671 251.232C63.9762 254.023 62.4698 256.731 62.2477 259.354C62.0804 261.923 63.2792 264.49 65.8443 267.055C68.3548 269.566 70.8945 270.737 73.4632 270.57C76.0867 270.347 78.7941 268.841 81.585 266.05C87.2761 260.359 87.6657 255.058 82.7537 250.146C80.1886 247.58 77.5943 246.409 74.9708 246.631C72.3473 246.853 69.6126 248.387 66.7671 251.232ZM27.3956 207.428C25.6992 209.125 24.1663 210.93 22.7976 212.845C21.4835 214.705 20.3332 216.674 19.3468 218.752C18.415 220.775 17.6747 222.935 17.1252 225.231L30.1431 237.1C30.4736 235.132 31.023 233.164 31.7907 231.196C32.5038 229.173 33.3807 227.258 34.4214 225.454C35.4621 223.649 36.5843 222.144 37.7882 220.941C39.3204 219.408 40.934 218.505 42.6285 218.229C44.323 217.953 45.88 218.525 47.299 219.944C48.4451 221.09 49.0989 222.401 49.2609 223.877C49.3682 225.297 49.2568 226.882 48.9266 228.632C48.5966 230.271 48.2665 232.075 47.936 234.043C47.6602 235.956 47.6847 238.005 48.0097 240.191C48.3348 242.267 49.1788 244.479 50.5419 246.827C51.9597 249.121 54.2248 251.495 57.3366 253.95L68.0895 243.197C66.0697 241.506 64.7329 239.732 64.0796 237.874C63.4263 236.017 63.1555 234.105 63.2674 232.137C63.434 230.115 63.6831 228.065 64.0137 225.988C64.3991 223.857 64.6208 221.67 64.6785 219.429C64.6815 217.134 64.2197 214.812 63.2939 212.463C62.3134 210.06 60.5678 207.603 58.0573 205.092C55.2194 202.254 52.4075 200.427 49.6216 199.611C46.8357 198.686 44.1027 198.526 41.4241 199.13C38.8003 199.68 36.285 200.722 33.8785 202.255C31.5265 203.734 29.3656 205.458 27.3956 207.428Z"
              fill="var(--color-blue-inverted,#83B7FF)"
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [90, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.path
              opacity="0.4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M309.461 170.404L260.545 317.076L113.873 268.16L162.789 121.488L309.461 170.404ZM217.634 245.194C212.813 247.604 209.693 250.46 208.272 253.762C206.945 257.017 207.389 260.86 209.604 265.291C211.771 269.627 214.554 272.241 217.954 273.134C221.448 273.98 225.606 273.198 230.426 270.789C240.256 265.876 243.051 259.177 238.811 250.693C236.596 246.262 233.742 243.624 230.248 242.778C226.754 241.933 222.549 242.738 217.634 245.194ZM185.559 171.448C182.629 172.912 179.863 174.589 177.263 176.477C174.758 178.319 172.417 180.372 170.242 182.638C168.161 184.856 166.269 187.334 164.566 190.07L176.3 211.068C177.578 208.662 179.14 206.35 180.985 204.132C182.782 201.82 184.745 199.719 186.873 197.831C189.001 195.943 191.104 194.479 193.183 193.439C195.83 192.117 198.31 191.643 200.624 192.018C202.938 192.393 204.708 193.806 205.933 196.257C206.923 198.237 207.203 200.217 206.776 202.198C206.301 204.085 205.472 206.09 204.289 208.213C203.153 210.195 201.946 212.388 200.668 214.794C199.484 217.153 198.631 219.818 198.107 222.789C197.632 225.619 197.769 228.849 198.52 232.48C199.366 236.063 201.275 240.117 204.245 244.641L222.818 235.358C220.932 232.294 219.967 229.419 219.923 226.731C219.879 224.043 220.355 221.449 221.35 218.949C222.439 216.401 223.647 213.854 224.973 211.307C226.393 208.712 227.624 205.975 228.667 203.098C229.662 200.126 230.067 196.919 229.883 193.477C229.651 189.941 228.451 186.003 226.284 181.667C223.834 176.765 220.981 173.184 217.725 170.924C214.516 168.521 211.045 167.133 207.315 166.759C203.678 166.338 199.971 166.601 196.191 167.547C192.506 168.447 188.962 169.747 185.559 171.448Z"
              fill="var(--color-blue-inverted,#83B7FF)"
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [90, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.4, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M543.137 196.014L419.607 319.544L296.078 196.014L419.607 72.4849L543.137 196.014ZM412.548 225.218C406.459 225.218 401.862 226.528 398.758 229.147C395.773 231.767 394.281 235.875 394.281 241.472C394.281 246.95 395.773 250.998 398.758 253.618C401.862 256.237 406.459 257.548 412.548 257.548C424.965 257.548 431.174 252.189 431.174 241.472C431.174 235.875 429.622 231.767 426.518 229.147C423.413 226.528 418.757 225.218 412.548 225.218ZM417.384 134.481C413.682 134.481 410.041 134.778 406.459 135.374C402.996 135.969 399.594 136.862 396.251 138.053C393.027 139.244 389.863 140.792 386.759 142.698L388.012 169.847C390.519 168.061 393.266 166.513 396.251 165.203C399.235 163.774 402.28 162.643 405.384 161.809C408.489 160.976 411.354 160.559 413.981 160.559C417.324 160.559 420.07 161.333 422.219 162.881C424.368 164.429 425.443 166.751 425.443 169.847C425.443 172.348 424.726 174.491 423.293 176.277C421.861 177.944 420.01 179.552 417.741 181.1C415.592 182.529 413.265 184.136 410.757 185.923C408.37 187.709 406.161 189.971 404.131 192.71C402.221 195.329 400.728 198.663 399.654 202.712C398.698 206.761 398.579 211.822 399.296 217.895H422.757C422.398 213.846 422.876 210.452 424.189 207.713C425.502 204.975 427.293 202.593 429.562 200.568C431.95 198.544 434.457 196.58 437.084 194.675C439.83 192.77 442.457 190.626 444.964 188.245C447.471 185.744 449.501 182.707 451.053 179.135C452.605 175.444 453.381 170.859 453.381 165.381C453.381 159.19 452.307 154.129 450.158 150.199C448.128 146.151 445.322 142.995 441.74 140.732C438.278 138.47 434.398 136.862 430.099 135.91C425.921 134.957 421.682 134.481 417.384 134.481Z"
              fill="var(--color-blue-inverted,#83B7FF)"
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [90, 0] }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
            />
          </svg>
        </div>

        {/* Right side - Content */}
        <div className="content-stretch flex flex-col gap-[16px] items-start justify-center justify-self-stretch relative self-start shrink-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="[word-break:break-word] font-cabinet-grotesk font-normal leading-[1.2] min-w-full relative shrink-0 text-[var(--color-neutral,white)] text-[20px] tracking-[-0.8px] w-[min-content]"
          >
            OUR SPEAKERS
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="[word-break:break-word] font-cabinet-grotesk font-light leading-none min-w-full relative shrink-0 text-[var(--color-neutral,white)] text-[40px] md:text-[60px] lg:text-[80px] tracking-[-2.4px] w-[min-content]"
          >
            <div className="leading-none mb-0">{`We are preparing an amazing line-up of `}</div>
            <div className="font-cabinet-grotesk font-extrabold leading-none">{`inspiring voices `}</div>
          </motion.div> 
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[var(--color-neutral,white)] text-[18px] tracking-[-0.36px] w-[min-content]"
          >
            Interested in speaking or want to recommend someone?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/speaker-registration" className="bg-[var(--color-static-black,black)] content-stretch flex gap-[8px] items-center justify-center px-[24px] py-[16px] relative rounded-[1000px] shrink-0 w-fit hover:opacity-90 transition">
              <span className="[word-break:break-word] flex flex-col font-cabinet-grotesk font-medium justify-center leading-none relative shrink-0 text-[var(--color-static-white,white)] text-[20px] text-center tracking-[-0.4px] uppercase whitespace-nowrap">
                APPLY TO SPEAK
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Speakers Section 
      <div className="w-full flex flex-col gap-10 px-[var(--space-gap)] py-[var(--space-margin)] items-center justify-center">
        // Header 
        <div className="w-full flex flex-col gap-6 md:flex-row md:gap-10 md:items-end">
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-[18px] md:text-[20px] font-normal font-cabinet-grotesk leading-[1.2] text-[var(--color-gray-inverted)] tracking-[-0.8px]">
              OUR SPEAKERS
            </p>
            <h2 className="text-[42px] md:text-[80px] font-light font-cabinet-grotesk leading-[0.9] text-[var(--color-inverted)] tracking-[-2.5px] md:tracking-[-6.4px]">
              BTF 2.0 Featured{' '}
              <span className="font-bold">Speakers</span>
            </h2>
            <p className="text-[16px] md:text-[18px] font-normal font-['Inter'] leading-[1.4] text-[var(--color-inverted)] tracking-[-0.36px]">
              More speakers to be revealed. Want to join our speaker lineup?{' '}
              <Link href="/speaker-registration" className="text-[var(--color-blue)] underline">
                Apply to speak
              </Link>
            </p>
          </div>

          // Navigation arrows - top 
          <div className="flex gap-4 rounded-full self-end md:self-end md:ml-auto">
            <button
              onClick={handlePrevSlide}
              className="w-11 h-11 md:w-12 md:h-12 p-3 rounded-full bg-[var(--color-trans-10-inverted)] opacity-50 hover:opacity-100 transition flex items-center justify-center text-[var(--color-inverted)]"
            >
              <CaretLeftIcon />
            </button>
            <button
              onClick={handleNextSlide}
              className="w-11 h-11 md:w-12 md:h-12 p-3 rounded-full bg-[var(--color-trans-10-inverted)] hover:opacity-100 transition flex items-center justify-center text-[var(--color-inverted)]"
            >
              <CaretRightIcon />
            </button>
          </div>
        </div>

        
        // Speakers Carousel
        <div className="w-full flex flex-col gap-10 overflow-hidden">
          // Slides
          <div className="flex gap-10 overflow-x-auto scrollbar-hide">
            {visibleSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <SpeakerCard speaker={speaker} />
              </motion.div>
            ))}
          </div>

          // Controls
          <motion.div
            className="w-full flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="hidden md:block md:w-52" />

            // Progress dots
            <div className="flex justify-center gap-4 rounded-full">
              {[0, 1, 2].map((dot) => (
                <div
                  key={dot}
                  className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition ${dot === currentSlide % 3
                      ? 'bg-[var(--color-gray-inverted)]'
                      : 'bg-[var(--color-trans-10-inverted)]'
                    }`}
                />
              ))}
            </div>

            // See all speakers button
            <button className="flex gap-2 items-center justify-center md:justify-end py-4 px-0 text-[var(--color-inverted)] font-cabinet-grotesk font-medium text-[16px] md:text-[20px] uppercase leading-[1] tracking-[-0.4px] underline hover:opacity-75 transition">
              <span>SEE ALL SPEAKERS</span>
              <ArrowRightIcon />
            </button>
          </motion.div>
        </div>
        */}
      </div>
  );
} 
