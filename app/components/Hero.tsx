'use client';

import Image from "next/image";
import Link from "next/link";

export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="relative text-white min-h-[750px] lg:min-h-screen pt-20 lg:pt-0 z-20 overflow-hidden">
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

            <div className="container mx-auto px-4 md:px-6 relative z-10 lg:pt-16 pb-20 md:pb-28">
                <div className="flex flex-col items-center w-full gap-10 xl:gap-16">
                    <div className="w-full max-w-4xl flex flex-col items-center text-center pt-8 md:pt-16 lg:pt-20">
                        

                        <h1 className="text-[3.5rem] xs:text-[4.2rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[8rem] font-black font-righteous tracking-tight leading-[0.88] text-white mb-6">
                            <span className="block whitespace-nowrap" data-aos="fade-right">
                                BENIN <span className="text-[#dbeafe]">TECH</span>
                            </span>
                            <span className="block whitespace-nowrap" data-aos="fade-left" data-aos-delay="300">
                                FEST <span className="text-[#fecaca]">2.0</span>
                            </span>
                        </h1>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-8 bg-white/40 hidden sm:block"></div>
                            <span className="text-[#f3f7ff] text-xs font-black tracking-[0.5em] uppercase">Where Builders Converge</span>
                            <div className="h-px w-8 bg-white/40 hidden sm:block"></div>
                        </div>

                        <p className="max-w-lg text-base md:text-lg text-blue-100/80 mb-6 leading-relaxed font-medium" data-aos="fade-up" data-aos-delay="400">
                            Join <span className="text-white font-bold">3,000+</span> developers, founders, creatives, and tech enablers shaping the future of tech in Benin City.
                        </p>
                        <div className="flex flex-row items-center justify-center gap-2 md:gap-3 mb-8" data-aos="fade-up" data-aos-delay="500">
                            <div className="flex items-center px-3 md:px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-[10px] md:text-sm font-bold text-white/80 whitespace-nowrap">
                                <span>📍</span> Benin City, Edo State
                            </div>
                            <div className="flex items-center px-3 md:px-4 py-2 bg-white/10 border border-white/15 rounded-xl text-[10px] md:text-sm font-bold text-white/80 whitespace-nowrap">
                                <span>📅</span> Oct 2, 2026
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4" data-aos="fade-up" data-aos-delay="600">
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
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full overflow-hidden bg-white text-biro-blue-dark py-3 z-30 border-y border-biro-blue/10">
                <div className="flex whitespace-nowrap animate-[scroll_25s_linear_infinite]">
                    {[1, 2, 3, 4].map((v) => (
                        <div key={v} className="flex items-center space-x-10 px-8 font-black font-righteous tracking-wider uppercase text-sm">
                            <span>🚀 3000+ Attendees</span>
                            <span className="opacity-40">•</span>
                            <span>🤖 100+ Communities</span>
                            <span className="opacity-40">•</span>
                            <span>💼 Tech Exhibition</span>
                            <span className="opacity-40">•</span>
                            <span>🤝 Networking</span>
                            <span className="opacity-40">•</span>
                            <span>💡 Startup Pitch</span>
                            <span className="opacity-40">•</span>
                            <span>💰 Tech Money Sessions</span>
                            <span className="opacity-40">•</span>
                            <span>✅ Creative Economy</span>
                            <span className="opacity-40">•</span>
                            <span>📅 Oct 2, 2026</span>
                            <span className="opacity-40">•</span>
                        </div>
                    ))}
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
