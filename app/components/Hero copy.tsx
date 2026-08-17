"use client";

import React, { useState } from "react";
import Image from "next/image";
//import image from "./image.png";
//import image1 from "./image.svg";
//import img from "./img.png";
//import number from "./number.svg";
import organicFill from "@/assets/images/organicfill.png";
import patternEdo from "@/assets/images/patternedo.png";
import patternShape from "@/assets/images/pattern.png";
import stroke from "./stroke.svg";
import subtract from "@/assets/images/subtract.png";
import subtract2 from "@/assets/images/subtract2.png";

const decorativeTiles = [
  { src: patternShape, alt: "", className: "" },
  { src: subtract, alt: "", className: "-ml-1.5" },
  { src: subtract2, alt: "", className: "-ml-1.5" },
] as const;

const trailingDecorativeTiles = [
  { src: organicFill, alt: "", className: "-ml-1.5" },
  { src: patternEdo, alt: "", className: "-ml-1.5" },
] as const;

export const Hero = (): React.JSX.Element => {
  const [registrationStarted, setRegistrationStarted] = useState(false);

  const handleRegistration = (): void => {
    setRegistrationStarted(true);
  };

  return (
    <main className="flex flex-col h-[720px] items-center justify-end gap-[var(--breakpoint-device-gap)] relative bg-colours-neutral">
      <section
        className="flex flex-col items-center justify-center gap-[var(--breakpoint-button-x-pad)] pr-[var(--breakpoint-device-margin)] pl-[var(--breakpoint-device-margin)] py-0 relative flex-1 self-stretch w-full grow"
        aria-labelledby="hero-title"
      >
        <p className="relative w-fit font-body-title font-[number:var(--body-title-font-weight)] text-colours-gray-inverted text-[length:var(--body-title-font-size)] tracking-[var(--body-title-letter-spacing)] leading-[var(--body-title-line-height)] whitespace-nowrap [font-style:var(--body-title-font-style)]">
          5TH - 7TH, NOVEMBER | 2026
        </p>
        <h1
          id="hero-title"
          className="inline-flex flex-col items-start relative flex-[0_0_auto]"
          aria-label="Benin 2.0 Tech Fest"
        >
          <span className="inline-flex items-end gap-2.5 relative flex-[0_0_auto]">
            <span className="relative flex items-center w-fit mt-[-1.00px] font-display-hero font-[number:var(--display-hero-font-weight)] text-colours-inverted text-[length:var(--display-hero-font-size)] tracking-[var(--display-hero-letter-spacing)] leading-[var(--display-hero-line-height)] whitespace-nowrap [font-style:var(--display-hero-font-style)]">
              Benin
            </span>
            <span
              className="inline-flex items-end pt-5 pb-1 px-0 relative self-stretch flex-[0_0_auto]"
              aria-hidden="true"
            >
              <Image
                className="relative self-stretch aspect-[1.69]"
                alt=""
                src="/assets/hero/number.png"
                width={135}
                height={80}
              />
              <Image
                className="relative self-stretch -ml-4 aspect-[0.62]"
                alt=""
                src="/assets/hero/stroke1.png"
                width={50}
                height={80}
              />
              <Image
                className="relative self-stretch -ml-4 aspect-[0.62]"
                alt=""
                src="/assets/hero/stroke2.png"
                width={50}
                height={80}
              />
            </span>
          </span>
          <span className="relative flex items-center w-fit font-display-hero font-[number:var(--display-hero-font-weight)] text-colours-inverted text-[length:var(--display-hero-font-size)] tracking-[var(--display-hero-letter-spacing)] leading-[var(--display-hero-line-height)] whitespace-nowrap [font-style:var(--display-hero-font-style)]">
            Tech Fest
          </span>
        </h1>
        <p className="relative w-fit font-body-title font-[number:var(--body-title-font-weight)] text-colours-gray-inverted text-[length:var(--body-title-font-size)] text-center tracking-[var(--body-title-letter-spacing)] leading-[var(--body-title-line-height)] whitespace-nowrap [font-style:var(--body-title-font-style)]">
          A CONVERGENCE OF EDO TECH PROFESSIONALS
        </p>
        <button
          className="all-unset box-border flex w-80 cursor-pointer items-center justify-center gap-2 pt-[var(--breakpoint-button-y-pad-sm)] pr-[var(--breakpoint-button-x-pad)] pb-[var(--breakpoint-button-y-pad-sm)] pl-[var(--breakpoint-button-x-pad)] relative flex-[0_0_auto] bg-colours-static-blue rounded-[1000px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-colours-static-blue"
          type="button"
          onClick={handleRegistration}
          aria-label="Register for Benin Tech Fest 2026"
        >
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] font-label-sm font-[number:var(--label-sm-font-weight)] text-colours-static-white text-[length:var(--label-sm-font-size)] text-center tracking-[var(--label-sm-letter-spacing)] leading-[var(--label-sm-line-height)] whitespace-nowrap [font-style:var(--label-sm-font-style)]">
            REGISTER NOW
          </span>
        </button>
        <span className="sr-only" aria-live="polite">
          {registrationStarted ? "Registration selected." : ""}
        </span>
      </section>
      <section
        className="flex min-w-[720px] max-w-[1440px] min-h-20 max-h-40 items-start justify-center relative w-full overflow-hidden aspect-[9]"
        aria-label="Benin Tech Fest visual highlights"
      >
        {decorativeTiles.map((tile) => (
          <Image
            key={tile.src.src}
            className={`relative flex-1 min-w-[100px] grow min-h-[100px] aspect-[1] ${tile.className}`}
            alt={tile.alt}
            src={tile.src}
            width={100}
            height={100}
            aria-hidden="true"
          />
        ))}

        <div className="flex min-w-[100px] min-h-[100px] items-center gap-2.5 mb-[-50.86px] -ml-1.5 bg-colours-green-inverted aspect-[1] relative flex-1 grow">
          <Image
            className="self-stretch object-cover relative flex-1 grow"
            alt="Festival attendee"
            src={patternShape.src}
            width={100}
            height={100}
          />
        </div>
        {trailingDecorativeTiles.map((tile) => (
          <Image
            key={tile.src.src}
            className={`relative flex-1 min-w-[100px] grow min-h-[100px] aspect-[1] ${tile.className}`}
            alt={tile.alt}
            src={tile.src}
            width={100}
            height={100}
            aria-hidden="true"
          />
        ))}

        <div className="flex min-w-[100px] min-h-[100px] items-center gap-2.5 relative flex-1 grow mb-[-50.86px] -ml-1.5 bg-colours-blue-inverted rounded-[1000px] overflow-hidden aspect-[1]">
          <Image
            className="self-stretch relative flex-1 grow"
            alt="Festival attendee"
            src={patternShape.src}
            width={100}
            height={100}
          />
        </div>
      </section>
    </main>
  );
};

export default Hero;
