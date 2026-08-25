"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";
import { useTheme } from "next-themes";

import patternShape from "@/assets/images/pattern.png";
import subtract from "@/assets/images/subtract.png";
import subtract2 from "@/assets/images/subtract2.png";
import imageFill from "@/assets/images/imgfill.png";
import organicFill from "@/assets/images/organicfill.png";
import patternEdo from "@/assets/images/patternedo.png";
import imageFill2 from "@/assets/images/imgfill2.png";
import heroDark from "@/assets/images/hero/heroDark.png";
import heroLight from "@/assets/images/hero/heroLight.png";

const patternShapeSvg = patternShape.src;
const subtractSvg = subtract.src;
const subtract1Svg = subtract2.src;
const organicFillSvg = organicFill.src;
const patternEdoSvg = patternEdo.src;
const heroImageGreen = imageFill.src;
const heroImageBlue = imageFill2.src;

export const Hero = (): React.JSX.Element => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [heroAnimationComplete, setHeroAnimationComplete] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const isDark = mounted && resolvedTheme === "dark";
  // number "2.0": orange-red in dark, deeper red in light
  const numberFill = isDark ? "#FF695B" : "#c94234";
  // stroke1: bright green in dark, deeper green in light
  const stroke1Fill = isDark ? "#13E1A1" : "#0cb888";
  // stroke2: white in dark, near-black in light
  const stroke2Fill = isDark ? "white" : "#1a1a1a";

  const handleRegistration = (): void => {
    // Navigate to registration page
    window.location.href = "/register";
  };

  return (
    <section
      className="flex flex-col items-center justify-end gap-[var(--space-gap)] relative bg-background w-full py-0 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ 
        minHeight: "720px",
        backgroundImage: `url(${isDark ? heroDark.src : heroLight.src})`
      }}
      data-node-id="248:4402"
    >
      {/* Hero Text Section */}
      <div
        className="flex flex-col items-center justify-center gap-5 py-0 relative flex-1 w-full px-6"
        data-node-id="248:4403"
      >
        {/* Date */}
        <motion.p
          className="mt-10 -mb-10 lg:mt-24 lg:mb-0 text-center text-[var(--text-title)] font-medium text-[var(--color-gray-inverted)] tracking-tight"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          5TH - 7TH, NOVEMBER | 2026
        </motion.p>

        {/* Main Title */}
        <h1
          className="flex flex-col items-center gap-0 text-center"
          id="hero-title"
          aria-label="Benin Tech Fest 2.0"
        >
          {/* First line: "Benin" with 2.0 badge */}
          <div className="flex items-end gap-2 justify-center">
            <motion.span
              className="text-[var(--text-hero)] text-[4.5rem] lg:!text-[8rem] font-extrabold lg:font-bold text-[var(--color-inverted)] leading-[0.8] tracking-[-0.06em] inline-block"
              initial={{ scale: 8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 18,
                delay: 0.05,
              }}
            >
              Benin
            </motion.span>
            {/* Edition SVG Assets */}
            <div className="flex items-end gap-0 pb-2 lg:pb-4 h-24">
              <motion.svg
                width="122" height="72" viewBox="0 0 122 72" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 lg:h-15 w-auto object-contain transition-colors duration-300"
                aria-label="2.0 edition"
                initial={{ scale: 10, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  damping: 16,
                  delay: 0.18,
                }}
              >
                <path d="M72.6249 22.8775C74.099 22.8775 75.3781 23.3696 76.4616 24.3534C77.5577 25.3373 78.4024 26.8065 78.9945 28.7614C79.5993 30.7164 79.9013 33.1638 79.9014 36.1025C79.9139 40.5677 79.2582 43.9172 77.9353 46.1498C76.6124 48.3822 74.8423 49.4986 72.6249 49.4986C71.1509 49.4985 69.8657 49.0065 68.7696 48.0227C67.6735 47.0262 66.8228 45.5379 66.218 43.5577C65.6259 41.5647 65.3299 39.0793 65.3299 36.1025C65.3425 31.7008 66.0104 28.3963 67.3332 26.189C68.6561 23.9817 70.4201 22.8776 72.6249 22.8775Z" fill={numberFill} />
                <path fillRule="evenodd" clipRule="evenodd" d="M94.3928 72H0V0H121.362L94.3928 72ZM72.6249 16.1614C69.3871 16.1615 66.5965 16.9429 64.2531 18.5069C61.9222 20.0583 60.127 22.3229 58.8671 25.2997C57.6198 28.2764 56.9954 31.8772 56.9953 36.1025C56.9827 40.3406 57.6 43.9675 58.8473 46.9821C60.1073 49.9967 61.9036 52.2986 64.2345 53.8879C66.5779 55.477 69.3745 56.2788 72.6249 56.2914C75.8756 56.2914 78.667 55.4958 80.9979 53.9065C83.3284 52.3172 85.1169 50.0151 86.3642 47.0007C87.6241 43.9861 88.2545 40.3532 88.2545 36.1025C88.2671 31.8772 87.6438 28.2824 86.3839 25.3184C85.124 22.3416 83.3216 20.0709 80.9781 18.5069C78.6473 16.9429 75.8628 16.1614 72.6249 16.1614ZM52.1959 46.8878C50.9486 46.8878 49.8777 47.3294 48.9831 48.2124C48.1013 49.0953 47.6597 50.155 47.6597 51.3911C47.6598 52.6397 48.1013 53.7117 48.9831 54.6072C49.8777 55.49 50.9486 55.9318 52.1959 55.9318C53.0148 55.9318 53.7646 55.7301 54.4448 55.3265C55.1252 54.9102 55.6727 54.3607 56.0885 53.6795C56.5168 52.986 56.731 52.2234 56.7311 51.3911C56.7311 50.1552 56.2782 49.0952 55.3714 48.2124C54.4643 47.3294 53.4054 46.8878 52.1959 46.8878ZM31.4544 16.1614C28.7583 16.1615 26.3769 16.6716 24.3106 17.6933C22.2444 18.715 20.638 20.1599 19.4915 22.0266C18.3451 23.8934 17.7722 26.0947 17.7722 28.6298H25.5398C25.5398 27.394 25.7784 26.3278 26.257 25.4324C26.7357 24.5369 27.4167 23.8492 28.2986 23.3699C29.1806 22.8906 30.2141 22.6506 31.3985 22.6506C32.5322 22.6506 33.5468 22.8775 34.4413 23.3315C35.3357 23.773 36.041 24.4103 36.5575 25.2427C37.0741 26.0626 37.3328 27.0407 37.3328 28.1759C37.3327 29.1973 37.1245 30.1495 36.7089 31.0323C36.2931 31.9026 35.6818 32.7919 34.8755 33.7001C34.0818 34.6082 33.0987 35.6296 31.927 36.7648L18.1494 49.5369V55.4394H45.7419V48.742H29.4895V48.4766L35.1398 42.9327C37.7979 40.5111 39.8582 38.4368 41.3197 36.7089C42.781 34.9684 43.7955 33.3851 44.3625 31.9599C44.942 30.5346 45.232 29.0897 45.232 27.6265C45.232 25.394 44.6591 23.4136 43.5127 21.6856C42.3662 19.9576 40.7597 18.6075 38.6935 17.6362C36.6398 16.6524 34.2262 16.1614 31.4544 16.1614Z" fill={numberFill} />
              </motion.svg>
              <motion.svg
                width="45" height="72" viewBox="0 0 45 72" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 lg:h-15 w-auto -mx-1 transition-colors duration-300"
                aria-hidden="true"
                initial={{ scale: 12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.28,
                }}
              >
                <path d="M17.9797 72H0L26.9695 0H44.9492L17.9797 72Z" fill={stroke1Fill} />
              </motion.svg>
              <motion.svg
                width="45" height="72" viewBox="0 0 45 72" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 lg:h-15 w-auto -mx-1 transition-colors duration-300"
                aria-hidden="true"
                initial={{ scale: 12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.38,
                }}
              >
                <path d="M17.9797 72H0L26.9695 0H44.9492L17.9797 72Z" fill={stroke2Fill} />
              </motion.svg>
            </div>
          </div>
          {/* Second line: "Tech Fest" */}
          <motion.span
            className="text-[var(--text-hero)] text-[4.5rem] lg:!text-[8rem] font-extrabold lg:font-bold text-[var(--color-inverted)] leading-[0.8] tracking-[-0.06em] inline-block"
            initial={{ scale: 8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: 0.22,
            }}
          >
            Tech Fest
          </motion.span>
        </h1>

        {/* Slogan */}
        <motion.p
          className="text-center text-[var(--text-title)] font-medium text-[var(--color-gray-inverted)] tracking-tight max-w-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.5,
          }}
        >
          A CONVERGENCE OF EDO'S TECH ECOSYSTEM
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onAnimationComplete={() => setHeroAnimationComplete(true)}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.65,
          }}
        >
          <Button
            variant="primary"
            onClick={handleRegistration}
            className="!py-3 bg-[var(--color-static-blue)] text-white font-semibold text-[var(--text-btn-sm)] !font-cabinet-grotesk rounded-full hover:opacity-90 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-static-blue)]"
            aria-label="Register for Benin Tech Fest 2026"
          >
            REGISTER NOW
          </Button>
        </motion.div>
      </div>

      {/* Pattern Strip Section */}
      <div
        className="w-full overflow-hidden md:overflow-x-hidden h-20 md:h-25 lg:h-40 flex items-center justify-center"
        style={{
          gap: "0",
          margin: "0",
        }}
        data-node-id="248:4415"
        aria-label="Benin Tech Fest visual highlights"
      >
        {/* Pattern tiles - scaled to fit and overlap */}
        <div
          className="flex items-center h-full w-full min-w-0 ml-0 justify-between gap-0"
        >
          {/* Tile 1: Pattern Shape */}
          <motion.img
            src={patternShapeSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />

          {/* Tile 2: Subtract */}
          <motion.img
            src={subtractSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          />

          {/* Tile 3: Subtract 2 */}
          <motion.img
            src={subtract1Svg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />

          {/* Tile 4: Image with green background */}
          <motion.div
            className="h-full aspect-square bg-[var(--color-green-inverted)] rounded-none flex items-center justify-center overflow-hidden flex-shrink-0 [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={heroImageGreen}
              alt="Festival attendee"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Tile 5: Organic Fill */}
          <motion.img
            src={organicFillSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          />

          {/* Tile 6: Pattern Edo */}
          <motion.img
            src={patternEdoSvg}
            alt=""
            className="h-full object-contain flex-shrink-0 md:h-full [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          />

          {/* Tile 7: Image with blue background (rounded) */}
          <motion.div
            className="h-full aspect-square bg-[var(--color-blue-inverted)] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 [@media(max-width:767px)]:h-[80px]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroAnimationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <img
              src={heroImageBlue}
              alt="Festival attendee"
              className="w-full h-full object-cover"              
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
