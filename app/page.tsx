'use client';

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventDetails from "./components/EventDetails";
import Highlights from "./components/Highlights";
import Partners from "./components/Partners";
import About from "./components/About";
import VisionMission from "./components/VisionMission";
import WhyAttend from "./components/WhyAttend";
import WhatToExpect from "./components/WhatToExpect";
import Tickets from "./components/Tickets";
import Countdown from "./components/Countdown";
import Agenda from "./components/Agenda";
import FAQ from "./components/FAQ";
import Legacy from "./components/Legacy";
import Roadmap from "./components/Roadmap";
import Organizer from "./components/Organizer";
import Registration from "./components/Registration";
import StartupPitch from "./components/StartupPitch";
import Footer from "./components/Footer";
import BackgroundWrapper from "./components/BackgroundWrapper";
import GuessSpeakers from "./components/GuessSpeakers";
import Link from 'next/link';
import PartnerCTA from "./components/PartnerCTA";

export default function Home() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col font-sans relative">
            <BackgroundWrapper />
            <Navbar onRegisterClick={() => setIsRegisterModalOpen(true)} />
            <main className="flex-grow relative z-10">
                <Hero onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <Highlights />
                <EventDetails />
                <Countdown />
                <Partners />
                <About />
                <Tickets onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <WhyAttend onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <WhatToExpect isModalOpen={isRegisterModalOpen} setIsModalOpen={setIsRegisterModalOpen} />
                <Legacy />
                <GuessSpeakers />
                <Roadmap onRegisterClick={() => setIsRegisterModalOpen(true)} />
                <PartnerCTA />
                <StartupPitch />
                {/* Final CTA Section */}
                <section className="py-32 bg-gradient-to-br from-[#050A1F] to-[#01030A] relative text-center overflow-hidden isolate border-t border-white/[0.02]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-highlight-yellow/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

                    <h2 className="text-5xl md:text-7xl font-black font-righteous text-white mb-6 tracking-tight">
                        Don’t Miss <span className="text-highlight-yellow italic">Out</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100/60 mb-12 font-medium">Be part of Benin’s biggest tech gathering.</p>

                    <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="px-16 py-6 bg-highlight-yellow text-biro-blue-dark font-black font-righteous text-2xl rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(252,211,77,0.3)] hover:shadow-[0_0_60px_rgba(252,211,77,0.5)] uppercase tracking-widest relative z-10"
                    >
                        Register Now
                    </button>

                    {/* Decorative grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4px_4px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-20"></div>
                </section>
                <FAQ />

                <Organizer />
            </main>
            <Footer onRegisterClick={() => setIsRegisterModalOpen(true)} />

            {/* Shared Registration Overlay Modal */}
            {isRegisterModalOpen && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsRegisterModalOpen(false)}
                    ></div>

                    {/* Compact Modal Content */}
                    <div className="relative w-full max-w-lg bg-[#0F172A] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl animate-in zoom-in-95 fade-in duration-300 slide-in-from-bottom-5 overflow-hidden">
                        <button
                            onClick={() => setIsRegisterModalOpen(false)}
                            className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <div className="mb-8 pr-8 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-black font-righteous text-white mb-2 leading-tight">Join <span className="text-blue-400">BTH 2.0</span></h2>
                            <p className="text-white/40 text-sm font-medium">Select your registration path</p>
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    title: "Attend the Event",
                                    desc: "Grab your free ticket",
                                    link: "#register",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
                                    color: "bg-highlight-yellow text-biro-blue-dark"
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
                                    color: "bg-purple-500 text-white"
                                },
                                {
                                    title: "Share Your Story",
                                    desc: "Become a speaker",
                                    link: "/speaker-registration",
                                    icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>,
                                    color: "bg-orange-500 text-white"
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
                                        <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest">{opt.desc}</p>
                                    </div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
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
