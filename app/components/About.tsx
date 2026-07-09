"use client";

import { motion, Variants } from "framer-motion";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";


const slideRight: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};



export default function About() {
    const stats = [
        { value: "3000+", label: "ATTENDEES", aosAnime: "fade-down-right" },
        { value: "30+", label: "COMMUNITIES", aosAnime: "fade-down-left" },
        { value: "20+", label: "SPEAKERS", aosAnime: "fade-up-right" },
        { value: "3 Day", label: "CONVERGENCE", aosAnime: "fade-up-left" }
    ];



    return (
        <section id="about" className="py-32 relative bg-black overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
                    {/* Header */}
                    <div                     
                        className="max-w-xl text-left mx-auto lg:mx-0 overflow-hidden"
                    >
                        <h2 className="text-4xl md:text-7xl font-black font-cabinet-grotesk text-white mb-6 uppercase" data-aos="zoom-out" data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                            Connecting <span className="text-blue-600">Edo</span> to the <span className="text-blue-600">Future of Tech</span>
                        </h2>
                        <p className="text-lg text-white leading-relaxed">
                            <span className="font-bold text-biro-blue">Benin Tech Fest 2.0 </span> is a community-driven technology and innovation convergence designed to strengthen Edo State&apos;s growing tech ecosystem through talent development, startup mentorship, ecosystem collaboration and access to opportunities.
                        </p>
                    </div>

                    {/* Dynamic Overlapping Statistics Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative h-auto w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto"
                    >
                        {/* Top Row - 2 Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 mb-4 md:mb-0 md:relative md:h-60">
                            {stats.slice(0, 2).map((stat, index) => (
                                <div
                                    key={index}
                                    className={`relative group md:absolute w-full md:w-1/2 transition-transform duration-300 ${index === 0
                                            ? "md:top-auto md:bottom-0 md:left-0 md:translate-x-8 md:translate-y-6 lg:translate-x-8 lg:translate-y-6"
                                            : "md:bottom-0 md:right-0 md:translate-x-6 md:translate-y-3 lg:translate-x-6 lg:translate-y-3"
                                        }`}
                                data-aos={`${stat.aosAnime}`} data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                                    {/* Stacked layers */}
                                    <div className="absolute -bottom-4 -left-2 w-full h-full bg-slate-200 rounded-lg transform -rotate-2 opacity-40" />
                                    <div className="absolute -bottom-2 -right-2 w-full h-full bg-slate-300 rounded-lg transform rotate-1 opacity-30" />

                                    {/* Main card */}
                                    <div
                                        className="relative bg-white border border-slate-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
                                    >
                                        <p className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-biro-blue-dark mb-2 tabular-nums">
                                            {stat.value}
                                        </p>
                                        <p className="text-slate-600 font-bold font-oswald uppercase tracking-widest text-xs md:text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Row - 2 Cards (Overlapping) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 md:relative md:h-60 md:mt-0">
                            {stats.slice(2, 4).map((stat, index) => (
                                <div
                                    key={index + 2}
                                    className={`relative group md:absolute w-full md:w-1/2 transition-transform duration-300 ${index === 0
                                            ? "md:top-0 md:bottom-auto md:left-0 md:translate-x-10 md:-translate-y-1 lg:translate-x-10 lg:-translate-y-1"
                                            : "md:top-0 md:right-0 md:translate-x-8 md:-translate-y-4 lg:translate-x-8 lg:-translate-y-4"
                                        }`}
                                data-aos={`${stat.aosAnime}`} data-aos-duration="1000" data-aos-easing="ease-out-cubic" data-aos-once="true">
                                    {/* Stacked layers */}
                                    <div className="absolute -bottom-4 -left-2 w-full h-full bg-slate-200 rounded-lg transform -rotate-2 opacity-40" />
                                    <div className="absolute -bottom-2 -right-2 w-full h-full bg-slate-300 rounded-lg transform rotate-1 opacity-30" />

                                    {/* Main card */}
                                    <div
                                        className="relative bg-white border border-slate-300 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full"
                                    >
                                        <p className="text-4xl md:text-5xl font-black font-cabinet-grotesk text-biro-blue-dark mb-2 tabular-nums">
                                            {stat.value}
                                        </p>
                                        <p className="text-slate-600 font-bold font-oswald uppercase tracking-widest text-xs md:text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quote Section */}
                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative group"
                >
                    {/* Stacked layers */}
                    <div className="absolute -bottom-6 -left-4 w-full h-full bg-biro-blue-dark/60 rounded-lg transform -rotate-2 opacity-30" data-aos="zoom-in-right" />
                    <div className="absolute -bottom-3 -right-3 w-full h-full bg-biro-blue-dark/40 rounded-lg transform rotate-1 opacity-20" data-aos="zoom-in-right" />

                    {/* Main quote card */}

                    <div
                        className="relative bg-gradient-to-r from-biro-blue-dark to-blue-900 rounded-lg p-6 md:p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-blue-800/50"
                        data-aos="zoom-out"
                    >

                        <div className="flex flex-col gap-3 px-2 py-4">
                            {/* Date Bubble */}
                            <div className="group flex items-center gap-4 p-2 pr-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:-translate-x-1 backdrop-blur-md w-fit cursor-default">
                                <div className="flex items-center justify-center shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/40 to-blue-600/10 text-blue-300 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/20">
                                    <FiCalendar className="w-7 h-7" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest leading-none mb-1">Date</span>
                                    <span className="text-xl font-extrabold text-white tracking-wide leading-none">Nov 5th–7th, 2026</span>
                                </div>
                            </div>

                            {/* Location Bubble */}
                            <div className="group flex items-center gap-4 p-2 pr-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:-translate-x-1 backdrop-blur-md w-fit ml-6 cursor-default">
                                <div className="flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-600/10 text-blue-300 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/10">
                                    <FiMapPin className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest leading-none mb-1">Location</span>
                                    <span className="text-base font-semibold text-slate-100 tracking-wide leading-none">Benin City, Edo State</span>
                                </div>
                            </div>

                            {/* Time Bubble */}
                            <div className="group flex items-center gap-4 p-2 pr-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:-translate-x-1 backdrop-blur-md w-fit ml-12 cursor-default">
                                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 text-blue-300 group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-white/10">
                                    <FiClock className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold text-blue-300/80 uppercase tracking-widest leading-none mb-1">Time</span>
                                    <span className="text-sm font-medium text-slate-300 tracking-wide leading-none">9:00 PM Daily</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </section>
    );
}

