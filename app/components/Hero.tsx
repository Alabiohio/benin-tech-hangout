'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="relative text-white min-h-[750px] lg:min-h-screen pt-50 lg:pt-30 z-20 overflow-hidden">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                <div className="absolute inset-0 z-0 user-select-none pointer-events-none">
                    <Image
                        src="/images/hero.jpg"
                        alt="Benin Tech Hangout Hero"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/70"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 lg:pt-16 pb-10 md:pb-28">
                <div className="flex flex-col items-center w-full gap-10 xl:gap-16">
                    <div className="w-full max-w-4xl flex flex-col items-center text-center pt-8 md:pt-16 lg:pt-20">
                        

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
                                FEST <span className="text-[#fecaca]">2.0</span>
                            </motion.span>
                        </h1>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-8 bg-white/40 hidden sm:block"></div>
                            <span className="text-[#f3f7ff] text-xs font-black tracking-[0.5em] uppercase">Where Builders Converge</span>
                            <div className="h-px w-8 bg-white/40 hidden sm:block"></div>
                        </div>
                        <motion.div 
                            className="flex flex-row items-center justify-center gap-4 md:gap-8 mb-10 text-white/80 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-highlight-yellow">📍</span> Benin City, Edo State
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="text-highlight-yellow">📅</span> Oct 2, 2026
                            </span>
                        </motion.div>

                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <button
                                onClick={onRegisterClick}
                                className="w-full sm:w-auto relative px-10 py-3 bg-highlight-yellow text-white text-base font-black rounded-xl overflow-hidden group transition-all hover:-translate-y-1 hover:text-highlight-yellow hover:bg-white active:translate-y-0"
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
                                className="w-full sm:w-auto relative px-10 py-3 bg-white text-highlight-yellow border border-white/30 text-base font-black rounded-xl group transition-all hover:text-white hover:bg-highlight-yellow hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center"
                            >
                                <span className="flex items-center gap-3 uppercase tracking-widest">
                                    Become a Sponsor
                                    <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}
