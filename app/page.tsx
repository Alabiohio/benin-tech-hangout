'use client';

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import EventDetails from "./components/EventDetails";
import Partners from "./components/Partners";
import About from "./components/About";
import WhyAttend from "./components/WhyAttend";
import WhatToExpect from "./components/WhatToExpect";
import Tickets from "./components/Tickets";
import Shocase from "./components/Shocase";
import Countdown from "./components/Countdown";
import FAQ from "./components/FAQ";
import Legacy from "./components/Legacy";
import Roadmap from "./components/Roadmap";
import Organizer from "./components/Organizer";
import StartupPitch from "./components/StartupPitch";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";
import GuessSpeakers from "./components/GuessSpeakers";
import Link from 'next/link';
import PartnerCTA from "./components/PartnerCTA";
import Agenda from "./components/Agenda";
import ExhibitionCTA from "./components/ExhibitionCTA";

export default function Home() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans relative">
            <BackgroundWrapper />
            <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
            <main className="flex-grow relative z-10">
                <Hero onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <Highlights />
                <About />
                <Countdown />
                <WhatToExpect isModalOpen={isRegisterModalOpen} setIsModalOpen={setIsRegisterModalOpen} />
                <ExhibitionCTA/>
                <Partners />
                <Tickets onRegisterClick={() => setIsRegisterModalOpen(true)} />                
                <Shocase setIsModalOpen={setIsRegisterModalOpen} />
                <GuessSpeakers />
                <WhyAttend onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <Legacy />               
                <PartnerCTA />
                <StartupPitch />
                <FAQ />
                <Organizer />
            </main>
            <Footer onRegisterClick={() => setIsRegisterModalOpen(true)} />

            {isRegisterModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#0f172a]/85 animate-in fade-in duration-300"
                        onClick={() => setIsRegisterModalOpen(false)}
                    ></div>

                    <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[2.5rem] p-6 md:p-10 animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-5 overflow-hidden">
                        <button
                            onClick={() => setIsRegisterModalOpen(false)}
                            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="mb-8 pr-8 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black font-righteous text-white mb-2 leading-tight">Join <span className="text-blue-300">BTF 2.0</span></h2>
                            <p className="text-white/50 text-sm font-medium">Select your registration path</p>
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    title: "Attend the Event",
                                    desc: "Grab your free ticket",
                                    link: "#tickets",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
                                    color: "bg-highlight-yellow text-white"
                                },
                                {
                                    title: "Join the Team",
                                    desc: "Become a volunteer",
                                    link: "/volunteer",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
                                    color: "bg-blue-500 text-white"
                                },
                                {
                                    title: "Showcase Brands",
                                    desc: "Register as exhibitor",
                                    link: "/exhibitor",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h1m4 0h1m-5-4h1m4 0h1"></path></svg>,
                                    color: "bg-biro-blue-dark text-white"
                                },
                                {
                                    title: "Share Your Story",
                                    desc: "Become a speaker",
                                    link: "/speaker-registration",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>,
                                    color: "bg-red-700 text-white"
                                }
                            ].map((opt, i) => (
                                <Link
                                    key={i}
                                    href={opt.link}
                                    onClick={() => setIsRegisterModalOpen(false)}
                                    className="group flex items-center gap-5 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 overflow-hidden"
                                >
                                    <div className={`w-12 h-12 rounded-xl ${opt.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                                        {opt.icon}
                                    </div>
                                    <div className="text-left flex-grow">
                                        <h3 className="text-lg font-black font-righteous text-white leading-none mb-1">{opt.title}</h3>
                                        <p className="text-white/50 text-[11px] font-bold uppercase tracking-widest">{opt.desc}</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                        <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
