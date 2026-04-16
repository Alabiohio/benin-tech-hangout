'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const GuessSpeakers = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const placeholders = [1, 2, 3, 4];

    return (
        <section className="py-24 bg-[#020617] relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-lg text-blue-400">
                        BTH 2.0 Lineup
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black font-righteous text-white mb-6 italic">
                        Guess the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Speakers</span>
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        The stage is being set for Benin's brightest minds. Can you guess who will be sharing their vision at BTH 2.0?
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {placeholders.map((_, idx) => (
                        <div 
                            key={idx} 
                            data-aos="zoom-in" 
                            data-aos-delay={idx * 150}
                            className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                        >
                            {/* Question Mark Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-9xl font-black font-righteous text-white/5 group-hover:text-blue-500/20 transition-all duration-700 select-none">
                                    ?
                                </span>
                            </div>

                            {/* Decorative Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent">
                                <div className="h-2 w-12 bg-blue-500/30 rounded-full mb-4 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500"></div>
                                <h3 className="text-2xl font-black font-righteous text-white/20 group-hover:text-white/40 transition-all duration-500 uppercase tracking-tighter">
                                    Unknown Icon
                                </h3>
                                <p className="text-white/10 text-xs font-bold uppercase tracking-widest group-hover:text-blue-400/40 transition-all duration-500">
                                    Revealing Soon
                                </p>
                            </div>

                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-8" data-aos="fade-up">
                    <div className="text-center">
                        <h3 className="text-2xl font-black font-righteous text-white mb-2">Have someone in mind?</h3>
                        <p className="text-white/40 font-medium">Suggest a visionary leader or apply to take the stage yourself.</p>
                    </div>
                    
                    <Link 
                        href="/speaker-registration"
                        className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-biro-blue-dark font-black font-righteous text-xl rounded-2xl transition-all hover:scale-105 hover:bg-blue-500 hover:text-white shadow-xl shadow-white/5"
                    >
                        Apply to Speak / Suggest a Speaker
                        <svg 
                            className="w-6 h-6 transform transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GuessSpeakers;
