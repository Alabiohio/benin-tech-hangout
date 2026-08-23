"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./Button";
import image from "@/assets/images/ticket/pattern1.png";
import passBadge from "@/assets/images/ticket/pattern1.png";
import passBadge2 from "@/assets/images/ticket/pattern1.png";
import passBadge3 from "@/assets/images/ticket/pattern1.png";

const passes = [
  {
    name: "Regular",
    price: "₦3,500",
    audience: "EVERYBODY ACCESS",
    badge: passBadge,
    colorClass: "bg-blue",
    textColorClass: "text-blue",
    features: [
      "Full 3-day event access",
      "Access to exhibition floor + all public sessions",
      "Access to job fair and recruiting companies",
      "Digital certificate of participation",
      "Speed mentoring session",
    ],
  },
  {
    name: "Standard",
    price: "₦10,000",
    audience: "BEST FOR EXPLORERS",
    badge: image,
    colorClass: "bg-green",
    textColorClass: "text-green",
    features: [
      "Everything in Regular PLUS",
      "Priority seating",
      "Premium merch (hoodie + cap & more)",
      "Refreshments (day 1 & 2)",
      "Digital certificate of participation",
      "Event program booklet & notepad",
      "Access to lounge area",
    ],
  },
  {
    name: "Business",
    price: "₦35,000",
    audience: "THE BUSINESS-MINDED",
    badge: passBadge2,
    colorClass: "bg-brown",
    textColorClass: "text-brown",
    features: [
      "Everything in Standard PLUS:",
      "VIP Lounge + front-row seating",
      "30 min investor meeting and networking",
      "Founders' roundtable & startup resources",
      "Refreshments (all 3 days)",
      "Spotlight feature on BTF social media",
      "Lifetime recording access to sessions",
    ],
  },
  {
    name: "VIP",
    price: "₦85,000",
    audience: "EXCLUSIVE EXPERIENCE",
    badge: passBadge3,
    colorClass: "bg-purple",
    textColorClass: "text-purple",
    features: [
      "Everything in Business PLUS:",
      "Reserved seats in front row",
      "Red carpet VIP concierge service",
      "Premium VIP lounge, deal room & exclusive lunch",
      "Assigned PA & special duties",
      "Media interviews & priority press coverage",
    ],
  },
];

function EventExperienceIntroSection() {
  return (
    <section
      className="relative flex w-full self-stretch flex-[0_0_auto] flex-col items-start gap-4 px-4 lg:px-8"
      aria-labelledby="event-experience-heading"
    >
      <h2
        id="event-experience-heading"
        className="relative mt-[-1px] self-stretch text-[40px] md:text-[60px] lg:text-[80px] leading-[0.9] tracking-[-1.4px] text-colours-inverted"
      >
        <span data-aos="fade-up" data-aos-duration="500" data-aos-delay="200" className="inline-block font-light leading-[var(--display-display-thin-line-height)] tracking-[var(--display-display-thin-letter-spacing)]">
          Choose Your
          <br />
        </span>
        <strong data-aos="fade-up" data-aos-duration="700" data-aos-delay="400" className="block font-display-display-bold font-bold leading-[var(--display-display-bold-line-height)] tracking-[var(--display-display-bold-letter-spacing)]">
          Event Experience
        </strong>
      </h2>
      <p className="relative self-stretch font-body-paragraph leading-[var(--body-paragraph-line-height)] tracking-[var(--body-paragraph-letter-spacing)] text-colours-inverted mb-5">
        <span className="font-body-paragraph text-[length:var(--body-paragraph-font-size)] font-[number:var(--body-paragraph-font-weight)] leading-[var(--body-paragraph-line-height)] tracking-[var(--body-paragraph-letter-spacing)] [font-style:var(--body-paragraph-font-style)]">
          Register through any of our partner communities you belong to
          <br />
          and get a free regular pass (limited slots).{" "}
        </span>
        <a
          href="/ticket#communities"
          className="font-body-paragraph text-[#1570ef] text-[length:var(--body-paragraph-font-size)] font-[number:var(--body-paragraph-font-weight)] leading-[var(--body-paragraph-line-height)] tracking-[var(--body-paragraph-letter-spacing)] underline [font-style:var(--body-paragraph-font-style)]"
        >
          See communities
        </a>
      </p>
    </section>
  );
}

function EventPassPricingSection() {
  const router = useRouter();

  const handlePassSelection = (passName: string, passPrice: number) => {
    router.push(`/buy-ticket?pass=${encodeURIComponent(passName)}&price=${passPrice}`);
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-4 relative self-stretch w-full flex-[0_0_auto] px-5 pb-8"
      aria-label="Event pass pricing"
    >
      {passes.map((pass, index) => (
        <motion.article
          key={pass.name}
          className="flex flex-col h-[560px] items-start relative flex-1 grow bg-colours-neutral"
          aria-labelledby={`${pass.name.toLowerCase()}-pass-title`}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
        >
          <div
            className={`${pass.colorClass} absolute w-full h-full top-0 left-0 opacity-15`}
            aria-hidden="true"
          />
          <header
            className={`${pass.colorClass} flex flex-col items-start pl-6 pr-0 py-6 relative self-stretch w-full flex-[0_0_auto]`}
          >
            <div className="relative self-stretch mt-[-1.00px] opacity-60 font-heading-head-sm font-[number:var(--heading-head-sm-font-weight)] text-background text-[length:var(--heading-head-sm-font-size)] tracking-[var(--heading-head-sm-letter-spacing)] leading-[var(--heading-head-sm-line-height)] [font-style:var(--heading-head-sm-font-style)]">
              {pass.price}
            </div>
            <h3
              id={`${pass.name.toLowerCase()}-pass-title`}
              className="relative self-stretch font-heading-head-lg font-bold text-3xl text-background tracking-[var(--heading-head-lg-letter-spacing)] leading-[var(--heading-head-lg-line-height)]"
            >
              {pass.name}
            </h3>
            <div className="relative flex items-center self-stretch opacity-50 font-body-caption font-[number:var(--body-caption-font-weight)] text-colours-neutral text-[length:var(--body-caption-font-size)] tracking-[var(--body-caption-letter-spacing)] leading-[var(--body-caption-line-height)] [font-style:var(--body-caption-font-style)]">
              {pass.audience}
            </div>
            <Image
              className="absolute top-0 right-0 w-20 h-[90px] aspect-[1] object-cover"
              alt=""
              aria-hidden="true"
              src={pass.badge}
            />
          </header>
          <div className="flex flex-col items-start gap-4 pt-4 pb-6 px-4 relative flex-1 self-stretch w-full grow">
            <h4
              className={`${pass.textColorClass} relative self-stretch mt-[-2.00px] font-body-title font-[number:var(--body-title-font-weight)] text-[length:var(--body-title-font-size)] tracking-[var(--body-title-letter-spacing)] leading-[var(--body-title-line-height)] [font-style:var(--body-title-font-style)]`}
            >
              What&apos;s included?
            </h4>
            <ul className="relative flex-1 self-stretch list-disc pl-5 font-body-caption font-[number:var(--body-caption-font-weight)] text-colours-inverted text-[length:var(--body-caption-font-size)] tracking-[var(--body-caption-letter-spacing)] leading-[var(--body-caption-line-height)] [font-style:var(--body-caption-font-style)]">
              {pass.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className={`${pass.colorClass} all-unset box-border flex items-center justify-center gap-2 py-3 px-10 relative self-stretch w-full flex-[0_0_auto] rounded-[1000px] cursor-pointer hover:opacity-90 transition-opacity`}
              aria-label={`Get ${pass.name} pass for ${pass.price}`}
              onClick={() => handlePassSelection(pass.name, parseInt(pass.price.replace(/[₦,]/g, '')))}
            >
              <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-label-sm font-[number:var(--label-sm-font-weight)] text-background text-[length:var(--label-sm-font-size)] text-center tracking-[var(--label-sm-letter-spacing)] leading-[var(--label-sm-line-height)] whitespace-nowrap [font-style:var(--label-sm-font-style)]">
                GET PASS
              </span>
            </button>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

export default function TicketsScreen() {
  return (
    <main
      className="relative flex w-full flex-col items-start gap-[var(--breakpoint-device-gap)] px-[var(--breakpoint-device-margin)] py-[var(--breakpoint-device-margin)]"
      data-breakpoint-mode="desktop"
      data-colours-mode="light-mode"
    >
      <EventExperienceIntroSection />
      <EventPassPricingSection />
    </main>
  );
}
