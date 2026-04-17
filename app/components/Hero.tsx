'use client';

import Image from "next/image";
import Link from "next/link";

export default function Hero({ onRegisterClick }: { onRegisterClick: () => void }) {
    return (
        <section className="relative bg-[#020617] text-white min-h-[750px] lg:min-h-screen pt-20 lg:pt-0 z-20 overflow-hidden">

            {/* ─── BACKGROUND LAYER ─── */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Main gradient blooms */}
                <div className="absolute top-[-15%] left-[-10%] w-[70%] h-[70%] bg-biro-blue/25 rounded-full blur-[80px] opacity-50 animate-pulse" style={{ animationDuration: '6s' }}></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-indigo-700/20 rounded-full blur-[80px] opacity-30 animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
                <div className="absolute top-[30%] left-[30%] w-[25%] h-[25%] bg-highlight-yellow/10 rounded-full blur-[60px] opacity-20 animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>

                {/* Fine grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.04] mix-blend-overlay"></div>

                {/* Animated floating dots */}
                {[
                    { top: '10%', left: '5%', size: 4, delay: '0s', dur: '4s' },
                    { top: '25%', left: '15%', size: 3, delay: '1s', dur: '5s' },
                    { top: '60%', left: '8%', size: 5, delay: '0.5s', dur: '6s' },
                    { top: '80%', left: '20%', size: 3, delay: '2s', dur: '4.5s' },
                    { top: '15%', left: '45%', size: 2, delay: '1.5s', dur: '7s' },
                    { top: '45%', left: '40%', size: 4, delay: '0.8s', dur: '5.5s' },
                ].map((dot, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-blue-400/30 animate-ping"
                        style={{
                            top: dot.top,
                            left: dot.left,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            animationDelay: dot.delay,
                            animationDuration: dot.dur,
                        }}
                    ></div>
                ))}

                {/* Decorative ring circles */}
                <div className="absolute top-1/4 left-[-80px] w-[300px] h-[300px] border border-white/[0.04] rounded-full"></div>
                <div className="absolute top-1/4 left-[-140px] w-[450px] h-[450px] border border-white/[0.03] rounded-full"></div>
                <div className="absolute top-1/4 left-[-200px] w-[600px] h-[600px] border border-white/[0.02] rounded-full"></div>

                {/* Mobile Background Image */}
                <div className="absolute inset-0 z-0 lg:hidden user-select-none pointer-events-none">
                    <Image
                        src="/BTH-35.png"
                        alt="Benin Tech Hangout Hero"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(2,6,23,0.85)_0%,_transparent_100%)]"></div>
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020617] to-transparent"></div>
                </div>
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 lg:pt-16 pb-20 md:pb-28">
                <div className="flex flex-col lg:flex-row items-center lg:items-start w-full gap-10 xl:gap-16">

                    {/* ── LEFT: Text column ── */}
                    <div className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left pt-8 md:pt-16 lg:pt-0">

                        {/* Live badge + social proof row */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6">
                        </div>

                        {/* Theme label */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="h-px w-8 bg-highlight-yellow/60"></div>
                            <span className="text-highlight-yellow text-xs font-black tracking-[0.5em] uppercase">Where Builders Converge</span>
                            <div className="h-px w-8 bg-highlight-yellow/60"></div>
                        </div>

                        {/* Main title */}
                        <h1 className="text-[3.5rem] xs:text-[4.2rem] md:text-[6rem] lg:text-[6.5rem] xl:text-[8rem] font-black font-righteous tracking-tight leading-[0.88] text-white mb-6">
                            <span className="block whitespace-nowrap" data-aos="fade-right">
                                BENIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-400">TECH</span>
                            </span>
                            <span className="block whitespace-nowrap" data-aos="fade-left" data-aos-delay="300">
                                HANGOUT <span
                                    className="text-transparent"
                                    style={{ WebkitTextStroke: '3px rgba(251,191,36,1)' }}
                                >2.0</span>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-lg text-base md:text-lg text-blue-100/60 mb-6 leading-relaxed font-medium" data-aos="fade-up" data-aos-delay="400">
                            Join <span className="text-white font-bold">3,000+</span> developers, founders, creatives, and Tech Enablers shaping the future of tech in Benin City.
                        </p>

                        {/* Info pills */}
                        <div className="flex flex-row items-center justify-center lg:justify-start gap-2 md:gap-3 mb-8" data-aos="fade-up" data-aos-delay="500">
                            <div className="flex items-center px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-sm font-bold text-white/70 whitespace-nowrap">
                                <span>📍</span> Benin City, Edo State
                            </div>
                            <div className="flex items-center px-3 md:px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-sm font-bold text-white/70 whitespace-nowrap">
                                <span>📅</span> Oct 2, 2026
                            </div>                         
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4" data-aos="fade-up" data-aos-delay="600">
                            <button
                                onClick={onRegisterClick}
                                className="w-full sm:w-auto relative px-10 py-4 bg-highlight-yellow text-biro-blue-dark text-base font-black rounded-2xl overflow-hidden group shadow-[0_15px_40px_rgba(251,191,36,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(251,191,36,0.45)] active:translate-y-0"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <span className="relative flex items-center justify-center gap-3 uppercase tracking-widest">
                                    Register Now
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </span>
                            </button>

                            <Link
                                href="/sponsor"
                                className="w-full sm:w-auto relative px-10 py-4 bg-white/5 backdrop-blur-xl text-white border border-white/20 text-base font-black rounded-2xl group transition-all hover:bg-white/10 hover:-translate-y-1 active:translate-y-0 text-center flex items-center justify-center"
                            >
                                <span className="flex items-center gap-3 uppercase tracking-widest">
                                    Become a Sponsor
                                    <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* ── RIGHT: Image + floating cards ── */}
                    <div className="hidden lg:block w-[48%] relative h-[820px] pointer-events-none select-none flex-shrink-0">

                        {/* Main image */}
                        <div
                            className="absolute -right-20 -top-10 -bottom-10 w-[120%] overflow-hidden rounded-[3rem] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 85%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                                maskComposite: 'intersect',
                                WebkitMaskComposite: 'destination-in',
                            }}
                        >
                            <Image
                                src="/BTH-38.jpg"
                                alt="Benin Tech Hangout Hero"
                                fill
                                className="object-cover scale-105 hover:scale-100 transition-transform duration-[2000ms]"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/60 via-transparent to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-transparent to-[#020617]/30"></div>
                        </div>

                        {/* FLOATING PILLS FLOATING PILLS FLOATING PILLS

                        Floating Stat: Attendees 
                        <div className="absolute top-40 left-30 z-20 animate-[float_5s_ease-in-out_infinite]">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[160px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-highlight-yellow/20 flex items-center justify-center text-lg">🚀</div>                                                                 </div>
                                <p className="text-2xl font-black font-righteous text-white leading-none">3,000+</p>
                                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Expected Attendees</p>
                            </div>
                        </div>
                         */}

                        {/* Floating Stat: Communities 
                        <div className="absolute top-65 left-8 z-20 animate-[float_7s_ease-in-out_1s_infinite]">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[150px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg">🤖</div>
                                </div>
                                <p className="text-2xl font-black font-righteous text-white leading-none">100+</p>
                                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Communities</p>
                            </div>
                        </div>
                         */}

                        {/* Floating Stat: Free Passes 
                        <div className="absolute bottom-[220px] left-[-10px] z-20 animate-[float_6s_ease-in-out_0.5s_infinite]">
                            <div className="bg-highlight-yellow/10 backdrop-blur-md border border-highlight-yellow/30 rounded-2xl p-4 shadow-2xl">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-2xl">🎟</span>
                                </div>
                                <p className="text-lg font-black font-righteous text-highlight-yellow leading-none">Free Passes</p>
                                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mt-1">Available Now</p>
                            </div>
                        </div>
                         */}

                        {/* Floating Stat: Startup Pitch 
                        <div className="absolute bottom-32 left-16 z-20 animate-[float_5.5s_ease-in-out_2s_infinite]">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[140px]">
                                <div className="text-xl mb-1">💡</div>
                                <p className="text-sm font-black font-righteous text-white">Startup Pitch</p>
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mt-0.5">Apply Now</p>
                            </div>
                        </div>
                         */}

                        {/* Date card floating top-right of image 
                        <div className="absolute top-8 right-[-9] z-20 animate-[float_8s_ease-in-out_3s_infinite]">
                            <div className="bg-biro-blue/80 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-2xl text-center min-w-[130px]">
                                <p className="text-white text-3xl font-black font-righteous leading-none">02  <span className="text-highlight-yellow text-sm font-black uppercase tracking-widest">Oct 2026</span></p>                              
                            </div>
                        </div>
                         */}

                        {/* Decorative glow blob */}
                        <div className="absolute -z-10 top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-biro-blue/20 blur-[100px] rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* ─── MARQUEE TICKER ─── */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden bg-highlight-yellow text-biro-blue-dark py-3 z-30">
                <div className="flex whitespace-nowrap animate-[scroll_25s_linear_infinite]">
                    {[1, 2, 3, 4].map((v) => (
                        <div key={v} className="flex items-center space-x-10 px-8 font-black font-righteous tracking-wider uppercase text-sm">
                            <span>🚀 3000+ Attendees</span>
                            <span className="opacity-40">✦</span>
                            <span>🤖 100+ Communities</span>
                            <span className="opacity-40">✦</span>
                            <span>💼 Tech Exhibition</span>
                            <span className="opacity-40">✦</span>
                            <span>🤝 Networking</span>
                            <span className="opacity-40">✦</span>
                            <span>💡 Startup Pitch</span>
                            <span className="opacity-40">✦</span>
                            <span>💰 Tech Money Sessions</span>
                            <span className="opacity-40">✦</span>
                            <span>✅ Creative Economy</span>
                            <span className="opacity-40">✦</span>
                            <span>📅 Oct 2, 2026</span>
                            <span className="opacity-40">✦</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-12px); }
                }
            `}</style>
        </section>
    );
}
