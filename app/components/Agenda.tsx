'use client';

import { useState } from 'react';

export default function Agenda() {
    const schedule = [
        {
            time: "10:00 AM",
            title: "Opening Ceremony",
            speaker: "Event Host",
            type: "Main Stage"
        },
        {
            time: "11:00 AM",
            title: "Keynote: The Future of Benin Tech",
            speaker: "Industry Leader",
            type: "Keynote"
        },
        {
            time: "12:30 PM",
            title: "Panel Session: Building for Scaling",
            speaker: "Selected Founders",
            type: "Panel"
        },
        {
            time: "02:00 PM",
            title: "Networking & Exhibition Tour",
            speaker: "Everyone",
            type: "Networking"
        },
        {
            time: "03:30 PM",
            title: "Startup Pitch Deck Battle",
            speaker: "Finalists",
            type: "Competition"
        }
    ];

    return (
        <section className="py-24 bg-[#0B0A11] relative z-10" id="agenda">
             {/* Subtle background text */}
             <div className="absolute top-0 right-0 text-[15rem] font-black font-righteous text-white/[0.02] select-none pointer-events-none translate-x-1/2 -translate-y-1/4">
                AGENDA
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-20" data-aos="fade-up">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400">
                        Event Schedule
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-righteous text-white tracking-tight">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Program</span> Flow
                    </h2>
                </div>

                <div className="space-y-6">
                    {schedule.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group relative flex flex-col md:flex-row items-center gap-6 md:gap-12 p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all duration-500"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            {/* Time */}
                            <div className="flex-shrink-0 min-w-[120px] text-center md:text-left">
                                <span className="text-2xl font-black font-righteous text-blue-400 tabular-nums">
                                    {item.time}
                                </span>
                            </div>

                            {/* Divider Line on Desktop */}
                            <div className="hidden md:block w-px h-12 bg-white/10 group-hover:bg-blue-500/30 transition-colors"></div>

                            {/* Content */}
                            <div className="flex-grow text-center md:text-left">
                                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
                                    <h3 className="text-xl md:text-2xl font-black font-righteous text-white group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    <span className="inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 rounded-full text-white/50 group-hover:border-blue-500/20 group-hover:text-blue-400/70 transition-all">
                                        {item.type}
                                    </span>
                                </div>
                                <p className="text-white/40 font-bold uppercase tracking-wider text-xs">
                                    WITH <span className="text-white/60">{item.speaker}</span>
                                </p>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                                <div className="w-12 h-12 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-400">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center" data-aos="fade-up">
                    <p className="text-white/40 font-medium mb-8">Schedule is subject to minor adjustments for the best experience.</p>
                    <button className="relative px-12 py-4 bg-highlight-yellow text-biro-blue-dark font-black font-righteous rounded-2xl shadow-[0_20px_50px_rgba(251,191,36,0.2)] hover:scale-105 active:scale-95 transition-all">
                        DOWNLOAD FULL SCHEDULE
                    </button>
                </div>
            </div>
        </section>
    );
}
