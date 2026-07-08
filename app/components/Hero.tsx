'use client';

import Image from "next/image";
import Link from "next/link";
import { HiLocationMarker, HiCalendar } from "react-icons/hi";
import { motion, useInView, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Button from "./Button";

function VersionCounter() {
    const [displayValue, setDisplayValue] = useState(1.0);
    const hasAnimated = useRef(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;

        hasAnimated.current = true;
        const startValue = 1.0;
        const endValue = 2.0;
        const duration = 2000;
        const startTime = performance.now();

        const animateCount = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress = 1 - Math.pow(1 - progress, 4);
            const currentCount = startValue + (endValue - startValue) * easedProgress;

            setDisplayValue(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        requestAnimationFrame(animateCount);
    }, [isInView]);

    return <span ref={ref}>{displayValue.toFixed(1)}</span>;
}




export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="relative md:px-24 text-white min-h-[750px] lg:min-h-screen pt-48 sm:pt-44 lg:pt-32 z-20 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute inset-0 z-0 user-select-none pointer-events-none">
                    <Image
                        src="/images/hero.jpg"
                        alt="Benin Tech Fest Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/75"></div>
                </div>
            </div>

            <div className="container mx-auto px-2 md:px-6 relative z-10 lg:pt-8 pb-28 md:pb-40">
                <div className="relative w-full min-h-[60vh] flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full max-w-5xl flex flex-col items-start text-left pt-4 md:pt-8">

                        <h1 className="text-[4.3rem] xs:text-[4.2rem] md:text-[4rem] lg:text-[3rem] xl:text-[5rem] font-black font-cabinet-grotesk tracking-tight leading-[0.88] text-white mb-6">
                            <motion.span
                                className="block whitespace-nowrap"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                BENIN<br /> <span className="text-biro-blue">TECH</span>
                            </motion.span>
                            <motion.span
                                className="block whitespace-nowrap"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            >
                                FEST <span className="text-brand-red"><VersionCounter /></span>
                            </motion.span>
                        </h1>
                        <div className="flex items-center gap-3 mb-6">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-[#f3f7ff]/70 text-md font-black font-cabinet-grotesk uppercase"
                            >
                                Building a Collaborative Ecosystem
                            </motion.span>
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-px w-15 bg-white/50 hidden sm:block origin-left"
                            ></motion.div>
                        </div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button onClick={onRegisterClick} variant="primary" className="group">
                                <span className="flex items-center justify-center gap-3">
                                    Register Now
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </span>
                            </Button>

                            <Button href="/sponsor" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-slate-900 group !shadow-[10px_10px_0px_rgba(255,255,255,0.15)] hover:!shadow-[4px_4px_0px_rgba(255,255,255,0.15)]">
                                <span className="flex items-center justify-center gap-3">
                                    Become a Sponsor
                                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                                </span>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Location & Date — right on lg, bottom on mobile */}
                    <motion.div
                        className="mt-12 lg:mt-0 self-center md:self-end lg:self-center lg:pt-32"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                            {/* Stacked Date Cards */}
                            <div className="relative w-64">
                                {Array.from({ length: 3 }).map((_, idx) => {
                                    const offsetX = (2 - idx) * 6;
                                    const offsetY = idx * 6;
                                    const rotate = (idx - 1) * -2;

                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                zIndex: 10 + idx,
                                                transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
                                            }}
                                            className={`absolute left-0 top-0 w-full flex items-center gap-5 px-6 py-4 rounded-2xl bg-brand-red text-white shadow-xl transition-transform ${idx === 2 ? 'hover:-translate-y-2 cursor-pointer' : ''}`}>
                                            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-black/10">
                                                <HiCalendar className="w-7 h-7" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-3xl font-black font-cabinet-grotesk leading-none mb-1">2–5</span>
                                                <span className="text-sm font-bold uppercase tracking-widest opacity-80">Nov 2026</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>


            </div>


        </section>
    );
}
