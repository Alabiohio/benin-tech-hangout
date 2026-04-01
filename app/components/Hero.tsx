'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <section className="relative bg-[#020617] text-white min-h-[850px] lg:min-h-screen pt-30 lg:pt-0 z-20">

            {/* Background Layers - Wrapped in overflow-hidden container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Mesh Gradient Bloom */}
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-biro-blue/20 rounded-full blur-[50px] opacity-40"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[0%] h-[50%] bg-indigo-600/10 rounded-full blur-[60px] opacity-30"></div>

                {/* Subtle Grid overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] mix-blend-overlay"></div>

                {/* Mobile Background Image (Visible only on small screens) */}
                <div className="absolute inset-0 z-0 lg:hidden user-select-none pointer-events-none">
                    <Image
                        src="/BTH-35.png"
                        alt="Benin Tech Hangout Hero"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    {/* Radial Gradient for text visibility */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(2,6,23,0.8)_0%,_transparent_100%)]"></div>
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020617] to-transparent"></div>
                </div>
            </div>

            <div className="container mx-auto px-1 md:px-6 relative z-10 lg:pt-32">
                <div className="flex flex-col lg:flex-row items-center lg:items-start w-full gap-16 xl:gap-24">

                    {/* Left: Text Content Arrangement */}
                    <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left pt-8 md:pt-16 lg:pt-0">
                        {/* Upper Label */}
                        <div
                            data-aos="fade-down"
                            className="flex items-center gap-4 mb-6 md:mb-8"
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
                        <div className="relative mb-6 md:mb-10 group">
                            <h2
                                data-aos="fade-right"
                                data-aos-delay="200"
                                className="text-highlight-yellow text-sm font-black tracking-[0.6em] uppercase mb-4 opacity-80"
                            >
                                Experience the Future
                            </h2>
                            <h1 className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[9rem] font-black font-righteous tracking-tightest leading-[60px] md:leading-[0.85] text-white">
                                <span className="inline-block" data-aos="fade-left"> BENIN </span>{' '}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-right" data-aos-delay="200"> TECH </span>{' '}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-left" data-aos-delay="400">HANGOUT</span>{' '}
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-400" data-aos="fade-right" data-aos-delay="600">2.0</span>
                            </h1>
                        </div>

                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            className="max-w-xl text-xl md:text-2xl text-blue-100/70 mb-8 md:mb-12 leading-relaxed font-light"
                        >
                            The flagship tech event of <span className="text-white font-medium">Benin City</span>. Connect, learn, and scale.
                        </p>

                        {/* Action Rows */}
                        <div
                            data-aos="fade-up"
                            data-aos-delay="600"
                            className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto mt-2 md:mt-4 px-4 sm:px-0"
                        >
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full sm:w-auto relative px-10 py-3 bg-highlight-yellow text-biro-blue-dark text-sm sm:text-lg font-black rounded-2xl overflow-hidden group shadow-[0_20px_50px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-2 active:translate-y-0"
                                >
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                    <span className="relative flex items-center justify-center gap-3 whitespace-nowrap">
                                        Get Registered
                                        <svg className={`w-5 h-5 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </span>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 mt-3 w-72 bg-[#030712]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden z-50 shadow-[0_30px_60px_-15px_rgba(251,191,36,0.2)]">
                                        <div className="p-3 space-y-1">
                                            <Link
                                                href="#register"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="group flex items-center gap-4 px-4 py-4 text-white/90 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-highlight-yellow/10 flex items-center justify-center text-highlight-yellow group-hover:bg-highlight-yellow group-hover:text-biro-blue-dark transition-all duration-300">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Attend the Event</span>
                                                    <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest font-black">Register as Attendee</span>
                                                </div>
                                            </Link>

                                            <Link
                                                href="#register-volunteer"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="group flex items-center gap-4 px-4 py-4 text-white/90 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Join the Team</span>
                                                    <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest font-black">Register as Volunteer</span>
                                                </div>
                                            </Link>

                                            <Link
                                                href="#register-exhibitor"
                                                onClick={() => setIsDropdownOpen(false)}
                                                className="group flex items-center gap-4 px-4 py-4 text-white/90 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h1m4 0h1m-5-4h1m4 0h1"></path></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-sm">Showcase Brands</span>
                                                    <span className="text-[10px] text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest font-black">Register as Exhibitor</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Link
                                href="#sponsors"
                                className="relative px-10 py-3 bg-white/5 backdrop-blur-xl text-white border-2 border-white/20 text-lg sm:text-xl font-black rounded-2xl overflow-hidden group transition-all hover:bg-white/10 hover:-translate-y-2 active:translate-y-0 text-center flex items-center justify-center whitespace-nowrap"
                            >
                                <span className="relative flex items-center justify-center gap-3">
                                    Be a Sponsor
                                    <svg className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Image Content - "Tone at the side" (Visible only on large screens) */}
                    <div className="hidden lg:block w-1/2 relative h-[800px] pointer-events-none select-none">
                        <div
                            className="absolute -right-20 -top-20 -bottom-20 w-[140%] overflow-hidden transform rotate-3 transition-all duration-700 ease-in-out group hover:rotate-0 shadow-2xl shadow-black/50"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent 0%, black 25%)',
                                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%)'
                            }}
                        >
                            <Image
                                src="/BTH-35.png"
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
        </section>
    );
}
