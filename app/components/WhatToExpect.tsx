'use client';

import { motion, Variants } from 'framer-motion';
import { FaUsers, FaLaptopCode, FaBriefcase, FaHandshake, FaBook, FaTrophy } from 'react-icons/fa';
import Button from './Button';

const fade: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i = 0) => ({ 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { 
            delay: i * 0.1, 
            type: 'spring', 
            stiffness: 80, 
            damping: 15, 
            mass: 1.2 
        } 
    })
};

export default function WhatToExpect({ isModalOpen, setIsModalOpen }: { isModalOpen?: boolean; setIsModalOpen: (open: boolean) => void }) {
    const tiles = [
        { title: 'Interactive Sessions', desc: 'Panel discussions and focused workshops led by industry experts.', bg1: 'bg-blue-200', bg2: 'bg-blue-300', icon: FaUsers },
        { title: 'Live Demo & Exhibition', desc: 'Curated showcases and product demos from leading builders.', bg1: 'bg-orange-200', bg2: 'bg-orange-300', icon: FaLaptopCode },
        { title: 'Job Fair & Recruitment', desc: 'Connect with hiring teams and discover career opportunities.', bg1: 'bg-amber-200', bg2: 'bg-amber-300', icon: FaBriefcase },
        { title: 'Investor Matchmaking', desc: 'One-on-one meetings and curated pitch rounds.', bg1: 'bg-emerald-200', bg2: 'bg-emerald-300', icon: FaHandshake },
        { title: 'Mentorship & Workshops', desc: 'Practical sessions and mentor office hours to upskill.', bg1: 'bg-violet-200', bg2: 'bg-violet-300', icon: FaBook },
        { title: 'Awards & Recognition', desc: 'Celebrating outstanding contributions to the ecosystem.', bg1: 'bg-rose-200', bg2: 'bg-rose-300', icon: FaTrophy }
    ];

    return (
        <section id="what-to-expect" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-10">
                    <h2 className="text-5xl md:text-6xl font-black text-biro-blue-dark font-cabinet-grotesk mb-4">What To Expect <span className="text-biro-blue underline">At BTF 2.0</span></h2>
                     </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-6 md:gap-0 lg:auto-rows-fr">
                    {tiles.map((t, i) => {
                        const rotA = i % 2 === 0 ? '-rotate-2' : '-rotate-1';
                        const rotB = i % 2 === 0 ? 'rotate-2' : 'rotate-1';
                        
                        // Mobile: Negative margin for overlapping, alternating tilt
                        const mobileOverlap = i > 0 ? '-mt-1 sm:mt-0' : '';
                        // Tilt down at right (positive rotation) for even, tilt down at left (negative) for odd
                        const mobileTilt = i % 2 === 0 ? 'rotate-1 sm:rotate-0' : '-rotate-1 sm:rotate-0';
                        
                        // Desktop: Subtle stagger
                        let desktopStagger = '';
                        if (i % 3 === 1) desktopStagger = 'lg:translate-y-3';
                        if (i % 3 === 2) desktopStagger = 'lg:translate-y-6';

                        return (
                            <motion.div 
                                key={t.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fade}
                                className="h-full"
                                style={{ zIndex: i + 10 }}
                            >
                                <div className={`relative h-full transition-transform duration-500 ${mobileOverlap} ${mobileTilt} ${desktopStagger}`}>
                                    {/* stacked background layers */}
                                    <div className={`absolute -inset-1 rounded-xl transform ${rotA} ${t.bg1} opacity-95`} />
                                    <div className={`absolute -inset-0.5 rounded-xl transform ${rotB} ${t.bg2} opacity-85`} />

                                    <div className="relative h-full bg-white border border-slate-100 rounded-xl p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col justify-center group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                    <t.icon className="w-5 h-5 text-slate-700" />
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-black font-cabinet-grotesk text-slate-900 leading-tight group-hover:text-biro-blue transition-colors duration-300">{t.title}</h3>
                                                <p className="mt-2 text-sm md:text-base text-slate-600">{t.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
