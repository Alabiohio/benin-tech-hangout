'use client';

import { motion } from 'framer-motion';
import Button from './Button';

export default function StartupPitch() {
    return (
        <section id="pitch" className="py-24 md:py-40 bg-slate-950 relative z-0 overflow-hidden isolate">
            {/* Fine dot grid pattern */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Architectural accent lines */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Vertical accent line */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.03]" />
                {/* Horizontal accent line */}
                <div className="absolute top-1/3 left-0 w-full h-px bg-white/[0.03]" />
                
                {/* Large corner frame */}
                <div className="absolute top-20 right-20 w-64 h-64 border-t border-r border-white/[0.05]" />
                <div className="absolute bottom-20 left-10 w-40 h-40 border-b border-l border-white/[0.05]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-24">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.85] tracking-tighter uppercase italic">
                                The Stage <br /> 
                                <span className="text-highlight-yellow not-italic">is Yours.</span>
                            </h2>
                        </motion.div>

                        <motion.p 
                            className="text-lg md:text-xl text-white/50 mb-10 max-w-xl leading-relaxed font-medium border-l-2 border-highlight-yellow/30 pl-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Are you building the future of the Benin tech ecosystem? Showcase your innovation, gain unparalleled visibility, and connect with strategic investors.
                        </motion.p>
                    </div>

                    <motion.div 
                        className="w-full lg:w-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Button href="/exhibitor" className="group relative w-full lg:w-auto border-white px-4 py-4 bg-white text-slate-950 font-black text-lg uppercase tracking-widest overflow-hidden transition-all hover:bg-highlight-yellow hover:text-white active:scale-95 shadow-2xl">
                            <span className="relative z-10 flex text-2xl text-black hover:text-white items-center justify-center gap-3">
                                Apply to Pitch
                                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </span>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
