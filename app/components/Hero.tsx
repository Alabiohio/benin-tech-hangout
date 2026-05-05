'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useInView, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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

function CountUp({ value, suffix = "", delay = 0 }: { value: number, suffix?: string, delay?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const end = value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value, isInView]);

    return (
        <motion.span
            ref={ref}
            onViewportEnter={() => setIsInView(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
        >
            {count}{suffix}
        </motion.span>
    );
}

const highlightItems = [
    { label: "3000+ Attendees", value: 3000, suffix: "+", title: "Attendees" },
    { label: "100+ Communities", value: 100, suffix: "+", title: "Communities" },
    { label: "Tech Exhibition", title: "Tech Exhibition" },
    { label: "Networking", title: "Networking" },
    { label: "Startup Pitch", title: "Startup Pitch" },
    { label: "Tech Money Sessions", title: "Tech Money Sessions" },
    { label: "Creative Economy", title: "Creative Economy" },
    { label: "Policy & Regulations", title: "Policy & Regulations" },
];


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
};


export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="relative text-white min-h-[750px] lg:min-h-screen pt-44 sm:pt-44 lg:pt-32 z-20 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute inset-0 z-0 user-select-none pointer-events-none">
                    <Image
                        src="/images/hero.jpg"
                        alt="Benin Tech Fest Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 lg:pt-8 pb-4">
                <div className="flex flex-col items-center w-full gap-6">
                    <div className="w-full max-w-4xl flex flex-col items-center text-center pt-4 md:pt-8">


                        <h1 className="text-[2.8rem] xs:text-[4.2rem] md:text-[4rem] lg:text-[3rem] xl:text-[5rem] font-black font-righteous tracking-tight leading-[0.88] text-white mb-6">
                            <motion.span
                                className="block whitespace-nowrap"
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                BENIN <span className="text-[#dbeafe]">TECH</span>
                            </motion.span>
                            <motion.span
                                className="block whitespace-nowrap"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                            >
                                FEST <span className="text-[#fecaca]"><VersionCounter /></span>
                            </motion.span>
                        </h1>
                        <div className="flex items-center gap-3 mb-1">
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-px w-8 bg-white/50 hidden sm:block origin-right"
                            ></motion.div>
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="text-[#f3f7ff] text-xs font-black tracking-[0.5em] uppercase"
                            >
                                Where Builders Converge
                            </motion.span>
                            <motion.div 
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="h-px w-8 bg-white/50 hidden sm:block origin-left"
                            ></motion.div>
                        </div>
                        <motion.div
                            className="flex flex-row items-center justify-center gap-2 md:gap-8 mb-4 text-white/80 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-highlight-yellow"></span> Benin City, Edo State
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-highlight-yellow"></span> Oct 2, 2026
                            </span>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <button
                                onClick={onRegisterClick}
                                className="w-full sm:w-auto relative px-10 py-2.5 bg-highlight-yellow text-white text-base font-black rounded-xl overflow-hidden group transition-all hover:-translate-y-1 hover:text-highlight-yellow hover:bg-white active:translate-y-0"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <span className="relative flex items-center justify-center gap-3 uppercase tracking-widest">
                                    Register Now
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </span>
                            </button>

                            <Link
                                href="/sponsor"
                                className="w-full sm:w-auto relative px-10 py-2.5 bg-white text-highlight-yellow border border-white/30 text-base font-black rounded-xl group transition-all hover:text-white hover:bg-highlight-yellow hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center"
                            >
                                <span className="flex items-center gap-3 uppercase tracking-widest">
                                    Become a Sponsor
                                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Event Highlights Grid */}
                <div id="highlights" className="w-full mt-12 md:mt-16 backdrop-blur-lg rounded-2xl p-2 py-3">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-2 gap-4 px-4">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-[0.85]">
                                Event <br /> <span className="text-highlight-yellow italic">Highlights.</span>
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            className="hidden md:block h-px flex-1 bg-white/20 ml-12 origin-left mb-4"
                        ></motion.div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6"
                    >
                        {highlightItems.map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.05,
                                    y: -10,
                                    transition: { type: "spring", stiffness: 400, damping: 10 }
                                }}
                                className="bg-white/5 backdrop-blur-md group relative px-3 py-3 md:p-6 border border-white/10 rounded-2xl transition-all duration-500 hover:border-highlight-yellow/40 hover:bg-white/10 shadow-xl"
                            >
                                {/* Animated accent corner */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none"
                                >
                                    <div className="absolute top-0 right-0 w-full h-full bg-highlight-yellow/10 rotate-45 translate-x-6 -translate-y-6"></div>
                                </motion.div>

                                <div className="flex flex-col h-full justify-center gap-2">
                                    <div className="space-y-1">
                                        <div className="text-xl md:text-2xl font-black text-white leading-none group-hover:text-highlight-yellow transition-colors duration-300">
                                            {'value' in item ? (
                                                <CountUp value={item.value!} suffix={item.suffix} />
                                            ) : (
                                                <span className="text-lg md:text-xl uppercase tracking-tight leading-tight block">{item.title}</span>
                                            )}
                                            {'value' in item && <span className="block text-xs font-bold text-white/40 mt-2 uppercase tracking-widest">{item.title}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom scan line */}
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "100%" }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-highlight-yellow/40 to-transparent"
                                ></motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>


        </section>
    );
}
