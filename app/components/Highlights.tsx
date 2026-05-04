"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const highlightItems = [
    { label: "3000+ Attendees", value: 3000, suffix: "+", title: "Attendees", icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
    { label: "100+ Communities", value: 100, suffix: "+", title: "Communities", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
    { label: "Tech Exhibition", title: "Tech Exhibition", icon: <><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></> },
    { label: "Networking", title: "Networking", icon: <path d="m8 3 4 8 5-5 5 15H2L8 3z" /> },
    { label: "Startup Pitch", title: "Startup Pitch", icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.5-1 1-4c2 1 3 3 4 4z" /><path d="m12 15-3-3" /><path d="M15 6h.01" /></> },
    { label: "Tech Money Sessions", title: "Tech Money Sessions", icon: <><rect width="20" height="12" x="2" y="6" rx="2" /><circle cx="12" cy="12" r="2" /><path d="M6 12h.01M18 12h.01" /></> },
    { label: "Creative Economy", title: "Creative Economy", icon: <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /> },
    { label: "Policy & Regulations", title: "Policy & Regulations", icon: <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /> },
];

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

export default function Highlights() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const accentX = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <section
            id="highlights"
            ref={sectionRef}
            className="py-10 md:py-20 bg-slate-50/40 relative z-20 overflow-hidden border-b border-slate-100"
        >
            {/* Architectural Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Grid Pattern with pulse */}
                <motion.div
                    animate={{ opacity: [0.01, 0.03, 0.01] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0"
                    style={{ backgroundImage: "radial-gradient(#0f2f6b 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }}
                ></motion.div>

                {/* Parallax Geometric Accents */}
                <motion.div
                    style={{ x: accentX }}
                    className="absolute right-0 top-0 w-1/4 h-full bg-white border-l border-slate-200/30 skew-x-12 origin-top transform"
                ></motion.div>

                {/* Parallax Background Text */}
                <motion.div
                    style={{ y: textY }}
                    className="absolute bottom-0 right-10 text-[25vw] font-black text-slate-200/10 leading-none select-none pointer-events-none uppercase tracking-tighter"
                >
                    2026
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-biro-blue-dark uppercase tracking-tighter leading-[0.8]">
                            Event <br /> <span className="text-biro-blue">Highlights.</span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                        className="hidden md:block h-px flex-1 bg-slate-200/60 ml-12 origin-left"
                    ></motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
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
                            className="bg-white group relative px-4 py-4 md:p-4 border border-slate-100 rounded-sm transition-colors duration-500 hover:border-biro-blue/40 hover:bg-white shadow-sm hover:shadow-2xl hover:shadow-biro-blue/5"
                        >
                            {/* Animated accent corner */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none"
                            >
                                <div className="absolute top-0 right-0 w-full h-full bg-biro-blue/5 rotate-45 translate-x-6 -translate-y-6"></div>
                            </motion.div>

                            <div className="flex flex-col h-full justify-between gap-2 md:gap-4">
                                {/* Icon Container with bounce */}
                                <motion.div
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-slate-50 group-hover:bg-biro-blue group-hover:text-white rounded-sm transition-all duration-500"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-6 h-6 md:w-8 md:h-8"
                                    >
                                        {item.icon}
                                    </svg>
                                </motion.div>

                                <div className="space-y-2">
                                    <p className="text-lg md:text-2xl font-black text-biro-blue-dark leading-none group-hover:text-biro-blue transition-colors duration-300">
                                        {'value' in item ? (
                                            <CountUp value={item.value!} suffix={item.suffix} />
                                        ) : (
                                            item.title
                                        )}
                                        {'value' in item && <span className="block text-xs font-bold text-slate-400 mt-2">{item.title}</span>}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom scan line */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-biro-blue/20 to-transparent"
                            ></motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}




