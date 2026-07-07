'use client';

import { motion, Variants } from "framer-motion";

const highlightItems = [
    { label: "2000+ Attendees", title: "2000+ Attendees" },
    { label: "100+ Communities", title: "100+ Communities" },
    { label: "Tech Exhibition", title: "Tech Exhibition" },
    { label: "Networking", title: "Networking" },
    { label: "Startup Pitch", title: "Startup Pitch" },
    { label: "Tech Money Sessions", title: "Tech Money Sessions" },
    { label: "Creative Economy", title: "Creative Economy" },
    { label: "Policy & Regulations", title: "Policy & Regulations" },
    { label: "Job Fair", title: "Job Fair" },
    { label: "Women in Tech", title: "Women in Tech" },
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

const marqueeGroups = [0, 1];

export default function Highlights() {
    return (
        <section id="highlights" className="relative z-30 -mt-5 md:-mt-28 mx-auto">
            <div className="w-full bg-[#0A0A0A] border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/40">

                <div className="relative overflow-hidden rounded-2xl">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />

                    <div className="flex w-max flex-nowrap gap-3 md:gap-6 animate-highlights-marquee">
                        {marqueeGroups.map((group) => (
                            <div key={group} className="flex flex-nowrap gap-3 md:gap-6 pr-3 md:pr-6">
                                {highlightItems.map((item, idx) => (
                                    <motion.div
                                        key={`${group}-${idx}`}
                                        variants={itemVariants}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -10,
                                            transition: { type: "spring", stiffness: 400, damping: 10 }
                                        }}
                                        className="relative min-w-[180px] md:min-w-[220px] group px-3 py-4 md:p-6 transition-all duration-500 hover:border-highlight-yellow/40 hover:bg-white/10 shadow-xl"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1 }}
                                            className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none"
                                        >
                                            <div className="absolute top-0 right-0 w-full h-full bg-highlight-yellow/10 rotate-45 translate-x-6 -translate-y-6"></div>
                                        </motion.div>

                                        <div className="flex flex-col h-full justify-center gap-2">
                                            <div className="space-y-1">
                                                <div className="text-sm md:text-xl font-semibold text-white leading-none group-hover:text-highlight-yellow transition-colors duration-300">
                                                    <span className="text-xl md:text-xl uppercase tracking-tight font-cabinet-grotesk font-black leading-tight block">{item.title}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {idx < highlightItems.length - 1 && (
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-3 bg-blue-500"></div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .animate-highlights-marquee {
                    animation: highlights-marquee 20s linear infinite;
                    will-change: transform;
                }

                .animate-highlights-marquee:hover {
                    animation-play-state: paused;
                }

                @keyframes highlights-marquee {
                    0% {
                        transform: translateX(0);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
}
