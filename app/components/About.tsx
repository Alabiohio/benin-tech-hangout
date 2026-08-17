"use client";
import edoMan from "@/assets/images/about/edoman.png";
import edoMap from "@/assets/images/about/edomap.png";
import image from "@/assets/images/about/pattern2.png";
import patternShape from "@/assets/images/about/pattern1.png";
import shapePattern from "@/assets/images/about/starShape.png";
import Image from "next/image";
import { motion } from "framer-motion";

const attendanceBenefits = [
  {
    title: "What you can expect",
    description:
      "Attend inspiring keynote sessions, workshops and panel discussions from industry experts; experience live product demos and showcases from innovative tech startups and businesses across Edo State, and dedicated strategic job, investor and mentorship networking opportunities.",
  },
  {
    title: "What you’ll experience",
    description:
      "Get exposed to potential recruiters, investors and government agencies through career job fair, startup pitch, innovation hub onboarding and investor matchmaking. Get recognised and awarded for meaning innovation, ecosystem and community impact to Edo State tech landscape.",
  },
  {
    title: "Who you will meet",
    description:
      "Over 3,000+ digitally active, talented and passionate young people from various industries including creatives, designers, developers, web3 natives, builders, founders, mentors, investors, business people and recruiting companies scouting talents across the country.",
  },
];

const statisticRows = [
  [
    {
      value: "3,000+",
      label: "Attendees",
      className: "bg-green-inverted rounded-[1000px_0px_0px_1000px]",
    },
    {
      value: "100+",
      label: "Communities",
      className: "bg-purple-inverted rounded-[0px_1000px_1000px_0px]",
    },
  ],
  [
    {
      value: "20+",
      label: "Speakers",
      className: "bg-brown-inverted rounded-[0px_1000px_1000px_0px]",
    },
    {
      value: "3-day",
      label: "Convergence",
      className: "bg-blue-inverted rounded-[1000px_0px_0px_1000px]",
    },
  ],
];

export default function About() {
  return (
    <div className="relative flex w-full flex-col items-start" id="about">
      <section
        className="relative flex w-full flex-[0_0_auto] flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12 bg-brand-blue px-6 lg:pr-[var(--breakpoint-device-margin)] lg:pl-[120px] py-16 lg:py-24 overflow-hidden"
        aria-labelledby="about-heading"
      >
        <h1
          id="about-heading"
          className="relative mt-[-2.00px] w-full lg:flex-1 text-left lg:text-right text-[38px] sm:text-[48px] md:text-[60px] lg:text-[80px] leading-[1.1] lg:leading-[64.0px] tracking-tight lg:tracking-[-6.40px] text-[var(--color-inverted)] z-10"
        >
          <span className="text-white font-light inline-block" data-aos="fade-up" data-aos-duration="700">
            Connecting
            <br />
            Edo to the
            <br />
          </span>
          <strong data-aos="fade-up" data-aos-duration="900" className="inline-block font-display-display-bold !font-bold text-white lg:whitespace-pre-wrap leading-[var(--display-display-bold-line-height)] tracking-[var(--display-display-bold-letter-spacing)]">
            Future of <br className="hidden lg:block" />
            Tech
          </strong>
        </h1> 
        <motion.div
          className="absolute right-[13px] top-[40px] md:right-10 lg:relative lg:right-auto lg:top-auto h-[85px] w-[85px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] aspect-[1]"
          initial={{ opacity: 0, y: 50, rotate: -180 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <Image
            className="h-full w-full"
            width={100}
            height={100}
            alt=""
            aria-hidden="true"
            src={shapePattern.src}
          />
        </motion.div>
        <div className="relative flex w-full lg:flex-1 flex-col items-start lg:items-center justify-center gap-6 lg:gap-4 z-10">
          <p data-aos="fade-up" data-aos-duration="900" className="relative mt-[-1.00px] self-stretch font-body-paragraph text-[length:var(--body-paragraph-font-size)] font-light leading-[var(--body-paragraph-line-height)] tracking-[var(--body-paragraph-letter-spacing)] text-white">
            Benin Tech Fest is a community-driven technology and innovation
            convergence designed to strengthen Edo State&apos;s growing tech
            ecosystem through talent and skill development, startup mentorship
            and innovation support, community collaboration and access to talent
            and business opportunities.
          </p>
          <p data-aos="fade-up" data-aos-duration="900" className="relative self-stretch font-body-title text-[length:var(--body-title-font-size)] font-extrabold leading-[var(--body-title-line-height)] tracking-[var(--body-title-letter-spacing)] text-white">
            JOIN US ON 5TH - 7TH NOV. | 2026
            <br />
            AT VICTOR UWAIFO CREATIVE HUB,
            <br />
            BENIN CITY, EDO STATE
          </p>
        </div>
        <img
          className="hidden lg:block absolute bottom-0 left-0 h-80 w-[280px] aspect-[1] object-cover"
          alt="Edo Tech Fest attendee"
          src={edoMan.src}
          data-aos="fade-up-left"
          data-aos-duration="900" 
        />
      </section>
      <section
        className="relative flex w-full flex-[0_0_auto] flex-col items-start justify-center gap-4 bg-trans-10-inverted px-4 py-12"
        aria-labelledby="why-attend-heading"
      >
        <h2
          id="why-attend-heading"
          className="relative mt-[-1.00px] self-stretch font-body-title text-[length:var(--body-title-font-size)] font-[number:var(--body-title-font-weight)] leading-[var(--body-title-line-height)] tracking-[var(--body-title-letter-spacing)] text-inverted font-bold"
        >
          WHY ATTEND?
        </h2>
        <div className="relative grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-3">
          {attendanceBenefits.map((benefit) => (
            <article
              key={benefit.title}
              className="relative flex w-full flex-col items-start gap-4"
            >
              <h3 data-aos="fade-up" data-aos-duration="500" data-aos-delay="200" className="relative mt-[-1.00px] self-stretch font-heading-head-lg text-4xl leading-[var(--heading-head-lg-line-height)] tracking-[var(--heading-head-lg-letter-spacing)] text-inverted font-bold">
                {benefit.title}
              </h3>
              <p className="relative self-stretch font-body-paragraph text-[length:var(--body-paragraph-font-size)] font-[number:var(--body-paragraph-font-weight)] leading-[var(--body-paragraph-line-height)] tracking-[var(--body-paragraph-letter-spacing)] text-gray-inverted [font-style:var(--body-paragraph-font-style)]">
                {benefit.description}
              </p>
            </article>
          ))}

          <img
            className="absolute top-0 left-[calc(50.00%_-_200px)] h-[400px] w-[400px] aspect-[1] object-cover"
            alt="Map of Edo State"
            src={edoMap.src}
          />
        </div>
        <div
          className="relative flex w-full flex-[0_0_auto] flex-col items-center justify-center pt-8 px-0"
          aria-label="Event statistics"
        >
          {statisticRows.map((row, rowIndex) => (
            <div
              key={`statistic-row-${rowIndex}`}
              className={`relative flex w-full flex-[0_0_auto] ${
                rowIndex === 0 ? "items-center" : "items-start"
              }`}
            >
              <div
                className={`relative flex flex-1 grow flex-col items-center justify-center px-0 py-5 md:py-10 ${row[0].className}`}
              >
                <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-[1.5rem] md:text-5xl font-extrabold leading-[var(--display-display-bold-line-height)] tracking-[-2px] text-inverted">
                  {row[0].value}
                </div>
                <div className="relative w-fit whitespace-nowrap font-heading-head-lg -mt-2 font-bold leading-[var(--heading-head-lg-line-height)] tracking-[var(--heading-head-lg-letter-spacing)] text-inverted">
                  {row[0].label}
                </div>
              </div>
              <Image
                className="relative self-stretch aspect-[1] h-24 w-24 md:h-34 md:w-34"
                width={140}
                height={140}
                alt=""
                aria-hidden="true"
                src={rowIndex === 0 ? patternShape.src : image.src}
              />
              <div
                className={`relative flex flex-1 grow flex-col items-center justify-center px-0 py-5 md:py-10 ${row[1].className}`}
              >
                <div className="relative mt-[-1.00px] w-fit whitespace-nowrap text-[1.5rem] md:text-5xl font-extrabold leading-[var(--display-display-bold-line-height)] tracking-[-2px] text-inverted">
                  {row[1].value}
                </div>
                <div className="relative w-fit whitespace-nowrap font-heading-head-lg -mt-2 font-bold leading-[var(--heading-head-lg-line-height)] tracking-[var(--heading-head-lg-letter-spacing)] text-inverted">
                  {row[1].label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
