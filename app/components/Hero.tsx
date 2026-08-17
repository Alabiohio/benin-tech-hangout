"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";

import number from "@/assets/images/number.png";
import stroke1 from "@/assets/images/stroke1.png";
import stroke2 from "@/assets/images/stroke2.png";
import patternShape from "@/assets/images/pattern.png";
import subtract from "@/assets/images/subtract.png";
import subtract2 from "@/assets/images/subtract2.png";
import imageFill from "@/assets/images/imgfill.png";
import organicFill from "@/assets/images/organicfill.png";
import patternEdo from "@/assets/images/patternedo.png";
import imageFill2 from "@/assets/images/imgfill2.png";

// Figma asset URLs (temporary, expires in 7 days)
const editionNumberSvg = number.src;
const stroke1Svg = stroke1.src;
const stroke2Svg = stroke2.src;

const patternShapeSvg = patternShape.src;
const subtractSvg = subtract.src;
const subtract1Svg = subtract2.src;
const organicFillSvg = organicFill.src;
const patternEdoSvg = patternEdo.src;
const heroImageGreen = imageFill.src;
const heroImageBlue = imageFill2.src;

export const Hero = (): React.JSX.Element => {
  const handleRegistration = (): void => {
    // Navigate to registration page
    window.location.href = "/register";
  };

  return (
    <section
      className="flex flex-col items-center justify-end gap-[var(--space-gap)] relative bg-background w-full py-0"
      style={{ minHeight: "720px" }}
      data-node-id="248:4402"
    >
      {/* Hero Text Section */}
      <div
        className="flex flex-col items-center justify-center gap-5 py-0 relative flex-1 w-full px-6"
        data-node-id="248:4403"
      >
        {/* Date */}
        <p data-aos="zoom-out" className="mt-10 -mb-10 lg:mt-24 lg:mb-0 text-center text-[var(--text-title)] font-medium text-[var(--color-gray-inverted)] tracking-tight">
          5TH - 7TH, NOVEMBER | 2026
        </p>

        {/* Main Title */}
        <h1
          className="flex flex-col items-center gap-0 text-center"
          id="hero-title"
          aria-label="Benin Tech Fest 2.0"
        >
          {/* First line: "Benin" with 2.0 badge */}
          <div className="flex items-end gap-2 justify-center">
            <span data-aos="zoom-out" className="text-[var(--text-hero)] text-[4.5rem] lg:!text-[8rem] font-extrabold lg:font-bold text-[var(--color-inverted)] leading-[0.8] tracking-[-0.06em]">
              Benin
            </span>
            {/* Edition SVG Assets */}
            <div className="flex items-end gap-0 pb-2 lg:pb-4 h-24">
              <img
                src={editionNumberSvg}
                alt="2.0 edition"
                className="h-8 lg:h-15 object-contain"
                data-aos="zoom-out"
              />
              <img
                src={stroke1Svg}
                alt=""
                className="h-8 lg:h-15 w-auto object-contain -mx-1"
                data-aos="fade-left"
              />
              <img
                src={stroke2Svg}
                alt=""
                className="h-8 lg:h-15 w-auto object-contain -mx-1"
                data-aos="fade-left"
                data-aos-delay="200"
              />
            </div>
          </div>
          {/* Second line: "Tech Fest" */}
          <span data-aos="zoom-out" className="text-[var(--text-hero)] text-[4.5rem] lg:!text-[8rem] font-extrabold lg:font-bold text-[var(--color-inverted)] leading-[0.8] tracking-[-0.06em]">
            Tech Fest
          </span>
        </h1>

        {/* Slogan */}
        <p data-aos="zoom-out" className="text-center text-[var(--text-title)] font-medium text-[var(--color-gray-inverted)] tracking-tight max-w-xl">
          A CONVERGENCE OF EDO TECH PROFESSIONALS
        </p>

        {/* CTA Button */}
        <Button
          variant="primary"
          onClick={handleRegistration}
          className="!py-3 bg-[var(--color-static-blue)] text-white font-semibold text-[var(--text-btn-sm)] rounded-full hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-static-blue)]"
          aria-label="Register for Benin Tech Fest 2026"
          data-aos="fade-up"
        >
          REGISTER NOW
        </Button>
      </div>

      {/* Pattern Strip Section */}
      <div
        className="w-full -mt-64 overflow-hidden md:overflow-x-hidden flex items-center justify-center"
        style={{
          height: "160px",
          gap: "0",
          margin: "0",
        }}
        data-node-id="248:4415"
        aria-label="Benin Tech Fest visual highlights"
      >
        {/* Pattern tiles - scaled to fit and overlap */}
        <div
          className="flex items-center h-full w-max min-w-[150%] -ml-[18%] md:min-w-0 md:ml-0 md:justify-center md:h-full [@media(max-width:767px)]:min-w-[150%] [@media(max-width:767px)]:-ml-[18%] [@media(max-width:767px)]:gap-[14px] [@media(max-width:767px)]:h-[120px]"
          style={{ gap: "24px" }}
        >
          {/* Tile 1: Pattern Shape */}
          <img
            src={patternShapeSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[100px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="800"
          />

          {/* Tile 2: Subtract */}
          <img
            src={subtractSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[100px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="700"
          />

          {/* Tile 3: Subtract 2 */}
          <img
            src={subtract1Svg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[100px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          />

          {/* Tile 4: Image with green background */}
          <div
            className="h-full aspect-square bg-[var(--color-green-inverted)] rounded-none flex items-center justify-center overflow-hidden flex-shrink-0 [@media(max-width:767px)]:h-[120px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <img
              src={heroImageGreen}
              alt="Festival attendee"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Tile 5: Organic Fill */}
          <img
            src={organicFillSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[100px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="100"
          />

          {/* Tile 6: Pattern Edo */}
          <img
            src={patternEdoSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[100px]"
            style={{ marginRight: "-24px" }}
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="700"
          />

          {/* Tile 7: Image with blue background (rounded) */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="800"
            className="h-full aspect-square bg-[var(--color-blue-inverted)] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 [@media(max-width:767px)]:h-[100px]"
          >
            <img
              src={heroImageBlue}
              alt="Festival attendee"
              className="w-full h-full object-cover"              
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
