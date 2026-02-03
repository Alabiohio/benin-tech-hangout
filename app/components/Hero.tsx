'use client';

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-[#020617] text-white overflow-hidden min-h-[850px] lg:min-h-screen pt-24 lg:pt-0">

            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                {/* Mesh Gradient Bloom */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-biro-blue/20 rounded-full blur-[80px] opacity-40"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[60px] opacity-30"></div>

                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay"></div>
            </div>

            {/* Mobile Background Image (Visible only on small screens) */}
            <div className="absolute inset-0 z-0 lg:hidden user-select-none pointer-events-none">
                <Image
                    src="/BTH-10-1.jpg"
                    alt="Benin Tech Hangout Hero"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                {/* Radial Gradient for text visibility */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(2,6,23,0.8)_0%,_transparent_100%)]"></div>
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020617] to-transparent"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 lg:pt-32">
                <div className="flex flex-col lg:flex-row items-center lg:items-start w-full gap-16 xl:gap-24">

                    {/* Left: Text Content Arrangement */}
                    <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pt-32 lg:pt-0">
                        {/* Upper Label */}
                        <div
                            data-aos="fade-down"
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 opacity-80"></div>
                                    </div>
                                ))}
                            </div>
                            <span className="text-blue-200/60 text-xs font-black tracking-[0.3em] uppercase">
                                Join 1000+ Innovators
                            </span>
                        </div>

                        {/* Title Arrangement */}
                        <div className="relative mb-10 group">
                            <h2
                                data-aos="fade-right"
                                data-aos-delay="200"
                                className="text-highlight-yellow text-sm font-black tracking-[0.6em] uppercase mb-4 opacity-80"
                            >
                                Experience the Future
                            </h2>
                            <h1 className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-black font-righteous tracking-tightest leading-[0.85] text-white">
                                <span className="inline-block" data-aos="fade-left">BENIN</span><br />
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-right" data-aos-delay="200">TECH</span>{' '}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-left" data-aos-delay="400">HANGOUT</span>{' '}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-right" data-aos-delay="600">2.0</span>
                            </h1>
                        </div>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="max-w-xl text-lg md:text-2xl text-blue-100/70 mb-12 leading-relaxed font-light"
                        >
                            The flagship tech event of <span className="text-white font-medium">Benin City</span> returns. A curated space for the ecosystem to connect, learn, and scale.
                        </p>

                        {/* Action Rows */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="flex flex-col sm:flex-row gap-8 w-full sm:w-auto"
                        >
                            <Link
                                href="#register"
                                className="relative px-12 py-6 bg-highlight-yellow text-biro-blue-dark text-xl font-black rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-2 active:translate-y-0"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <span className="relative flex items-center justify-center gap-4">
                                    Register Now
                                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </span>
                            </Link>

                            <Link
                                href="#about"
                                className="flex items-center gap-4 px-8 group"
                            >
                                <div className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center transition-all group-hover:bg-white/10 group-hover:border-white">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                                <span className="text-white font-bold tracking-wider uppercase text-sm">Watch Vision</span>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Image Content - "Tone at the side" (Visible only on large screens) */}
                    <div className="hidden lg:block w-1/2 relative h-[800px] pointer-events-none select-none">
                        <div
                            className="absolute -right-20 -top-20 -bottom-20 w-[120%] rounded-l-[4rem] overflow-hidden transform rotate-3 transition-all duration-700 ease-in-out group hover:rotate-0 shadow-2xl shadow-black/50"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent 0%, black 20%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%)'
                            }}
                        >
                            <Image
                                src="/BTH-10-1.jpg"
                                alt="Benin Tech Hangout Hero"
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Inner Highlight for depth */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-biro-blue-dark/40 to-transparent mix-blend-overlay"></div>
                        </div>

                        {/* Decorative Blob Behind Image */}
                        <div className="absolute -z-10 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-biro-blue/30 blur-[120px] rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
}
