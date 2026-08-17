'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { scheduleDays, type TagColor, type FeaturedCard } from './scheduleData';

// ─── Tag color maps ────────────────────────────────────────────────────────────
/** Maps TagColor → CSS variable for use in SVG fills (respects dark mode) */
const tagHexColor: Record<TagColor, string> = {
  default: "rgba(0,0,0,0.15)",
  blue:    "var(--color-blue, #1570ef)",
  amber:   "var(--color-amber, #FFA500)",
  red:     "var(--color-red, #F62511)",
  green:   "var(--color-green, #14AE5C)",
};

// ─── Inline filler SVGs (coloured by tag) ─────────────────────────────────────
function FillerSvg1({ color }: { color: string }) {
  return (
    <svg width="123" height="123" viewBox="0 0 123 123" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute block inset-0 max-w-none size-full">
      <mask id="f1-mask" fill="white">
        <path d="M77.7549 33.6738L88.7754 44.6943L122.448 24.4902V97.959L88.7754 77.7549L77.7549 88.7754L97.959 122.449H24.4893L44.6934 88.7754L33.6729 77.7549L0 97.959V24.4902L33.6729 44.6943L44.6934 33.6738L24.4893 0H97.959L77.7549 33.6738ZM39.1826 61.2246L61.2236 83.2656L83.2646 61.2246L61.2236 39.1836L39.1826 61.2246ZM71.0205 61.2246L61.2246 71.0205L51.4287 61.2246L61.2246 51.4287L71.0205 61.2246Z"/>
      </mask>
      <path d="M77.7549 33.6738L88.7754 44.6943L122.448 24.4902V97.959L88.7754 77.7549L77.7549 88.7754L97.959 122.449H24.4893L44.6934 88.7754L33.6729 77.7549L0 97.959V24.4902L33.6729 44.6943L44.6934 33.6738L24.4893 0H97.959L77.7549 33.6738ZM39.1826 61.2246L61.2236 83.2656L83.2646 61.2246L61.2236 39.1836L39.1826 61.2246ZM71.0205 61.2246L61.2246 71.0205L51.4287 61.2246L61.2246 51.4287L71.0205 61.2246Z" fill={color} fillOpacity="0.4"/>
    </svg>
  );
}

function FillerSvg2({ color }: { color: string }) {
  return (
    <svg width="105" height="105" viewBox="0 0 105 105" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute block inset-0 max-w-none size-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M84.7243 51.4895C93.687 60.1636 94.0336 74.5793 85.4984 83.6879C77.0966 92.6542 63.22 93.1358 54.2392 84.8748L53.8155 84.4747L20.547 52.2777L20.1332 51.8672C11.5755 43.1547 11.371 29.0456 19.7729 20.0793C28.3081 10.9706 42.493 10.6184 51.4558 19.2925L84.7243 51.4895ZM46.0467 25.0649C40.2209 19.4267 31.0007 19.6557 25.4529 25.5763C19.905 31.4969 20.1303 40.8671 25.9561 46.5053L59.2246 78.7023C65.0504 84.3404 74.2706 84.1115 79.8184 78.1909C85.3663 72.2703 85.141 62.9 79.3152 57.2619L46.0467 25.0649Z" fill={color} fillOpacity="0.5"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M94.1742 43.8831C108.124 57.3837 108.663 79.8213 95.3792 93.9983C82.0947 108.175 60.0167 108.723 46.0668 95.2224L10.826 61.1167C-3.12378 47.616 -3.66358 25.1789 9.62071 11.0019C22.9052 -3.17486 44.9835 -3.72318 58.9334 9.77735L94.1742 43.8831Z" fill={color} fillOpacity="0.25"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.2757 51.4895C11.313 60.1636 10.9664 74.5793 19.5016 83.6879C27.9034 92.6542 41.78 93.1358 50.7608 84.8748L51.1845 84.4747L84.453 52.2777L84.8668 51.8672C93.4245 43.1547 93.629 29.0456 85.2271 20.0793C76.6919 10.9706 62.507 10.6184 53.5442 19.2925L20.2757 51.4895ZM58.9533 25.0649C64.7791 19.4267 73.9993 19.6557 79.5471 25.5763C85.095 31.4969 84.8697 40.8671 79.0439 46.5053L45.7754 78.7023C39.9496 84.3404 30.7294 84.1115 25.1816 78.1909C19.6337 72.2703 19.859 62.9 25.6848 57.2619L58.9533 25.0649Z" fill={color} fillOpacity="0.5"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.8258 43.8831C-3.12411 57.3837 -3.6635 79.8213 9.62083 93.9983C22.9053 108.175 44.9832 108.723 58.9331 95.2224L94.174 61.1167C108.124 47.616 108.664 25.1789 95.3793 11.0019C82.0948 -3.17486 60.0165 -3.72318 46.0666 9.77735L10.8258 43.8831Z" fill={color} fillOpacity="0.25"/>
    </svg>
  );
}

function FillerSvg3({ color }: { color: string }) {
  return (
    <svg width="105" height="105" viewBox="0 0 105 105" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute block inset-0 max-w-none size-full">
      <path d="M80.4911 24.5102C94.96 31.1954 105 45.8353 105 62.8207C105 86.116 86.1154 105 62.8201 105.001C45.8341 105.001 31.1938 94.96 24.5089 80.4904C29.8841 82.974 35.8705 84.3605 42.1806 84.3605C65.4759 84.3603 84.3605 65.4753 84.3605 42.1799C84.3605 35.8705 82.9742 29.885 80.4911 24.5102ZM42.1806 0C59.1664 0.000126073 73.8062 10.0408 80.4911 24.5102C75.116 22.0267 69.13 20.6402 62.8201 20.6401C39.5246 20.6401 20.6395 39.5252 20.6395 62.8207C20.6395 69.1302 22.0258 75.1157 24.5089 80.4904C10.0401 73.8053 0 59.1653 0 42.1799C0.000171543 18.8846 18.8852 0 42.1806 0Z" fill={color} fillOpacity="0.5"/>
    </svg>
  );
}

function FillerSvg4({ color }: { color: string }) {
  return (
    <svg width="105" height="105" viewBox="0 0 105 105" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute block inset-0 max-w-none size-full">
      <path d="M40.1467 66.5707C44.2907 62.6336 51.1395 65.4703 51.2859 71.1844L52.1514 104.999C48.4062 104.882 44.7139 102.873 42.7846 98.9713L41.8008 96.9814C39.3938 92.1139 33.7563 89.7789 28.6125 91.5188L26.5096 92.2301C22.3862 93.6248 18.3541 92.4348 15.6229 89.8693L40.1467 66.5707Z" fill={color} fillOpacity="0.5"/>
      <path d="M53.7147 71.1844C53.8611 65.4703 60.7093 62.6337 64.8533 66.5707L89.3766 89.8693C86.6453 92.4345 82.6136 93.6248 78.4904 92.2301L76.3881 91.5188C71.2442 89.7788 65.6068 92.1139 63.1998 96.9814L62.2154 98.9713C60.286 102.873 56.5939 104.882 52.8486 104.999L53.7147 71.1844Z" fill={color} fillOpacity="0.5"/>
      <path d="M33.815 53.7141C39.5292 53.8603 42.3663 60.7093 38.4293 64.8533L15.1301 89.376C12.5649 86.6446 11.3752 82.613 12.7699 78.4898L13.4807 76.3875C15.2206 71.2436 12.8856 65.6061 8.01797 63.1992L6.02871 62.2154C2.1267 60.286 0.117215 56.5935 0 52.848L33.815 53.7141Z" fill={color} fillOpacity="0.5"/>
      <path d="M105 52.848C104.883 56.5935 102.873 60.286 98.9713 62.2154L96.982 63.1992C92.1145 65.6061 89.7794 71.2436 91.5193 76.3875L92.2307 78.4898C93.6254 82.613 92.4351 86.6446 89.8699 89.376L66.5713 64.8533C62.6341 60.7093 65.4708 53.8604 71.185 53.7141L105 52.848Z" fill={color} fillOpacity="0.5"/>
      <path d="M38.4293 40.1467C42.3662 44.2907 39.5292 51.1397 33.815 51.2859L0 52.1514C0.117379 48.4061 2.12689 44.7139 6.02871 42.7846L8.01797 41.8008C12.8856 39.3939 15.2206 33.7564 13.4807 28.6125L12.7699 26.5102C11.3752 22.3869 12.5648 18.3548 15.1301 15.6234L38.4293 40.1467Z" fill={color} fillOpacity="0.5"/>
      <path d="M89.8699 15.6234C92.4353 18.3548 93.6254 22.3868 92.2307 26.5102L91.5193 28.6125C89.7795 33.7563 92.1145 39.3939 96.982 41.8008L98.9713 42.7846C102.873 44.7139 104.883 48.4061 105 52.1514L71.185 51.2859C65.4707 51.1396 62.6341 44.2907 66.5713 40.1467L89.8699 15.6234Z" fill={color} fillOpacity="0.5"/>
      <path d="M51.2859 33.8156C51.1395 39.5297 44.2906 42.3663 40.1467 38.4293L15.6229 15.1301C18.3541 12.5648 22.3863 11.3753 26.5096 12.7699L28.6125 13.4812C33.7563 15.2211 39.3939 12.8861 41.8008 8.01855L42.7846 6.02871C44.7139 2.12699 48.4062 0.117427 52.1514 0L51.2859 33.8156Z" fill={color} fillOpacity="0.5"/>
      <path d="M52.8486 0C56.5939 0.117352 60.286 2.12697 62.2154 6.02871L63.1998 8.01855C65.6068 12.8861 71.2443 15.2212 76.3881 13.4812L78.4904 12.7699C82.6135 11.3753 86.6453 12.5651 89.3766 15.1301L64.8533 38.4293C60.7094 42.3662 53.8611 39.5296 53.7147 33.8156L52.8486 0Z" fill={color} fillOpacity="0.5"/>
    </svg>
  );
}

const fillerComponents = [FillerSvg1, FillerSvg2, FillerSvg3, FillerSvg4];

// ─── Tag display helpers ───────────────────────────────────────────────────────
const cardTagBg: Record<TagColor, string> = {
  default: "bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))]",
  blue:    "bg-[var(--color-blue,#1570ef)]",
  amber:   "bg-[var(--color-amber,#FFA500)]",
  red:     "bg-[var(--color-red,#F62511)]",
  green:   "bg-[var(--color-green,#14AE5C)]",
};
const cardTagText: Record<TagColor, string> = {
  default: "text-[color:var(--color-gray-inverted,#303030)]",
  blue:    "text-[color:var(--color-neutral,white)]",
  amber:   "text-[color:var(--color-static-black,black)]",
  red:     "text-[color:var(--color-neutral,white)]",
  green:   "text-[color:var(--color-neutral,white)]",
};

// ─── Arrow SVG refs ────────────────────────────────────────────────────────────
const imgVector  = "https://www.figma.com/api/mcp/asset/a3cb56bb-348e-49c3-a13c-b7531cbf8ff1.svg";
const imgVector1 = "https://www.figma.com/api/mcp/asset/1c0bdf6a-259e-449d-a35e-8a63cdaa0167.svg";
const imgVector2 = "https://www.figma.com/api/mcp/asset/37636622-e19c-4ee5-ab8f-6aff770fc777.svg";

// ─── ScheduleCard ─────────────────────────────────────────────────────────────
function ScheduleCard({ card }: { card: FeaturedCard }) {
  const MAX = 4;
  const fillerColor = tagHexColor[card.tag.color];
  // Pad speakers up to 4 with filler slots
  const photoSlots = Array.from({ length: MAX }, (_, i) => card.speakers[i] ?? null);

  return (
    <div className="bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))] content-stretch flex flex-col gap-6 md:gap-[var(--device-gap,40px)] h-auto min-h-[500px] md:h-[658px] items-start overflow-clip px-4 md:px-[var(--button-x-pad,24px)] py-6 md:py-[var(--button-y-pad-lg,24px)] relative shrink-0 w-[85vw] max-w-[480px] md:w-[480px]" data-name="SCHEDULE-CARD">
      {/* Header */}
      <div className="[word-break:break-word] content-stretch flex font-cabinet-grotesk font-normal items-start relative shrink-0 text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px] w-full">
        <div className="flex-[1_0_0] leading-[0] min-w-px opacity-70 relative" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          <p className="leading-[1.2] mb-0">{card.dayLabel}</p>
          <p className="leading-[1.2]">{card.time}</p>
        </div>
        <p className="flex-[1_0_0] leading-[1.2] min-w-px opacity-70 relative text-right" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          {card.stage}
        </p>
      </div>

      {/* Session title + tag */}
      <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
        <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-cabinet-grotesk font-bold leading-none min-w-full overflow-hidden relative shrink-0 text-[24px] md:text-[32px] text-[color:var(--color-inverted,white)] text-ellipsis tracking-[-1.28px] underline w-[min-content]" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          {card.sessionTitle}
        </p>
        <div className={`${cardTagBg[card.tag.color]} content-stretch flex items-center justify-center p-[8px] relative rounded-[2px] shrink-0`}>
          <div className={`[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[0px] ${cardTagText[card.tag.color]} tracking-[-0.32px] whitespace-nowrap`}>
            <p className="font-['Inter:Bold'] font-bold leading-[1.2] text-[16px]">{card.tag.label}</p>
          </div>
        </div>
      </div>

      {/* Speaker photos (real or filler) */}
      <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
        {photoSlots.map((speaker, i) => {
          const FillerComp = fillerComponents[i % fillerComponents.length];
          return (
            <div key={i} className="aspect-square flex-[1_0_0] min-w-px relative">
              {speaker ? (
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  <div className="absolute bg-[var(--color-neutral,white)] inset-0" />
                  <img alt={speaker.name} className="absolute max-w-none object-cover size-full" src={speaker.image} />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.05))]">
                  <FillerComp color={fillerColor} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Speaker names */}
      <div className="content-start flex flex-[1_0_0] flex-wrap gap-[16px_8px] items-start min-h-px relative w-full">
        {card.speakers.map((spk, i) => (
          <div key={i} className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Inter:Regular'] font-normal items-start justify-center min-w-[160px] not-italic relative text-[color:var(--color-inverted,white)]">
            <p className="leading-[1.4] relative shrink-0 text-[length:var(--type-body,18px)] tracking-[-0.36px] w-full">{spk.name}</p>
            <p className="leading-[1.2] opacity-60 relative shrink-0 text-[14px] tracking-[-0.28px] w-full">{spk.role}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="bg-[var(--color-inverted,black)] content-stretch flex gap-[8px] items-center justify-center pl-[var(--button-x-pad,24px)] pr-[var(--button-y-pad-sm,16px)] py-[var(--button-y-pad-sm,16px)] relative rounded-[1000px] shrink-0">
        <div className="[word-break:break-word] flex flex-col font-['Bricolage_Grotesque:Medium'] font-medium justify-center leading-[0] relative shrink-0 text-[color:var(--color-neutral,white)] text-[length:var(--button-label-sm,20px)] text-center tracking-[-0.4px] uppercase whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          <p className="leading-none">WATCH LIVE</p>
        </div>
        <div className="content-stretch flex items-center justify-center relative shrink-0">
          <div className="relative shrink-0 size-[24px]">
            <div className="absolute inset-[17.17%_10.92%_17.18%_10.94%]">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FeaturedSchedule ─────────────────────────────────────────────────────────
function FeaturedSchedule() {
  // Collect all featured cards across all days
  const allCards: FeaturedCard[] = scheduleDays.flatMap(d => d.featuredCards ?? []);
  const [activeCard, setActiveCard] = useState(0);
  const cardDirection = useRef(0);

  function goTo(i: number) {
    cardDirection.current = i > activeCard ? 1 : -1;
    setActiveCard(i);
  }
  function prev() { if (activeCard > 0) goTo(activeCard - 1); }
  function next() { if (activeCard < allCards.length - 1) goTo(activeCard + 1); }

  const cardSlideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div className="content-stretch flex flex-col gap-8 md:gap-[var(--device-gap,40px)] items-center justify-center pt-34 md:pt-36 px-4 md:px-[var(--device-gap,40px)] relative size-full" data-node-id="215:10925" data-name="featured-schedule">
      {/* Heading row */}
      <div className="content-stretch flex flex-col items-start justify-end relative shrink-0 w-full">
        <div className="[word-break:break-word] font-cabinet-grotesk font-bold leading-[0] relative shrink-0 text-[0px] text-[color:var(--color-inverted,white)] tracking-[-0.4px] w-full" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          <p className="font-cabinet-grotesk font-light leading-[1] md:leading-[0.8] mb-0 text-[40px] md:text-[80px]">Explore BTF 2.0</p>
          <p className="leading-[1] md:leading-[0.8] text-[40px] md:text-[80px]">Unique schedule</p>
        </div>
        <div className="content-stretch flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-0 relative shrink-0 w-full">
          <p className="[word-break:break-word] font-cabinet-grotesk font-bold leading-[1.2] relative shrink-0 text-[color:var(--color-inverted,white)] text-[16px] md:text-[length:var(--type-title,20px)] tracking-[-0.8px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
            FEATURED SESSIONS
          </p>
          {/* Prev / Next arrows */}
          <div className="content-stretch flex gap-[16px] items-center ml-auto relative rounded-[1000px] shrink-0">
            <button
              onClick={prev}
              disabled={activeCard === 0}
              className={`bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))] content-stretch flex items-center justify-center p-[12px] relative rounded-[1000px] shrink-0 transition-opacity ${activeCard === 0 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
            >
              <div className="relative shrink-0 size-[26.667px]">
                <div className="absolute inset-[14.06%_32.81%_14.05%_26.55%]">
                  <img alt="prev" className="absolute block inset-0 max-w-none size-full" src={imgVector} />
                </div>
              </div>
            </button>
            <button
              onClick={next}
              disabled={activeCard === allCards.length - 1}
              className={`bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))] content-stretch flex items-center justify-center p-[12px] relative rounded-[1000px] shrink-0 transition-opacity ${activeCard === allCards.length - 1 ? "opacity-30 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
            >
              <div className="relative shrink-0 size-[26.667px]">
                <div className="absolute inset-[14.05%_26.55%_14.06%_32.8%]">
                  <img alt="next" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Cards slideshow */}
      <div className="relative overflow-hidden w-full shrink-0">
        <AnimatePresence mode="wait" custom={cardDirection.current}>
          <motion.div
            key={activeCard}
            custom={cardDirection.current}
            variants={cardSlideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="content-stretch flex gap-[var(--button-y-pad-sm,16px)] items-start w-full"
          >
            {/* Show up to 3 cards at a time centred on activeCard */}
            {allCards.slice(activeCard, activeCard + 3).map((card, i) => (
              <ScheduleCard key={i} card={card} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0 w-full">
        <div className="content-stretch flex gap-[16px] items-center relative rounded-[1000px] shrink-0">
          {allCards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative rounded-[100px] shrink-0 size-[16px] transition-colors ${i === activeCard ? "bg-[var(--color-gray-inverted,#a1a1a1)]" : "bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}




const imgSpeaker2 = "https://www.figma.com/api/mcp/asset/48260878-efe1-4282-9bb6-6c6073013203.png";
const imgSpeaker3 = "https://www.figma.com/api/mcp/asset/00aa01f1-9513-4099-b30d-89fe52b5ddc4.png";
const imgSpeaker4 = "https://www.figma.com/api/mcp/asset/31dcc179-439c-4a8e-b010-f33153f57ac9.png";
//const imgVector = "https://www.figma.com/api/mcp/asset/a3cb56bb-348e-49c3-a13c-b7531cbf8ff1.svg";
//const imgVector1 = "https://www.figma.com/api/mcp/asset/1c0bdf6a-259e-449d-a35e-8a63cdaa0167.svg";
const imgFiller2 = "https://www.figma.com/api/mcp/asset/fb07b2ff-b8b6-443a-864f-737ce093ae2a.svg";
const imgFiller3 = "https://www.figma.com/api/mcp/asset/1065e921-2d2b-42ff-85cd-9baca6249d79.svg";
const imgFiller4 = "https://www.figma.com/api/mcp/asset/47bc905f-5e7b-419d-8d46-6079f1971ebe.svg";
//const imgVector2 = "https://www.figma.com/api/mcp/asset/37636622-e19c-4ee5-ab8f-6aff770fc777.svg";
const imgFiller5 = "https://www.figma.com/api/mcp/asset/bdb47ff6-d4d8-4967-87f5-6aec8fff9694.svg";

// Maps TagColor to CSS variables for proper dark mode support
const tagBgClass: Record<TagColor, string> = {
  default: "bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))]",
  blue:    "bg-[var(--color-blue,#1570ef)]",
  amber:   "bg-[var(--color-amber,#FFA500)]",
  red:     "bg-[var(--color-red,#F62511)]",
  green:   "bg-[var(--color-green,#14AE5C)]",
};

const tagTextClass: Record<TagColor, string> = {
  default: "text-[color:var(--color-gray-inverted,#303030)]",
  blue:    "text-[color:var(--color-neutral,white)]",
  amber:   "text-[color:var(--color-static-black,black)]",
  red:     "text-[color:var(--color-neutral,white)]",
  green:   "text-[color:var(--color-neutral,white)]",
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

function ScheduleAgenda({ className }: { className?: string }) {
  const [activeDay, setActiveDay] = useState(0);
  const direction = useRef(0);
  const day = scheduleDays[activeDay];

  function switchDay(i: number) {
    direction.current = i > activeDay ? 1 : -1;
    setActiveDay(i);
  }

  return (
    <div
      className={className || "content-stretch flex flex-col items-start overflow-clip pb-[var(--device-margin,40px)] px-4 relative w-full"}
      data-node-id="454:5552"
      data-name="schedule-agenda"
    >
      <div className="border-[var(--color-gray-neutral,#a1a1a1)] border-b border-solid content-stretch flex items-center justify-center pb-[24px] relative shrink-0 w-full" data-node-id="215:11308" data-name="heading">
        <p className="[word-break:break-word] flex-[1_0_0] font-cabinet-grotesk font-normal leading-[1.2] min-w-px relative text-[color:var(--color-inverted,white)] text-[length:var(--type-title,20px)] tracking-[-0.8px]" data-node-id="215:11309" style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}>
          AGENDA
        </p>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="223:17445" data-name="schedule-wrapper">
        <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-node-id="215:11311" data-name="day-schedule">

          {/* ── Tab list ── */}
          <div className="w-full flex justify-end md:hidden mb-1">
            <span className="text-[10px] uppercase tracking-wider text-[color:var(--color-gray-inverted,#a1a1a1)] flex items-center gap-1 opacity-70">
              <span className="text-[12px]">→</span>
            </span>
          </div>
          <div className="[word-break:break-word] border-[var(--color-gray-neutral,#a1a1a1)] border-b border-solid content-end flex flex-nowrap overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-0 items-end leading-[1.4] not-italic relative shrink-0 w-full" data-node-id="215:11312" data-name="tab-list">
            {scheduleDays.map((d, i) => (
              <button
                key={i}
                onClick={() => switchDay(i)}
                className={`border-solid content-stretch flex flex-col items-start pt-[16px] px-[16px] relative rounded-tl-[4px] rounded-tr-[4px] shrink-0 bg-transparent cursor-pointer ${
                  activeDay === i
                    ? "border-[var(--color-blue,#1570ef)] border-b-[2.4px] pb-[18.4px]"
                    : "border-[var(--color-trans-10-inverted,rgba(0,0,0,0))] border-b-2 opacity-50 pb-[18px] text-[color:var(--color-inverted,white)]"
                }`}
              >
                <p className={`font-['Inter:Medium'] font-medium relative shrink-0 text-[12px] tracking-[-0.48px] uppercase w-full ${
                  activeDay === i ? "text-[color:var(--color-blue,#1570ef)]" : ""
                }`}>
                  {d.date}
                </p>
                <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[18px] text-[color:var(--color-inverted,white)] tracking-[-0.36px] w-full">
                  {d.title}
                </p>
              </button>
            ))}
          </div>

          {/* ── Schedule items ── */}
          <div className="relative overflow-hidden w-full" data-node-id="215:11316" data-name="list-container">
            <AnimatePresence mode="wait" custom={direction.current}>
              <motion.div
                key={activeDay}
                custom={direction.current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="content-stretch flex flex-col items-start w-full"
              >
                {day.items.length === 0 && (
                  <p className="px-[24px] py-[40px] font-['Inter:Regular'] font-normal text-[color:var(--color-gray-inverted,#a1a1a1)] text-[length:var(--type-body,18px)] opacity-60">
                    Schedule coming soon…
                  </p>
                )}
                {day.items.map((item, i) => (
                  <div
                    key={i}
                    className={`border-[var(--color-gray-neutral,#a1a1a1)] border-b border-solid content-stretch flex flex-col md:flex-row gap-[24px] items-start pb-[25px] pt-[24px] px-[24px] relative shrink-0 w-full ${
                      item.highlighted ? "bg-[var(--color-trans-10-inverted,rgba(0,0,0,0.1))]" : ""
                    }`}
                    data-name="SCHEDULE-ITEM"
                  >
                    {/* Timestamp */}
                    <div className="relative shrink-0" data-name="timestamp">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pt-[6px] relative size-full">
                        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.2] not-italic relative shrink-0 text-[color:var(--color-gray-inverted,#a1a1a1)] text-[length:var(--type-caption,16px)] tracking-[-0.32px] w-full md:w-[80px]">
                          {item.time}
                        </p>
                      </div>
                    </div>

                     {/* Detail */}
                     <div className="w-full md:flex-[1_0_0] min-w-px relative" data-name="detail">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
                        <div
                          className="flex flex-col font-cabinet-grotesk font-normal justify-center leading-[0] min-w-full relative shrink-0 text-[color:var(--color-inverted,white)] tracking-[-0.26px] w-full md:w-[min-content]"
                          style={{ fontVariationSettings: '"opsz" 14, "wdth" 100' }}
                        >
                          <p className="font-cabinet-grotesk font-extrabold leading-none text-[23px] md:text-[32px]">
                            {item.title}
                          </p>
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[color:var(--color-gray-inverted,#a1a1a1)] text-[length:var(--type-body,18px)] tracking-[-0.36px] w-full md:w-[min-content]">
                          {item.description}
                        </p>
                        {/* Tag */}
                        <div className={`${tagBgClass[item.tag.color]} relative rounded-[2px] shrink-0`} data-name="tag">
                          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[8px] relative size-full">
                            <div className={`[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[0px] ${tagTextClass[item.tag.color]} tracking-[-0.32px] whitespace-nowrap`}>
                              <p className="font-['Inter:Bold'] font-bold leading-[1.2] text-[16px]">{item.tag.label}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <main className="w-full">
      <Navbar />
      <FeaturedSchedule />
      <ScheduleAgenda />
      <Footer />
    </main>
  );
}
