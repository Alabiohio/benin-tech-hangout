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
        { value: "100+", label: "COMMUNITIES", aosAnime: "fade-down-left" },
        { value: "20+", label: "SPEAKERS", aosAnime: "fade-up-right" },
        { value: "3 Day", label: "CONVERGENCE", aosAnime: "fade-up-left" }
    ];



    return (
        <section id="about" className="py-32 relative bg-black overflow-hidden">
            <div className="container mx-auto px-2 relative z-10">
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

                <motion.div
                    variants={slideRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative group w-full mx-auto lg:ml-auto"
                >
                    <div className="flex items-stretch gap-1 overflow-hidden">
                        {/* Main content div - right edge cut */}
                        <div
                            className="relative bg-white flex-1 rounded-[32px_0_0_32px]"
                            style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 42px) 100%, 0 100%)' }}
                        >
                            <div className="flex flex-col gap-2 py-3 px-2 md:py-3 md:px-5" data-aos="fade-left">
                                {/* Date Item */}
                                <div className="flex items-center gap-5">
                                    <div className="hidden md:flex items-center justify-center shrink-0 w-12 h-12 bg-black text-white transform rounded-2xl -skew-x-12 shadow-md">
                                        <FiCalendar className="w-5 h-5 transform skew-x-12" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl md:text-2xl font-black text-black uppercase tracking-wide font-cabinet-grotesk">Nov <span className="md:text-3xl"> 5th–7th</span>, 2026</span>
                                    </div>
                                </div>

                                {/* Location Item */}
                                <div className="flex items-center gap-5">
                                    <div className="hidden md:flex items-center justify-center  rounded-2xl shrink-0 w-12 h-12 bg-blue-600 text-white transform -skew-x-12 shadow-md">
                                        <FiMapPin className="w-5 h-5 transform skew-x-12" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg md:text-xl font-black text-black uppercase tracking-wide font-cabinet-grotesk"> <span className="md:text-3xl">Benin City,</span> Edo State</span>
                                    </div>
                                </div>

                                {/* Time Item */}
                                <div className="flex items-center gap-5">
                                    <div className="hidden md:flex items-center justify-center rounded-2xl shrink-0 w-12 h-12 bg-black text-white transform -skew-x-12 shadow-md">
                                        <FiClock className="w-5 h-5 transform skew-x-12" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg md:text-xl font-black text-black uppercase tracking-wide font-cabinet-grotesk"><span className="md:text-3xl">9:00 AM</span> Daily</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* First slash */}
                        <div
                            className="w-20 bg-brand-gold -ml-[32px]"
                            style={{ clipPath: 'polygon(42px 0, 100% 0, calc(100% - 42px) 100%, 0 100%)' }}
                            data-aos="fade-left"
                        ></div>

                        {/* Second slash */}
                        <div
                            className="w-20 bg-red-600 -ml-[32px]"
                            style={{ clipPath: 'polygon(42px 0, 100% 0, calc(100% - 42px) 100%, 0 100%)' }}
                            data-aos="fade-left"
                            data-aos-delay="100"
                        ></div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

