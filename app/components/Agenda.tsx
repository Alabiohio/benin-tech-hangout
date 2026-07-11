'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Agenda() {
    const days = [
        { id: "day1", label: "Day 1", date: "Oct 2nd", title: "Ecosystem Kickoff" },
        { id: "day2", label: "Day 2", date: "Oct 3rd", title: "Startup & Innovation" },
        { id: "day3", label: "Day 3", date: "Oct 4th", title: "Tech Money Arena" },
        { id: "day4", label: "Day 4", date: "Oct 5th", title: "Summit & Finale" }
    ];

    const [activeDay, setActiveDay] = useState("day1");

    const schedule: Record<string, Array<{ time: string, title: string, speaker: string, type: string }>> = {
        day1: [
            {
                time: "09:00 AM",
                title: "Delegate Check-in & Registration",
                speaker: "Operations Team",
                type: "Entry"
            },
            {
                time: "10:00 AM",
                title: "Opening Ceremony: Builders Convene",
                speaker: "Ecosystem Hosts",
                type: "Main Stage"
            },
            {
                time: "11:30 AM",
                title: "Technical Deep Dives: Devs & Designers Workshops",
                speaker: "Lead Instructors",
                type: "Workshops"
            },
            {
                time: "02:30 PM",
                title: "Community Spotlight: Strengthening Edo Tech Hubs",
                speaker: "Local Guild Leaders",
                type: "Panels"
            }
        ],
        day2: [
            {
                time: "10:00 AM",
                title: "Keynote: Edo State Digital Roadmap",
                speaker: "Government Leaders",
                type: "Policy"
            },
            {
                time: "11:30 AM",
                title: "Panel Session: Scaling From Benin to the World",
                speaker: "Ecosystem Founders",
                type: "Panels"
            },
            {
                time: "02:00 PM",
                title: "Web3, AI, and Future Technologies Showcase",
                speaker: "Emerging Builders",
                type: "Tech Stage"
            },
            {
                time: "03:30 PM",
                title: "Exhibition Tour & Product Demos",
                speaker: "Startup Exhibitors",
                type: "Exhibition"
            }
        ],
        day3: [
            {
                time: "10:00 AM",
                title: "Startup Pitch Battle - Semifinals",
                speaker: "Top 10 Finalists",
                type: "Pitch Arena"
            },
            {
                time: "12:30 PM",
                title: "Tech Money Keynote: Venture Capital Trends",
                speaker: "Global Investors",
                type: "Keynote"
            },
            {
                time: "02:30 PM",
                title: "Founders & Investors Speed Matchmaking",
                speaker: "Startups & VCs",
                type: "Networking"
            }
        ],
        day4: [
            {
                time: "10:00 AM",
                title: "Creative Economy & Modern Craftsmanship Summit",
                speaker: "Special Guest Panel",
                type: "Summit"
            },
            {
                time: "12:00 PM",
                title: "Startup Pitch Deck Battle - Grand Finale",
                speaker: "Top 3 Finalists",
                type: "Pitch Arena"
            },
            {
                time: "02:30 PM",
                title: "Awards & Closing Ceremony",
                speaker: "Ecosystem Committee",
                type: "Main Stage"
            },
            {
                time: "04:30 PM",
                title: "Edo Startup Week Afterparty",
                speaker: "DJ & Builders Network",
                type: "Afterparty"
            }
        ]
    };

    return (
        <section className="py-24 bg-[#0B0A11] relative z-10 overflow-hidden" id="agenda">
             {/* Subtle background text */}
             <div className="absolute top-0 right-0 text-[15rem] font-black font-cabinet-grotesk text-white/[0.02] select-none pointer-events-none translate-x-1/2 -translate-y-1/4">
                AGENDA
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400">
                        Ecosystem Convergence
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-cabinet-grotesk text-white tracking-tight uppercase">
                        The <span className="text-highlight-yellow">4-Day</span> Program
                    </h2>
                </motion.div>

                {/* Day Navigation Tabs */}
                <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 mb-12 border-b border-white/5 pb-6">
                    {days.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => setActiveDay(day.id)}
                            className={`flex flex-col items-center md:items-start flex-1 min-w-[120px] p-4 rounded-2xl border transition-all duration-300 ${
                                activeDay === day.id
                                    ? 'bg-highlight-yellow/10 border-highlight-yellow text-white shadow-[0_0_15px_rgba(0,124,249,0.15)]'
                                    : 'bg-white/[0.01] border-white/5 text-white/50 hover:bg-white/[0.03] hover:border-white/10'
                            }`}
                        >
                            <span className="text-xs font-black font-oswald uppercase tracking-widest text-highlight-yellow">{day.label}</span>
                            <span className="text-lg font-black font-cabinet-grotesk leading-tight my-0.5">{day.date}</span>
                            <span className="text-[10px] font-bold opacity-60 uppercase truncate w-full">{day.title}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[350px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDay}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            {schedule[activeDay].map((item, idx) => (
                                <div 
                                    key={idx} 
                                    className="group relative flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 hover:border-highlight-yellow/30"
                                >
                                    {/* Time */}
                                    <div className="flex-shrink-0 min-w-[120px] text-center md:text-left">
                                        <span className="text-xl md:text-2xl font-black font-cabinet-grotesk text-highlight-yellow tabular-nums">
                                            {item.time}
                                        </span>
                                    </div>

                                    {/* Divider Line on Desktop */}
                                    <div className="hidden md:block w-px h-10 bg-white/10 group-hover:bg-highlight-yellow/30 transition-colors"></div>

                                    {/* Content */}
                                    <div className="flex-grow text-center md:text-left">
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                                            <h3 className="text-lg md:text-xl font-black font-cabinet-grotesk text-white group-hover:text-highlight-yellow transition-colors">
                                                {item.title}
                                            </h3>
                                            <span className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-full text-white/50 group-hover:border-highlight-yellow/20 group-hover:text-highlight-yellow transition-all">
                                                {item.type}
                                            </span>
                                        </div>
                                        <p className="text-white/40 font-bold uppercase tracking-wider text-[10px]">
                                            WITH <span className="text-white/60">{item.speaker}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div 
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-white/40 font-medium mb-8">Schedule is subject to minor adjustments for the best experience.</p>
                </motion.div>
            </div>
        </section>
    );
}
